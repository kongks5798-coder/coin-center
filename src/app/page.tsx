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
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-zinc-900 relative overflow-hidden">
      {/* 베이스 그리드 패턴 */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm40 40h1v1h-1v-1zm0-40h1v1h-1V0zm40 40h1v1h-1v-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* 육각형 패턴 레이어 */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3 25v50L50 100 6.7 75V25z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />

      {/* 빛 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-neutral-950/80 pointer-events-none" />
      
      {/* 측면 비네팅 */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60 pointer-events-none" />

      {/* 헤더 */}
      <header className="border-b border-white/[0.08] bg-neutral-900/60 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl relative">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-gradient-to-br from-neutral-100 via-neutral-300 to-neutral-400 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-neutral-100/20 transition-all">
                  <span className="text-neutral-900 font-black text-xl">F9</span>
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-300 bg-clip-text text-transparent tracking-tight">
                  FIELD NINE
                </span>
              </Link>
              {user && (
                <nav className="hidden md:flex items-center gap-2">
                  <Link href="/workspace" className="px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all">
                    Workspace
                  </Link>
                  <Link href="/metaverse" className="px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all">
                    Metaverse
                  </Link>
                  <Link href="/components/Nexus" className="px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all">
                    NEXUS OS
                  </Link>
                </nav>
              )}
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/workspace" className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.06] rounded-xl transition-all group">
                  <div className="w-9 h-9 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-full flex items-center justify-center text-neutral-900 text-sm font-bold shadow-lg">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-semibold text-neutral-200 group-hover:text-white">{user.name}</span>
                </Link>
              ) : (
                <Link href="/login" className="px-7 py-3 bg-gradient-to-r from-neutral-100 to-neutral-300 text-neutral-900 text-sm font-bold rounded-xl hover:shadow-2xl hover:shadow-neutral-100/10 transition-all">
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full mb-10 backdrop-blur-xl">
            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse shadow-lg shadow-neutral-400/50" />
            <span className="text-sm font-bold text-neutral-400 tracking-wide">ENTERPRISE COLLABORATION PLATFORM</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tighter">
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent drop-shadow-2xl">
              Premium Workspace
            </span>
            <br />
            <span className="text-neutral-500 text-6xl md:text-7xl font-bold">for Modern Teams</span>
          </h1>
          
          <p className="text-2xl text-neutral-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
            프로젝트 관리, 메타버스 협업, AI 자동화를 하나의 플랫폼에서.<br />
            <span className="text-neutral-300">FIELD NINE</span>과 함께 팀의 잠재력을 극대화하세요.
          </p>
          
          {!user && (
            <div className="flex items-center justify-center gap-5">
              <Link href="/signup" className="px-10 py-5 bg-gradient-to-r from-white to-neutral-200 text-neutral-900 font-black text-lg rounded-xl hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:-translate-y-1">
                Get Started →
              </Link>
              <Link href="/login" className="px-10 py-5 bg-white/[0.05] text-white font-bold text-lg rounded-xl hover:bg-white/[0.08] transition-all border border-white/[0.1] backdrop-blur-xl">
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* 주요 기능 카드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-32">
          <Link href={user ? "/workspace" : "/login"} className="group relative bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-10 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-white/[0.03] transition-all duration-500 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neutral-100/[0.03] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-300 to-neutral-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:shadow-neutral-300/20 transition-all">
                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Project Management</h3>
              <p className="text-neutral-400 leading-relaxed font-medium">
                업무 할당, 진행 상황 추적, 팀 협업을 한 곳에서 효율적으로 관리하세요
              </p>
            </div>
          </Link>

          <Link href={user ? "/metaverse" : "/login"} className="group relative bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-10 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-white/[0.03] transition-all duration-500 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neutral-200/[0.03] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:shadow-neutral-400/20 transition-all">
                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">2D Metaverse</h3>
              <p className="text-neutral-400 leading-relaxed font-medium">
                가상 공간에서 팀원들과 실시간으로 소통하고 협업하세요
              </p>
            </div>
          </Link>

          <Link href={user ? "/metaverse-classic" : "/login"} className="group relative bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-10 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-white/[0.03] transition-all duration-500 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neutral-300/[0.03] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-500 to-neutral-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:shadow-neutral-500/20 transition-all">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">KAUS: NEXUS</h3>
              <p className="text-neutral-400 leading-relaxed font-medium">
                전략적 턴제 시뮬레이션으로 리더십을 발휘하세요
              </p>
            </div>
          </Link>
        </div>

        {/* 팀 섹션 */}
        <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-14 shadow-2xl mb-32">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-black text-white mb-5 tracking-tight">모든 팀을 위한 솔루션</h2>
            <p className="text-xl text-neutral-400 font-medium">각 팀에 최적화된 도구와 워크플로우를 제공합니다</p>
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
                className="group flex items-center gap-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xl">
                  {team.icon}
                </div>
                <span className="font-bold text-lg text-neutral-200 group-hover:text-white">{team.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* NEXUS OS 섹션 */}
        <div className="relative bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 rounded-3xl p-16 overflow-hidden shadow-2xl shadow-neutral-100/10">
          {/* 다이아몬드 패턴 */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' transform='scale(0.5)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900/10 border border-neutral-900/10 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-sm font-black text-neutral-900 tracking-wide">AI-POWERED AUTOMATION</span>
            </div>
            <h2 className="text-5xl font-black mb-6 text-neutral-900 tracking-tight">NEXUS OS</h2>
            <p className="text-2xl text-neutral-800 mb-10 font-semibold leading-relaxed">
              AI 기반 물류 자동화 시스템으로<br />효율성을 극대화하고 비용을 절감하세요
            </p>
            <Link 
              href="/components/Nexus"
              className="inline-block px-10 py-5 bg-neutral-900 text-white font-black text-lg rounded-xl hover:bg-neutral-800 transition-all shadow-2xl hover:shadow-neutral-900/50"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-white/[0.06] mt-40 py-14 bg-neutral-900/40 backdrop-blur-2xl relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-gradient-to-br from-neutral-200 to-neutral-400 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-neutral-900 font-black text-base">F9</span>
              </div>
              <span className="text-sm text-neutral-500 font-medium">© 2025 FIELD NINE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-10 text-sm text-neutral-500 font-semibold">
              <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-neutral-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

