'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#02010a] text-white">
      {/* 헤더 */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            FIELD NINE
          </div>
          <Link href="/login" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            로그인
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* 타이틀 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            FIELD NINE
          </h1>
          <p className="text-2xl text-white/60">
            메타버스 • 워크스페이스 • 블록체인
          </p>
        </div>

        {/* 메타버스 카드 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 3D 메타버스 */}
          <Link href="/login" className="block bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-2 border-cyan-500/50 rounded-2xl p-8 hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🌐</div>
            <h2 className="text-3xl font-bold mb-3">3D 메타버스</h2>
            <p className="text-white/60 mb-4">Ready Player Me 아바타로 사이버 월드를 탐험하세요</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full">AAA 그래픽</span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full">실사 아바타</span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full">3D</span>
            </div>
          </Link>

          {/* 조조전 메타버스 */}
          <Link href="/login" className="block bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-2 border-amber-500/50 rounded-2xl p-8 hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">⚔️</div>
            <h2 className="text-3xl font-bold mb-3">조조전 메타버스</h2>
            <p className="text-white/60 mb-4">삼국지 영웅이 되어 천하를 통일하세요</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full">턴제 전략</span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full">삼국지</span>
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full">레트로</span>
            </div>
          </Link>
        </div>

        {/* 기타 링크 */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/login" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-4xl mb-3">👨‍💼</div>
            <h3 className="text-xl font-bold mb-2">워크스페이스</h3>
            <p className="text-sm text-white/60">업무 관리 및 협업</p>
          </Link>

          <Link href="/team/design" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold mb-2">디자인팀</h3>
            <p className="text-sm text-white/60">브랜드 & UI/UX</p>
          </Link>

          <Link href="/components/Nexus" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-bold mb-2">NEXUS OS</h3>
            <p className="text-sm text-white/60">물류 자동화</p>
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-white/10 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-white/40">
          © 2025 FIELD NINE. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

