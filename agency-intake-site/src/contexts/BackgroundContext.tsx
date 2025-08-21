'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BackgroundContextType {
  currentBackground: string
  setCurrentBackground: (background: string) => void
  getButtonColor: () => string
  getSliderThumbColor: () => string
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [currentBackground, setCurrentBackground] = useState('orb')

  const getButtonColor = () => {
    switch (currentBackground) {
      case 'orb':
        return 'rgb(99, 102, 241)' // Blue-purple mix
      case 'galaxy':
        return 'rgb(0, 0, 0)' // Black
      case 'liquid':
        return 'rgb(192, 192, 192)' // Silver
      case 'threads':
        return 'rgb(59, 130, 246)' // Blue (original)
      case 'prism':
        return 'rgb(20, 184, 166)' // Turquoise
      case 'darkveil':
        return 'rgb(147, 51, 234)' // Purple
      default:
        return 'rgb(59, 130, 246)' // Default blue
    }
  }

  const getSliderThumbColor = () => {
    return getButtonColor()
  }

  return (
    <BackgroundContext.Provider value={{
      currentBackground,
      setCurrentBackground,
      getButtonColor,
      getSliderThumbColor
    }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider')
  }
  return context
}
