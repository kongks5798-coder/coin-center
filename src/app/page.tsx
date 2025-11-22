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
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900">
                  <span className="text-sm font-bold text-white">K</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold leading-none text-gray-900">KAUS</span>
                  <span className="text-[9px] font-medium uppercase tracking-wider text-gray-500">Field Nine</span>
                </div>
              </Link>
              {user && (
                <nav className="hidden items-center gap-1 md:flex">
                  <Link href="/workspace" className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900">
                    Workspace
                  </Link>
                  <Link href="/metaverse" className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900">
                    Metaverse
                  </Link>
                  <Link href="/components/Nexus" className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900">
                    NEXUS OS
                  </Link>
                </nav>
              )}
            </div>
            <div>
              {user ? (
                <Link href="/workspace" className="flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors hover:bg-gray-100">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[10px] font-semibold text-white">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </Link>
              ) : (
                <Link href="/login" className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 */}
      <main className="pt-16">
        {/* 히어로 */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white px-6 pb-24 pt-32 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-900">
                <svg className="h-1.5 w-1.5 fill-gray-900" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" /></svg>
                Enterprise collaboration platform
              </div>
              
              <h1 className="mb-6 text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
                Build and deploy
                <br />
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">on the AI Cloud</span>
              </h1>
              
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
                프로젝트 관리, 메타버스 협업, AI 자동화를 하나의 플랫폼에서.
                <br className="hidden sm:inline" />
                KAUS와 함께 팀의 잠재력을 극대화하세요.
              </p>
              
              {!user && (
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/signup" className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800">
                    Start building
                  </Link>
                  <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50">
                    Contact sales
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 기능 섹션 */}
        <section className="border-b border-gray-200 bg-gray-50 px-6 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Your product, delivered
              </h2>
              <p className="text-lg text-gray-600">
                Security, speed, and AI included
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Link href={user ? "/workspace" : "/login"} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  Project Management
                </h3>
                <p className="text-sm leading-6 text-gray-600">
                  업무 할당, 진행 상황 추적, 팀 협업을 한 곳에서 효율적으로 관리하세요
                </p>
              </Link>

              <Link href={user ? "/metaverse" : "/login"} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  2D Metaverse
                </h3>
                <p className="text-sm leading-6 text-gray-600">
                  가상 공간에서 팀원들과 실시간으로 소통하고 협업하세요
                </p>
              </Link>

              <Link href={user ? "/metaverse-classic" : "/login"} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  KAUS: NEXUS
                </h3>
                <p className="text-sm leading-6 text-gray-600">
                  전략적 턴제 시뮬레이션으로 리더십을 발휘하세요
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* 통계 */}
        <section className="border-b border-gray-200 bg-white px-6 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
                The backbone for global commerce
              </h2>
            </div>
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-5xl font-bold tracking-tight text-gray-900">99.9%</dt>
                <dd className="text-sm text-gray-600">historical uptime</dd>
              </div>
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-5xl font-bold tracking-tight text-gray-900">30+</dt>
                <dd className="text-sm text-gray-600">team members</dd>
              </div>
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-5xl font-bold tracking-tight text-gray-900">10K+</dt>
                <dd className="text-sm text-gray-600">tasks completed</dd>
              </div>
              <div className="flex flex-col items-center">
                <dt className="mb-2 text-5xl font-bold tracking-tight text-gray-900">24/7</dt>
                <dd className="text-sm text-gray-600">support</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 팀 */}
        <section className="border-b border-gray-200 bg-gray-50 px-6 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
                모든 팀을 위한 솔루션
              </h2>
              <p className="text-base text-gray-600">
                각 팀에 최적화된 도구와 워크플로우
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-gray-300 hover:shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-xl">
                    {team.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{team.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEXUS CTA */}
        <section className="bg-white px-6 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
              AI-POWERED AUTOMATION
            </div>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">
              NEXUS OS
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              AI 기반 물류 자동화 시스템으로 효율성을 극대화하고 비용을 절감하세요
            </p>
            <Link 
              href="/components/Nexus"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-gray-900 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800"
            >
              Learn more
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-gray-200 bg-white px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900">
                <span className="text-[10px] font-bold text-white">K</span>
              </div>
              <span className="text-sm text-gray-600">© 2025 KAUS. All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

