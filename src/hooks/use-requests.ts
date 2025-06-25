'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getReceivedRequests, getUserRequests, approveRequest, rejectRequest, cancelRequest } from '@/lib/actions/requests'
import { Tables } from '@/types/database.types'

// Tipos
export type RequestWithDetails = Tables<'requests_with_details'>

// Query keys
export const requestKeys = {
  all: ['requests'] as const,
  received: () => [...requestKeys.all, 'received'] as const,
  sent: () => [...requestKeys.all, 'sent'] as const,
}

// Hook para buscar solicitações recebidas (como doador)
export function useReceivedRequests() {
  return useQuery({
    queryKey: requestKeys.received(),
    queryFn: async () => {
      const result = await getReceivedRequests()
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    staleTime: 1000 * 60 * 2, // 2 minutos
    gcTime: 1000 * 60 * 5, // 5 minutos
  })
}

// Hook para buscar solicitações enviadas (como receptor)
export function useSentRequests() {
  return useQuery({
    queryKey: requestKeys.sent(),
    queryFn: async () => {
      const result = await getUserRequests()
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    staleTime: 1000 * 60 * 2, // 2 minutos
    gcTime: 1000 * 60 * 5, // 5 minutos
  })
}

// Mutation para aprovar solicitação
export function useApproveRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ requestId, approvedQuantity }: { requestId: string; approvedQuantity?: number }) => 
      approveRequest(requestId, approvedQuantity),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidar solicitações recebidas
        queryClient.invalidateQueries({ queryKey: requestKeys.received() })
        
        // Invalidar todas as queries de doações (status pode ter mudado)
        queryClient.invalidateQueries({ queryKey: ['donations'] })
      }
    },
  })
}

// Mutation para rejeitar solicitação
export function useRejectRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ requestId, rejectionReason }: { requestId: string; rejectionReason?: string }) => 
      rejectRequest(requestId, rejectionReason),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidar solicitações recebidas
        queryClient.invalidateQueries({ queryKey: requestKeys.received() })
        // Invalidar doações (status pode ter mudado)
        queryClient.invalidateQueries({ queryKey: ['donations'] })
      }
    },
  })
}

// Mutation para cancelar solicitação
export function useCancelRequest() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (requestId: string) => cancelRequest(requestId),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidar solicitações enviadas
        queryClient.invalidateQueries({ queryKey: requestKeys.sent() })
        // Invalidar doações (status pode ter mudado)
        queryClient.invalidateQueries({ queryKey: ['donations'] })
      }
    },
  })
}

// Hook para invalidar cache de requests
export function useRequestMutations() {
  const queryClient = useQueryClient()

  const invalidateReceivedRequests = () => {
    queryClient.invalidateQueries({ queryKey: requestKeys.received() })
  }

  const invalidateSentRequests = () => {
    queryClient.invalidateQueries({ queryKey: requestKeys.sent() })
  }

  const invalidateAllRequests = () => {
    queryClient.invalidateQueries({ queryKey: requestKeys.all })
  }

  return {
    invalidateReceivedRequests,
    invalidateSentRequests,
    invalidateAllRequests,
  }
} 