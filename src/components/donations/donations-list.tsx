'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useDonations } from '@/hooks/use-donations'
import { DonationCard } from './donation-card'
import { DonationsListSkeleton } from './donations-list-skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Package, AlertCircle, Loader2 } from 'lucide-react'

interface DonationsListProps {
  searchParams: {
    search?: string
    category?: string
    city?: string
    orderBy?: string
  }
}

export function DonationsList({ searchParams }: DonationsListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useDonations(searchParams)

  // Função throttled para fetchNextPage
  const throttledFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Intersection Observer para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          throttledFetchNextPage()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Carregar quando estiver 100px antes de chegar ao final
      }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [throttledFetchNextPage])

  if (isLoading) {
    return <DonationsListSkeleton />
  }

  if (isError) {
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

  const allDonations = data?.pages.flatMap(page => page.data) || []
  const totalItems = data?.pages[0]?.totalItems || 0

  if (allDonations.length === 0) {
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
          {allDonations.length} de {totalItems} {totalItems === 1 ? 'doação' : 'doações'}
        </span>
        {Object.keys(searchParams).length > 0 && (
          <span className="text-primary dark:text-primary">
            Filtros aplicados
          </span>
        )}
      </div>

      {/* Grid de doações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allDonations.map((donation) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            variant="public"
          />
        ))}
      </div>

      {/* Loading mais itens */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Carregando mais doações...
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={throttledFetchNextPage}
              className="w-full max-w-xs"
            >
              Carregar mais doações
            </Button>
          )}
        </div>
      )}

      {/* Fim dos resultados */}
      {!hasNextPage && allDonations.length > 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
          Todas as doações foram carregadas
        </div>
      )}
    </div>
  )
} 