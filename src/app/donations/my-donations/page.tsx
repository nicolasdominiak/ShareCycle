"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Plus, Package, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { DonationCard } from '@/components/donations/donation-card'
import { DeleteDonationDialog } from '@/components/donations/delete-donation-dialog'
import { useUserDonations } from '@/hooks/use-donations'

export default function MyDonationsPage() {
  const { data: donations, isLoading, isError, error, refetch } = useUserDonations()
  const router = useRouter()
  
  // Estado para controlar o modal de exclusão
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    donationId: string
    donationTitle: string
  }>({
    isOpen: false,
    donationId: '',
    donationTitle: ''
  })

  const handleEdit = (id: string) => {
    router.push(`/donations/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    const donation = donations?.find(d => d.id === id)
    if (donation) {
      setDeleteDialog({
        isOpen: true,
        donationId: id,
        donationTitle: donation.title
      })
    }
  }

  const handleView = (id: string) => {
    router.push(`/donations/${id}`)
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      donationId: '',
      donationTitle: ''
    })
  }

  const handleDonationDeleted = () => {
    // Atualizar a lista de doações após exclusão
    refetch()
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-end items-center mb-8">
          <Button asChild>
            <Link href="/donations/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Doação
            </Link>
          </Button>
        </div>

        {/* Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div className="flex justify-end items-center mb-8">
          <Button asChild>
            <Link href="/donations/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Doação
            </Link>
          </Button>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error?.message || 'Erro ao carregar suas doações. Tente novamente.'}
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

  return (
    <div>
      <div className="flex justify-end items-center mb-8">
        <Button asChild>
          <Link href="/donations/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Doação
          </Link>
        </Button>
      </div>

      {/* Estatísticas rápidas */}
      {donations && donations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold">{donations.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Disponíveis</p>
                <p className="text-2xl font-bold text-green-600">
                  {donations.filter(d => d.status === 'disponível').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800/40 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500 dark:bg-green-400"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reservadas</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {donations.filter(d => d.status === 'reservado').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/40 dark:bg-[#031c14]/40 rounded-lg p-4 border dark:border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Entregues</p>
                <p className="text-2xl font-bold text-blue-600">
                  {donations.filter(d => d.status === 'entregue').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de doações */}
      {donations && donations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              variant="owner"
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nenhuma doação cadastrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Você ainda não possui doações cadastradas. Que tal criar sua primeira doação?
          </p>
          <Button asChild>
            <Link href="/donations/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Criar primeira doação
            </Link>
          </Button>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <DeleteDonationDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleCloseDeleteDialog}
        donationId={deleteDialog.donationId}
        donationTitle={deleteDialog.donationTitle}
        onDeleted={handleDonationDeleted}
      />
    </div>
  )
} 