import { Metadata } from 'next'
import { NotificationsPageContent } from './notifications-content'

export const metadata: Metadata = {
  title: 'Notificações - ShareCycle',
  description: 'Veja todas as suas notificações',
}

export default function NotificationsPage() {
  return <NotificationsPageContent />
} 