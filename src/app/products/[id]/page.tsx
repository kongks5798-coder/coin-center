"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Unsplash 무료 이미지 사용 (상표권 문제 없음)
const allProducts = [
    { id: 1, brand: 'DATABASE GUARD', name: 'NEXUS OS Platform', price: '문의', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop', tag: 'NEW', description: 'AI 기반 창고 자동화 시스템으로 실시간 재고 관리와 로봇 협업을 제공합니다.', features: ['실시간 재고 추적', 'AI 예측 분석', '99.9% 가동률', '24/7 모니터링'], specs: { type: '플랫폼', category: '자동화 시스템', support: '24/7' } },
    { id: 2, brand: 'FILLUMINATE', name: 'Premium Watch Collection', price: '₩5,000,000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', tag: 'BEST', description: '세계 최고급 소재로 제작된 한정판 럭셔리 시계 컬렉션입니다.', features: ['스위스 무브먼트', '다이아몬드 인레이', '한정판', '블록체인 인증'], specs: { type: '시계', category: '럭셔리', material: '18K 골드' } },
    { id: 3, brand: 'MARD MARD', name: 'AI Styling Service', price: '₩99,000/월', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop', tag: 'HOT', description: 'AI가 분석한 나만의 스타일을 매월 추천해주는 구독 서비스입니다.', features: ['AI 스타일 분석', '맞춤 추천', '월 1회 배송', '스타일리스트 상담'], specs: { type: '구독 서비스', category: '패션', period: '월간' } },
    { id: 4, brand: 'AI DRONE', name: 'Delivery Drone System', price: '문의', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop', tag: 'NEW', description: '완전 자율 비행 드론 배송 시스템으로 30분 내 배송이 가능합니다.', features: ['자율 비행', '정밀 배송', '30분 배송', '실시간 추적'], specs: { type: '드론 시스템', category: '물류', range: '50km' } },
    { id: 5, brand: 'GLOBAL LOGISTICS', name: 'Global Shipping', price: '₩50,000~', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=800&fit=crop', description: '135개국 전 세계 배송 서비스로 가장 빠르고 안전한 물류를 제공합니다.', features: ['135개국 배송', '실시간 추적', '보험 포함', '관세 처리'], specs: { type: '배송 서비스', category: '물류', countries: '135개국' } },
    { id: 6, brand: 'KAUS COIN', name: 'RFID Blockchain', price: '₩180/tag', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=800&fit=crop', tag: 'BEST', description: '블록체인 기반 RFID 태그로 제품의 생애주기를 완벽하게 추적합니다.', features: ['블록체인 인증', '변조 불가', '실시간 추적', '글로벌 네트워크'], specs: { type: 'RFID 태그', category: '블록체인', network: '글로벌' } },
    { id: 7, brand: 'DATABASE GUARD', name: 'Security Package', price: '₩2,000,000', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=800&fit=crop', description: '엔터프라이즈급 보안 패키지로 데이터를 완벽하게 보호합니다.', features: ['엔드투엔드 암호화', '다중 인증', '24/7 모니터링', '보안 감사'], specs: { type: '보안 패키지', category: '보안', level: '엔터프라이즈' } },
    { id: 8, brand: 'FILLUMINATE', name: 'Luxury Bags', price: '₩3,500,000', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop', tag: 'HOT', description: '이탈리아 최고급 가죽으로 제작된 한정판 럭셔리 백 컬렉션입니다.', features: ['이탈리아 가죽', '수제 제작', '한정판', '블록체인 인증'], specs: { type: '가방', category: '럭셔리', material: '최고급 가죽' } }
];

export default function ProductDetailPage() {
    const params = useParams();
    const productId = parseInt(params?.id as string);
    const product = allProducts.find(p => p.id === productId) || allProducts[0];
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black">FIELD NINE</Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm hover:text-blue-600">홈</Link>
                        <Link href="/brands" className="text-sm hover:text-blue-600">브랜드</Link>
                        <Link href="/products" className="text-sm hover:text-blue-600">상품</Link>
                    </nav>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-black">홈</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-black">상품</Link>
                        <span>/</span>
                        <span className="text-black">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Detail */}
            <section className="py-12">
                <div className="max-w-[1280px] mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <div>
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {product.tag && (
                                    <div className={`absolute top-4 left-4 px-3 py-1 text-sm font-bold text-white rounded ${
                                        product.tag === 'NEW' ? 'bg-green-500' :
                                        product.tag === 'BEST' ? 'bg-red-500' :
                                        'bg-orange-500'
                                    }`}>
                                        {product.tag}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-4">
                                <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
                                <h1 className="text-4xl font-black mb-4">{product.name}</h1>
                                <div className="text-3xl font-bold mb-6">{product.price}</div>
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                                
                                {/* Features */}
                                <div className="mb-6">
                                    <h3 className="font-bold mb-3">주요 특징</h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Specs */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-bold mb-3">제품 사양</h3>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key}>
                                                <span className="text-gray-500">{key}:</span>
                                                <span className="ml-2 font-medium">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Section */}
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <label className="font-medium">수량:</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 px-6 py-4 bg-gray-900 text-white font-bold rounded hover:bg-gray-800 transition">
                                        장바구니 담기
                                    </button>
                                    <button className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
                                        바로 구매
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-[1280px] mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8">관련 상품</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {allProducts
                            .filter(p => p.brand === product.brand && p.id !== product.id)
                            .slice(0, 4)
                            .map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.id}`}
                                    className="group"
                                >
                                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                                        <img 
                                            src={relatedProduct.image} 
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                        {relatedProduct.tag && (
                                            <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold text-white rounded ${
                                                relatedProduct.tag === 'NEW' ? 'bg-green-500' :
                                                relatedProduct.tag === 'BEST' ? 'bg-red-500' :
                                                'bg-orange-500'
                                            }`}>
                                                {relatedProduct.tag}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs text-gray-500">{relatedProduct.brand}</div>
                                        <div className="text-sm font-medium line-clamp-1">{relatedProduct.name}</div>
                                        <div className="text-base font-bold">{relatedProduct.price}</div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 border-t border-gray-200 mt-12">
                <div className="max-w-[1280px] mx-auto px-4 py-8">
                    <div className="text-center text-sm text-gray-500">
                        © 2025 FIELD NINE Corporation. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

