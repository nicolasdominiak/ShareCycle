import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/forms/login-form'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Login | ShareCycle',
  description: 'Faça login na sua conta ShareCycle',
}

interface LoginPageProps {
  searchParams: Promise<{ error?: string; message?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Se o usuário já está logado, redireciona para a home
  if (user) {
    redirect('/')
  }

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'invalid_credentials':
        return 'Email ou senha incorretos. Tente novamente.'
      default:
        return 'Erro ao fazer login. Tente novamente.'
    }
  }

  const getSuccessMessage = (message: string) => {
    switch (message) {
      case 'check_email':
        return 'Conta criada com sucesso! Verifique seu email para confirmar.'
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
              &ldquo;Transformar o excesso em oportunidade, conectando quem tem com quem precisa, um item por vez.&rdquo;
            </p>
            <footer className="text-sm">Missão ShareCycle</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Fazer login
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email e senha para acessar sua conta
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
          
          <LoginForm />
          
          <div className="px-8 text-center text-sm text-muted-foreground">
            <p>
              Não tem uma conta?{' '}
              <Link
                href="/auth/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Cadastre-se
              </Link>
            </p>
            <p className="mt-2">
              Esqueceu sua senha?{' '}
              <Link
                href="/auth/reset-password"
                className="underline underline-offset-4 hover:text-primary"
              >
                Recuperar senha
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 