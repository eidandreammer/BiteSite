import GlareHover from '@/Animations/GlareHover/GlareHover.jsx'
import './GlareCtaCard.css'

type GlareCtaCardProps = {
  title: string
  description: string
  actionHref: string
  actionLabel: string
  className?: string
}

const CTA_BACKGROUND =
  'linear-gradient(140deg, rgba(10, 12, 46, 0.95) 0%, rgba(28, 16, 79, 0.92) 48%, rgba(62, 14, 112, 0.88) 100%)'

const combineClassNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ')

const GlareCtaCard = ({
  title,
  description,
  actionHref,
  actionLabel,
  className
}: GlareCtaCardProps) => {
  return (
    <GlareHover
      width="100%"
      height="auto"
      background={CTA_BACKGROUND}
      borderRadius="1rem"
      borderColor="rgba(255, 255, 255, 0.18)"
      glareColor="#c7d2ff"
      glareOpacity={0.32}
      glareSize={260}
      transitionDuration={780}
      className={combineClassNames(
        'w-full max-w-4xl mx-auto text-white shadow-xl rounded-2xl',
        className
      )}
      style={{ placeItems: 'stretch' }}
    >
      <div className="cta-magic-bento">
        <div className="cta-magic-bento__inner w-full px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
            {title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={actionHref}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg font-semibold bg-white text-primary hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {actionLabel}
            </a>
          </div>
        </div>
      </div>
    </GlareHover>
  )
}

export default GlareCtaCard
