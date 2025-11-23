'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import RFIDTagVisual from '@/components/KausTrace/RFIDTagVisual';
import ProductTrackingMap from '@/components/KausTrace/ProductTrackingMap';
import BlockchainTransactionList from '@/components/KausTrace/BlockchainTransactionList';

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

                {/* 실제 RFID 태그 시각화 섹션 */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-6xl md:text-8xl font-black mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    실제 RFID 태그
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400">실제 제품에 부착되는 KAUS TRACE RFID 태그</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <RFIDTagVisual
                                tagId="RFID-KT-001234"
                                productName="프리미엄 스니커즈"
                                status="active"
                                location="Seoul, South Korea"
                                blockchainHash="0x7a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0"
                                kausPaid={1250}
                            />
                            <RFIDTagVisual
                                tagId="RFID-KT-005678"
                                productName="럭셔리 핸드백"
                                status="in-transit"
                                location="New York, USA"
                                blockchainHash="0x9b2e4c6d8f0a1b3c5d7e9f0a2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d0e2f3a5b7"
                                kausPaid={5000}
                            />
                            <RFIDTagVisual
                                tagId="RFID-KT-009012"
                                productName="스마트 워치"
                                status="delivered"
                                location="Tokyo, Japan"
                                blockchainHash="0x4c8a1d3e5f7a9b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8"
                                kausPaid={800}
                            />
                        </div>
                    </div>
                </section>

                {/* 실제 제품 추적 섹션 */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-6xl md:text-8xl font-black mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    실시간 제품 추적
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400">지도에서 실시간으로 제품 이동 경로 확인</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <ProductTrackingMap
                                productId="PROD-12345"
                                productName="프리미엄 스니커즈"
                                trackingPoints={[
                                    { id: '1', name: '이탈리아 공장', lat: 41.9028, lng: 12.4964, timestamp: '2025-11-20 10:00', status: 'warehouse' },
                                    { id: '2', name: '인천항', lat: 37.4563, lng: 126.6322, timestamp: '2025-11-21 14:30', status: 'in-transit' },
                                    { id: '3', name: '서울 창고', lat: 37.5665, lng: 126.9780, timestamp: '2025-11-22 09:15', status: 'warehouse' },
                                    { id: '4', name: '강남 매장', lat: 37.4979, lng: 127.0276, timestamp: '2025-11-23 11:00', status: 'delivered' },
                                ]}
                            />
                            <ProductTrackingMap
                                productId="PROD-67890"
                                productName="럭셔리 핸드백"
                                trackingPoints={[
                                    { id: '1', name: '프랑스 공장', lat: 48.8566, lng: 2.3522, timestamp: '2025-11-19 08:00', status: 'warehouse' },
                                    { id: '2', name: '런던 창고', lat: 51.5074, lng: -0.1278, timestamp: '2025-11-20 16:00', status: 'warehouse' },
                                    { id: '3', name: '뉴욕 항구', lat: 40.7128, lng: -74.0060, timestamp: '2025-11-22 10:30', status: 'in-transit' },
                                    { id: '4', name: '뉴욕 매장', lat: 40.7589, lng: -73.9851, timestamp: '2025-11-23 15:00', status: 'delivered' },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* 실제 블록체인 거래 내역 섹션 */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-6xl md:text-8xl font-black mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    블록체인 거래 내역
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400">실제 KAUS 코인 거래 기록 및 블록체인 해시</p>
                        </div>

                        <BlockchainTransactionList />
                    </div>
                </section>

                {/* 실제 사용 사례 섹션 */}
                <section className="relative py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-6xl md:text-8xl font-black mb-6">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    실제 사용 사례
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">👟</div>
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">프리미엄 스니커즈</h3>
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>이탈리아 → 한국 배송 추적</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>정품 인증 완료</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>1,250 KAUS 결제</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="text-sm text-gray-400">블록체인 해시</div>
                                        <div className="text-xs font-mono text-purple-400 break-all">0x7a3f...f9a0</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">👜</div>
                                <h3 className="text-2xl font-bold text-blue-400 mb-4">럭셔리 핸드백</h3>
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">🚚</span>
                                        <span>프랑스 → 뉴욕 배송 중</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>위성 추적 활성</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>5,000 KAUS 결제</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="text-sm text-gray-400">블록체인 해시</div>
                                        <div className="text-xs font-mono text-blue-400 break-all">0x9b2e...f3a5</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="text-5xl mb-4">⌚</div>
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4">스마트 워치</h3>
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>배송 완료</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>고객 수령 확인</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✅</span>
                                        <span>800 KAUS 결제</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="text-sm text-gray-400">블록체인 해시</div>
                                        <div className="text-xs font-mono text-cyan-400 break-all">0x4c8a...f4a6</div>
                                    </div>
                                </div>
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

