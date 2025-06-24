import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'

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

  return <>{children}</>
} 