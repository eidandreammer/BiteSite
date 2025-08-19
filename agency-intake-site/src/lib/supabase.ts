import { createClient } from '@supabase/supabase-js'
import { IntakeFormData, Business } from './schema'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function submitIntake(intake: IntakeFormData): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!supabase) {
    return { 
      success: false, 
      error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' 
    }
  }

  try {
    const { data, error } = await supabase
      .from('intakes')
      .insert([intake])
      .select('id')
      .single()

    if (error) throw error

    return { success: true, id: data.id }
  } catch (error) {
    console.error('Error submitting intake:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

export async function getIntake(id: string): Promise<{ success: boolean; data?: Business; error?: string }> {
  if (!supabase) {
    return { 
      success: false, 
      error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' 
    }
  }

  try {
    const { data, error } = await supabase
      .from('intakes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data: data as Business }
  } catch (error) {
    console.error('Error fetching intake:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

export async function getAllIntakes(): Promise<{ success: boolean; data?: Business[]; error?: string }> {
  if (!supabase) {
    return { 
      success: false, 
      error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' 
    }
  }

  try {
    const { data, error } = await supabase
      .from('intakes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data: data as Business[] }
  } catch (error) {
    console.error('Error fetching intakes:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}
