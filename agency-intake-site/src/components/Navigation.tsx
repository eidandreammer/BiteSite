 'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PillNav from './PillNav/PillNavNext'
import CardNav from './CardNav/CardNavNext'
import { useBackground } from '@/contexts/BackgroundContext'
import './Navigation.css'
import '@/TextAnimations/GradientText/GradientText.css'
import GradientText from '@/TextAnimations/GradientText/GradientText'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
// Use public assets for logo to avoid missing local files
const LOGO_LIGHT = '/vercel.svg'
const LOGO_DARK = '/vercel.svg'

type NavStyle = 'traditional' | 'pill' | 'card'

interface NavigationProps {
  className?: string
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const { getButtonColor, getButtonTextColor } = useBackground()
  const [navStyle, setNavStyle] = useState<NavStyle>('traditional')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null)
  const mobileMenuId = 'primary-navigation'
  const [isStyleSelectorMinimized, setIsStyleSelectorMinimized] = useState(true)
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/start', label: 'Get Started' }
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsStyleSelectorMinimized(true)
  }, [pathname])

  // Always close style selector when nav style changes
  useEffect(() => {
    setIsStyleSelectorMinimized(true)
  }, [navStyle])

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
        <circle className="sun-core" cx="12" cy="12" r="5"></circle>
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
        <circle className="moon-bite" cx="15" cy="9" r="5"></circle>
      </svg>
    </button>
  )

  // Ensure content spacing for fixed nav across all styles
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('has-fixed-nav')
      return () => {
        document.body.classList.remove('has-fixed-nav')
      }
    }
  }, [])

  // Lock scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return
    const body = document.body
    const menu = document.getElementById(mobileMenuId)
    if (!menu) return

    if (isMobileMenuOpen) {
      setLastFocusedElement(document.activeElement as HTMLElement)
      const previousOverflow = body.style.overflow
      body.style.overflow = 'hidden'

      // Focus first focusable element inside menu
      const focusable = menu.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      focusable?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false)
        } else if (e.key === 'Tab') {
          // Simple focus trap
          const nodes = Array.from(
            menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
          )
          if (nodes.length === 0) return
          const first = nodes[0]
          const last = nodes[nodes.length - 1]
          const current = document.activeElement as HTMLElement
          if (e.shiftKey && current === first) {
            e.preventDefault(); last.focus()
          } else if (!e.shiftKey && current === last) {
            e.preventDefault(); first.focus()
          }
        }
      }
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        body.style.overflow = previousOverflow
        document.removeEventListener('keydown', handleKeyDown)
        lastFocusedElement?.focus()
      }
    }
  }, [isMobileMenuOpen])

  // Traditional Navigation Component
  const TraditionalNav = () => (
    <nav className={`traditional-nav ${className}`} aria-label="Primary">
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/" className="nav-logo">
            <Image
              src={isDark ? LOGO_DARK : LOGO_LIGHT}
              alt="Agency logo"
              priority
              style={{ height: 28, width: 'auto' }}
              sizes="120px"
              width={120}
              height={28}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu" role="menubar">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              role="menuitem"
              style={pathname === item.href ? ({ 
                borderBottomColor: getButtonColor(),
                color: getButtonColor(),
                ['--active-underline-color' as any]: getButtonColor()
              } as React.CSSProperties) : {}}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle />
          <div className="inline-style-selector">
            <StyleSelector />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls={mobileMenuId}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Navigation */}
        <div
          id={mobileMenuId}
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-link ${pathname === item.href ? 'active' : ''}`}
              style={pathname === item.href ? { 
                backgroundColor: getButtonColor(),
                color: '#ffffff'
              } : {}}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )

  // Style Selector Component
  const StyleSelector = () => {
    if (navStyle === 'card') return null;
    return (
      <div className={`style-selector ${isStyleSelectorMinimized ? 'minimized' : 'expanded'} ${navStyle}`}>
        {isStyleSelectorMinimized ? (
          <button 
            className="style-selector-toggle customize-button"
            onClick={() => setIsStyleSelectorMinimized(false)}
            aria-label="Open navigation style selector"
          >
            <GradientText animationSpeed={6}>
              Customize
            </GradientText>
          </button>
        ) : (
          <div className="style-selector-container">
            <div className="style-selector-header">
              <span className="style-label">Navigation Style</span>
              <button 
                className="style-selector-close"
                onClick={() => setIsStyleSelectorMinimized(true)}
                aria-label="Close navigation style selector"
              >
                ×
              </button>
            </div>
            <div className="style-buttons">
              <button
                className={`style-btn ${navStyle === 'traditional' ? 'active' : ''}`}
                onClick={() => setNavStyle('traditional')}
                style={navStyle === 'traditional' ? { backgroundColor: getButtonColor() } : {}}
              >
                Traditional
              </button>
              <button
                className={`style-btn ${navStyle === 'pill' ? 'active' : ''}`}
                onClick={() => setNavStyle('pill')}
                style={navStyle === 'pill' ? { backgroundColor: getButtonColor() } : {}}
              >
                Pill
              </button>
              {/* Card option hidden here to avoid conflicting with Card layout */}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Morphing inline customize control for Pill nav
  const CustomizeMorphPill = () => (
    <AnimatePresence initial={false} mode="wait">
      {isStyleSelectorMinimized ? (
        <motion.button
          key="pill-customize-btn"
          layoutId="customize-pill"
          className="pill"
          onClick={() => setIsStyleSelectorMinimized(false)}
          aria-label="Open navigation style selector"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ height: 'calc(var(--nav-h, 46px) - 4px)', padding: '0 14px' }}
        >
          <span className="hover-circle" aria-hidden="true" />
          <span className="label-stack">
            <span className="pill-label">
              <span
                className="text-content"
                style={{
                  backgroundImage: 'linear-gradient(to right, #40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa)',
                  animationDuration: '6s'
                }}
              >
                Customize
              </span>
            </span>
            <span className="pill-label-hover" aria-hidden="true">
              <span
                className="text-content"
                style={{
                  backgroundImage: 'linear-gradient(to right, #40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa)',
                  animationDuration: '6s'
                }}
              >
                Customize
              </span>
            </span>
          </span>
        </motion.button>
      ) : (
        <motion.div
          key="pill-style-selector"
          layoutId="customize-pill"
          className="inline-style-selector"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <StyleSelector />
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Morphing inline customize control for Card nav
  const CustomizeMorphCard = () => (
    <motion.button
      key="card-customize-btn"
      layoutId="customize-card"
      className="card-nav-cta-button"
      aria-label="Customize"
      style={{ backgroundColor: getButtonColor(), color: getButtonTextColor() }}
      initial={{ opacity: 0.95 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
    >
      Customize
    </motion.button>
  )

  // Render the appropriate navigation style
  const renderNavigation = () => {
    switch (navStyle) {
      case 'pill':
        return (
          <PillNav
            logo={(
              <Image
                src={isDark ? LOGO_DARK : LOGO_LIGHT}
                alt="Agency logo"
                priority
                style={{ height: 28, width: 'auto' }}
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
            rightSlot={<div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CustomizeMorphPill /></div>}
          />
        )
      case 'card':
        return (
          <CardNav
            logo="Agency Name"
            items={navItems.map((item, index) => {
              // Different colors for each card to make them visually distinct
              const cardColors = [
                { bg: "#fef3c7", text: "#92400e" }, // Amber
                { bg: "#dbeafe", text: "#1e40af" }, // Blue
                { bg: "#dcfce7", text: "#166534" }, // Green
                { bg: "#fce7f3", text: "#be185d" }  // Pink
              ];
              const colors = cardColors[index % cardColors.length];
              
              return {
                label: item.label,
                bgColor: colors.bg,
                textColor: colors.text,
                links: [{
                  label: item.label,
                  href: item.href,
                  ariaLabel: item.label
                }]
              };
            })}
            baseColor="#ffffff"
            menuColor="#1f2937"
            buttonBgColor={getButtonColor()}
            buttonTextColor={getButtonTextColor()}
            className={className}
            leftOfCta={(
              <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
                <ThemeToggle />
                <CustomizeMorphCard />
              </div>
            )}
          />
        )
      default:
        return <TraditionalNav />
    }
  }

  return (
    <LayoutGroup id="nav-customize">
      {renderNavigation()}
    </LayoutGroup>
  )
}

export default Navigation 
