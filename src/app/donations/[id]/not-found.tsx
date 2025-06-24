import Link from 'next/link'
import { Package, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DonationNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Doação não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A doação que você está procurando pode ter sido removida ou não existe mais.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/donations" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Ver todas as doações
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 