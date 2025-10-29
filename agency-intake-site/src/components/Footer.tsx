import type { CSSProperties } from 'react'
import StarBorder from '@/components/StarBorder/StarBorder'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/start', label: 'Start a Project' },
]

const footerLinkStyle = {
  '--star-border-bg': 'rgba(15, 23, 42, 0.9)',
  '--star-border-text': '#f8fafc',
  '--star-border-border': 'rgba(94, 234, 212, 0.55)',
  '--star-border-padding-y': '0.4rem',
  '--star-border-padding-x': '1.1rem',
  '--star-border-radius': '9999px',
  '--star-border-font-size': '0.85rem',
} as CSSProperties

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-10 flex flex-col gap-6 text-sm text-slate-600">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
          <div className="text-center sm:text-left">&copy; {year} BiteSites. All rights reserved.</div>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-3">
            {footerLinks.map(({ href, label }) => {
              return (
                <StarBorder
                  key={href}
                  as="a"
                  href={href}
                  color="rgba(94, 234, 212, 0.9)"
                  speed="7s"
                  thickness={4}
                  className="transition-transform hover:-translate-y-0.5"
                  contentClassName="text-xs sm:text-sm font-semibold tracking-wide"
                  style={footerLinkStyle}
                >
                  {label}
                </StarBorder>
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}


