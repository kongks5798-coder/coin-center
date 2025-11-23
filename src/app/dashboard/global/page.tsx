'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 3D 지구본 동적 로드 (SSR 방지)
const Globe3D = dynamic(() => import('@/components/GlobalDashboard/Globe3D'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full text-cyan-400 text-2xl animate-pulse">
            양자 지구본 로딩 중... 🌍
        </div>
    ),
});

// 양자 데이터센터 타입
interface DataCenter {
    id: string;
    name: string;
    country: string;
    lat: number;
    lng: number;
    qubits: number;
    status: 'active' | 'warning' | 'critical';
    capacity: string;
}

// 드론 배송 타입
interface Drone {
    id: string;
    from: { lat: number; lng: number; name: string };
    to: { lat: number; lng: number; name: string };
    progress: number;
    speed: number;
    status: 'flying' | 'delivered' | 'loading';
}

// 실시간 통계 훅
const useGlobalStats = () => {
    const [stats, setStats] = useState({
        kausTransactions: 124000000000,
        bciUsers: 50000000,
        metaverseUsers: 2500000000,
        activeDrones: 1250000,
        quantumQubits: 12500000,
        dataCenters: 250,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                kausTransactions: prev.kausTransactions + Math.floor(Math.random() * 100000),
                bciUsers: prev.bciUsers + Math.floor(Math.random() * 100 - 50),
                metaverseUsers: prev.metaverseUsers + Math.floor(Math.random() * 10000 - 5000),
                activeDrones: prev.activeDrones + Math.floor(Math.random() * 100 - 50),
                quantumQubits: prev.quantumQubits + Math.floor(Math.random() * 1000 - 500),
                dataCenters: 250,
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return stats;
};

// 차트 데이터 생성
const generateChartData = (count: number = 30) => {
    const data = [];
    const now = Date.now();
    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now - i * 60000); // 1분 간격
        data.push({
            time: time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            kaus: 120000000000 + Math.random() * 10000000000,
            bci: 49000000 + Math.random() * 2000000,
            metaverse: 2480000000 + Math.random() * 40000000,
            drones: 1240000 + Math.random() * 20000,
        });
    }
    return data;
};

