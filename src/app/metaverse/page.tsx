'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// 2035년 실시간 통계
const useMetaverseStats = () => {
    const [stats, setStats] = useState({
        activeUsers: 2500000000,
        bciConnections: 50000000,
        quantumRenders: 125000000,
        hologramSpaces: 50000
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                activeUsers: prev.activeUsers + Math.floor(Math.random() * 10000 - 5000),
                bciConnections: prev.bciConnections + Math.floor(Math.random() * 100 - 50),
                quantumRenders: prev.quantumRenders + Math.floor(Math.random() * 1000 - 500),
                hologramSpaces: prev.hologramSpaces + Math.floor(Math.random() * 10 - 5)
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return stats;
};

export default function MetaversePage() {
    const stats = useMetaverseStats();
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
            color: string;
        }> = [];

        const colors = ['rgba(147, 51, 234, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(34, 211, 238, 0.6)'];

        for (let i = 0; i < 300; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: colors[Math.floor(Math.random() * colors.length)]
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
                ctx.fillStyle = particle.color.replace('0.6', particle.opacity.toString());
                ctx.fill();

                // 연결선
                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 * (1 - distance / 200)})`;
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
        <div className="fixed inset-0 bg-black text-white overflow-hidden relative">
            {/* 홀로그램 배경 캔버스 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-40 z-0"
            />

            {/* 홀로그램 그라디언트 배경 */}
            <div 
                className="absolute inset-0 opacity-30 z-0"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.2), transparent 70%)`
                }}
            />

            {/* 홀로그램 그리드 */}
            <div className="absolute inset-0 opacity-10 z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* 헤더 */}
                <header className="relative border-b border-purple-500/30 bg-black/30 backdrop-blur-2xl p-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-xl">🌐</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    FIELD NINE
                                </div>
                                <div className="text-xs text-gray-400">METAVERSE 2035</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">실시간 접속</div>
                                <div className="text-lg font-bold text-purple-400">
                                    {(stats.activeUsers / 1000000000).toFixed(2)}B
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 메인 섹션 */}
                <main className="flex-1 flex items-center justify-center p-8">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* 홀로그램 배지 */}
                        <div className="mb-8">
                            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full mb-6 backdrop-blur-xl shadow-lg shadow-purple-500/50">
                                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    HOLOGRAM METAVERSE 2035 · BCI INTERFACE · QUANTUM RENDERING
                                </span>
                            </div>
                            
                            {/* 메인 타이틀 */}
                            <h1 className="text-8xl md:text-[12rem] font-black mb-6 leading-none">
                                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                                    메타버스
                                </span>
                                <span className="block text-4xl md:text-6xl text-gray-400 font-light mt-4">
                                    2035
                                </span>
                            </h1>
                            
                            <p className="text-3xl md:text-5xl text-gray-200 mb-6 font-light">
                                홀로그램 가상 공간 · 뇌-컴퓨터 인터페이스
                            </p>
                            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                                양자 렌더링으로 실시간 생성되는<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
                                    무한한 가상 세계를 경험하세요
                                </span>
                            </p>
                        </div>

                        {/* 실시간 통계 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto mb-16">
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl border border-purple-500/30 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
                                <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">
                                    {(stats.activeUsers / 1000000000).toFixed(2)}B
                                </div>
                                <div className="text-xs text-gray-400">활성 사용자</div>
                                <div className="text-xs text-green-400 mt-1">↑ 실시간</div>
                            </div>
                            <div className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 backdrop-blur-2xl border border-pink-500/30 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg shadow-pink-500/20">
                                <div className="text-3xl md:text-4xl font-black text-pink-400 mb-2">
                                    {(stats.bciConnections / 1000000).toFixed(1)}M
                                </div>
                                <div className="text-xs text-gray-400">BCI 연결</div>
                                <div className="text-xs text-cyan-400 mt-1">뇌 인터페이스</div>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
                                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">
                                    {(stats.quantumRenders / 1000000).toFixed(0)}M
                                </div>
                                <div className="text-xs text-gray-400">양자 렌더링</div>
                                <div className="text-xs text-blue-400 mt-1">실시간 생성</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
                                <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">
                                    {(stats.hologramSpaces / 1000).toFixed(0)}K
                                </div>
                                <div className="text-xs text-gray-400">홀로그램 공간</div>
                                <div className="text-xs text-purple-400 mt-1">3D 가상 세계</div>
                            </div>
                        </div>

                        {/* 입장 버튼 - 사이즈 키우고 위치 띄어서 */}
                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12">
                            <Link 
                                href="/kaus-empire"
                                className="group relative flex items-center justify-center gap-4 w-full sm:w-auto px-20 py-8 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl font-bold text-2xl overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-110"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    <span className="text-4xl">🚀</span>
                                    <span>KAUS 제국 입장</span>
                                    <svg className="w-8 h-8 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </Link>
                            <Link 
                                href="/"
                                className="px-16 py-8 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl font-bold text-xl hover:bg-white/10 transition-all hover:scale-105"
                            >
                                홈으로 돌아가기
                            </Link>
                        </div>
                    </div>
                </main>

                {/* 푸터 */}
                <footer className="relative border-t border-purple-500/30 bg-black/30 backdrop-blur-2xl p-6">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">홀로그램 메타버스 · 뇌-컴퓨터 인터페이스 · 양자 렌더링</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
