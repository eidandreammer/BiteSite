import { NextRequest, NextResponse } from 'next/server'
import { intakeSchema } from '@/lib/schema'
import { submitIntake } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = intakeSchema.parse(body)
    
    // Submit to Supabase
    const result = await submitIntake(validatedData)
    
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
