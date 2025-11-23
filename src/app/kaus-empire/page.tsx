'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 3D 캐릭터 컴포넌트 동적 로드 (SSR 방지)
const Character3D = dynamic(() => import('@/components/KausEmpire/Character3D'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl animate-pulse">👑</div>
        </div>
    )
});

// 파티클 효과 컴포넌트 (클라이언트 전용 - hydration 오류 방지)
function ParticleEffects() {
    const [particles, setParticles] = useState<Array<{
        left: number;
        top: number;
        delay: number;
        duration: number;
    }>>([]);

    useEffect(() => {
        // 클라이언트에서만 랜덤 값 생성
        setParticles(
            Array.from({ length: 30 }, () => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 3,
                duration: 1.5 + Math.random() * 1.5
            }))
        );
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        opacity: 0.6
                    }}
                />
            ))}
        </div>
    );
}

// 유비 캐릭터 데이터
interface Character {
    name: string;
    level: number;
    exp: number;
    expMax: number;
    hp: number;
    hpMax: number;
    mp: number;
    mpMax: number;
    attack: number;
    defense: number;
    kausCoin: number;
    title: string;
    class: string;
    location: string;
    territory: number;
    soldiers: number;
    skills: Array<{ name: string; level: number; cooldown: number }>;
    inventory: Array<{ name: string; count: number; rarity: string }>;
}

// 삼국지 성 위치 데이터
interface Castle {
    name: string;
    x: number;
    y: number;
    owner: string;
    level: number;
    soldiers: number;
    type: 'capital' | 'city' | 'fortress';
}

