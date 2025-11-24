"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import { FieldNinePresentation } from "./fieldnine-presentation"

export function HeroSection() {
  const [showPresentation, setShowPresentation] = useState(false)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="text-sm md:text-base font-medium text-accent mb-4 tracking-wider uppercase">
          Nexus The FieldNine
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 text-balance">
          AI로 앞서가는
          <br />
          <span className="text-accent">대한민국의 미래</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty">
          AI 물류 풀필먼트부터 브랜드, 패션까지. KAUS AI와 KAUS Coin으로 연결된 혁신적인 비즈니스 생태계
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium px-8 py-6 h-auto"
            onClick={() => {
              const element = document.getElementById("ecosystem")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            aria-label="Explore our business ecosystem"
          >
            Explore Ecosystem
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 text-base font-medium px-8 py-6 h-auto bg-transparent"
            onClick={() => setShowPresentation(true)}
            aria-label="Watch FieldNine presentation"
          >
            Watch Presentation
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>

      {showPresentation && (
        <FieldNinePresentation onClose={() => setShowPresentation(false)} />
      )}
    </section>
  )
}

