"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import CommandPalette from "./CommandPalette"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                FIELDNINE<span className="text-accent ml-1 sm:ml-2 text-xs sm:text-sm font-normal">넥서스 더 필드나인</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link
                href="#ecosystem"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Ecosystem
              </Link>
              <Link
                href="#technology"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                KAUS Technology
              </Link>
              <Link
                href="#business"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Business
              </Link>
              <Link
                href="#vision"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Vision
              </Link>
              <Link
                href="/workspace"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Workspace
              </Link>
              <Link
                href="/nexus"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                NEXUS OS
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Command Palette Trigger - Desktop */}
              <button
                onClick={() => {
                  // Trigger command palette via keyboard event
                  const event = new KeyboardEvent('keydown', {
                    key: 'k',
                    metaKey: true,
                    bubbles: true
                  });
                  window.dispatchEvent(event);
                }}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent/10 transition-colors"
                title="Command Palette (Cmd+K)"
              >
                <kbd className="hidden lg:inline px-2 py-1 text-xs bg-background border border-border rounded">⌘K</kbd>
                <span className="lg:hidden">🔍</span>
              </button>

              <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 lg:px-6">
                Contact Us
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link
                href="#ecosystem"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ecosystem
              </Link>
              <Link
                href="#technology"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                KAUS Technology
              </Link>
              <Link
                href="#business"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Business
              </Link>
              <Link
                href="#vision"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vision
              </Link>
              <Link
                href="/workspace"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Workspace
              </Link>
              <Link
                href="/nexus"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                NEXUS OS
              </Link>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium mt-4" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>
      <CommandPalette />
    </>
  )
}

