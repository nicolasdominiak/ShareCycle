'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  Check, 
  X, 
  Gift, 
  MessageCircle, 
  Package, 
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle 
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { useMarkNotificationAsRead, useDeleteNotification } from '@/hooks/use-notifications'
import { Tables } from '@/types/database.types'
import { cn } from '@/lib/utils'

type Notification = Tables<'notifications'>

interface NotificationItemProps {
  notification: Notification
  onClick?: () => void
}

// Mapeamento de ícones por tipo de notificação
const notificationIcons = {
  'nova_solicitacao': Gift,
  'solicitacao_aprovada': CheckCircle,
  'solicitacao_rejeitada': XCircle,
  'nova_mensagem': MessageCircle,
  'doacao_entregue': Package,
  'doacao_cancelada': AlertCircle,
  'lembrete_pickup': Clock,
} as const

// Mapeamento de cores por tipo de notificação
const notificationColors = {
  'nova_solicitacao': 'text-blue-500',
  'solicitacao_aprovada': 'text-green-500',
  'solicitacao_rejeitada': 'text-red-500',
  'nova_mensagem': 'text-purple-500',
  'doacao_entregue': 'text-green-600',
  'doacao_cancelada': 'text-orange-500',
  'lembrete_pickup': 'text-yellow-500',
} as const

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()
  
  const markAsReadMutation = useMarkNotificationAsRead()
  const deleteNotificationMutation = useDeleteNotification()

  const Icon = notificationIcons[notification.type]
  const iconColor = notificationColors[notification.type]

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (notification.is_read) return

    try {
      await markAsReadMutation.mutateAsync(notification.id)
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível marcar como lida',
        variant: 'destructive'
      })
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    try {
      await deleteNotificationMutation.mutateAsync(notification.id)
      toast({
        title: 'Notificação removida',
        description: 'A notificação foi removida com sucesso'
      })
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover a notificação',
        variant: 'destructive'
      })
    }
  }

  const handleClick = () => {
    // Marcar como lida ao clicar
    if (!notification.is_read) {
      markAsReadMutation.mutate(notification.id)
    }
    
    // Executar callback se fornecido
    onClick?.()
  }

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md',
        !notification.is_read && 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20',
        notification.is_read && 'opacity-75'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Ícone da notificação */}
          <div className={cn('flex-shrink-0 mt-0.5', iconColor)}>
            <Icon className="h-5 w-5" />
          </div>

          {/* Conteúdo da notificação */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className={cn(
                'text-sm font-medium leading-5',
                !notification.is_read && 'font-semibold'
              )}>
                {notification.title}
              </h4>
              
              {/* Badge de não lida */}
              {!notification.is_read && (
                <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-blue-500" />
              )}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
              {notification.message}
            </p>
            
            <div className="flex items-center justify-between">
              <time className="text-xs text-gray-500 dark:text-gray-500">
                {notification.created_at && format(
                  new Date(notification.created_at), 
                  "dd 'de' MMM 'às' HH:mm", 
                  { locale: ptBR }
                )}
              </time>
              
              {/* Ações que aparecem no hover */}
              {isHovered && (
                <div className="flex items-center gap-1">
                  {!notification.is_read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={handleMarkAsRead}
                      disabled={markAsReadMutation.isPending}
                    >
                      <Check className="h-3 w-3" />
                      <span className="sr-only">Marcar como lida</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={handleDelete}
                    disabled={deleteNotificationMutation.isPending}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remover notificação</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente de loading para notificação
export function NotificationItemSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 