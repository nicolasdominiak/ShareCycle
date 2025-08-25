import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') // Check if this is a recovery flow
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  // Handle errors first
  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/auth/reset-password?error=callback_error`)
  }

  if (code) {
    const supabase = await createClient()
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!exchangeError && data.session) {
      // Check if this is a password recovery flow
      const isRecoveryFlow = type === 'recovery' || 
                           next.includes('/auth/update-password') ||
                           data.session.user.recovery_sent_at !== null
      
      console.log('Auth callback - Recovery flow detected:', isRecoveryFlow, {
        type,
        next,
        recovery_sent_at: data.session.user.recovery_sent_at
      })
      
      if (isRecoveryFlow) {
        // For recovery flows, always redirect to update-password page
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}/auth/update-password?recovery=true`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}/auth/update-password?recovery=true`)
        } else {
          return NextResponse.redirect(`${origin}/auth/update-password?recovery=true`)
        }
      }
      
      // For normal authentication flows, use the next parameter
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
      console.error('Session exchange error:', exchangeError)
      return NextResponse.redirect(`${origin}/auth/reset-password?error=session_error`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
} 