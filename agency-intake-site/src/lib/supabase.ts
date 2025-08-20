import { createClient } from '@supabase/supabase-js'
import { IntakeFormData, Business } from './schema'
import { IntakePayload } from './intake.schema'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function submitIntake(intake: IntakeFormData, turnstileToken: string): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!supabase) {
    return { 
      success: false, 
      error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' 
    }
  }

  try {
    // Transform the old schema format to the new Edge Function format
    const goalMapping: Record<string, "Calls" | "Bookings" | "Orders" | "Lead Form"> = {
      'calls': 'Calls',
      'bookings': 'Bookings', 
      'orders': 'Orders',
      'lead_form': 'Lead Form'
    };

    const featureMapping: Record<string, string> = {
      'booking': 'Booking',
      'menu_catalog': 'Menu Catalog',
      'gift_cards': 'Gift Cards',
      'testimonials': 'Testimonials',
      'gallery': 'Gallery',
      'blog': 'Blog',
      'faq': 'FAQ',
      'map': 'Map',
      'hours': 'Hours',
      'contact_form': 'Contact Form',
      'chat': 'Chat',
      'analytics': 'Analytics'
    };

    const edgeFunctionPayload: IntakePayload = {
      business_name: intake.business.name || 'Test Business',
      industry: intake.business.industry || 'Technology',
      address: intake.business.address ? `${intake.business.address.streetAddress}, ${intake.business.address.city}, ${intake.business.address.state || ''} ${intake.business.address.zipCode}, ${intake.business.address.country}`.replace(/,\s*,/g, ',').replace(/^\s*,\s*/, '').replace(/\s*,\s*$/, '') : '123 Test Street',
      phone: intake.business.phone || '555-0123',
      domain: intake.business.domain || 'https://example.com',
      goals: intake.goals.conversions.map(g => goalMapping[g]).filter(Boolean),
      pages: intake.goals.pages,
      color: {
        selected: intake.color.brand || '#000000',
        mode: intake.color.mode === 'auto' ? 'Monochrome' : intake.color.mode === 'light' ? 'Complementary' : 'Analogous',
        palette: intake.color.palette || ['#000000']
      },
      typography: {
        headings: intake.fonts.headings || 'inter',
        body: intake.fonts.body || 'inter',
        style: intake.fonts.headings || 'inter',
        colorMode: intake.color.mode || 'auto'
      },
      templates: intake.templates as ("Style A" | "Style B")[] || ['Style A'],
      inspiration_urls: intake.referenceUrls || [],
      features: intake.features?.map(f => featureMapping[f]).filter(Boolean) as any || [],
      timeline: intake.admin?.timeline?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '3-4 weeks',
      plan: intake.admin?.plan?.charAt(0).toUpperCase() + (intake.admin?.plan?.slice(1) || 'standard'),
      organization: {
        name: intake.business.name || 'Test Business',
        website: intake.business.domain || 'https://example.com',
        phone: intake.business.phone || '555-0123',
        address: intake.business.address ? `${intake.business.address.streetAddress}, ${intake.business.address.city}, ${intake.business.address.state || ''} ${intake.business.address.zipCode}, ${intake.business.address.country}`.replace(/,\s*,/g, ',').replace(/^\s*,\s*/, '').replace(/\s*,\s*$/, '') : '123 Test Street',
        domain: intake.business.domain || 'https://example.com'
      },
      turnstileToken
    };
    
    // Submit to Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const response = await fetch(`${supabaseUrl}/functions/v1/intake-submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify(edgeFunctionPayload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit intake');
    }

    return { success: true, id: result.intakeId };
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

// Captcha-gated authentication functions
export async function authGate(email: string, password: string, mode: 'signin' | 'signup', turnstileToken: string): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/auth-gate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ email, password, mode, turnstileToken })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Authentication gate failed');
    }

    return { success: true, userId: result.userId };
  } catch (error) {
    console.error('Error in auth gate:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

export async function signInWithCaptcha(email: string, password: string, turnstileToken: string): Promise<{ success: boolean; error?: string }> {
  try {
    // First verify captcha through auth gate
    const gateResult = await authGate(email, password, 'signin', turnstileToken);
    if (!gateResult.success) {
      return gateResult;
    }

    // If captcha passes, proceed with normal sign in
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error signing in with captcha:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}
