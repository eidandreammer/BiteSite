'use client'

import { motion } from 'framer-motion'
import { useMemo, useEffect, useState, type CSSProperties } from 'react'
import { useBackground } from '@/contexts/BackgroundContext'
import GradientText from '@/TextAnimations/GradientText/GradientText'
import '@/TextAnimations/GradientText/GradientText.css'
import { Fredoka } from 'next/font/google'
import ThemeToggle from './ThemeToggle'
import StarBorder from '@/components/StarBorder/StarBorder'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

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
  const { getButtonColor } = useBackground()

  const buttonColor = getButtonColor()
  const inactiveClass = 'text-gray-700'

  // Important: don't read from document during initial render to avoid SSR/CSR mismatch
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const update = () => setIsDark((root.dataset.theme === 'dark') || root.classList.contains('dark'))

    update()
    const observer = new MutationObserver(() => update())
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] })
    return () => observer.disconnect()
  }, [])

  const clampedValue = useMemo(() => {
    const upper = Math.max(0, Math.min(max, value))
    return upper
  }, [value, max])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 p-5" data-background-customization="true">
        {/* Theme toggle in top-right of the box */}
        <div className="absolute right-3 top-3">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className={`${fredoka.className} text-xl sm:text-2xl font-extrabold ${textColors.slider || textColors.secondary} text-center`}>
            <GradientText animationSpeed={6}>Customize Background</GradientText>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {labels.map((label, index) => {
            const isActive = index === clampedValue
            const glowColor = isDark
              ? (isActive ? '#38bdf8' : '#64748b')
              : (isActive ? buttonColor : '#cbd5f5')
            const starStyles = {
              '--star-border-bg': isDark
                ? (isActive ? 'rgba(15,23,42,0.92)' : 'rgba(15,23,42,0.78)')
                : (isActive ? 'rgba(255,255,255,0.95)' : 'rgba(248,250,252,0.9)'),
              '--star-border-text': isDark ? '#f8fafc' : '#0f172a',
              '--star-border-border': isDark
                ? (isActive ? '#38bdf8' : 'rgba(71,85,105,0.85)')
                : (isActive ? buttonColor : 'rgba(148,163,184,0.75)'),
              '--star-border-padding-y': '0.5rem',
              '--star-border-padding-x': '1.25rem',
              '--star-border-radius': '9999px',
              '--star-border-font-size': '0.85rem',
            } as CSSProperties

            return (
              <StarBorder
                key={index}
                as={motion.button}
                type="button"
                onClick={() => onChange(index)}
                className={`transition-shadow duration-200 ${isActive ? 'shadow-lg shadow-slate-400/40 dark:shadow-blue-500/30' : 'hover:shadow-md hover:shadow-slate-300/40 dark:hover:shadow-slate-700/40'}`}
                contentClassName={`font-semibold tracking-wide ${isActive ? '' : 'opacity-80'} ${isDark ? 'text-slate-50' : 'text-slate-900'}`}
                color={glowColor}
                speed={isActive ? '4s' : '7s'}
                thickness={isActive ? 6 : 3}
                style={starStyles}
                aria-pressed={isActive}
                data-background-customization="true"
                data-background={label.toLowerCase().replace(/\s+/g, '-')}
                whileHover={isActive ? { scale: 1.03 } : { scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={`whitespace-nowrap ${isActive ? '' : `${inactiveClass} dark:text-slate-200`}`}>{label}</span>
              </StarBorder>
            )
          })}
        </div>
      </div>
    </div>
  )
}
