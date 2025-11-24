"use client"

import { Zap, ShieldCheck, Box } from "lucide-react"

interface NexusSolutionShowcaseProps {
  onExplore: () => void
}

export function NexusSolutionShowcase({ onExplore }: NexusSolutionShowcaseProps) {
  return (
    <section id="solution" className="py-24 bg-black overflow-hidden relative scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The OS for Fashion</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            구글 워크스페이스처럼 쉽지만, 테슬라처럼 강력합니다. <br />
            디자인 파일 관리부터 물류 추적까지 하나의 솔루션으로 해결하십시오.
          </p>
          <button
            onClick={onExplore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-sm transition-colors inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" /> LAUNCH WORKSPACE
          </button>
        </div>

        <div
          className="relative rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden transform md:hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
          onClick={onExplore}
        >
          <div className="h-12 border-b border-white/10 bg-black/40 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="ml-4 px-3 py-1 rounded bg-white/5 text-[10px] text-slate-400 font-mono flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> nexus.fieldnine.io/workspace
            </div>
          </div>
          <div className="grid grid-cols-12 h-[500px]">
            <div className="col-span-2 border-r border-white/10 bg-black/20 p-4 hidden md:block">
              <div className="space-y-4">
                <div className="h-8 bg-blue-600/20 border border-blue-500/30 rounded flex items-center px-3 text-xs text-blue-400 font-bold">
                  Dashboard
                </div>
                <div className="h-8 text-slate-500 flex items-center px-3 text-xs">Asset Cloud</div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="h-8 text-white flex items-center px-3 text-xs font-bold gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" /> K-Tag Control
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 p-8 bg-gradient-to-br from-slate-900/50 to-black/50">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">2025 S/S Collection</h3>
                  <p className="text-slate-400 text-sm">Last updated by Design Team</p>
                </div>
                <div className="px-4 py-2 bg-white text-black text-xs font-bold rounded">UPLOAD ASSETS</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-video bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between"
                  >
                    <div className="flex justify-between">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                        <Box className="w-4 h-4 text-slate-400" />
                      </div>
                      {i === 1 && (
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30">
                          K-Tag Active
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-slate-700 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

