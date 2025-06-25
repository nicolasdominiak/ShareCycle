'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCheck, Trash2, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { 
  useNotifications,
  useUnreadNotificationsCount,
  useMarkAllNotificationsAsRead,
  useDeleteReadNotifications
} from '@/hooks/use-notifications'
import { NotificationItem, NotificationItemSkeleton } from '@/components/ui/notification-item'

export function NotificationsPageContent() {
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
  }

  const unreadNotifications = notifications?.filter(n => !n.is_read) || []
  const readNotifications = notifications?.filter(n => n.is_read) || []

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="h-9 w-9 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Notificações
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}
            </p>
          )}
        </div>

        {/* Ações */}
        {notifications && notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                Marcar todas como lidas
              </Button>
            )}
            
            {readNotifications.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteRead}
                disabled={deleteReadNotificationsMutation.isPending}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar lidas
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <NotificationItemSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 mb-4">
              Erro ao carregar notificações. Tente novamente.
            </p>
            <Button onClick={() => refetch()}>
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      ) : !notifications || notifications.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM12 3a9 9 0 00-9 9v0a9 9 0 009 9 9 9 0 009-9v0a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Nenhuma notificação ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Você será notificado sobre atividades importantes como novas solicitações,
              aprovações e mensagens.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Notificações não lidas */}
          {unreadNotifications.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Não lidas ({unreadNotifications.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {unreadNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Notificações lidas */}
          {readNotifications.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Lidas ({readNotifications.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {readNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
} 