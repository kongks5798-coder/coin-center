'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userDept, setUserDept] = useState('');

  // 로그인 상태 확인
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('fieldnine-user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserName(user.name);
        setUserDept(user.department);
      }
    }
  }, []);

  // 실시간 시계
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickLinks = [
    {
      title: "🎮 3D 메타버스",
      icon: "🌐",
      description: "Ready Player Me 가상세계",
      href: isLoggedIn ? "/metaverse" : "/login",
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
      badge: "3D",
      featured: true
    },
    {
      title: "🏰 조조전 메타버스",
      icon: "⚔️",
      description: "삼국지 턴제 전략 게임",
      href: isLoggedIn ? "/metaverse-classic" : "/login",
      gradient: "from-amber-600 via-orange-600 to-red-600",
      badge: "RETRO",
      featured: true
    },
    {
      title: "워크스페이스",
      icon: "👨‍💼",
      description: "업무 관리 및 협업",
      href: isLoggedIn ? "/workspace" : "/login",
      gradient: "from-purple-600 to-fuchsia-600",
      badge: "WORK"
    },
    {
      title: "디자인팀",
      icon: "🎨",
      description: "브랜드 디자인 & UI/UX",
      href: "/team/design",
      gradient: "from-purple-600 to-pink-600",
      badge: "DESIGN"
    },
    {
      title: "MARD MARD",
      icon: "🎬",
      description: "크리에이티브 컨텐츠",
      href: "/team/mardmard",
      gradient: "from-pink-600 to-rose-600",
      badge: "CREATIVE"
    },
    {
      title: "생산팀",
      icon: "🏭",
      description: "NEXUS OS & 물류 자동화",
      href: "/team/production",
      gradient: "from-blue-600 to-cyan-600",
      badge: "PRODUCTION"
    },
    {
      title: "온라인팀",
      icon: "💻",
      description: "이커머스 & 디지털 마케팅",
      href: "/team/online",
      gradient: "from-cyan-600 to-teal-600",
      badge: "ONLINE"
    },
    {
      title: "오프라인팀",
      icon: "🏪",
      description: "매장 운영 & 고객 서비스",
      href: "/team/offline",
      gradient: "from-fuchsia-600 to-purple-600",
      badge: "OFFLINE"
    },
    {
      title: "운영지원팀",
      icon: "⚙️",
      description: "시스템 & IT 인프라",
      href: "/team/operations",
      gradient: "from-emerald-600 to-green-600",
      badge: "OPS"
    },
    {
      title: "NEXUS OS",
      icon: "🤖",
      description: "물류 자동화 시스템",
      href: "/components/Nexus",
      gradient: "from-orange-600 to-red-600",
      badge: "BLOCKCHAIN"
    }
  ];

  const stats = [
    { label: "활성 프로젝트", value: "42", icon: "📁", color: "text-purple-400" },
    { label: "진행 중 작업", value: "127", icon: "⚡", color: "text-cyan-400" },
    { label: "팀 멤버", value: "18", icon: "👥", color: "text-fuchsia-400" },
    { label: "완료율", value: "94.7%", icon: "✅", color: "text-green-400" }
  ];

  const recentActivity = [
    { user: "김필드", action: "NEXUS 3D 맵 성능 최적화 완료", time: "5분 전", dept: "FILLUMINATE" },
    { user: "이크리에이티브", action: "MARD MARD 브랜드 가이드 검토 요청", time: "12분 전", dept: "MARD MARD" },
    { user: "최데브옵스", action: "fieldnine.io 도메인 연결 작업", time: "23분 전", dept: "Infrastructure" },
    { user: "박나인", action: "2025 Q4 전략 회의 일정 등록", time: "1시간 전", dept: "Management" }
  ];

  return (
    <div className="min-h-screen bg-[#02010a] text-white">
      {/* 헤더 */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                FIELD NINE
              </div>
              <div className="hidden md:block text-sm text-white/40 border-l border-white/20 pl-4">
                미래를 설계하는 혁신 플랫폼
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-white/60">
                {currentTime.toLocaleString('ko-KR', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              {isLoggedIn ? (
                <Link
                  href="/workspace"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                >
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-white/40">{userDept}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 환영 섹션 */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {isLoggedIn ? (
              <>
                안녕하세요, <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{userName}</span>님
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  FIELD NINE
                </span>
                <br />Employee Portal
              </>
            )}
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            {isLoggedIn 
              ? `${userDept} 부서 대시보드에 오신 것을 환영합니다` 
              : '데이터 • 크리에이티브 • 블록체인을 하나로'}
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 메타버스 하이라이트 */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 border-2 border-cyan-500/50 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 text-[200px] opacity-5">🎮</div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-black animate-pulse">
                  🔥 NEW!
                </span>
                <span className="text-sm text-cyan-400 font-bold">2가지 메타버스 선택!</span>
              </div>
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🎮 메타버스 입장
              </h2>
              <p className="text-xl text-white/80 mb-6 max-w-2xl">
                <span className="font-bold text-cyan-400">3D 사이버 월드</span> 또는
                <span className="font-bold text-amber-400"> 삼국지 조조전</span> 중 선택하세요!
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* 3D 메타버스 */}
                <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-2 border-cyan-500/50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🌐</span>
                    <div>
                      <div className="text-xl font-bold text-white">3D 메타버스</div>
                      <div className="text-sm text-cyan-300">AAA 게임급 그래픽</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">✨ 실사 아바타</span>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">⚡ AAA 그래픽</span>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">🌐 사이버 월드</span>
                  </div>
                  <Link
                    href={isLoggedIn ? "/metaverse" : "/login"}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-center hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all"
                  >
                    🚀 3D 입장하기
                  </Link>
                </div>

                {/* 조조전 메타버스 */}
                <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-2 border-amber-500/50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">⚔️</span>
                    <div>
                      <div className="text-xl font-bold text-white">조조전 메타버스</div>
                      <div className="text-sm text-amber-300">삼국지 턴제 전략</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">🏰 삼국지 배경</span>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">🎯 턴제 전투</span>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">📊 스탯 시스템</span>
                  </div>
                  <Link
                    href={isLoggedIn ? "/metaverse-classic" : "/login"}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl font-bold text-center hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105 transition-all"
                  >
                    🏰 조조전 입장하기
                  </Link>
                </div>
              </div>
              {!isLoggedIn && (
                <p className="mt-3 text-sm text-white/40 text-center">
                  💡 로그인이 필요합니다
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">팀 선택</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {quickLinks.filter(link => !link.featured).map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{link.badge}</span>
                </div>
                <div className="text-5xl mb-4">{link.icon}</div>
                <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`}>
                  {link.title}
                </h3>
                <p className="text-sm text-white/60">{link.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/40 group-hover:text-cyan-400 transition-colors">
                  <span>시작하기</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">최근 활동</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                    {activity.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-xs text-white/40">• {activity.dept}</span>
                    </div>
                    <p className="text-sm text-white/80 mb-1">{activity.action}</p>
                    <span className="text-xs text-white/40">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 공지사항 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">공지사항</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">중요</span>
                  <span className="text-sm font-medium">fieldnine.io 도메인 오픈</span>
                </div>
                <p className="text-sm text-white/60 mb-2">
                  공식 도메인 fieldnine.io가 오픈되었습니다. DNS 전파 중입니다.
                </p>
                <span className="text-xs text-white/40">2시간 전</span>
              </div>

              <div className="pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">업데이트</span>
                  <span className="text-sm font-medium">워크스페이스 시스템 런칭</span>
                </div>
                <p className="text-sm text-white/60 mb-2">
                  직원 업무 관리 시스템이 정식 오픈되었습니다. 로그인 후 사용 가능합니다.
                </p>
                <span className="text-xs text-white/40">5시간 전</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">안내</span>
                  <span className="text-sm font-medium">NEXUS OS 업그레이드 완료</span>
                </div>
                <p className="text-sm text-white/60 mb-2">
                  3D 맵, AI 예측, RFID 통합 시스템이 업그레이드되었습니다.
                </p>
                <span className="text-xs text-white/40">1일 전</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-cyan-600/20 border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            FIELD NINE과 함께 성장하세요
          </h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            데이터, 크리에이티브, 블록체인 기술로<br />
            비즈니스의 새로운 차원을 여세요
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all"
                >
                  🚀 지금 시작하기
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white/5 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  더 알아보기
                </Link>
              </>
            ) : (
              <Link
                href="/workspace"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all"
              >
                👨‍💼 워크스페이스로 이동
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                FIELD NINE
              </div>
              <p className="text-sm text-white/60">
                미래를 설계하는 혁신 플랫폼
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">제품</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/filluminate" className="hover:text-white transition-colors">FILLUMINATE</Link></li>
                <li><Link href="/mardmard" className="hover:text-white transition-colors">MARD MARD</Link></li>
                <li><Link href="/nexus" className="hover:text-white transition-colors">NEXUS</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">회사</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/about" className="hover:text-white transition-colors">소개</Link></li>
                <li><Link href="/workspace" className="hover:text-white transition-colors">워크스페이스</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">문의</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">연락처</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>fieldnine.io</li>
                <li>contact@fieldnine.io</li>
                <li>Seoul, South Korea</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © 2025 FIELD NINE. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 떠다니는 입자 효과 */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="fixed w-1 h-1 bg-cyan-400/30 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-15px, -40px); }
          75% { transform: translate(-25px, -15px); }
        }
      `}</style>
    </div>
  );
}

