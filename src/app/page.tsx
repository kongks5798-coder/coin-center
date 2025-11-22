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
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-100 to-zinc-100 relative overflow-hidden">
      {/* Premium Light Gray Theme */}
      {/* 미세 점 패턴 */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23404040' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* 라인 그리드 패턴 */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 100 0 L 0 100' stroke='%23808080' stroke-width='0.5' fill='none'/%3E%3Cpath d='M 0 0 L 100 100' stroke='%23808080' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      {/* 부드러운 빛 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-stone-200/30 pointer-events-none" />

      {/* 헤더 */}
      <header className="border-b border-stone-300/40 bg-white/50 backdrop-blur-xl sticky top-0 z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-gradient-to-br from-stone-700 via-stone-600 to-stone-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-stone-400/30 transition-all">
                  <span className="text-white font-black text-xl">F9</span>
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600 bg-clip-text text-transparent tracking-tight">
                  FIELD NINE
                </span>
              </Link>
              {user && (
                <nav className="hidden md:flex items-center gap-2">
                  <Link href="/workspace" className="px-5 py-2.5 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-all">
                    Workspace
                  </Link>
                  <Link href="/metaverse" className="px-5 py-2.5 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-all">
                    Metaverse
                  </Link>
                  <Link href="/components/Nexus" className="px-5 py-2.5 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-all">
                    NEXUS OS
                  </Link>
                </nav>
              )}
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/workspace" className="flex items-center gap-3 px-5 py-2.5 hover:bg-stone-200/40 rounded-xl transition-all group">
                  <div className="w-9 h-9 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-semibold text-stone-800 group-hover:text-stone-900">{user.name}</span>
                </Link>
              ) : (
                <Link href="/login" className="px-7 py-3 bg-gradient-to-r from-stone-800 to-stone-700 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-stone-400/20 transition-all">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-24 relative">
        {/* 히어로 섹션 */}
        <div className="text-center mb-32">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800/5 border border-stone-400/20 rounded-full mb-10 backdrop-blur-sm shadow-sm">
            <div className="w-2 h-2 bg-stone-600 rounded-full animate-pulse shadow-md shadow-stone-600/50" />
            <span className="text-sm font-bold text-stone-700 tracking-wide">ENTERPRISE COLLABORATION PLATFORM</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tighter">
            <span className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-700 bg-clip-text text-transparent">
              Premium Workspace
            </span>
            <br />
            <span className="text-stone-500 text-6xl md:text-7xl font-bold">for Modern Teams</span>
          </h1>
          
          <p className="text-2xl text-stone-600 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
            프로젝트 관리, 메타버스 협업, AI 자동화를 하나의 플랫폼에서.<br />
            <span className="text-stone-800 font-semibold">FIELD NINE</span>과 함께 팀의 잠재력을 극대화하세요.
          </p>
          
          {!user && (
            <div className="flex items-center justify-center gap-5">
              <Link href="/signup" className="px-10 py-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white font-black text-lg rounded-xl hover:shadow-xl hover:shadow-stone-400/30 transition-all transform hover:-translate-y-0.5">
                Get Started →
              </Link>
              <Link href="/login" className="px-10 py-5 bg-white/60 text-stone-900 font-bold text-lg rounded-xl hover:bg-white/80 transition-all border border-stone-300/50 backdrop-blur-sm shadow-sm">
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* 주요 기능 카드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          <Link href={user ? "/workspace" : "/login"} className="group relative bg-white/60 backdrop-blur-sm border border-stone-300/40 rounded-2xl p-10 hover:bg-white/80 hover:border-stone-400/50 hover:shadow-xl hover:shadow-stone-300/20 transition-all duration-300 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-stone-200/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-stone-700 to-stone-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:shadow-stone-400/40 transition-all">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-4 tracking-tight">Project Management</h3>
              <p className="text-stone-600 leading-relaxed font-medium">
                업무 할당, 진행 상황 추적, 팀 협업을 한 곳에서 효율적으로 관리하세요
              </p>
            </div>
          </Link>

          <Link href={user ? "/metaverse" : "/login"} className="group relative bg-white/60 backdrop-blur-sm border border-stone-300/40 rounded-2xl p-10 hover:bg-white/80 hover:border-stone-400/50 hover:shadow-xl hover:shadow-stone-300/20 transition-all duration-300 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-stone-300/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-stone-600 to-stone-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:shadow-stone-400/40 transition-all">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-4 tracking-tight">2D Metaverse</h3>
              <p className="text-stone-600 leading-relaxed font-medium">
                가상 공간에서 팀원들과 실시간으로 소통하고 협업하세요
              </p>
            </div>
          </Link>

          <Link href={user ? "/metaverse-classic" : "/login"} className="group relative bg-white/60 backdrop-blur-sm border border-stone-300/40 rounded-2xl p-10 hover:bg-white/80 hover:border-stone-400/50 hover:shadow-xl hover:shadow-stone-300/20 transition-all duration-300 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-stone-400/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-stone-500 to-stone-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:shadow-stone-400/40 transition-all">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-4 tracking-tight">KAUS: NEXUS</h3>
              <p className="text-stone-600 leading-relaxed font-medium">
                전략적 턴제 시뮬레이션으로 리더십을 발휘하세요
              </p>
            </div>
          </Link>
        </div>

        {/* 팀 섹션 */}
        <div className="bg-white/50 backdrop-blur-sm border border-stone-300/40 rounded-3xl p-14 shadow-lg mb-32">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black text-stone-900 mb-5 tracking-tight">모든 팀을 위한 솔루션</h2>
            <p className="text-xl text-stone-600 font-medium">각 팀에 최적화된 도구와 워크플로우를 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                className="group flex items-center gap-5 bg-white/60 backdrop-blur-sm border border-stone-300/40 rounded-2xl p-6 hover:bg-white/80 hover:border-stone-400/50 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-stone-200 to-stone-300 rounded-xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-md">
                  {team.icon}
                </div>
                <span className="font-bold text-lg text-stone-800 group-hover:text-stone-900">{team.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* NEXUS OS 섹션 */}
        <div className="relative bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600 rounded-3xl p-16 overflow-hidden shadow-xl">
          {/* 라인 패턴 */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M0 0L80 80M80 0L0 80'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
          
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-sm font-black text-white tracking-wide">AI-POWERED AUTOMATION</span>
            </div>
            <h2 className="text-5xl font-black mb-6 text-white tracking-tight">NEXUS OS</h2>
            <p className="text-2xl text-stone-200 mb-10 font-semibold leading-relaxed">
              AI 기반 물류 자동화 시스템으로<br />효율성을 극대화하고 비용을 절감하세요
            </p>
            <Link 
              href="/components/Nexus"
              className="inline-block px-10 py-5 bg-white text-stone-900 font-black text-lg rounded-xl hover:bg-stone-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-stone-300/40 mt-40 py-14 bg-white/40 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-gradient-to-br from-stone-700 to-stone-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-base">F9</span>
              </div>
              <span className="text-sm text-stone-600 font-medium">© 2025 FIELD NINE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-10 text-sm text-stone-600 font-semibold">
              <Link href="/privacy" className="hover:text-stone-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-stone-900 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-stone-900 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

