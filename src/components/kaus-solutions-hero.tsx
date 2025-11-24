"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Database, Lock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import Link from "next/link"

export function KausSolutionsHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  
  const features = [
    {
      icon: Shield,
      title: "블록체인 자동 기록",
      description: "모든 내외부 자료가 블록체인에 자동 기록되어 업무 시 즉시 활용 가능",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "실시간 AI 분석",
      description: "KAUS AI가 모든 데이터를 실시간 분석하여 최적의 인사이트 제공",
      color: "text-purple-400"
    },
    {
      icon: Database,
      title: "통합 데이터 플랫폼",
      description: "Field Nine의 모든 사업이 하나의 플랫폼에서 연결되어 운영",
      color: "text-cyan-400"
    },
    {
      icon: Lock,
      title: "완벽한 보안",
      description: "블록체인 기반의 불변성과 암호화로 모든 데이터 보호",
      color: "text-green-400"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card/30">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Field Nine에서 먼저 검증된 솔루션</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
              KAUS 솔루션
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-cyan-400">
                최상의 솔루션을 제공합니다
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 text-pretty">
              Field Nine은 KAUS Coin의 기술력으로 무엇이든 만들어낼 수 있지만, 
              그 복잡한 기술은 숨기고 <strong className="text-foreground">최상의 솔루션만</strong> 제공합니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium px-8 py-6 h-auto group"
                asChild
              >
                <Link href="/workspace">
                  Field Nine 체험하기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 text-base font-medium px-8 py-6 h-auto bg-transparent"
                asChild
              >
                <Link href="#solutions">
                  솔루션 알아보기
                </Link>
              </Button>
            </div>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">실전 검증</div>
                  <div className="text-xs text-muted-foreground">Field Nine에서 먼저 사용</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">블록체인 기록</div>
                  <div className="text-xs text-muted-foreground">자동 기록 및 검증</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Feature Showcase */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px]">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentFeature
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="h-full bg-card/50 border border-border rounded-2xl p-8 flex flex-col justify-center backdrop-blur-sm">
                    <div className={`w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
              
              {/* Feature Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentFeature
                        ? 'w-8 bg-accent'
                        : 'w-2 bg-muted-foreground/50'
                    }`}
                    aria-label={`Feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
