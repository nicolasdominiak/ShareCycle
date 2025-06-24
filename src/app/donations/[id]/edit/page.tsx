"use client"

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DonationForm } from '@/components/forms/donation-form'
import { DeleteDonationDialog } from '@/components/donations/delete-donation-dialog'
import { useDonation } from '@/hooks/use-donations'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle, Trash2 } from 'lucide-react'

interface EditDonationPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditDonationPage({ params }: EditDonationPageProps) {
  const { id } = use(params)
  const { data: donation, isLoading, isError, error } = useDonation(id)
  const router = useRouter()
  
  // Estado para controlar o modal de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDonationDeleted = () => {
    // Redirecionar para a página de minhas doações após exclusão
    router.push('/donations/my-donations')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !donation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error?.message || 'Doação não encontrada ou você não tem permissão para editá-la.'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Editar Doação
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Atualize as informações da sua doação
              </p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Doação
            </Button>
          </div>
        </div>
        
        <DonationForm donation={donation} mode="edit" />

        {/* Modal de confirmação de exclusão */}
        <DeleteDonationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          donationId={donation.id}
          donationTitle={donation.title}
          onDeleted={handleDonationDeleted}
        />
      </div>
    </div>
  )
} 