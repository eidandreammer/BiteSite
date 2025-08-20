import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Your Agency Name',
  description: 'Detailed explanation of our pricing and why each service is valuable, with citations to credible sources.'
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            We price transparently because the value should be clear. Below is how each part of our service contributes to measurable outcomes, with sources from research firms and platform documentation.
          </p>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Custom Design & Brand Fit</h2>
            <p className="text-gray-700 max-w-3xl">
              Tailored interfaces improve clarity of value propositions and reduce decision friction, contributing to higher conversion rates compared to generic templates.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Mobile‑First, Responsive Implementation</h2>
            <p className="text-gray-700 max-w-3xl">
              Mobile usability directly affects revenue; a 0.1s improvement in mobile site speed can increase conversion rates, and Google uses mobile friendliness for search rankings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Performance Optimization</h2>
            <p className="text-gray-700 max-w-3xl">
              Faster websites reduce bounce and increase engagement. Even small latency improvements can have outsized effects on conversion and user satisfaction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Conversion‑Focused UX</h2>
            <p className="text-gray-700 max-w-3xl">
              Clear information architecture, strong calls‑to‑action, and reduced cognitive load are tied to higher task success and sales. UX investments produce substantial ROI when aligned to user goals.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Technical SEO & Structured Data</h2>
            <p className="text-gray-700 max-w-3xl">
              Clean markup, structured data, proper indexing, and performance best practices support discoverability and click‑through from search.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Analytics & Measurement</h2>
            <p className="text-gray-700 max-w-3xl">
              Reliable analytics and conversion tracking enable evidence‑based iteration, improving marketing efficiency and ROI over time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Accessibility & Compliance</h2>
            <p className="text-gray-700 max-w-3xl">
              Accessible experiences expand your addressable audience and reduce legal risk while improving usability for all users.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Security, Reliability, and Maintenance</h2>
            <p className="text-gray-700 max-w-3xl">
              Up‑to‑date dependencies, secure headers, and backup/monitoring practices protect reputation and minimize downtime costs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Paid Media Readiness (Google Ads)</h2>
            <p className="text-gray-700 max-w-3xl">
              High‑intent traffic only converts with aligned landing pages, high Quality Score factors, and complete conversion tracking — lowering CPA and improving ROAS.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sources</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Google: Page Experience, Core Web Vitals, and rankings —
              <a className="text-primary underline" href="https://developers.google.com/search/docs/appearance/page-experience" target="_blank" rel="noopener noreferrer">developers.google.com/search/docs/appearance/page-experience</a>
            </li>
            <li>
              Deloitte Digital (for Google): Milliseconds Make Millions —
              <a className="text-primary underline" href="https://www.thinkwithgoogle.com/intl/en-154/marketing-strategies/app-and-mobile/milliseconds-earn-millions/" target="_blank" rel="noopener noreferrer">thinkwithgoogle.com ... milliseconds‑earn‑millions</a>
            </li>
            <li>
              Google/SOASTA: The State of Online Retail Performance —
              <a className="text-primary underline" href="https://services.google.com/fh/files/misc/2017_online_retail_performance_whitepaper.pdf" target="_blank" rel="noopener noreferrer">google.com ... online_retail_performance_whitepaper.pdf</a>
            </li>
            <li>
              Nielsen Norman Group: UX research on conversion and usability —
              <a className="text-primary underline" href="https://www.nngroup.com/articles/" target="_blank" rel="noopener noreferrer">nngroup.com/articles</a>
            </li>
            <li>
              Baymard Institute: Checkout UX and e‑commerce guidelines —
              <a className="text-primary underline" href="https://baymard.com/research" target="_blank" rel="noopener noreferrer">baymard.com/research</a>
            </li>
            <li>
              Google: Quality Score factors and relevance —
              <a className="text-primary underline" href="https://support.google.com/google-ads/answer/6167118" target="_blank" rel="noopener noreferrer">support.google.com/google‑ads/answer/6167118</a>
            </li>
            <li>
              Google: Mobile‑friendly websites and Search —
              <a className="text-primary underline" href="https://developers.google.com/search/mobile-sites/" target="_blank" rel="noopener noreferrer">developers.google.com/search/mobile-sites</a>
            </li>
            <li>
              W3C/WAI: Web Content Accessibility Guidelines (WCAG) —
              <a className="text-primary underline" href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">w3.org/WAI/standards-guidelines/wcag</a>
            </li>
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="/start" className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">Start a Project</a>
            <a href="/" className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-gray-400 transition-colors">Back to Home</a>
          </div>
        </div>
      </section>
    </main>
  )
}


