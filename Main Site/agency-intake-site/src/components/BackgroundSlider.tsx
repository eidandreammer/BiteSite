'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const scale = useMotionValue(1)
  const opacity = useTransform(scale, [1, 1.1], [0.8, 1])

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (e.clientX - left) / width))
      const newValue = Math.round(percentage * max)
      onChange(newValue)
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

  return (
    <motion.div
      onHoverStart={() => scale.set(1.06)}
      onHoverEnd={() => scale.set(1)}
      style={{ scale, opacity }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 p-5">
        <div className="flex items-center justify-center gap-4 mb-3">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-full bg-white/80 ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all"
            onClick={() => step(-1)}
            aria-label="Previous background"
          >
            <ChevronLeft className={`w-5 h-5 ${textColors.accent}`} />
          </motion.button>

          <div
            ref={sliderRef}
            className="flex-1 relative cursor-pointer"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div className="relative h-3.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden ring-1 ring-black/5">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                style={{ width: `${getRangePercentage()}%` }}
                transition={{ duration: 0.12 }}
              />

              {/* Slider thumb (wrapper centers; inner scales without breaking centering) */}
              <div
                className="absolute top-1/2"
                style={{ left: `${getRangePercentage()}%`, transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  className="z-10 w-6 h-6 bg-white rounded-full ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-full bg-white/80 ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all"
            onClick={() => step(1)}
            aria-label="Next background"
          >
            <ChevronRight className={`w-5 h-5 ${textColors.accent}`} />
          </motion.button>
        </div>

        {/* Labels */}
        <div className="flex justify-between items-center text-xs">
          {labels.map((label, index) => (
            <motion.span
              key={index}
              onClick={() => onChange(index)}
              className={`${
                index === value
                  ? 'px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
                  : `${textColors.slider || textColors.secondary} hover:text-gray-900`
              } cursor-pointer select-none transition-all duration-200 text-center`}
              whileHover={{ scale: 1.06 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
