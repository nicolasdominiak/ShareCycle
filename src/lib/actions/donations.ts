"use server"

import { createClient } from '@/lib/supabase/server'
import { donationSchema, type DonationInput } from '@/lib/validations/donation'
import { geocodeDonationAddress } from '@/lib/utils/geocoding'

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

    // Tentar geocodificar o endereço se não temos coordenadas
    let latitude = validatedData.pickup_latitude
    let longitude = validatedData.pickup_longitude
    
    if (!latitude || !longitude) {
      try {
        const coordinates = await geocodeDonationAddress({
          pickup_address: validatedData.pickup_address,
          pickup_city: validatedData.pickup_city,
          pickup_state: validatedData.pickup_state,
          pickup_zip_code: validatedData.pickup_zip_code
        })
        
        if (coordinates) {
          latitude = coordinates.latitude
          longitude = coordinates.longitude
          console.log('Coordenadas obtidas via geocodificação:', { latitude, longitude })
        }
      } catch (error) {
        console.warn('Erro na geocodificação durante criação:', error)
        // Não falhar a criação da doação por causa da geocodificação
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
      pickup_latitude: latitude,
      pickup_longitude: longitude,
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
    revalidatePath('/donations/my-donations')
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

export async function updateDonation(id: string, data: DonationInput) {
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

    // Verificar se a doação existe e pertence ao usuário
    const { data: existingDonation, error: fetchError } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .eq('donor_id', user.id)
      .single()

    if (fetchError || !existingDonation) {
      return {
        success: false,
        error: 'Doação não encontrada ou você não tem permissão para editá-la'
      }
    }

    // Tentar geocodificar o endereço se necessário
    let latitude = validatedData.pickup_latitude
    let longitude = validatedData.pickup_longitude
    
    // Verificar se o endereço mudou e requer nova geocodificação
    const addressChanged = (
      existingDonation.pickup_address !== validatedData.pickup_address ||
      existingDonation.pickup_city !== validatedData.pickup_city ||
      existingDonation.pickup_state !== validatedData.pickup_state ||
      existingDonation.pickup_zip_code !== validatedData.pickup_zip_code
    )
    
    if (addressChanged || (!latitude || !longitude)) {
      try {
        const coordinates = await geocodeDonationAddress({
          pickup_address: validatedData.pickup_address,
          pickup_city: validatedData.pickup_city,
          pickup_state: validatedData.pickup_state,
          pickup_zip_code: validatedData.pickup_zip_code
        })
        
        if (coordinates) {
          latitude = coordinates.latitude
          longitude = coordinates.longitude
          console.log('Coordenadas atualizadas via geocodificação:', { latitude, longitude })
        }
      } catch (error) {
        console.warn('Erro na geocodificação durante atualização:', error)
        // Manter coordenadas existentes se a geocodificação falhar
        latitude = latitude || existingDonation.pickup_latitude
        longitude = longitude || existingDonation.pickup_longitude
      }
    }

    // Preparar dados para atualização
    const updateData = {
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
      pickup_latitude: latitude,
      pickup_longitude: longitude,
      expiry_date: validatedData.expiry_date || null,
      updated_at: new Date().toISOString(),
    }

    // Atualizar doação no banco
    const { data: donation, error } = await supabase
      .from('donations')
      .update(updateData)
      .eq('id', id)
      .eq('donor_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar doação:', {
        error,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      return {
        success: false,
        error: `Erro ao atualizar doação: ${error.message}`
      }
    }

    // Revalidar cache das páginas relacionadas
    revalidatePath('/donations')
    revalidatePath('/donations/my-donations')
    revalidatePath(`/donations/${id}`)

    return {
      success: true,
      data: donation
    }
  } catch (error) {
    console.error('Erro na action updateDonation:', error)
    
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

export async function getDonationById(id: string) {
  try {
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('Usuário não autenticado')
    }

    const { data: donation, error } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .eq('donor_id', user.id)
      .single()

    if (error) {
      console.error('Erro ao buscar doação:', error)
      throw new Error('Doação não encontrada ou você não tem permissão para acessá-la')
    }

    return donation
  } catch (error) {
    console.error('Erro na getDonationById:', error)
    throw error
  }
}

export async function getDonations() {
  try {
    const supabase = await createClient()
    
    const { data: donations, error } = await supabase
      .from('donations_with_donor')
      .select('*')
      .eq('is_active', true)
      .eq('status', 'disponível')
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

export async function getFilteredDonations(filters: {
  search?: string
  category?: string
  city?: string
  orderBy?: string
  pageParam?: number
  userLatitude?: number
  userLongitude?: number
}) {
  try {
    const supabase = await createClient()
    
    const PAGE_SIZE = 12 // 12 doações por página
    const offset = (filters.pageParam || 0) * PAGE_SIZE
    
    let query = supabase
      .from('donations_with_donor')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .eq('status', 'disponível')

    // Filtro de busca por título e descrição
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    // Filtro por categoria
    if (filters.category) {
      query = query.eq('category', filters.category)
    }

    // Filtro por cidade
    if (filters.city) {
      query = query.ilike('pickup_city', `%${filters.city}%`)
    }

    // Ordenação
    switch (filters.orderBy) {
      case 'distance':
        // Para ordenação por distância, precisamos fazer a query sem ordenação
        // e ordenar no JavaScript usando cálculo de distância
        if (filters.userLatitude && filters.userLongitude) {
          // Não aplicar ordenação no SQL, vamos ordenar depois
          break
        } else {
          // Se não tem coordenadas do usuário, ordenar por data
          query = query.order('created_at', { ascending: false })
          break
        }
      case 'oldest':
        query = query.order('created_at', { ascending: true })
        break
      case 'title':
        query = query.order('title', { ascending: true })
        break
      case 'category':
        query = query.order('category', { ascending: true }).order('created_at', { ascending: false })
        break
      default: // 'newest'
        query = query.order('created_at', { ascending: false })
        break
    }

    // Aplicar paginação
    query = query.range(offset, offset + PAGE_SIZE - 1)

    const { data: donations, error, count } = await query

    if (error) {
      console.error('Erro ao buscar doações filtradas:', error)
      throw new Error('Erro ao carregar doações')
    }

    let processedDonations = donations || []

    // Se ordenação por distância foi solicitada e temos coordenadas do usuário
    if (filters.orderBy === 'distance' && filters.userLatitude && filters.userLongitude) {
      // Função para calcular distância usando fórmula de Haversine
      const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
        const R = 6371 // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLng = (lng2 - lng1) * Math.PI / 180
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
          Math.sin(dLng/2) * Math.sin(dLng/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return R * c
      }

      // Adicionar distância a cada doação e filtrar aquelas sem coordenadas
      processedDonations = processedDonations
        .map(donation => {
          if (donation.pickup_latitude && donation.pickup_longitude) {
            const distance = calculateDistance(
              filters.userLatitude!,
              filters.userLongitude!,
              donation.pickup_latitude,
              donation.pickup_longitude
            )
            return { ...donation, calculated_distance: distance }
          }
          return { ...donation, calculated_distance: Infinity } // Sem coordenadas vai para o final
        })
        .sort((a, b) => a.calculated_distance - b.calculated_distance)
    }

    const totalItems = count || 0
    const totalPages = Math.ceil(totalItems / PAGE_SIZE)
    const hasNextPage = (filters.pageParam || 0) < totalPages - 1

    return {
      data: processedDonations,
      nextCursor: hasNextPage ? (filters.pageParam || 0) + 1 : undefined,
      hasNextPage,
      totalItems,
      totalPages,
      currentPage: filters.pageParam || 0
    }
  } catch (error) {
    console.error('Erro na getFilteredDonations:', error)
    throw error
  }
}

export async function deleteDonation(id: string) {
  try {
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return {
        success: false,
        error: 'Usuário não autenticado'
      }
    }

    // Verificar se a doação existe e pertence ao usuário
    const { data: existingDonation, error: fetchError } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .eq('donor_id', user.id)
      .single()

    if (fetchError || !existingDonation) {
      return {
        success: false,
        error: 'Doação não encontrada ou você não tem permissão para excluí-la'
      }
    }

    // Soft delete - marcar como inativa
    const { error } = await supabase
      .from('donations')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('donor_id', user.id)

    if (error) {
      console.error('Erro ao excluir doação:', {
        error,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      return {
        success: false,
        error: `Erro ao excluir doação: ${error.message}`
      }
    }

    // Revalidar cache das páginas relacionadas
    revalidatePath('/donations')
    revalidatePath('/donations/my-donations')

    return {
      success: true,
      message: 'Doação excluída com sucesso'
    }
  } catch (error) {
    console.error('Erro na action deleteDonation:', error)
    
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
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
      .eq('is_active', true) // Só buscar doações ativas (não excluídas)
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