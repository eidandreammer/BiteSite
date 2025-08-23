import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'
import { simpleIntakeSchema } from '@/lib/simple-intake.schema'
import { submitSimpleIntake } from '@/lib/supabase'

// Simple in-memory rate limiting for API route
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10
const ipHits: Map<string, number[]> = new Map()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const hits = ipHits.get(ip) || []
  const recent = hits.filter((t) => t > windowStart)
  recent.push(now)
  ipHits.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anon'
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, error: 'rate_limited' }, { status: 429 })
    }
    const body = await request.json()
    
    // Extract turnstile token from request body
    let { turnstileToken, ...intakeData } = body
    // Dev fallback: allow missing token in non-production
    if (!turnstileToken && process.env.NODE_ENV !== 'production') {
      turnstileToken = 'placeholder-token'
    } else if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Turnstile token is required' },
        { status: 400 }
      )
    }
    
    // Validate the intake data
    const validatedData = simpleIntakeSchema.parse({ ...intakeData, turnstileToken })
    
    // Submit to Supabase with turnstile token
    const result = await submitSimpleIntake(validatedData, turnstileToken)
    
    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          id: result.id,
          message: 'Lead submitted successfully' 
        },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Intake submission error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.message 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Intake API endpoint. Use POST to submit new intakes.' 
    },
    { status: 200 }
  )
}
