import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Package, 
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  MessageCircle,
  Shield
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

import { createClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database.types'

type DonationWithDonor = Tables<'donations_with_donor'>

interface DonationPageProps {
  params: Promise<{ id: string }>
}

const statusMap = {
  'disponível': { 
    label: 'Disponível', 
    variant: 'default' as const, 
    icon: CheckCircle,
    color: 'text-green-600'
  },
  'reservado': { 
    label: 'Reservado', 
    variant: 'secondary' as const, 
    icon: Clock,
    color: 'text-yellow-600'
  },
  'entregue': { 
    label: 'Entregue', 
    variant: 'outline' as const, 
    icon: CheckCircle,
    color: 'text-blue-600'
  },
  'cancelado': { 
    label: 'Cancelado', 
    variant: 'destructive' as const, 
    icon: XCircle,
    color: 'text-red-600'
  }
}

const categoryMap = {
  'alimentos': 'Alimentos',
  'roupas': 'Roupas',
  'eletronicos': 'Eletrônicos',
  'moveis': 'Móveis',
  'livros': 'Livros',
  'brinquedos': 'Brinquedos',
  'utensílios_domésticos': 'Utensílios Domésticos',
  'medicamentos': 'Medicamentos',
  'produtos_higiene': 'Produtos de Higiene',
  'outros': 'Outros'
}

async function getDonationDetails(id: string): Promise<DonationWithDonor | null> {
  const supabase = await createClient()
  
  const { data: donation, error } = await supabase
    .from('donations_with_donor')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !donation) {
    return null
  }

  return donation
}

export async function generateMetadata({ params }: DonationPageProps): Promise<Metadata> {
  const { id } = await params
  const donation = await getDonationDetails(id)

  if (!donation) {
    return {
      title: 'Doação não encontrada - ShareCycle',
    }
  }

  return {
    title: `${donation.title} - ShareCycle`,
    description: donation.description || 'Doação disponível no ShareCycle',
  }
}

function DonationDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-16 w-full rounded" />
              <Skeleton className="h-16 w-full rounded" />
              <Skeleton className="h-16 w-full rounded" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

async function DonationDetailsContent({ id }: { id: string }) {
  const donation = await getDonationDetails(id)

  if (!donation) {
    notFound()
  }

  const status = donation.status || 'disponível'
  const statusInfo = statusMap[status]
  const StatusIcon = statusInfo.icon
  const categoryLabel = categoryMap[donation.category!] || donation.category

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header com botão voltar */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/donations" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para doações
            </Link>
          </Button>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de imagens */}
          <div className="space-y-4">
            <div className="relative h-64 lg:h-80 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {donation.images?.[0] ? (
                <Image
                  src={donation.images[0]}
                  alt={donation.title || 'Doação'}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Thumbnails das outras imagens */}
            {donation.images && donation.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {donation.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`${donation.title} - Imagem ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {donation.images.length > 5 && (
                  <div className="relative h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      +{donation.images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Informações da doação */}
          <div className="space-y-6">
            {/* Título e status */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {donation.title}
                </h1>
                <Badge variant={statusInfo.variant} className="flex items-center gap-1 shrink-0">
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{categoryLabel}</Badge>
                {donation.condition && (
                  <Badge variant="outline">{donation.condition}</Badge>
                )}
              </div>
            </div>

            {/* Informações do doador */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Doador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={donation.donor_avatar || undefined} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{donation.donor_name || 'Doador anônimo'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {donation.donor_city && donation.donor_state 
                        ? `${donation.donor_city}, ${donation.donor_state}`
                        : 'Localização não informada'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descrição */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {donation.description || 'Nenhuma descrição fornecida.'}
                </p>
              </CardContent>
            </Card>

            {/* Detalhes da doação */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Detalhes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {donation.quantity && (
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Quantidade: {donation.quantity} unidades</span>
                  </div>
                )}
                
                {donation.pickup_city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Local de retirada: {donation.pickup_city}
                      {donation.pickup_state && `, ${donation.pickup_state}`}
                    </span>
                  </div>
                )}
                
                {donation.created_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Publicado em {format(new Date(donation.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                  </div>
                )}

                {donation.expiry_date && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      Válido até {format(new Date(donation.expiry_date), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instruções de retirada */}
            {donation.pickup_instructions && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Instruções de Retirada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {donation.pickup_instructions}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Ações */}
            {status === 'disponível' && (
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Solicitar Doação
                </Button>
                
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Ao solicitar esta doação, você poderá conversar diretamente com o doador para combinar a retirada.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function DonationPage({ params }: DonationPageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<DonationDetailsSkeleton />}>
      <DonationDetailsContent id={id} />
    </Suspense>
  )
} 