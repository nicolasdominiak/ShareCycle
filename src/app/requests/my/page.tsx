"use client"

import { useState } from 'react'
import { AlertCircle, SendHorizontal, Filter, Eye, X } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

import { useSentRequests, RequestWithDetails, useCancelRequest } from '@/hooks/use-requests'

type RequestStatus = 'todos' | 'pendente' | 'aprovada' | 'rejeitada' | 'cancelada'

const statusMap = {
  'pendente': { 
    label: 'Pendente', 
    variant: 'secondary' as const, 
    color: 'text-yellow-600'
  },
  'aprovada': { 
    label: 'Aprovada', 
    variant: 'default' as const, 
    color: 'text-green-600'
  },
  'rejeitada': { 
    label: 'Rejeitada', 
    variant: 'destructive' as const, 
    color: 'text-red-600'
  },
  'cancelada': { 
    label: 'Cancelada', 
    variant: 'outline' as const, 
    color: 'text-gray-600'
  },
  'entregue': { 
    label: 'Entregue', 
    variant: 'outline' as const, 
    color: 'text-blue-600'
  }
}

export default function MySentRequestsPage() {
  const { data: requests, isLoading, isError, error, refetch } = useSentRequests()
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
      <div className="container mx-auto px-4 py-8">
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
            <Skeleton key={index} className="h-48 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Minhas Solicitações
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Acompanhe o status das solicitações que você enviou
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error?.message || 'Erro ao carregar suas solicitações. Tente novamente.'}
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Minhas Solicitações
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Acompanhe o status das solicitações que você enviou
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
              <SendHorizontal className="h-8 w-8 text-blue-500" />
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
          <SendHorizontal className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {totalRequests === 0 
              ? 'Nenhuma solicitação enviada'
              : 'Nenhuma solicitação com este filtro'
            }
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
            {totalRequests === 0 
              ? 'Você ainda não enviou nenhuma solicitação. Explore as doações disponíveis para solicitar itens.'
              : 'Tente alterar o filtro para ver outras solicitações.'
            }
          </p>
          {totalRequests === 0 && (
            <Button asChild>
              <Link href="/donations">
                Explorar Doações
              </Link>
            </Button>
          )}
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

// Componente para card de solicitação enviada
function RequestCard({ request }: { request: RequestWithDetails }) {
  const [cancelDialog, setCancelDialog] = useState(false)
  const { toast } = useToast()
  const cancelMutation = useCancelRequest()
  
  const status = request.status || 'pendente'
  const statusInfo = statusMap[status as keyof typeof statusMap]
  const canCancel = status === 'pendente' || status === 'aprovada'

  const handleCancel = async () => {
    try {
      const result = await cancelMutation.mutateAsync(request.id!)

      if (result.success) {
        toast({
          title: 'Solicitação cancelada!',
          description: 'Sua solicitação foi cancelada com sucesso.'
        })
        setCancelDialog(false)
      } else {
        toast({
          title: 'Erro ao cancelar',
          description: result.error,
          variant: 'destructive'
        })
      }
    } catch {
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao cancelar a solicitação.',
        variant: 'destructive'
      })
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
              {request.donation_images?.[0] ? (
                <Image
                  src={request.donation_images[0]}
                  alt={request.donation_title || 'Doação'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <SendHorizontal className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-1">
                {request.donation_title}
              </h3>
              <p className="text-xs text-gray-500">
                Para: {request.donor_name || 'Doador'}
              </p>
              <p className="text-xs text-gray-500">
                {request.donor_city && `${request.donor_city}`}
              </p>
            </div>
          </div>
          
          <Badge variant={statusInfo.variant} className="flex items-center gap-1">
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Quantidade solicitada */}
        {request.requested_quantity && request.requested_quantity > 1 && (
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">Quantidade: </span>
            <span className="font-medium">{request.requested_quantity}</span>
          </div>
        )}

        {/* Quantidade aprovada */}
        {status === 'aprovada' && request.approved_quantity && (
          <div className="text-sm text-green-600">
            <span>Quantidade aprovada: </span>
            <span className="font-medium">{request.approved_quantity}</span>
          </div>
        )}

        {/* Mensagem enviada */}
        {request.message && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Sua mensagem:</p>
            <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg line-clamp-3">
              {request.message}
            </p>
          </div>
        )}

        {/* Motivo da rejeição */}
        {status === 'rejeitada' && request.rejection_reason && (
          <div className="space-y-2">
            <p className="text-xs text-red-600">Motivo da rejeição:</p>
            <p className="text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              {request.rejection_reason}
            </p>
          </div>
        )}

        {/* Data da solicitação */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {request.created_at 
              ? format(new Date(request.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
              : 'Data não disponível'
            }
          </span>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/donations/${request.donation_id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Ver doação
              </Link>
            </Button>
            
            {canCancel && (
              <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={cancelMutation.isPending}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancelar Solicitação</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tem certeza que deseja cancelar sua solicitação para &quot;{request.donation_title}&quot;?
                    </p>
                    {status === 'aprovada' && (
                      <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                        ⚠️ Esta solicitação já foi aprovada. Ao cancelar, a doação ficará disponível novamente para outros usuários.
                      </p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setCancelDialog(false)}
                      disabled={cancelMutation.isPending}
                    >
                      Não cancelar
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleCancel}
                      disabled={cancelMutation.isPending}
                    >
                      {cancelMutation.isPending && <X className="h-4 w-4 mr-2 animate-spin" />}
                      Sim, cancelar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 