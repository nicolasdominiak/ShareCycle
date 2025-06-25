'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useGeolocation } from '@/lib/providers/geolocation-provider'
import { GeolocationPermissionDialog } from '@/components/ui/geolocation-permission'

const categories = [
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'roupas', label: 'Roupas' },
  { value: 'eletronicos', label: 'Eletrônicos' },
  { value: 'moveis', label: 'Móveis' },
  { value: 'livros', label: 'Livros' },
  { value: 'brinquedos', label: 'Brinquedos' },
  { value: 'utensílios_domésticos', label: 'Utensílios Domésticos' },
  { value: 'medicamentos', label: 'Medicamentos' },
  { value: 'produtos_higiene', label: 'Produtos de Higiene' },
  { value: 'outros', label: 'Outros' }
]

const orderOptions = [
  { value: 'newest', label: 'Mais recentes' },
  { value: 'oldest', label: 'Mais antigas' },
  { value: 'distance', label: 'Mais próximas' },
  { value: 'title', label: 'Título A-Z' },
  { value: 'category', label: 'Categoria' }
]

export function DonationsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [orderBy, setOrderBy] = useState(() => {
    const fromUrl = searchParams.get('orderBy')
    const nearMeFromUrl = searchParams.get('nearMe') === 'true'
    // Se tem nearMe na URL mas não tem orderBy, usar 'distance'
    if (nearMeFromUrl && !fromUrl) {
      return 'distance'
    }
    return fromUrl || 'newest'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [nearMe, setNearMe] = useState(searchParams.get('nearMe') === 'true')
  const [showLocationDialog, setShowLocationDialog] = useState(false)

  const geolocation = useGeolocation()

  // Efeito para sincronizar nearMe com coordenadas disponíveis
  useEffect(() => {
    // Se nearMe está ativo na URL mas não temos coordenadas ainda
    if (nearMe && !geolocation.latitude && geolocation.permission === 'granted') {
      // Tenta obter localização automaticamente se permissão já foi concedida
      geolocation.getCurrentPosition().catch((error) => {
        console.warn('Erro ao obter localização automaticamente:', error)
        // Se falhar, desativar o filtro nearMe
        setNearMe(false)
        if (orderBy === 'distance') {
          setOrderBy('newest')
        }
      })
    }
  }, [nearMe, geolocation, orderBy])

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    
    if (search.trim()) params.set('search', search.trim())
    if (category) params.set('category', category)
    if (city.trim()) params.set('city', city.trim())
    if (orderBy !== 'newest') params.set('orderBy', orderBy)
    
    // Só incluir nearMe e coordenadas se tivermos localização válida
    if (nearMe && geolocation.latitude && geolocation.longitude) {
      params.set('nearMe', 'true')
      params.set('lat', geolocation.latitude.toString())
      params.set('lng', geolocation.longitude.toString())
    }

    const queryString = params.toString()
    const newUrl = queryString ? `?${queryString}` : ''
    
    router.push(`/donations${newUrl}`)
  }, [search, category, city, orderBy, nearMe, geolocation.latitude, geolocation.longitude, router])

  // Debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL()
    }, 500)

    return () => clearTimeout(timer)
  }, [search, updateURL])

  // Atualizar URL imediatamente para outros filtros
  useEffect(() => {
    updateURL()
  }, [category, city, orderBy, nearMe, updateURL])

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setCity('')
    setOrderBy('newest')
    setNearMe(false)
    router.push('/donations')
  }

  const handleNearMeToggle = async () => {
    if (!nearMe) {
      // Ativando filtro "perto de mim"
      
      // Se já temos coordenadas válidas, ativar diretamente
      if (geolocation.latitude && geolocation.longitude) {
        setNearMe(true)
        setOrderBy('distance')
        return
      }
      
      // Verificar o status da permissão
      const currentPermission = geolocation.permission || await geolocation.checkPermission()
      
      // Se permissão foi negada anteriormente, mostrar diálogo explicativo
      if (currentPermission === 'denied') {
        setShowLocationDialog(true)
        return
      }
      
      // Se já tem permissão concedida, obter localização diretamente
      if (currentPermission === 'granted') {
        try {
          await geolocation.getCurrentPosition()
          // Após obter a localização, ativar o filtro
          setNearMe(true)
          setOrderBy('distance')
        } catch (error) {
          console.error('Erro ao obter localização:', error)
          setShowLocationDialog(true)
        }
        return
      }
      
      // Se permissão ainda não foi determinada, mostrar nosso diálogo primeiro
      setShowLocationDialog(true)
      
    } else {
      // Desativando filtro "perto de mim"
      setNearMe(false)
      if (orderBy === 'distance') {
        setOrderBy('newest')
      }
    }
  }

  const hasActiveFilters = search || category || city || orderBy !== 'newest' || nearMe

  // Determinar o texto do botão baseado no estado
  const getNearMeButtonText = () => {
    if (geolocation.loading) return 'Localizando...'
    if (nearMe && (!geolocation.latitude || !geolocation.longitude)) return 'Localizando...'
    return 'Perto de mim'
  }

  // Determinar se o botão deve estar desabilitado
  const isNearMeButtonDisabled = () => {
    return geolocation.loading || (nearMe && (!geolocation.latitude || !geolocation.longitude))
  }

  return (
    <div className="space-y-4">
      {/* Barra de busca principal */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar doações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={nearMe ? "default" : "outline"}
            onClick={handleNearMeToggle}
            className="flex items-center gap-2"
            disabled={isNearMeButtonDisabled()}
          >
            <MapPin className="h-4 w-4" />
            {getNearMeButtonText()}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                !
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Filtros expandidos */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Categoria</label>
            <Select value={category || undefined} onValueChange={(value) => setCategory(value || '')}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Cidade</label>
            <Input
              type="text"
              placeholder="Filtrar por cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Ordenar por</label>
            <Select value={orderBy} onValueChange={setOrderBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {orderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Limpar filtros
            </Button>
          </div>
        </div>
      )}

      {/* Tags de filtros ativos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Busca: &ldquo;{search}&rdquo;
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearch('')}
              />
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {categories.find(c => c.value === category)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setCategory('')}
              />
            </Badge>
          )}
          {city && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Cidade: {city}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setCity('')}
              />
            </Badge>
          )}
          {nearMe && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Perto de mim
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setNearMe(false)}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Diálogo de permissão de geolocalização */}
      <GeolocationPermissionDialog
        open={showLocationDialog}
        onOpenChange={setShowLocationDialog}
        onPermissionGranted={async () => {
          setShowLocationDialog(false)
          
          // Solicitar permissão do navegador
          const granted = await geolocation.requestPermission()
          
          if (granted) {
            try {
              await geolocation.getCurrentPosition()
              // Após obter a localização, ativar o filtro
              setNearMe(true)
              setOrderBy('distance')
            } catch (error) {
              console.error('Erro ao obter localização após permissão concedida:', error)
            }
          }
        }}
        onPermissionDenied={() => {
          setShowLocationDialog(false)
        }}
      />
    </div>
  )
} 