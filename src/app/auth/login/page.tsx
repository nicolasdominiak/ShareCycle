import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/forms/login-form'
import { ErrorAlert } from '@/components/ui/error-alert'
import { SuccessAlert } from '@/components/ui/success-alert'
import { getAuthError, getAuthSuccess } from '@/lib/auth/error-handling'

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

  // Enhanced error and success mapping for login
  const getLoginError = (errorCode: string) => {
    const errorMap: Record<string, any> = {
      invalid_credentials: {
        code: 'invalid_credentials',
        message: 'Credenciais inválidas',
        description: 'Email ou senha incorretos.',
        recoveryInstructions: [
          'Verifique se o email está digitado corretamente',
          'Certifique-se de que a senha está correta',
          'Tente recuperar sua senha se necessário'
        ],
        actionable: true,
        severity: 'low' as const
      }
    }
    
    return errorMap[errorCode] || getAuthError(errorCode)
  }

  const getLoginSuccess = (messageCode: string) => {
    const successMap: Record<string, any> = {
      check_email: {
        code: 'check_email',
        message: 'Conta criada com sucesso!',
        description: 'Verifique seu email para confirmar sua conta antes de fazer login.',
        nextSteps: [
          'Abra seu email e procure por nossa mensagem',
          'Clique no link de confirmação',
          'Retorne aqui para fazer login'
        ]
      },
      password_updated: getAuthSuccess('password_updated')
    }
    
    return successMap[messageCode] || getAuthSuccess(messageCode)
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
          <ErrorAlert 
            error={getLoginError(params.error)}
            className="mb-6"
          />
        )}
        
        {params.message && (
          <SuccessAlert 
            success={getLoginSuccess(params.message)}
            className="mb-6"
          />
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