export default function GlobalDashboardPage() {
    const stats = useGlobalStats();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [chartData, setChartData] = useState(generateChartData(30));
    const [selectedView, setSelectedView] = useState<'globe' | 'stats' | 'drones'>('globe');

    // 양자 데이터센터 데이터 (250개국 중 주요 20개)
    const [dataCenters, setDataCenters] = useState<DataCenter[]>([
        { id: '1', name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, qubits: 1000000, status: 'active', capacity: '10ZB' },
        { id: '2', name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, qubits: 1500000, status: 'active', capacity: '15ZB' },
        { id: '3', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, qubits: 1200000, status: 'active', capacity: '12ZB' },
        { id: '4', name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, qubits: 900000, status: 'active', capacity: '9ZB' },
        { id: '5', name: 'Frankfurt', country: 'Germany', lat: 50.1109, lng: 8.6821, qubits: 1100000, status: 'active', capacity: '11ZB' },
        { id: '6', name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, qubits: 950000, status: 'active', capacity: '9.5ZB' },
        { id: '7', name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, qubits: 800000, status: 'active', capacity: '8ZB' },
        { id: '8', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, qubits: 850000, status: 'active', capacity: '8.5ZB' },
        { id: '9', name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, qubits: 1300000, status: 'active', capacity: '13ZB' },
        { id: '10', name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, qubits: 700000, status: 'active', capacity: '7ZB' },
        { id: '11', name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, qubits: 750000, status: 'active', capacity: '7.5ZB' },
        { id: '12', name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, qubits: 880000, status: 'active', capacity: '8.8ZB' },
        { id: '13', name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, qubits: 920000, status: 'active', capacity: '9.2ZB' },
        { id: '14', name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173, qubits: 820000, status: 'active', capacity: '8.2ZB' },
        { id: '15', name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, qubits: 680000, status: 'active', capacity: '6.8ZB' },
    ]);

    // 드론 배송 데이터
    const [drones, setDrones] = useState<Drone[]>([
        { id: 'drone-1', from: { lat: 37.5665, lng: 126.9780, name: 'Seoul' }, to: { lat: 35.6762, lng: 139.6503, name: 'Tokyo' }, progress: 45, speed: 120, status: 'flying' },
        { id: 'drone-2', from: { lat: 40.7128, lng: -74.0060, name: 'New York' }, to: { lat: 51.5074, lng: -0.1278, name: 'London' }, progress: 72, speed: 150, status: 'flying' },
        { id: 'drone-3', from: { lat: 1.3521, lng: 103.8198, name: 'Singapore' }, to: { lat: -33.8688, lng: 151.2093, name: 'Sydney' }, progress: 28, speed: 110, status: 'flying' },
        { id: 'drone-4', from: { lat: 31.2304, lng: 121.4737, name: 'Shanghai' }, to: { lat: 37.5665, lng: 126.9780, name: 'Seoul' }, progress: 89, speed: 130, status: 'flying' },
        { id: 'drone-5', from: { lat: 50.1109, lng: 8.6821, name: 'Frankfurt' }, to: { lat: 48.8566, lng: 2.3522, name: 'Paris' }, progress: 15, speed: 100, status: 'flying' },
    ]);

    // 드론 진행률 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setDrones(prev => prev.map(drone => {
                if (drone.status === 'flying') {
                    const newProgress = Math.min(drone.progress + Math.random() * 2, 100);
                    return {
                        ...drone,
                        progress: newProgress,
                        status: newProgress >= 100 ? 'delivered' : 'flying'
                    };
                }
                return drone;
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // 차트 데이터 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setChartData(prev => {
                const newData = [...prev];
                newData.shift();
                const now = new Date();
                newData.push({
                    time: now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                    kaus: stats.kausTransactions,
                    bci: stats.bciUsers,
                    metaverse: stats.metaverseUsers,
                    drones: stats.activeDrones,
                });
                return newData;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [stats]);

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
                                <span className="text-2xl">🌍</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    글로벌 대시보드 2035
                                </div>
                                <div className="text-xs text-gray-400">REAL-TIME GLOBAL MONITORING</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">실시간 동기화</div>
                                <div className="text-lg font-bold text-green-400">
                                    활성
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
                                { id: 'globe', label: '3D 지구본', icon: '🌍' },
                                { id: 'stats', label: '실시간 통계', icon: '📊' },
                                { id: 'drones', label: '드론 추적', icon: '🚁' },
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
                    {/* 실시간 통계 카드 (상단 고정) */}
                    <div className="grid md:grid-cols-6 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-purple-400 mb-1">
                                {(stats.kausTransactions / 1000000000).toFixed(1)}B
                            </div>
                            <div className="text-xs text-gray-400">KAUS 거래</div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-cyan-400 mb-1">
                                {(stats.bciUsers / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-gray-400">BCI 사용자</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-green-400 mb-1">
                                {(stats.metaverseUsers / 1000000000).toFixed(2)}B
                            </div>
                            <div className="text-xs text-gray-400">메타버스</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-yellow-400 mb-1">
                                {(stats.activeDrones / 1000000).toFixed(2)}M
                            </div>
                            <div className="text-xs text-gray-400">활성 드론</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-pink-400 mb-1">
                                {(stats.quantumQubits / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-gray-400">양자 큐비트</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="text-2xl font-black text-indigo-400 mb-1">
                                {stats.dataCenters}
                            </div>
                            <div className="text-xs text-gray-400">데이터센터</div>
                        </div>
                    </div>

                    {/* 3D 지구본 뷰 */}
                    {selectedView === 'globe' && (
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 mb-8">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
                                양자 데이터센터 글로벌 네트워크
                            </h3>
                            <div className="relative w-full h-[600px] bg-black/40 rounded-2xl overflow-hidden border border-cyan-500/30">
                                <Globe3D dataCenters={dataCenters} drones={drones} />
                            </div>
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                                {dataCenters.slice(0, 5).map((dc) => (
                                    <div key={dc.id} className="bg-black/40 rounded-xl p-3 border border-cyan-500/30">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`w-2 h-2 rounded-full ${
                                                dc.status === 'active' ? 'bg-green-400' : 
                                                dc.status === 'warning' ? 'bg-yellow-400' : 
                                                'bg-red-400'
                                            } animate-pulse`}></div>
                                            <span className="text-sm font-bold text-white">{dc.name}</span>
                                        </div>
                                        <div className="text-xs text-gray-400">{dc.country}</div>
                                        <div className="text-xs text-cyan-400 mt-1">{(dc.qubits / 1000).toFixed(0)}K 큐비트</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 실시간 통계 차트 뷰 */}
                    {selectedView === 'stats' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-2xl font-bold text-purple-400 mb-6">KAUS 코인 거래량</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="kausGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="time" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #6b7280' }}
                                            labelStyle={{ color: '#e5e7eb' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="kaus" 
                                            stroke="#a855f7" 
                                            fillOpacity={1} 
                                            fill="url(#kausGradient)" 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                    <h3 className="text-2xl font-bold text-cyan-400 mb-6">BCI 사용자</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="time" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #6b7280' }}
                                            />
                                            <Line type="monotone" dataKey="bci" stroke="#06b6d4" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                    <h3 className="text-2xl font-bold text-green-400 mb-6">메타버스 접속자</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="time" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #6b7280' }}
                                            />
                                            <Line type="monotone" dataKey="metaverse" stroke="#10b981" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 드론 추적 뷰 */}
                    {selectedView === 'drones' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-2xl font-bold text-yellow-400 mb-6">실시간 드론 배송 추적</h3>
                                <div className="space-y-4">
                                    {drones.map((drone) => (
                                        <div key={drone.id} className="bg-black/40 rounded-xl p-6 border border-yellow-500/30">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="text-lg font-bold text-yellow-400">{drone.id.toUpperCase()}</div>
                                                    <div className="text-sm text-gray-400">
                                                        {drone.from.name} → {drone.to.name}
                                                    </div>
                                                </div>
                                                <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                    drone.status === 'flying' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    drone.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                    {drone.status === 'flying' ? '비행 중' : 
                                                     drone.status === 'delivered' ? '배송 완료' : '로딩 중'}
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-400">진행률</span>
                                                    <span className="text-yellow-400 font-bold">{drone.progress.toFixed(0)}%</span>
                                                </div>
                                                <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-yellow-500/30">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                                                        style={{ width: `${drone.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-1">속도</div>
                                                    <div className="text-lg font-bold text-yellow-400">{drone.speed} km/h</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400 mb-1">예상 도착</div>
                                                    <div className="text-lg font-bold text-orange-400">
                                                        {Math.ceil((100 - drone.progress) / (drone.speed / 60))}분
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                        <p className="mt-2">글로벌 대시보드 2035 · 실시간 모니터링 · 양자 컴퓨팅 네트워크</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

