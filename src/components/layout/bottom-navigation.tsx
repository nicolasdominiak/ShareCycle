'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Plus, Heart, User as UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

interface BottomNavigationItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  exact?: boolean
}

const navigationItems: BottomNavigationItem[] = [
  {
    icon: Home,
    label: 'Início',
    href: '/',
    exact: true
  },
  {
    icon: Search,
    label: 'Explorar',
    href: '/donations'
  },
  {
    icon: Plus,
    label: 'Doar',
    href: '/donations/new'
  },
  {
    icon: Heart,
    label: 'Favoritos',
    href: '/favorites'
  },
  {
    icon: UserIcon,
    label: 'Perfil',
    href: '/profile'
  }
]

interface BottomNavigationProps {
  user?: User | null
  className?: string
}

export function BottomNavigation({ user, className }: BottomNavigationProps) {
  const pathname = usePathname()

  // Não mostrar em páginas de autenticação
  if (pathname?.startsWith('/auth')) {
    return null
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden",
      className
    )}>
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          
          // Se não estiver logado, mostrar apenas Home e Explorar
          if (!user && !['/', '/donations'].includes(item.href)) {
            return (
              <div key={item.label} className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center space-y-1 h-full w-full rounded-none opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </div>
            )
          }

          return (
            <Link key={item.label} href={item.href} className="flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center space-y-1 h-full w-full rounded-none transition-colors",
                  active 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5",
                  active && "text-primary"
                )} />
                <span className={cn(
                  "text-xs font-medium",
                  active && "text-primary"
                )}>
                  {item.label}
                </span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 