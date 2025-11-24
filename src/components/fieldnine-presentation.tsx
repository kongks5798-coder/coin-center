"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PresentationProps {
  onClose: () => void
}

const slides = [
  {
    title: "Welcome to FieldNine",
    content: "AI-powered business ecosystem transforming logistics, fulfillment, and commerce",
  },
  {
    title: "KAUS AI",
    content: "Unified intelligence platform managing all data across FieldNine's operations",
  },
  {
    title: "KAUS Coin",
    content: "Blockchain-based payment system connecting all business divisions seamlessly",
  },
  {
    title: "RFID Logistics",
    content: "Next-generation wireless tracking system automating entire supply chain",
  },
  {
    title: "Fulfillment Integration",
    content: "End-to-end automated solution from order to delivery in 24 hours",
  },
  {
    title: "AI Logistics Platform",
    content: "Smart routing, predictive demand, and automated warehouse systems",
  },
  {
    title: "Brand Development",
    content: "Data-driven brand strategy creating market-leading brands",
  },
  {
    title: "Fashion Business",
    content: "AI trend analysis and rapid production leading the fashion market",
  },
  {
    title: "Business Intelligence",
    content: "Real-time analytics, predictive insights, and customized reports",
  },
  {
    title: "The Future",
    content: "FieldNine: Building Korea's future with AI technology",
  },
]

export function FieldNinePresentation({ onClose }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 6000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const progress = ((currentSlide + 1) / slides.length) * 100

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg hover:bg-card transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-foreground" />
                ) : (
                  <Play className="w-5 h-5 text-foreground" />
                )}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg hover:bg-card transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-foreground" />
                ) : (
                  <Volume2 className="w-5 h-5 text-foreground" />
                )}
              </button>
              <div className="text-sm text-muted-foreground">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-card transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-card">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Slide Content */}
          <div className="flex-1 flex items-center justify-center p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  {slides[currentSlide].content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 p-3 rounded-full bg-card/50 hover:bg-card border border-border transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 p-3 rounded-full bg-card/50 hover:bg-card border border-border transition-all"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 p-6 border-t border-border">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-accent w-8"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

