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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Fazer login
          </h1>
          <p className="text-sm text-muted-foreground">
            Digite seu email e senha para acessar sua conta
          </p>
        </div>
        
        {params.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {getErrorMessage(params.error)}
            </AlertDescription>
          </Alert>
        )}
        
        {params.message && (
          <Alert className="mb-6">
            <AlertDescription>
              {getSuccessMessage(params.message)}
            </AlertDescription>
          </Alert>
        )}
        
        <LoginForm />
        
        <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
          <p>
            Não tem uma conta?{' '}
            <Link
              href="/auth/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Cadastre-se
            </Link>
          </p>
          <p>
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
  )
} 