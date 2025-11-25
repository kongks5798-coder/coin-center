"use client"

import { useRouter } from "next/navigation"
import { NexusWorkspace } from "@/components/Nexus/NexusWorkspace"

export default function WorkspacePage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return <NexusWorkspace onLogout={handleLogout} />
}
