import { geocodeAddress, geocodeDonationAddress, buildAddressString } from './geocoding'

/**
 * Script de teste para verificar a geocodificação
 * Execute no console do navegador ou servidor para testar
 */

// Endereços de teste
const testAddresses = [
  'Avenida Paulista, 1000, São Paulo, SP',
  'Rua Oscar Freire, 500, São Paulo, SP', 
  'Copacabana, Rio de Janeiro, RJ',
  'Centro, Belo Horizonte, MG',
  'Asa Norte, Brasília, DF'
]

// Dados de doação de teste
const testDonationData = [
  {
    pickup_address: 'Rua das Flores, 123',
    pickup_city: 'São Paulo',
    pickup_state: 'SP',
    pickup_zip_code: '01234-567'
  },
  {
    pickup_address: 'Avenida Atlântica, 500',
    pickup_city: 'Rio de Janeiro', 
    pickup_state: 'RJ',
    pickup_zip_code: '22070-001'
  },
  {
    pickup_address: 'Rua da Bahia, 1200',
    pickup_city: 'Belo Horizonte',
    pickup_state: 'MG',
    pickup_zip_code: '30160-011'
  }
]

/**
 * Testa geocodificação de endereços simples
 */
export async function testSimpleGeocoding() {
  console.log('🧪 Testando geocodificação simples...\n')
  
  for (const address of testAddresses) {
    try {
      console.log(`📍 Testando: ${address}`)
      const result = await geocodeAddress(address)
      
      if (result) {
        console.log(`✅ Sucesso: ${result.latitude}, ${result.longitude} (fonte: ${result.source})`)
      } else {
        console.log(`❌ Falhou: Nenhuma coordenada encontrada`)
      }
      
      // Delay para respeitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error(`❌ Erro: ${error}`)
    }
    console.log('')
  }
}

/**
 * Testa geocodificação de dados de doação
 */
export async function testDonationGeocoding() {
  console.log('🏠 Testando geocodificação de doações...\n')
  
  for (const donation of testDonationData) {
    try {
      const addressString = buildAddressString({
        address: donation.pickup_address,
        city: donation.pickup_city,
        state: donation.pickup_state,
        zipCode: donation.pickup_zip_code
      })
      
      console.log(`📍 Testando doação: ${addressString}`)
      const result = await geocodeDonationAddress(donation)
      
      if (result) {
        console.log(`✅ Sucesso: ${result.latitude}, ${result.longitude}`)
        console.log(`   Precisão: ${result.accuracy || 'N/A'}`)
      } else {
        console.log(`❌ Falhou: Nenhuma coordenada encontrada`)
      }
      
      // Delay para respeitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error(`❌ Erro: ${error}`)
    }
    console.log('')
  }
}

/**
 * Testa construção de strings de endereço
 */
export function testAddressBuilder() {
  console.log('🔧 Testando construção de endereços...\n')
  
  const testCases = [
    {
      input: { address: 'Rua A, 123', city: 'São Paulo', state: 'SP' },
      expected: 'Rua A, 123, São Paulo, SP'
    },
    {
      input: { city: 'Rio de Janeiro', state: 'RJ' },
      expected: 'Rio de Janeiro, RJ'
    },
    {
      input: { address: 'Av. Brasil', city: 'Brasília', state: 'DF', zipCode: '70000-000' },
      expected: 'Av. Brasil, Brasília, DF, 70000-000'
    },
    {
      input: {},
      expected: ''
    }
  ]
  
  for (const testCase of testCases) {
    const result = buildAddressString(testCase.input)
    const success = result === testCase.expected
    
    console.log(`${success ? '✅' : '❌'} Input: ${JSON.stringify(testCase.input)}`)
    console.log(`   Esperado: "${testCase.expected}"`)
    console.log(`   Resultado: "${result}"`)
    console.log('')
  }
}

/**
 * Executa todos os testes
 */
export async function runAllGeocodingTests() {
  console.log('🚀 Iniciando testes de geocodificação...\n')
  
  try {
    // Teste 1: Construção de endereços
    testAddressBuilder()
    
    // Teste 2: Geocodificação simples
    await testSimpleGeocoding()
    
    // Teste 3: Geocodificação de doações
    await testDonationGeocoding()
    
    console.log('✅ Todos os testes concluídos!')
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error)
  }
}

/**
 * Teste de performance - mede tempo de geocodificação
 */
export async function testGeocodingPerformance() {
  console.log('⚡ Testando performance da geocodificação...\n')
  
  const testAddress = 'Avenida Paulista, 1000, São Paulo, SP'
  const iterations = 3
  const times: number[] = []
  
  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now()
    
    try {
      const result = await geocodeAddress(testAddress)
      const endTime = Date.now()
      const duration = endTime - startTime
      
      times.push(duration)
      console.log(`Teste ${i + 1}: ${duration}ms ${result ? '✅' : '❌'}`)
      
      // Delay entre testes
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error(`Teste ${i + 1}: Erro - ${error}`)
    }
  }
  
  if (times.length > 0) {
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length
    const minTime = Math.min(...times)
    const maxTime = Math.max(...times)
    
    console.log(`\n📊 Estatísticas:`)
    console.log(`   Tempo médio: ${avgTime.toFixed(0)}ms`)
    console.log(`   Tempo mínimo: ${minTime}ms`)
    console.log(`   Tempo máximo: ${maxTime}ms`)
  }
}

// Para uso no console do navegador ou testes manuais
if (typeof window !== 'undefined') {
  // @ts-expect-error - Adding test functions to window for manual testing
  window.testGeocoding = {
    simple: testSimpleGeocoding,
    donation: testDonationGeocoding,
    builder: testAddressBuilder,
    all: runAllGeocodingTests,
    performance: testGeocodingPerformance
  }
  
  console.log('🧪 Testes de geocodificação carregados!')
  console.log('Execute no console: testGeocoding.all() para todos os testes')
} 