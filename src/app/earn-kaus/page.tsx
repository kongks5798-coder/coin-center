'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// KAUS 획득 경로 타입
interface EarningMethod {
    id: string;
    name: string;
    description: string;
    icon: string;
    kausAmount: number;
    cooldown?: number; // 락업 기간 (일)
    available: boolean;
    category: 'mining' | 'purchase' | 'reward' | 'logistics' | 'employee';
    action?: () => void;
}

// 사용자 KAUS 보유량
const useKausBalance = () => {
    const [balance, setBalance] = useState({
        total: 12500.5, // 더 현실적인 수치로 조정 (1/10로 감소)
        available: 8500.0, // 거래 가능
        locked: 4000.5, // 락업 중
        pending: 0, // 대기 중
    });

    return { balance, setBalance };
};

export default function EarnKausPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const { balance, setBalance } = useKausBalance();

    // KAUS 획득 방법들
    const earningMethods: EarningMethod[] = [
        // 채굴
        {
            id: 'mining',
            name: '채굴 (Mining)',
            description: '24시간 자동 채굴로 KAUS 획득 (일일 한도: 4.8 KAUS)',
            icon: '⚡',
            kausAmount: 4.8, // 24시간당 (기존 24.0에서 1/5로 감소)
            available: true,
            category: 'mining',
            action: () => window.location.href = '/mining',
        },
        {
            id: 'activity',
            name: '활동 기반 채굴 (Proof of Activity)',
            description: 'FIELD NINE 생태계 활동으로 KAUS 획득 (일일 최대 5.0 KAUS)',
            icon: '🎯',
            kausAmount: 5.0, // 일일 최대
            available: true,
            category: 'mining',
            action: () => window.location.href = '/activity-mining',
        },
        // 제품 구매
        {
            id: 'filluminate',
            name: 'FILLUMINATE 구매',
            description: 'FILLUMINATE 제품 구매 시 구매 금액의 2% KAUS 적립 (최대 100 KAUS/일)',
            icon: '💎',
            kausAmount: 0, // 구매 금액에 따라
            available: true,
            category: 'purchase',
            action: () => window.location.href = '/brands/filluminate',
        },
        {
            id: 'mardmard',
            name: 'MARD MARD 구매',
            description: 'MARD MARD 제품 구매 시 구매 금액의 2% KAUS 적립 (최대 100 KAUS/일)',
            icon: '👗',
            kausAmount: 0, // 구매 금액에 따라
            available: true,
            category: 'purchase',
            action: () => window.location.href = '/brands/mard-mard',
        },
        {
            id: 'fieldnine',
            name: 'FIELD NINE 제품 구매',
            description: 'FIELD NINE 제품 구매 시 구매 금액의 3% KAUS 적립 (최대 150 KAUS/일)',
            icon: '🚀',
            kausAmount: 0, // 구매 금액에 따라
            available: true,
            category: 'purchase',
            action: () => window.location.href = '/products',
        },
        // 임직원 보상
        {
            id: 'employee',
            name: '임직원 보상',
            description: 'FIELD NINE 임직원 월급의 10% KAUS로 지급 (락업 90일)',
            icon: '👔',
            kausAmount: 0, // 월급에 따라
            cooldown: 90, // 90일 락업 (기존 30일에서 증가)
            available: true,
            category: 'employee',
        },
        // 물류/마일리지
        {
            id: 'logistics',
            name: '물류 마일리지',
            description: 'NEXUS 물류 시스템 이용 시 마일리지 적립',
            icon: '📦',
            kausAmount: 0, // 거리/무게에 따라
            available: true,
            category: 'logistics',
            action: () => window.location.href = '/nexus',
        },
        {
            id: 'delivery',
            name: '배송 완료 보상',
            description: '배송 완료 시 배송 금액의 1% KAUS 적립 (최대 50 KAUS/일)',
            icon: '🚚',
            kausAmount: 0, // 배송 금액에 따라
            available: true,
            category: 'logistics',
        },
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

    // 카테고리별 그룹화
    const methodsByCategory = {
        mining: earningMethods.filter(m => m.category === 'mining'),
        purchase: earningMethods.filter(m => m.category === 'purchase'),
        reward: earningMethods.filter(m => m.category === 'reward'),
        logistics: earningMethods.filter(m => m.category === 'logistics'),
        employee: earningMethods.filter(m => m.category === 'employee'),
    };

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
                                    KAUS 획득하기
                                </div>
                                <div className="text-xs text-gray-400">Earn KAUS Coin</div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-xs text-gray-400">보유 KAUS</div>
                                <div className="text-lg font-bold text-purple-400">
                                    {balance.total.toLocaleString(undefined, { maximumFractionDigits: 2 })} KAUS
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
                            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                KAUS 획득하기
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                            다양한 방법으로 KAUS 코인을 획득하고, 거래소에서 거래하세요
                        </p>
                    </div>

                    {/* 보유량 요약 */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">총 보유량</div>
                            <div className="text-3xl font-black text-purple-400">
                                {balance.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">KAUS</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">거래 가능</div>
                            <div className="text-3xl font-black text-green-400">
                                {balance.available.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">즉시 거래 가능</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">락업 중</div>
                            <div className="text-3xl font-black text-yellow-400">
                                {balance.locked.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">락업 해제 대기</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="text-sm text-gray-400 mb-2">거래소 가격</div>
                            <div className="text-3xl font-black text-blue-400">
                                $1.00
                            </div>
                            <div className="text-xs text-gray-400 mt-1">USD (스테이블코인)</div>
                        </div>
                    </div>

                    {/* 획득 방법 섹션 */}
                    <div className="space-y-12">
                        {/* 채굴 */}
                        {methodsByCategory.mining.length > 0 && (
                            <div>
                                <h2 className="text-4xl font-bold text-purple-400 mb-6">⚡ 채굴</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {methodsByCategory.mining.map((method) => (
                                        <div
                                            key={method.id}
                                            className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl hover:border-purple-500/50 transition-all cursor-pointer"
                                            onClick={() => method.action?.()}
                                        >
                                            <div className="text-5xl mb-4">{method.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                            <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-purple-400">
                                                    {method.kausAmount > 0 ? `+${method.kausAmount}` : '변동'} KAUS
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {method.cooldown ? `${method.cooldown}일 락업` : '즉시 사용 가능'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 제품 구매 */}
                        {methodsByCategory.purchase.length > 0 && (
                            <div>
                                <h2 className="text-4xl font-bold text-blue-400 mb-6">🛍️ 제품 구매</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {methodsByCategory.purchase.map((method) => (
                                        <div
                                            key={method.id}
                                            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl hover:border-blue-500/50 transition-all cursor-pointer"
                                            onClick={() => method.action?.()}
                                        >
                                            <div className="text-5xl mb-4">{method.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                            <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-blue-400">
                                                    구매 금액의 {method.id === 'fieldnine' ? '10%' : '5%'} 적립
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {method.cooldown ? `${method.cooldown}일 락업` : '즉시 사용 가능'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 임직원 보상 */}
                        {methodsByCategory.employee.length > 0 && (
                            <div>
                                <h2 className="text-4xl font-bold text-green-400 mb-6">👔 임직원 보상</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {methodsByCategory.employee.map((method) => (
                                        <div
                                            key={method.id}
                                            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-6 backdrop-blur-xl"
                                        >
                                            <div className="text-5xl mb-4">{method.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                            <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-green-400">
                                                    월급의 20%
                                                </div>
                                                <div className="text-sm text-yellow-400 font-bold">
                                                    {method.cooldown}일 락업
                                                </div>
                                            </div>
                                            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                                <div className="text-xs text-yellow-400">
                                                    ⚠️ 임직원 전용. 락업 기간 동안 거래 불가
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 물류/마일리지 */}
                        {methodsByCategory.logistics.length > 0 && (
                            <div>
                                <h2 className="text-4xl font-bold text-cyan-400 mb-6">📦 물류 & 마일리지</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {methodsByCategory.logistics.map((method) => (
                                        <div
                                            key={method.id}
                                            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-6 backdrop-blur-xl hover:border-cyan-500/50 transition-all cursor-pointer"
                                            onClick={() => method.action?.()}
                                        >
                                            <div className="text-5xl mb-4">{method.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                            <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-cyan-400">
                                                    {method.id === 'delivery' ? '배송 금액의 3%' : '거리/무게 기반'}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {method.cooldown ? `${method.cooldown}일 락업` : '즉시 사용 가능'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 락업 정보 */}
                    <div className="mt-16 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-3xl p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-6">🔒 락업 기간 안내</h3>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <div className="font-bold text-white mb-1">임직원 보상</div>
                                <div className="text-sm">30일 락업 - 거래소 상장 후 거래 가능</div>
                            </div>
                            <div>
                                <div className="font-bold text-white mb-1">제품 구매 적립</div>
                                <div className="text-sm">락업 없음 - 즉시 거래 가능</div>
                            </div>
                            <div>
                                <div className="font-bold text-white mb-1">채굴</div>
                                <div className="text-sm">락업 없음 - 즉시 거래 가능</div>
                            </div>
                            <div>
                                <div className="font-bold text-white mb-1">물류 마일리지</div>
                                <div className="text-sm">락업 없음 - 즉시 거래 가능</div>
                            </div>
                        </div>
                    </div>

                    {/* 거래소 정보 */}
                    <div className="mt-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-green-400 mb-6">💹 거래소 거래</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-lg font-bold text-white mb-2">거래 가능 상태</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 font-bold">거래 가능</span>
                                </div>
                                <div className="text-sm text-gray-400 mt-2">
                                    거래 가능한 KAUS는 즉시 거래소에서 거래할 수 있습니다.
                                </div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-white mb-2">락업 해제 일정</div>
                                <div className="text-2xl font-black text-yellow-400 mb-2">D-15</div>
                                <div className="text-sm text-gray-400">
                                    락업된 KAUS는 15일 후 자동으로 거래 가능 상태로 전환됩니다.
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/wallet"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                            >
                                거래소에서 거래하기
                            </Link>
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
                        <p className="mt-2">KAUS 코인 획득 · 다양한 방법으로 KAUS를 얻고 거래하세요</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

