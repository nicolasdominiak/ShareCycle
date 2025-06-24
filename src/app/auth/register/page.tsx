import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RegisterForm } from '@/components/forms/register-form'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Criar Conta | ShareCycle',
  description: 'Crie sua conta ShareCycle e comece a fazer a diferença',
}

interface RegisterPageProps {
  searchParams: Promise<{ error?: string; message?: string }>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Se o usuário já está logado, redireciona para a home
  if (user) {
    redirect('/')
  }

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'validation_failed':
        return 'Dados inválidos. Verifique os campos e tente novamente.'
      case 'signup_failed':
        return 'Erro ao criar conta. Tente novamente.'
      default:
        return 'Erro ao criar conta. Tente novamente.'
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
              &ldquo;Junte-se à nossa comunidade e comece a fazer a diferença hoje mesmo.&rdquo;
            </p>
            <footer className="text-sm">Bem-vindo ao ShareCycle</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para criar sua conta
            </p>
          </div>
          
          {params.error && (
            <Alert variant="destructive">
              <AlertDescription>
                {getErrorMessage(params.error)}
              </AlertDescription>
            </Alert>
          )}
          
          <RegisterForm />
          
          <div className="px-8 text-center text-sm text-muted-foreground">
            <p>
              Já tem uma conta?{' '}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Fazer login
              </Link>
            </p>
          </div>
          
          <p className="px-8 text-center text-xs text-muted-foreground">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 