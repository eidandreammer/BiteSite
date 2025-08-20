import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Professional Web Design Services - Transform Your Business',
    template: '%s | Professional Web Design Services'
  },
  description: 'Get a custom website that converts visitors into customers. Professional web design services with modern, responsive designs tailored to your business needs.',
  keywords: ['web design', 'website development', 'custom websites', 'business websites', 'responsive design'],
  authors: [{ name: 'Your Agency Name' }],
  creator: 'Your Agency Name',
  publisher: 'Your Agency Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Professional Web Design Services',
    title: 'Professional Web Design Services - Transform Your Business',
    description: 'Get a custom website that converts visitors into customers. Professional web design services with modern, responsive designs.',
    images: [
      {
        url: '/api/og?title=Web%20Design%20Services',
        width: 1200,
        height: 630,
        alt: 'Professional Web Design Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@youragency',
    creator: '@youragency',
    title: 'Professional Web Design Services - Transform Your Business',
    description: 'Get a custom website that converts visitors into customers.',
    images: ['/api/og?title=Web%20Design%20Services'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* Cloudflare Turnstile script loaded client-side only to avoid hydration mismatch */}
        <script
          dangerouslySetInnerHTML={{ __html: `
            if (typeof window !== 'undefined') {
              (function(){
                var s=document.createElement('script');
                s.src='https://challenges.cloudflare.com/turnstile/v0/api.js';
                s.async=true; s.defer=true; document.head.appendChild(s);
              })();
            }
          ` }}
        />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
