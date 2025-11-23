"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [currentBrand, setCurrentBrand] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBrand((prev) => (prev + 1) % 7);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const brands = [
        { 
            id: 'database-guard',
            name: 'DATABASE GUARD', 
            tagline: '블록체인으로 지키는 신뢰',
            desc: 'NEXUS THE FIELD NINE',
            gradient: 'from-cyan-400 via-blue-500 to-cyan-600',
            glow: 'cyan',
            icon: '⚛️'
        },
        { 
            id: 'filluminate',
            name: 'FILLUMINATE', 
            tagline: '빛으로 빚어낸 명품의 시간',
            desc: '프리미엄 럭셔리',
            gradient: 'from-amber-300 via-yellow-500 to-amber-600',
            glow: 'amber',
            icon: '💎'
        },
        { 
            id: 'mard-mard',
            name: 'MARD MARD', 
            tagline: '나를 위한, 나만의 스타일',
            desc: '감도 높은 패션',
            gradient: 'from-pink-400 via-rose-500 to-pink-600',
            glow: 'pink',
            icon: '👗'
        },
        { 
            id: 'ai-drone',
            name: 'AI DRONE', 
            tagline: '하늘을 지배하는 인공지능',
            desc: '국내 1위',
            gradient: 'from-green-400 via-emerald-500 to-green-600',
            glow: 'green',
            icon: '🚁'
        },
        { 
            id: 'korean-air',
            name: 'KOREAN AIR', 
            tagline: '하늘길을 여는 새로운 시대',
            desc: '₩30조 기업가치',
            gradient: 'from-blue-400 via-sky-500 to-blue-600',
            glow: 'blue',
            icon: '✈️'
        },
        { 
            id: 'global-logistics',
            name: 'GLOBAL LOGISTICS', 
            tagline: '세계를 연결하는 물류 네트워크',
            desc: '135개국 서비스',
            gradient: 'from-purple-400 via-violet-500 to-purple-600',
            glow: 'purple',
            icon: '🌍'
        },
        { 
            id: 'kaus-coin',
            name: 'KAUS COIN', 
            tagline: 'RFID를 넘어선 미래 금융',
            desc: '블록체인 생태계',
            gradient: 'from-orange-400 via-red-500 to-orange-600',
            glow: 'orange',
            icon: '🪙'
        }
    ];

    const current = brands[currentBrand];

    return (
        <div className="relative bg-black text-white min-h-screen overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-5 transition-all duration-1000`}></div>
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${current.gradient} opacity-10 blur-3xl animate-pulse`}></div>
            </div>

            {/* Minimal Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-black tracking-tighter">F9</Link>
                    <Link href="/login" className="text-sm px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition">Login</Link>
                </div>
            </nav>

            {/* Hero: DATABASE GUARD CENTER */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-mono">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                LIVE · 재계 5위 · 135개국
                            </div>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
                            <span className={`block bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent mb-4`}>
                                {current.name}
                            </span>
                        </h1>

                        <p className="text-2xl md:text-3xl text-gray-400 mb-4 font-light">
                            {current.tagline}
                        </p>
                        <p className="text-lg text-gray-500">{current.desc}</p>
                    </div>

                    {/* Brand Carousel */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {brands.map((b, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentBrand(i)}
                                    className={`h-1 rounded-full transition-all ${i === currentBrand ? `bg-gradient-to-r ${b.gradient}` : 'bg-white/10'}`}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-3">
                            {brands.map((b, i) => (
                                <Link
                                    key={i}
                                    href={`/brands/${b.id}`}
                                    className={`group relative aspect-square rounded-2xl bg-gradient-to-br ${b.gradient} p-[1px] transition-all hover:scale-110 ${i === currentBrand ? 'scale-110 shadow-2xl' : 'opacity-40'}`}
                                >
                                    <div className="w-full h-full rounded-2xl bg-black/90 flex items-center justify-center text-3xl">
                                        {b.icon}
                                    </div>
                                    {i === currentBrand && (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-20 rounded-2xl blur-xl`}></div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* NEXUS Story */}
            <section className="relative py-32 bg-gradient-to-b from-black via-blue-950/10 to-black">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="text-sm font-mono text-blue-400 mb-4">[ NEXUS THE FIELD NINE ]</div>
                    <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">
                        풀필먼트 · AI물류 ·<br/>RFID를 넘어선 혁신
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {[
                            { title: '풀필먼트', desc: 'Amazon급 물류 자동화' },
                            { title: 'AI 물류', desc: '94.7% 예측 정확도' },
                            { title: 'KAUS 코인', desc: '블록체인 생태계' }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                                <div className="text-2xl font-black mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    {item.title}
                                </div>
                                <div className="text-sm text-gray-400">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <Link
                        href={`/brands/${current.id}`}
                        className={`inline-block px-12 py-5 bg-gradient-to-r ${current.gradient} rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl`}
                    >
                        {current.name} 자세히 보기 →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-8 border-t border-white/5 text-center text-sm text-gray-500">
                © 2025 FIELD NINE · 재계 5위 · AI 드론 1위 · 135개국 진출
            </footer>
        </div>
    );
}
