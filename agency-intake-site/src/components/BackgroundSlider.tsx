'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBackground } from '@/contexts/BackgroundContext'

interface BackgroundSliderProps {
  value: number
  onChange: (value: number) => void
  max: number
  labels: string[]
  textColors: {
    primary: string
    secondary: string
    accent: string
    slider?: string
  }
}

export default function BackgroundSlider({ 
  value, 
  onChange, 
  max, 
  labels, 
  textColors 
}: BackgroundSliderProps) {
  const { getButtonColor, getSliderThumbColor } = useBackground()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const scale = useMotionValue(1)
  const opacity = useTransform(scale, [1, 1.1], [0.8, 1])

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!sliderRef.current) return
    const { left, width } = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (e.clientX - left) / width))
    // Map hover position to discrete segments across the bar (equal widths)
    const hoveredIndex = Math.min(max, Math.max(0, Math.floor(percentage * (max + 1))))
    if (hoveredIndex !== value) {
      onChange(hoveredIndex)
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    handlePointerMove(e)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const step = (delta: number) => {
    const next = Math.min(max, Math.max(0, value + delta))
    onChange(next)
  }

  const getRangePercentage = () => {
    return (value / max) * 100
  }

  // Gooey slide springs
  const headPercent = useSpring(getRangePercentage(), { stiffness: 320, damping: 20, mass: 0.4 })
  const tailPercent = useSpring(getRangePercentage(), { stiffness: 140, damping: 26, mass: 0.6 })
  const headLeft = useTransform(headPercent, v => `${v}%`)
  const tailWidth = useTransform(tailPercent, v => `${v}%`)

  useEffect(() => {
    const p = (value / max) * 100
    headPercent.set(p)
    tailPercent.set(p)
  }, [value, max, headPercent, tailPercent])

  // Dynamic colors based on current background
  const buttonColor = getButtonColor()
  const sliderThumbColor = getSliderThumbColor()
  const ACCENT_COLOR_CLASS = 'text-blue-600'
  const INACTIVE_TEXT_CLASS = 'text-gray-700'
  const ACTIVE_LABEL_CLASS = 'px-2.5 py-1 rounded-full text-white shadow'

  return (
    <motion.div
      onHoverStart={() => scale.set(1.06)}
      onHoverEnd={() => scale.set(1)}
      style={{ scale, opacity }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 p-5">
        {/* SVG defs for gooey filter */}
        <svg className="absolute pointer-events-none w-0 h-0">
          <defs>
            <filter id="gooey-bg">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <div className="flex items-center justify-center gap-4 mb-3">
                      <motion.button
              whileHover={{ scale: 1.15, rotate: -8, boxShadow: `0 10px 20px ${buttonColor}40, 0 2px 6px rgba(0,0,0,0.08)` }}
              whileTap={{ scale: 0.92 }}
              animate={{ y: [0, -1.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              className="relative p-2 rounded-full bg-white/80 ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all overflow-visible"
              onClick={() => step(-1)}
              aria-label="Previous background"
            >
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full"
                initial={{ opacity: 0, scale: 0.85 }}
                whileHover={{ opacity: 0.25, scale: 1.1 }}
                transition={{ duration: 0.25 }}
                style={{ background: `radial-gradient(closest-side, ${buttonColor}40, transparent)` }}
              />
              <ChevronLeft className="w-5 h-5" style={{ color: buttonColor }} />
            </motion.button>

          <div
            ref={sliderRef}
            className="flex-1 relative cursor-pointer"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onMouseLeave={() => {
              if (isDragging) return
              // snap back to current value's position visually via springs; no state change needed
            }}
          >
            <div className="relative h-3.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden ring-1 ring-black/5">
              {/* Gooey fill and blob */}
              <div className="absolute inset-0" style={{ filter: 'url(#gooey-bg)' }}>
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ 
                    width: tailWidth,
                    background: `linear-gradient(to right, ${buttonColor}, ${buttonColor}dd)`
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                  style={{ 
                    left: headLeft,
                    backgroundColor: buttonColor
                  }}
                />
              </div>

              {/* Slider thumb (wrapper centers; inner scales without breaking centering) */}
              <motion.div
                className="absolute top-1/2"
                style={{ left: headLeft, transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  className="z-10 w-6 h-6 bg-white rounded-full shadow-lg"
                  style={{ 
                    ringColor: sliderThumbColor,
                    boxShadow: `0 4px 6px -1px ${sliderThumbColor}40, 0 2px 4px -1px ${sliderThumbColor}40`
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.1 }}
                />
              </motion.div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.15, rotate: 8, boxShadow: `0 10px 20px ${buttonColor}40, 0 2px 6px rgba(0,0,0,0.08)` }}
            whileTap={{ scale: 0.92 }}
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="relative p-2 rounded-full bg-white/80 ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all overflow-visible"
            onClick={() => step(1)}
            aria-label="Next background"
          >
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 0.85 }}
              whileHover={{ opacity: 0.25, scale: 1.1 }}
              transition={{ duration: 0.25 }}
              style={{ background: `radial-gradient(closest-side, ${buttonColor}40, transparent)` }}
            />
            <ChevronRight className="w-5 h-5" style={{ color: buttonColor }} />
          </motion.button>
        </div>

        {/* Labels */}
        <div className="flex justify-between items-center text-xs">
          {labels.map((label, index) => (
            <motion.span
              key={index}
              onClick={() => onChange(index)}
              className={`${
                index === value ? ACTIVE_LABEL_CLASS : `${INACTIVE_TEXT_CLASS} hover:text-gray-900`
              } cursor-pointer select-none transition-all duration-200 text-center`}
              style={index === value ? { backgroundColor: buttonColor } : {}}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
