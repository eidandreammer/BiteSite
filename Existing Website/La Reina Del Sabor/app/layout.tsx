import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'La Reina Del Sabor - Best Dominican Food in Hackensack, NJ',
  description: 'Authentic Dominican cuisine in Hackensack, NJ. Order delicious mangu, mofongo, pernil, and more for delivery or takeout. 137 1/2 Main St, Hackensack, NJ 07601.',
  keywords: 'Dominican food, Hackensack, NJ, mangu, mofongo, pernil, Caribbean cuisine, delivery, takeout',
  authors: [{ name: 'La Reina Del Sabor' }],
  creator: 'La Reina Del Sabor',
  publisher: 'La Reina Del Sabor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lareinadelsabor.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'La Reina Del Sabor - Best Dominican Food in Hackensack, NJ',
    description: 'Authentic Dominican cuisine in Hackensack, NJ. Order delicious mangu, mofongo, pernil, and more for delivery or takeout.',
    url: 'https://lareinadelsabor.com',
    siteName: 'La Reina Del Sabor',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La Reina Del Sabor - Dominican Restaurant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Reina Del Sabor - Best Dominican Food in Hackensack, NJ',
    description: 'Authentic Dominican cuisine in Hackensack, NJ. Order delicious mangu, mofongo, pernil, and more for delivery or takeout.',
    images: ['/og-image.jpg'],
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 