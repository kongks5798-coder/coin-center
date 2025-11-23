'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAutoMining } from '@/hooks/useAutoMining';

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

// 인터랙티브 채굴 - 터치/클릭 기반
const useInteractiveMining = () => {
    const [tapCount, setTapCount] = useState(0);
    const [combo, setCombo] = useState(0);
    const [earned, setEarned] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const lastTapTime = useRef<number>(0);
    const comboTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleTap = () => {
        const now = Date.now();
        const timeDiff = now - lastTapTime.current;
        
        // 콤보 시스템 (1초 내에 탭하면 콤보 증가)
        if (timeDiff < 1000) {
            setCombo(prev => prev + 1);
            // 콤보 보너스: 콤보가 높을수록 더 많은 보상
            const bonus = Math.min(combo / 10, 5); // 최대 5x 보너스
            const reward = (0.001 + bonus * 0.0005) * (1 + combo * 0.1);
            setEarned(prev => prev + reward);
        } else {
            setCombo(1);
            setEarned(prev => prev + 0.001);
        }
        
        setTapCount(prev => prev + 1);
        lastTapTime.current = now;
        setIsActive(true);
        
        // 콤보 리셋 타이머
        if (comboTimeout.current) clearTimeout(comboTimeout.current);
        comboTimeout.current = setTimeout(() => {
            setCombo(0);
        }, 1000);
    };

    return {
        tapCount,
        combo,
        earned,
        isActive,
        handleTap,
    };
};

// 디바이스 움직임 감지 채굴
const useMotionMining = () => {
    const [shakeCount, setShakeCount] = useState(0);
    const [earned, setEarned] = useState(0);
    const [isSupported, setIsSupported] = useState(false);
    const lastShakeTime = useRef<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
            setIsSupported(true);
            
            const handleMotion = (e: DeviceMotionEvent) => {
                if (!e.accelerationIncludingGravity) return;
                
                const { x, y, z } = e.accelerationIncludingGravity;
                const acceleration = Math.sqrt(x! * x! + y! * y! + z! * z!);
                
                // 움직임이 감지되면 (임계값: 15)
                if (acceleration > 15) {
                    const now = Date.now();
                    // 1초에 한 번만 보상 (스팸 방지)
                    if (now - lastShakeTime.current > 1000) {
                        setShakeCount(prev => prev + 1);
                        setEarned(prev => prev + 0.01); // 흔들 때마다 0.01 KAUS
                        lastShakeTime.current = now;
                    }
                }
            };

            window.addEventListener('devicemotion', handleMotion);
            return () => window.removeEventListener('devicemotion', handleMotion);
        }
    }, []);

    return {
        shakeCount,
        earned,
        isSupported,
    };
};

// 미니게임 채굴 - 블록 터치 게임
const useBlockGameMining = () => {
    const [score, setScore] = useState(0);
    const [earned, setEarned] = useState(0);
    const [blocks, setBlocks] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const gameInterval = useRef<NodeJS.Timeout | null>(null);

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setBlocks([]);
        
        // 블록 생성 (1초마다)
        gameInterval.current = setInterval(() => {
            setBlocks(prev => {
                const newBlock = {
                    id: Date.now(),
                    x: Math.random() * 80 + 10, // 10-90%
                    y: -10,
                    color: ['#00FF94', '#00BFFF', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 4)]
                };
                return [...prev, newBlock];
            });
        }, 1000);

        // 블록 이동 (60fps)
        const moveInterval = setInterval(() => {
            setBlocks(prev => prev.map(block => ({
                ...block,
                y: block.y + 2
            })).filter(block => block.y < 110)); // 화면 밖으로 나가면 제거
        }, 16);

        return () => {
            clearInterval(moveInterval);
        };
    };

    const stopGame = () => {
        setIsPlaying(false);
        if (gameInterval.current) {
            clearInterval(gameInterval.current);
            gameInterval.current = null;
        }
        setBlocks([]);
    };

    const hitBlock = (blockId: number) => {
        setBlocks(prev => prev.filter(b => b.id !== blockId));
        setScore(prev => prev + 1);
        setEarned(prev => prev + 0.005); // 블록당 0.005 KAUS
    };

    return {
        score,
        earned,
        blocks,
        isPlaying,
        startGame,
        stopGame,
        hitBlock,
    };
};

