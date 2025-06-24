'use client'

import { Header } from './header'
import { Footer } from './footer'
import { BottomNavigation } from './bottom-navigation'
import { useUser } from '@/hooks/use-user'

interface ClientMainLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
  showBottomNav?: boolean
  className?: string
}

export function ClientMainLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  showBottomNav = true,
  className = ''
}: ClientMainLayoutProps) {
  // Obtém o usuário atual usando o hook useUser
  const { user, loading, error } = useUser()

  // Durante o carregamento ou erro, renderiza um layout simples
  if (loading || error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-primary-950 dark:via-background dark:to-secondary-950">
        {showHeader && <Header user={null} />}
        
        <main className={`flex-1 ${className} ${showBottomNav ? 'pb-16 md:pb-0' : ''}`}>
          {children}
        </main>
        
        {showFooter && <Footer />}
        {showBottomNav && <BottomNavigation user={null} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-primary-950 dark:via-background dark:to-secondary-950">
      {showHeader && <Header user={user} />}
      
      <main className={`flex-1 ${className} ${showBottomNav ? 'pb-16 md:pb-0' : ''}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
      {showBottomNav && <BottomNavigation user={user} />}
    </div>
  )
} 