"use client"

import { use } from 'react'
import { DonationForm } from '@/components/forms/donation-form'
import { useDonation } from '@/hooks/use-donations'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface EditDonationPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditDonationPage({ params }: EditDonationPageProps) {
  const { id } = use(params)
  const { data: donation, isLoading, isError, error } = useDonation(id)

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Editar Doação
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Atualize as informações da sua doação
          </p>
        </div>
        
        <DonationForm donation={donation} mode="edit" />
      </div>
    </div>
  )
} 