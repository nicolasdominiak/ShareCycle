'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { useUser } from '@/hooks/use-user'

interface HomePageActionsProps {
  user?: User | null
}

export function HomePageActions({ user: propUser }: HomePageActionsProps) {
  const { user: hookUser } = useUser()
  const user = propUser ?? hookUser
  if (user) {
    // Se o usuário está logado, redireciona para as funcionalidades principais
    return (
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/donations/new">
            Começar a Doar
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/donations">
            Buscar Doações
          </Link>
        </Button>
      </div>
    )
  }

  // Se o usuário não está logado, redireciona para autenticação
  return (
    <div className="space-y-6">
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/auth/register">
            Começar a Doar
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/auth/register">
            Buscar Doações
          </Link>
        </Button>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center">
          <div className="h-px bg-neutral-300 flex-1 max-w-16"></div>
          <p className="text-sm text-neutral-600 px-4">
            Já tem uma conta?
          </p>
          <div className="h-px bg-neutral-300 flex-1 max-w-16"></div>
        </div>
        <div className="mt-3">
          <Button variant="ghost" size="sm" asChild>
            <Link 
              href="/auth/login" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Fazer login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 