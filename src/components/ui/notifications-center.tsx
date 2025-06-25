'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Bell, 
  BellRing, 
  CheckCheck, 
  Trash2, 
  MoreHorizontal,
  Inbox
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { 
  useNotifications, 
  useUnreadNotificationsCount,
  useMarkAllNotificationsAsRead,
  useDeleteReadNotifications
} from '@/hooks/use-notifications'
import { NotificationItem, NotificationItemSkeleton } from './notification-item'

import { cn } from '@/lib/utils'

interface NotificationsCenterProps {
  className?: string
}

export function NotificationsCenter({ className }: NotificationsCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
  const { data: notifications, isLoading, isError, refetch } = useNotifications()
  const { data: unreadCount = 0 } = useUnreadNotificationsCount()
  
  const markAllAsReadMutation = useMarkAllNotificationsAsRead()
  const deleteReadNotificationsMutation = useDeleteReadNotifications()

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync()
      toast({
        title: 'Notificações marcadas como lidas',
        description: 'Todas as notificações foram marcadas como lidas'
      })
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível marcar as notificações como lidas',
        variant: 'destructive'
      })
    }
  }

  const handleDeleteRead = async () => {
    try {
      await deleteReadNotificationsMutation.mutateAsync()
      toast({
        title: 'Notificações removidas',
        description: 'Todas as notificações lidas foram removidas'
      })
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover as notificações',
        variant: 'destructive'
      })
    }
  }

  const handleNotificationClick = (notification: { id: string; data: unknown }) => {
    // Redirecionar baseado no tipo de notificação
    const data = notification.data as Record<string, unknown> | null
    if (data?.donation_id) {
      router.push(`/donations/${data.donation_id}`)
    } else if (data?.request_id) {
      router.push('/donations/my-donations/requests')
    }
    setIsOpen(false)
  }

  const unreadNotifications = notifications?.filter(n => !n.is_read) || []
  const readNotifications = notifications?.filter(n => n.is_read) || []

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("relative", className)}>
          {unreadCount > 0 ? (
            <BellRing className="h-4 w-4" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center min-w-[20px]">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">
            Notificações {unreadCount > 0 && `(${unreadCount} não lidas)`}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 max-w-[95vw] p-0" 
        align="end"
        side="bottom"
        sideOffset={5}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-sm">Notificações</h3>
          
          {notifications && notifications.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Opções</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {unreadCount > 0 && (
                  <DropdownMenuItem 
                    onClick={handleMarkAllAsRead}
                    disabled={markAllAsReadMutation.isPending}
                  >
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Marcar todas como lidas
                  </DropdownMenuItem>
                )}
                {readNotifications.length > 0 && (
                  <DropdownMenuItem 
                    onClick={handleDeleteRead}
                    disabled={deleteReadNotificationsMutation.isPending}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover lidas
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Conteúdo */}
        <ScrollArea className="max-h-96">
          {isLoading ? (
            <div className="p-2 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <NotificationItemSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="p-6 text-center text-sm text-gray-500">
              <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Erro ao carregar notificações</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                className="mt-2"
              >
                Tentar novamente
              </Button>
            </div>
          ) : !notifications || notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma notificação ainda</p>
              <p className="text-xs mt-1">
                Você será notificado sobre atividades importantes
              </p>
            </div>
          ) : (
            <div className="p-2">
              {/* Notificações não lidas */}
              {unreadNotifications.length > 0 && (
                <>
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Não lidas ({unreadNotifications.length})
                  </div>
                  <div className="space-y-2 mb-4">
                    {unreadNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Notificações lidas */}
              {readNotifications.length > 0 && (
                <>
                  {unreadNotifications.length > 0 && (
                    <DropdownMenuSeparator className="my-2" />
                  )}
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Lidas ({readNotifications.length})
                  </div>
                  <div className="space-y-2">
                    {readNotifications.slice(0, 10).map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification)}
                      />
                    ))}
                    {readNotifications.length > 10 && (
                      <div className="px-2 py-2 text-center">
                        <p className="text-xs text-gray-500">
                          +{readNotifications.length - 10} notificações mais antigas
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 