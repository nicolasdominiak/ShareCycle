import { Metadata } from 'next'
import { DonationForm } from '@/components/forms/donation-form'

export const metadata: Metadata = {
  title: 'Nova Doação - ShareCycle',
  description: 'Cadastre uma nova doação para ajudar sua comunidade',
}

export default function NewDonationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Nova Doação
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Preencha as informações abaixo para cadastrar sua doação
          </p>
        </div>
        
        <DonationForm />
      </div>
    </div>
  )
} 