"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
            {/* Navigation - Premium Minimal */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 20 ? 'glass-effect-light dark:glass-effect border-b border-gray-200/50 dark:border-gray-800/50 py-2' : 'py-4 bg-transparent'}`}>
                <div className="container-premium">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300">
                                <span className="text-white font-bold text-xl">F9</span>
                            </div>
                            <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                FIELD NINE
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/ai-hub" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                AI Hub
                            </Link>
                            <Link href="/nexus" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                NEXUS OS
                            </Link>
                            <Link href="/workspace" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Workspace
                            </Link>
                            <Link href="/metaverse" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Metaverse
                            </Link>
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                            <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                로그인
                            </Link>
                            <Link href="/signup" className="px-5 py-2.5 bg-gradient-primary text-white text-sm font-semibold rounded-xl hover-lift shadow-md hover:shadow-premium transition-all">
                                시작하기
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-gray-700 dark:text-gray-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Premium & Trust */}
            <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-glow"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="container-premium">
                    <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect-light dark:glass-effect border border-primary-200 dark:border-primary-900/30 mb-8 shadow-sm hover:border-primary-500/50 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                🤖 5 AI Systems · 96.5% Accuracy · ₩10M/Month Savings
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                            <span className="block text-gray-900 dark:text-white">
                                AI로 완성되는
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 pb-2">
                                스마트 물류 혁신
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            5개의 AI 시스템이 실시간으로 협력하여 물류 센터를 완벽하게 자동화합니다.
                            <br className="hidden md:block" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                                Demand Forecasting · Path Planning · Anomaly Detection · Computer Vision · Voice Commands
                            </span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link href="/ai-hub" className="group w-full sm:w-auto px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover-lift shadow-xl hover:shadow-premium transition-all relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative flex items-center justify-center">
                                    AI Hub 시작하기
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 glass-effect-light dark:glass-effect text-gray-900 dark:text-white font-semibold rounded-xl hover-lift shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                                도입 상담하기
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                96.5% 평균 정확도
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                월 ₩10M 절감
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-accent-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Global Top Tier Partners
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section - NEW */}
            <section className="py-10 border-y border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
                <div className="container-premium">
                    <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-wider">
                        Trusted by Industry Leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Logos with text for now */}
                        {['SAMSUNG', 'LG Electronics', 'HYUNDAI', 'SK Hynix', 'POSCO'].map((brand) => (
                            <span key={brand} className="text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-default">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Trust Building */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container-premium">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '₩2.4M', label: '월 평균 비용 절감', color: 'text-success' },
                            { value: '99.9%', label: 'AI 예측 정확도', color: 'text-primary-600' },
                            { value: '10K+', label: '일일 처리 트랜잭션', color: 'text-accent-gold' },
                            { value: '24/7', label: '실시간 관제 시스템', color: 'text-info' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className={`text-3xl md:text-5xl font-bold ${stat.color} mb-3`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid - Premium Cards */}
            <section className="py-20 md:py-32 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>

                <div className="container-premium relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            완벽한 통합 솔루션
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            복잡한 물류 프로세스를 하나의 직관적인 플랫폼으로 통합했습니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🤖',
                                title: 'NEXUS OS',
                                description: 'AI 기반 자율 운영 시스템. 실시간 로봇 제어부터 예측 분석까지, 물류 센터의 두뇌 역할을 수행합니다.',
                                badge: 'CORE',
                                link: '/nexus',
                                gradient: 'from-blue-500 to-cyan-500'
                            },
                            {
                                icon: '⛓️',
                                title: 'Blockchain Tracking',
                                description: '위변조가 불가능한 100% 투명한 공급망. RFID와 블록체인 기술로 모든 이동 경로를 검증합니다.',
                                badge: 'SECURITY',
                                link: '/nexus',
                                gradient: 'from-purple-500 to-pink-500'
                            },
                            {
                                icon: '🏢',
                                title: 'Workspace',
                                description: '엔터프라이즈급 협업 도구. 역할 기반 접근 제어(RBAC)와 실시간 데이터 동기화로 팀 생산성을 극대화합니다.',
                                badge: 'COLLAB',
                                link: '/workspace',
                                gradient: 'from-orange-500 to-red-500'
                            }
                        ].map((feature, i) => (
                            <Link
                                key={i}
                                href={feature.link}
                                className="group relative p-8 rounded-3xl glass-effect-light dark:glass-effect border border-gray-200 dark:border-gray-800 hover-lift hover:border-primary-300 dark:hover:border-primary-700 transition-all overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                {/* Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 group-hover:bg-gradient-to-r ${feature.gradient} group-hover:text-white transition-all`}>
                                        {feature.badge}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 min-h-[80px]">
                                    {feature.description}
                                </p>

                                {/* Arrow */}
                                <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold text-sm uppercase tracking-wide">
                                    Explore Feature
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Premium Gradient */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>

                <div className="container-premium relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                            Ready to Transform?
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                            지금 바로 FIELD NINE과 함께 물류 혁신을 시작하세요.
                            <br />
                            전문가 팀이 온보딩부터 시스템 구축까지 전담 지원합니다.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-xl hover-lift shadow-2xl hover:shadow-white/20 transition-all text-lg">
                                무료로 시작하기
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
                                도입 문의하기
                            </Link>
                        </div>

                        {/* Trust Line */}
                        <div className="mt-16 flex items-center justify-center gap-8 text-gray-400 text-sm">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                14일 무료 체험
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                카드 등록 불필요
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                24/7 기술 지원
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - Minimal & Professional */}
            <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <div className="container-premium">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F9</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">FIELD NINE</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <Link href="/nexus" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Product
                            </Link>
                            <Link href="/workspace" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Solutions
                            </Link>
                            <Link href="/pricing" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Pricing
                            </Link>
                            <Link href="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Company
                            </Link>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-600">
                            © 2025 FIELD NINE Inc.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
