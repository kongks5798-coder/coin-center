"use client"

import { Target, Globe, Lightbulb, Users } from 'lucide-react'

export function VisionSection() {
  const visions = [
    {
      icon: Target,
      title: "Mission",
      content: "AI 기술로 비즈니스의 경계를 허물고, 모든 산업에 혁신을 가져옵니다.",
    },
    {
      icon: Globe,
      title: "Global Expansion",
      content: "대한민국을 넘어 글로벌 시장을 선도하는 AI 기업으로 성장합니다.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      content: "지속적인 기술 혁신으로 고객에게 최고의 가치를 제공합니다.",
    },
    {
      icon: Users,
      title: "Partnership",
      content: "파트너와 함께 성장하는 상생의 비즈니스 생태계를 구축합니다.",
    },
  ]

  return (
    <section id="vision" className="py-24 lg:py-32 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">Vision & Direction</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              필드나인의 방향성
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              AI로 앞서가는 대한민국의 미래를 만들어갑니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {visions.map((vision, index) => (
              <div
                key={index}
                className="bg-background border border-border p-8 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <vision.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{vision.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{vision.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-background border border-border p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Why FieldNine?</h3>
            <div className="space-y-6 text-muted-foreground">
              <p className="leading-relaxed text-center max-w-3xl mx-auto">
                필드나인은 단순한 기술 회사가 아닙니다. AI와 블록체인 기술을 활용해 여러 사업 영역을 하나의 생태계로
                통합한 대한민국 최초의 종합 비즈니스 플랫폼입니다.
              </p>
              <p className="leading-relaxed text-center max-w-3xl mx-auto">
                KAUS AI는 모든 데이터를 통합 관리하고, KAUS Coin은 모든 거래를 seamless하게 연결합니다. 이를 통해 물류,
                풀필먼트, 브랜드, 패션 등 다양한 산업에서 최고의 효율성과 혁신을 실현합니다.
              </p>
              <p className="leading-relaxed text-center max-w-3xl mx-auto font-semibold text-foreground">
                AI로 앞서가는 대한민국의 필드나인과 함께 미래를 만들어가세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

