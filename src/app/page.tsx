'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer from '@/components/animations/StaggerContainer';

// FIELD NINE 핵심 기술
const coreTechnologies = [
    {
        id: 'nexus',
        name: 'NEXUS OS',
        tagline: 'AI 기반 물류 자동화',
        description: '250개국 글로벌 네트워크로 전 세계를 연결하는 차세대 물류 플랫폼',
        gradient: 'from-white/20 to-white/5',
        stats: ['250개국', '1.25M 드론', '99.999% 안전률'],
        link: '/nexus',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop'
    },
    {
        id: 'ai',
        name: 'AI Technology',
        tagline: '압도적 기술력',
        description: '양자 컴퓨팅과 뉴럴 AI로 구동되는 차세대 인공지능 시스템',
        gradient: 'from-white/20 to-white/5',
        stats: ['99.9% 정확도', '0.001초 응답', '무한 확장'],
        link: '/nexus',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop'
    },
    {
        id: 'drone',
        name: 'Autonomous Drones',
        tagline: '100% 자율비행',
        description: '1.25M대 드론이 250개국을 연결하는 글로벌 자율비행 물류 시스템',
        gradient: 'from-white/20 to-white/5',
        stats: ['1.25M대', '250개국', '10분 배송'],
        link: '/nexus-satellite',
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&h=1080&fit=crop'
    },
    {
        id: 'blockchain',
        name: 'Quantum Blockchain',
        tagline: '양자 블록체인',
        description: '불변의 기록과 완벽한 보안을 제공하는 양자 블록체인 기술',
        gradient: 'from-white/20 to-white/5',
        stats: ['100억+ 검증', '0건 사고', '99.99% 가동률'],
        link: '/kaustrace',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop'
    }
];

const businessAreas = [
    {
        id: 'luxury',
        name: 'Luxury',
        tagline: '프리미엄 럭셔리',
        description: '빛으로 빚어낸 명품의 시간, 럭셔리와 혁신의 완벽한 조화',
        gradient: 'from-white/20 to-white/5',
        stats: ['₩5조 가치', '50+ 매장', '99.9% 만족도'],
        link: '/brands/filluminate',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop'
    },
    {
        id: 'fashion',
        name: 'Fashion',
        tagline: '패션 플랫폼',
        description: '개성과 트렌드의 완벽한 밸런스를 추구하는 글로벌 패션 사업',
        gradient: 'from-white/20 to-white/5',
        stats: ['₩2조 매출', '100만+ 회원', '10K+ 신상품'],
        link: '/brands',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop'
    }
];

const services = [
    {
        id: 'kaus-coin',
        name: 'KAUS Coin',
        tagline: '미래 금융',
        description: 'USD 페깅 스테이블코인으로 모든 결제 수단',
        gradient: 'from-white/20 to-white/5',
        stats: ['124B 거래', '50M 사용자', '250개국'],
        link: '/wallet',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&h=1080&fit=crop'
    },
    {
        id: 'satellite',
        name: 'Satellite Network',
        tagline: '지구를 연결',
        description: '99.8% 글로벌 커버리지로 전 세계 어디서나 연결',
        gradient: 'from-white/20 to-white/5',
        stats: ['250개 위성', '99.8% 커버리지', '250개국'],
        link: '/nexus-satellite',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop'
    },
    {
        id: 'metaverse',
        name: 'Metaverse',
        tagline: '홀로그램 세계',
        description: '양자 렌더링으로 구현된 혁신적인 메타버스 플랫폼',
        gradient: 'from-white/20 to-white/5',
        stats: ['무한 확장', '실시간 렌더링', '홀로그램 UI'],
        link: '/metaverse',
        image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1920&h=1080&fit=crop'
    }
];

