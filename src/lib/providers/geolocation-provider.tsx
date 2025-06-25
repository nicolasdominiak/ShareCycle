'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  loading: boolean
  error: string | null
  timestamp: number | null
  permission: PermissionState | null
}

interface GeolocationContextType extends GeolocationState {
  getCurrentPosition: () => Promise<void>
  watchPosition: () => void
  clearWatch: () => void
  requestPermission: () => Promise<boolean>
  checkPermission: () => Promise<PermissionState | null>
  calculateDistance: (lat: number, lng: number) => number | null
  isSupported: boolean
  clearLocation: () => void
}

const GeolocationContext = createContext<GeolocationContextType | null>(null)

const STORAGE_KEY = 'sharecycle_geolocation'
const LOCATION_MAX_AGE = 10 * 60 * 1000 // 10 minutos

// Função para salvar no sessionStorage
const saveToStorage = (state: Partial<GeolocationState>) => {
  if (typeof window === 'undefined') return
  
  try {
    const existingData = sessionStorage.getItem(STORAGE_KEY)
    const existing = existingData ? JSON.parse(existingData) : {}
    
    const dataToSave = {
      ...existing,
      ...state,
      savedAt: Date.now()
    }
    
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  } catch (error) {
    console.warn('Erro ao salvar localização no sessionStorage:', error)
  }
}

// Função para carregar do sessionStorage
const loadFromStorage = (): Partial<GeolocationState> | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const data = sessionStorage.getItem(STORAGE_KEY)
    if (!data) return null
    
    const parsed = JSON.parse(data)
    const savedAt = parsed.savedAt || 0
    const now = Date.now()
    
    // Se a localização é muito antiga, ignorar
    if (now - savedAt > LOCATION_MAX_AGE) {
      sessionStorage.removeItem(STORAGE_KEY)
      return null
    }
    
    return {
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      accuracy: parsed.accuracy,
      timestamp: parsed.timestamp,
      permission: parsed.permission
    }
  } catch (error) {
    console.warn('Erro ao carregar localização do sessionStorage:', error)
    return null
  }
}

