"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center space-x-2" aria-label="FieldNine Home">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              FIELDNINE<span className="text-accent ml-2 text-sm font-normal">넥서스 더 필드나인</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8" role="menubar">
            <Link
              href="#ecosystem"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              role="menuitem"
            >
              Ecosystem
            </Link>
            <Link
              href="#technology"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              role="menuitem"
            >
              KAUS Technology
            </Link>
            <Link
              href="#business"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              role="menuitem"
            >
              Business
            </Link>
            <Link
              href="#vision"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              role="menuitem"
            >
              Vision
            </Link>
          </div>

          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6"
            aria-label="Contact us"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  )
}

