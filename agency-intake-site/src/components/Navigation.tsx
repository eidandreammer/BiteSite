 'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import PillNav from './PillNav/PillNavNext'
import { useBackground } from '@/contexts/BackgroundContext'
import './Navigation.css'
import { LayoutGroup } from 'framer-motion'
// Use public assets for logo to avoid missing local files
const LOGO_LIGHT = '/vercel.svg'
const LOGO_DARK = '/vercel.svg'

interface NavigationProps {
  className?: string
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const { getButtonColor, getButtonTextColor } = useBackground()
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)

  const isSticky = pathname !== '/start'

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/start', label: 'Get Started' }
  ]

  // Toggle body padding only when nav is sticky
  useEffect(() => {
    if (typeof document === 'undefined') return
    const body = document.body
    if (isSticky) body.classList.add('has-fixed-nav')
    else body.classList.remove('has-fixed-nav')
    return () => {
      body.classList.remove('has-fixed-nav')
    }
  }, [isSticky])

  // Initialize theme from document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      const datasetTheme = root.dataset.theme
      setIsDark(datasetTheme ? datasetTheme === 'dark' : root.classList.contains('dark'))
    }
  }, [])

  // Follow system preference when no stored choice exists
  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme')
      if (!stored) {
        const root = document.documentElement
        const next = e.matches ? 'dark' : 'light'
        root.dataset.theme = next
        root.style.colorScheme = next === 'dark' ? 'dark' : 'light'
        if (next === 'dark') root.classList.add('dark')
        else root.classList.remove('dark')
        setIsDark(next === 'dark')
      }
    }
    media.addEventListener?.('change', handler)
    return () => media.removeEventListener?.('change', handler)
  }, [])

  const setTheme = (dark: boolean) => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    const next = dark ? 'dark' : 'light'
    root.dataset.theme = next
    root.style.colorScheme = dark ? 'dark' : 'light'
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    setIsDark(dark)
    try { localStorage.setItem('theme', next) } catch {}
    requestAnimationFrame(() => root.classList.remove('theme-switching'))
  }

  const ThemeToggle = () => (
    <button
      id="theme-toggle"
      className="theme-toggle-icon"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      title="Toggle theme"
      onClick={() => setTheme(!isDark)}
    >
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe066"/>
            <stop offset="60%" stopColor="#ffca3a"/>
            <stop offset="100%" stopColor="#ffb703"/>
          </radialGradient>
          <radialGradient id="moonGrad" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#dbe3ff"/>
            <stop offset="70%" stopColor="#a8b6ff"/>
            <stop offset="100%" stopColor="#7e8df4"/>
          </radialGradient>
        </defs>
        <g className="sun">
          <circle className="sun-core" cx="12" cy="12" r="5" fill="url(#sunGrad)" />
          <g className="sun-rays">
            <line x1="12" y1="1"  x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="23"/>
            <line x1="1"  y1="12" x2="4"  y2="12"/>
            <line x1="20" y1="12" x2="23" y2="12"/>
            <line x1="4.2" y1="4.2" x2="6.6" y2="6.6"/>
            <line x1="17.4" y1="17.4" x2="19.8" y2="19.8"/>
            <line x1="4.2" y1="19.8" x2="6.6" y2="17.4"/>
            <line x1="17.4" y1="6.6"  x2="19.8" y2="4.2"/>
          </g>
        </g>
        <g className="moon">
          <circle className="moon-core" cx="12" cy="12" r="5" fill="url(#moonGrad)" />
          <circle className="moon-bite" cx="14" cy="10" r="5"></circle>
        </g>
      </svg>
    </button>
  )

  return (
    <LayoutGroup id="nav-customize">
      <PillNav
        logo={(
          <Image
            src={isDark ? LOGO_DARK : LOGO_LIGHT}
            alt="Agency logo"
            priority
            style={{ width: 'auto' }}
            sizes="120px"
            width={120}
            height={28}
          />
        ) as unknown as string}
        items={navItems.map(item => ({
          href: item.href,
          label: item.label
        }))}
        activeHref={pathname}
        baseColor="#ffffff"
        pillColor={getButtonColor()}
        pillTextColor="#ffffff"
        hoveredPillTextColor="#1f2937"
        className={className}
        onMobileMenuClick={() => {}}
        slotItem={null}
        slotIndex={undefined}
        leftSlot={<div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ThemeToggle /></div>}
        rightSlot={null}
        sticky={isSticky}
        topOffset={14}
      />
    </LayoutGroup>
  )
}

export default Navigation 