export function GeolocationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GeolocationState>(() => {
    const saved = loadFromStorage()
    return {
      latitude: saved?.latitude || null,
      longitude: saved?.longitude || null,
      accuracy: saved?.accuracy || null,
      loading: false,
      error: null,
      timestamp: saved?.timestamp || null,
      permission: saved?.permission || null
    }
  })

  const watchIdRef = useRef<number | null>(null)
  const mountedRef = useRef(true)

  // Verifica se a API de geolocalização é suportada
  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator

  // Opções para a API de geolocalização (memoized para evitar re-renders)
  const geoOptions: PositionOptions = useMemo(() => ({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000 // 1 minuto
  }), [])

  // Função para lidar com sucesso na obtenção da posição
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    if (!mountedRef.current) return

    const newState = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      loading: false,
      error: null,
      timestamp: position.timestamp
    }

    setState(prev => ({ ...prev, ...newState }))
    saveToStorage(newState)
  }, [])

  // Função para lidar com erros
  const handleError = useCallback((error: GeolocationPositionError) => {
    if (!mountedRef.current) return

    let errorMessage = 'Erro desconhecido ao obter localização'

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Permissão negada para acessar a localização'
        break
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Localização indisponível'
        break
      case error.TIMEOUT:
        errorMessage = 'Tempo limite esgotado para obter localização'
        break
    }

    const newState = {
      loading: false,
      error: errorMessage
    }

    setState(prev => ({ ...prev, ...newState }))
    saveToStorage(newState)
  }, [])

  // Função para obter a posição atual
  const getCurrentPosition = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      const error = 'Geolocalização não é suportada neste navegador'
      setState(prev => ({ ...prev, error, loading: false }))
      return Promise.reject(new Error(error))
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    return new Promise<void>((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleSuccess(position)
            resolve()
          },
          (error) => {
            handleError(error)
            reject(error)
          },
          geoOptions
        )
      } catch {
        const error = {
          code: 2,
          message: 'Erro interno ao acessar geolocalização'
        } as GeolocationPositionError
        handleError(error)
        reject(error)
      }
    })
  }, [isSupported, handleSuccess, handleError, geoOptions])

  // Função para observar mudanças de posição
  const watchPosition = useCallback(() => {
    if (!isSupported) return

    // Limpa watch anterior se existir
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      geoOptions
    )
  }, [isSupported, handleSuccess, handleError, geoOptions])

  // Função para parar de observar a posição
  const clearWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
  }, [])

  // Função para verificar permissão sem solicitar
  const checkPermission = useCallback(async (): Promise<PermissionState | null> => {
    if (!isSupported) return null

    try {
      if ('permissions' in navigator) {
        const result = await navigator.permissions.query({ name: 'geolocation' })
        setState(prev => ({ ...prev, permission: result.state }))
        saveToStorage({ permission: result.state })
        return result.state
      }
      return null
    } catch (error) {
      console.error('Erro ao verificar permissão de geolocalização:', error)
      return null
    }
  }, [isSupported])

  // Função para solicitar permissão de geolocalização
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false

    try {
      // Verifica se a API de permissões é suportada
      if ('permissions' in navigator) {
        const result = await navigator.permissions.query({ name: 'geolocation' })
        setState(prev => ({ ...prev, permission: result.state }))
        saveToStorage({ permission: result.state })
        
        // Se já foi negada, retorna false
        if (result.state === 'denied') {
          return false
        }

        // Se já foi concedida, retorna true
        if (result.state === 'granted') {
          return true
        }
      }

      // Tenta obter a localização para ativar o prompt de permissão
      return new Promise<boolean>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            setState(prev => ({ ...prev, permission: 'granted' }))
            saveToStorage({ permission: 'granted' })
            resolve(true)
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setState(prev => ({ ...prev, permission: 'denied' }))
              saveToStorage({ permission: 'denied' })
              resolve(false)
            } else {
              // Outros erros não são relacionados à permissão
              resolve(true)
            }
          },
          { ...geoOptions, timeout: 5000 }
        )
      })
    } catch (error) {
      console.error('Erro ao solicitar permissão de geolocalização:', error)
      return false
    }
  }, [isSupported, geoOptions])

  // Função para calcular distância em metros usando a fórmula de Haversine
  const calculateDistance = useCallback((lat: number, lng: number): number | null => {
    if (state.latitude === null || state.longitude === null) {
      return null
    }

    const R = 6371e3 // Raio da Terra em metros
    const φ1 = (state.latitude * Math.PI) / 180
    const φ2 = (lat * Math.PI) / 180
    const Δφ = ((lat - state.latitude) * Math.PI) / 180
    const Δλ = ((lng - state.longitude) * Math.PI) / 180

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // Distância em metros
  }, [state.latitude, state.longitude])

  // Função para limpar localização
  const clearLocation = useCallback(() => {
    setState(prev => ({
      ...prev,
      latitude: null,
      longitude: null,
      accuracy: null,
      timestamp: null,
      error: null
    }))
    
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Verifica permissão atual ao montar o componente
  useEffect(() => {
    if (!isSupported) return

    const checkInitialPermission = async () => {
      try {
        if ('permissions' in navigator) {
          const result = await navigator.permissions.query({ name: 'geolocation' })
          setState(prev => ({ ...prev, permission: result.state }))
          saveToStorage({ permission: result.state })

          // Escuta mudanças na permissão
          result.addEventListener('change', () => {
            setState(prev => ({ ...prev, permission: result.state }))
            saveToStorage({ permission: result.state })
          })
        }
      } catch (error) {
        console.error('Erro ao verificar permissão de geolocalização:', error)
      }
    }

    checkInitialPermission()
  }, [isSupported])

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      mountedRef.current = false
      clearWatch()
    }
  }, [clearWatch])

  const contextValue: GeolocationContextType = {
    ...state,
    getCurrentPosition,
    watchPosition,
    clearWatch,
    requestPermission,
    checkPermission,
    calculateDistance,
    isSupported,
    clearLocation
  }

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  )
}

export function useGeolocationContext() {
  const context = useContext(GeolocationContext)
  if (!context) {
    throw new Error('useGeolocationContext must be used within a GeolocationProvider')
  }
  return context
}

// Hook compatível com o anterior (para não quebrar código existente)
export function useGeolocation() {
  return useGeolocationContext()
}

// Utilitário para formatar coordenadas
export function formatCoordinates(lat: number | null, lng: number | null): string {
  if (lat === null || lng === null) return 'Localização não disponível'
  
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}

// Utilitário para converter metros em formato legível
export function formatDistance(meters: number | null): string {
  if (meters === null) return 'Distância não disponível'
  
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  
  return `${(meters / 1000).toFixed(1)}km`
} 