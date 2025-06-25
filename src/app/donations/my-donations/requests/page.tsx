"use client"

import { useState } from 'react'
import { AlertCircle, Inbox, Filter } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { RequestCard } from '@/components/donations/request-card'
import { useReceivedRequests } from '@/hooks/use-requests'

type RequestStatus = 'todos' | 'pendente' | 'aprovada' | 'rejeitada'

export default function ReceivedRequestsPage() {
  const { data: requests, isLoading, isError, error, refetch } = useReceivedRequests()
  const [statusFilter, setStatusFilter] = useState<RequestStatus>('todos')

  // Filtrar solicitações por status
  const filteredRequests = requests?.filter(request => {
    if (statusFilter === 'todos') return true
    return request.status === statusFilter
  }) || []

  // Contar solicitações por status
  const statusCounts = requests?.reduce((acc, request) => {
    const status = request.status || 'pendente'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Estatísticas skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Solicitações Recebidas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Gerencie as solicitações que você recebeu
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error?.message || 'Erro ao carregar solicitações. Tente novamente.'}
          </AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refetch()} 
            className="mt-2"
          >
            Tentar novamente
          </Button>
        </Alert>
      </div>
    )
  }

  const totalRequests = requests?.length || 0
  const pendingRequests = statusCounts['pendente'] || 0
  const approvedRequests = statusCounts['aprovada'] || 0
  const rejectedRequests = statusCounts['rejeitada'] || 0

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Solicitações Recebidas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Gerencie as solicitações que você recebeu
          </p>
        </div>

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RequestStatus)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas ({totalRequests})</SelectItem>
            <SelectItem value="pendente">Pendentes ({pendingRequests})</SelectItem>
            <SelectItem value="aprovada">Aprovadas ({approvedRequests})</SelectItem>
            <SelectItem value="rejeitada">Rejeitadas ({rejectedRequests})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Estatísticas rápidas */}
      {totalRequests > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
              </div>
              <Inbox className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aprovadas</p>
                <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800/40 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500 dark:bg-green-400"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rejeitadas</p>
                <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-400"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de solicitações */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <Inbox className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {totalRequests === 0 
              ? 'Nenhuma solicitação recebida'
              : 'Nenhuma solicitação com este filtro'
            }
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {totalRequests === 0 
              ? 'Quando alguém solicitar suas doações, elas aparecerão aqui para você gerenciar.'
              : 'Tente alterar o filtro para ver outras solicitações.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  )
} 