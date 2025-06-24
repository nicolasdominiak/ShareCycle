'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

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
  { value: 'title', label: 'Título A-Z' },
  { value: 'category', label: 'Categoria' }
]

export function DonationsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [orderBy, setOrderBy] = useState(searchParams.get('orderBy') || 'newest')
  const [showFilters, setShowFilters] = useState(false)

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    
    if (search.trim()) params.set('search', search.trim())
    if (category) params.set('category', category)
    if (city.trim()) params.set('city', city.trim())
    if (orderBy !== 'newest') params.set('orderBy', orderBy)

    const queryString = params.toString()
    const newUrl = queryString ? `?${queryString}` : ''
    
    router.push(`/donations${newUrl}`)
  }, [search, category, city, orderBy, router])

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
  }, [category, city, orderBy, updateURL])

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setCity('')
    setOrderBy('newest')
    router.push('/donations')
  }

  const hasActiveFilters = search || category || city || orderBy !== 'newest'

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
        </div>
      )}
    </div>
  )
} 