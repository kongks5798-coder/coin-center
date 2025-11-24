"use client"

import { useState } from "react"
import { Truck, Package, Store, Shirt, TrendingUp, Boxes, Brain, Coins, Database } from 'lucide-react'
import { BusinessPresentation } from "./presentations/BusinessPresentation"
import { businessPresentations } from "@/lib/business-data"

export function BusinessDivisions() {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const divisions = [
    {
      id: "ai-logistics",
      icon: Truck,
      title: "AI 물류 플랫폼",
      subtitle: "Smart Logistics",
      description: "AI 기반 물류 최적화 및 자동화 시스템으로 효율성을 극대화합니다.",
      highlights: ["실시간 경로 최적화", "예측 수요 관리", "자동화 창고 시스템"],
    },
    {
      id: "fulfillment",
      icon: Package,
      title: "풀필먼트 서비스",
      subtitle: "Fulfillment Solutions",
      description: "통합 풀필먼트 솔루션으로 e-커머스 비즈니스를 완벽하게 지원합니다.",
      highlights: ["주문 처리 자동화", "재고 관리 시스템", "당일 배송 서비스"],
    },
    {
      id: "brand",
      icon: Store,
      title: "브랜드 사업",
      subtitle: "Brand Development",
      description: "데이터 기반 브랜드 전략으로 시장을 선도하는 브랜드를 만듭니다.",
      highlights: ["브랜드 컨설팅", "마케팅 자동화", "고객 데이터 분석"],
    },
    {
      id: "fashion",
      icon: Shirt,
      title: "패션 사업",
      subtitle: "Fashion Business",
      description: "AI 트렌드 분석과 빠른 생산 시스템으로 패션 시장을 리드합니다.",
      highlights: ["트렌드 예측 AI", "빠른 상품화", "온오프라인 통합"],
    },
    {
      id: "kaus-ai",
      icon: Brain,
      title: "KAUS AI",
      subtitle: "Business Intelligence",
      description: "KAUS AI로 모든 비즈니스 데이터를 분석하고 인사이트를 제공합니다.",
      highlights: ["실시간 대시보드", "예측 분석", "맞춤형 리포트"],
    },
    {
      id: "kaus-coin",
      icon: Coins,
      title: "KAUS Coin",
      subtitle: "Blockchain Payment",
      description: "모든 사업부가 KAUS Coin으로 연결된 통합 비즈니스 플랫폼입니다.",
      highlights: ["단일 결제 시스템", "데이터 통합", "크로스 비즈니스"],
    },
  ]

  const handleDivisionClick = (id: string) => {
    setSelectedBusiness(id)
  }

  const selectedPresentation = selectedBusiness
    ? businessPresentations.find((b) => b.id === selectedBusiness)
    : null

  return (
    <section id="business" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">Business Divisions</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            다양한 사업 영역
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            물류부터 패션까지, AI 기술로 연결된 통합 비즈니스 생태계
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <button
              key={index}
              onClick={() => handleDivisionClick(division.id)}
              className="bg-card border border-border p-8 hover:border-accent/50 transition-all duration-300 group text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              aria-label={`Learn more about ${division.title}`}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <division.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="text-xs font-medium text-accent mb-2 tracking-wider uppercase">{division.subtitle}</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{division.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{division.description}</p>
              <ul className="space-y-2">
                {division.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      {selectedPresentation && (
        <BusinessPresentation
          onClose={() => setSelectedBusiness(null)}
          business={selectedPresentation}
        />
      )}
    </section>
  )
}

