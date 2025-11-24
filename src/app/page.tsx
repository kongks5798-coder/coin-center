"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NexusNav } from "@/components/nexus/NexusNav"
import { NexusHero } from "@/components/nexus/NexusHero"
import { NexusBentoGrid } from "@/components/nexus/NexusBentoGrid"
import { NexusSolutionShowcase } from "@/components/nexus/NexusSolutionShowcase"
import { NexusKTagFeature } from "@/components/nexus/NexusKTagFeature"
import { NexusFooter } from "@/components/nexus/NexusFooter"

export default function Home() {
  const router = useRouter()
  const [view, setView] = useState<'landing' | 'workspace'>('landing')

  const handleExplore = () => {
    router.push('/workspace')
  }

  const handleLogin = () => {
    router.push('/workspace')
  }

  return (
    <div className="bg-black min-h-screen text-slate-200 selection:bg-blue-500/30 font-sans">
      <NexusNav onLogin={handleLogin} />
      <NexusHero onExplore={handleExplore} />
      <NexusBentoGrid />
      <NexusSolutionShowcase onExplore={handleExplore} />
      <NexusKTagFeature />
      <NexusFooter />
    </div>
  )
}
