'use client'

import { useState } from 'react'
import { MapPin, Navigation, AlertCircle, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useGeolocation, formatCoordinates, formatDistance } from '@/lib/providers/geolocation-provider'

export function GeolocationDemo() {
  const [targetLat, setTargetLat] = useState<number | null>(null)
  const [targetLng, setTargetLng] = useState<number | null>(null)
  
  const geolocation = useGeolocation()

  const handleGetLocation = async () => {
    try {
      await geolocation.getCurrentPosition()
    } catch (error) {
      console.error('Erro ao obter localização:', error)
    }
  }

  const handleRequestPermission = async () => {
    const granted = await geolocation.requestPermission()
    if (granted) {
      await handleGetLocation()
    }
  }

  const handleWatchPosition = () => {
    geolocation.watchPosition()
  }

  const handleStopWatching = () => {
    geolocation.clearWatch()
  }

  const handleSetTarget = () => {
    // São Paulo como exemplo
    setTargetLat(-23.5505)
    setTargetLng(-46.6333)
  }

  const calculateDistanceToTarget = () => {
    if (targetLat && targetLng) {
      return geolocation.calculateDistance(targetLat, targetLng)
    }
    return null
  }

  const getPermissionIcon = () => {
    switch (geolocation.permission) {
      case 'granted':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'denied':
        return <X className="h-4 w-4 text-red-500" />
      case 'prompt':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getPermissionText = () => {
    switch (geolocation.permission) {
      case 'granted':
        return 'Permitida'
      case 'denied':
        return 'Negada'
      case 'prompt':
        return 'Aguardando resposta'
      default:
        return 'Não verificada'
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Demo de Geolocalização
        </CardTitle>
        <CardDescription>
          Teste as funcionalidades de geolocalização do ShareCycle
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status da API */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Status da API</h3>
            <div className="flex items-center gap-2">
              {geolocation.isSupported ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">
                {geolocation.isSupported ? 'Suportada' : 'Não suportada'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Permissão</h3>
            <div className="flex items-center gap-2">
              {getPermissionIcon()}
              <span className="text-sm">{getPermissionText()}</span>
            </div>
          </div>
        </div>

        {/* Estado atual */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Estado Atual</h3>
          
          {geolocation.loading && (
            <Alert>
              <Navigation className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Obtendo sua localização...
              </AlertDescription>
            </Alert>
          )}

          {geolocation.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {geolocation.error}
              </AlertDescription>
            </Alert>
          )}

          {geolocation.latitude && geolocation.longitude && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Coordenadas:</span>
                <Badge variant="secondary">
                  {formatCoordinates(geolocation.latitude, geolocation.longitude)}
                </Badge>
              </div>
              
              {geolocation.accuracy && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Precisão:</span>
                  <Badge variant="outline">
                    ±{Math.round(geolocation.accuracy)}m
                  </Badge>
                </div>
              )}

              {geolocation.timestamp && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Última atualização:</span>
                  <Badge variant="outline">
                    {new Date(geolocation.timestamp).toLocaleTimeString()}
                  </Badge>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Controles</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleRequestPermission}
              disabled={geolocation.permission === 'granted' || geolocation.loading}
              variant="outline"
              size="sm"
            >
              Solicitar Permissão
            </Button>
            
            <Button 
              onClick={handleGetLocation}
              disabled={geolocation.permission !== 'granted' || geolocation.loading}
              size="sm"
            >
              Obter Localização
            </Button>
            
            <Button 
              onClick={handleWatchPosition}
              disabled={geolocation.permission !== 'granted' || geolocation.loading}
              variant="outline"
              size="sm"
            >
              Monitorar Posição
            </Button>
            
            <Button 
              onClick={handleStopWatching}
              variant="outline"
              size="sm"
            >
              Parar Monitoramento
            </Button>
          </div>
        </div>

        {/* Teste de distância */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Teste de Distância</h3>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSetTarget}
              variant="outline"
              size="sm"
            >
              Definir São Paulo como alvo
            </Button>
            
            {targetLat && targetLng && (
              <Badge variant="secondary">
                Alvo: {formatCoordinates(targetLat, targetLng)}
              </Badge>
            )}
          </div>

          {targetLat && targetLng && geolocation.latitude && geolocation.longitude && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Distância para São Paulo:</span>
              <Badge>
                {formatDistance(calculateDistanceToTarget())}
              </Badge>
            </div>
          )}
        </div>

        {/* Ações adicionais */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Ações</h3>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => geolocation.clearLocation()}
              variant="destructive"
              size="sm"
            >
              Limpar Localização
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 