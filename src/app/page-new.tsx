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
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect-light dark:glass-effect border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">F9</span>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                FIELD NINE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-premium">
          <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect-light dark:glass-effect border border-primary-200 dark:border-primary-900/30 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Now Live at <span className="text-gradient-primary font-semibold">www.fieldnine.io</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="block text-gray-900 dark:text-white">
                Enterprise-Grade
              </span>
              <span className="block text-gradient-primary mt-2">
                Logistics Platform
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed">
              AI 기반 물류 자동화, 블록체인 추적, 엔터프라이즈 협업을 하나의 플랫폼에서. 
              <span className="block mt-2 font-semibold text-gray-700 dark:text-gray-300">
                신뢰할 수 있는 차세대 디지털 인프라
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16">
              <Link href="/signup" className="group w-full sm:w-auto px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover-lift shadow-xl hover:shadow-premium transition-all">
                <span className="flex items-center justify-center">
                  무료로 시작하기
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="/nexus" className="w-full sm:w-auto px-8 py-4 glass-effect-light dark:glass-effect text-gray-900 dark:text-white font-semibold rounded-xl hover-lift shadow-md transition-all border border-gray-200 dark:border-gray-700">
                NEXUS OS 둘러보기
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                99.9% Uptime
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Enterprise Security
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                30+ Team Members
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-info mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Trust Building */}
      <section className="py-16 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '₩2.4M', label: '월 비용 절감', color: 'text-success' },
              { value: '94.7%', label: 'AI 정확도', color: 'text-primary-600' },
              { value: '10K+', label: '처리 작업', color: 'text-accent-gold' },
              { value: '24/7', label: '실시간 모니터링', color: 'text-info' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Premium Cards */}
      <section className="py-20 md:py-32">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              완벽한 통합 솔루션
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              AI, 블록체인, 엔터프라이즈 협업 도구가 하나로
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '🤖',
                title: 'NEXUS OS',
                description: 'AI 기반 물류 자동화 시스템. 실시간 로봇 제어, 예측 분석, 최적화',
                badge: 'NEW',
                link: '/nexus',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🔐',
                title: 'Blockchain Tracking',
                description: '100% 투명한 공급망 추적. RFID + 블록체인 검증',
                badge: 'CORE',
                link: '/nexus',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '👥',
                title: 'Workspace',
                description: '30명 규모 엔터프라이즈 협업. 작업 관리, RBAC, 실시간 동기화',
                badge: 'PRO',
                link: '/workspace',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, i) => (
              <Link 
                key={i} 
                href={feature.link}
                className="group relative p-8 rounded-2xl glass-effect-light dark:glass-effect border border-gray-200 dark:border-gray-800 hover-lift hover:border-primary-300 dark:hover:border-primary-700 transition-all"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
                    {feature.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6">{feature.icon}</div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gradient-primary transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm">
                  자세히 보기
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Gradient */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-primary-600 to-blue-800 dark:from-blue-900 dark:via-primary-900 dark:to-blue-950"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="container-premium relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              전문가 팀이 온보딩부터 완전한 시스템 구축까지 함께합니다.
              <span className="block mt-2 font-semibold">
                첫 달 무료, 언제든 취소 가능
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-white text-primary-600 font-bold rounded-xl hover-lift shadow-2xl hover:shadow-premium transition-all text-lg">
                무료 체험 시작
              </Link>
              <Link href="/nexus" className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-xl hover-lift border-2 border-white/30 hover:bg-white/20 transition-all text-lg">
                데모 보기
              </Link>
            </div>

            {/* Trust Line */}
            <div className="mt-12 flex items-center justify-center text-blue-100 text-sm">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              카드 정보 불필요 • 5분 내 설정 완료 • 전문가 지원
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Professional */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold">F9</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">FIELD NINE</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/nexus" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                NEXUS OS
              </Link>
              <Link href="/workspace" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Workspace
              </Link>
              <Link href="/team/design" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                팀
              </Link>
              <a href="mailto:contact@fieldnine.io" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                문의하기
              </a>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-500">
              © 2025 FIELD NINE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
