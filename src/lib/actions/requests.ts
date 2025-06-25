"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface CreateRequestInput {
  donation_id: string
  message?: string
  requested_quantity?: number
}

export async function createRequest(data: CreateRequestInput) {
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

    // Verificar se a doação existe e está disponível
    const { data: donation, error: donationError } = await supabase
      .from('donations')
      .select('*')
      .eq('id', data.donation_id)
      .eq('is_active', true)
      .single()

    if (donationError || !donation) {
      return {
        success: false,
        error: 'Doação não encontrada ou não disponível'
      }
    }

    // Verificar se a doação não está reservada ou entregue
    if (donation.status === 'reservado') {
      return {
        success: false,
        error: 'Esta doação já está reservada para outro usuário'
      }
    }

    if (donation.status === 'entregue') {
      return {
        success: false,
        error: 'Esta doação já foi entregue'
      }
    }

    if (donation.status === 'cancelado') {
      return {
        success: false,
        error: 'Esta doação foi cancelada pelo doador'
      }
    }

    // Verificar se o usuário não é o próprio doador
    if (donation.donor_id === user.id) {
      return {
        success: false,
        error: 'Você não pode solicitar sua própria doação'
      }
    }

    // Verificar se o usuário já fez uma solicitação para esta doação
    const { data: existingRequest, error: checkError } = await supabase
      .from('requests')
      .select('id')
      .eq('donation_id', data.donation_id)
      .eq('requester_id', user.id)
      .eq('status', 'pendente')
      .single()

    if (!checkError && existingRequest) {
      return {
        success: false,
        error: 'Você já possui uma solicitação pendente para esta doação'
      }
    }

    // Criar a solicitação
    const requestData = {
      donation_id: data.donation_id,
      donor_id: donation.donor_id,
      requester_id: user.id,
      message: data.message || null,
      requested_quantity: data.requested_quantity || 1,
      status: 'pendente' as const
    }

    const { data: newRequest, error: insertError } = await supabase
      .from('requests')
      .insert(requestData)
      .select()
      .single()

    if (insertError) {
      console.error('Erro ao criar solicitação:', insertError)
      return {
        success: false,
        error: 'Erro ao criar solicitação'
      }
    }

    // Notificação é criada automaticamente pelo trigger handle_new_request

    // Revalidar cache
    revalidatePath(`/donations/${data.donation_id}`)
    revalidatePath('/donations/my-donations')

    return {
      success: true,
      data: newRequest
    }
  } catch (error) {
    console.error('Erro na action createRequest:', error)
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}

