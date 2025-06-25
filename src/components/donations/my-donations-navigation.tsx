'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function MyDonationsNavigation() {
  const pathname = usePathname()
  
  // Determinar o valor da aba ativa baseado na rota
  const activeTab = pathname.includes('/requests') ? 'requests' : 'donations'

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="donations" asChild>
          <Link href="/donations/my-donations">
            Minhas Doações
          </Link>
        </TabsTrigger>
        <TabsTrigger value="requests" asChild>
          <Link href="/donations/my-donations/requests">
            Solicitações Recebidas
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
} 