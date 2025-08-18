import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedMenu from '@/components/FeaturedMenu'
import About from '@/components/About'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import OrderNowBanner from '@/components/OrderNowBanner'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedMenu />
      <About />
      <Reviews />
      <Contact />
      <OrderNowBanner />
      <Footer />
    </main>
  )
} 