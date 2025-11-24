"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Slide {
  title: string
  content: string[]
}

interface BusinessPresentationProps {
  onClose: () => void
  business: {
    id: string
    name: string
    slides: Slide[]
    theme: {
      primary: string
      secondary: string
      accent: string
      bgGradient: string
    }
  }
}

export function BusinessPresentation({ onClose, business }: BusinessPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % business.slides.length)
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
  }, [isPlaying, business.slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % business.slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + business.slides.length) % business.slides.length)
  }

  const progress = ((currentSlide + 1) / business.slides.length) * 100

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: business.theme.bgGradient,
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: business.theme.accent }}
              />
              <h2 className="text-xl font-bold text-foreground">{business.name}</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg hover:bg-card transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label={isPlaying ? "Pause presentation" : "Play presentation"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-foreground" />
                ) : (
                  <Play className="w-5 h-5 text-foreground" />
                )}
              </button>
              <div className="text-sm text-muted-foreground">
                {currentSlide + 1} / {business.slides.length}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-card transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-card">
            <motion.div
              className="h-full"
              style={{ backgroundColor: business.theme.accent }}
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
                className="text-center max-w-4xl w-full"
              >
                <h2
                  className="text-4xl md:text-6xl font-bold mb-8"
                  style={{ color: business.theme.accent }}
                >
                  {business.slides[currentSlide].title}
                </h2>
                <div className="space-y-4">
                  {business.slides[currentSlide].content.map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-lg md:text-2xl text-muted-foreground"
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 p-3 rounded-full bg-background/50 hover:bg-background border border-border transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 p-3 rounded-full bg-background/50 hover:bg-background border border-border transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 p-6 border-t border-border">
            {business.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-accent w-8"
                    : "bg-muted hover:bg-muted-foreground/50 w-2"
                }`}
                style={
                  index === currentSlide
                    ? { backgroundColor: business.theme.accent }
                    : {}
                }
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

