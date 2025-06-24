'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    // Get initial session
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (!mounted) return
        
        if (error) {
          console.error('Error getting user:', error)
          setError(error.message)
        } else {
          setUser(user)
          setError(null)
        }
      } catch (err) {
        if (!mounted) return
        console.error('Unexpected error getting user:', err)
        setError('Erro inesperado ao carregar usuário')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        setUser(session?.user ?? null)
        setLoading(false)
        setError(null)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading, error }
} 