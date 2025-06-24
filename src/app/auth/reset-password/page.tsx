import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ResetPasswordForm } from '@/components/forms/reset-password-form'
import { Alert, AlertDescription } from '@/components/ui/alert'

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

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'invalid_email':
        return 'Email inválido.'
      case 'reset_failed':
        return 'Erro ao enviar email de recuperação. Tente novamente.'
      default:
        return 'Erro ao enviar email de recuperação. Tente novamente.'
    }
  }

  const getSuccessMessage = (message: string) => {
    switch (message) {
      case 'check_email':
        return 'Email de recuperação enviado! Verifique sua caixa de entrada.'
      default:
        return message
    }
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
            <Alert variant="destructive">
              <AlertDescription>
                {getErrorMessage(params.error)}
              </AlertDescription>
            </Alert>
          )}
          
          {params.message && (
            <Alert>
              <AlertDescription>
                {getSuccessMessage(params.message)}
              </AlertDescription>
            </Alert>
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