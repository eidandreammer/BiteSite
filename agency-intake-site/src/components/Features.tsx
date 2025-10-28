'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Palette, Smartphone, Zap, Target, Users, Shield } from 'lucide-react'
import MagicBento from '@/components/MagicBento/MagicBento.jsx'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack/ScrollStack.jsx'
import ChromaGrid from '@/components/ChromaGrid/ChromaGrid.jsx'
import LayoutPicker from '@/components/LayoutPicker'
import GlareCtaCard from '@/components/CallToAction/GlareCtaCard'

type LayoutOption = 'grid' | 'magic-bento' | 'scroll-stack' | 'chroma-grid'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  accentClass: string
  accentColor: string
}

interface BentoFeature {
  color: string
  title: string
  description: string
  label: string
  icon: LucideIcon
  iconColor: string
}

interface ChromaFeature {
  icon: LucideIcon
  iconColor: string
  title: string
  subtitle: string
  handle: string
  borderColor: string
  gradient: string
  url: string
}

const features: Feature[] = [
  {
    icon: Palette,
    title: 'Custom Design',
    description:
      'Every website is uniquely designed to match your brand identity and business goals. No templates, no cookie-cutter solutions.',
    accentClass: 'text-blue-600',
    accentColor: '#2563EB'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description:
      'Responsive design that looks and works perfectly on all devices, from smartphones to desktop computers.',
    accentClass: 'text-green-600',
    accentColor: '#16A34A'
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed and performance, ensuring your visitors have the best possible experience.',
    accentClass: 'text-yellow-600',
    accentColor: '#CA8A04'
  },
  {
    icon: Target,
    title: 'Conversion Focused',
    description: 'Designed with your business goals in mind, optimized to convert visitors into customers.',
    accentClass: 'text-red-600',
    accentColor: '#DC2626'
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Intuitive navigation and user-friendly interfaces that keep visitors engaged and coming back.',
    accentClass: 'text-purple-600',
    accentColor: '#7C3AED'
  },
  {
    icon: Shield,
    title: 'SEO Optimized',
    description: 'Built with search engine optimization in mind, helping your website rank higher in search results.',
    accentClass: 'text-indigo-600',
    accentColor: '#4F46E5'
  }
]

const palette = features.map((feature) => feature.accentColor)

const layoutLabels: Record<LayoutOption, string> = {
  grid: 'Grid',
  'magic-bento': 'Magic Bento',
  'scroll-stack': 'Scroll Stack',
  'chroma-grid': 'Chroma Grid'
}

const FeatureGrid = ({ features }: { features: Feature[] }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {features.map((feature, index) => (
      <motion.div
        key={feature.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group transform rounded-xl bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-primary/10">
          <feature.icon className={`h-6 w-6 ${feature.accentClass}`} />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
        <p className="leading-relaxed text-gray-600">{feature.description}</p>
      </motion.div>
    ))}
  </div>
)

const FeatureScrollStack = ({ features }: { features: Feature[] }) => (
  <div className="mt-6">
    <ScrollStack onStackComplete={() => {}}>
      {features.map((feature) => (
        <ScrollStackItem key={feature.title}>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              <feature.icon className={`h-6 w-6 ${feature.accentClass}`} />
            </div>
            <div className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</div>
            <p className="leading-relaxed text-gray-600">{feature.description}</p>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  </div>
)

const FeatureMagicBento = ({ items }: { items: BentoFeature[] }) => (
  <div className="mt-6">
    <MagicBento
      items={items}
      enableStars={false}
      enableTilt={false}
      enableMagnetism
      enableSpotlight
      enableBorderGlow
      textAutoHide={false}
      spotlightRadius={360}
    />
  </div>
)

const FeatureChromaGrid = ({ items }: { items: ChromaFeature[] }) => {
  const [gridSize, setGridSize] = useState({ columns: 3, rows: 2 })

  useEffect(() => {
    const updateGrid = () => {
      if (window.innerWidth < 640) {
        setGridSize({ columns: 1, rows: items.length })
      } else if (window.innerWidth < 1024) {
        setGridSize({ columns: 2, rows: Math.ceil(items.length / 2) })
      } else {
        setGridSize({ columns: 3, rows: 2 })
      }
    }

    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [items.length])

  return (
    <div className="mt-6">
      <ChromaGrid items={items} columns={gridSize.columns} rows={gridSize.rows} />
    </div>
  )
}

export default function Features() {
  const [layout, setLayout] = useState<LayoutOption>('magic-bento')

  useEffect(() => {
    if (window.innerWidth < 768) {
      setLayout('scroll-stack')
    }
  }, [])

  const bentoItems = useMemo<BentoFeature[]>(
    () =>
      features.map((feature, index) => ({
        color: `linear-gradient(160deg, ${palette[index % palette.length]} 0%, rgba(15, 23, 42, 0.92) 90%)`,
        title: feature.title,
        description: feature.description,
        label: 'Feature',
        icon: feature.icon,
        iconColor: feature.accentColor
      })),
    []
  )

  const chromaItems = useMemo<ChromaFeature[]>(
    () =>
      features.map((feature, index) => ({
        icon: feature.icon,
        iconColor: feature.accentColor,
        title: feature.title,
        subtitle: feature.description,
        handle: '',
        borderColor: palette[index % palette.length],
        gradient: `linear-gradient(165deg, ${palette[index % palette.length]}, #000)`,
        url: '#start-project'
      })),
    []
  )

  const renderLayout = () => {
    switch (layout) {
      case 'grid':
        return <FeatureGrid features={features} />
      case 'magic-bento':
        return <FeatureMagicBento items={bentoItems} />
      case 'scroll-stack':
        return <FeatureScrollStack features={features} />
      case 'chroma-grid':
        return <FeatureChromaGrid items={chromaItems} />
      default:
        return null
    }
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Why Choose Our Web Design Services?</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            We combine creativity with technical expertise to deliver websites that not only look great but also drive
            real business results.
          </p>
        </motion.div>

        <div className="mb-10 flex items-center justify-center">
          <label htmlFor="features-layout" className="sr-only">
            Layout
          </label>
          <select
            id="features-layout"
            className="sr-only"
            value={layout}
            onChange={(event) => setLayout(event.target.value as LayoutOption)}
          >
            {(Object.keys(layoutLabels) as LayoutOption[]).map((value) => (
              <option key={value} value={value}>
                {layoutLabels[value]}
              </option>
            ))}
          </select>
          <LayoutPicker current={layout} onPick={(value) => setLayout(value as LayoutOption)} />
        </div>

        {renderLayout()}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <GlareCtaCard
            title="Ready to Transform Your Online Presence?"
            description="Let's discuss your project and create something amazing together."
            actionHref="#start-project"
            actionLabel="Start Your Project"
          />
        </motion.div>
      </div>
    </section>
  )
}
