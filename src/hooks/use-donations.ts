import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserDonations, getDonations } from '@/lib/actions/donations'
import { Tables } from '@/types/database.types'

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

// Hook para buscar todas as doações
export function useDonations() {
  return useQuery({
    queryKey: donationKeys.lists(),
    queryFn: getDonations,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

// Hook para buscar doações do usuário
export function useUserDonations() {
  return useQuery({
    queryKey: donationKeys.userDonations(),
    queryFn: getUserDonations,
    staleTime: 1 * 60 * 1000, // 1 minuto
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