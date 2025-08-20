import { NextRequest, NextResponse } from 'next/server'
import { intakeSchema } from '@/lib/schema'
import { submitIntake } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract turnstile token from request body
    const { turnstileToken, ...intakeData } = body
    
    if (!turnstileToken) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Turnstile token is required' 
        },
        { status: 400 }
      )
    }
    
    // Validate the intake data
    const validatedData = intakeSchema.parse(intakeData)
    
    // Submit to Supabase with turnstile token
    const result = await submitIntake(validatedData, turnstileToken)
    
    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          id: result.id,
          message: 'Intake submitted successfully' 
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
