"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const brandData: Record<string, any> = {
    'filluminate': {
        name: 'FILLUMINATE',
        tagline: '빛으로 빚어낸 명품의 시간',
        desc: '럭셔리와 혁신의 완벽한 조화를 추구하는 프리미엄 브랜드',
        gradient: 'from-amber-400 via-orange-500 to-red-500',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [
            { value: '₩5조', label: '브랜드 가치' },
            { value: '50+', label: '글로벌 매장' },
            { value: '99.9%', label: '고객 만족도' }
        ],
        features: [
            { icon: '💎', title: '프리미엄 품질', desc: '세계 최고급 소재만 사용' },
            { icon: '🌟', title: '독점 디자인', desc: '오직 FILLUMINATE만의 감성' },
            { icon: '🔒', title: '블록체인 인증', desc: '100% 진품 보증' }
        ]
    },
    'mard-mard': {
        name: 'MARD MARD',
        tagline: '나를 위한, 나만의 스타일',
        desc: '개성과 트렌드의 완벽한 밸런스를 추구하는 패션 브랜드',
        gradient: 'from-pink-500 via-purple-500 to-indigo-500',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [
            { value: '₩2조', label: '연 매출' },
            { value: '100만+', label: '활성 회원' },
            { value: '10K+', label: '일일 신상품' }
        ],
        features: [
            { icon: '👗', title: '트렌디한 디자인', desc: '매일 업데이트되는 최신 패션' },
            { icon: '⚡', title: '초고속 배송', desc: '주문 후 24시간 내 도착' },
            { icon: '🎨', title: 'AI 스타일링', desc: '나만을 위한 맞춤 추천' }
        ]
    },
    'database-guard': {
        name: 'DATABASE GUARD',
        tagline: '블록체인으로 지키는 신뢰',
        desc: '불변의 기록과 완벽한 보안을 제공하는 블록체인 기반 데이터 보호 솔루션',
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [
            { value: '100억+', label: '검증된 거래' },
            { value: '0건', label: '보안 사고' },
            { value: '99.99%', label: '가동률' }
        ],
        features: [
            { icon: '🔐', title: '블록체인 보안', desc: '변조 불가능한 기록' },
            { icon: '⚡', title: '실시간 추적', desc: '모든 과정 투명하게' },
            { icon: '🌐', title: '글로벌 네트워크', desc: '135개국 노드 운영' }
        ]
    },
    'ai-drone': {
        name: 'AI DRONE',
        tagline: '하늘을 지배하는 인공지능',
        desc: 'AI 기반 자율 비행 드론 배송 시스템을 제공하는 혁신 기업',
        gradient: 'from-green-400 via-emerald-500 to-teal-600',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [
            { value: '1위', label: '국내 시장 점유율' },
            { value: '50K+', label: '운영 중인 드론' },
            { value: '24/7', label: '무인 배송' }
        ],
        features: [
            { icon: '🚁', title: '자율 비행', desc: 'AI 기반 완전 자동화' },
            { icon: '📦', title: '정밀 배송', desc: '오차 범위 1cm 이내' },
            { icon: '🌍', title: '전국망 구축', desc: '30분 내 배송 가능' }
        ]
    },
    'global-logistics': {
        name: 'GLOBAL LOGISTICS',
        tagline: '세계를 연결하는 물류 네트워크',
        desc: '135개국을 하나로 연결하는 글로벌 물류 플랫폼',
        gradient: 'from-purple-500 via-pink-500 to-rose-600',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [
            { value: '135개국', label: '서비스 국가' },
            { value: '1M+', label: '일일 배송' },
            { value: '98.7%', label: '정시 도착률' }
        ],
        features: [
            { icon: '🌍', title: '글로벌 네트워크', desc: '전 세계 실시간 배송' },
            { icon: '📊', title: 'AI 최적화', desc: '가장 빠른 경로 자동 계산' },
            { icon: '🔄', title: '통합 시스템', desc: 'NEXUS OS 기반 관리' }
        ]
    },
    'kaus-coin': {
        name: 'KAUS COIN',
        tagline: 'RFID를 넘어선 미래 금융',
        desc: '블록체인 기반 RFID 태그로 공급망 투명성을 혁신하는 플랫폼',
        gradient: 'from-orange-400 via-red-500 to-orange-600',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        stats: [
            { value: '100B+', label: '검증된 태그' },
            { value: '₩180', label: '태그당 가격' },
            { value: '99.9%', label: '정확도' }
        ],
        features: [
            { icon: '🪙', title: '블록체인 인증', desc: '변조 불가능한 RFID 태그' },
            { icon: '🔗', title: '실시간 추적', desc: '모든 제품의 생애주기 추적' },
            { icon: '🌐', title: '글로벌 네트워크', desc: '전 세계 공급망 투명성' }
        ]
    }
};

export default function BrandPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const brand = brandData[slug] || brandData['filluminate'];
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <div className="relative bg-black text-white min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">F9</span>
                        </div>
                        <span className="text-2xl font-bold">FIELD NINE</span>
                    </Link>
                    <Link href="/" className="text-sm hover:text-blue-400 transition">← 홈으로</Link>
                </div>
            </nav>

            {/* Hero Video Section */}
            <section className="relative pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${brand.gradient} mb-6`}>
                            <span className="text-sm font-bold text-white">{brand.name}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-6">
                            <span className={`bg-gradient-to-r ${brand.gradient} bg-clip-text text-transparent`}>
                                {brand.tagline}
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-400 max-w-2xl mx-auto">{brand.desc}</p>
                    </div>

                    {/* Video Player */}
                    <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                        <div className="aspect-video bg-gradient-to-br from-gray-900 to-black relative">
                            {!isVideoPlaying ? (
                                <button
                                    onClick={() => setIsVideoPlaying(true)}
                                    className="absolute inset-0 flex items-center justify-center group"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-20`}></div>
                                    <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all">
                                        <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                                        <p className="text-lg font-semibold mb-2">브랜드 소개 영상</p>
                                        <p className="text-sm text-gray-400">클릭하여 재생</p>
                                    </div>
                                </button>
                            ) : (
                                <iframe
                                    className="w-full h-full"
                                    src={`${brand.videoUrl}?autoplay=1`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {brand.stats.map((stat: any, i: number) => (
                            <div key={i} className="text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className={`text-5xl font-black bg-gradient-to-r ${brand.gradient} bg-clip-text text-transparent mb-3`}>
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">핵심 특징</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {brand.features.map((feature: any, i: number) => (
                            <div key={i} className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:scale-105 transition-all">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className={`text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r ${brand.gradient} bg-clip-text text-transparent`}>
                        {brand.name}과 함께하세요
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/signup" className={`px-10 py-5 bg-gradient-to-r ${brand.gradient} rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105`}>
                            지금 시작하기
                        </Link>
                        <Link href="/" className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                            다른 브랜드 보기
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="text-sm text-gray-400">© 2025 FIELD NINE · {brand.name}</div>
                </div>
            </footer>
        </div>
    );
}
