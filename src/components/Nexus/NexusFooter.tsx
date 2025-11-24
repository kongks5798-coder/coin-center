"use client"

import { ShieldCheck } from "lucide-react"

export function NexusFooter() {
  return (
    <footer id="company" className="bg-black border-t border-white/10 py-16 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-bold text-xs rounded-sm">
              N
            </div>
            <span className="text-white font-bold tracking-widest">NEXUS</span>
          </div>
          <p className="text-slate-500 text-sm max-w-xs mb-6">
            NEXUS The Field Nine <br />
            Redefining the physics of fashion logistics.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Business</h4>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-white cursor-pointer">Logistics</li>
              <li className="hover:text-white cursor-pointer">AI Center</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Solution</h4>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-white cursor-pointer">Nexus Workspace</li>
              <li className="hover:text-white cursor-pointer">K-Tag™</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-500">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                IP Protection
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
        <div>
          <p>© 2025 NEXUS The Field Nine. All rights reserved.</p>
          <p className="mt-2 text-slate-700 max-w-lg">
            K-Tag™ and the K-Tag logo are trademarks of NEXUS The Field Nine. Technology protected by
            international patents pending (PCT). Unauthorized use strictly prohibited.
          </p>
        </div>
        <p>Seoul, Republic of Korea</p>
      </div>
    </footer>
  )
}

