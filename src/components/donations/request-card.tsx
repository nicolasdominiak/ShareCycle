'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { 
  Calendar, 
  MessageCircle, 
  Package, 
  Check, 
  X, 
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

import { RequestWithDetails, useApproveRequest, useRejectRequest } from '@/hooks/use-requests'

const statusMap = {
  'pendente': { 
    label: 'Pendente', 
    variant: 'secondary' as const, 
    icon: Clock,
    color: 'text-yellow-600'
  },
  'aprovada': { 
    label: 'Aprovada', 
    variant: 'default' as const, 
    icon: CheckCircle,
    color: 'text-green-600'
  },
  'rejeitada': { 
    label: 'Rejeitada', 
    variant: 'destructive' as const, 
    icon: XCircle,
    color: 'text-red-600'
  },
  'cancelada': { 
    label: 'Cancelada', 
    variant: 'outline' as const, 
    icon: XCircle,
    color: 'text-gray-600'
  },
  'entregue': { 
    label: 'Entregue', 
    variant: 'outline' as const, 
    icon: CheckCircle,
    color: 'text-blue-600'
  }
}

interface RequestCardProps {
  request: RequestWithDetails
}

export function RequestCard({ request }: RequestCardProps) {
  const [rejectDialog, setRejectDialog] = useState(false)
  const [approveDialog, setApproveDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [approvedQuantity, setApprovedQuantity] = useState(request.requested_quantity || 1)
  
  const { toast } = useToast()
  const approveMutation = useApproveRequest()
  const rejectMutation = useRejectRequest()

  const status = request.status || 'pendente'
  const statusInfo = statusMap[status]
  const StatusIcon = statusInfo.icon
  const isPending = status === 'pendente'

  const handleApprove = async () => {
    try {
      const result = await approveMutation.mutateAsync({
        requestId: request.id!,
        approvedQuantity: approvedQuantity
      })

      if (result.success) {
        toast({
          title: 'Solicitação aprovada!',
          description: `A solicitação de ${request.requester_name} foi aprovada.`
        })
        setApproveDialog(false)
      } else {
        toast({
          title: 'Erro ao aprovar',
          description: result.error,
          variant: 'destructive'
        })
      }
    } catch {
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao aprovar a solicitação.',
        variant: 'destructive'
      })
    }
  }

  const handleReject = async () => {
    try {
      const result = await rejectMutation.mutateAsync({
        requestId: request.id!,
        rejectionReason: rejectionReason || undefined
      })

      if (result.success) {
        toast({
          title: 'Solicitação rejeitada',
          description: `A solicitação de ${request.requester_name} foi rejeitada.`
        })
        setRejectDialog(false)
        setRejectionReason('')
      } else {
        toast({
          title: 'Erro ao rejeitar',
          description: result.error,
          variant: 'destructive'
        })
      }
    } catch {
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao rejeitar a solicitação.',
        variant: 'destructive'
      })
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={request.requester_avatar || undefined} />
              <AvatarFallback>
                {request.requester_name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">
                {request.requester_name || 'Usuário'}
              </h3>
              <p className="text-xs text-gray-500">
                {request.requester_city && `${request.requester_city}`}
              </p>
            </div>
          </div>
          
          <Badge variant={statusInfo.variant} className="flex items-center gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informações da doação */}
        <div className="flex gap-3">
          <div className="relative h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
            {request.donation_images?.[0] ? (
              <Image
                src={request.donation_images[0]}
                alt={request.donation_title || 'Doação'}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">
              {request.donation_title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2">
              {request.donation_description}
            </p>
          </div>
        </div>

        {/* Quantidade solicitada */}
        {request.requested_quantity && request.requested_quantity > 1 && (
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-gray-500" />
            <span>Quantidade: {request.requested_quantity}</span>
          </div>
        )}

        {/* Mensagem da solicitação */}
        {request.message && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span>Mensagem:</span>
            </div>
            <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              {request.message}
            </p>
          </div>
        )}

        {/* Data da solicitação */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>
            {request.created_at 
              ? format(new Date(request.created_at), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })
              : 'Data não disponível'
            }
          </span>
        </div>

        {/* Motivo da rejeição */}
        {status === 'rejeitada' && request.rejection_reason && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-red-600">
              <XCircle className="h-4 w-4" />
              <span>Motivo da rejeição:</span>
            </div>
            <p className="text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              {request.rejection_reason}
            </p>
          </div>
        )}

        {/* Quantidade aprovada */}
        {status === 'aprovada' && request.approved_quantity && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Quantidade aprovada: {request.approved_quantity}</span>
          </div>
        )}
      </CardContent>

      {/* Ações (apenas para solicitações pendentes) */}
      {isPending && (
        <CardFooter className="flex gap-2 pt-4">
          <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={rejectMutation.isPending}
              >
                <X className="h-4 w-4 mr-2" />
                Rejeitar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rejeitar Solicitação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tem certeza que deseja rejeitar a solicitação de {request.requester_name}?
                </p>
                <div className="space-y-2">
                  <Label htmlFor="rejection-reason">Motivo (opcional)</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Explique o motivo da rejeição..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setRejectDialog(false)}
                  disabled={rejectMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleReject}
                  disabled={rejectMutation.isPending}
                >
                  {rejectMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Rejeitar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={approveDialog} onOpenChange={setApproveDialog}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="flex-1"
                disabled={approveMutation.isPending}
              >
                <Check className="h-4 w-4 mr-2" />
                Aprovar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Aprovar Solicitação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aprovar a solicitação de {request.requester_name} para &quot;{request.donation_title}&quot;?
                </p>
                
                {request.requested_quantity && request.requested_quantity > 1 && (
                  <div className="space-y-2">
                    <Label htmlFor="approved-quantity">Quantidade a aprovar</Label>
                    <Input
                      id="approved-quantity"
                      type="number"
                      min={1}
                      max={request.requested_quantity}
                      value={approvedQuantity}
                      onChange={(e) => setApprovedQuantity(parseInt(e.target.value) || 1)}
                    />
                    <p className="text-xs text-gray-500">
                      Solicitado: {request.requested_quantity}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setApproveDialog(false)}
                  disabled={approveMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleApprove}
                  disabled={approveMutation.isPending}
                >
                  {approveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Aprovar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  )
} 