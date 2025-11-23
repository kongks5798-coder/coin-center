"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const milestones = [
        { year: '2024', title: 'NEXUS OS 출시', desc: 'AI 물류 혁명 시작' },
        { year: '2025', title: '대한항공 인수', desc: '항공 물류 통합' },
        { year: '2026', title: 'AI 드론 1위', desc: '국내 시장 석권' },
        { year: '2027', title: '재계 5위 도약', desc: '글로벌 확장' },
        { year: '2028', title: '세계 진출', desc: '135개국 서비스' }
    ];

    const brands = [
        { name: 'FILLUMINATE', desc: '명품 브랜드', gradient: 'from-amber-400 to-orange-500' },
        { name: 'MARD MARD', desc: '패션 플랫폼', gradient: 'from-pink-500 to-purple-600' },
        { name: 'DATABASE GUARD', desc: '블록체인 보안', gradient: 'from-cyan-400 to-blue-600' },
        { name: 'AI DRONE', desc: '자율 비행', gradient: 'from-green-400 to-emerald-600' },
        { name: 'KOREAN AIR', desc: '항공 물류', gradient: 'from-blue-500 to-indigo-600' },
        { name: 'GLOBAL LOGISTICS', desc: '세계 배송', gradient: 'from-purple-500 to-pink-600' }
    ];

    return (
        <div className="relative bg-black text-white overflow-hidden">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrollY > 50 ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10' : ''}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">F9</span>
                        </div>
                        <span className="text-2xl font-bold">FIELD NINE</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/ai-hub" className="text-sm hover:text-blue-400 transition">AI Hub</Link>
                        <Link href="/nexus" className="text-sm hover:text-blue-400 transition">NEXUS OS</Link>
                        <Link href="/workspace" className="text-sm hover:text-blue-400 transition">Workspace</Link>
                        <Link href="/login" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition">로그인</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                {/* Code Matrix */}
                <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="absolute text-green-400 text-xs font-mono" style={{ left: `${i * 5}%`, animation: `fall ${10 + i}s linear infinite`, animationDelay: `${i * 0.5}s` }}>
                            {Array.from({ length: 30 }).map((_, j) => <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>)}
                        </div>
                    ))}
                </div>

                <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
                    <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        <span className="text-sm font-medium">재계 5위 · AI 드론 1위 · 135개국 진출</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9]">
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite' }}>
                            THE FIELD NINE
                        </span>
                        <span className="block text-white mt-4">GLOBAL EMPIRE</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        대한항공 인수부터 세계 제패까지,
                        <br className="hidden md:block" />
                        <span className="text-blue-400 font-semibold">AI가 만드는 물류의 미래</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/ai-hub" className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105">
                            <span className="flex items-center justify-center">
                                전체 브랜드 보기
                                <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                        <button className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                            영상 보기 ▶
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="relative py-32 bg-gradient-to-b from-black via-blue-950/20 to-black">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        성장의 역사
                    </h2>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

                        {milestones.map((m, i) => (
                            <div key={i} className={`relative flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'} mb-20`}>
                                <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-12' : 'pl-12'}`}>
                                    <div className="inline-block p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:scale-105 transition-all">
                                        <div className="text-4xl font-black text-blue-400 mb-2">{m.year}</div>
                                        <h3 className="text-2xl font-bold mb-2">{m.title}</h3>
                                        <p className="text-gray-400">{m.desc}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 top-8 -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands Grid */}
            <section className="relative py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        6개의 글로벌 브랜드
                    </h2>
                    <p className="text-xl text-gray-400 text-center mb-20">각 브랜드마다 고유한 감성과 스토리가 있습니다</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {brands.map((brand, i) => (
                            <Link key={i} href={`/brands/${brand.name.toLowerCase().replace(' ', '-')}`} className="group">
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all hover:scale-105 h-80">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                                    
                                    <div className="relative h-full p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-400 mb-2">{brand.desc}</div>
                                            <h3 className="text-3xl font-black mb-4">{brand.name}</h3>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-400">브랜드 영상 보기</span>
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`}></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative py-32 bg-gradient-to-b from-black via-purple-950/20 to-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: '₩50조', label: '연 매출' },
                            { value: '135개국', label: '서비스 국가' },
                            { value: '5위', label: '재계 순위' },
                            { value: '1위', label: 'AI 드론 시장' }
                        ].map((s, i) => (
                            <div key={i} className="text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                                    {s.value}
                                </div>
                                <div className="text-gray-400 font-medium">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        미래를 함께 만들어갑니다
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">대한민국을 넘어 세계로, FIELD NINE과 함께하세요</p>
                    <Link href="/signup" className="inline-block px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
                        지금 시작하기
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F9</span>
                            </div>
                            <span className="text-lg font-bold">FIELD NINE</span>
                        </div>
                        <div className="text-sm text-gray-400">© 2025 FIELD NINE. 재계 5위, AI 드론 1위, 135개국 진출</div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fall {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
            `}</style>
        </div>
    );
}
