'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ReservesPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [reserves, setReserves] = useState({
        totalReserves: 1000000000,
        totalKAUS: 1000000000,
        reserveRatio: 100.00,
        lastAudit: '2025-11-23',
        nextAudit: '2025-12-23',
    });

    const reserveBreakdown = [
        { name: 'USD Cash (Bank Accounts)', amount: 400000000, percentage: 40, color: 'from-green-500 to-emerald-500' },
        { name: 'US Treasury Bills (3M)', amount: 300000000, percentage: 30, color: 'from-blue-500 to-cyan-500' },
        { name: 'Bank Deposits (FDIC)', amount: 200000000, percentage: 20, color: 'from-purple-500 to-pink-500' },
        { name: 'Liquid Assets (Money Market)', amount: 100000000, percentage: 10, color: 'from-orange-500 to-red-500' },
    ];

    // 홀로그램 파티클 효과
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

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
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
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                ctx.fill();

                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                });
            });

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

    return (
        <div className="fixed inset-0 bg-black text-white overflow-auto relative">
            {/* 홀로그램 배경 캔버스 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
            />

            {/* 홀로그램 그라디언트 배경 */}
            <div 
                className="fixed inset-0 opacity-20 z-0"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.2), transparent 70%)`
                }}
            />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-purple-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    KAUS 리저브 대시보드
                                </div>
                                <div className="text-xs text-gray-400">Real-Time Reserve Transparency</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">리저브 비율</div>
                                <div className="text-lg font-bold text-green-400">
                                    {reserves.reserveRatio}%
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 메인 섹션 */}
                <main className="max-w-7xl mx-auto p-8">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-7xl md:text-9xl font-black mb-6">
                            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                리저브 대시보드
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                            KAUS Stablecoin은 100% USD 리저브로 뒷받침됩니다. 실시간으로 투명하게 확인하세요.
                        </p>
                    </div>

                    {/* 총 리저브 요약 */}
                    <div className="bg-gradient-to-br from-green-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl mb-12">
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-sm text-gray-400 mb-2">총 리저브</div>
                                <div className="text-4xl font-black text-green-400">
                                    ${(reserves.totalReserves / 1000000).toFixed(0)}M
                                </div>
                                <div className="text-xs text-gray-400 mt-1">USD</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400 mb-2">총 KAUS 공급량</div>
                                <div className="text-4xl font-black text-purple-400">
                                    {(reserves.totalKAUS / 1000000).toFixed(0)}M
                                </div>
                                <div className="text-xs text-gray-400 mt-1">KAUS</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400 mb-2">리저브 비율</div>
                                <div className="text-4xl font-black text-blue-400">
                                    {reserves.reserveRatio}%
                                </div>
                                <div className="text-xs text-green-400 mt-1">✓ 완전 보장</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-400 mb-2">페그 가격</div>
                                <div className="text-4xl font-black text-cyan-400">
                                    $1.00
                                </div>
                                <div className="text-xs text-gray-400 mt-1">USD</div>
                            </div>
                        </div>
                    </div>

                    {/* 리저브 구성 */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl mb-12">
                        <h3 className="text-3xl font-bold text-purple-400 mb-8">리저브 구성</h3>
                        
                        <div className="space-y-6">
                            {reserveBreakdown.map((item, index) => (
                                <div key={index} className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">{item.name}</div>
                                            <div className="text-sm text-gray-400">{item.percentage}%</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-purple-400">
                                                ${(item.amount / 1000000).toFixed(0)}M
                                            </div>
                                            <div className="text-xs text-gray-400">USD</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-xl font-bold text-white">총 리저브</div>
                                <div className="text-3xl font-black text-green-400">
                                    ${(reserves.totalReserves / 1000000).toFixed(0)}M USD
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 감사 정보 */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <h3 className="text-2xl font-bold text-blue-400 mb-6">최근 감사</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">감사 날짜</div>
                                    <div className="text-xl font-bold text-white">{reserves.lastAudit}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">감사 기관</div>
                                    <div className="text-lg font-bold text-white">Big 4 회계법인</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">감사 결과</div>
                                    <div className="text-lg font-bold text-green-400">✓ 통과</div>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="inline-block px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-xl font-bold hover:bg-blue-500/30 transition-all"
                                    >
                                        감사 보고서 다운로드
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                            <h3 className="text-2xl font-bold text-purple-400 mb-6">다음 감사</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">예정일</div>
                                    <div className="text-xl font-bold text-white">{reserves.nextAudit}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">감사 주기</div>
                                    <div className="text-lg font-bold text-white">월 1회</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">투명성</div>
                                    <div className="text-lg font-bold text-green-400">✓ 공개</div>
                                </div>
                                <div className="mt-6">
                                    <div className="text-sm text-gray-400">
                                        모든 감사 보고서는 공개됩니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 안정성 정보 */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl mb-12">
                        <h3 className="text-3xl font-bold text-green-400 mb-6">스테이블코인 안정성</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-black/40 rounded-xl p-6 border border-green-500/20">
                                <div className="text-4xl mb-3">🔒</div>
                                <div className="text-lg font-bold text-white mb-2">100% 보장</div>
                                <div className="text-sm text-gray-400">모든 KAUS는 USD로 뒷받침됩니다</div>
                            </div>
                            <div className="bg-black/40 rounded-xl p-6 border border-green-500/20">
                                <div className="text-4xl mb-3">📊</div>
                                <div className="text-lg font-bold text-white mb-2">투명성</div>
                                <div className="text-sm text-gray-400">실시간 리저브 대시보드</div>
                            </div>
                            <div className="bg-black/40 rounded-xl p-6 border border-green-500/20">
                                <div className="text-4xl mb-3">✅</div>
                                <div className="text-lg font-bold text-white mb-2">정기 감사</div>
                                <div className="text-sm text-gray-400">월 1회 공개 감사</div>
                            </div>
                        </div>
                    </div>

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mt-16 mb-24">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all hover:scale-105"
                        >
                            <span>홈으로 돌아가기</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </main>

                {/* 푸터 */}
                <footer className="border-t border-purple-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">KAUS Stablecoin · 100% USD Backed · $1.00 Peg · Real-Time Transparency</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

