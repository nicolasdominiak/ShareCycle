// Tipos para respostas da API Nominatim
interface NominatimReverseResponse {
  address?: {
    road?: string
    house_number?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    state?: string
    postcode?: string
    country?: string
  }
  [key: string]: unknown
}

interface NominatimSearchResult {
  lat: string
  lon: string
  importance?: string
  [key: string]: unknown
}

type NominatimSearchResponse = NominatimSearchResult[]

interface GeocodeResult {
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

// Resultado da geocodificação direta (endereço → coordenadas)
interface GeocodeCoordinates {
  latitude: number
  longitude: number
  accuracy?: number
  source?: string
}

// Interface para diferentes provedores de geocodificação
interface GeocodeProvider {
  name: string
  url: (lat: number, lng: number) => string
  parseResponse: (data: NominatimReverseResponse) => GeocodeResult | null
}

// Interface para provedores de geocodificação direta
interface ForwardGeocodeProvider {
  name: string
  url: (address: string) => string
  parseResponse: (data: NominatimSearchResponse) => GeocodeCoordinates | null
}

// Provedor Nominatim (OpenStreetMap) - Gratuito
const nominatimProvider: GeocodeProvider = {
  name: 'Nominatim',
  url: (lat: number, lng: number) => 
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=pt-BR`,
  parseResponse: (data: NominatimReverseResponse): GeocodeResult | null => {
    if (!data || !data.address) return null
    
    const addr = data.address
    return {
      address: `${addr.road || ''} ${addr.house_number || ''}`.trim() || undefined,
      city: addr.city || addr.town || addr.village || addr.municipality || undefined,
      state: addr.state || undefined,
      zipCode: addr.postcode || undefined,
      country: addr.country || undefined
    }
  }
}

// Provedor ViaCEP (para CEPs brasileiros) - Placeholder para futura implementação
// const viaCEPProvider: GeocodeProvider = {
//   name: 'ViaCEP',
//   url: (lat: number, lng: number) => {
//     // ViaCEP não faz geocodificação reversa diretamente
//     // Esta implementação é um placeholder
//     return ''
//   },
//   parseResponse: (data: any): GeocodeResult | null => {
//     return null
//   }
// }

// Provedor Nominatim para geocodificação direta
const nominatimForwardProvider: ForwardGeocodeProvider = {
  name: 'Nominatim',
  url: (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    return `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&addressdetails=1&countrycodes=br&accept-language=pt-BR`
  },
  parseResponse: (data: NominatimSearchResponse): GeocodeCoordinates | null => {
    if (!data || !Array.isArray(data) || data.length === 0) return null
    
    const result = data[0]
    const lat = parseFloat(result.lat)
    const lng = parseFloat(result.lon)
    
    if (isNaN(lat) || isNaN(lng)) return null
    
    return {
      latitude: lat,
      longitude: lng,
      accuracy: parseFloat(result.importance || '0') || undefined,
      source: 'nominatim'
    }
  }
}

/**
 * Converte coordenadas geográficas em informações de endereço
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<GeocodeResult | null> {
  const providers = [nominatimProvider]
  
  for (const provider of providers) {
    try {
      const url = provider.url(latitude, longitude)
      if (!url) continue
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ShareCycle App (https://sharecycle.app)'
        }
      })
      
      if (!response.ok) continue
      
      const data = await response.json() as NominatimReverseResponse
      const result = provider.parseResponse(data)
      
      if (result) {
        console.log(`Geocoding successful with ${provider.name}:`, result)
        return result
      }
    } catch (error) {
      console.warn(`Geocoding failed with ${provider.name}:`, error)
      continue
    }
  }
  
  return null
}

/**
 * Formata um endereço completo a partir das partes
 */
export function formatAddress(parts: GeocodeResult): string {
  const addressParts = []
  
  if (parts.address) addressParts.push(parts.address)
  if (parts.city) addressParts.push(parts.city)
  if (parts.state) addressParts.push(parts.state)
  
  return addressParts.join(', ')
}

/**
 * Converte coordenadas em CEP (específico para Brasil)
 * TODO: Implementar integração com API de CEP
 */
export async function coordinatesToBrazilianZipCode(): Promise<string | null> {
  try {
    // Para uma implementação completa, seria necessário usar uma API específica
    // Por agora, retornamos null
    return null
  } catch (error) {
    console.error('Erro ao obter CEP:', error)
    return null
  }
}

/**
 * Valida se as coordenadas estão dentro do Brasil
 */
export function isWithinBrazil(latitude: number, longitude: number): boolean {
  // Fronteiras aproximadas do Brasil
  const brazilBounds = {
    north: 5.26,
    south: -33.75,
    east: -34.79,
    west: -73.99
  }
  
  return (
    latitude >= brazilBounds.south &&
    latitude <= brazilBounds.north &&
    longitude >= brazilBounds.west &&
    longitude <= brazilBounds.east
  )
}

/**
 * Converte um endereço em coordenadas geográficas (geocodificação direta)
 */
export async function geocodeAddress(address: string): Promise<GeocodeCoordinates | null> {
  if (!address || address.trim().length < 3) {
    return null
  }

  const providers = [nominatimForwardProvider]
  
  for (const provider of providers) {
    try {
      const url = provider.url(address.trim())
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ShareCycle App (https://sharecycle.app)'
        }
      })
      
      if (!response.ok) continue
      
      const data = await response.json() as NominatimSearchResponse
      const result = provider.parseResponse(data)
      
      if (result && isWithinBrazil(result.latitude, result.longitude)) {
        console.log(`Forward geocoding successful with ${provider.name}:`, result)
        return result
      }
    } catch (error) {
      console.warn(`Forward geocoding failed with ${provider.name}:`, error)
      continue
    }
  }
  
  return null
}

/**
 * Constrói um endereço completo a partir dos campos individuais
 */
export function buildAddressString(parts: {
  address?: string
  city?: string
  state?: string
  zipCode?: string
}): string {
  const addressParts = []
  
  if (parts.address) addressParts.push(parts.address)
  if (parts.city) addressParts.push(parts.city)
  if (parts.state) addressParts.push(parts.state)
  if (parts.zipCode) addressParts.push(parts.zipCode)
  
  return addressParts.join(', ')
}

/**
 * Geocodifica um endereço a partir dos campos separados de uma doação
 */
export async function geocodeDonationAddress(donationData: {
  pickup_address?: string
  pickup_city?: string
  pickup_state?: string
  pickup_zip_code?: string
}): Promise<GeocodeCoordinates | null> {
  // Construir string de endereço completo
  const fullAddress = buildAddressString({
    address: donationData.pickup_address,
    city: donationData.pickup_city,
    state: donationData.pickup_state,
    zipCode: donationData.pickup_zip_code
  })
  
  if (!fullAddress) {
    return null
  }
  
  return await geocodeAddress(fullAddress)
} 