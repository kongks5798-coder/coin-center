"use client"

import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"

interface NexusHeroProps {
  onExplore: () => void
}

export function NexusHero({ onExplore }: NexusHeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.2),_transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.15),_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full w-full opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-slate-800 h-full"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          OPERATING SYSTEM FOR FASHION
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8"
        >
          We Digitize <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Physical Movement.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Nexus The Field Nine은 단순한 물류가 아닙니다. <br className="hidden md:block" />
          AI 데이터베이스와 로지스틱스가 결합된, 패션 비즈니스의 심장입니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group rounded-sm"
          >
            EXPLORE SOLUTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2 backdrop-blur-sm rounded-sm">
            <Play className="w-4 h-4" />
            WATCH VISION
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] text-white tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  )
}

