'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/blocks/Backgrounds/Aurora/Aurora.jsx'), { ssr: false })
const Galaxy = dynamic(() => import('@/blocks/Backgrounds/Galaxy/Galaxy.jsx'), { ssr: false })
const LiquidChrome = dynamic(() => import('@/blocks/Backgrounds/LiquidChrome/LiquidChrome.jsx'), { ssr: false })
const Orb = dynamic(() => import('@/blocks/Backgrounds/Orb/Orb.jsx'), { ssr: false })
const Threads = dynamic(() => import('@/blocks/Backgrounds/Threads/Threads.jsx'), { ssr: false })

export default function Hero() {
  const backgrounds = [
    { key: 'aurora', label: 'Aurora', word: 'Beautiful', Component: Aurora, props: {} },
    { key: 'galaxy', label: 'Galaxy', word: 'Revolutionary', Component: Galaxy, props: {} },
    { key: 'liquid', label: 'Liquid Chrome', word: 'Game-Changing', Component: LiquidChrome, props: {} },
    { key: 'orb', label: 'Orb', word: 'Fantastic', Component: Orb, props: {} },
    {
      key: 'threads',
      label: 'Threads',
      word: 'Customizable',
      Component: Threads,
      props: { color: [0.2, 0.45, 1], amplitude: 2, distance: 0.5 }
    },
  ] as const
  const [bgIndex, setBgIndex] = useState(0)
  const SelectedBg = backgrounds[bgIndex].Component

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pass any per-background props to improve visibility */}
        <SelectedBg {...(backgrounds[bgIndex].props as any)} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Business with
              <span className="text-primary block">{backgrounds[bgIndex].word} Web Design</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get a custom website that converts visitors into customers. Modern, responsive designs 
              that perfectly represent your brand and drive real business results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="#start-project"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              View Pricing
            </a>
          </motion.div>

          {/* Background Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-12 max-w-md mx-auto"
          >
            <label htmlFor="bg-slider" className="block text-sm font-medium text-gray-700 mb-2">
              Background: <span className="font-semibold">{backgrounds[bgIndex].label}</span>
            </label>
            <input
              id="bg-slider"
              type="range"
              min={0}
              max={backgrounds.length - 1}
              step={1}
              value={bgIndex}
              onChange={(e) => setBgIndex(Number(e.target.value))}
              className="w-full accent-primary"
              aria-valuetext={backgrounds[bgIndex].label}
            />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              {backgrounds.map((b, i) => (
                <span key={b.key} className={`w-0.5 ${i === bgIndex ? 'text-gray-800 font-semibold' : ''}`}>
                  {b.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Design</h3>
              <p className="text-gray-600">Unique websites tailored to your brand and business goals</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile-First</h3>
              <p className="text-gray-600">Responsive designs that work perfectly on all devices</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Results-Driven</h3>
              <p className="text-gray-600">Optimized for conversions and business growth</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
