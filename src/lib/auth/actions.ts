'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, registerSchema, resetPasswordSchema } from '@/lib/validations/auth'
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
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/reset-password`,
  })

  if (error) {
    redirect('/auth/reset-password?error=reset_failed')
  }

  redirect('/auth/reset-password?message=check_email')
} 