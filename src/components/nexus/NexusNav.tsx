"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronRight, LogOut } from "lucide-react"
import Link from "next/link"

interface NexusNavProps {
  onLogin: () => void
}

export function NexusNav({ onLogin }: NexusNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'The Solution', href: '#solution' },
    { name: 'K-Tag', href: '#k-tag' },
    { name: 'Company', href: '#company' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-lg rounded-sm">
              N
            </div>
            <span className="text-white font-bold tracking-widest text-lg">NEXUS</span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLogin}
              className="px-6 py-2 bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors rounded-sm"
            >
              Partner Login
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-bold text-white">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 pb-4"
              >
                {link.name}
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </a>
            ))}
            <button
              onClick={() => {
                onLogin()
                setMobileMenuOpen(false)
              }}
              className="mt-4 w-full py-4 bg-white text-black text-lg font-bold rounded-sm"
            >
              Partner Login
            </button>
          </div>
        </div>
      )}
    </>
  )
}

