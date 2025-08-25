/**
 * Comprehensive error handling utilities for authentication flows
 * Provides error message mapping, recovery instructions, and user guidance
 */

export interface AuthError {
  code: string
  message: string
  description?: string
  recoveryInstructions: string[]
  actionable: boolean
  severity: 'low' | 'medium' | 'high'
}

export interface AuthSuccess {
  code: string
  message: string
  description?: string
  nextSteps?: string[]
}

/**
 * Comprehensive error mapping for password reset and update flows
 */
export const AUTH_ERRORS: Record<string, AuthError> = {
  // Session and authentication errors
  invalid_session: {
    code: 'invalid_session',
    message: 'Sessão inválida ou expirada',
    description: 'Seu link de recuperação de senha expirou ou não é mais válido.',
    recoveryInstructions: [
      'Solicite um novo link de recuperação de senha',
      'Verifique se você está usando o link mais recente do seu email',
      'Certifique-se de que não passou mais de 1 hora desde o recebimento do email'
    ],
    actionable: true,
    severity: 'medium'
  },
  
  expired_token: {
    code: 'expired_token',
    message: 'Link de recuperação expirado',
    description: 'O link de recuperação de senha que você usou já expirou.',
    recoveryInstructions: [
      'Solicite um novo link de recuperação de senha',
      'Use o novo link dentro de 1 hora após recebê-lo',
      'Verifique sua caixa de spam se não receber o email'
    ],
    actionable: true,
    severity: 'medium'
  },

  // Password update errors
  update_failed: {
    code: 'update_failed',
    message: 'Erro ao atualizar senha',
    description: 'Não foi possível atualizar sua senha devido a um erro interno.',
    recoveryInstructions: [
      'Tente novamente em alguns minutos',
      'Verifique sua conexão com a internet',
      'Se o problema persistir, solicite um novo link de recuperação'
    ],
    actionable: true,
    severity: 'high'
  },

  weak_password: {
    code: 'weak_password',
    message: 'Senha muito fraca',
    description: 'A senha escolhida não atende aos critérios de segurança.',
    recoveryInstructions: [
      'Use pelo menos 6 caracteres',
      'Inclua pelo menos uma letra minúscula (a-z)',
      'Inclua pelo menos uma letra maiúscula (A-Z)',
      'Inclua pelo menos um número (0-9)'
    ],
    actionable: true,
    severity: 'low'
  },

  // Validation errors
  validation_failed: {
    code: 'validation_failed',
    message: 'Dados inválidos',
    description: 'Os dados fornecidos não são válidos ou estão incompletos.',
    recoveryInstructions: [
      'Verifique se todos os campos estão preenchidos corretamente',
      'Certifique-se de que as senhas coincidem',
      'Verifique se a senha atende aos critérios de segurança'
    ],
    actionable: true,
    severity: 'low'
  },

  passwords_mismatch: {
    code: 'passwords_mismatch',
    message: 'Senhas não coincidem',
    description: 'A senha e a confirmação de senha devem ser idênticas.',
    recoveryInstructions: [
      'Digite a mesma senha nos dois campos',
      'Verifique se não há espaços extras no início ou fim',
      'Certifique-se de que o Caps Lock não está ativado'
    ],
    actionable: true,
    severity: 'low'
  },

  // Network and server errors
  network_error: {
    code: 'network_error',
    message: 'Erro de conexão',
    description: 'Não foi possível conectar com o servidor.',
    recoveryInstructions: [
      'Verifique sua conexão com a internet',
      'Tente novamente em alguns minutos',
      'Se o problema persistir, entre em contato com o suporte'
    ],
    actionable: true,
    severity: 'medium'
  },

  server_error: {
    code: 'server_error',
    message: 'Erro interno do servidor',
    description: 'Ocorreu um erro interno. Nossa equipe foi notificada.',
    recoveryInstructions: [
      'Tente novamente em alguns minutos',
      'Se o problema persistir, entre em contato com o suporte',
      'Você pode tentar solicitar um novo link de recuperação'
    ],
    actionable: true,
    severity: 'high'
  },

  // Rate limiting
  rate_limit_exceeded: {
    code: 'rate_limit_exceeded',
    message: 'Muitas tentativas',
    description: 'Você fez muitas tentativas recentemente. Aguarde antes de tentar novamente.',
    recoveryInstructions: [
      'Aguarde 15 minutos antes de tentar novamente',
      'Certifique-se de usar a senha correta',
      'Se necessário, solicite um novo link de recuperação'
    ],
    actionable: true,
    severity: 'medium'
  },

  // Generic fallback
  unknown_error: {
    code: 'unknown_error',
    message: 'Erro inesperado',
    description: 'Ocorreu um erro inesperado. Tente novamente.',
    recoveryInstructions: [
      'Tente novamente em alguns minutos',
      'Verifique sua conexão com a internet',
      'Se o problema persistir, entre em contato com o suporte'
    ],
    actionable: true,
    severity: 'medium'
  }
}

/**
 * Success message mapping for authentication flows
 */
export const AUTH_SUCCESS: Record<string, AuthSuccess> = {
  password_updated: {
    code: 'password_updated',
    message: 'Senha atualizada com sucesso!',
    description: 'Sua senha foi alterada e você já pode fazer login com a nova senha.',
    nextSteps: [
      'Faça login com sua nova senha',
      'Certifique-se de atualizar a senha em outros dispositivos',
      'Considere ativar a autenticação de dois fatores para maior segurança'
    ]
  },
  
  reset_email_sent: {
    code: 'reset_email_sent',
    message: 'Email de recuperação enviado!',
    description: 'Verifique sua caixa de entrada e clique no link para redefinir sua senha.',
    nextSteps: [
      'Verifique sua caixa de entrada (e spam)',
      'Clique no link dentro de 1 hora',
      'Se não receber o email, tente novamente'
    ]
  }
}

/**
 * Get error details by error code
 */
export function getAuthError(errorCode: string): AuthError {
  return AUTH_ERRORS[errorCode] || AUTH_ERRORS.unknown_error
}

/**
 * Get success details by success code
 */
export function getAuthSuccess(successCode: string): AuthSuccess {
  return AUTH_SUCCESS[successCode] || {
    code: successCode,
    message: successCode,
    description: undefined,
    nextSteps: undefined
  }
}

/**
 * Map Supabase error codes to our internal error codes
 */
export function mapSupabaseError(supabaseError: any): string {
  if (!supabaseError) return 'unknown_error'
  
  const errorMessage = supabaseError.message?.toLowerCase() || ''
  const errorCode = supabaseError.code || ''
  
  // Map common Supabase errors
  if (errorMessage.includes('invalid_grant') || errorMessage.includes('token')) {
    return 'invalid_session'
  }
  
  if (errorMessage.includes('expired')) {
    return 'expired_token'
  }
  
  if (errorMessage.includes('weak_password') || errorMessage.includes('password')) {
    return 'weak_password'
  }
  
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'network_error'
  }
  
  if (errorCode === '429' || errorMessage.includes('rate')) {
    return 'rate_limit_exceeded'
  }
  
  if (errorCode.startsWith('5') || errorMessage.includes('server')) {
    return 'server_error'
  }
  
  return 'unknown_error'
}

/**
 * Validate password strength and return specific error if weak
 */
export function validatePasswordStrength(password: string): string | null {
  if (!password || password.length < 6) {
    return 'weak_password'
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return 'weak_password'
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'weak_password'
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'weak_password'
  }
  
  return null
}