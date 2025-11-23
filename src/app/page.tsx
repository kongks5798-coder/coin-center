"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const mainSlides = [
        {
            id: 1,
            title: 'DATABASE GUARD',
            subtitle: '블록체인으로 지키는 신뢰',
            link: '/brands/database-guard',
            gradient: 'from-cyan-600 to-blue-600'
        },
        {
            id: 2,
            title: 'FILLUMINATE',
            subtitle: '빛으로 빚어낸 명품의 시간',
            link: '/brands/filluminate',
            gradient: 'from-amber-600 to-orange-600'
        },
        {
            id: 3,
            title: 'MARD MARD',
            subtitle: '나를 위한, 나만의 스타일',
            link: '/brands/mard-mard',
            gradient: 'from-pink-600 to-rose-600'
        }
    ];

    const brands = [
        { id: 'database-guard', name: 'DATABASE GUARD', icon: '⚛️', color: 'cyan' },
        { id: 'filluminate', name: 'FILLUMINATE', icon: '���', color: 'amber' },
        { id: 'mard-mard', name: 'MARD MARD', icon: '���', color: 'pink' },
        { id: 'ai-drone', name: 'AI DRONE', icon: '���', color: 'green' },
        { id: 'global-logistics', name: 'GLOBAL LOGISTICS', icon: '���', color: 'purple' },
        { id: 'kaus-coin', name: 'KAUS COIN', icon: '���', color: 'orange' }
    ];

    const products = [
        { id: 1, brand: 'DATABASE GUARD', name: 'NEXUS OS Platform', price: '문의', image: '⚛️', tag: 'NEW' },
        { id: 2, brand: 'FILLUMINATE', name: 'Premium Watch Collection', price: '₩5,000,000', image: '���', tag: 'BEST' },
        { id: 3, brand: 'MARD MARD', name: 'AI Styling Service', price: '₩99,000/월', image: '���', tag: 'HOT' },
        { id: 4, brand: 'AI DRONE', name: 'Delivery Drone System', price: '문의', image: '���', tag: 'NEW' },
        { id: 5, brand: 'GLOBAL LOGISTICS', name: 'Global Shipping', price: '₩50,000~', image: '���' },
        { id: 6, brand: 'KAUS COIN', name: 'RFID Blockchain', price: '₩180/tag', image: '���', tag: 'BEST' },
        { id: 7, brand: 'DATABASE GUARD', name: 'Security Package', price: '₩2,000,000', image: '⚛️' },
        { id: 8, brand: 'FILLUMINATE', name: 'Luxury Bags', price: '₩3,500,000', image: '���', tag: 'HOT' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header - 무신사 스타일 */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                {/* Top Bar */}
                <div className="border-b border-gray-100">
                    <div className="max-w-[1280px] mx-auto px-4 h-9 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                            <Link href="/nexus" className="text-gray-600 hover:text-black">NEXUS OS</Link>
                            <Link href="/workspace" className="text-gray-600 hover:text-black">Workspace</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-gray-600 hover:text-black">로그인</Link>
                            <Link href="/signup" className="text-gray-600 hover:text-black">회원가입</Link>
                            <Link href="/cart" className="text-gray-600 hover:text-black">장바구니</Link>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="text-2xl font-black">FIELD NINE</div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/brands" className="text-sm font-medium hover:text-blue-600">BRANDS</Link>
                        <Link href="/new" className="text-sm font-medium hover:text-blue-600">NEW</Link>
                        <Link href="/best" className="text-sm font-medium hover:text-blue-600">BEST</Link>
                        <Link href="/nexus" className="text-sm font-medium hover:text-blue-600">NEXUS OS</Link>
                    </nav>

                    {/* Search & Icons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="상품 검색"
                                className="bg-transparent border-none outline-none text-sm w-[200px]"
                            />
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Slider - 무신사 스타일 */}
            <section className="relative h-[500px] bg-gray-900 overflow-hidden">
                {mainSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}></div>
                        <div className="relative h-full max-w-[1280px] mx-auto px-4 flex items-center">
                            <div className="text-white">
                                <div className="text-sm mb-2 opacity-90">{slide.subtitle}</div>
                                <h2 className="text-6xl font-black mb-6">{slide.title}</h2>
                                <Link
                                    href={slide.link}
                                    className="inline-block px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-100 transition"
                                >
                                    자세히 보기
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slider Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {mainSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition ${
                                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Brand Category - 무신사 스타일 */}
            <section className="py-8 border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-4">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {brands.map((brand) => (
                            <Link
                                key={brand.id}
                                href={`/brands/${brand.id}`}
                                className="flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition group"
                            >
                                <div className="text-4xl group-hover:scale-110 transition">{brand.icon}</div>
                                <div className="text-xs font-medium text-center text-gray-700 group-hover:text-black">
                                    {brand.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Grid - 무신사 스타일 */}
            <section className="py-12">
                <div className="max-w-[1280px] mx-auto px-4">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold">추천 상품</h3>
                        <Link href="/products" className="text-sm text-gray-600 hover:text-black">
                            전체보기 →
                        </Link>
                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="group"
                            >
                                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                                    {/* Product Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-7xl">
                                        {product.image}
                                    </div>
                                    
                                    {/* Tag */}
                                    {product.tag && (
                                        <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold text-white rounded ${
                                            product.tag === 'NEW' ? 'bg-green-500' :
                                            product.tag === 'BEST' ? 'bg-red-500' :
                                            'bg-orange-500'
                                        }`}>
                                            {product.tag}
                                        </div>
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-xs text-gray-500">{product.brand}</div>
                                    <div className="text-sm font-medium line-clamp-1 group-hover:underline">
                                        {product.name}
                                    </div>
                                    <div className="text-base font-bold">{product.price}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Banner Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-[1280px] mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/nexus" className="relative h-[300px] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg overflow-hidden group">
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="text-sm mb-2">AI-Powered Platform</div>
                                <div className="text-3xl font-black mb-4">NEXUS OS</div>
                                <div className="text-sm opacity-90">창고 자동화 시스템</div>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                        </Link>

                        <Link href="/workspace" className="relative h-[300px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden group">
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="text-sm mb-2">Collaboration Tools</div>
                                <div className="text-3xl font-black mb-4">Workspace</div>
                                <div className="text-sm opacity-90">팀 협업 관리 시스템</div>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer - 무신사 스타일 */}
            <footer className="bg-gray-100 border-t border-gray-200">
                <div className="max-w-[1280px] mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="font-bold mb-4">고객센터</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link href="/notice" className="hover:text-black">공지사항</Link></li>
                                <li><Link href="/faq" className="hover:text-black">자주묻는질문</Link></li>
                                <li><Link href="/contact" className="hover:text-black">1:1 문의</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">쇼핑정보</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link href="/guide" className="hover:text-black">이용안내</Link></li>
                                <li><Link href="/shipping" className="hover:text-black">배송정보</Link></li>
                                <li><Link href="/return" className="hover:text-black">반품/교환</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">회사정보</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link href="/about" className="hover:text-black">회사소개</Link></li>
                                <li><Link href="/careers" className="hover:text-black">채용정보</Link></li>
                                <li><Link href="/press" className="hover:text-black">언론보도</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">SNS</h4>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200">
                                    <span className="text-sm">���</span>
                                </button>
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200">
                                    <span className="text-sm">���</span>
                                </button>
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200">
                                    <span className="text-sm">���</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                        <div className="text-xs text-gray-500 space-y-1">
                            <p>FIELD NINE Corporation | 대표: 공경수 | 사업자등록번호: 123-45-67890</p>
                            <p>통신판매업신고: 2025-서울강남-12345 | 주소: 서울특별시 강남구</p>
                            <p>고객센터: 1588-1234 | 이메일: support@fieldnine.io</p>
                        </div>
                        <div className="mt-4 text-xs text-gray-400">
                            © 2025 FIELD NINE Corporation. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
