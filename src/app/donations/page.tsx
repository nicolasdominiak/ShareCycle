import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DonationsList } from '@/components/donations/donations-list'
import { DonationsFilters } from '@/components/donations/donations-filters'

export const metadata: Metadata = {
  title: 'Doações - ShareCycle',
  description: 'Encontre doações disponíveis em sua comunidade',
}

interface DonationsPageProps {
  searchParams: Promise<{
    search?: string
    category?: string
    city?: string
    orderBy?: string
    nearMe?: string
    lat?: string
    lng?: string
  }>
}

export default async function DonationsPage({ searchParams }: DonationsPageProps) {
  const params = await searchParams
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Doações Disponíveis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Encontre itens disponíveis para doação em sua comunidade
          </p>
        </div>
        
        <Button asChild>
          <Link href="/donations/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Doação
          </Link>
        </Button>
      </div>
      
      {/* Filtros */}
      <div className="mb-6">
        <DonationsFilters />
      </div>
      
      {/* Lista de doações */}
      <DonationsList searchParams={params} />
    </div>
  )
} 