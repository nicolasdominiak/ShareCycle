'use client'

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { getUserDonations, getDonationById, updateDonation, createDonation, getFilteredDonations } from '@/lib/actions/donations'
import { Tables } from '@/types/database.types'
import type { DonationInput } from '@/lib/validations/donation'

// Tipos
export type Donation = Tables<'donations'>
export type DonationWithDonor = Tables<'donations_with_donor'>

// Query keys
export const donationKeys = {
  all: ['donations'] as const,
  lists: () => [...donationKeys.all, 'list'] as const,
  list: (filters: string) => [...donationKeys.lists(), { filters }] as const,
  details: () => [...donationKeys.all, 'detail'] as const,
  detail: (id: string) => [...donationKeys.details(), id] as const,
  user: () => [...donationKeys.all, 'user'] as const,
  userDonations: () => [...donationKeys.user(), 'donations'] as const,
}

interface UseDonationsFilters {
  search?: string
  category?: string
  city?: string
  orderBy?: string
  userLatitude?: number
  userLongitude?: number
}

// Hook para buscar todas as doações
export function useDonations(filters: UseDonationsFilters = {}) {
  return useInfiniteQuery({
    queryKey: ['donations', filters],
    queryFn: async ({ pageParam = 0 }) => {
      return await getFilteredDonations({
        ...filters,
        pageParam
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  })
}

// Hook para buscar doações do usuário
export function useUserDonations() {
  return useQuery({
    queryKey: donationKeys.userDonations(),
    queryFn: getUserDonations,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

// Hook para buscar uma doação específica por ID
export function useDonation(id: string) {
  return useQuery({
    queryKey: donationKeys.detail(id),
    queryFn: () => getDonationById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

// Mutation para criar doação
export function useCreateDonation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: DonationInput) => createDonation(data),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidar todas as queries relacionadas às doações
        queryClient.invalidateQueries({ queryKey: donationKeys.all })
        
        // Invalidar especificamente as doações do usuário
        queryClient.invalidateQueries({ queryKey: donationKeys.userDonations() })
        
        // Invalidar as doações públicas
        queryClient.invalidateQueries({ queryKey: donationKeys.lists() })
      }
    },
  })
}

// Mutation para atualizar doação
export function useUpdateDonation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DonationInput }) => 
      updateDonation(id, data),
    onSuccess: (result, { id }) => {
      if (result.success) {
        // Invalidar todas as queries relacionadas às doações
        queryClient.invalidateQueries({ queryKey: donationKeys.all })
        
        // Atualizar a query específica da doação editada
        if (result.data) {
          queryClient.setQueryData(donationKeys.detail(id), result.data)
        }
      }
    },
  })
}

// Hook para atualizar cache após mutações
export function useDonationMutations() {
  const queryClient = useQueryClient()

  const invalidateUserDonations = () => {
    queryClient.invalidateQueries({ queryKey: donationKeys.userDonations() })
  }

  const invalidateAllDonations = () => {
    queryClient.invalidateQueries({ queryKey: donationKeys.lists() })
  }

  return {
    invalidateUserDonations,
    invalidateAllDonations,
  }
} 