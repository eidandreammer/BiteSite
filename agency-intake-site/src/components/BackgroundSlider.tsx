'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useBackground } from '@/contexts/BackgroundContext'
import GradientText from '@/TextAnimations/GradientText/GradientText'
import '@/TextAnimations/GradientText/GradientText.css'

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
  const { getButtonColor, getButtonTextColor } = useBackground()

  const buttonColor = getButtonColor()
  const buttonTextColor = getButtonTextColor()
  const inactiveClass = 'text-gray-700'

  const clampedValue = useMemo(() => {
    const upper = Math.max(0, Math.min(max, value))
    return upper
  }, [value, max])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 p-5">
        <div className="flex items-center justify-center mb-4">
          <div className={`text-lg sm:text-xl font-extrabold ${textColors.slider || textColors.secondary} text-center`}>
            <GradientText animationSpeed={6}>Customize</GradientText>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {labels.map((label, index) => {
            const isActive = index === clampedValue
            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => onChange(index)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${isActive ? 'shadow-lg' : 'hover:shadow'} ${isActive ? '' : 'border-gray-300'}`}
                style={isActive ? { backgroundColor: buttonColor, color: buttonTextColor, borderColor: buttonColor } : {}}
                aria-pressed={isActive}
                whileHover={isActive ? { scale: 1.03 } : { scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={isActive ? '' : `${inactiveClass}`}>{label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
