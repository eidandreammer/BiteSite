import { z } from 'zod'

export const intakeSchema = z.object({
  business: z.object({
    name: z.string().min(1, 'Business name is required'),
    industry: z.string().min(1, 'Industry is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone is required'),
    domain: z.string().optional(),
    socials: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
  goals: z.object({
    conversions: z.array(z.enum(['calls', 'bookings', 'orders', 'lead_form'])).min(1, 'At least one conversion goal is required'),
    pages: z.array(z.enum(['Home', 'About', 'Services', 'Contact', 'Blog', 'Menu', 'Products'])).min(1, 'At least one page type is required'),
  }),
  referenceUrls: z.array(z.string().url('Must be a valid URL')).max(2, 'Maximum 2 reference URLs allowed').optional(),
  color: z.object({
    brand: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
    mode: z.enum(['light', 'dark', 'auto']).default('auto'),
    palette: z.array(z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color')).min(1, 'At least one palette color is required'),
  }),
  fonts: z.object({
    headings: z.enum(['modern', 'classic_serif', 'geometric_sans', 'playful']).default('modern'),
    body: z.enum(['modern', 'classic_serif', 'geometric_sans', 'playful']).default('modern'),
  }),
  templates: z.array(z.enum(['Template A', 'Template B'])).min(1, 'At least one template must be selected').max(2, 'Maximum 2 templates allowed'),
  features: z.array(z.enum([
    'booking', 'menu_catalog', 'gift_cards', 'testimonials', 'gallery', 
    'blog', 'faq', 'map', 'hours', 'contact_form', 'chat', 'analytics'
  ])).optional(),
  assets: z.object({
    logoUrl: z.string().url('Must be a valid URL').optional(),
  }).optional(),
  content: z.object({
    tagline: z.string().optional(),
    about: z.string().optional(),
  }).optional(),
  admin: z.object({
    timeline: z.enum(['1-2_weeks', '3-4_weeks', '1-2_months', '3+_months']).default('3-4_weeks'),
    plan: z.enum(['basic', 'standard', 'premium']).default('standard'),
    launchWindow: z.string().optional(),
  }).optional(),
})

export type IntakeFormData = z.infer<typeof intakeSchema>

export const businessSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  ...intakeSchema.shape,
})

export type Business = z.infer<typeof businessSchema>
