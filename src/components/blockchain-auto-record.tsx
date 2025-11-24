"use client"

import { Shield, FileText, Clock, Search, CheckCircle2, Lock, Database, Zap } from 'lucide-react'
import { useState } from "react"

export function BlockchainAutoRecord() {
  const [selectedFeature, setSelectedFeature] = useState(0)

  const features = [
    {
      icon: FileText,
      title: "자동 문서 기록",
      description: "모든 내부 문서, 계약서, 보고서가 블록체인에 자동 기록됩니다",
      details: [
        "계약서 자동 해시 생성",
        "수정 이력 완벽 추적",
        "위조 불가능한 증명"
      ]
    },
    {
      icon: Database,
      title: "데이터베이스 동기화",
      description: "Field Nine의 모든 데이터베이스가 블록체인과 실시간 동기화됩니다",
      details: [
        "실시간 데이터 검증",
        "변경사항 즉시 기록",
        "데이터 무결성 보장"
      ]
    },
    {
      icon: Search,
      title: "업무 시 즉시 활용",
      description: "블록체인에 기록된 모든 자료를 업무 중 언제든지 검색하고 활용할 수 있습니다",
      details: [
        "빠른 검색 및 조회",
        "검증된 데이터만 표시",
        "신뢰할 수 있는 정보"
      ]
    },
    {
      icon: Lock,
      title: "완벽한 보안",
      description: "블록체인의 불변성과 암호화로 모든 자료를 안전하게 보호합니다",
      details: [
        "암호화된 저장",
        "접근 권한 관리",
        "감사 추적 가능"
      ]
    }
  ]

  return (
    <section id="blockchain-record" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Blockchain Auto-Record</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            모든 자료가 블록체인에
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              자동으로 기록됩니다
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Field Nine의 내외부 모든 자료는 블록체인에 자동 기록되어 
            업무를 볼 때 언제든지 검색하고 활용할 수 있습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedFeature === index
                    ? 'border-blue-500/50 bg-blue-500/5 shadow-lg'
                    : 'border-border bg-card hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedFeature === index
                      ? 'bg-blue-500/20'
                      : 'bg-muted'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      selectedFeature === index ? 'text-blue-400' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      selectedFeature === index ? 'text-foreground' : 'text-foreground/80'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    {selectedFeature === index && (
                      <ul className="space-y-2 mt-4">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right - Visual Demo */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">블록체인 기록 시스템</div>
                    <div className="text-sm text-muted-foreground">실시간 동기화 중</div>
                  </div>
                </div>

                {/* Record Timeline */}
                <div className="space-y-4">
                  {[
                    { time: "방금 전", action: "계약서 #2024-001 기록 완료", hash: "0x7a3f..." },
                    { time: "2분 전", action: "재고 데이터 동기화", hash: "0x9b2e..." },
                    { time: "5분 전", action: "보고서 자동 기록", hash: "0x4c8d..." },
                    { time: "10분 전", action: "거래 내역 검증 완료", hash: "0x1f5a..." },
                  ].map((record, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{record.action}</span>
                          <span className="text-xs text-muted-foreground">{record.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-muted-foreground" />
                          <code className="text-xs text-muted-foreground font-mono">{record.hash}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">1.2M+</div>
                    <div className="text-xs text-muted-foreground mt-1">기록된 문서</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">99.9%</div>
                    <div className="text-xs text-muted-foreground mt-1">가동률</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">&lt;1초</div>
                    <div className="text-xs text-muted-foreground mt-1">검색 속도</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Field Nine에서 먼저 검증된 블록체인 자동 기록 시스템을 경험해보세요
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-accent" />
            <span>모든 자료가 자동으로 기록되고 검증됩니다</span>
          </div>
        </div>
      </div>
    </section>
  )
}
