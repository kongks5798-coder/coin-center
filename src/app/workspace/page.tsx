"use client"

import { NexusWorkspace } from "@/components/nexus/NexusWorkspace"
import { useRouter } from "next/navigation"

export default function WorkspacePage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return <NexusWorkspace onLogout={handleLogout} />
}
