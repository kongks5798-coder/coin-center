'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// 브랜드 카테고리 데이터
const brandCategories = [
    {
        id: 'luxury',
        name: 'LUXURY',
        description: '프리미엄 럭셔리 브랜드',
        brands: [
            {
                id: 'filluminate',
                name: 'FILLUMINATE',
                tagline: '빛으로 빚어낸 명품의 시간',
                description: '럭셔리와 혁신의 완벽한 조화를 추구하는 프리미엄 브랜드',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
                gradient: 'from-amber-400 via-orange-500 to-red-500',
                stats: ['₩5조 브랜드 가치', '50+ 글로벌 매장', '99.9% 고객 만족도']
            }
        ],
        gradient: 'from-amber-500 to-orange-600'
    },
    {
        id: 'fashion',
        name: 'FASHION',
        description: '트렌디 패션 플랫폼',
        brands: [
            {
                id: 'mard-mard',
                name: 'MARD MARD',
                tagline: '나를 위한, 나만의 스타일',
                description: '개성과 트렌드의 완벽한 밸런스를 추구하는 패션 브랜드',
                image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop',
                gradient: 'from-pink-500 via-purple-500 to-indigo-500',
                stats: ['₩2조 연 매출', '100만+ 활성 회원', '10K+ 일일 신상품']
            }
        ],
        gradient: 'from-pink-500 to-purple-600'
    },
    {
        id: 'technology',
        name: 'TECHNOLOGY',
        description: '혁신 기술 솔루션',
        brands: [
            {
                id: 'database-guard',
                name: 'DATABASE GUARD',
                tagline: '블록체인으로 지키는 신뢰',
                description: '불변의 기록과 완벽한 보안을 제공하는 블록체인 기반 데이터 보호 솔루션',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
                gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
                stats: ['100억+ 검증된 거래', '0건 보안 사고', '99.99% 가동률']
            },
            {
                id: 'ai-drone',
                name: 'AI DRONE',
                tagline: '하늘을 지배하는 인공지능',
                description: '자율비행 물류 시스템으로 전 세계를 연결하는 드론 네트워크',
                image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=800&fit=crop',
                gradient: 'from-green-400 via-emerald-500 to-green-600',
                stats: ['1.25M대 활성 드론', '250개국 서비스', '99.999% 안전률']
            }
        ],
        gradient: 'from-cyan-500 to-blue-600'
    },
    {
        id: 'finance',
        name: 'FINANCE',
        description: '블록체인 금융 생태계',
        brands: [
            {
                id: 'kaus-coin',
                name: 'KAUS COIN',
                tagline: 'RFID를 넘어선 미래 금융',
                description: '양자 블록체인으로 구동되는 모든 결제 수단',
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop',
                gradient: 'from-orange-400 via-red-500 to-orange-600',
                stats: ['124B 거래', '50M 사용자', '250개국 네트워크']
            }
        ],
        gradient: 'from-orange-500 to-red-600'
    },
    {
        id: 'logistics',
        name: 'LOGISTICS',
        description: '글로벌 물류 네트워크',
        brands: [
            {
                id: 'global-logistics',
                name: 'GLOBAL LOGISTICS',
                tagline: '세계를 연결하는 물류 네트워크',
                description: '135개국 글로벌 확장으로 전 세계를 하나로 연결',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
                gradient: 'from-purple-400 via-violet-500 to-purple-600',
                stats: ['135개국 서비스', '10분 내 배송', '99.9% 정확도']
            }
        ],
        gradient: 'from-purple-500 to-violet-600'
    }
];

