import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ResetPasswordForm } from '@/components/forms/reset-password-form'
import { ErrorAlert } from '@/components/ui/error-alert'
import { SuccessAlert } from '@/components/ui/success-alert'
import { getAuthError, getAuthSuccess } from '@/lib/auth/error-handling'

export const metadata: Metadata = {
  title: 'Recuperar Senha | ShareCycle',
  description: 'Recupere o acesso à sua conta ShareCycle',
}

interface ResetPasswordPageProps {
  searchParams: Promise<{ error?: string; message?: string }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Se o usuário já está logado, redireciona para a home
  if (user) {
    redirect('/')
  }

  // Enhanced error mapping for reset password
  const getResetPasswordError = (errorCode: string) => {
    const errorMap: Record<string, any> = {
      invalid_email: {
        code: 'invalid_email',
        message: 'Email inválido',
        description: 'O endereço de email fornecido não é válido.',
        recoveryInstructions: [
          'Verifique se o email está digitado corretamente',
          'Certifique-se de incluir @ e o domínio',
          'Tente usar um email diferente se necessário'
        ],
        actionable: true,
        severity: 'low' as const
      },
      reset_failed: {
        code: 'reset_failed',
        message: 'Erro ao enviar email',
        description: 'Não foi possível enviar o email de recuperação.',
        recoveryInstructions: [
          'Verifique sua conexão com a internet',
          'Tente novamente em alguns minutos',
          'Certifique-se de que o email existe em nossa base'
        ],
        actionable: true,
        severity: 'medium' as const
      }
    }
    
    return errorMap[errorCode] || getAuthError(errorCode)
  }

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
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
              &ldquo;Não se preocupe, estamos aqui para ajudar você a recuperar o acesso.&rdquo;
            </p>
            <footer className="text-sm">Suporte ShareCycle</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Recuperar senha
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email para receber um link de recuperação
            </p>
          </div>
          
          {params.error && (
            <ErrorAlert 
              error={getResetPasswordError(params.error)}
              showRetryButton={params.error === 'reset_failed'}
            />
          )}
          
          {params.message && (
            <SuccessAlert 
              success={params.message === 'check_email' ? getAuthSuccess('reset_email_sent') : getAuthSuccess(params.message)}
            />
          )}
          
          <ResetPasswordForm />
          
          <div className="px-8 text-center text-sm text-muted-foreground">
            <p>
              Lembrou da senha?{' '}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Fazer login
              </Link>
            </p>
            <p className="mt-2">
              Não tem uma conta?{' '}
              <Link
                href="/auth/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 