"use client"

import { Brain, Database, Shield, Zap, Network, LineChart, Eye, Lock } from 'lucide-react'

export function KausTechnology() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Engine",
      description: "딥러닝 기반 예측 분석 및 자동화 시스템",
    },
    {
      icon: Database,
      title: "Unified Data Platform",
      description: "전사 데이터 통합 관리 및 실시간 동기화",
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "블록체인 기반 보안 및 데이터 무결성 보장",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "밀리초 단위 실시간 데이터 처리 및 응답",
    },
    {
      icon: Network,
      title: "Distributed System",
      description: "글로벌 분산 아키텍처로 안정성 극대화",
    },
    {
      icon: LineChart,
      title: "Predictive Analytics",
      description: "AI 기반 비즈니스 예측 및 최적화",
    },
  ]

  return (
    <section id="solutions" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <Eye className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">KAUS Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            기술은 숨기고
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-cyan-400">
              최상의 솔루션만 제공합니다
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Field Nine은 KAUS Coin의 기술력으로 무엇이든 만들어낼 수 있지만, 
            복잡한 기술은 숨기고 사용자에게는 최상의 경험만 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Core Philosophy */}
        <div className="bg-gradient-to-br from-card/50 to-background border border-border rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-accent" />
                <h3 className="text-3xl font-bold text-foreground">복잡한 기술, 단순한 경험</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed text-lg">
                  KAUS 솔루션은 블록체인, AI, 분산 시스템 등 최첨단 기술로 구축되었지만, 
                  사용자에게는 그 복잡함을 전혀 느끼지 못하게 합니다.
                </p>
                <p className="leading-relaxed">
                  Field Nine에서 먼저 검증된 안정성과 성능을 바탕으로, 
                  직관적이고 강력한 솔루션만 제공합니다.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">자동화된 모든 프로세스</div>
                  <div className="text-sm text-muted-foreground">복잡한 설정 없이 바로 사용 가능</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">실전 검증된 안정성</div>
                  <div className="text-sm text-muted-foreground">Field Nine에서 수백만 건 처리 검증</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">블록체인 자동 기록</div>
                  <div className="text-sm text-muted-foreground">모든 자료가 자동으로 기록되고 검증</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

