import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Doações - ShareCycle',
  description: 'Encontre doações disponíveis em sua comunidade',
}

export default function DonationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
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
      
      {/* Lista de doações será implementada na próxima tarefa */}
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Lista de doações será implementada em breve...
        </p>
      </div>
    </div>
  )
} 