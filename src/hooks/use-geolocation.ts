'use client'

// ⚠️ DEPRECATED: Use o GeolocationProvider em vez deste hook
// Este hook será removido em versões futuras
// Use import { useGeolocation } from '@/lib/providers/geolocation-provider'

import { useGeolocation as useGeolocationFromProvider } from '@/lib/providers/geolocation-provider'

/**
 * @deprecated Use o GeolocationProvider em vez deste hook
 * Importe de: '@/lib/providers/geolocation-provider'
 */
export function useGeolocation() {
  console.warn(
    'useGeolocation hook is deprecated. Use GeolocationProvider instead.\n' +
    'Import from: @/lib/providers/geolocation-provider'
  )
  
  return useGeolocationFromProvider()
}

/**
 * @deprecated Use o GeolocationProvider em vez deste hook
 */
export function useCurrentPosition() {
  console.warn(
    'useCurrentPosition hook is deprecated. Use GeolocationProvider instead.\n' +
    'Import from: @/lib/providers/geolocation-provider'
  )
  
  return useGeolocationFromProvider()
}

// Re-exporta as funções utilitárias
export { formatCoordinates, formatDistance } from '@/lib/providers/geolocation-provider' 