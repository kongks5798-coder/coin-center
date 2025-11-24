'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer from '@/components/animations/StaggerContainer';
import Counter from '@/components/animations/Counter';

// FIELD NINE 핵심 기술 및 브랜드
const coreTechnologies = [
    {
        id: 'nexus',
        name: 'NEXUS The Field Nine',
        tagline: 'AI 기반 물류 자동화 시스템',
        description: '250개국 글로벌 네트워크로 전 세계를 연결하는 차세대 물류 플랫폼',
        icon: '⚛️',
        gradient: 'from-purple-500 via-blue-500 to-cyan-500',
        stats: ['250개국 서비스', '1.25M대 드론', '99.999% 안전률'],
        link: '/nexus',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop'
    },
    {
        id: 'ai',
        name: 'AI Technology',
        tagline: '압도적 기술력 세계 1위',
        description: '양자 컴퓨팅과 뉴럴 AI로 구동되는 차세대 인공지능 시스템',
        icon: '🧠',
        gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
        stats: ['99.9% 정확도', '0.001초 응답', '무한 확장'],
        link: '/nexus',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop'
    },
    {
        id: 'drone',
        name: 'Autonomous Drones',
        tagline: '100% 자율비행 드론 네트워크',
        description: '1.25M대 드론이 250개국을 연결하는 글로벌 자율비행 물류 시스템',
        icon: '🚁',
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        stats: ['1.25M대 활성', '250개국', '10분 내 배송'],
        link: '/nexus-satellite',
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=800&fit=crop'
    },
    {
        id: 'blockchain',
        name: 'Quantum Blockchain',
        tagline: '양자 블록체인으로 지키는 신뢰',
        description: '불변의 기록과 완벽한 보안을 제공하는 양자 블록체인 기술',
        icon: '⛓️',
        gradient: 'from-violet-500 via-purple-500 to-pink-500',
        stats: ['100억+ 검증', '0건 보안 사고', '99.99% 가동률'],
        link: '/kaustrace',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop'
    }
];

const premiumBrands = [
    {
        id: 'filluminate',
        name: 'FILLUMINATE',
        tagline: '빛으로 빚어낸 명품의 시간',
        description: '럭셔리와 혁신의 완벽한 조화를 추구하는 프리미엄 브랜드',
        icon: '✨',
        gradient: 'from-amber-400 via-orange-500 to-red-500',
        stats: ['₩5조 브랜드 가치', '50+ 글로벌 매장', '99.9% 고객 만족도'],
        link: '/brands/filluminate',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop'
    },
    {
        id: 'mard-mard',
        name: 'MARD MARD',
        tagline: '나를 위한, 나만의 스타일',
        description: '개성과 트렌드의 완벽한 밸런스를 추구하는 패션 브랜드',
        icon: '👔',
        gradient: 'from-pink-500 via-purple-500 to-indigo-500',
        stats: ['₩2조 연 매출', '100만+ 활성 회원', '10K+ 일일 신상품'],
        link: '/brands/mard-mard',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop'
    }
];

const services = [
    {
        id: 'kaus-coin',
        name: 'KAUS Coin',
        tagline: 'RFID를 넘어선 미래 금융',
        description: 'USD 페깅 스테이블코인으로 모든 결제 수단',
        icon: '🪙',
        gradient: 'from-orange-400 via-red-500 to-orange-600',
        stats: ['124B 거래', '50M 사용자', '250개국 네트워크'],
        link: '/wallet',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop'
    },
    {
        id: 'satellite',
        name: 'Satellite Network',
        tagline: '250개 위성으로 지구를 연결',
        description: '99.8% 글로벌 커버리지로 전 세계 어디서나 연결',
        icon: '🛰️',
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        stats: ['250개 위성', '99.8% 커버리지', '250개국'],
        link: '/nexus-satellite',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop'
    },
    {
        id: 'metaverse',
        name: 'Metaverse',
        tagline: '홀로그램 가상 세계',
        description: '양자 렌더링으로 구현된 혁신적인 메타버스 플랫폼',
        icon: '🌐',
        gradient: 'from-cyan-500 via-teal-500 to-green-500',
        stats: ['무한 확장', '실시간 렌더링', '홀로그램 UI'],
        link: '/metaverse',
        image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1200&h=800&fit=crop'
    }
];

