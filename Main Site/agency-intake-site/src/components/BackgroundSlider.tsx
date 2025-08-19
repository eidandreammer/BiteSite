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
    <div className="w-full max-w-md mx-auto">
      <motion.div
        onHoverStart={() => scale.set(1.1)}
        onHoverEnd={() => scale.set(1)}
        style={{ scale, opacity }}
        className="mb-4"
      >
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${textColors.accent}/20 hover:${textColors.accent}/30 transition-colors`}
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
            <motion.div
              className="relative h-3 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                style={{ width: `${getRangePercentage()}%` }}
                transition={{ duration: 0.1 }}
              />
              
              {/* Slider thumb (wrapper centers; inner scales without breaking centering) */}
              <div
                className="absolute top-1/2"
                style={{ left: `${getRangePercentage()}%`, transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  className="z-10 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-blue-500"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${textColors.accent}/20 hover:${textColors.accent}/30 transition-colors`}
            onClick={() => step(1)}
            aria-label="Next background"
          >
            <ChevronRight className={`w-5 h-5 ${textColors.accent}`} />
          </motion.button>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="flex justify-between text-xs">
        {labels.map((label, index) => (
          <motion.span
            key={index}
            className={`text-center transition-colors duration-200 ${
              index === value 
                ? `${textColors.primary} font-semibold` 
                : textColors.slider || textColors.secondary
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
