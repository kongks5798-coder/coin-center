'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 위성 궤도 시뮬레이션 컴포넌트 (동적 로드)
const SatelliteOrbit = dynamic(() => import('@/components/SatelliteNetwork/SatelliteOrbit'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full text-cyan-400 text-2xl animate-pulse">
            위성 네트워크 로딩 중... 🛰️
        </div>
    ),
});

// RFID 태그 타입
interface RFIDTag {
    id: string;
    productId: string;
    productName: string;
    location: { lat: number; lng: number; name: string };
    status: 'in-transit' | 'warehouse' | 'delivered' | 'verified';
    blockchainHash: string;
    satelliteTracked: boolean;
    lastScan: string;
    kausCoinPaid: number;
}

// 위성 정보 타입
interface Satellite {
    id: string;
    name: string;
    orbit: 'LEO' | 'MEO' | 'GEO';
    altitude: number; // km
    inclination: number; // degrees
    coverage: number; // percentage
    activeRFIDTags: number;
    status: 'active' | 'maintenance' | 'offline';
}

// 실시간 통계 훅
const useSatelliteStats = () => {
    const [stats, setStats] = useState({
        totalSatellites: 250,
        activeSatellites: 248,
        trackedRFIDTags: 50000000,
        globalCoverage: 99.8,
        kausTransactions: 125000000000,
        blockchainBlocks: 12500000,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                totalSatellites: 250,
                activeSatellites: prev.activeSatellites + Math.floor(Math.random() * 2 - 1),
                trackedRFIDTags: prev.trackedRFIDTags + Math.floor(Math.random() * 1000),
                globalCoverage: 99.8,
                kausTransactions: prev.kausTransactions + Math.floor(Math.random() * 100000),
                blockchainBlocks: prev.blockchainBlocks + Math.floor(Math.random() * 10),
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return stats;
};

export default function NexusSatellitePage() {
    const stats = useSatelliteStats();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [selectedView, setSelectedView] = useState<'satellites' | 'rfid' | 'blockchain' | 'coverage'>('satellites');

    // 위성 데이터
    const [satellites, setSatellites] = useState<Satellite[]>([
        { id: 'SAT-001', name: 'FIELD NINE Alpha', orbit: 'LEO', altitude: 550, inclination: 98.5, coverage: 45, activeRFIDTags: 200000, status: 'active' },
        { id: 'SAT-002', name: 'FIELD NINE Beta', orbit: 'LEO', altitude: 600, inclination: 97.8, coverage: 42, activeRFIDTags: 180000, status: 'active' },
        { id: 'SAT-003', name: 'FIELD NINE Gamma', orbit: 'MEO', altitude: 20180, inclination: 55, coverage: 60, activeRFIDTags: 250000, status: 'active' },
        { id: 'SAT-004', name: 'FIELD NINE Delta', orbit: 'GEO', altitude: 35786, inclination: 0, coverage: 100, activeRFIDTags: 500000, status: 'active' },
        { id: 'SAT-005', name: 'FIELD NINE Epsilon', orbit: 'LEO', altitude: 580, inclination: 98.2, coverage: 44, activeRFIDTags: 195000, status: 'active' },
    ]);

    // RFID 태그 데이터
    const [rfidTags, setRfidTags] = useState<RFIDTag[]>([
        { id: 'RFID-001', productId: 'PROD-12345', productName: '프리미엄 스니커즈', location: { lat: 37.5665, lng: 126.9780, name: 'Seoul' }, status: 'in-transit', blockchainHash: '0x7a3f...', satelliteTracked: true, lastScan: '2분 전', kausCoinPaid: 1250 },
        { id: 'RFID-002', productId: 'PROD-67890', productName: '럭셔리 핸드백', location: { lat: 40.7128, lng: -74.0060, name: 'New York' }, status: 'warehouse', blockchainHash: '0x9b2e...', satelliteTracked: true, lastScan: '5분 전', kausCoinPaid: 5000 },
        { id: 'RFID-003', productId: 'PROD-11111', productName: '스마트 워치', location: { lat: 35.6762, lng: 139.6503, name: 'Tokyo' }, status: 'delivered', blockchainHash: '0x4c8a...', satelliteTracked: true, lastScan: '1시간 전', kausCoinPaid: 800 },
        { id: 'RFID-004', productId: 'PROD-22222', productName: '프리미엄 향수', location: { lat: 51.5074, lng: -0.1278, name: 'London' }, status: 'in-transit', blockchainHash: '0x6d1f...', satelliteTracked: true, lastScan: '3분 전', kausCoinPaid: 3200 },
        { id: 'RFID-005', productId: 'PROD-33333', productName: '디자이너 의류', location: { lat: 1.3521, lng: 103.8198, name: 'Singapore' }, status: 'verified', blockchainHash: '0x3e9b...', satelliteTracked: true, lastScan: '10분 전', kausCoinPaid: 1500 },
    ]);

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
                ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
                ctx.fill();

                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`;
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
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.3), transparent 70%)`
                }}
            />

            {/* 홀로그램 그리드 */}
            <div className="fixed inset-0 opacity-10 z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-cyan-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <span className="text-2xl">🛰️</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    FIELD NINE NEXUS
                                </div>
                                <div className="text-xs text-gray-400">SATELLITE NETWORK · RFID · BLOCKCHAIN</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">글로벌 커버리지</div>
                                <div className="text-lg font-bold text-green-400">
                                    {stats.globalCoverage}%
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 네비게이션 탭 */}
                <div className="sticky top-24 bg-black/60 backdrop-blur-xl z-10 border-b border-cyan-500/30">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-center gap-8">
                            {[
                                { id: 'satellites', label: '위성 네트워크', icon: '🛰️' },
                                { id: 'rfid', label: 'RFID 추적', icon: '📡' },
                                { id: 'blockchain', label: '블록체인', icon: '⛓️' },
                                { id: 'coverage', label: '글로벌 커버리지', icon: '🌍' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedView(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all ${
                                        selectedView === tab.id
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                                            : 'text-gray-400 hover:text-cyan-400 hover:bg-white/5'
                                    }`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 메인 섹션 */}
                <main className="max-w-7xl mx-auto p-8">
                    {/* 실시간 통계 카드 */}
                    <div className="grid md:grid-cols-6 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-cyan-400 mb-1">
                                {stats.totalSatellites}
                            </div>
                            <div className="text-xs text-gray-400">총 위성</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-green-400 mb-1">
                                {stats.activeSatellites}
                            </div>
                            <div className="text-xs text-gray-400">활성 위성</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-purple-400 mb-1">
                                {(stats.trackedRFIDTags / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-gray-400">추적 중 RFID</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-yellow-400 mb-1">
                                {stats.globalCoverage}%
                            </div>
                            <div className="text-xs text-gray-400">글로벌 커버리지</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-pink-400 mb-1">
                                {(stats.kausTransactions / 1000000000).toFixed(1)}B
                            </div>
                            <div className="text-xs text-gray-400">KAUS 거래</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-indigo-400 mb-1">
                                {(stats.blockchainBlocks / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-gray-400">블록체인 블록</div>
                        </div>
                    </div>

                    {/* 위성 네트워크 뷰 */}
                    {selectedView === 'satellites' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
                                <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
                                    FIELD NINE 위성 네트워크
                                </h3>
                                <div className="relative w-full h-[600px] bg-black/40 rounded-2xl overflow-hidden border border-cyan-500/30 mb-6">
                                    <SatelliteOrbit satellites={satellites} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {satellites.map((sat) => (
                                        <div key={sat.id} className="bg-black/40 rounded-xl p-4 border border-cyan-500/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-lg font-bold text-cyan-400">{sat.name}</div>
                                                <div className={`w-2 h-2 rounded-full ${
                                                    sat.status === 'active' ? 'bg-green-400' : 
                                                    sat.status === 'maintenance' ? 'bg-yellow-400' : 
                                                    'bg-red-400'
                                                } animate-pulse`}></div>
                                            </div>
                                            <div className="text-sm text-gray-400 mb-1">궤도: {sat.orbit}</div>
                                            <div className="text-sm text-gray-400 mb-1">고도: {sat.altitude.toLocaleString()} km</div>
                                            <div className="text-sm text-gray-400 mb-1">커버리지: {sat.coverage}%</div>
                                            <div className="text-sm text-cyan-400 mt-2">추적 중: {(sat.activeRFIDTags / 1000).toFixed(0)}K 태그</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RFID 추적 뷰 */}
                    {selectedView === 'rfid' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-2xl font-bold text-purple-400 mb-6">실시간 RFID 태그 추적</h3>
                                <div className="space-y-4">
                                    {rfidTags.map((tag) => (
                                        <div key={tag.id} className="bg-black/40 rounded-xl p-6 border border-purple-500/30">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="text-lg font-bold text-purple-400">{tag.productName}</div>
                                                    <div className="text-sm text-gray-400">ID: {tag.id}</div>
                                                </div>
                                                <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                    tag.status === 'in-transit' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    tag.status === 'warehouse' ? 'bg-blue-500/20 text-blue-400' :
                                                    tag.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                                    'bg-purple-500/20 text-purple-400'
                                                }`}>
                                                    {tag.status === 'in-transit' ? '배송 중' :
                                                     tag.status === 'warehouse' ? '창고' :
                                                     tag.status === 'delivered' ? '배송 완료' :
                                                     '인증 완료'}
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-4 gap-4">
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-1">위치</div>
                                                    <div className="text-sm font-bold text-white">{tag.location.name}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-1">블록체인 해시</div>
                                                    <div className="text-sm font-mono text-cyan-400">{tag.blockchainHash}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-1">마지막 스캔</div>
                                                    <div className="text-sm font-bold text-yellow-400">{tag.lastScan}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-1">KAUS 코인</div>
                                                    <div className="text-sm font-bold text-purple-400">{tag.kausCoinPaid.toLocaleString()} KAUS</div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    tag.satelliteTracked ? 'bg-green-400' : 'bg-gray-400'
                                                } animate-pulse`}></div>
                                                <span className="text-xs text-gray-400">
                                                    {tag.satelliteTracked ? '위성 추적 중' : '위성 추적 대기'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 블록체인 뷰 */}
                    {selectedView === 'blockchain' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-2xl font-bold text-indigo-400 mb-6">KAUS 블록체인 네트워크</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-black/40 rounded-xl p-6 border border-indigo-500/30">
                                        <div className="text-3xl font-black text-indigo-400 mb-2">
                                            {(stats.blockchainBlocks / 1000000).toFixed(1)}M
                                        </div>
                                        <div className="text-sm text-gray-400 mb-1">총 블록</div>
                                        <div className="text-xs text-green-400">+{Math.floor(Math.random() * 10)} 블록/분</div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-6 border border-indigo-500/30">
                                        <div className="text-3xl font-black text-indigo-400 mb-2">
                                            {(stats.kausTransactions / 1000000000).toFixed(1)}B
                                        </div>
                                        <div className="text-sm text-gray-400 mb-1">총 거래</div>
                                        <div className="text-xs text-green-400">+{Math.floor(Math.random() * 1000)} 거래/초</div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-6 border border-indigo-500/30">
                                        <div className="text-3xl font-black text-indigo-400 mb-2">
                                            99.99%
                                        </div>
                                        <div className="text-sm text-gray-400 mb-1">네트워크 가동률</div>
                                        <div className="text-xs text-green-400">양자 암호화 보호</div>
                                    </div>
                                </div>
                                <div className="mt-8 bg-black/40 rounded-xl p-6 border border-indigo-500/30">
                                    <h4 className="text-lg font-bold text-indigo-400 mb-4">최근 블록체인 거래</h4>
                                    <div className="space-y-3 font-mono text-sm">
                                        {rfidTags.slice(0, 5).map((tag) => (
                                            <div key={tag.id} className="flex items-center justify-between p-3 bg-black/40 rounded border border-indigo-500/20">
                                                <div>
                                                    <div className="text-cyan-400">{tag.blockchainHash}</div>
                                                    <div className="text-xs text-gray-400 mt-1">{tag.productName}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-purple-400 font-bold">{tag.kausCoinPaid.toLocaleString()} KAUS</div>
                                                    <div className="text-xs text-gray-400">{tag.lastScan}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 글로벌 커버리지 뷰 */}
                    {selectedView === 'coverage' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">
                                    글로벌 커버리지: {stats.globalCoverage}%
                                </h3>
                                <div className="grid md:grid-cols-4 gap-6">
                                    <div className="bg-black/40 rounded-xl p-6 border border-green-500/30 text-center">
                                        <div className="text-4xl font-black text-green-400 mb-2">250</div>
                                        <div className="text-sm text-gray-400">국가</div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-6 border border-green-500/30 text-center">
                                        <div className="text-4xl font-black text-green-400 mb-2">135</div>
                                        <div className="text-sm text-gray-400">배송 국가</div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-6 border border-green-500/30 text-center">
                                        <div className="text-4xl font-black text-green-400 mb-2">24/7</div>
                                        <div className="text-sm text-gray-400">실시간 추적</div>
                                    </div>
                                    <div className="bg-black/40 rounded-xl p-6 border border-green-500/30 text-center">
                                        <div className="text-4xl font-black text-green-400 mb-2">99.9%</div>
                                        <div className="text-sm text-gray-400">정확도</div>
                                    </div>
                                </div>
                                <div className="mt-8 bg-black/40 rounded-xl p-6 border border-green-500/30">
                                    <h4 className="text-lg font-bold text-green-400 mb-4">FIELD NINE NEXUS THE FIELD NINE</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        RFID 코드화 KAUS 코인 기술로 전 세계를 연결합니다. 위성 네트워크를 통해 지구 어디서나 실시간 추적이 가능하며, 
                                        블록체인으로 모든 거래와 이동을 기록합니다. 이것이 바로 <span className="text-green-400 font-bold">"지구를 먹는"</span> 기술입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mt-12 mb-24">
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
                <footer className="border-t border-cyan-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">FIELD NINE NEXUS THE FIELD NINE · 위성 네트워크 · RFID · 블록체인 · 글로벌 플랫폼</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

