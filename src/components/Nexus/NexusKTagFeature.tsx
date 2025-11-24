"use client"

import { ShieldCheck } from "lucide-react"

export function NexusKTagFeature() {
  return (
    <section id="k-tag" className="py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-blue-500 font-bold tracking-widest text-sm">PROPRIETARY TECHNOLOGY</div>
            <div className="px-2 py-0.5 border border-slate-700 rounded text-[10px] text-slate-400 font-mono">
              PATENT PENDING: PCT/KR2025/009xxx
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">K-Tag™</h2>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            물리적 제품과 디지털 데이터의 경계를 지웁니다. <br />
            단 한 번의 터치로 이력 추적, 정품 인증, 그리고 재고 자산화까지.
          </p>
          <ul className="space-y-6">
            {[
              { title: 'Military-Grade Encryption', desc: 'AES-256 암호화 및 비가시 워터마킹 기술 적용' },
              { title: 'Blockchain Immutability', desc: '위변조가 불가능한 분산 원장 기술(DLT) 기반' },
              { title: 'Global IP Protection', desc: '국제 특허(PCT) 출원을 통한 전 세계적 법적 보호' },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-900/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-full bg-gradient-to-tr from-blue-900/20 to-purple-900/20 border border-white/10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-t border-b border-blue-500/50 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-l border-r border-purple-500/50 -rotate-45"></div>
            </div>
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
            <div className="w-48 h-48 bg-black border border-blue-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)] z-10 backdrop-blur-md relative">
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-sm border border-blue-400">
                SECURE
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-1">K</div>
                <div className="text-[10px] tracking-[0.3em] text-blue-500">TAG SERIES</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

