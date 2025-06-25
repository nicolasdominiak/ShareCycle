'use client'

import { useState } from 'react'
import { MapPin, Shield, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface GeolocationPermissionProps {
  onPermissionGranted?: () => void
  onPermissionDenied?: () => void
  onClose?: () => void
  className?: string
}

export function GeolocationPermission({
  onPermissionGranted,
  onPermissionDenied,
  onClose,
  className
}: GeolocationPermissionProps) {
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRequestPermission = async () => {
    setIsRequesting(true)
    setError(null)

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocalização não é suportada neste navegador')
      }

      // Apenas chama o callback, deixando o componente pai lidar com a permissão do navegador
      setIsRequesting(false)
      onPermissionGranted?.()
      
    } catch {
      setIsRequesting(false)
      setError('Erro inesperado ao solicitar permissão de localização')
    }
  }

  const handleDeny = () => {
    onPermissionDenied?.()
    onClose?.()
  }

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle>Permitir acesso à localização?</CardTitle>
        <CardDescription>
          O ShareCycle gostaria de acessar sua localização para mostrar doações próximas e melhorar sua experiência.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Encontrar doações próximas</p>
              <p className="text-xs text-muted-foreground">
                Veja doações disponíveis na sua região
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Ordenar por distância</p>
              <p className="text-xs text-muted-foreground">
                Resultados organizados pela proximidade
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Preencher localização automaticamente</p>
              <p className="text-xs text-muted-foreground">
                Facilita o cadastro de novas doações
              </p>
            </div>
          </div>
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Sua privacidade é importante. A localização é usada apenas para melhorar sua experiência e não é armazenada permanentemente.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleRequestPermission} 
          disabled={isRequesting}
          className="w-full"
        >
          {isRequesting ? 'Solicitando permissão...' : 'Permitir localização'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleDeny}
          disabled={isRequesting}
          className="w-full"
        >
          Não permitir
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Você pode alterar esta configuração a qualquer momento nas configurações do seu navegador.
        </p>
      </CardFooter>
    </Card>
  )
}

// Componente wrapper para usar em diálogos
export function GeolocationPermissionDialog({
  open,
  onOpenChange,
  ...props
}: GeolocationPermissionProps & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md">
        <GeolocationPermission
          {...props}
          onClose={() => onOpenChange?.(false)}
        />
      </div>
    </div>
  )
} 