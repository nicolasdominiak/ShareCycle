import { Header } from './header'
import { Footer } from './footer'
import { BottomNavigation } from './bottom-navigation'
import { createClient } from '@/lib/supabase/server'

interface MainLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
  showBottomNav?: boolean
  className?: string
}

export async function MainLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  showBottomNav = true,
  className = ''
}: MainLayoutProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header user={user} />}
      
      <main className={`flex-1 ${className} ${showBottomNav ? 'pb-16 md:pb-0' : ''}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
      {showBottomNav && <BottomNavigation user={user} />}
    </div>
  )
} 