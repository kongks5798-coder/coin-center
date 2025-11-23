'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// 실시간 채굴 로직
const useMining = () => {
    const [isMining, setIsMining] = useState(false);
    const [minedAmount, setMinedAmount] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60); // 24시간 (초)
    const [boostMultiplier, setBoostMultiplier] = useState(1); // 기본 1x, 친구 초대 시 2x
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 채굴 시작
    const startMining = () => {
        if (isMining) return;
        
        setIsMining(true);
        setStartTime(Date.now());
        setTimeRemaining(24 * 60 * 60);
        
        // 실시간 채굴 (100ms마다 업데이트) - 더 타이트하게 조정
        intervalRef.current = setInterval(() => {
            setMinedAmount(prev => {
                // 시간당 0.2 KAUS = 초당 0.0000555... KAUS (기존의 1/5로 감소)
                // 100ms마다 = 0.00000555... KAUS
                const increment = (0.00005555555555555556 / 10) * boostMultiplier;
                return prev + increment;
            });
        }, 100);

        // 24시간 타이머
        timerRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    stopMining();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 채굴 중지
    const stopMining = () => {
        setIsMining(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        alert('24시간 채굴이 완료되었습니다. 다시 활성화하세요.');
    };

    // 정리
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return {
        isMining,
        minedAmount,
        timeRemaining,
        boostMultiplier,
        setBoostMultiplier,
        startMining,
        stopMining,
    };
};

// 상장 카운트다운
const useListingCountdown = () => {
    const [daysRemaining, setDaysRemaining] = useState(45); // D-45 예시

    useEffect(() => {
        // 실제로는 상장 예정일을 기준으로 계산
        const targetDate = new Date('2026-01-07'); // 예시 날짜
        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            setDaysRemaining(Math.max(0, days));
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000 * 60 * 60); // 1시간마다 업데이트
        return () => clearInterval(interval);
    }, []);

    return daysRemaining;
};

