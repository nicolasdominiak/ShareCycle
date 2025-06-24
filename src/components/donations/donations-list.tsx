import { Suspense } from 'react'
import { getFilteredDonations } from '@/lib/actions/donations'
import { DonationCard } from './donation-card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Package, AlertCircle } from 'lucide-react'

interface DonationsListProps {
  searchParams: {
    search?: string
    category?: string
    city?: string
    orderBy?: string
  }
}

async function DonationsContent({ searchParams }: DonationsListProps) {
  try {
    const donations = await getFilteredDonations(searchParams)

    if (donations.length === 0) {
      return (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nenhuma doação encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {Object.keys(searchParams).length > 0 
              ? 'Tente ajustar os filtros para encontrar mais doações disponíveis.'
              : 'Seja o primeiro a compartilhar algo! Clique em "Nova Doação" para começar.'
            }
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Estatísticas */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            {donations.length} {donations.length === 1 ? 'doação encontrada' : 'doações encontradas'}
          </span>
          {Object.keys(searchParams).length > 0 && (
            <span className="text-blue-600 dark:text-blue-400">
              Filtros aplicados
            </span>
          )}
        </div>

        {/* Grid de doações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              variant="public"
            />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Erro ao carregar doações:', error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Erro ao carregar doações. Tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    )
  }
}

export function DonationsList({ searchParams }: DonationsListProps) {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DonationsContent searchParams={searchParams} />
    </Suspense>
  )
} 