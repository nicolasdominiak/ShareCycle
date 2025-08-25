import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AuthSuccess } from '@/lib/auth/error-handling'
import Link from 'next/link'

interface SuccessAlertProps {
  success: AuthSuccess
  onContinue?: () => void
  showContinueButton?: boolean
  continueText?: string
  continueHref?: string
  className?: string
}

export function SuccessAlert({ 
  success, 
  onContinue, 
  showContinueButton = false,
  continueText = 'Continuar',
  continueHref,
  className 
}: SuccessAlertProps) {
  return (
    <Alert 
      className={`border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600 ${className || ''}`}
      role="alert"
      aria-live="polite"
    >
      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      <AlertTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm sm:text-base">{success.message}</span>
        {showContinueButton && (continueHref || onContinue) && (
          <>
            {continueHref ? (
              <Button asChild variant="outline" size="sm" className="h-8 px-3 text-xs sm:text-sm self-start sm:self-auto">
                <Link 
                  href={continueHref}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {continueText}
                  <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onContinue}
                className="h-8 px-3 text-xs sm:text-sm self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`${continueText} - continuar para próxima etapa`}
              >
                {continueText}
                <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
              </Button>
            )}
          </>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        {success.description && (
          <p className="text-xs sm:text-sm">{success.description}</p>
        )}
        
        {success.nextSteps && success.nextSteps.length > 0 && (
          <div>
            <p className="text-xs sm:text-sm font-medium mb-2">Próximos passos:</p>
            <ul className="text-xs sm:text-sm space-y-1 ml-4" role="list">
              {success.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start" role="listitem">
                  <span 
                    className="inline-block w-1 h-1 bg-current rounded-full mt-2 mr-2 flex-shrink-0" 
                    aria-hidden="true"
                  />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {success.code === 'password_updated' && (
          <div className="pt-2">
            <Button asChild variant="default" size="sm" className="text-xs sm:text-sm">
              <Link 
                href="/auth/login"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ArrowRight className="h-3 w-3 mr-1" aria-hidden="true" />
                Fazer login agora
              </Link>
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}