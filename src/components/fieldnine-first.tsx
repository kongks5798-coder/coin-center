"use client"

import { CheckCircle2, Rocket, Shield, Zap, Users, TrendingUp } from 'lucide-react'

export function FieldNineFirst() {
  const benefits = [
    {
      icon: Rocket,
      title: "실전 검증",
      description: "Field Nine의 모든 사업에서 먼저 사용하여 검증된 솔루션만 제공합니다"
    },
    {
      icon: Shield,
      title: "완벽한 안정성",
      description: "수백만 건의 거래와 데이터를 처리하며 검증된 안정성"
    },
    {
      icon: Zap,
      title: "최적화된 성능",
      description: "실제 운영 환경에서 최적화된 성능과 속도"
    },
    {
      icon: Users,
      title: "사용자 중심",
      description: "Field Nine 직원들의 피드백을 반영한 직관적인 인터페이스"
    },
    {
      icon: TrendingUp,
      title: "지속적 개선",
      description: "실제 사용 데이터를 기반으로 지속적으로 개선되는 솔루션"
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Field Nine First</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Field Nine에서 먼저 사용합니다
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            KAUS 솔루션은 복잡한 기술을 숨기고 최상의 경험만 제공합니다. 
            Field Nine의 모든 사업에서 먼저 검증된 솔루션을 경험해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 rounded-xl hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">30+</div>
              <div className="text-sm text-muted-foreground">Field Nine 직원</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">1.2M+</div>
              <div className="text-sm text-muted-foreground">기록된 문서</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">시스템 가동률</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">실시간 운영</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
