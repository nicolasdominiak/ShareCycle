'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Search, Users, Gift, MapPin } from "lucide-react"
import { useGeolocation, formatCoordinates } from '@/hooks/use-geolocation'

interface HomePageActionsProps {
  user?: User | null
}

export function HomePageActions({ user }: HomePageActionsProps) {
  const geolocation = useGeolocation()

  if (!user) {
    // Se o usuário não está logado, mostra botões de autenticação
    return (
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/auth/register">
            Começar Agora
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/auth/login">
            Entrar
          </Link>
        </Button>
      </div>
    )
  }

  // Se o usuário está logado, mostra as funcionalidades principais
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <Card className="hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
        <CardHeader className="text-center">
          <Gift className="h-12 w-12 mx-auto text-primary" />
          <CardTitle>Fazer Doação</CardTitle>
          <CardDescription>
            Doe itens que você não usa mais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/donations/new">
              Doar Agora
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
        <CardHeader className="text-center">
          <Search className="h-12 w-12 mx-auto text-primary" />
          <CardTitle>Buscar Doações</CardTitle>
          <CardDescription>
            Encontre itens que você precisa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/donations">
              Explorar
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
        <CardHeader className="text-center">
          <MapPin className="h-12 w-12 mx-auto text-primary" />
          <CardTitle>Doações Próximas</CardTitle>
          <CardDescription>
            {geolocation.latitude ? 
              `Localização: ${formatCoordinates(geolocation.latitude, geolocation.longitude).substring(0, 20)}...` :
              'Ative sua localização para ver doações próximas'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            asChild 
            variant="outline" 
            className="w-full"
            disabled={!geolocation.latitude}
          >
            <Link href={geolocation.latitude ? 
              `/donations?nearMe=true&lat=${geolocation.latitude}&lng=${geolocation.longitude}&orderBy=distance` : 
              '/donations'
            }>
              {geolocation.loading ? 'Localizando...' : 'Ver Próximas'}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
        <CardHeader className="text-center">
          <Users className="h-12 w-12 mx-auto text-primary" />
          <CardTitle>Comunidade</CardTitle>
          <CardDescription>
            Conecte-se com sua vizinhança
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/community">
              Participar
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
        <CardHeader className="text-center">
          <Heart className="h-12 w-12 mx-auto text-primary" />
          <CardTitle>Impacto</CardTitle>
          <CardDescription>
            Veja o impacto das suas ações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/impact">
              Ver Impacto
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 