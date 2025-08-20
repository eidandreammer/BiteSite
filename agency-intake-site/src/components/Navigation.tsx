"use client"

import CardNav from './CardNav/CardNav'
import PillNav from './PillNav/PillNav'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'card' | 'pill'>('card')

  useEffect(() => {
    const m = searchParams.get('nav') as 'card' | 'pill' | null
    if (m === 'pill' || m === 'card') {
      setMode(m)
      return
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem('nav-mode') : null
    if (saved === 'pill' || saved === 'card') setMode(saved)
  }, [searchParams])

  const paramMode = searchParams.get('nav') as 'card' | 'pill' | null
  const effectiveMode: 'card' | 'pill' = paramMode === 'pill' || paramMode === 'card' ? paramMode : mode

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('nav-mode', mode)
  }, [mode])

  const items = useMemo(() => [
    {
      label: 'Explore',
      bgColor: '#EEF2FF',
      textColor: '#111827',
      links: [
        { label: 'Home', href: '/', ariaLabel: 'Go to Home' },
        { label: 'About Us', href: '/about', ariaLabel: 'Learn about us' },
      ],
    },
    {
      label: 'Services',
      bgColor: '#ECFEFF',
      textColor: '#111827',
      links: [
        { label: 'Web Design', href: '/#features', ariaLabel: 'View features' },
        { label: 'Pricing', href: '/#pricing', ariaLabel: 'View pricing' },
      ],
    },
    {
      label: 'Get Started',
      bgColor: '#FEF9C3',
      textColor: '#111827',
      links: [
        { label: 'Start a Project', href: '/start', ariaLabel: 'Start a project' },
        { label: 'Contact', href: '/#contact', ariaLabel: 'Contact us' },
      ],
    },
  ], [])

  const flatNav = useMemo(() => [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/#features', label: 'Web Design' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/start', label: 'Start a Project' },
    { href: '/#contact', label: 'Contact' },
  ], [])

  return (
    <div className="relative">
      <div className="fixed right-3 bottom-3 z-[60] rounded-lg shadow-sm border border-gray-200 bg-white/80 backdrop-blur p-2 flex gap-1">
        <button
          type="button"
          onClick={() => setMode('pill')}
          className={`px-3 py-1 rounded-md text-sm ${mode === 'pill' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
          aria-pressed={mode === 'pill'}
        >
          Pill Nav
        </button>
        <button
          type="button"
          onClick={() => setMode('card')}
          className={`px-3 py-1 rounded-md text-sm ${mode === 'card' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
          aria-pressed={mode === 'card'}
        >
          Card Nav
        </button>
      </div>

      {effectiveMode === 'card' && (
        <CardNav
          logo="/favicon.ico"
          logoAlt="Agency"
          items={items}
          baseColor="#ffffff"
          menuColor="#111827"
          buttonBgColor="#111827"
          buttonTextColor="#ffffff"
          className="mx-auto"
        />
      )}

      {effectiveMode === 'pill' && (
        <div className="sticky top-0 z-50" data-nav="pill">
          <PillNav
            logo="/favicon.ico"
            logoAlt="Agency"
            items={flatNav}
            activeHref={pathname}
            baseColor="#ffffff"
            pillColor="#111827"
            hoveredPillTextColor="#111827"
            pillTextColor="#ffffff"
            onMobileMenuClick={() => {}}
          />
        </div>
      )}

      {/* Dock removed */}

      <div className="hidden">
        <Link href="/start">Start a Project</Link>
      </div>
    </div>
  )
}

