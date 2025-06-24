import { MainLayout } from '@/components/layout/main-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticação - ShareCycle',
  description: 'Login e cadastro no ShareCycle',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
} 