export async function approveRequest(requestId: string, approvedQuantity?: number) {
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

    // Verificar se a solicitação existe e o usuário é o doador
    const { data: request, error: requestError } = await supabase
      .from('requests')
      .select('*, donations!inner(*)')
      .eq('id', requestId)
      .eq('donor_id', user.id)
      .eq('status', 'pendente')
      .single()

    if (requestError || !request) {
      return {
        success: false,
        error: 'Solicitação não encontrada ou você não tem permissão'
      }
    }

    // Aprovar a solicitação
    const { error: updateError } = await supabase
      .from('requests')
      .update({
        status: 'aprovada',
        approved_quantity: approvedQuantity || request.requested_quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (updateError) {
      console.error('Erro ao aprovar solicitação:', updateError)
      return {
        success: false,
        error: 'Erro ao aprovar solicitação'
      }
    }

    // Atualizar status da doação para "reservado"
    const { error: donationUpdateError } = await supabase
      .from('donations')
      .update({
        status: 'reservado',
        updated_at: new Date().toISOString()
      })
      .eq('id', request.donation_id)

    if (donationUpdateError) {
      console.error('Erro ao atualizar status da doação:', donationUpdateError)
      // Não falha a operação, mas loga o erro
    }

    // Notificação é criada automaticamente pelo trigger handle_request_status_update

    // Revalidar cache
    revalidatePath('/donations/my-donations')
    revalidatePath(`/donations/${request.donation_id}`)

    return {
      success: true
    }
  } catch (error) {
    console.error('Erro na action approveRequest:', error)
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}

export async function rejectRequest(requestId: string, rejectionReason?: string) {
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

    // Verificar se a solicitação existe e o usuário é o doador
    const { data: request, error: requestError } = await supabase
      .from('requests')
      .select('*, donations!inner(*)')
      .eq('id', requestId)
      .eq('donor_id', user.id)
      .eq('status', 'pendente')
      .single()

    if (requestError || !request) {
      return {
        success: false,
        error: 'Solicitação não encontrada ou você não tem permissão'
      }
    }

    // Rejeitar a solicitação
    const { error: updateError } = await supabase
      .from('requests')
      .update({
        status: 'rejeitada',
        rejection_reason: rejectionReason || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (updateError) {
      console.error('Erro ao rejeitar solicitação:', updateError)
      return {
        success: false,
        error: 'Erro ao rejeitar solicitação'
      }
    }

    // Verificar se ainda há solicitações aprovadas para esta doação
    const { data: approvedRequests, error: approvedError } = await supabase
      .from('requests')
      .select('id')
      .eq('donation_id', request.donation_id)
      .eq('status', 'aprovada')

    if (!approvedError && approvedRequests && approvedRequests.length === 0) {
      // Se não há mais solicitações aprovadas, voltar doação para "disponível"
      const { error: donationUpdateError } = await supabase
        .from('donations')
        .update({
          status: 'disponível',
          updated_at: new Date().toISOString()
        })
        .eq('id', request.donation_id)

      if (donationUpdateError) {
        console.error('Erro ao atualizar status da doação:', donationUpdateError)
        // Não falha a operação, mas loga o erro
      }
    }

    // Notificação é criada automaticamente pelo trigger handle_request_status_update

    // Revalidar cache
    revalidatePath('/donations/my-donations')
    revalidatePath(`/donations/${request.donation_id}`)

    return {
      success: true
    }
  } catch (error) {
    console.error('Erro na action rejectRequest:', error)
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}

export async function cancelRequest(requestId: string) {
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

    // Verificar se a solicitação existe e o usuário é o solicitante
    const { data: request, error: requestError } = await supabase
      .from('requests')
      .select('*, donations!inner(*)')
      .eq('id', requestId)
      .eq('requester_id', user.id)
      .in('status', ['pendente', 'aprovada'])
      .single()

    if (requestError || !request) {
      return {
        success: false,
        error: 'Solicitação não encontrada ou você não tem permissão'
      }
    }

    const wasApproved = request.status === 'aprovada'

    // Cancelar a solicitação
    const { error: updateError } = await supabase
      .from('requests')
      .update({
        status: 'cancelada',
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (updateError) {
      console.error('Erro ao cancelar solicitação:', updateError)
      return {
        success: false,
        error: 'Erro ao cancelar solicitação'
      }
    }

    // Se a solicitação estava aprovada, verificar se deve voltar doação para "disponível"
    if (wasApproved) {
      const { data: remainingApproved, error: approvedError } = await supabase
        .from('requests')
        .select('id')
        .eq('donation_id', request.donation_id)
        .eq('status', 'aprovada')

      if (!approvedError && remainingApproved && remainingApproved.length === 0) {
        // Se não há mais solicitações aprovadas, voltar doação para "disponível"
        const { error: donationUpdateError } = await supabase
          .from('donations')
          .update({
            status: 'disponível',
            updated_at: new Date().toISOString()
          })
          .eq('id', request.donation_id)

        if (donationUpdateError) {
          console.error('Erro ao atualizar status da doação:', donationUpdateError)
        }
      }
    }

    // Revalidar cache
    revalidatePath('/requests/my')
    revalidatePath(`/donations/${request.donation_id}`)

    return {
      success: true
    }
  } catch (error) {
    console.error('Erro na action cancelRequest:', error)
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}

export async function getUserRequests() {
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

    // Buscar solicitações feitas pelo usuário
    const { data: requests, error } = await supabase
      .from('requests_with_details')
      .select('*')
      .eq('requester_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar solicitações do usuário:', error)
      return {
        success: false,
        error: 'Erro ao carregar suas solicitações'
      }
    }

    return {
      success: true,
      data: requests
    }
  } catch (error) {
    console.error('Erro na action getUserRequests:', error)
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
}

export async function getReceivedRequests() {
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

    // Buscar solicitações recebidas pelo usuário (como doador)
    const { data: requests, error } = await supabase
      .from('requests_with_details')
      .select('*')
      .eq('donor_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar solicitações recebidas:', error)
      return {
        success: false,
        error: 'Erro ao carregar solicitações recebidas'
      }
    }

    return {
      success: true,
      data: requests
    }
  } catch (error) {
    console.error('Erro na action getReceivedRequests:', error)
    return {
      success: false,
      error: 'Erro interno do servidor'
    }
  }
} 