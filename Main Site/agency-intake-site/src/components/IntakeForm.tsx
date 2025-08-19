'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { intakeSchema, IntakeFormData } from '@/lib/schema'
import { submitIntake } from '@/lib/supabase'
import ColorWheel from './ColorWheel'
import TemplatePicker from './TemplatePicker'
import dynamic from 'next/dynamic'

// Load font variables only when this step is visible to reduce global font cost
const FontVariablesProvider = dynamic(() => import('./FontVariablesProvider'), { ssr: false, loading: () => <></> })

const steps = [
  { id: 1, title: 'Business Info', description: 'Basic business details' },
  { id: 2, title: 'Goals & Pages', description: 'What you want to achieve' },
  { id: 3, title: 'Style & Colors', description: 'Visual preferences' },
  { id: 4, title: 'Templates', description: 'Choose your layout' },
  { id: 5, title: 'Features', description: 'Additional functionality' },
  { id: 6, title: 'Review', description: 'Final review & submit' }
]

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      business: {
        name: '',
        industry: '',
        address: '',
        phone: '',
        domain: '',
        socials: {}
      },
      goals: {
        conversions: [],
        pages: []
      },
      color: {
        brand: '#3B82F6',
        mode: 'auto',
        palette: ['#3B82F6']
      },
      fonts: {
        headings: 'modern',
        body: 'modern'
      },
      templates: [],
      features: [],
      admin: {
        timeline: '3-4_weeks',
        plan: 'standard'
      }
    },
    mode: 'onChange'
  })

  const watchedValues = watch()

  const resolveFontVar = (value: string) => {
    switch (value) {
      case 'modern':
      case 'inter':
        return 'var(--font-inter)'
      case 'geometric_sans':
      case 'poppins':
        return 'var(--font-poppins)'
      case 'montserrat':
        return 'var(--font-montserrat)'
      case 'raleway':
        return 'var(--font-raleway)'
      case 'nunito':
        return 'var(--font-nunito)'
      case 'lato':
        return 'var(--font-lato)'
      case 'quicksand':
        return 'var(--font-quicksand)'
      case 'classic_serif':
      case 'playfair_display':
        return 'var(--font-playfair)'
      case 'merriweather':
        return 'var(--font-merriweather)'
      case 'lora':
        return 'var(--font-lora)'
      case 'roboto_slab':
        return 'var(--font-roboto-slab)'
      case 'playful':
      case 'comic_neue':
        return 'var(--font-comic-neue)'
      default:
        return 'inherit'
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setSlideDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setSlideDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true)
    setSubmissionResult(null)

    try {
      const result = await submitIntake(data)
      if (result.success) {
        setSubmissionResult({
          success: true,
          message: `Thank you! Your project has been submitted successfully. Project ID: ${result.id}`
        })
      } else {
        setSubmissionResult({
          success: false,
          message: `Submission failed: ${result.error}`
        })
      }
    } catch (error) {
      setSubmissionResult({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <Controller
                  name="business.name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your Business Name"
                    />
                  )}
                />
                {errors.business?.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.business.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <Controller
                  name="business.industry"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Restaurant, Law Firm, Salon"
                    />
                  )}
                />
                {errors.business?.industry && (
                  <p className="text-red-600 text-sm mt-1">{errors.business.industry.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <Controller
                  name="business.address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="123 Main St, City, State"
                    />
                  )}
                />
                {errors.business?.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.business.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <Controller
                  name="business.phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  )}
                />
                {errors.business?.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.business.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain (Optional)
                </label>
                <Controller
                  name="business.domain"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://yourbusiness.com"
                    />
                  )}
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Goals & Pages</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What are your main conversion goals? *
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {['calls', 'bookings', 'orders', 'lead_form'].map((goal) => (
                    <label key={goal} className="flex items-center space-x-3 cursor-pointer">
                      <Controller
                        name="goals.conversions"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value.includes(goal as any)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, goal])
                              } else {
                                field.onChange(field.value.filter((g: string) => g !== goal))
                              }
                            }}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        )}
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {goal.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.goals?.conversions && (
                  <p className="text-red-600 text-sm mt-1">{errors.goals.conversions.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What pages do you need? *
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {['Home', 'About', 'Services', 'Contact', 'Blog', 'Menu', 'Products'].map((page) => (
                    <label key={page} className="flex items-center space-x-3 cursor-pointer">
                      <Controller
                        name="goals.pages"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value.includes(page as any)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, page])
                              } else {
                                field.onChange(field.value.filter((p: string) => p !== page))
                              }
                            }}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                        )}
                      />
                      <span className="text-sm text-gray-700">{page}</span>
                    </label>
                  ))}
                </div>
                {errors.goals?.pages && (
                  <p className="text-red-600 text-sm mt-1">{errors.goals.pages.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Style & Colors</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Brand Color *
                </label>
                <Controller
                  name="color.brand"
                  control={control}
                  render={({ field }) => (
                    <ColorWheel
                      value={field.value}
                      onChange={field.onChange}
                      onPaletteChange={(palette) => setValue('color.palette', palette)}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color Mode
                </label>
                <Controller
                  name="color.mode"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="auto">Auto (follows system)</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Typography Style
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Headings</label>
                    <Controller
                      name="fonts.headings"
                      control={control}
                      render={({ field }) => (
                        <FontVariablesProvider>
                          <select
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            style={{ fontFamily: resolveFontVar(field.value) }}
                          >
                            {/* Categories (original options) */}
                            <option value="modern" style={{ fontFamily: 'var(--font-inter)' }}>Modern Sans (Inter)</option>
                            <option value="classic_serif" style={{ fontFamily: 'var(--font-playfair)' }}>Classic Serif (Playfair Display)</option>
                            <option value="geometric_sans" style={{ fontFamily: 'var(--font-poppins)' }}>Geometric Sans (Poppins)</option>
                            <option value="playful" style={{ fontFamily: 'var(--font-comic-neue)' }}>Playful (Comic Neue)</option>

                            {/* Specific font families */}
                            <option value="inter" style={{ fontFamily: 'var(--font-inter)' }}>Inter</option>
                            <option value="poppins" style={{ fontFamily: 'var(--font-poppins)' }}>Poppins</option>
                            <option value="montserrat" style={{ fontFamily: 'var(--font-montserrat)' }}>Montserrat</option>
                            <option value="raleway" style={{ fontFamily: 'var(--font-raleway)' }}>Raleway</option>
                            <option value="nunito" style={{ fontFamily: 'var(--font-nunito)' }}>Nunito</option>
                            <option value="lato" style={{ fontFamily: 'var(--font-lato)' }}>Lato</option>
                            <option value="quicksand" style={{ fontFamily: 'var(--font-quicksand)' }}>Quicksand</option>
                            <option value="playfair_display" style={{ fontFamily: 'var(--font-playfair)' }}>Playfair Display</option>
                            <option value="merriweather" style={{ fontFamily: 'var(--font-merriweather)' }}>Merriweather</option>
                            <option value="lora" style={{ fontFamily: 'var(--font-lora)' }}>Lora</option>
                            <option value="roboto_slab" style={{ fontFamily: 'var(--font-roboto-slab)' }}>Roboto Slab</option>
                            <option value="comic_neue" style={{ fontFamily: 'var(--font-comic-neue)' }}>Comic Neue</option>
                          </select>
                        </FontVariablesProvider>
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Body Text</label>
                    <Controller
                      name="fonts.body"
                      control={control}
                      render={({ field }) => (
                        <FontVariablesProvider>
                          <select
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            style={{ fontFamily: resolveFontVar(field.value) }}
                          >
                            {/* Categories (original options) */}
                            <option value="modern" style={{ fontFamily: 'var(--font-inter)' }}>Modern Sans (Inter)</option>
                            <option value="classic_serif" style={{ fontFamily: 'var(--font-playfair)' }}>Classic Serif (Playfair Display)</option>
                            <option value="geometric_sans" style={{ fontFamily: 'var(--font-poppins)' }}>Geometric Sans (Poppins)</option>
                            <option value="playful" style={{ fontFamily: 'var(--font-comic-neue)' }}>Playful (Comic Neue)</option>

                            {/* Specific font families */}
                            <option value="inter" style={{ fontFamily: 'var(--font-inter)' }}>Inter</option>
                            <option value="poppins" style={{ fontFamily: 'var(--font-poppins)' }}>Poppins</option>
                            <option value="montserrat" style={{ fontFamily: 'var(--font-montserrat)' }}>Montserrat</option>
                            <option value="raleway" style={{ fontFamily: 'var(--font-raleway)' }}>Raleway</option>
                            <option value="nunito" style={{ fontFamily: 'var(--font-nunito)' }}>Nunito</option>
                            <option value="lato" style={{ fontFamily: 'var(--font-lato)' }}>Lato</option>
                            <option value="quicksand" style={{ fontFamily: 'var(--font-quicksand)' }}>Quicksand</option>
                            <option value="playfair_display" style={{ fontFamily: 'var(--font-playfair)' }}>Playfair Display</option>
                            <option value="merriweather" style={{ fontFamily: 'var(--font-merriweather)' }}>Merriweather</option>
                            <option value="lora" style={{ fontFamily: 'var(--font-lora)' }}>Lora</option>
                            <option value="roboto_slab" style={{ fontFamily: 'var(--font-roboto-slab)' }}>Roboto Slab</option>
                            <option value="comic_neue" style={{ fontFamily: 'var(--font-comic-neue)' }}>Comic Neue</option>
                          </select>
                        </FontVariablesProvider>
                      )}
                    />
                  </div>
                </div>
                <FontVariablesProvider>
                  <div className="mt-4 space-y-2">
                    <div
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: resolveFontVar(watchedValues.fonts?.headings || 'inter') }}
                    >
                      Heading Preview
                    </div>
                    <div
                      className="text-gray-700"
                      style={{ fontFamily: resolveFontVar(watchedValues.fonts?.body || 'inter') }}
                    >
                      The quick brown fox jumps over the lazy dog.
                    </div>
                  </div>
                </FontVariablesProvider>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Templates & Inspiration</h2>
            
            <Controller
              name="templates"
              control={control}
              render={({ field }) => (
                <Controller
                  name="referenceUrls"
                  control={control}
                  render={({ field: refField }) => (
                    <TemplatePicker
                      selectedTemplates={field.value}
                      onTemplatesChange={field.onChange}
                      referenceUrls={refField.value || []}
                      onReferenceUrlsChange={refField.onChange}
                    />
                  )}
                />
              )}
            />
            
            {errors.templates && (
              <p className="text-red-600 text-sm">{errors.templates.message}</p>
            )}
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Additional Features</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select additional features you'd like:
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  'booking', 'menu_catalog', 'gift_cards', 'testimonials', 'gallery', 
                  'blog', 'faq', 'map', 'hours', 'contact_form', 'chat', 'analytics'
                ].map((feature) => (
                  <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                    <Controller
                      name="features"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value?.includes(feature as any) || false}
                          onChange={(e) => {
                            const currentFeatures = field.value || []
                            if (e.target.checked) {
                              field.onChange([...currentFeatures, feature])
                            } else {
                              field.onChange(currentFeatures.filter((f: string) => f !== feature))
                            }
                          }}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      )}
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {feature.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <Controller
                  name="admin.timeline"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="1-2_weeks">1-2 weeks</option>
                      <option value="3-4_weeks">3-4 weeks</option>
                      <option value="1-2_months">1-2 months</option>
                      <option value="3+_months">3+ months</option>
                    </select>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan
                </label>
                <Controller
                  name="admin.plan"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  )}
                />
              </div>
            </div>
          </motion.div>
        )

      case 6:
        return (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Business Details</h3>
                <p className="text-gray-600">{watchedValues.business?.name} - {watchedValues.business?.industry}</p>
                <p className="text-gray-600">{watchedValues.business?.address}</p>
                <p className="text-gray-600">{watchedValues.business?.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Goals</h3>
                <p className="text-gray-600">Conversions: {watchedValues.goals?.conversions?.join(', ')}</p>
                <p className="text-gray-600">Pages: {watchedValues.goals?.pages?.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Style</h3>
                <p className="text-gray-600">Brand Color: {watchedValues.color?.brand}</p>
                <p className="text-gray-600">Fonts: {watchedValues.fonts?.headings} / {watchedValues.fonts?.body}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">Templates</h3>
                <p className="text-gray-600">{watchedValues.templates?.join(', ')}</p>
              </div>
            </div>

            {submissionResult && (
              <div className={`p-4 rounded-lg ${
                submissionResult.success 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submissionResult.message}
              </div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar - Carousel */}
      <div className="mb-8">
        <div className="relative mb-4">
          {/* Edge indicators (lines going off-screen) */}
          {currentStep > 3 && (
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-8 bg-gray-300" />
          )}
          {steps.length - currentStep > 2 && (
            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-8 bg-gray-300" />
          )}

          <div className="overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ x: slideDirection * 40, opacity: 0.9 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -slideDirection * 40, opacity: 0.9 }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="flex items-center justify-center gap-3 sm:gap-4"
              >
                {(() => {
                  const currentIndex = currentStep - 1
                  const visible: Array<{ id: number; title: string; description: string; index: number }> = []
                  for (let i = currentIndex - 2; i <= currentIndex + 2; i++) {
                    if (i >= 0 && i < steps.length) {
                      visible.push({ ...steps[i], index: i })
                    }
                  }

                  return visible.map((step, idx) => {
                    const distance = Math.abs(step.index - currentIndex)
                    const sizeClass = distance === 0
                      ? 'w-12 h-12 text-base'
                      : distance === 1
                      ? 'w-8 h-8 text-sm'
                      : 'w-6 h-6 text-xs'
                    const circleActive = currentStep >= step.id
                    const isCompleted = currentStep > step.id

                    const circleClass = circleActive
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 bg-white text-gray-500'

                    return (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center rounded-full border-2 ${sizeClass} ${circleClass}`}>
                          {isCompleted ? (
                            <Check className={distance === 0 ? 'w-6 h-6' : distance === 1 ? 'w-4 h-4' : 'w-3 h-3'} />
                          ) : (
                            step.id
                          )}
                        </div>

                        {idx < visible.length - 1 && (
                          <div
                            className={`h-0.5 mx-1 sm:mx-2 ${distance === 0 ? 'w-12 sm:w-16' : distance === 1 ? 'w-10 sm:w-12' : 'w-8 sm:w-10'} ${
                              // Connector is active if the next step is <= current step
                              visible[idx + 1].id <= currentStep ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          />
                        )}
                      </div>
                    )
                  })
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
