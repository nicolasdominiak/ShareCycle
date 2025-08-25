import React from 'react'
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AuthError } from '@/lib/auth/error-handling'
import Link from 'next/link'

interface ErrorAlertProps {
  error: AuthError
  onRetry?: () => void
  showRetryButton?: boolean
  className?: string
}

export function ErrorAlert({ 
  error, 
  onRetry, 
  showRetryButton = false,
  className 
}: ErrorAlertProps) {
  const getSeverityColor = (severity: AuthError['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-500/50 text-red-700 dark:text-red-400 [&>svg]:text-red-600'
      case 'medium':
        return 'border-orange-500/50 text-orange-700 dark:text-orange-400 [&>svg]:text-orange-600'
      case 'low':
        return 'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600'
      default:
        return 'border-destructive/50 text-destructive [&>svg]:text-destructive'
    }
  }

  return (
    <Alert 
      variant="destructive" 
      className={`${getSeverityColor(error.severity)} ${className || ''}`}
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      <AlertTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm sm:text-base">{error.message}</span>
        {showRetryButton && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="h-8 px-3 text-xs sm:text-sm self-start sm:self-auto"
            aria-label="Tentar novamente a operação"
          >
            <RefreshCw className="h-3 w-3 mr-1" aria-hidden="true" />
            Tentar novamente
          </Button>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        {error.description && (
          <p className="text-xs sm:text-sm">{error.description}</p>
        )}
        
        {error.recoveryInstructions.length > 0 && (
          <div>
            <p className="text-xs sm:text-sm font-medium mb-2">Como resolver:</p>
            <ul className="text-xs sm:text-sm space-y-1 ml-4" role="list">
              {error.recoveryInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start" role="listitem">
                  <span 
                    className="inline-block w-1 h-1 bg-current rounded-full mt-2 mr-2 flex-shrink-0" 
                    aria-hidden="true"
                  />
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {error.actionable && (
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {error.code === 'invalid_session' && (
              <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
                <Link 
                  href="/auth/reset-password"
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />
                  Solicitar novo link
                </Link>
              </Button>
            )}
            
            {(error.code === 'network_error' || error.code === 'server_error') && onRetry && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry}
                className="text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Tentar novamente a operação"
              >
                <RefreshCw className="h-3 w-3 mr-1" aria-hidden="true" />
                Tentar novamente
              </Button>
            )}
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}