// 브랜드 팝업 모달 컴포넌트
function BrandModal({ brand, isOpen, onClose }: { brand: any; isOpen: boolean; onClose: () => void }) {
    if (!isOpen || !brand) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-6xl bg-black/90 backdrop-blur-2xl border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 브랜드 이미지 */}
                <div className="relative h-96 overflow-hidden">
                    <img 
                        src={brand.image} 
                        alt={brand.name}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent`} />
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${brand.gradient} rounded-full mb-4`}>
                            <span className="text-sm font-bold text-white">{brand.name}</span>
                        </div>
                        <h2 className="text-5xl font-black text-white mb-2">{brand.tagline}</h2>
                        <p className="text-xl text-gray-300">{brand.description}</p>
                    </div>
                </div>

                {/* 브랜드 정보 */}
                <div className="p-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {brand.stats.map((stat: string, i: number) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-white mb-2">{stat}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href={`/brands/${brand.id}`}
                            className={`flex-1 px-8 py-4 bg-gradient-to-r ${brand.gradient} rounded-xl font-bold text-lg text-center hover:scale-105 transition-transform`}
                        >
                            자세히 보기
                        </Link>
                        <button
                            onClick={onClose}
                            className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const [selectedBrand, setSelectedBrand] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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

    // 브랜드 클릭 핸들러
    const handleBrandClick = (brand: any) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* 배경 그라디언트 */}
            <div 
                className="fixed inset-0 opacity-30 z-0"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), transparent 70%)`
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="mb-8">
                        <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6">
                            <span className="text-sm font-medium text-gray-300">FIELD NINE 2035</span>
                        </div>
                        <h1 className="text-8xl md:text-[12rem] font-black mb-6 leading-none">
                            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                FIELD NINE
                            </span>
                        </h1>
                        <p className="text-3xl md:text-5xl text-gray-300 mb-4 font-light">
                            미래를 만드는 브랜드
                        </p>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
                            럭셔리부터 기술까지, 모든 것을 하나로
                        </p>
                        
                        {/* CTA 버튼 */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/dashboard/global"
                                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg overflow-hidden hover:scale-105 transition-all shadow-lg shadow-cyan-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>🌍</span>
                                    <span>글로벌 대시보드</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link
                                href="/metaverse"
                                className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
                            >
                                <span className="flex items-center gap-3">
                                    <span>🚀</span>
                                    <span>메타버스 입장</span>
                                </span>
                            </Link>
                            <Link
                                href="/nexus"
                                className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
                            >
                                <span className="flex items-center gap-3">
                                    <span>⚛️</span>
                                    <span>NEXUS OS</span>
                                </span>
                            </Link>
                            <Link
                                href="/nexus-satellite"
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg overflow-hidden hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>🛰️</span>
                                    <span>위성 네트워크</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link
                                href="/kaustrace"
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl font-bold text-lg overflow-hidden hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>📡</span>
                                    <span>KAUS TRACE</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 카테고리별 브랜드 섹션 */}
            {brandCategories.map((category, categoryIndex) => (
                <section
                    key={category.id}
                    className="relative py-32 overflow-hidden"
                    ref={(el) => {
                        if (el) sectionRefs.current[category.id] = el;
                    }}
                >
                    {/* 카테고리 헤더 */}
                    <div className="max-w-7xl mx-auto px-4 mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`h-1 flex-1 bg-gradient-to-r ${category.gradient}`}></div>
                        <div className="text-center flex-shrink-0">
                            <h2 className="text-6xl md:text-8xl font-black mb-2">
                                <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                                    {category.name}
                                </span>
                            </h2>
                            <p className="text-gray-400">{category.description}</p>
                        </div>
                        <div className={`h-1 flex-1 bg-gradient-to-r ${category.gradient}`}></div>
                    </div>
                    </div>

                    {/* 브랜드 그리드 */}
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            {category.brands.map((brand, brandIndex) => (
                                <div
                                    key={brand.id}
                                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
                                    onClick={() => handleBrandClick(brand)}
                                >
                                    {/* 브랜드 이미지 */}
                                    <div className="absolute inset-0">
                                        <img 
                                            src={brand.image} 
                                            alt={brand.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity`} />
                                    </div>

                                    {/* 브랜드 정보 */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${brand.gradient} rounded-full mb-4 w-fit`}>
                                            <span className="text-sm font-bold text-white">{brand.name}</span>
                                        </div>
                                        <h3 className="text-4xl font-black text-white mb-2 group-hover:translate-x-2 transition-transform">
                                            {brand.tagline}
                                        </h3>
                                        <p className="text-gray-300 mb-6 group-hover:translate-x-2 transition-transform delay-75">
                                            {brand.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-white/80 group-hover:translate-x-2 transition-transform delay-150">
                                            <span>자세히 보기</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* 호버 효과 */}
                                    <div className={`absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-3xl transition-all`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Footer */}
            <footer className="relative border-t border-white/10 py-12 mt-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold mb-4 text-white">FIELD NINE</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition">회사 소개</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition">연락처</Link></li>
                                <li><Link href="/careers" className="hover:text-white transition">채용</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white">브랜드</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                {brandCategories.map(category => (
                                    <li key={category.id}>
                                        <Link href={`#${category.id}`} className="hover:text-white transition">
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white">서비스</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/dashboard/global" className="hover:text-white transition">글로벌 대시보드</Link></li>
                                <li><Link href="/nexus" className="hover:text-white transition">NEXUS OS</Link></li>
                                <li><Link href="/kaustrace" className="hover:text-white transition">KAUS TRACE</Link></li>
                                <li><Link href="/nexus-satellite" className="hover:text-white transition">위성 네트워크</Link></li>
                                <li><Link href="/wallet" className="hover:text-white transition">지갑 & 거래소</Link></li>
                                <li><Link href="/listing" className="hover:text-white transition">상장 신청</Link></li>
                                <li><Link href="/reserves" className="hover:text-white transition">리저브 대시보드</Link></li>
                                <li><Link href="/mining" className="hover:text-white transition">KAUS 채굴</Link></li>
                                <li><Link href="/earn-kaus" className="hover:text-white transition">KAUS 획득하기</Link></li>
                                <li><Link href="/activity-mining" className="hover:text-white transition">활동 기반 채굴</Link></li>
                                <li><Link href="/kaus-empire" className="hover:text-white transition">KAUS 제국</Link></li>
                                <li><Link href="/metaverse" className="hover:text-white transition">메타버스</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white">연락처</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>support@fieldnine.io</li>
                                <li>+82-2-1234-5678</li>
                                <li>서울특별시 강남구</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* 브랜드 팝업 모달 */}
            <BrandModal 
                brand={selectedBrand} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}
