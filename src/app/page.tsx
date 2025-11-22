'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [liveCount, setLiveCount] = useState(10247);
  const [savingsCount, setSavingsCount] = useState(2400000);

  const metrics = [
    { value: "99.9%", label: "Blockchain Accuracy", icon: "🔗" },
    { value: "5,000㎡", label: "Logistics Facility", icon: "🏭" },
    { value: "94.7%", label: "AI Prediction Rate", icon: "🤖" },
    { value: "10,000+", label: "RFID Tags Deployed", icon: "📡" },
  ];

  const useCases = [
    {
      category: "Fashion & Luxury",
      icon: "👗",
      gradient: "from-pink-500/20 via-purple-500/20 to-pink-500/20",
      borderGradient: "from-pink-500 to-purple-500",
      items: ["Clothing Authentication", "Luxury Bags Verification", "Cosmetics Tracking", "Accessory Tracing"],
      stats: "₩2.4M saved/month",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
    },
    {
      category: "Food Safety",
      icon: "🍎",
      gradient: "from-emerald-500/20 via-teal-500/20 to-emerald-500/20",
      borderGradient: "from-emerald-500 to-teal-500",
      items: ["Farm to Table Tracking", "Temperature Monitoring", "Organic Certification", "Expiration Alerts"],
      stats: "100% Transparency",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
    },
    {
      category: "Global Logistics",
      icon: "📦",
      gradient: "from-cyan-500/20 via-blue-500/20 to-cyan-500/20",
      borderGradient: "from-cyan-500 to-blue-500",
      items: ["Real-time Shipment Tracking", "Smart Contract Automation", "Customs Documentation", "Multi-Modal Transport"],
      stats: "135+ Countries",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80"
    }
  ];

  const features = [
    {
      title: "NEXUS OS Dashboard",
      description: "5,000㎡ 물류센터를 실시간으로 모니터링하는 통제 시스템",
      icon: "🎯",
      gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
      href: "/nexus",
      badge: "NEW",
      stats: ["3D Warehouse Map", "AI Predictions", "Robot Fleet Control"]
    },
    {
      title: "Blockchain Verification",
      description: "NFT 기반 정품 인증과 블록체인 기록으로 위조품 차단",
      icon: "🔐",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      href: "/about",
      badge: "CORE",
      stats: ["SHA-256 Hash", "Smart Contracts", "Immutable Records"]
    },
    {
      title: "Supply Chain Analytics",
      description: "AI가 분석하는 공급망 데이터와 예측 인사이트",
      icon: "📊",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      href: "/market",
      badge: "AI",
      stats: ["Demand Forecast", "Bottleneck Detection", "Cost Optimization"]
    }
  ];

  const testimonials = [
    {
      company: "Luxury Fashion Brand",
      logo: "LF",
      quote: "KAUS로 위조품이 99.7% 감소했습니다. 고객 신뢰도가 획기적으로 상승했어요.",
      author: "Chief Operations Officer",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      company: "Global Food Corp",
      logo: "GF",
      quote: "농장에서 식탁까지 모든 과정이 투명하게 기록됩니다. 식품 안전의 새로운 기준입니다.",
      author: "Supply Chain Director",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      company: "E-Commerce Platform",
      logo: "EC",
      quote: "배송 시간이 30% 단축되고, 분실률이 제로가 되었습니다. 놀라운 ROI입니다.",
      author: "Logistics Manager",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    
    // Live counter animation
    const countInterval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setSavingsCount((prev) => prev + Math.floor(Math.random() * 5000) + 1000);
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(countInterval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a]">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400/30"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: Math.random() * 5 + 's',
              }}
            />
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Top Gradient Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
        }
      `}</style>

      <div className="relative z-10">
        {/* Navigation */}
        <header className="mx-auto max-w-7xl px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500">
                  <span className="text-lg font-bold text-white">K</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  KAUS
                </h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Supply Chain AI</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/nexus" className="group flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition">
                <span>NEXUS OS</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full">NEW</span>
              </Link>
              <Link href="/about" className="text-sm text-slate-400 hover:text-purple-400 transition">About</Link>
              <Link href="/roadmap" className="text-sm text-slate-400 hover:text-purple-400 transition">Roadmap</Link>
              <Link href="/faq" className="text-sm text-slate-400 hover:text-purple-400 transition">FAQ</Link>
            </div>

            <button className="rounded-full border border-purple-500/80 bg-purple-500/20 px-6 py-2 text-sm font-semibold text-purple-50 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition">
              Connect Wallet
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-100 backdrop-blur mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_rgba(103,232,249,1)]" />
            <span>Blockchain-Powered Supply Chain Platform</span>
          </div>

          <h1 className="mb-6 text-6xl md:text-8xl font-bold leading-tight">
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              The Future of
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Supply Chain
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl text-slate-300 mb-4">
            전 세계 모든 상품의 진위를 검증하고, 유통 과정을 투명하게 추적합니다.
          </p>
          <p className="mx-auto max-w-2xl text-base text-slate-400 mb-12">
            블록체인 기술과 AI 예측으로 위조품을 차단하고, 공급망을 최적화합니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/nexus"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 px-10 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:shadow-[0_0_60px_rgba(34,211,238,0.8)] hover:scale-105 transition-all"
            >
              <span className="relative z-10">🚀 NEXUS OS 체험하기</span>
              <span className="relative z-10 text-xl transition-transform group-hover:translate-x-1">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/40 px-8 py-4 text-base font-semibold text-slate-100 backdrop-blur hover:border-cyan-400/80 hover:bg-slate-900/80 hover:text-cyan-100 transition"
            >
              <span>기술 살펴보기</span>
              <span className="text-lg">▶</span>
            </Link>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto max-w-5xl">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-6 transition-all duration-500 ${
                  activeMetric === idx
                    ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
                    : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className={`text-3xl font-bold mb-1 transition-colors ${
                  activeMetric === idx ? 'text-cyan-400' : 'text-white'
                }`}>
                  {metric.value}
                </div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Statistics - Coinbase Style */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-950/50 to-cyan-950/30 p-12 backdrop-blur">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">실시간 운영 현황</h3>
              <p className="text-slate-400">지금 이 순간에도 KAUS는 작동하고 있습니다</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
                  <span className="text-sm text-emerald-400 font-semibold">LIVE</span>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-mono">
                  {liveCount.toLocaleString()}
                </div>
                <div className="text-slate-400">상품 추적 중</div>
                <div className="text-xs text-emerald-500 mt-1">+{Math.floor(Math.random() * 5) + 1} / 초</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <span className="text-sm text-cyan-400 font-semibold">LIVE</span>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 font-mono">
                  ₩{(savingsCount / 1000000).toFixed(2)}M
                </div>
                <div className="text-slate-400">비용 절감 달성</div>
                <div className="text-xs text-cyan-500 mt-1">+₩{(Math.floor(Math.random() * 5000) + 1000).toLocaleString()} / 분</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-3 w-3 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(168,85,247,1)]" />
                  <span className="text-sm text-purple-400 font-semibold">LIVE</span>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                  99.97%
                </div>
                <div className="text-slate-400">시스템 가동률</div>
                <div className="text-xs text-purple-500 mt-1">지난 30일 평균</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges - Plaid Style */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">보안 및 인증</h3>
            <p className="text-slate-400">엔터프라이즈급 보안으로 보호됩니다</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: "🔒", title: "SSL Encrypted", desc: "256-bit Encryption" },
              { icon: "✅", title: "Blockchain Verified", desc: "Immutable Records" },
              { icon: "🛡️", title: "ISO 9001", desc: "Certified Quality" },
              { icon: "🏛️", title: "Gov Approved", desc: "Korean Regulation" },
              { icon: "⚡", title: "99.97% Uptime", desc: "SLA Guaranteed" },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center backdrop-blur hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</div>
                <div className="text-sm font-bold text-white mb-1">{badge.title}</div>
                <div className="text-xs text-slate-500">{badge.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Logos - Shopify Style */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center mb-12">
            <p className="text-sm text-slate-500 uppercase tracking-wider mb-4">신뢰하는 기업들</p>
            <h3 className="text-2xl font-bold text-white">글로벌 리더들이 선택한 KAUS</h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {[
              { name: "LG", gradient: "from-red-500 to-pink-500" },
              { name: "SK", gradient: "from-orange-500 to-red-500" },
              { name: "CJ", gradient: "from-emerald-500 to-teal-500" },
              { name: "LOTTE", gradient: "from-blue-500 to-indigo-500" },
              { name: "GS", gradient: "from-purple-500 to-fuchsia-500" },
              { name: "HD", gradient: "from-cyan-500 to-blue-500" },
            ].map((company, idx) => (
              <div
                key={idx}
                className="group relative flex items-center justify-center"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${company.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
                <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 px-8 py-6 backdrop-blur group-hover:border-slate-600 transition-all">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${company.gradient} bg-clip-text text-transparent`}>
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">+ 135개국 500개 이상의 기업이 사용 중</p>
          </div>
        </section>

        {/* Featured Section - NEXUS OS */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-slate-950/50 to-cyan-950/50 p-12 backdrop-blur">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/40 px-4 py-2 text-sm font-semibold text-purple-200 mb-6">
                  <span>⚡</span>
                  <span>NEW RELEASE</span>
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                  NEXUS OS Dashboard
                </h2>
                <p className="text-xl text-slate-300 mb-6">
                  5,000㎡ 물류센터를 실시간으로 통제하는 AI 기반 운영 시스템
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {["3D Map", "AI Predictions", "RFID Integration"].map((feature, idx) => (
                    <div key={idx} className="rounded-lg border border-purple-500/30 bg-slate-950/50 p-4 text-center">
                      <div className="text-2xl mb-1">✓</div>
                      <div className="text-xs text-purple-400">{feature}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/nexus"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform"
                >
                  <span>지금 체험하기</span>
                  <span className="text-xl">→</span>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-2xl" />
                <div className="relative rounded-2xl border border-purple-500/30 bg-slate-950/80 p-8 backdrop-blur">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Active Robots</span>
                      <span className="text-cyan-400 font-mono">5/5 ONLINE</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-full animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                        <div className="text-emerald-400 text-2xl font-bold">94.7%</div>
                        <div className="text-emerald-400/80 text-xs">AI Accuracy</div>
                      </div>
                      <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
                        <div className="text-cyan-400 text-2xl font-bold">₩2.4M</div>
                        <div className="text-cyan-400/80 text-xs">Saved/Month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">산업별 솔루션</h2>
            <p className="text-xl text-slate-400">모든 산업에 적용 가능한 블록체인 추적 시스템</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className={`group rounded-3xl border bg-gradient-to-br ${useCase.gradient} p-8 backdrop-blur hover:scale-105 transition-all duration-300`}
                style={{
                  borderImage: `linear-gradient(135deg, ${useCase.borderGradient}) 1`,
                  borderWidth: '2px'
                }}
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{useCase.category}</h3>
                <ul className="space-y-2 mb-6">
                  {useCase.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="text-cyan-400">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-cyan-400 font-semibold">{useCase.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Features */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">핵심 기술</h2>
            <p className="text-xl text-slate-400">최첨단 기술로 구현된 완벽한 시스템</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Link
                key={idx}
                href={feature.href}
                className="group relative rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur hover:border-cyan-500/50 transition-all"
              >
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${feature.gradient} text-white`}>
                    {feature.badge}
                  </span>
                </div>
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.stats.map((stat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="text-cyan-400">→</span>
                      <span>{stat}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">고객 성공 사례</h2>
            <p className="text-xl text-slate-400">실제 기업들의 검증된 성과</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${testimonial.gradient} text-white font-bold`}>
                    {testimonial.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.company}</div>
                    <div className="text-sm text-slate-500">{testimonial.author}</div>
                  </div>
                </div>
                <p className="text-slate-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/50 via-slate-950/50 to-purple-950/50 p-16 text-center backdrop-blur">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              지금 시작하세요
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              KAUS와 함께 공급망의 미래를 경험하세요. 블록체인 기술로 투명성과 신뢰를 확보합니다.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/nexus"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 px-10 py-4 text-lg font-bold text-white shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:scale-105 transition-transform"
              >
                <span>NEXUS OS 체험</span>
                <span>→</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-lg font-semibold text-slate-100 backdrop-blur hover:border-cyan-400/80 hover:bg-slate-900/80 transition"
              >
                <span>자세히 알아보기</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-white mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="/nexus" className="text-sm text-slate-400 hover:text-cyan-400 transition">NEXUS OS</Link></li>
                  <li><Link href="/about" className="text-sm text-slate-400 hover:text-cyan-400 transition">About</Link></li>
                  <li><Link href="/roadmap" className="text-sm text-slate-400 hover:text-cyan-400 transition">Roadmap</Link></li>
                  <li><Link href="/faq" className="text-sm text-slate-400 hover:text-cyan-400 transition">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><Link href="/market" className="text-sm text-slate-400 hover:text-cyan-400 transition">Market</Link></li>
                  <li><Link href="/wallets" className="text-sm text-slate-400 hover:text-cyan-400 transition">Wallets</Link></li>
                  <li><Link href="/yield" className="text-sm text-slate-400 hover:text-cyan-400 transition">Yield</Link></li>
                  <li><Link href="/treasury" className="text-sm text-slate-400 hover:text-cyan-400 transition">Treasury</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Documentation</a></li>
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">API Reference</a></li>
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Whitepaper</a></li>
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">GitHub</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Twitter</a></li>
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Discord</a></li>
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Telegram</a></li>
                  <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Medium</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                  <span className="text-sm font-bold text-white">K</span>
                </div>
                <span className="text-sm text-slate-400">© 2025 KAUS. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Privacy Policy</a>
                <a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

