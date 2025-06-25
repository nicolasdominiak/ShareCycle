import { createClient } from '@/lib/supabase/server'
import { geocodeDonationAddress, buildAddressString } from './geocoding'

export interface MigrationResult {
  total: number
  processed: number
  successful: number
  failed: number
  errors: Array<{
    id: string
    address: string
    error: string
  }>
}

/**
 * Migra doações existentes adicionando coordenadas via geocodificação direta
 */
export async function migrateExistingDonations(): Promise<MigrationResult> {
  const supabase = await createClient()
  
  const result: MigrationResult = {
    total: 0,
    processed: 0,
    successful: 0,
    failed: 0,
    errors: []
  }

  try {
    // Buscar todas as doações que não possuem coordenadas mas têm endereço
    const { data: donations, error } = await supabase
      .from('donations')
      .select('id, pickup_address, pickup_city, pickup_state, pickup_zip_code, pickup_latitude, pickup_longitude')
      .or('pickup_latitude.is.null,pickup_longitude.is.null')
      .not('pickup_address', 'is', null)
      .not('pickup_city', 'is', null)

    if (error) {
      throw new Error(`Erro ao buscar doações: ${error.message}`)
    }

    if (!donations || donations.length === 0) {
      console.log('Nenhuma doação encontrada para migração')
      return result
    }

    result.total = donations.length
    console.log(`Iniciando migração de ${result.total} doações...`)

    // Processar cada doação
    for (const donation of donations) {
      result.processed++
      
      const addressString = buildAddressString({
        address: donation.pickup_address,
        city: donation.pickup_city,
        state: donation.pickup_state,
        zipCode: donation.pickup_zip_code
      })

      try {
        console.log(`[${result.processed}/${result.total}] Processando doação ${donation.id}: ${addressString}`)
        
        // Tentar geocodificar o endereço
        const coordinates = await geocodeDonationAddress({
          pickup_address: donation.pickup_address,
          pickup_city: donation.pickup_city,
          pickup_state: donation.pickup_state,
          pickup_zip_code: donation.pickup_zip_code
        })

        if (coordinates) {
          // Atualizar a doação com as coordenadas
          const { error: updateError } = await supabase
            .from('donations')
            .update({
              pickup_latitude: coordinates.latitude,
              pickup_longitude: coordinates.longitude,
              updated_at: new Date().toISOString()
            })
            .eq('id', donation.id)

          if (updateError) {
            throw new Error(`Erro ao atualizar doação: ${updateError.message}`)
          }

          result.successful++
          console.log(`✅ Doação ${donation.id} atualizada com coordenadas: ${coordinates.latitude}, ${coordinates.longitude}`)
        } else {
          throw new Error('Coordenadas não encontradas para o endereço')
        }

        // Pequeno delay para não sobrecarregar a API de geocodificação
        await new Promise(resolve => setTimeout(resolve, 1000))

      } catch (error) {
        result.failed++
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
        result.errors.push({
          id: donation.id,
          address: addressString,
          error: errorMessage
        })
        console.error(`❌ Erro ao processar doação ${donation.id}: ${errorMessage}`)
      }
    }

    console.log(`
Migração concluída:
- Total: ${result.total}
- Processadas: ${result.processed}
- Sucesso: ${result.successful}
- Falhas: ${result.failed}
    `)

    return result

  } catch (error) {
    console.error('Erro durante a migração:', error)
    throw error
  }
}

/**
 * Verifica o status atual das coordenadas nas doações
 */
export async function checkMigrationStatus(): Promise<{
  totalDonations: number
  withCoordinates: number
  withoutCoordinates: number
  withAddress: number
  withoutAddress: number
}> {
  const supabase = await createClient()

  try {
    // Total de doações
    const { count: totalDonations } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })

    // Doações com coordenadas
    const { count: withCoordinates } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .not('pickup_latitude', 'is', null)
      .not('pickup_longitude', 'is', null)

    // Doações sem coordenadas
    const { count: withoutCoordinates } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .or('pickup_latitude.is.null,pickup_longitude.is.null')

    // Doações com endereço
    const { count: withAddress } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .not('pickup_address', 'is', null)
      .not('pickup_city', 'is', null)

    // Doações sem endereço
    const { count: withoutAddress } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .or('pickup_address.is.null,pickup_city.is.null')

    return {
      totalDonations: totalDonations || 0,
      withCoordinates: withCoordinates || 0,
      withoutCoordinates: withoutCoordinates || 0,
      withAddress: withAddress || 0,
      withoutAddress: withoutAddress || 0
    }
  } catch (error) {
    console.error('Erro ao verificar status da migração:', error)
    throw error
  }
}

/**
 * Executa a migração com relatório detalhado
 */
export async function runMigrationWithReport(): Promise<void> {
  console.log('🚀 Iniciando migração de coordenadas...\n')

  // Status inicial
  console.log('📊 Status inicial:')
  const initialStatus = await checkMigrationStatus()
  console.log(`- Total de doações: ${initialStatus.totalDonations}`)
  console.log(`- Com coordenadas: ${initialStatus.withCoordinates}`)
  console.log(`- Sem coordenadas: ${initialStatus.withoutCoordinates}`)
  console.log(`- Com endereço: ${initialStatus.withAddress}`)
  console.log(`- Sem endereço: ${initialStatus.withoutAddress}\n`)

  // Executar migração
  const result = await migrateExistingDonations()

  // Status final
  console.log('\n📊 Status final:')
  const finalStatus = await checkMigrationStatus()
  console.log(`- Total de doações: ${finalStatus.totalDonations}`)
  console.log(`- Com coordenadas: ${finalStatus.withCoordinates}`)
  console.log(`- Sem coordenadas: ${finalStatus.withoutCoordinates}`)
  console.log(`- Com endereço: ${finalStatus.withAddress}`)
  console.log(`- Sem endereço: ${finalStatus.withoutAddress}`)

  // Relatório de erros
  if (result.errors.length > 0) {
    console.log('\n❌ Erros encontrados:')
    result.errors.forEach(error => {
      console.log(`- ${error.id}: ${error.address} - ${error.error}`)
    })
  }

  console.log('\n✅ Migração concluída!')
} 