export default function MiningPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hexagonRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isPulsing, setIsPulsing] = useState(false);
    const [showListingModal, setShowListingModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteCode] = useState('KAUS2025-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    
    const { isMining, minedAmount, timeRemaining, boostMultiplier, setBoostMultiplier, startMining, stopMining } = useMining();
    const daysRemaining = useListingCountdown();

    // 배경 스캔 애니메이션
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        let scanY = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 스캔 라인
            const gradient = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
            gradient.addColorStop(0, 'rgba(0, 255, 148, 0)');
            gradient.addColorStop(0.5, 'rgba(0, 255, 148, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 255, 148, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 100, canvas.width, 200);
            
            scanY += 2;
            if (scanY > canvas.height + 100) scanY = -100;
            
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    // 마우스 추적
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 육각형 펄스 효과
    const handleHexagonClick = () => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 300);
    };

    // 시간 포맷팅
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // 초대 코드 복사
    const copyInviteCode = () => {
        navigator.clipboard.writeText(inviteCode);
        alert(`초대 코드가 복사되었습니다: ${inviteCode}`);
    };

    // 부스터 활성화
    const activateBoost = () => {
        setBoostMultiplier(2);
        setShowInviteModal(false);
        alert('채굴 속도가 2배로 증가했습니다! 🚀');
    };

    return (
        <div className="fixed inset-0 bg-[#050505] text-white overflow-auto relative">
            {/* 배경 스캔 애니메이션 캔버스 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
            />

            {/* 상장 카운트다운 배너 */}
            <div 
                className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border-b border-purple-500/50 backdrop-blur-xl"
                onClick={() => setShowListingModal(true)}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 text-center cursor-pointer hover:bg-purple-500/10 transition-all">
                    <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                        🌍 Global Exchange Listing: D-{daysRemaining}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">클릭하여 자세히 보기</div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 pt-24">
                {/* 헤더 */}
                <header className="absolute top-16 left-0 right-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-xl">⚡</span>
                            </div>
                            <div>
                                <div className="text-lg font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                    KAUS Mining
                                </div>
                                <div className="text-xs text-gray-400">NEXUS Mining Core</div>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* 3D 육각형 코어 */}
                <div className="relative mb-12">
                    <div
                        ref={hexagonRef}
                        className={`relative w-64 h-64 transition-all duration-300 ${
                            isPulsing ? 'scale-110' : 'scale-100'
                        } ${isMining ? 'animate-spin-slow' : ''}`}
                        onClick={handleHexagonClick}
                        style={{
                            animation: isMining ? 'rotate 20s linear infinite' : 'none',
                        }}
                    >
                        {/* 외부 육각형 */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                            <defs>
                                <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FF94" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#00FF94" stopOpacity="0.8" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <polygon
                                points="100,20 180,60 180,140 100,180 20,140 20,60"
                                fill="none"
                                stroke="url(#hexGradient)"
                                strokeWidth="3"
                                filter="url(#glow)"
                                className="animate-pulse"
                            />
                            <polygon
                                points="100,40 160,70 160,130 100,160 40,130 40,70"
                                fill="none"
                                stroke="url(#hexGradient)"
                                strokeWidth="2"
                                opacity="0.5"
                            />
                            <polygon
                                points="100,60 140,80 140,120 100,140 60,120 60,80"
                                fill="url(#hexGradient)"
                                opacity="0.3"
                            />
                        </svg>

                        {/* 중앙 코어 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 ${
                                isMining ? 'animate-pulse' : ''
                            }`} style={{
                                boxShadow: isMining 
                                    ? '0 0 40px rgba(0, 255, 148, 0.8), 0 0 80px rgba(0, 255, 148, 0.4)'
                                    : '0 0 20px rgba(0, 255, 148, 0.4)'
                            }}>
                                <div className="w-full h-full flex items-center justify-center text-3xl">
                                    {isMining ? '⚡' : '💎'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 채굴된 KAUS 양 */}
                <div className="text-center mb-8">
                    <div className="text-sm text-gray-400 mb-2">채굴된 KAUS</div>
                    <div className="text-7xl md:text-9xl font-mono font-black bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {minedAmount.toFixed(6)}
                    </div>
                    <div className="text-lg text-gray-400">KAUS</div>
                </div>

                {/* 채굴 상태 */}
                {isMining && (
                    <div className="mb-8 text-center">
                        <div className="text-sm text-gray-400 mb-1">남은 시간</div>
                        <div className="text-3xl font-mono font-bold text-green-400">
                            {formatTime(timeRemaining)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            속도: {boostMultiplier}x 🚀
                        </div>
                    </div>
                )}

                {/* 채굴 시작 버튼 */}
                {!isMining && (
                    <button
                        onClick={startMining}
                        className="px-12 py-6 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl shadow-green-500/50 mb-8"
                    >
                        채굴 시작 (Start Mining)
                    </button>
                )}

                {/* 부스터 & 위젯 */}
                <div className="w-full max-w-md space-y-4 mt-8">
                    {/* 부스터 위젯 */}
                    <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-lg font-bold text-white mb-1">현재 속도</div>
                                <div className="text-3xl font-mono font-black text-green-400">
                                    {boostMultiplier}x 🚀
                                </div>
                            </div>
                            {boostMultiplier === 1 && (
                                <button
                                    onClick={() => setShowInviteModal(true)}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl font-bold text-sm hover:scale-105 transition-all"
                                >
                                    친구 초대하고<br />2배 빠르게
                                </button>
                            )}
                        </div>
                        {boostMultiplier === 2 && (
                            <div className="text-sm text-green-400 text-center">
                                ✅ 부스터 활성화됨! 채굴 속도 2배 증가
                            </div>
                        )}
                    </div>

                    {/* 활동 기반 채굴 링크 */}
                    <div className="text-center mb-8">
                        <Link
                            href="/activity-mining"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-lg shadow-green-500/50"
                        >
                            <span>🎯</span>
                            <span>활동 기반 채굴로 더 많이 획득하기</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold hover:bg-white/10 transition-all"
                        >
                            <span>홈으로 돌아가기</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 상장 모달 */}
            {showListingModal && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                    onClick={() => setShowListingModal(false)}
                >
                    <div 
                        className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-3xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-purple-400">Global Exchange Listing</h3>
                            <button
                                onClick={() => setShowListingModal(false)}
                                className="text-gray-400 hover:text-white text-3xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="text-lg text-white">
                                상장 심사 진행 중입니다.
                            </div>
                            <div className="text-gray-300">
                                현재 채굴된 코인은 상장 후 1:1 교환됩니다.
                            </div>
                            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                                <div className="text-sm text-purple-400 font-bold mb-2">예상 상장일</div>
                                <div className="text-xl font-bold text-white">2026년 1월 7일</div>
                                <div className="text-sm text-gray-400 mt-1">D-{daysRemaining}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 친구 초대 모달 */}
            {showInviteModal && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                    onClick={() => setShowInviteModal(false)}
                >
                    <div 
                        className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-3xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-green-400">친구 초대하고 2배 빠르게</h3>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="text-gray-400 hover:text-white text-3xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="text-gray-300">
                                친구를 초대하면 채굴 속도가 2배로 증가합니다!
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                                <div className="text-sm text-green-400 font-bold mb-2">내 초대 코드</div>
                                <div className="text-2xl font-mono font-bold text-white mb-3">{inviteCode}</div>
                                <button
                                    onClick={copyInviteCode}
                                    className="w-full px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg font-bold text-sm hover:bg-green-500/30 transition-all"
                                >
                                    코드 복사
                                </button>
                            </div>
                            <button
                                onClick={activateBoost}
                                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                            >
                                부스터 활성화
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS 애니메이션 */}
            <style jsx>{`
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: rotate 20s linear infinite;
                }
            `}</style>
        </div>
    );
}

