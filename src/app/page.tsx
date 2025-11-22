'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('fieldnine-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Stripe-style 미세 패턴 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* 헤더 - Linear 스타일 */}
      <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                  <span className="text-white font-black text-sm">K</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900 tracking-tight leading-none">KAUS</span>
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wider">FIELD NINE</span>
                </div>
              </Link>
              {user && (
                <nav className="hidden md:flex items-center gap-1">
                  <Link href="/workspace" className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all">
                    Workspace
                  </Link>
                  <Link href="/metaverse" className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all">
                    Metaverse
                  </Link>
                  <Link href="/components/Nexus" className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all">
                    NEXUS OS
                  </Link>
                </nav>
              )}
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/workspace" className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{user.name}</span>
                </Link>
              ) : (
                <Link href="/login" className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 - Vercel 스타일 */}
      <main className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900/5 border border-gray-900/10 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-700 tracking-wide">ENTERPRISE COLLABORATION PLATFORM</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Premium Workspace
            </span>
            <br />
            <span className="text-gray-400 text-5xl md:text-6xl font-bold">for Modern Teams</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            프로젝트 관리, 메타버스 협업, AI 자동화를 하나의 플랫폼에서.<br />
            <span className="font-semibold text-gray-900">KAUS</span>와 함께 팀의 잠재력을 극대화하세요.
          </p>
          
          {!user && (
            <div className="flex items-center justify-center gap-3">
              <Link href="/signup" className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Started →
              </Link>
              <Link href="/login" className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all border border-gray-200 shadow-sm">
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* 주요 기능 - Stripe 스타일 카드 */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          <Link href={user ? "/workspace" : "/login"} className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-all">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Project Management</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              업무 할당, 진행 상황 추적, 팀 협업을 한 곳에서 효율적으로 관리하세요
            </p>
          </Link>

          <Link href={user ? "/metaverse" : "/login"} className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-all">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">2D Metaverse</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              가상 공간에서 팀원들과 실시간으로 소통하고 협업하세요
            </p>
          </Link>

          <Link href={user ? "/metaverse-classic" : "/login"} className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-all">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">KAUS: NEXUS</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              전략적 턴제 시뮬레이션으로 리더십을 발휘하세요
            </p>
          </Link>
        </div>

        {/* 통계 섹션 - Stripe Dashboard 스타일 */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 mb-20 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-3">신뢰할 수 있는 플랫폼</h2>
            <p className="text-lg text-gray-300">전세계 팀들이 선택한 KAUS</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">99.9%</div>
              <div className="text-sm text-gray-400 font-medium">가동률</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">30+</div>
              <div className="text-sm text-gray-400 font-medium">팀 멤버</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">10K+</div>
              <div className="text-sm text-gray-400 font-medium">작업 완료</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400 font-medium">지원</div>
            </div>
          </div>
        </div>

        {/* 팀 섹션 - Linear 스타일 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">모든 팀을 위한 솔루션</h2>
            <p className="text-base text-gray-600">각 팀에 최적화된 도구와 워크플로우</p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { name: '디자인팀', icon: '🎨', link: '/team/design' },
              { name: 'MARD MARD', icon: '🎬', link: '/team/mardmard' },
              { name: '생산팀', icon: '🏭', link: '/team/production' },
              { name: '온라인팀', icon: '💻', link: '/team/online' },
              { name: '오프라인팀', icon: '🏪', link: '/team/offline' },
              { name: '운영지원팀', icon: '⚙️', link: '/team/operations' }
            ].map((team) => (
              <Link 
                key={team.name}
                href={team.link}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 hover:border-gray-300 transition-all"
              >
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-xl shadow-sm">
                  {team.icon}
                </div>
                <span className="font-semibold text-sm text-gray-800">{team.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* NEXUS OS - Vercel 스타일 CTA */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-12 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl opacity-60" />
          
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full mb-5">
              AI-POWERED
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">NEXUS OS</h2>
            <p className="text-lg text-gray-600 mb-8">
              AI 기반 물류 자동화 시스템으로<br />효율성을 극대화하고 비용을 절감하세요
            </p>
            <Link 
              href="/components/Nexus"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* 푸터 - Stripe 스타일 */}
      <footer className="border-t border-gray-200 mt-32 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-white font-black text-xs">K</span>
              </div>
              <span className="text-sm text-gray-600">© 2025 KAUS. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

