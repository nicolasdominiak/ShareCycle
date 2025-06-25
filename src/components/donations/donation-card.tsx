import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tables } from '@/types/database.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  Calendar, 
  Edit, 
  Eye, 
  MapPin, 
  Package, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Navigation
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type DonationWithDonor = Tables<'donations_with_donor'> & {
  calculated_distance?: number
}

interface DonationCardProps {
  donation: DonationWithDonor
  showActions?: boolean
  variant?: 'public' | 'owner'
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
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

export function DonationCard({ 
  donation, 
  variant = 'public',
  showActions = false,
  onEdit,
  onDelete,
  onView 
}: DonationCardProps) {
  const status = donation.status || 'disponível'
  const statusInfo = statusMap[status]
  const StatusIcon = statusInfo.icon

  const firstImage = donation.images?.[0]
  const categoryLabel = categoryMap[donation.category!] || donation.category
  
  // Função para formatar a distância
  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`
    }
    return `${distance.toFixed(1)}km`
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-gray-100 dark:bg-green-900/20">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={donation.title || 'Doação'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">
              {categoryLabel}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant={statusInfo.variant} className="flex items-center gap-1">
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {donation.title || 'Título não informado'}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {donation.description || 'Descrição não disponível'}
          </p>

          {/* Informações do doador - apenas na visualização pública */}
          {variant === 'public' && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Avatar className="h-6 w-6">
                <AvatarImage src={donation.donor_avatar || undefined} />
                <AvatarFallback className="text-xs">
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span>{donation.donor_name || 'Doador anônimo'}</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {donation.quantity && (
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                <span>{donation.quantity} un.</span>
              </div>
            )}
            
            {donation.pickup_city && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{donation.pickup_city}</span>
              </div>
            )}
            
            {donation.calculated_distance && donation.calculated_distance !== Infinity && (
              <div className="flex items-center gap-1 text-primary dark:text-primary">
                <Navigation className="h-3 w-3" />
                <span>{formatDistance(donation.calculated_distance)}</span>
              </div>
            )}
          </div>

          {donation.expiry_date && (
            <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
              <AlertCircle className="h-3 w-3" />
              <span>
                Válido até {format(new Date(donation.expiry_date), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
          )}

          {donation.created_at && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>
                {format(new Date(donation.created_at), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {showActions ? (
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(donation.id!)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(donation.id!)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete?.(donation.id!)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button asChild className="w-full">
            <Link href={`/donations/${donation.id}`} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Ver detalhes
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 