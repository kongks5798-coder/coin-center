'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// 실시간 통계 훅
const useKausTraceStats = () => {
    const [stats, setStats] = useState({
        trackedTags: 50000000,
        globalCoverage: 99.8,
        countries: 250,
        satellites: 250,
        kausTransactions: 125000000000,
        accuracy: 99.9,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                trackedTags: prev.trackedTags + Math.floor(Math.random() * 1000),
                globalCoverage: 99.8,
                countries: 250,
                satellites: 250,
                kausTransactions: prev.kausTransactions + Math.floor(Math.random() * 100000),
                accuracy: 99.9,
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return stats;
};

export default function KausTracePage() {
    const stats = useKausTraceStats();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

            {/* 홀로그램 그리드 */}
            <div className="fixed inset-0 opacity-10 z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-purple-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-2xl">📡</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    KAUS TRACE
                                </div>
                                <div className="text-xs text-gray-400">Track with Trust, Pay with KAUS</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">글로벌 커버리지</div>
                                <div className="text-lg font-bold text-purple-400">
                                    {stats.globalCoverage}%
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                        <div className="mb-8">
                            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-purple-500/50 rounded-full mb-6 backdrop-blur-xl shadow-lg shadow-purple-500/50">
                                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                                    FIELD NINE NEXUS · RFID · SATELLITE · BLOCKCHAIN
                                </span>
                            </div>
                            
                            <h1 className="text-8xl md:text-[12rem] font-black mb-6 leading-none">
                                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                                    KAUS TRACE
                                </span>
                            </h1>
                            
                            <p className="text-3xl md:text-5xl text-gray-200 mb-6 font-light">
                                신뢰로 추적하고, KAUS로 결제하세요
                            </p>
                            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                                RFID + 위성 네트워크 + 블록체인으로<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold">
                                    전 세계를 연결하는 추적 플랫폼
                                </span>
                            </p>
                        </div>

                        {/* CTA 버튼 */}
                        <div className="flex flex-wrap gap-4 justify-center mt-12">
                            <Link
                                href="/nexus-satellite"
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl font-bold text-lg overflow-hidden hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>🛰️</span>
                                    <span>위성 네트워크 보기</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link
                                href="/dashboard/global"
                                className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
                            >
                                <span className="flex items-center gap-3">
                                    <span>🌍</span>
                                    <span>글로벌 대시보드</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 실시간 통계 섹션 */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-6xl md:text-8xl font-black mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    실시간 글로벌 통계
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-2xl shadow-purple-500/20">
                                <div className="text-6xl font-black text-purple-400 mb-4">
                                    {(stats.trackedTags / 1000000).toFixed(1)}M
                                </div>
                                <div className="text-xl text-gray-300 font-medium mb-2">추적 중 RFID 태그</div>
                                <div className="text-sm text-gray-400">실시간 전 세계 추적</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-2xl shadow-blue-500/20">
                                <div className="text-6xl font-black text-blue-400 mb-4">
                                    {stats.globalCoverage}%
                                </div>
                                <div className="text-xl text-gray-300 font-medium mb-2">글로벌 커버리지</div>
                                <div className="text-sm text-gray-400">250개국 서비스</div>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20">
                                <div className="text-6xl font-black text-cyan-400 mb-4">
                                    {(stats.kausTransactions / 1000000000).toFixed(1)}B
                                </div>
                                <div className="text-xl text-gray-300 font-medium mb-2">KAUS 거래</div>
                                <div className="text-sm text-gray-400">블록체인 기록</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 핵심 기능 섹션 */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-6xl md:text-8xl font-black mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    핵심 기능
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">📡</div>
                                <h3 className="text-3xl font-bold text-purple-400 mb-4">RFID 추적</h3>
                                <p className="text-gray-300 text-lg mb-4">
                                    실시간 위치 추적과 위성 네트워크 기반 글로벌 커버리지로 전 세계 어디서나 추적 가능합니다.
                                </p>
                                <ul className="space-y-2 text-gray-400">
                                    <li>✅ 99.8% 글로벌 커버리지</li>
                                    <li>✅ 250개 위성 네트워크</li>
                                    <li>✅ 실시간 위치 업데이트</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">⛓️</div>
                                <h3 className="text-3xl font-bold text-blue-400 mb-4">블록체인 인증</h3>
                                <p className="text-gray-300 text-lg mb-4">
                                    모든 거래와 이동을 블록체인에 기록하여 변조 불가능한 공급망 추적을 제공합니다.
                                </p>
                                <ul className="space-y-2 text-gray-400">
                                    <li>✅ 변조 불가능한 기록</li>
                                    <li>✅ NFT 인증서 발급</li>
                                    <li>✅ 99.9% 정확도</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">🪙</div>
                                <h3 className="text-3xl font-bold text-cyan-400 mb-4">KAUS 코인 결제</h3>
                                <p className="text-gray-300 text-lg mb-4">
                                    통합 결제 시스템으로 모든 거래를 KAUS 코인으로 처리하고 실시간 정산합니다.
                                </p>
                                <ul className="space-y-2 text-gray-400">
                                    <li>✅ 통합 결제 시스템</li>
                                    <li>✅ 실시간 환율</li>
                                    <li>✅ 자동 정산</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">🛰️</div>
                                <h3 className="text-3xl font-bold text-purple-400 mb-4">위성 네트워크</h3>
                                <p className="text-gray-300 text-lg mb-4">
                                    250개 위성으로 구성된 글로벌 네트워크로 24/7 실시간 추적이 가능합니다.
                                </p>
                                <ul className="space-y-2 text-gray-400">
                                    <li>✅ 250개 위성 (LEO/MEO/GEO)</li>
                                    <li>✅ 24/7 실시간 추적</li>
                                    <li>✅ 글로벌 커버리지</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 홈으로 돌아가기 */}
                <div className="text-center py-16 mb-24">
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

                {/* 푸터 */}
                <footer className="border-t border-purple-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">KAUS TRACE · Track with Trust, Pay with KAUS</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