export default function HomePage() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // 파티클 배경 효과
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
                opacity: Math.random() * 0.5 + 0.2,
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

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* 배경 효과 */}
            <canvas 
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
            />
            <div 
                className="fixed inset-0 opacity-30 z-0"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), transparent 70%)`
                }}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <ScrollReveal direction="fade" delay={0.2}>
                        <div className="mb-8">
                            <motion.div 
                                className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <span className="text-sm font-medium text-gray-300">FIELD NINE 2035</span>
                            </motion.div>
                            <motion.h1 
                                className="text-8xl md:text-[12rem] font-black mb-6 leading-none"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    FIELD NINE
                                </span>
                            </motion.h1>
                            <motion.p 
                                className="text-3xl md:text-5xl text-gray-300 mb-4 font-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            >
                                미래를 만드는 기술
                            </motion.p>
                            <motion.p 
                                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            >
                                AI, 드론, 블록체인으로 전 세계를 연결하는 혁신 플랫폼
                            </motion.p>
                        
                            {/* CTA 버튼 */}
                            <motion.div 
                                className="flex flex-wrap gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/nexus"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl font-bold text-lg overflow-hidden transition-all shadow-lg shadow-purple-500/50"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <span>⚛️</span>
                                            <span>NEXUS OS</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/dashboard/global"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg overflow-hidden transition-all shadow-lg shadow-cyan-500/50"
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
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/metaverse"
                                        className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span>🚀</span>
                                            <span>메타버스 입장</span>
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 핵심 기술 섹션 */}
            <section className="relative py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6">
                                <span className="text-sm font-medium text-gray-300">CORE TECHNOLOGIES</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black mb-4">
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    핵심 기술
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                세계 최고 수준의 AI, 드론, 블록체인 기술로 미래를 선도합니다
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8">
                        {coreTechnologies.map((tech, index) => (
                            <motion.div
                                key={tech.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={tech.link}
                                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer block"
                                >
                                    <div className="absolute inset-0">
                                        <Image 
                                            src={tech.image} 
                                            alt={tech.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${tech.gradient} rounded-full mb-3`}>
                                        <span className="text-sm font-bold text-white">{tech.icon} {tech.name}</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2">{tech.tagline}</h3>
                                    <p className="text-lg text-gray-300 mb-4">{tech.description}</p>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {tech.stats.map((stat, i) => (
                                            <div key={i} className="text-sm font-bold text-white/80">
                                                {stat}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <span>자세히 보기</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 프리미엄 브랜드 섹션 */}
            <section className="relative py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6">
                                <span className="text-sm font-medium text-gray-300">PREMIUM BRANDS</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black mb-4">
                                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                    프리미엄 브랜드
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                럭셔리와 혁신의 완벽한 조화
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8">
                        {premiumBrands.map((brand) => (
                            <motion.div
                                key={brand.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={brand.link}
                                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer block"
                                >
                                    <div className="absolute inset-0">
                                        <Image 
                                            src={brand.image} 
                                            alt={brand.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${brand.gradient} rounded-full mb-3`}>
                                        <span className="text-sm font-bold text-white">{brand.icon} {brand.name}</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2">{brand.tagline}</h3>
                                    <p className="text-lg text-gray-300 mb-4">{brand.description}</p>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {brand.stats.map((stat, i) => (
                                            <div key={i} className="text-sm font-bold text-white/80">
                                                {stat}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <span>자세히 보기</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 서비스 섹션 */}
            <section className="relative py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6">
                                <span className="text-sm font-medium text-gray-300">SERVICES</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black mb-4">
                                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                                    서비스
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                전 세계를 연결하는 혁신적인 서비스
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={service.link}
                                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer block"
                                >
                                    <div className="absolute inset-0">
                                        <Image 
                                            src={service.image} 
                                            alt={service.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${service.gradient} rounded-full mb-3`}>
                                        <span className="text-sm font-bold text-white">{service.icon} {service.name}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2">{service.tagline}</h3>
                                    <p className="text-base text-gray-300 mb-3">{service.description}</p>
                                    <div className="flex flex-wrap gap-3 mb-3">
                                        {service.stats.map((stat, i) => (
                                            <div key={i} className="text-xs font-bold text-white/80">
                                                {stat}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <span>자세히 보기</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 채굴 섹션 (작은 섹션으로) */}
            <section className="relative py-16 overflow-hidden border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-8">
                            <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-4">
                                <span className="text-sm font-medium text-gray-300">KAUS MINING</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    KAUS 채굴
                                </span>
                            </h2>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
                                디바이스를 켜놓으면 자동으로 채굴하는 혁신적인 시스템
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/mining"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-500/50"
                                >
                                    <span>⚡</span>
                                    <span>채굴 시작하기</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-white/10 py-12 mt-16">
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
                            <h4 className="font-bold mb-4 text-white">기술</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/nexus" className="hover:text-white transition">NEXUS OS</Link></li>
                                <li><Link href="/nexus-satellite" className="hover:text-white transition">위성 네트워크</Link></li>
                                <li><Link href="/kaustrace" className="hover:text-white transition">KAUS TRACE</Link></li>
                                <li><Link href="/metaverse" className="hover:text-white transition">메타버스</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-white">서비스</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/dashboard/global" className="hover:text-white transition">글로벌 대시보드</Link></li>
                                <li><Link href="/wallet" className="hover:text-white transition">지갑 & 거래소</Link></li>
                                <li><Link href="/listing" className="hover:text-white transition">상장 신청</Link></li>
                                <li><Link href="/reserves" className="hover:text-white transition">리저브 대시보드</Link></li>
                                <li><Link href="/mining" className="hover:text-white transition">KAUS 채굴</Link></li>
                                <li><Link href="/activity-mining" className="hover:text-white transition">활동 기반 채굴</Link></li>
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
        </div>
    );
}
