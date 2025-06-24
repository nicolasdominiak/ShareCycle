"use server"

import { createClient } from '@/lib/supabase/server'
import { donationSchema, type DonationInput } from '@/lib/validations/donation'

import { revalidatePath } from 'next/cache'

export async function createDonation(data: DonationInput) {
  try {
    // Validar dados no servidor
    const validatedData = donationSchema.parse(data)
    
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return {
        success: false,
        error: 'Usuário não autenticado'
      }
    }

    // Preparar dados para inserção
    const donationData = {
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      quantity: validatedData.quantity,
      condition: validatedData.condition,
      images: validatedData.images || [],
      pickup_address: validatedData.pickup_address,
      pickup_city: validatedData.pickup_city,
      pickup_state: validatedData.pickup_state,
      pickup_zip_code: validatedData.pickup_zip_code,
      pickup_instructions: validatedData.pickup_instructions || null,
      expiry_date: validatedData.expiry_date || null,
      donor_id: user.id,
    }

    // Inserir doação no banco
    const { data: donation, error } = await supabase
      .from('donations')
      .insert(donationData)
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar doação:', {
        error,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      return {
        success: false,
        error: `Erro ao salvar doação: ${error.message}`
      }
    }

    // Revalidar cache das páginas relacionadas
    revalidatePath('/donations')
    revalidatePath('/dashboard')

    return {
      success: true,
      data: donation
    }
  } catch (error) {
    console.error('Erro na action createDonation:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        success: false,
        error: 'Dados inválidos fornecidos'
      }
    }
    
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}

export async function getDonations() {
  try {
    const supabase = await createClient()
    
    const { data: donations, error } = await supabase
      .from('donations_with_donor')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar doações:', error)
      throw new Error('Erro ao carregar doações')
    }

    return donations
  } catch (error) {
    console.error('Erro na getDonations:', error)
    throw error
  }
}

export async function getUserDonations() {
  try {
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Usuário não autenticado')
    }

    const { data: donations, error } = await supabase
      .from('donations')
      .select('*')
      .eq('donor_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar doações do usuário:', error)
      throw new Error('Erro ao carregar suas doações')
    }

    return donations
  } catch (error) {
    console.error('Erro na getUserDonations:', error)
    throw error
  }
} 