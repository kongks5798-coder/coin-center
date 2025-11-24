"use client"

import { Sparkles, Coins } from 'lucide-react'

export function BusinessEcosystem() {
  const stats = [
    { number: "99.9%", label: "System Uptime" },
    { number: "1M+", label: "Daily Transactions" },
    { number: "500+", label: "Enterprise Partners" },
    { number: "24/7", label: "AI Support" },
  ]

  return (
    <section id="ecosystem" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">Business Ecosystem</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            통합 비즈니스 생태계
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            AI 기술과 블록체인이 만나 만들어내는 차세대 비즈니스 플랫폼
          </p>
        </div>

        {/* Core Technologies */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-card border border-border p-8 lg:p-12 hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">KAUS AI</h3>
            </div>
            <p className="text-muted-foreground text-lg mb-4">필드나인 내외부 데이터를 통합 관리하는 인공지능 시스템</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>실시간 데이터 분석 및 인사이트 제공</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>자동화된 의사결정 지원 시스템</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>통합 비즈니스 인텔리전스 플랫폼</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border p-8 lg:p-12 hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center">
                <Coins className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">KAUS Coin</h3>
            </div>
            <p className="text-muted-foreground text-lg mb-4">필드나인 생태계의 통합 결제 시스템</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>모든 사업부 간 seamless 거래</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>블록체인 기반 투명한 트랜잭션</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>리워드 및 인센티브 프로그램</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border pt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

