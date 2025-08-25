import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { UpdatePasswordForm } from '@/components/forms/update-password-form'
import { ErrorAlert } from '@/components/ui/error-alert'
import { SuccessAlert } from '@/components/ui/success-alert'
import { getAuthError, getAuthSuccess } from '@/lib/auth/error-handling'
import { updatePassword } from '@/lib/auth/actions'

export const metadata: Metadata = {
  title: 'Definir Nova Senha | ShareCycle',
  description: 'Defina uma nova senha para sua conta ShareCycle',
}

interface UpdatePasswordPageProps {
  searchParams: Promise<{ error?: string; message?: string }>
}

export default async function UpdatePasswordPage({ searchParams }: UpdatePasswordPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  // Enhanced session validation function
  const validateUserSession = async (user: any, params: any) => {
    // Check if this is explicitly a recovery flow from URL params
    const isRecoveryFromParams = params.recovery === 'true'
    
    // If user doesn't have a valid session, reject
    if (!user) {
      return { isValid: false, isRecoverySession: false }
    }
    
    // If this is explicitly marked as recovery, allow it
    if (isRecoveryFromParams) {
      return { isValid: true, isRecoverySession: true }
    }
    
    // If user has a very recent sign-in (within 5 minutes), they might be trying to access this page directly
    // In that case, redirect them home unless they came from a recovery flow
    if (user.last_sign_in_at) {
      const lastSignIn = new Date(user.last_sign_in_at)
      const now = new Date()
      const timeDiff = now.getTime() - lastSignIn.getTime()
      const minutesDiff = timeDiff / (1000 * 60)
      
      // If signed in very recently (within 5 minutes) and not from recovery, redirect home
      if (minutesDiff < 5) {
        return { isValid: false, isRecoverySession: false, shouldRedirectHome: true }
      }
    }
    
    // Allow access for older sessions (user might be legitimately trying to change password)
    return { isValid: true, isRecoverySession: false }
  }

  // Enhanced session validation
  if (!user || userError) {
    const errorCode = userError ? 'invalid_session' : 'expired_token'
    redirect(`/auth/reset-password?error=${errorCode}`)
  }

  const sessionValidation = await validateUserSession(user, params)
  
  if (!sessionValidation.isValid) {
    if (sessionValidation.shouldRedirectHome) {
      redirect('/')
    } else {
      redirect('/auth/reset-password?error=invalid_session')
    }
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center px-4 py-8 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left side - Brand section (hidden on mobile) */}
      <div 
        className="relative hidden h-full flex-col bg-muted p-6 text-white lg:flex lg:p-10 dark:border-r"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="m2 17 10 5 10-5" />
            <path d="m2 12 10 5 10-5" />
          </svg>
          ShareCycle
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Quase lá! Defina sua nova senha para recuperar o acesso à sua conta.&rdquo;
            </p>
            <footer className="text-sm">Suporte ShareCycle</footer>
          </blockquote>
        </div>
      </div>

      {/* Right side - Form section */}
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] lg:w-[450px]">
          {/* Skip link for accessibility */}
          <a 
            href="#main-form" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
          >
            Pular para o formulário principal
          </a>

          {/* Mobile brand header */}
          <div className="flex items-center justify-center text-lg font-medium lg:hidden mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6 text-green-600"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="m2 17 10 5 10-5" />
              <path d="m2 12 10 5 10-5" />
            </svg>
            ShareCycle
          </div>

          {/* Page header */}
          <header className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Definir nova senha
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground px-2">
              Digite sua nova senha para completar a recuperação da sua conta
            </p>
          </header>
          
          {/* Error messages */}
          {params.error && (
            <div role="alert" aria-live="assertive">
              <ErrorAlert 
                error={getAuthError(params.error)}
                showRetryButton={['network_error', 'server_error', 'update_failed'].includes(params.error)}
              />
            </div>
          )}
          
          {/* Success messages */}
          {params.message && (
            <div role="alert" aria-live="polite">
              <SuccessAlert 
                success={getAuthSuccess(params.message)}
                showContinueButton={params.message === 'password_updated'}
                continueHref="/auth/login"
                continueText="Fazer login"
              />
            </div>
          )}
          
          {/* Main form */}
          <main id="main-form">
            <UpdatePasswordForm action={updatePassword} />
          </main>
          
          {/* Footer links */}
          <footer className="px-4 text-center text-sm sm:text-base text-muted-foreground space-y-3">
            <p>
              Problemas com o link?{' '}
              <Link
                href="/auth/reset-password"
                className="underline underline-offset-4 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Solicitar novo link
              </Link>
            </p>
            <p>
              Lembrou da senha?{' '}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Fazer login
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}