"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function HomePage() {
    const [currentBrand, setCurrentBrand] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBrand((prev) => (prev + 1) % 6);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Advanced Particle Animation (YouTube Premium)
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
            size: number; 
            speedX: number; 
            speedY: number; 
            opacity: number;
            color: string;
            vx: number;
            vy: number;
        }> = [];
        
        const colors = ['59, 130, 246', '139, 92, 246', '236, 72, 153', '34, 211, 238', '251, 146, 60'];
        
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.5 + 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: 0,
                vy: 0
            });
        }

        let animationId: number;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, i) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
                ctx.fill();
                
                // Draw connections
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${particle.color}, ${0.15 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
        
        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationId);
        };
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
            desc: '프리미엄 럭셔리 브랜드',
            gradient: 'from-amber-300 via-yellow-500 to-amber-600',
            glow: 'amber',
            icon: '💎'
        },
        { 
            id: 'mard-mard',
            name: 'MARD MARD', 
            tagline: '나를 위한, 나만의 스타일',
            desc: '트렌디 패션 플랫폼',
            gradient: 'from-pink-400 via-rose-500 to-pink-600',
            glow: 'pink',
            icon: '👗'
        },
        { 
            id: 'ai-drone',
            name: 'AI DRONE', 
            tagline: '하늘을 지배하는 인공지능',
            desc: '자율비행 물류 시스템',
            gradient: 'from-green-400 via-emerald-500 to-green-600',
            glow: 'green',
            icon: '🚁'
        },
        { 
            id: 'global-logistics',
            name: 'GLOBAL LOGISTICS', 
            tagline: '세계를 연결하는 물류 네트워크',
            desc: '135개국 글로벌 확장',
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
        <div className="relative bg-[#0f0f0f] text-white min-h-screen overflow-hidden">
            {/* Advanced Canvas Background */}
            <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-40" />
            
            {/* Multi-Layer Gradient System */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                {/* Ambient Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${current.glow}-500/5 to-transparent transition-all duration-1000`}></div>
                
                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]"></div>
                
                {/* Main Brand Glow */}
                <div 
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br ${current.gradient} opacity-15 blur-[180px] rounded-full transition-all duration-1000`}
                    style={{
                        transform: `translate(-50%, -20%) translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                    }}
                ></div>
                
                {/* Secondary Glow */}
                <div 
                    className={`absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl ${current.gradient} opacity-10 blur-[160px] rounded-full transition-all duration-1000`}
                ></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}></div>
                
                {/* Radial Gradient Center */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0f0f0f]"></div>
            </div>

            {/* Premium YouTube-Style Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-[#0f0f0f]/98 backdrop-blur-2xl shadow-2xl border-b border-white/5' : 'bg-transparent'}`}>
                <div className="max-w-[2000px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                                <span className="text-white font-black text-xl relative z-10">F9</span>
                                <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity`}></div>
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-xl font-black tracking-tight">FIELD NINE</div>
                                <div className="text-[10px] text-gray-500 -mt-0.5">Global Innovation Leader</div>
                            </div>
                        </Link>
                        
                        <div className="hidden lg:flex items-center gap-1">
                            {[
                                { name: 'NEXUS OS', href: '/nexus', badge: 'NEW' },
                                { name: 'Workspace', href: '/workspace' },
                                { name: 'AI Hub', href: '/ai-hub' },
                                { name: 'Brands', href: '#brands' }
                            ].map((item, i) => (
                                <Link 
                                    key={i}
                                    href={item.href} 
                                    className="relative px-4 py-2 text-sm text-gray-400 hover:text-white transition-all group rounded-lg hover:bg-white/5"
                                >
                                    {item.name}
                                    {item.badge && (
                                        <span className={`absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r ${current.gradient} rounded text-[8px] font-bold`}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${current.gradient} scale-x-0 group-hover:scale-x-100 transition-transform`}></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex p-2.5 hover:bg-white/10 rounded-xl transition-all group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="hidden md:flex p-2.5 hover:bg-white/10 rounded-xl transition-all group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <Link 
                            href="/login" 
                            className={`relative px-6 py-2.5 bg-gradient-to-r ${current.gradient} rounded-xl text-sm font-bold hover:opacity-90 transition-all hover:scale-105 shadow-lg overflow-hidden group`}
                        >
                            <span className="relative z-10">Sign in</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Premium Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-32">
                    {/* Animated Stats Badge */}
                    <div className="flex justify-center mb-16 animate-fade-in-down">
                        <div className="inline-flex items-center gap-5 px-8 py-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-full border border-white/10 hover:border-white/20 transition-all group hover:scale-105 shadow-2xl">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                            </span>
                            <span className="text-sm font-bold tracking-wide">LIVE NOW</span>
                            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                            <span className={`text-sm font-black bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                                GLOBAL INNOVATION
                            </span>
                            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                            <span className="text-sm text-gray-300 font-semibold">135 Countries</span>
                            <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                            <span className={`text-sm font-bold bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                                1.2M+ Users
                            </span>
                        </div>
                    </div>

                    {/* Massive Title with Effects */}
                    <div className="text-center mb-20">
                        <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-12 leading-[0.85] tracking-tighter">
                            <span 
                                className={`block bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent transition-all duration-1000`}
                                style={{
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 8s ease infinite',
                                    textShadow: '0 0 80px rgba(59, 130, 246, 0.3)'
                                }}
                            >
                                {current.name}
                            </span>
                            {/* Reflection Effect */}
                            <span 
                                className={`absolute top-full left-0 right-0 bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent opacity-10 blur-sm`}
                                style={{
                                    transform: 'scaleY(-1) translateY(20px)',
                                    maskImage: 'linear-gradient(to bottom, transparent, black 50%)'
                                }}
                            >
                                {current.name}
                            </span>
                        </h1>

                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 mb-6 font-light tracking-tight max-w-5xl mx-auto leading-tight">
                            {current.tagline}
                        </p>
                        <p className="text-xl sm:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                            {current.desc}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                        <Link 
                            href={`/brands/${current.id}`}
                            className={`group relative px-10 py-5 bg-gradient-to-r ${current.gradient} rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-2xl overflow-hidden`}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <span>Explore {current.name}</span>
                                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className={`absolute -inset-1 bg-gradient-to-r ${current.gradient} opacity-0 group-hover:opacity-75 blur-xl transition-opacity -z-10`}></div>
                        </Link>
                        
                        <Link 
                            href="/nexus"
                            className="group px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/10 hover:border-white/30 rounded-2xl text-lg font-bold hover:scale-105 transition-all hover:bg-white/10"
                        >
                            <span className="flex items-center gap-3">
                                <span>View NEXUS OS</span>
                                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Premium Brand Showcase */}
                    <div id="brands" className="relative max-w-[1400px] mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-4">
                                <span className="text-sm font-bold text-gray-400">OUR ECOSYSTEM</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4">Global Brand Portfolio</h2>
                            <p className="text-lg text-gray-400">Powered by blockchain innovation across 6 industries</p>
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex justify-center gap-3 mb-12">
                            {brands.map((b, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentBrand(i)}
                                    className={`relative h-1.5 rounded-full transition-all duration-700 overflow-hidden ${i === currentBrand ? 'w-16' : 'w-10 hover:w-12'}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${b.gradient} ${i === currentBrand ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}></div>
                                    {i === currentBrand && (
                                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Brand Cards - Premium Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
                            {brands.map((b, i) => (
                                <Link
                                    key={i}
                                    href={`/brands/${b.id}`}
                                    className="group relative"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className={`relative aspect-square rounded-3xl overflow-hidden transition-all duration-500 ${i === currentBrand ? 'scale-110 z-10' : 'hover:scale-105'}`}>
                                        {/* Gradient Background */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} transition-opacity ${i === currentBrand ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}></div>
                                        
                                        {/* Pattern Overlay */}
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                            backgroundSize: '20px 20px'
                                        }}></div>
                                        
                                        {/* Icon */}
                                        <div className={`absolute inset-0 flex items-center justify-center text-6xl md:text-7xl transition-transform ${i === currentBrand ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {b.icon}
                                        </div>
                                        
                                        {/* Dark Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Info Card on Hover */}
                                        <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-sm font-bold mb-1 line-clamp-2">{b.name}</h3>
                                            <p className="text-xs text-gray-300 line-clamp-2">{b.tagline}</p>
                                        </div>
                                        
                                        {/* Active Glow */}
                                        {i === currentBrand && (
                                            <>
                                                <div className={`absolute -inset-2 bg-gradient-to-br ${b.gradient} opacity-60 blur-2xl -z-10 animate-pulse`}></div>
                                                <div className="absolute inset-0 ring-2 ring-white/30 rounded-3xl"></div>
                                            </>
                                        )}
                                        
                                        {/* Play Icon on Hover */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Brand Info Below */}
                                    <div className="mt-4 text-center">
                                        <h4 className="text-sm font-bold mb-1 group-hover:text-white transition-colors truncate">
                                            {b.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 line-clamp-1">{b.tagline}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="text-center mt-16">
                            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full border border-white/10 hover:border-white/20 transition-all">
                                <span className="text-sm font-semibold">View All Brands</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Featured Content */}
            <section className="py-32 px-6 md:px-12">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-4">
                                <span className="text-sm font-bold text-gray-400">FEATURED</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black mb-4">Innovation in Action</h2>
                            <p className="text-xl text-gray-400">Real-world implementations driving global transformation</p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                            <span className="text-sm font-semibold">View All</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: '🏭', 
                                title: 'Fulfillment Network', 
                                subtitle: 'NEXUS OS Platform',
                                desc: 'AI-powered warehouse automation with real-time robot coordination and predictive analytics.',
                                metric: '99.9% Uptime',
                                color: 'emerald',
                                gradient: 'from-emerald-500 to-teal-500',
                                stats: ['1,847+ Tasks/Day', '94.7% AI Accuracy', '₩2.4M/month Saved']
                            },
                            { 
                                icon: '🤖', 
                                title: 'AI Logistics', 
                                subtitle: 'Machine Learning Engine',
                                desc: 'Advanced route optimization and demand forecasting across 135 countries globally.',
                                metric: '1,847+ Daily',
                                color: 'purple',
                                gradient: 'from-purple-500 to-fuchsia-500',
                                stats: ['135 Countries', '6-Hour Forecasts', '127K+ Data Points']
                            },
                            { 
                                icon: '🪙', 
                                title: 'KAUS Coin', 
                                subtitle: 'Blockchain Protocol',
                                desc: 'Next-generation RFID ecosystem with complete supply chain transparency and verification.',
                                metric: 'Web3 Ready',
                                color: 'amber',
                                gradient: 'from-amber-500 to-orange-500',
                                stats: ['100B+ Verified', 'Real-time Tracking', 'Global Network']
                            }
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer" style={{ animationDelay: `${i * 150}ms` }}>
                                {/* Video Thumbnail Card */}
                                <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 mb-6 hover:ring-2 hover:ring-white/30 transition-all group-hover:scale-105 duration-500">
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                                    
                                    {/* Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-8xl opacity-90 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                    </div>
                                    
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform shadow-2xl">
                                            <svg className="w-10 h-10 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Metric Badge */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/90 backdrop-blur-xl rounded-lg text-sm font-bold border border-white/20">
                                        {item.metric}
                                    </div>
                                    
                                    {/* Gradient Glow */}
                                    <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-50 blur-2xl transition-opacity -z-10`}></div>
                                </div>
                                
                                {/* Content */}
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">{item.subtitle}</div>
                                        <h3 className="text-2xl font-black mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{item.desc}</p>
                                    
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 pt-2">
                                        {item.stats.map((stat, j) => (
                                            <div key={j} className="px-2 py-1.5 bg-white/5 rounded-lg border border-white/5 text-center">
                                                <div className="text-xs text-gray-400 font-semibold truncate">{stat}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEXUS Story */}
            <section className="relative py-40 bg-gradient-to-b from-[#0f0f0f] via-blue-950/5 to-[#0f0f0f]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono text-blue-400 mb-6">
                            NEXUS THE FIELD NINE
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                            The Future of<br/>Supply Chain
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            풀필먼트 · AI물류 · RFID를 넘어선 혁신
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: '🏭',
                                title: 'Fulfillment',
                                subtitle: '풀필먼트', 
                                desc: 'Amazon-grade automation',
                                metric: '99.9% Uptime'
                            },
                            { 
                                icon: '🤖',
                                title: 'AI Logistics',
                                subtitle: 'AI 물류', 
                                desc: '94.7% prediction accuracy',
                                metric: '1,847+ Daily'
                            },
                            { 
                                icon: '🪙',
                                title: 'KAUS Coin',
                                subtitle: 'KAUS 코인', 
                                desc: 'Blockchain ecosystem',
                                metric: 'Web3 Ready'
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl hover:border-white/20 transition-all hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-3xl transition-all"></div>
                                
                                <div className="relative">
                                    <div className="text-5xl mb-4">{item.icon}</div>
                                    <h3 className="text-2xl font-black mb-1">{item.title}</h3>
                                    <div className="text-sm text-gray-500 mb-4">{item.subtitle}</div>
                                    <p className="text-sm text-gray-400 mb-6">{item.desc}</p>
                                    <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono text-blue-400">
                                        {item.metric}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 px-6 md:px-12 overflow-hidden">
                <div className="max-w-[1600px] mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-4">
                            <span className="text-sm font-bold text-gray-400">SUCCESS STORIES</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-4">Trusted Worldwide</h2>
                        <p className="text-xl text-gray-400">Real results from global industry leaders</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "FIELD NINE's blockchain verification reduced our counterfeit incidents by 99.7%. The transparency is unprecedented.",
                                author: "Sarah Chen",
                                role: "CEO, LuxeGroup International",
                                company: "FILLUMINATE Partner",
                                avatar: "👩‍💼",
                                gradient: "from-amber-500 to-orange-500",
                                rating: 5
                            },
                            {
                                quote: "The NEXUS OS platform transformed our warehouse operations. AI predictions saved us ₩2.4M monthly with 94.7% accuracy.",
                                author: "Michael Rodriguez",
                                role: "COO, GlobalMart Distribution",
                                company: "DATABASE GUARD Client",
                                avatar: "👨‍💼",
                                gradient: "from-cyan-500 to-blue-500",
                                rating: 5
                            },
                            {
                                quote: "Real-time logistics across 135 countries with perfect traceability. Delivery times reduced by 30% in first quarter.",
                                author: "Emily Park",
                                role: "VP Operations, FastShip Global",
                                company: "GLOBAL LOGISTICS User",
                                avatar: "👩‍🚀",
                                gradient: "from-purple-500 to-fuchsia-500",
                                rating: 5
                            }
                        ].map((testimonial, i) => (
                            <div 
                                key={i} 
                                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all hover:scale-105 duration-500"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">"”</div>
                                
                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                
                                {/* Quote */}
                                <p className="text-lg text-gray-300 leading-relaxed mb-8 font-light">{testimonial.quote}</p>
                                
                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.author}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{testimonial.company}</div>
                                    </div>
                                </div>
                                
                                {/* Gradient Border Effect */}
                                <div className={`absolute -inset-px bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur transition-opacity -z-10`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "1.2M+", label: "Active Users" },
                            { value: "135", label: "Countries" },
                            { value: "99.9%", label: "Uptime SLA" },
                            { value: "100B+", label: "Verifications" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
                                <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Ready to Transform?
                    </h3>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Join 135 countries already using FIELD NINE for their supply chain innovation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/brands/${current.id}`}
                            className={`group px-10 py-5 bg-gradient-to-r ${current.gradient} rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl relative overflow-hidden`}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Explore {current.name}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                        </Link>
                        <Link
                            href="/nexus"
                            className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full font-bold text-lg transition-all"
                        >
                            View NEXUS OS
                        </Link>
                    </div>
                </div>
            </section>

            {/* Premium YouTube-Style Footer */}
            <footer className="relative bg-[#0f0f0f] border-t border-white/10 pt-20 pb-12 px-6 md:px-12">
                <div className="max-w-[2000px] mx-auto">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-4 mb-6 group">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center transition-all group-hover:scale-110`}>
                                    <span className="text-white font-black text-2xl">F9</span>
                                </div>
                                <div>
                                    <div className="text-2xl font-black">FIELD NINE</div>
                                    <div className="text-xs text-gray-500">Global Innovation Leader</div>
                                </div>
                            </Link>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                Transforming global supply chains with blockchain-powered innovation across 135 countries.
                            </p>
                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {[
                                    { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                                    { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                                    { name: 'GitHub', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
                                    { name: 'YouTube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l0-6.53 5.75 3.27-5.75 3.26z' }
                                ].map((social, i) => (
                                    <button
                                        key={i}
                                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10 hover:border-white/20"
                                        aria-label={social.name}
                                    >
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 text-white">Products</h4>
                            <ul className="space-y-3 text-sm">
                                {[
                                    { name: 'NEXUS OS', href: '/nexus', badge: 'NEW' },
                                    { name: 'Workspace', href: '/workspace' },
                                    { name: 'AI Hub', href: '/ai-hub' },
                                    { name: 'Blockchain', href: '/blockchain' },
                                    { name: 'Analytics', href: '/analytics' }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                            {item.name}
                                            {item.badge && (
                                                <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brands */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 text-white">Brands</h4>
                            <ul className="space-y-3 text-sm">
                                {brands.map((b, i) => (
                                    <li key={i}>
                                        <Link href={`/brands/${b.id}`} className="text-gray-400 hover:text-white transition-colors">
                                            {b.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 text-white">Company</h4>
                            <ul className="space-y-3 text-sm">
                                {['About Us', 'Careers', 'Press Kit', 'Contact', 'Partners'].map((item, i) => (
                                    <li key={i}>
                                        <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 text-white">Legal</h4>
                            <ul className="space-y-3 text-sm">
                                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licenses', 'Security'].map((item, i) => (
                                    <li key={i}>
                                        <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
                            <span>© 2025 FIELD NINE Corporation. All rights reserved.</span>
                            <div className="hidden md:block w-px h-4 bg-white/10"></div>
                            <span className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                All systems operational
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-xs text-gray-500">
                            <span>Blockchain Verified</span>
                            <div className="w-px h-3 bg-white/10"></div>
                            <span>ISO 27001 Certified</span>
                            <div className="w-px h-3 bg-white/10"></div>
                            <span>SOC 2 Type II</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* Add gradient animation keyframes - paste into globals.css */
