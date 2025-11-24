"use client"

import { ShoppingCart, Warehouse, Box, ArrowRight, CheckCircle } from 'lucide-react'

export function FulfillmentIntegration() {
  const integrationFlow = [
    {
      icon: ShoppingCart,
      title: "주문 접수",
      description: "온라인 쇼핑몰에서 주문이 들어옵니다",
      color: "text-blue-400",
    },
    {
      icon: ArrowRight,
      title: "→",
      description: "",
      color: "text-accent",
    },
    {
      icon: Warehouse,
      title: "재고 확인",
      description: "KAUS AI가 실시간 재고를 확인합니다",
      color: "text-green-400",
    },
    {
      icon: ArrowRight,
      title: "→",
      description: "",
      color: "text-accent",
    },
    {
      icon: Box,
      title: "자동 포장",
      description: "로봇이 최적 포장을 자동으로 수행합니다",
      color: "text-purple-400",
    },
    {
      icon: ArrowRight,
      title: "→",
      description: "",
      color: "text-accent",
    },
    {
      icon: CheckCircle,
      title: "배송 시작",
      description: "배송 파트너에게 자동 전달됩니다",
      color: "text-yellow-400",
    },
  ]

  const benefits = [
    {
      title: "당일 배송",
      description: "주문 접수 후 24시간 내 배송 완료",
      stat: "99.5%",
    },
    {
      title: "자동화율",
      description: "전체 프로세스의 자동화 비율",
      stat: "95%",
    },
    {
      title: "오류율",
      description: "인적 오류로 인한 문제 발생률",
      stat: "0.1%",
    },
  ]

  return (
    <section id="fulfillment" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">Fulfillment Integration</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            통합 풀필먼트 솔루션
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            주문부터 배송까지 모든 과정이 자동으로 연결됩니다
          </p>
        </div>

        {/* Integration Flow Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {integrationFlow.map((step, index) => {
            const Icon = step.icon
            const isArrow = step.title === "→"
            
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center ${
                  isArrow ? "hidden md:flex" : ""
                }`}
              >
                {!isArrow ? (
                  <div className="bg-card border border-border p-6 rounded-lg w-full hover:border-accent/50 transition-all duration-300 group">
                    <div className={`w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors`}>
                      <Icon className={`w-6 h-6 ${step.color || "text-accent"}`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                  </div>
                ) : (
                  <Icon className={`w-8 h-8 ${step.color} rotate-90 md:rotate-0`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card border border-border p-8 rounded-lg text-center hover:border-accent/50 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-foreground mb-3">{benefit.stat}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className="mt-16 bg-card border border-border p-8 lg:p-12 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            풀필먼트 통합의 핵심 가치
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">실시간 재고 관리</div>
                  <div className="text-sm text-muted-foreground">
                    RFID와 AI를 통해 재고를 실시간으로 추적하고 관리합니다
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">자동 주문 처리</div>
                  <div className="text-sm text-muted-foreground">
                    주문이 들어오면 자동으로 재고 확인, 포장, 배송이 시작됩니다
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">최적화된 배송</div>
                  <div className="text-sm text-muted-foreground">
                    AI가 배송 경로와 시간을 최적화하여 비용과 시간을 절감합니다
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground mb-1">완전한 투명성</div>
                  <div className="text-sm text-muted-foreground">
                    고객은 주문부터 배송까지 모든 과정을 실시간으로 확인할 수 있습니다
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

