'use client'

import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { motion } from 'framer-motion'

interface ColorWheelProps {
  value: string
  onChange: (color: string) => void
  onPaletteChange: (palette: string[]) => void
}

type HarmonyType = 'complementary' | 'analogous' | 'split' | 'triad' | 'tetrad' | 'mono' | 'mono-tints'

const harmonyTypes: { value: HarmonyType; label: string }[] = [
  { value: 'complementary', label: 'Complementary' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'split', label: 'Split' },
  { value: 'triad', label: 'Triad' },
  { value: 'tetrad', label: 'Tetrad' },
  { value: 'mono', label: 'Monochrome' },
  { value: 'mono-tints', label: 'Monochrome Tints' }
]

export default function ColorWheel({ value, onChange, onPaletteChange }: ColorWheelProps) {
  const [selectedHarmony, setSelectedHarmony] = useState<HarmonyType>('complementary')
  const [palette, setPalette] = useState<string[]>([])

  useEffect(() => {
    generatePalette(value, selectedHarmony)
  }, [value, selectedHarmony])

  const generatePalette = (color: string, harmonyType: HarmonyType) => {
    try {
      let colors: string[] = []
      
      switch (harmonyType) {
        case 'complementary':
          colors = generateComplementary(color)
          break
        case 'analogous':
          colors = generateAnalogous(color)
          break
        case 'split':
          colors = generateSplit(color)
          break
        case 'triad':
          colors = generateTriad(color)
          break
        case 'tetrad':
          colors = generateTetrad(color)
          break
        case 'mono':
          colors = generateMonochrome(color)
          break
        case 'mono-tints':
          colors = generateMonochromeTints(color)
          break
      }
      
      // Ensure we have the original color first
      if (!colors.includes(color)) {
        colors.unshift(color)
      }
      
      // Limit to 8 colors max
      colors = colors.slice(0, 8)
      
      setPalette(colors)
      onPaletteChange(colors)
    } catch (error) {
      console.error('Error generating palette:', error)
      setPalette([color])
      onPaletteChange([color])
    }
  }

  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  const hslToHex = (h: number, s: number, l: number): string => {
    h = h % 360
    s = Math.max(0, Math.min(100, s))
    l = Math.max(0, Math.min(100, l))

    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l / 100 - c / 2

    let r = 0, g = 0, b = 0

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c
    } else {
      r = c; g = 0; b = x
    }

    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0')
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0')
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0')

    return `#${rHex}${gHex}${bHex}`
  }

  const generateComplementary = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    const complementaryHue = (h + 180) % 360
    return [hslToHex(complementaryHue, s, l)]
  }

  const generateAnalogous = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    return [
      hslToHex((h + 30) % 360, s, l),
      hslToHex((h - 30 + 360) % 360, s, l)
    ]
  }

  const generateSplit = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    return [
      hslToHex((h + 150) % 360, s, l),
      hslToHex((h + 210) % 360, s, l)
    ]
  }

  const generateTriad = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    return [
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l)
    ]
  }

  const generateTetrad = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    return [
      hslToHex((h + 90) % 360, s, l),
      hslToHex((h + 180) % 360, s, l),
      hslToHex((h + 270) % 360, s, l)
    ]
  }

  const generateMonochrome = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    return [
      hslToHex(h, Math.max(0, s - 20), Math.max(0, l - 20)),
      hslToHex(h, Math.min(100, s + 20), Math.min(100, l + 20))
    ]
  }

  const generateMonochromeTints = (color: string): string[] => {
    const [h, s, l] = hexToHsl(color)
    return [
      hslToHex(h, s, Math.max(0, l - 30)),
      hslToHex(h, s, Math.min(100, l + 30))
    ]
  }

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy color:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Color Picker */}
      <div className="flex flex-col items-center space-y-4">
        <HexColorPicker
          color={value}
          onChange={onChange}
          className="w-48 h-48"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Selected Color</p>
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded border-2 border-gray-300"
              style={{ backgroundColor: value }}
            />
            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {value}
            </code>
            <button
              onClick={() => copyToClipboard(value)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              📋
            </button>
          </div>
        </div>
      </div>

      {/* Harmony Selector */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Color Harmony</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {harmonyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedHarmony(type.value)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                selectedHarmony === type.value
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Palette */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Generated Palette</h3>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {palette.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
                title={`Click to copy ${color}`}
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <code className="text-xs font-mono bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">
                  {color}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
