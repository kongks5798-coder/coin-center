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
    <div className="min-h-screen bg-white">
      {/* 헤더 - Notion 스타일 */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  F9
                </div>
                <span className="text-xl font-semibold text-gray-900">FIELD NINE</span>
              </Link>
              {user && (
                <nav className="hidden md:flex items-center gap-1">
                  <Link href="/workspace" className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    워크스페이스
                  </Link>
                  <Link href="/metaverse" className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    메타버스
                  </Link>
                  <Link href="/components/Nexus" className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    NEXUS OS
                  </Link>
                </nav>
              )}
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/workspace" className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </Link>
              ) : (
                <Link href="/login" className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 - Linear 스타일 */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* 히어로 섹션 */}
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6">
            엔터프라이즈 협업 플랫폼
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            팀워크를 위한<br />올인원 워크스페이스
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            프로젝트 관리부터 메타버스 협업까지,<br />FIELD NINE과 함께 생산성을 높이세요
          </p>
          {!user && (
            <div className="flex items-center justify-center gap-4">
              <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                무료로 시작하기 →
              </Link>
              <Link href="/login" className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-300">
                로그인
              </Link>
            </div>
          )}
        </div>

        {/* 주요 기능 - Slack 스타일 */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Link href={user ? "/workspace" : "/login"} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">프로젝트 관리</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              업무 할당, 진행 상황 추적, 팀 협업을 한 곳에서 관리하세요
            </p>
          </Link>

          <Link href={user ? "/metaverse" : "/login"} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
              <svg className="w-6 h-6 text-cyan-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">메타버스 협업</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              가상 공간에서 팀원들과 실시간으로 소통하고 협업하세요
            </p>
          </Link>

          <Link href={user ? "/components/Nexus" : "/login"} className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <svg className="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">NEXUS OS</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI 기반 물류 자동화로 효율성을 극대화하세요
            </p>
          </Link>
        </div>

        {/* 팀 섹션 */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">모든 팀을 위한 솔루션</h2>
            <p className="text-gray-600">각 팀에 최적화된 도구와 워크플로우를 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: '디자인팀', icon: '🎨', link: '/team/design', color: 'from-pink-500 to-purple-500' },
              { name: 'MARD MARD', icon: '🎬', link: '/team/mardmard', color: 'from-purple-500 to-indigo-500' },
              { name: '생산팀', icon: '🏭', link: '/team/production', color: 'from-blue-500 to-cyan-500' },
              { name: '온라인팀', icon: '💻', link: '/team/online', color: 'from-cyan-500 to-teal-500' },
              { name: '오프라인팀', icon: '🏪', link: '/team/offline', color: 'from-teal-500 to-green-500' },
              { name: '운영지원팀', icon: '⚙️', link: '/team/operations', color: 'from-gray-600 to-gray-700' }
            ].map((team) => (
              <Link 
                key={team.name}
                href={team.link}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${team.color} flex items-center justify-center text-xl`}>
                  {team.icon}
                </div>
                <span className="font-medium text-gray-900">{team.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-gray-200 mt-20 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                F9
              </div>
              <span className="text-sm text-gray-600">© 2025 FIELD NINE. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-gray-900">이용약관</Link>
              <Link href="/contact" className="hover:text-gray-900">문의하기</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

