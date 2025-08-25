'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/lib/validations/auth'
import { validatePasswordStrength, getAuthError } from '@/lib/auth/error-handling'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorAlert } from '@/components/ui/error-alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'

interface UpdatePasswordFormProps {
  onSubmit?: (data: UpdatePasswordInput) => Promise<void>
  action?: (formData: FormData) => Promise<void>
  isLoading?: boolean
  onError?: (error: string) => void
}

export function UpdatePasswordForm({ onSubmit, action, isLoading = false, onError }: UpdatePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{
    isValid: boolean
    hasMinLength: boolean
    hasLowercase: boolean
    hasUppercase: boolean
    hasNumber: boolean
  }>({
    isValid: false,
    hasMinLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false
  })

  // Refs for focus management
  const passwordFieldRef = useRef<HTMLInputElement>(null)
  const confirmPasswordFieldRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  // Keyboard navigation
  useKeyboardNavigation({
    autoFocus: true,
    focusableSelector: 'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  })

  // Focus management after form submission
  useEffect(() => {
    if (formError) {
      // Focus first field with error or first field if no specific error
      passwordFieldRef.current?.focus()
    }
  }, [formError])

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange', // Enable real-time validation
  })

  // Watch password field for real-time strength validation
  const watchedPassword = form.watch('password')
  
  useEffect(() => {
    if (watchedPassword) {
      const hasMinLength = watchedPassword.length >= 6
      const hasLowercase = /[a-z]/.test(watchedPassword)
      const hasUppercase = /[A-Z]/.test(watchedPassword)
      const hasNumber = /\d/.test(watchedPassword)
      
      setPasswordStrength({
        isValid: hasMinLength && hasLowercase && hasUppercase && hasNumber,
        hasMinLength,
        hasLowercase,
        hasUppercase,
        hasNumber
      })
    } else {
      setPasswordStrength({
        isValid: false,
        hasMinLength: false,
        hasLowercase: false,
        hasUppercase: false,
        hasNumber: false
      })
    }
  }, [watchedPassword])

  const handleSubmit = async (data: UpdatePasswordInput) => {
    if (onSubmit) {
      try {
        setIsSubmitting(true)
        setFormError(null)
        setSubmitProgress(0)
        setIsSuccess(false)
        
        // Progress simulation for better UX
        const progressInterval = setInterval(() => {
          setSubmitProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)
        
        // Additional client-side validation
        const passwordError = validatePasswordStrength(data.password)
        if (passwordError) {
          clearInterval(progressInterval)
          setFormError(passwordError)
          onError?.(passwordError)
          return
        }
        
        if (data.password !== data.confirmPassword) {
          clearInterval(progressInterval)
          setFormError('passwords_mismatch')
          onError?.('passwords_mismatch')
          return
        }
        
        await onSubmit(data)
        
        // Complete progress and show success
        clearInterval(progressInterval)
        setSubmitProgress(100)
        setIsSuccess(true)
        
        // Focus management for success
        setTimeout(() => {
          submitButtonRef.current?.focus()
        }, 500)
        
      } catch (error: any) {
        console.error('Form submission error:', error)
        const errorCode = error?.code || 'unknown_error'
        setFormError(errorCode)
        onError?.(errorCode)
        setSubmitProgress(0)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleFormAction = async (formData: FormData) => {
    if (action) {
      try {
        setIsSubmitting(true)
        setFormError(null)
        setSubmitProgress(0)
        setIsSuccess(false)
        
        // Progress simulation for better UX
        const progressInterval = setInterval(() => {
          setSubmitProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)
        
        // Additional client-side validation for server action
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        
        const passwordError = validatePasswordStrength(password)
        if (passwordError) {
          clearInterval(progressInterval)
          setFormError(passwordError)
          onError?.(passwordError)
          return
        }
        
        if (password !== confirmPassword) {
          clearInterval(progressInterval)
          setFormError('passwords_mismatch')
          onError?.('passwords_mismatch')
          return
        }
        
        await action(formData)
        
        // Complete progress and show success
        clearInterval(progressInterval)
        setSubmitProgress(100)
        setIsSuccess(true)
        
        // Focus management for success
        setTimeout(() => {
          submitButtonRef.current?.focus()
        }, 500)
        
      } catch (error: any) {
        console.error('Server action error:', error)
        const errorCode = error?.code || 'unknown_error'
        setFormError(errorCode)
        onError?.(errorCode)
        setSubmitProgress(0)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleRetry = () => {
    setFormError(null)
    setSubmitProgress(0)
    setIsSuccess(false)
    form.clearErrors()
    // Focus back to first field for retry
    setTimeout(() => {
      passwordFieldRef.current?.focus()
    }, 100)
  }

  const currentlyLoading = isLoading || isSubmitting

  // Handle password input changes for server action form
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    
    if (password) {
      const hasMinLength = password.length >= 6
      const hasLowercase = /[a-z]/.test(password)
      const hasUppercase = /[A-Z]/.test(password)
      const hasNumber = /\d/.test(password)
      
      setPasswordStrength({
        isValid: hasMinLength && hasLowercase && hasUppercase && hasNumber,
        hasMinLength,
        hasLowercase,
        hasUppercase,
        hasNumber
      })
    } else {
      setPasswordStrength({
        isValid: false,
        hasMinLength: false,
        hasLowercase: false,
        hasUppercase: false,
        hasNumber: false
      })
    }
  }

  // Enhanced focus management after form submission
  useEffect(() => {
    if (!currentlyLoading && formError) {
      // Focus first field with error or first field if no specific error
      setTimeout(() => {
        passwordFieldRef.current?.focus()
      }, 100) // Small delay to ensure DOM updates
    }
  }, [currentlyLoading, formError])

  // Password strength indicator component with enhanced accessibility and smooth transitions
  const PasswordStrengthIndicator = ({ id }: { id: string }) => (
    <div 
      className="space-y-2 text-xs sm:text-sm" 
      id={id}
      role="status"
      aria-live="polite"
      aria-label="Indicador de força da senha"
    >
      <p className="font-medium text-muted-foreground">Critérios da senha:</p>
      <div className="space-y-1">
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ${
            passwordStrength.hasMinLength 
              ? 'text-green-600 transform scale-100' 
              : 'text-muted-foreground transform scale-95'
          }`}
          role="listitem"
        >
          <div className="transition-all duration-300">
            {passwordStrength.hasMinLength ? (
              <CheckCircle 
                className="h-3 w-3 sm:h-4 sm:w-4 animate-in zoom-in-50 duration-300" 
                aria-label="Critério atendido"
              />
            ) : (
              <AlertCircle 
                className="h-3 w-3 sm:h-4 sm:w-4" 
                aria-label="Critério não atendido"
              />
            )}
          </div>
          <span className="transition-all duration-300">Pelo menos 6 caracteres</span>
        </div>
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ${
            passwordStrength.hasLowercase 
              ? 'text-green-600 transform scale-100' 
              : 'text-muted-foreground transform scale-95'
          }`}
          role="listitem"
        >
          <div className="transition-all duration-300">
            {passwordStrength.hasLowercase ? (
              <CheckCircle 
                className="h-3 w-3 sm:h-4 sm:w-4 animate-in zoom-in-50 duration-300" 
                aria-label="Critério atendido"
              />
            ) : (
              <AlertCircle 
                className="h-3 w-3 sm:h-4 sm:w-4" 
                aria-label="Critério não atendido"
              />
            )}
          </div>
          <span className="transition-all duration-300">Uma letra minúscula (a-z)</span>
        </div>
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ${
            passwordStrength.hasUppercase 
              ? 'text-green-600 transform scale-100' 
              : 'text-muted-foreground transform scale-95'
          }`}
          role="listitem"
        >
          <div className="transition-all duration-300">
            {passwordStrength.hasUppercase ? (
              <CheckCircle 
                className="h-3 w-3 sm:h-4 sm:w-4 animate-in zoom-in-50 duration-300" 
                aria-label="Critério atendido"
              />
            ) : (
              <AlertCircle 
                className="h-3 w-3 sm:h-4 sm:w-4" 
                aria-label="Critério não atendido"
              />
            )}
          </div>
          <span className="transition-all duration-300">Uma letra maiúscula (A-Z)</span>
        </div>
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ${
            passwordStrength.hasNumber 
              ? 'text-green-600 transform scale-100' 
              : 'text-muted-foreground transform scale-95'
          }`}
          role="listitem"
        >
          <div className="transition-all duration-300">
            {passwordStrength.hasNumber ? (
              <CheckCircle 
                className="h-3 w-3 sm:h-4 sm:w-4 animate-in zoom-in-50 duration-300" 
                aria-label="Critério atendido"
              />
            ) : (
              <AlertCircle 
                className="h-3 w-3 sm:h-4 sm:w-4" 
                aria-label="Critério não atendido"
              />
            )}
          </div>
          <span className="transition-all duration-300">Um número (0-9)</span>
        </div>
      </div>
      <div className="sr-only" aria-live="assertive">
        {passwordStrength.isValid 
          ? "Todos os critérios de senha foram atendidos" 
          : `${[passwordStrength.hasMinLength, passwordStrength.hasLowercase, passwordStrength.hasUppercase, passwordStrength.hasNumber].filter(Boolean).length} de 4 critérios atendidos`
        }
      </div>
    </div>
  )

  // If using server action, render traditional form
  if (action && !onSubmit) {
    return (
      <div className="space-y-4 w-full max-w-sm mx-auto sm:max-w-md">
        {formError && (
          <div role="alert" aria-live="assertive">
            <ErrorAlert 
              error={getAuthError(formError)} 
              onRetry={handleRetry}
              showRetryButton={['network_error', 'server_error', 'update_failed'].includes(formError)}
            />
          </div>
        )}
        
        <div className={`relative transition-all duration-300 ${
          currentlyLoading ? 'scale-[0.98] opacity-95' : 'scale-100 opacity-100'
        }`}>
          {/* Loading overlay */}
          {currentlyLoading && (
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg transition-all duration-300"
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-3 text-muted-foreground max-w-xs w-full px-4">
                {isSuccess ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600 animate-in zoom-in-50 duration-500" />
                    <span className="text-sm font-medium text-green-600">Senha atualizada com sucesso!</span>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-sm animate-pulse">Atualizando senha...</span>
                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${submitProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{submitProgress}%</span>
                  </>
                )}
              </div>
            </div>
          )}
          
          <form 
            action={handleFormAction} 
            className={`space-y-4 sm:space-y-6 transition-all duration-300 ${
              currentlyLoading ? 'pointer-events-none' : ''
            }`}
            noValidate
            aria-label="Formulário de atualização de senha"
          >
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nova senha <span className="text-red-500" aria-label="campo obrigatório">*</span>
            </label>
            <div className="relative">
              <Input
                ref={passwordFieldRef}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua nova senha"
                disabled={currentlyLoading}
                required
                onChange={handlePasswordChange}
                aria-describedby="password-strength password-help"
                aria-invalid={formError ? 'true' : 'false'}
                className={`pr-12 text-base sm:text-sm transition-all duration-200 ${
                  currentlyLoading 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'opacity-100'
                }`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={currentlyLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded p-1 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
            <div id="password-help" className="sr-only">
              Campo para inserir sua nova senha. A senha deve atender aos critérios de segurança listados abaixo.
            </div>
          </div>

          <PasswordStrengthIndicator id="password-strength" />

          <div className="space-y-2">
            <label 
              htmlFor="confirmPassword" 
              className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirmar nova senha <span className="text-red-500" aria-label="campo obrigatório">*</span>
            </label>
            <div className="relative">
              <Input
                ref={confirmPasswordFieldRef}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua nova senha"
                disabled={currentlyLoading}
                required
                aria-describedby="confirm-password-help"
                aria-invalid={formError ? 'true' : 'false'}
                className={`pr-12 text-base sm:text-sm transition-all duration-200 ${
                  currentlyLoading 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'opacity-100'
                }`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={currentlyLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded p-1 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={showConfirmPassword ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                tabIndex={0}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
            <div id="confirm-password-help" className="sr-only">
              Campo para confirmar sua nova senha. Deve ser idêntica à senha digitada acima.
            </div>
          </div>

          <Button 
            ref={submitButtonRef}
            type="submit" 
            className={`w-full h-12 sm:h-10 text-base sm:text-sm font-medium transition-all duration-300 ${
              currentlyLoading 
                ? 'scale-95 opacity-90' 
                : 'scale-100 opacity-100 hover:scale-[1.02] active:scale-[0.98]'
            } ${
              !passwordStrength.isValid && !currentlyLoading
                ? 'opacity-60 cursor-not-allowed'
                : passwordStrength.isValid && !currentlyLoading
                ? 'shadow-lg hover:shadow-xl'
                : ''
            }`}
            disabled={currentlyLoading || !passwordStrength.isValid}
            aria-describedby="submit-help"
          >
            {currentlyLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" aria-hidden="true" />
                <span className="animate-pulse">Atualizando senha...</span>
              </>
            ) : (
              'Atualizar senha'
            )}
          </Button>
          <div id="submit-help" className="sr-only">
            {passwordStrength.isValid 
              ? "Botão habilitado. Clique para atualizar sua senha." 
              : "Botão desabilitado. Complete todos os critérios de senha para habilitar."
            }
          </div>
          </form>
        </div>
      </div>
    )
  }

  // React Hook Form implementation
  return (
    <div className="space-y-4 w-full max-w-sm mx-auto sm:max-w-md">
      {formError && (
        <div role="alert" aria-live="assertive">
          <ErrorAlert 
            error={getAuthError(formError)} 
            onRetry={handleRetry}
            showRetryButton={['network_error', 'server_error', 'update_failed'].includes(formError)}
          />
        </div>
      )}
      
      <div className={`relative transition-all duration-300 ${
        currentlyLoading ? 'scale-[0.98] opacity-95' : 'scale-100 opacity-100'
      }`}>
        {/* Loading overlay */}
        {currentlyLoading && (
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg transition-all duration-300"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-3 text-muted-foreground max-w-xs w-full px-4">
              {isSuccess ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600 animate-in zoom-in-50 duration-500" />
                  <span className="text-sm font-medium text-green-600">Senha atualizada com sucesso!</span>
                </>
              ) : (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm animate-pulse">Atualizando senha...</span>
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${submitProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{submitProgress}%</span>
                </>
              )}
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className={`space-y-4 sm:space-y-6 transition-all duration-300 ${
              currentlyLoading ? 'pointer-events-none' : ''
            }`}
            noValidate
            aria-label="Formulário de atualização de senha"
          >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Nova senha <span className="text-red-500" aria-label="campo obrigatório">*</span>
                </FormLabel>
                <FormDescription className="text-xs sm:text-sm">
                  Sua nova senha deve atender aos critérios de segurança listados abaixo.
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      ref={passwordFieldRef}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Digite sua nova senha"
                      disabled={currentlyLoading}
                      aria-describedby="password-strength-rhf"
                      className={`pr-12 text-base sm:text-sm transition-all duration-200 ${
                        currentlyLoading 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'opacity-100'
                      }`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={currentlyLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded p-1 transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      tabIndex={0}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordStrengthIndicator id="password-strength-rhf" />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Confirmar nova senha <span className="text-red-500" aria-label="campo obrigatório">*</span>
                </FormLabel>
                <FormDescription className="text-xs sm:text-sm">
                  Digite novamente sua nova senha para confirmação.
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      ref={confirmPasswordFieldRef}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirme sua nova senha"
                      disabled={currentlyLoading}
                      className={`pr-12 text-base sm:text-sm transition-all duration-200 ${
                        currentlyLoading 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'opacity-100'
                      }`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={currentlyLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded p-1 transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label={showConfirmPassword ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                      tabIndex={0}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            ref={submitButtonRef}
            type="submit" 
            className={`w-full h-12 sm:h-10 text-base sm:text-sm font-medium transition-all duration-300 ${
              currentlyLoading 
                ? 'scale-95 opacity-90' 
                : 'scale-100 opacity-100 hover:scale-[1.02] active:scale-[0.98]'
            } ${
              !passwordStrength.isValid && !currentlyLoading
                ? 'opacity-60 cursor-not-allowed'
                : passwordStrength.isValid && !currentlyLoading
                ? 'shadow-lg hover:shadow-xl'
                : ''
            }`}
            disabled={currentlyLoading || !passwordStrength.isValid}
            aria-describedby="submit-help-rhf"
          >
            {currentlyLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" aria-hidden="true" />
                <span className="animate-pulse">Atualizando senha...</span>
              </>
            ) : (
              'Atualizar senha'
            )}
          </Button>
          <div id="submit-help-rhf" className="sr-only">
            {passwordStrength.isValid 
              ? "Botão habilitado. Clique para atualizar sua senha." 
              : "Botão desabilitado. Complete todos os critérios de senha para habilitar."
            }
          </div>
          </form>
        </Form>
      </div>
    </div>
  )
}