// 상장 카운트다운
const useListingCountdown = () => {
    const [daysRemaining, setDaysRemaining] = useState(45);

    useEffect(() => {
        const targetDate = new Date('2026-01-07');
        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            setDaysRemaining(Math.max(0, days));
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, []);

    return daysRemaining;
};

export default function MiningPage() {
    const { isMining, minedAmount, timeRemaining, boostMultiplier, setBoostMultiplier, startMining, stopMining } = useMining();
    const { tapCount, combo, earned: tapEarned, isActive: tapActive, handleTap } = useInteractiveMining();
    const { shakeCount, earned: shakeEarned, isSupported: motionSupported } = useMotionMining();
    const { score, earned: gameEarned, blocks, isPlaying, startGame, stopGame, hitBlock } = useBlockGameMining();
    const { isMining: isAutoMining, stats: autoStats, batteryLevel, startMining: startAutoMining, stopMining: stopAutoMining } = useAutoMining();
    const daysRemaining = useListingCountdown();
    const [activeTab, setActiveTab] = useState<'auto' | 'tap' | 'shake' | 'game' | 'background'>('background');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 총 획득량 (백그라운드 채굴 포함)
    const totalEarned = minedAmount + tapEarned + shakeEarned + gameEarned + autoStats.totalEarned;

    // 시간 포맷
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // 홀로그램 배경 효과
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

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
        }> = [];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 148, ${particle.opacity})`;
                ctx.fill();

                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 148, ${0.1 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="fixed inset-0 bg-black text-white overflow-auto relative">
            {/* 홀로그램 배경 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
            />

            {/* 상장 배너 */}
            <div 
                className="fixed top-0 left-0 right-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border-b border-yellow-500/30 backdrop-blur-xl z-20 cursor-pointer"
                onClick={() => alert('상장 심사 진행 중입니다. 현재 채굴한 코인은 상장 후 1:1로 교환됩니다.')}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 text-center cursor-pointer hover:bg-yellow-500/10 transition-all">
                    <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
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

                {/* 탭 메뉴 */}
                <div className="mb-8 flex gap-4 flex-wrap justify-center">
                    <button
                        onClick={() => setActiveTab('auto')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'auto'
                                ? 'bg-gradient-to-r from-green-500 to-cyan-500 shadow-lg shadow-green-500/50'
                                : 'bg-white/5 hover:bg-white/10'
                        }`}
                    >
                        🤖 자동 채굴
                    </button>
                    <button
                        onClick={() => setActiveTab('tap')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'tap'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                                : 'bg-white/5 hover:bg-white/10'
                        }`}
                    >
                        👆 터치 채굴
                    </button>
                    <button
                        onClick={() => setActiveTab('shake')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'shake'
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/50'
                                : 'bg-white/5 hover:bg-white/10'
                        }`}
                        disabled={!motionSupported}
                    >
                        📱 흔들기 채굴 {!motionSupported && '(미지원)'}
                    </button>
                    <button
                        onClick={() => setActiveTab('game')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'game'
                                ? 'bg-gradient-to-r from-pink-500 to-violet-500 shadow-lg shadow-pink-500/50'
                                : 'bg-white/5 hover:bg-white/10'
                        }`}
                    >
                        🎮 게임 채굴
                    </button>
                </div>

                {/* 총 획득량 */}
                <div className="mb-8 text-center">
                    <div className="text-sm text-gray-400 mb-2">총 획득량</div>
                    <div className="text-6xl md:text-8xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {totalEarned.toFixed(4)} KAUS
                    </div>
                </div>

                {/* 백그라운드 채굴 탭 */}
                {activeTab === 'background' && (
                    <div className="max-w-4xl w-full space-y-6">
                        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4">⚡</div>
                                <h2 className="text-3xl font-black text-white mb-2">백그라운드 자동 채굴</h2>
                                <p className="text-gray-300">
                                    디바이스를 켜놓으면 알아서 채굴합니다!<br />
                                    실제 리소스 사용량에 따라 보상을 받습니다.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-black/30 rounded-2xl p-6">
                                    <div className="text-sm text-gray-400 mb-2">총 획득량</div>
                                    <div className="text-4xl font-black text-emerald-400">
                                        {autoStats.totalEarned.toFixed(6)} KAUS
                                    </div>
                                </div>
                                <div className="bg-black/30 rounded-2xl p-6">
                                    <div className="text-sm text-gray-400 mb-2">시간당 채굴 속도</div>
                                    <div className="text-4xl font-black text-teal-400">
                                        {autoStats.miningRate.toFixed(4)} KAUS/h
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-black/30 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">CPU 사용량</span>
                                        <span className="text-lg font-bold text-green-400">{autoStats.cpuUsage.toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all"
                                            style={{ width: `${Math.min(100, autoStats.cpuUsage)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">네트워크 활동</span>
                                        <span className="text-lg font-bold text-blue-400">{autoStats.networkActivity.toFixed(2)} MB</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                                            style={{ width: `${Math.min(100, autoStats.networkActivity * 10)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">화면 활성 시간</span>
                                        <span className="text-lg font-bold text-yellow-400">
                                            {Math.floor(autoStats.screenTime / 3600)}h {Math.floor((autoStats.screenTime % 3600) / 60)}m
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">디바이스가 활성화된 시간</div>
                                </div>

                                <div className="bg-black/30 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">배터리 소모</span>
                                        <span className="text-lg font-bold text-orange-400">
                                            {autoStats.batteryDrain.toFixed(2)}%
                                        </span>
                                    </div>
                                    {batteryLevel !== null && (
                                        <div className="text-xs text-gray-500">
                                            현재 배터리: {(batteryLevel * 100).toFixed(0)}%
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={isAutoMining ? stopAutoMining : startAutoMining}
                                className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
                                    isAutoMining
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 shadow-lg shadow-emerald-500/50'
                                }`}
                            >
                                {isAutoMining ? '⏸️ 백그라운드 채굴 중지' : '▶️ 백그라운드 채굴 시작'}
                            </button>

                            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                                <div className="text-sm text-yellow-400 font-bold mb-2">💡 채굴 원리</div>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• CPU 사용량: 실제 계산 작업 수행 (Web Workers)</li>
                                    <li>• 네트워크 활동: 데이터 전송량 기반 보상</li>
                                    <li>• 화면 활성 시간: 디바이스 사용 시간 기반 보상</li>
                                    <li>• 배터리 소모: 실제 에너지 소비 기반 보상</li>
                                    <li>• 백그라운드에서도 계속 채굴됩니다 (Service Worker)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* 자동 채굴 탭 */}
                {activeTab === 'auto' && (
                    <div className="max-w-2xl w-full space-y-6">
                        {/* 3D 육각형 코어 */}
                        <div className="relative h-64 flex items-center justify-center">
                            <div 
                                className={`relative w-48 h-48 transition-all duration-300 ${
                                    isMining ? 'animate-spin' : ''
                                }`}
                                style={{
                                    transform: 'perspective(1000px) rotateX(60deg) rotateY(0deg)',
                                }}
                            >
                                <div className="absolute inset-0 border-4 border-green-500/50 rounded-lg transform rotate-45"></div>
                                <div className="absolute inset-0 border-4 border-cyan-500/50 rounded-lg transform -rotate-45"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`text-6xl ${isMining ? 'animate-pulse' : ''}`}>
                                        {isMining ? '⚡' : '💎'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 채굴 정보 */}
                        <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">채굴 속도</div>
                                    <div className="text-3xl font-black text-green-400">
                                        {boostMultiplier}x 🚀
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">남은 시간</div>
                                    <div className="text-3xl font-black text-cyan-400">
                                        {formatTime(timeRemaining)}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={isMining ? stopMining : startMining}
                                className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
                                    isMining
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-gradient-to-r from-green-500 to-cyan-500 hover:scale-105 shadow-lg shadow-green-500/50'
                                }`}
                            >
                                {isMining ? '⏸️ 채굴 중지' : '▶️ 채굴 시작'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 터치 채굴 탭 */}
                {activeTab === 'tap' && (
                    <div className="max-w-2xl w-full space-y-6">
                        <div 
                            className="relative h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 rounded-3xl flex items-center justify-center cursor-pointer select-none"
                            onClick={handleTap}
                            onTouchStart={handleTap}
                        >
                            <div className="text-center">
                                <div className={`text-9xl mb-4 transition-transform ${tapActive ? 'scale-150' : 'scale-100'}`}>
                                    {tapActive ? '💥' : '👆'}
                                </div>
                                <div className="text-2xl font-bold text-white mb-2">
                                    화면을 빠르게 탭하세요!
                                </div>
                                <div className="text-lg text-gray-300">
                                    콤보가 높을수록 더 많은 보상
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">탭 횟수</div>
                                    <div className="text-3xl font-black text-blue-400">{tapCount}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">콤보</div>
                                    <div className="text-3xl font-black text-purple-400">{combo}x</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">획득량</div>
                                    <div className="text-3xl font-black text-green-400">{tapEarned.toFixed(4)} KAUS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 흔들기 채굴 탭 */}
                {activeTab === 'shake' && (
                    <div className="max-w-2xl w-full space-y-6">
                        {motionSupported ? (
                            <>
                                <div className="relative h-96 bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/30 rounded-3xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-9xl mb-4 animate-bounce">📱</div>
                                        <div className="text-2xl font-bold text-white mb-2">
                                            디바이스를 흔들어주세요!
                                        </div>
                                        <div className="text-lg text-gray-300">
                                            가속도계가 움직임을 감지합니다
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                    <div className="grid md:grid-cols-2 gap-6 text-center">
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">흔든 횟수</div>
                                            <div className="text-3xl font-black text-orange-400">{shakeCount}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">획득량</div>
                                            <div className="text-3xl font-black text-green-400">{shakeEarned.toFixed(4)} KAUS</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-2 border-gray-500/30 rounded-3xl p-8 backdrop-blur-xl text-center">
                                <div className="text-6xl mb-4">⚠️</div>
                                <div className="text-xl font-bold text-white mb-2">
                                    이 기능은 모바일 디바이스에서만 지원됩니다
                                </div>
                                <div className="text-gray-400">
                                    가속도계가 있는 기기에서만 사용할 수 있습니다
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 게임 채굴 탭 */}
                {activeTab === 'game' && (
                    <div className="max-w-2xl w-full space-y-6">
                        <div className="relative h-96 bg-gradient-to-br from-pink-500/20 to-violet-500/20 border-2 border-pink-500/30 rounded-3xl overflow-hidden">
                            {!isPlaying ? (
                                <div className="h-full flex items-center justify-center">
                                    <button
                                        onClick={startGame}
                                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-lg shadow-pink-500/50"
                                    >
                                        🎮 게임 시작
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0">
                                        {blocks.map(block => (
                                            <div
                                                key={block.id}
                                                onClick={() => hitBlock(block.id)}
                                                className="absolute w-16 h-16 rounded-lg cursor-pointer transition-all hover:scale-110"
                                                style={{
                                                    left: `${block.x}%`,
                                                    top: `${block.y}%`,
                                                    backgroundColor: block.color,
                                                    boxShadow: `0 0 20px ${block.color}`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-xl">
                                        <div className="text-sm text-gray-400">점수</div>
                                        <div className="text-2xl font-black text-white">{score}</div>
                                    </div>
                                    <button
                                        onClick={stopGame}
                                        className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                                    >
                                        종료
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="bg-gradient-to-br from-pink-500/10 to-violet-500/10 border-2 border-pink-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <div className="grid md:grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">점수</div>
                                    <div className="text-3xl font-black text-pink-400">{score}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">획득량</div>
                                    <div className="text-3xl font-black text-green-400">{gameEarned.toFixed(4)} KAUS</div>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm text-gray-400">
                                떨어지는 블록을 클릭하여 KAUS를 획득하세요!
                            </div>
                        </div>
                    </div>
                )}

                {/* 부스터 및 초대 */}
                <div className="mt-8 max-w-2xl w-full bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-3xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-lg font-bold text-white mb-1">채굴 속도 부스터</div>
                            <div className="text-sm text-gray-400">현재 속도: {boostMultiplier}x 🚀</div>
                        </div>
                        <button
                            onClick={() => {
                                const code = 'KAUS2025';
                                navigator.clipboard.writeText(code);
                                alert(`초대 코드가 복사되었습니다: ${code}\n친구를 초대하면 2x 속도로 채굴할 수 있습니다!`);
                                setBoostMultiplier(2);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold hover:scale-105 transition-all"
                        >
                            친구 초대하기
                        </button>
                    </div>
                </div>

                {/* 활동 기반 채굴 링크 */}
                <div className="text-center mt-8 mb-8">
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
    );
}
