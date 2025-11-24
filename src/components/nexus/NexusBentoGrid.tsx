"use client"

import { Box, Cpu, Layers } from "lucide-react"

export function NexusBentoGrid() {
  return (
    <section id="ecosystem" className="py-24 bg-slate-950 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Nexus Ecosystem
          </h2>
          <p className="text-slate-400">
            물류, 데이터, 브랜드가 하나로 연결되는 초격차 인프라.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">
          <div className="h-[400px] md:h-auto md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 text-white">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Smart Fulfillment Hub</h3>
              <p className="text-slate-300 max-w-md text-sm leading-relaxed">
                5,000평 규모의 자동화 허브. 자율주행 로봇(AMR)과 AI 비전 스캐닝을 통해 입고부터 출고까지 99.9%의 정확도를 보장합니다.
              </p>
            </div>
          </div>

          <div className="h-[300px] md:h-auto relative group overflow-hidden rounded-2xl bg-slate-900 border border-white/5 p-8 flex flex-col justify-between hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Cpu className="w-32 h-32 text-purple-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                AI Data Center
              </h3>
              <p className="text-slate-400 text-sm">
                패션 트렌드 분석 및 재고 예측 알고리즘. <br />
                데이터가 비즈니스의 방향을 제시합니다.
              </p>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-purple-500 h-full w-[70%] animate-[width_2s_ease-in-out_infinite]"></div>
            </div>
          </div>

          <div className="h-[300px] md:h-auto relative group overflow-hidden rounded-2xl bg-slate-900 border border-white/5 p-8 hover:border-blue-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900/20"></div>
            <div className="relative z-10">
              <Layers className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Brand Acceleration</h3>
              <p className="text-slate-400 text-sm">
                신진 브랜드 인큐베이팅 및 글로벌 진출 지원. <br />
                단순 물류 대행을 넘어 브랜드의 성장을 함께합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