// 2035년 실시간 통계
const useEmpireStats = () => {
    const [stats, setStats] = useState({
        totalPlayers: 5000000,
        onlinePlayers: 1250000,
        totalKausSpent: 50000000000,
        activeGuilds: 50000
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                totalPlayers: prev.totalPlayers + Math.floor(Math.random() * 100 - 50),
                onlinePlayers: prev.onlinePlayers + Math.floor(Math.random() * 1000 - 500),
                totalKausSpent: prev.totalKausSpent + Math.floor(Math.random() * 100000),
                activeGuilds: prev.activeGuilds + Math.floor(Math.random() * 10 - 5)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return stats;
};

export default function KausEmpirePage() {
    const stats = useEmpireStats();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mapCanvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [selectedView, setSelectedView] = useState<'character' | 'map' | 'battle' | 'castle' | 'alliance'>('character');
    const [character, setCharacter] = useState<Character>({
        name: '유비',
        level: 85,
        exp: 1250000,
        expMax: 1500000,
        hp: 12500,
        hpMax: 15000,
        mp: 8500,
        mpMax: 10000,
        attack: 2850,
        defense: 1950,
        kausCoin: 1250000,
        title: '한실의 후예',
        class: '군주',
        location: '서촉',
        territory: 12,
        soldiers: 85000,
        skills: [
            { name: '인덕', level: 10, cooldown: 0 },
            { name: '의리', level: 9, cooldown: 30 },
            { name: '인망', level: 8, cooldown: 60 },
            { name: '통솔', level: 10, cooldown: 0 }
        ],
        inventory: [
            { name: '쌍고검', count: 1, rarity: 'legendary' },
            { name: '적토마', count: 1, rarity: 'legendary' },
            { name: '군량', count: 50000, rarity: 'common' },
            { name: '무기 강화석', count: 150, rarity: 'rare' }
        ]
    });

    // 삼국지 성 위치
    const castles: Castle[] = [
        { name: '낙양', x: 50, y: 30, owner: '조조', level: 10, soldiers: 120000, type: 'capital' },
        { name: '서촉', x: 25, y: 60, owner: '유비', level: 9, soldiers: 85000, type: 'capital' },
        { name: '건업', x: 75, y: 50, owner: '손권', level: 9, soldiers: 90000, type: 'capital' },
        { name: '허창', x: 45, y: 35, owner: '조조', level: 8, soldiers: 65000, type: 'city' },
        { name: '성도', x: 20, y: 65, owner: '유비', level: 8, soldiers: 60000, type: 'city' },
        { name: '장안', x: 40, y: 25, owner: '조조', level: 7, soldiers: 50000, type: 'city' },
        { name: '오', x: 80, y: 55, owner: '손권', level: 7, soldiers: 55000, type: 'city' },
        { name: '형주', x: 55, y: 45, owner: '유비', level: 6, soldiers: 40000, type: 'fortress' }
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
            color: string;
        }> = [];

        const colors = ['rgba(234, 179, 8, 0.6)', 'rgba(217, 119, 6, 0.6)', 'rgba(239, 68, 68, 0.6)', 'rgba(147, 51, 234, 0.6)'];

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

                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(234, 179, 8, ${0.15 * (1 - distance / 200)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    // 삼국지 맵 그리기
    useEffect(() => {
        const canvas = mapCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const drawMap = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 배경 (중국 지도 형태)
            ctx.fillStyle = 'rgba(20, 20, 30, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 강/하천
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.3, canvas.height * 0.2);
            ctx.lineTo(canvas.width * 0.7, canvas.height * 0.4);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.2, canvas.height * 0.5);
            ctx.lineTo(canvas.width * 0.8, canvas.height * 0.6);
            ctx.stroke();

            // 성 표시
            castles.forEach(castle => {
                const x = (castle.x / 100) * canvas.width;
                const y = (castle.y / 100) * canvas.height;

                // 성 아이콘
                const size = castle.type === 'capital' ? 20 : castle.type === 'city' ? 15 : 10;
                const color = castle.owner === '유비' ? 'rgba(234, 179, 8, 0.8)' : 
                             castle.owner === '조조' ? 'rgba(239, 68, 68, 0.8)' : 
                             'rgba(59, 130, 246, 0.8)';

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // 성 이름
                ctx.fillStyle = 'white';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(castle.name, x, y - size - 5);
            });

            // 영토 경계선
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo((20 / 100) * canvas.width, (60 / 100) * canvas.height);
            ctx.lineTo((25 / 100) * canvas.width, (65 / 100) * canvas.height);
            ctx.lineTo((55 / 100) * canvas.width, (45 / 100) * canvas.height);
            ctx.lineTo((20 / 100) * canvas.width, (60 / 100) * canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);
        };

        drawMap();
        const interval = setInterval(drawMap, 100);
        return () => clearInterval(interval);
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
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(234, 179, 8, 0.4), rgba(217, 119, 6, 0.3), rgba(239, 68, 68, 0.2), transparent 70%)`
                }}
            />

            {/* 홀로그램 그리드 */}
            <div className="fixed inset-0 opacity-10 z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
            }} />

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 min-h-screen">
                {/* 헤더 */}
                <header className="sticky top-0 border-b border-yellow-500/30 bg-black/50 backdrop-blur-2xl p-6 z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                <span className="text-2xl">👑</span>
                            </div>
                            <div>
                                <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    KAUS 제국
                                </div>
                                <div className="text-xs text-gray-400">EMPIRE 2035</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">온라인 플레이어</div>
                                <div className="text-lg font-bold text-yellow-400">
                                    {(stats.onlinePlayers / 1000000).toFixed(2)}M
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        </div>
                    </div>
                </header>

                {/* 네비게이션 탭 */}
                <div className="sticky top-20 bg-black/30 backdrop-blur-xl border-b border-yellow-500/30 z-10">
                    <div className="max-w-7xl mx-auto px-8 py-4">
                        <div className="flex gap-4 overflow-x-auto">
                            {[
                                { id: 'character', label: '캐릭터', icon: '👤' },
                                { id: 'map', label: '지도', icon: '🗺️' },
                                { id: 'battle', label: '전투', icon: '⚔️' },
                                { id: 'castle', label: '성', icon: '🏰' },
                                { id: 'alliance', label: '동맹', icon: '🤝' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedView(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                                        selectedView === tab.id
                                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
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
                    {/* 캐릭터 뷰 */}
                    {selectedView === 'character' && (
                        <div className="space-y-8">
                            {/* 캐릭터 3D 표시 영역 */}
                            <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border-2 border-yellow-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-yellow-500/20">
                                <div className="grid md:grid-cols-3 gap-8">
                                    {/* 3D 캐릭터 표시 - 게임 스타일 */}
                                    <div className="md:col-span-2">
                                        <div className="relative aspect-square bg-gradient-to-br from-yellow-900/40 via-orange-900/40 to-red-900/40 rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/30">
                                            {/* 배경 그라디언트 */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-orange-500/20"></div>
                                            
                                            {/* 3D 캐릭터 (유비) - Three.js */}
                                            <div className="absolute inset-0 z-10">
                                                <Character3D />
                                            </div>
                                            
                                            {/* 캐릭터 정보 오버레이 - 게임 스타일 */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-xl border-t-2 border-yellow-500/50 p-6 z-20">
                                                <div className="flex items-end justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="text-2xl font-black text-yellow-400">{character.name}</div>
                                                            <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-sm font-bold text-yellow-400">
                                                                Lv.{character.level}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-300 mb-1">{character.title}</div>
                                                        <div className="text-xs text-gray-400">{character.class}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs text-gray-400 mb-1">현재 위치</div>
                                                        <div className="text-lg font-bold text-orange-400">{character.location}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* 파티클 효과 - 황금빛 (클라이언트 전용) */}
                                            <ParticleEffects />
                                            
                                            {/* 빛나는 효과 */}
                                            <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
                                            <div className="absolute bottom-4 left-4 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                                        </div>
                                    </div>

                                    {/* 캐릭터 정보 */}
                                    <div className="space-y-4">
                                        <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
                                            <div className="text-xs text-gray-400 mb-2">현재 위치</div>
                                            <div className="text-xl font-bold text-yellow-400">{character.location}</div>
                                        </div>
                                        <div className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-4">
                                            <div className="text-xs text-gray-400 mb-2">영토</div>
                                            <div className="text-xl font-bold text-orange-400">{character.territory}개 성</div>
                                        </div>
                                        <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
                                            <div className="text-xs text-gray-400 mb-2">병력</div>
                                            <div className="text-xl font-bold text-red-400">{character.soldiers.toLocaleString()}명</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 스탯 바 */}
                            <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border-2 border-yellow-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-2xl font-bold text-yellow-400 mb-6">상태</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-red-400 font-medium">HP</span>
                                            <span className="text-gray-300">{character.hp.toLocaleString()} / {character.hpMax.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-8 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
                                            <div 
                                                className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                                                style={{ width: `${(character.hp / character.hpMax) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-blue-400 font-medium">MP</span>
                                            <span className="text-gray-300">{character.mp.toLocaleString()} / {character.mpMax.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-8 bg-black/50 rounded-full overflow-hidden border border-blue-500/30">
                                            <div 
                                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                                                style={{ width: `${(character.mp / character.mpMax) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-green-400 font-medium">경험치</span>
                                            <span className="text-gray-300">{character.exp.toLocaleString()} / {character.expMax.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-8 bg-black/50 rounded-full overflow-hidden border border-green-500/30">
                                            <div 
                                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                                                style={{ width: `${(character.exp / character.expMax) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* 스탯 */}
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
                                        <div className="text-xs text-gray-400 mb-1">공격력</div>
                                        <div className="text-3xl font-black text-yellow-400">{character.attack.toLocaleString()}</div>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
                                        <div className="text-xs text-gray-400 mb-1">방어력</div>
                                        <div className="text-3xl font-black text-blue-400">{character.defense.toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>

                            {/* 스킬 & 인벤토리 */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* 스킬 */}
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                    <h3 className="text-2xl font-bold text-purple-400 mb-6">스킬</h3>
                                    <div className="space-y-3">
                                        {character.skills.map((skill, i) => (
                                            <div key={i} className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-white">{skill.name}</span>
                                                    <span className="text-sm text-purple-400">Lv.{skill.level}</span>
                                                </div>
                                                {skill.cooldown > 0 && (
                                                    <div className="text-xs text-gray-400">쿨타임: {skill.cooldown}초</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 인벤토리 */}
                                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                    <h3 className="text-2xl font-bold text-blue-400 mb-6">인벤토리</h3>
                                    <div className="space-y-3">
                                        {character.inventory.map((item, i) => (
                                            <div key={i} className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="font-bold text-white">{item.name}</span>
                                                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                                                            item.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            item.rarity === 'rare' ? 'bg-purple-500/20 text-purple-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                        }`}>
                                                            {item.rarity === 'legendary' ? '전설' : item.rarity === 'rare' ? '희귀' : '일반'}
                                                        </span>
                                                    </div>
                                                    <span className="text-blue-400 font-bold">{item.count.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 지도 뷰 */}
                    {selectedView === 'map' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border-2 border-yellow-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-yellow-500/20">
                                <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center">삼국지 지도</h3>
                                <div className="relative aspect-video bg-gradient-to-br from-yellow-900/30 via-orange-900/30 to-red-900/30 rounded-2xl overflow-hidden border border-yellow-500/30">
                                    <canvas ref={mapCanvasRef} className="w-full h-full" />
                                </div>
                                
                                {/* 성 목록 */}
                                <div className="grid md:grid-cols-4 gap-4 mt-8">
                                    {castles.map((castle, i) => (
                                        <div key={i} className={`bg-black/40 backdrop-blur-xl border rounded-xl p-4 ${
                                            castle.owner === '유비' ? 'border-yellow-500/50' :
                                            castle.owner === '조조' ? 'border-red-500/50' :
                                            'border-blue-500/50'
                                        }`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    castle.owner === '유비' ? 'bg-yellow-400' :
                                                    castle.owner === '조조' ? 'bg-red-400' :
                                                    'bg-blue-400'
                                                }`}></div>
                                                <span className="font-bold text-white">{castle.name}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 mb-1">소유: {castle.owner}</div>
                                            <div className="text-xs text-gray-400 mb-1">레벨: {castle.level}</div>
                                            <div className="text-xs text-gray-400">병력: {castle.soldiers.toLocaleString()}명</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 전투 뷰 */}
                    {selectedView === 'battle' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-red-400 mb-6">전투 시스템</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-6">
                                        <h4 className="text-xl font-bold text-red-400 mb-4">PvP 전투</h4>
                                        <p className="text-gray-300 mb-4">다른 플레이어와 실시간 전투</p>
                                        <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold hover:scale-105 transition-all">
                                            전투 시작 (KAUS COIN: 100)
                                        </button>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
                                        <h4 className="text-xl font-bold text-orange-400 mb-4">PvE 전투</h4>
                                        <p className="text-gray-300 mb-4">NPC와 전투하여 경험치 획득</p>
                                        <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl font-bold hover:scale-105 transition-all">
                                            전투 시작 (KAUS COIN: 50)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 성 뷰 */}
                    {selectedView === 'castle' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-orange-400 mb-6">성 관리</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {castles.filter(c => c.owner === '유비').map((castle, i) => (
                                        <div key={i} className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
                                            <div className="text-4xl mb-4 text-center">🏰</div>
                                            <h4 className="text-xl font-bold text-orange-400 mb-2 text-center">{castle.name}</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">레벨</span>
                                                    <span className="text-white">{castle.level}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">병력</span>
                                                    <span className="text-white">{castle.soldiers.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl font-bold hover:scale-105 transition-all">
                                                업그레이드 (KAUS COIN)
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 동맹 뷰 */}
                    {selectedView === 'alliance' && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-purple-400 mb-6">동맹 시스템</h3>
                                <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6 mb-6">
                                    <h4 className="text-xl font-bold text-purple-400 mb-4">내 길드: 한실 부흥단</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">멤버</div>
                                            <div className="text-lg font-bold text-white">1,250명</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">순위</div>
                                            <div className="text-lg font-bold text-yellow-400">#3</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">기부</div>
                                            <div className="text-lg font-bold text-purple-400">125,000 KAUS</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-xl hover:scale-105 transition-all">
                                    기부하기 (KAUS COIN)
                                </button>
                            </div>
                        </div>
                    )}

                    {/* KAUS COIN 지갑 (항상 표시) */}
                    <div className="fixed bottom-8 right-8 z-30">
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
                            <div className="text-center mb-4">
                                <div className="text-3xl mb-2">💰</div>
                                <div className="text-xs text-gray-400 mb-1">KAUS COIN</div>
                                <div className="text-2xl font-black text-purple-400">
                                    {character.kausCoin.toLocaleString()}
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-sm hover:scale-105 transition-all">
                                충전하기
                            </button>
                        </div>
                    </div>

                    {/* 게임 통계 */}
                    <div className="grid md:grid-cols-4 gap-6 mt-12 mb-12">
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-yellow-500/20">
                            <div className="text-3xl font-black text-yellow-400 mb-2">
                                {(stats.totalPlayers / 1000000).toFixed(2)}M
                            </div>
                            <div className="text-xs text-gray-400">전체 플레이어</div>
                            <div className="text-xs text-green-400 mt-1">↑ 실시간</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-orange-500/20">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {(stats.onlinePlayers / 1000000).toFixed(2)}M
                            </div>
                            <div className="text-xs text-gray-400">온라인 플레이어</div>
                            <div className="text-xs text-green-400 mt-1">↑ 실시간</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-red-500/20">
                            <div className="text-3xl font-black text-red-400 mb-2">
                                {(stats.totalKausSpent / 1000000000).toFixed(1)}B
                            </div>
                            <div className="text-xs text-gray-400">누적 KAUS 사용</div>
                            <div className="text-xs text-purple-400 mt-1">전체 결제</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-xl hover:scale-105 transition-all shadow-lg shadow-pink-500/20">
                            <div className="text-3xl font-black text-pink-400 mb-2">
                                {(stats.activeGuilds / 1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-gray-400">활성 길드</div>
                            <div className="text-xs text-blue-400 mt-1">동맹 시스템</div>
                        </div>
                    </div>

                    {/* 홈으로 돌아가기 */}
                    <div className="text-center mb-12">
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
                <footer className="border-t border-yellow-500/30 bg-black/30 backdrop-blur-2xl p-6 mt-16">
                    <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                        <p className="mt-2">KAUS 제국 · 모든 결제는 KAUS COIN으로 · 삼국지 리니지M 스타일</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
