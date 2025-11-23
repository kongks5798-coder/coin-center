'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// 2035년 실시간 통계
const useNexusStats = () => {
    const [stats, setStats] = useState({
        activeDrones: 1250000,
        dataProcessed: 84720.5,
        globalNodes: 250,
        transactions: 124000000000,
        uptime: 99.999,
        aiAccuracy: 99.97,
        quantumQubits: 12500000,
        securityIncidents: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                activeDrones: prev.activeDrones + Math.floor(Math.random() * 100 - 50),
                dataProcessed: prev.dataProcessed + (Math.random() * 10),
                globalNodes: prev.globalNodes,
                transactions: prev.transactions + Math.floor(Math.random() * 100000),
                uptime: 99.999,
                aiAccuracy: 99.97 + (Math.random() * 0.01 - 0.005),
                quantumQubits: prev.quantumQubits + Math.floor(Math.random() * 1000 - 500),
                securityIncidents: 0
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return stats;
};

// 양자 데이터센터
const quantumDataCenters = [
    { country: 'South Korea', city: 'Seoul', lat: 37.5665, lng: 126.9780, status: 'quantum', capacity: '10ZB', qubits: '1M+' },
    { country: 'USA', city: 'New York', lat: 40.7128, lng: -74.0060, status: 'quantum', capacity: '15ZB', qubits: '1.5M+' },
    { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503, status: 'quantum', capacity: '12ZB', qubits: '1.2M+' },
    { country: 'UK', city: 'London', lat: 51.5074, lng: -0.1278, status: 'quantum', capacity: '9ZB', qubits: '900K+' },
    { country: 'Germany', city: 'Frankfurt', lat: 50.1109, lng: 8.6821, status: 'quantum', capacity: '11ZB', qubits: '1.1M+' },
    { country: 'Singapore', city: 'Singapore', lat: 1.3521, lng: 103.8198, status: 'quantum', capacity: '9.5ZB', qubits: '950K+' },
    { country: 'UAE', city: 'Dubai', lat: 25.2048, lng: 55.2708, status: 'quantum', capacity: '8ZB', qubits: '800K+' },
    { country: 'Australia', city: 'Sydney', lat: -33.8688, lng: 151.2093, status: 'quantum', capacity: '8.5ZB', qubits: '850K+' },
    { country: 'China', city: 'Shanghai', lat: 31.2304, lng: 121.4737, status: 'quantum', capacity: '13ZB', qubits: '1.3M+' },
    { country: 'Brazil', city: 'São Paulo', lat: -23.5505, lng: -46.6333, status: 'quantum', capacity: '7ZB', qubits: '700K+' },
];

export default function NexusPage() {
    const stats = useNexusStats();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [logs, setLogs] = useState<string[]>([]);

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

        const colors = ['rgba(34, 211, 238, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(147, 51, 234, 0.6)'];

        for (let i = 0; i < 250; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.4 + 0.2,
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

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 150)})`;
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

    // 실시간 로그
    useEffect(() => {
        const logMessages = [
            '[INFO] 양자 노드 #125 연결 완료 - 서울 데이터센터',
            '[DRONE] 자율 드론 #52,480 배송 완료 - 10분 소요',
            '[AI] 뉴럴 AI 예측 정확도: 99.97%',
            '[BLOCKCHAIN] KAUS 거래 검증 완료 - 양자 블록체인',
            '[QUANTUM] 양자 큐비트 연산 완료 - 1.25M 큐비트',
            '[SECURITY] 양자 암호화 보안 검증 완료',
            '[NETWORK] 글로벌 네트워크 연결 상태: 최적',
            '[METAVERSE] 메타버스 데이터 동기화 완료'
        ];

        const interval = setInterval(() => {
            const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
            const timestamp = new Date().toLocaleTimeString();
            const newLog = `[${timestamp}] ${randomMsg}`;
            setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 15));
        }, 2000);

        return () => clearInterval(interval);
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
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), transparent 70%)`
                }}
            />

            {/* 홀로그램 그리드 */}
            <div className="fixed inset-0 opacity-10 z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-cyan-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <span className="text-xl">⚛️</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    NEXUS OS
                                </div>
                                <div className="text-xs text-gray-400">QUANTUM LOGISTICS 2035</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">양자 가동률</div>
                                <div className="text-lg font-bold text-cyan-400">
                                    {stats.uptime}%
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 메인 섹션 */}
                <main className="max-w-7xl mx-auto p-8">
                    {/* 타이틀 섹션 */}
                    <div className="text-center mb-16">
                        <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full mb-6 backdrop-blur-xl shadow-lg shadow-cyan-500/50">
                            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                QUANTUM DATABASE GUARD CENTER 2035 · NEURAL AI · AUTONOMOUS DRONES
                            </span>
                        </div>
                        
                        <h1 className="text-7xl md:text-9xl font-black mb-6">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                                NEXUS OS
                            </span>
                        </h1>
                        
                        <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto">
                            양자 컴퓨팅으로 구동되는 전세계 250개국 데이터센터<br />
                            <span className="text-cyan-400 font-bold">10년 앞서가는 압도적 기술력</span>
                        </p>
                    </div>

                    {/* 실시간 통계 카드 */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
                            <div className="text-5xl font-black text-cyan-400 mb-2">{stats.uptime}%</div>
                            <div className="text-gray-300 font-medium mb-1">양자 가동률</div>
                            <div className="text-sm text-gray-400">무중단 양자 연산</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
                            <div className="text-5xl font-black text-blue-400 mb-2">{stats.aiAccuracy.toFixed(2)}%</div>
                            <div className="text-gray-300 font-medium mb-1">뉴럴 AI 정확도</div>
                            <div className="text-sm text-gray-400">뇌-컴퓨터 학습</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
                            <div className="text-5xl font-black text-purple-400 mb-2">{stats.securityIncidents}건</div>
                            <div className="text-gray-300 font-medium mb-1">양자 보안 사고</div>
                            <div className="text-sm text-gray-400">양자 암호화 보호</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-2xl p-8 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-pink-500/20">
                            <div className="text-5xl font-black text-pink-400 mb-2">
                                {(stats.quantumQubits / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-gray-300 font-medium mb-1">양자 큐비트</div>
                            <div className="text-sm text-gray-400">실시간 연산</div>
                        </div>
                    </div>

                    {/* 드론 & 데이터 통계 */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-green-400 mb-2">
                                {(stats.activeDrones / 1000000).toFixed(2)}M
                            </div>
                            <div className="text-gray-300 font-medium mb-1">활성 드론</div>
                            <div className="text-sm text-gray-400">100% 자율 비행</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-blue-400 mb-2">
                                {stats.dataProcessed.toFixed(1)}ZB
                            </div>
                            <div className="text-gray-300 font-medium mb-1">양자 데이터</div>
                            <div className="text-sm text-gray-400">실시간 처리</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {(stats.transactions / 1000000000).toFixed(1)}B
                            </div>
                            <div className="text-gray-300 font-medium mb-1">KAUS 거래</div>
                            <div className="text-sm text-gray-400">양자 블록체인</div>
                        </div>
                    </div>

                    {/* 실시간 로그 스트림 */}
                    <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-lg font-medium text-cyan-400">실시간 시스템 로그</span>
                        </div>
                        <div className="space-y-2 font-mono text-sm max-h-64 overflow-y-auto">
                            {logs.map((log, i) => (
                                <div key={i} className={`${
                                    log.includes('[INFO]') ? 'text-green-400' :
                                    log.includes('[DRONE]') ? 'text-blue-400' :
                                    log.includes('[AI]') ? 'text-purple-400' :
                                    log.includes('[BLOCKCHAIN]') ? 'text-cyan-400' :
                                    log.includes('[QUANTUM]') ? 'text-pink-400' :
                                    log.includes('[SECURITY]') ? 'text-yellow-400' :
                                    'text-gray-400'
                                }`}>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 글로벌 양자 네트워크 */}
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mb-12">
                        <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            양자 컴퓨팅 글로벌 네트워크
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {quantumDataCenters.map((dc, i) => (
                                <div key={i} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/30 hover:scale-105 transition-all backdrop-blur-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                                        <span className="font-bold text-white">{dc.city}</span>
                                    </div>
                                    <div className="text-sm text-gray-400">{dc.country}</div>
                                    <div className="text-xs text-cyan-400 mt-1">{dc.capacity} 용량</div>
                                    <div className="text-xs text-purple-400 mt-1">{dc.qubits} 큐비트</div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-6 text-gray-400">
                            전체 250개국 양자 데이터센터 운영 중
                        </div>
                    </div>

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mb-12">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all"
                        >
                            <span>홈으로 돌아가기</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </main>

                {/* 푸터 */}
                <footer className="border-t border-cyan-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">NEXUS OS 2035 · 양자 데이터베이스 가드 센터 · 전세계 AI/드론 기술력 1위</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
