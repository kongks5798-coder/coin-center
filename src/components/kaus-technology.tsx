"use client"

import { Brain, Database, Shield, Zap, Network, LineChart } from 'lucide-react'

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
      title: "Enterprise Security",
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
    <section id="technology" className="py-24 lg:py-32 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">KAUS Technology</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            차세대 AI 플랫폼
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            KAUS AI와 KAUS Coin이 만들어내는 혁신적인 기술 생태계
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background border border-border p-8 hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technology Highlights */}
        <div className="mt-20 bg-background border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Enterprise-Grade Infrastructure</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  KAUS 기술 스택은 전 세계 최고 수준의 엔터프라이즈 인프라를 기반으로 구축되었습니다.
                </p>
                <p className="leading-relaxed">
                  AI 기반 자동화, 실시간 데이터 처리, 블록체인 보안이 통합된 플랫폼으로 비즈니스의 모든 영역에서 최적의
                  성능을 제공합니다.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">Scalable Architecture</div>
                  <div className="text-sm text-muted-foreground">무제한 확장 가능한 클라우드 네이티브 설계</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">AI-First Approach</div>
                  <div className="text-sm text-muted-foreground">모든 프로세스에 AI를 우선 적용하는 설계 철학</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">Blockchain Integration</div>
                  <div className="text-sm text-muted-foreground">투명하고 안전한 블록체인 기반 거래 시스템</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

