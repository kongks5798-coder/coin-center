"use client"

import { useState } from "react"
import { Package, Radio, Database, Truck, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FieldNinePresentation } from "./fieldnine-presentation"

export function RFIDLogisticsSystem() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [showPresentation, setShowPresentation] = useState(false)

  const processSteps = [
    {
      icon: Package,
      title: "상품 입고",
      description: "RFID 태그가 부착된 상품이 자동으로 인식됩니다",
      details: "입고 시점부터 모든 상품이 실시간으로 추적됩니다",
    },
    {
      icon: Radio,
      title: "RFID 스캔",
      description: "무선 주파수로 일괄 스캔하여 재고를 자동으로 업데이트합니다",
      details: "수천 개의 상품을 몇 초 만에 스캔할 수 있습니다",
    },
    {
      icon: Database,
      title: "데이터 동기화",
      description: "모든 정보가 KAUS AI 시스템과 실시간으로 동기화됩니다",
      details: "블록체인 기반으로 데이터 무결성이 보장됩니다",
    },
    {
      icon: Truck,
      title: "자동 출고",
      description: "주문이 들어오면 최적 경로로 자동 배송이 시작됩니다",
      details: "AI가 배송 경로와 시간을 최적화합니다",
    },
    {
      icon: CheckCircle2,
      title: "배송 완료",
      description: "고객에게 도착하면 자동으로 상태가 업데이트됩니다",
      details: "전체 프로세스가 투명하게 추적 가능합니다",
    },
  ]

  return (
    <>
      <section id="rfid" className="py-24 lg:py-32 bg-card/30 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-medium text-accent mb-4 tracking-wider uppercase">RFID Logistics System</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              차세대 RFID 물류 시스템
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              무선 주파수 기술로 물류 프로세스를 완전히 자동화합니다
            </p>
          </div>

          {/* Process Flow */}
          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isSelected = selectedStep === index
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedStep(isSelected ? null : index)}
                  className={`bg-background border-2 p-6 rounded-lg transition-all duration-300 text-left ${
                    isSelected
                      ? "border-accent shadow-lg shadow-accent/20 scale-105"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-xs font-medium text-accent mb-2">Step {index + 1}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  {isSelected && (
                    <p className="text-xs text-accent/80 leading-relaxed">{step.details}</p>
                  )}
                </button>
              )
            })}
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-background border border-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-foreground mb-3">실시간 추적</h3>
              <p className="text-muted-foreground">
                모든 상품의 위치와 상태를 실시간으로 모니터링할 수 있습니다
              </p>
            </div>
            <div className="bg-background border border-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-foreground mb-3">자동화</h3>
              <p className="text-muted-foreground">
                수동 작업을 최소화하고 인적 오류를 제거합니다
              </p>
            </div>
            <div className="bg-background border border-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-foreground mb-3">투명성</h3>
              <p className="text-muted-foreground">
                블록체인 기반으로 모든 데이터가 검증 가능합니다
              </p>
            </div>
          </div>

          {/* Presentation Button */}
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowPresentation(true)}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium px-8 py-6 h-auto"
            >
              Full Presentation
            </Button>
          </div>
        </div>
      </section>

      {showPresentation && (
        <FieldNinePresentation onClose={() => setShowPresentation(false)} />
      )}
    </>
  )
}

