import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { MyDonationsNavigation } from '@/components/donations/my-donations-navigation'

export const metadata: Metadata = {
  title: 'Minhas Doações - ShareCycle',
  description: 'Gerencie suas doações cadastradas no ShareCycle',
}

export default async function MyDonationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Painel do Doador
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas doações e solicitações recebidas
        </p>
      </div>

      <MyDonationsNavigation />
      
      <div className="mt-8">
        {children}
      </div>
    </div>
  )
} 