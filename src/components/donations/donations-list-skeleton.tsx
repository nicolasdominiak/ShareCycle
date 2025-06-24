import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function DonationCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DonationsListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Grid de doações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <DonationCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
} 