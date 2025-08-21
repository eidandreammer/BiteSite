'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PillNav from './PillNav/PillNavNext'
import CardNav from './CardNav/CardNavNext'
import { useBackground } from '@/contexts/BackgroundContext'
import './Navigation.css'

type NavStyle = 'traditional' | 'pill' | 'card'

interface NavigationProps {
  className?: string
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const { getButtonColor } = useBackground()
  const [navStyle, setNavStyle] = useState<NavStyle>('traditional')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isStyleSelectorMinimized, setIsStyleSelectorMinimized] = useState(true)
  const pathname = usePathname()

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
  }, [pathname])

  // Traditional Navigation Component
  const TraditionalNav = () => (
    <nav className={`traditional-nav ${className}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/" className="nav-logo">
            Agency Name
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              style={pathname === item.href ? { 
                borderBottomColor: getButtonColor(),
                color: getButtonColor(),
                '--active-underline-color': getButtonColor()
              } : {}}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
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
  const StyleSelector = () => (
    <div className={`style-selector ${isStyleSelectorMinimized ? 'minimized' : 'expanded'}`}>
      {isStyleSelectorMinimized ? (
        <button 
          className="style-selector-toggle"
          onClick={() => setIsStyleSelectorMinimized(false)}
          aria-label="Open navigation style selector"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
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
            <button
              className={`style-btn ${navStyle === 'card' ? 'active' : ''}`}
              onClick={() => setNavStyle('card')}
              style={navStyle === 'card' ? { backgroundColor: getButtonColor() } : {}}
            >
              Card
            </button>
          </div>
        </div>
      )}
    </div>
  )

  // Render the appropriate navigation style
  const renderNavigation = () => {
    switch (navStyle) {
      case 'pill':
        return (
          <PillNav
            logo="Agency Name"
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
            buttonTextColor="#ffffff"
            className={className}
          />
        )
      default:
        return <TraditionalNav />
    }
  }

  return (
    <>
      <StyleSelector />
      {renderNavigation()}
    </>
  )
}

export default Navigation 
