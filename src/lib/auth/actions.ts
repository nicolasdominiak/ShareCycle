'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, registerSchema, resetPasswordSchema, updatePasswordSchema } from '@/lib/validations/auth'
import { mapSupabaseError, validatePasswordStrength } from '@/lib/auth/error-handling'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  // Validate the form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedFields = loginSchema.safeParse(data)

  if (!validatedFields.success) {
    redirect('/auth/login?error=invalid_credentials')
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

  if (error) {
    redirect('/auth/login?error=invalid_credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  // Validate the form data
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const validatedFields = registerSchema.safeParse(data)

  if (!validatedFields.success) {
    redirect('/auth/register?error=validation_failed')
  }

  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: {
        full_name: validatedFields.data.name,
      },
    },
  })

  if (error) {
    redirect('/auth/register?error=signup_failed')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login?message=check_email')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  // Validate the form data
  const data = {
    email: formData.get('email') as string,
  }

  const validatedFields = resetPasswordSchema.safeParse(data)

  if (!validatedFields.success) {
    redirect('/auth/reset-password?error=invalid_email')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(validatedFields.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=recovery&next=/auth/update-password`,
  })

  if (error) {
    redirect('/auth/reset-password?error=reset_failed')
  }

  redirect('/auth/reset-password?message=check_email')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  try {
    // Validate the form data
    const data = {
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    // Basic validation
    const validatedFields = updatePasswordSchema.safeParse(data)
    if (!validatedFields.success) {
      console.error('Validation failed:', validatedFields.error)
      redirect('/auth/update-password?error=validation_failed')
    }

    // Additional password strength validation
    const passwordStrengthError = validatePasswordStrength(validatedFields.data.password)
    if (passwordStrengthError) {
      redirect(`/auth/update-password?error=${passwordStrengthError}`)
    }

    // Check password confirmation
    if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
      redirect('/auth/update-password?error=passwords_mismatch')
    }

    // Check if user has a valid session
    const { data: { user }, error: sessionError } = await supabase.auth.getUser()

    if (sessionError) {
      console.error('Session error:', sessionError)
      const errorCode = mapSupabaseError(sessionError)
      redirect(`/auth/reset-password?error=${errorCode}`)
    }

    if (!user) {
      redirect('/auth/reset-password?error=invalid_session')
    }

    // Verify this is a recovery session (user should not have a complete session)
    // This helps ensure the user came through the proper recovery flow
    if (user.email_confirmed_at && user.last_sign_in_at) {
      // User has a complete session, redirect to home
      redirect('/')
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
      password: validatedFields.data.password
    })

    if (updateError) {
      console.error('Password update error:', updateError)
      const errorCode = mapSupabaseError(updateError)
      redirect(`/auth/update-password?error=${errorCode}`)
    }

    // Sign out the user after password update for security
    // This ensures they need to log in with the new password
    await supabase.auth.signOut()
    
    revalidatePath('/', 'layout')
    redirect('/auth/login?message=password_updated')

  } catch (error: any) {
    console.error('Unexpected error in updatePassword:', error)
    
    // Handle network errors or other unexpected issues
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      redirect('/auth/update-password?error=network_error')
    }
    
    // Generic server error for any other issues
    redirect('/auth/update-password?error=server_error')
  }
} 