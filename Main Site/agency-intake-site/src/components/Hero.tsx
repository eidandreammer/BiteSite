'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import BackgroundSlider from './BackgroundSlider'

const Aurora = dynamic(() => import('@/blocks/Backgrounds/Aurora/Aurora.jsx'), { ssr: false, loading: () => null })
const Galaxy = dynamic(() => import('@/blocks/Backgrounds/Galaxy/Galaxy.jsx'), { ssr: false, loading: () => null })
const LiquidChrome = dynamic(() => import('@/blocks/Backgrounds/LiquidChrome/LiquidChrome.jsx'), { ssr: false, loading: () => null })
const Orb = dynamic(() => import('@/blocks/Backgrounds/Orb/Orb.jsx'), { ssr: false, loading: () => null })
const Threads = dynamic(() => import('@/blocks/Backgrounds/Threads/Threads.jsx'), { ssr: false, loading: () => null })

export default function Hero() {
  const backgrounds = [
    { 
      key: 'aurora', 
      label: 'Aurora', 
      word: 'Beautiful', 
      Component: Aurora, 
      props: {},
      textColors: {
        primary: 'text-white',
        secondary: 'text-blue-100',
        accent: 'text-blue-200',
        slider: 'text-gray-800'
      }
    },
    { 
      key: 'galaxy', 
      label: 'Galaxy', 
      word: 'Revolutionary', 
      Component: Galaxy, 
      props: {},
      textColors: {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        accent: 'text-blue-600'
      }
    },
    { 
      key: 'liquid', 
      label: 'Liquid Chrome', 
      word: 'Game-Changing', 
      Component: LiquidChrome, 
      props: {},
      textColors: {
        primary: 'text-white',
        secondary: 'text-gray-100',
        accent: 'text-blue-200'
      }
    },
    { 
      key: 'orb', 
      label: 'Orb', 
      word: 'Fantastic', 
      Component: Orb, 
      props: {},
      textColors: {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        accent: 'text-blue-600'
      }
    },
    {
      key: 'threads',
      label: 'Threads',
      word: 'Customizable',
      Component: Threads,
      props: { 
        color: [0.2, 0.45, 1], 
        amplitude: 2, 
        distance: 0.5,
        className: 'w-full h-[220vh] -translate-y-[40vh] md:h-full md:translate-y-0'
      },
      textColors: {
        primary: 'text-gray-900',
        secondary: 'text-gray-700',
        accent: 'text-blue-600'
      }
    },
  ] as const
  const [bgIndex, setBgIndex] = useState(0)
  const SelectedBg = backgrounds[bgIndex].Component
  const isWhitePricing = ['aurora', 'galaxy', 'liquid'].includes(backgrounds[bgIndex].key)
  const [showBg, setShowBg] = useState(false)

  useEffect(() => {
    const enable = () => setShowBg(true)
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        ;(window as any).requestIdleCallback(enable, { timeout: 600 })
      } else {
        setTimeout(enable, 150)
      }
    }
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {showBg ? (
          <SelectedBg {...(backgrounds[bgIndex].props as any)} />
        ) : null}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={false} className="mb-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${backgrounds[bgIndex].textColors.primary} mb-6 leading-tight`}>
              Transform Your Business with
              <span className={`${backgrounds[bgIndex].textColors.accent} block`}>{backgrounds[bgIndex].word} Web Design</span>
            </h1>
            <p className={`text-xl lg:text-2xl ${backgrounds[bgIndex].textColors.secondary} max-w-3xl mx-auto leading-relaxed`}>
              Get a custom website that converts visitors into customers. Modern, responsive designs 
              that perfectly represent your brand and drive real business results.
            </p>
          </motion.div>

          <motion.div initial={false} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#start-project"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#pricing"
              className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg transition-all duration-200 ${
                isWhitePricing
                  ? 'bg-white text-black border border-gray-200 hover:bg-white/90 shadow-sm'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              View Pricing
            </a>
          </motion.div>

          {/* Background Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-12"
          >
            <div className={`text-center text-sm font-medium ${backgrounds[bgIndex].textColors.slider || backgrounds[bgIndex].textColors.secondary} mb-4`}>
              Background: <span className="font-semibold">{backgrounds[bgIndex].label}</span>
            </div>
            <BackgroundSlider
              value={bgIndex}
              onChange={setBgIndex}
              max={backgrounds.length - 1}
              labels={backgrounds.map(b => b.label)}
              textColors={backgrounds[bgIndex].textColors}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center bg-white rounded-lg shadow-lg p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Custom Design</h3>
              <p className="text-gray-600">Unique websites tailored to your brand and business goals</p>
            </div>
            
            <div className="text-center bg-white rounded-lg shadow-lg p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Mobile-First</h3>
              <p className="text-gray-600">Responsive designs that work perfectly on all devices</p>
            </div>
            
            <div className="text-center bg-white rounded-lg shadow-lg p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Results-Driven</h3>
              <p className="text-gray-600">Optimized for conversions and business growth</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${backgrounds[bgIndex].textColors.accent}/10 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 ${backgrounds[bgIndex].textColors.accent}/10 rounded-full blur-3xl`}></div>
      </div>
    </section>
  )
}