export default function HomePage() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // 마우스 추적 (은은하게)
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
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* 은은한 배경 그라디언트 */}
            <div 
                className="fixed inset-0 opacity-[0.03] z-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1), transparent 70%)`
                }}
            />

            {/* Hero Section - 테슬라 스타일 */}
            <section 
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                <motion.div 
                    style={{ opacity }}
                    className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center"
                >
                    <ScrollReveal direction="fade" delay={0.2}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-12"
                        >
                            <div className="inline-block px-4 py-2 border border-white/10 rounded-full mb-8">
                                <span className="text-sm font-light text-white/60 tracking-wider">FIELD NINE 2035</span>
                            </div>
                            <motion.h1 
                                className="text-7xl md:text-[10rem] font-light mb-8 leading-[0.9] tracking-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="text-white">FIELD NINE</span>
                            </motion.h1>
                            <motion.p 
                                className="text-xl md:text-2xl text-white/60 mb-12 font-light tracking-wide max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                미래를 만드는 기술
                            </motion.p>
                            <motion.p 
                                className="text-base md:text-lg text-white/40 mb-12 max-w-xl mx-auto font-light leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                AI, 드론, 블록체인으로 전 세계를 연결하는 혁신 플랫폼
                            </motion.p>
                            
                            {/* CTA 버튼 - 미니멀 */}
                            <motion.div 
                                className="flex flex-wrap gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/nexus"
                                        className="group relative px-8 py-3 border border-white/20 rounded-full font-light text-sm tracking-wide hover:border-white/40 transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <span>NEXUS OS</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/dashboard/global"
                                        className="group relative px-8 py-3 border border-white/20 rounded-full font-light text-sm tracking-wide hover:border-white/40 transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <span>글로벌 대시보드</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </ScrollReveal>
                </motion.div>
            </section>

            {/* 핵심 기술 섹션 - 테슬라 스타일 */}
            <section className="relative py-32 md:py-48 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-block px-4 py-2 border border-white/10 rounded-full mb-8">
                                <span className="text-xs font-light text-white/40 tracking-wider">CORE TECHNOLOGIES</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
                                <span className="text-white">핵심 기술</span>
                            </h2>
                            <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light">
                                세계 최고 수준의 AI, 드론, 블록체인 기술로 미래를 선도합니다
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="space-y-32 md:space-y-48">
                        {coreTechnologies.map((tech, index) => (
                            <motion.div
                                key={tech.id}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="group"
                            >
                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}>
                                    {/* 이미지 */}
                                    <div className="flex-1 w-full aspect-[16/10] relative overflow-hidden rounded-lg">
                                        <Image 
                                            src={tech.image} 
                                            alt={tech.name}
                                            fill
                                            className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={index < 2}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </div>
                                    
                                    {/* 텍스트 */}
                                    <div className="flex-1 space-y-6">
                                        <div className="inline-block px-4 py-2 border border-white/10 rounded-full">
                                            <span className="text-xs font-light text-white/60 tracking-wider">{tech.name}</span>
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">{tech.tagline}</h3>
                                        <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">{tech.description}</p>
                                        <div className="flex flex-wrap gap-6 pt-4">
                                            {tech.stats.map((stat, i) => (
                                                <div key={i} className="text-sm font-light text-white/40">
                                                    {stat}
                                                </div>
                                            ))}
                                        </div>
                                        <Link
                                            href={tech.link}
                                            className="inline-flex items-center gap-2 text-sm font-light text-white/60 hover:text-white transition-colors group/link"
                                        >
                                            <span>자세히 보기</span>
                                            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 사업 영역 섹션 - 테슬라 스타일 */}
            <section className="relative py-32 md:py-48 overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-block px-4 py-2 border border-white/10 rounded-full mb-8">
                                <span className="text-xs font-light text-white/40 tracking-wider">BUSINESS AREAS</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
                                <span className="text-white">사업 영역</span>
                            </h2>
                            <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light">
                                럭셔리와 혁신의 완벽한 조화
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {businessAreas.map((business) => (
                            <motion.div
                                key={business.id}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={business.link}
                                    className="group block relative aspect-[4/3] overflow-hidden rounded-lg"
                                >
                                    <div className="absolute inset-0">
                                        <Image 
                                            src={business.image} 
                                            alt={business.name}
                                            fill
                                            className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                                        <div className="inline-block px-4 py-2 border border-white/20 rounded-full">
                                            <span className="text-xs font-light text-white/80 tracking-wider">{business.name}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">{business.tagline}</h3>
                                        <p className="text-base text-white/60 font-light">{business.description}</p>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            {business.stats.map((stat, i) => (
                                                <div key={i} className="text-xs font-light text-white/50">
                                                    {stat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 서비스 섹션 - 테슬라 스타일 */}
            <section className="relative py-32 md:py-48 overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-block px-4 py-2 border border-white/10 rounded-full mb-8">
                                <span className="text-xs font-light text-white/40 tracking-wider">SERVICES</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
                                <span className="text-white">서비스</span>
                            </h2>
                            <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light">
                                전 세계를 연결하는 혁신적인 서비스
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 md:gap-12" staggerDelay={0.15}>
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={service.link}
                                    className="group block relative aspect-[4/3] overflow-hidden rounded-lg"
                                >
                                    <div className="absolute inset-0">
                                        <Image 
                                            src={service.image} 
                                            alt={service.name}
                                            fill
                                            className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.02]"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                                        <div className="inline-block px-3 py-1.5 border border-white/20 rounded-full">
                                            <span className="text-xs font-light text-white/80 tracking-wider">{service.name}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">{service.tagline}</h3>
                                        <p className="text-sm text-white/60 font-light">{service.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 채굴 섹션 - 미니멀 */}
            <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <ScrollReveal direction="up">
                        <div className="text-center space-y-6">
                            <div className="inline-block px-4 py-2 border border-white/10 rounded-full">
                                <span className="text-xs font-light text-white/40 tracking-wider">KAUS MINING</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
                                <span className="text-white">KAUS 채굴</span>
                            </h2>
                            <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto font-light">
                                디바이스를 켜놓으면 자동으로 채굴하는 혁신적인 시스템
                            </p>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="/mining"
                                    className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full font-light text-sm tracking-wide hover:border-white/40 transition-all duration-300"
                                >
                                    <span>채굴 시작하기</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Footer - 미니멀 */}
            <footer className="relative border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h4 className="font-light mb-4 text-white text-sm tracking-wide">FIELD NINE</h4>
                            <ul className="space-y-2 text-sm text-white/40 font-light">
                                <li><Link href="/about" className="hover:text-white/60 transition">회사 소개</Link></li>
                                <li><Link href="/contact" className="hover:text-white/60 transition">연락처</Link></li>
                                <li><Link href="/careers" className="hover:text-white/60 transition">채용</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-light mb-4 text-white text-sm tracking-wide">기술</h4>
                            <ul className="space-y-2 text-sm text-white/40 font-light">
                                <li><Link href="/nexus" className="hover:text-white/60 transition">NEXUS OS</Link></li>
                                <li><Link href="/nexus-satellite" className="hover:text-white/60 transition">위성 네트워크</Link></li>
                                <li><Link href="/kaustrace" className="hover:text-white/60 transition">KAUS TRACE</Link></li>
                                <li><Link href="/metaverse" className="hover:text-white/60 transition">메타버스</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-light mb-4 text-white text-sm tracking-wide">서비스</h4>
                            <ul className="space-y-2 text-sm text-white/40 font-light">
                                <li><Link href="/dashboard/global" className="hover:text-white/60 transition">글로벌 대시보드</Link></li>
                                <li><Link href="/wallet" className="hover:text-white/60 transition">지갑 & 거래소</Link></li>
                                <li><Link href="/listing" className="hover:text-white/60 transition">상장 신청</Link></li>
                                <li><Link href="/reserves" className="hover:text-white/60 transition">리저브 대시보드</Link></li>
                                <li><Link href="/mining" className="hover:text-white/60 transition">KAUS 채굴</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-light mb-4 text-white text-sm tracking-wide">연락처</h4>
                            <ul className="space-y-2 text-sm text-white/40 font-light">
                                <li>support@fieldnine.io</li>
                                <li>+82-2-1234-5678</li>
                                <li>서울특별시 강남구</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 text-center text-xs text-white/30 font-light">
                        <p>© 2035 FIELD NINE Corporation. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
