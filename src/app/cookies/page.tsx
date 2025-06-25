import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { Cookie, Calendar, Settings, Shield, BarChart3, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies - ShareCycle',
  description: 'Saiba como o ShareCycle utiliza cookies e tecnologias similares para melhorar sua experiência na plataforma.',
}

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico da plataforma',
      examples: ['Sessão de login', 'Preferências de idioma', 'Configurações de segurança'],
      required: true,
      color: 'text-green-600'
    },
    {
      icon: Settings,
      title: 'Cookies de Funcionalidade',
      description: 'Lembram suas preferências e personalizam sua experiência',
      examples: ['Tema claro/escuro', 'Filtros salvos', 'Localização preferida'],
      required: false,
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Cookies Analíticos',
      description: 'Ajudam-nos a entender como você usa nossa plataforma',
      examples: ['Páginas visitadas', 'Tempo de sessão', 'Interações realizadas'],
      required: false,
      color: 'text-purple-600'
    },
    {
      icon: Target,
      title: 'Cookies de Marketing',
      description: 'Personalizam conteúdo e melhoram comunicações',
      examples: ['Conteúdo relevante', 'Recomendações', 'Campanhas direcionadas'],
      required: false,
      color: 'text-orange-600'
    }
  ]

  const cookieDetails = [
    {
      name: 'sb-[hash]-auth-token',
      purpose: 'Manter você logado na plataforma',
      duration: '1 hora (renovado automaticamente)',
      type: 'Essencial'
    },
    {
      name: 'theme-preference',
      purpose: 'Lembrar seu tema preferido (claro/escuro)',
      duration: '1 ano',
      type: 'Funcionalidade'
    },
    {
      name: 'location-consent',
      purpose: 'Lembrar sua decisão sobre compartilhamento de localização',
      duration: '6 meses',
      type: 'Funcionalidade'
    },
    {
      name: '_ga',
      purpose: 'Análise de uso da plataforma (Google Analytics)',
      duration: '2 anos',
      type: 'Analítico'
    },
    {
      name: 'user-preferences',
      purpose: 'Salvar filtros e configurações personalizadas',
      duration: '6 meses',
      type: 'Funcionalidade'
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Cookie className="h-16 w-16 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Política de <span className="text-orange-600">Cookies</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: 15 de Janeiro de 2025</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-200">
                O que são Cookies?
              </CardTitle>
              <CardDescription className="text-orange-700 dark:text-orange-300">
                Entenda como utilizamos cookies para melhorar sua experiência no ShareCycle
              </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none text-orange-600 dark:text-orange-400">
              <p>
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo 
                quando você visita nosso site. Eles nos ajudam a lembrar suas preferências, 
                manter você logado e melhorar continuamente nossa plataforma.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Como Utilizamos Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  No ShareCycle, utilizamos cookies e tecnologias similares para:
                </p>
                <ul>
                  <li><strong>Autenticação:</strong> Manter você logado durante sua sessão</li>
                  <li><strong>Preferências:</strong> Lembrar suas configurações e escolhas</li>
                  <li><strong>Segurança:</strong> Proteger contra atividades maliciosas</li>
                  <li><strong>Análise:</strong> Entender como nossa plataforma é utilizada</li>
                  <li><strong>Funcionalidade:</strong> Fornecer recursos personalizados</li>
                  <li><strong>Melhoria:</strong> Otimizar a experiência do usuário</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tipos de Cookies */}
            <div>
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Tipos de Cookies que Utilizamos
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {cookieTypes.map((type, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <type.icon className={`h-8 w-8 ${type.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{type.title}</CardTitle>
                          {type.required && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                              Obrigatório
                            </span>
                          )}
                        </div>
                      </div>
                      <CardDescription>
                        {type.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium mb-2">Exemplos:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex}>• {example}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Detalhes dos Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies Específicos Utilizados</CardTitle>
                <CardDescription>
                  Lista detalhada dos principais cookies em nossa plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Nome do Cookie</th>
                        <th className="text-left p-3 font-medium">Finalidade</th>
                        <th className="text-left p-3 font-medium">Duração</th>
                        <th className="text-left p-3 font-medium">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookieDetails.map((cookie, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-mono text-sm">{cookie.name}</td>
                          <td className="p-3 text-sm">{cookie.purpose}</td>
                          <td className="p-3 text-sm">{cookie.duration}</td>
                          <td className="p-3">
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {cookie.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Suas Preferências de Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Você tem controle total sobre como os cookies são utilizados em sua experiência:
                </p>
                
                <h4>Configurações do Navegador:</h4>
                <ul>
                  <li><strong>Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
                  <li><strong>Firefox:</strong> Configurações → Privacidade e Segurança → Cookies</li>
                  <li><strong>Safari:</strong> Preferências → Privacidade → Cookies</li>
                  <li><strong>Edge:</strong> Configurações → Cookies e permissões de site</li>
                </ul>
                
                <h4>Nossas Configurações:</h4>
                <p>
                  Em breve, implementaremos um centro de preferências onde você poderá 
                  controlar cada tipo de cookie individualmente, exceto os essenciais 
                  que são necessários para o funcionamento da plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies de Terceiros</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Alguns cookies podem ser definidos por serviços de terceiros que utilizamos:
                </p>
                <ul>
                  <li><strong>Google Analytics:</strong> Para análise de uso da plataforma</li>
                  <li><strong>Supabase:</strong> Para autenticação e armazenamento de dados</li>
                  <li><strong>Vercel:</strong> Para hospedagem e otimização de performance</li>
                </ul>
                
                <p>
                  Estes terceiros têm suas próprias políticas de privacidade e uso de cookies. 
                  Recomendamos que você revise suas políticas para entender completamente 
                  como seus dados são tratados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies e Dispositivos Móveis</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Em dispositivos móveis, além de cookies, podemos utilizar:
                </p>
                <ul>
                  <li><strong>Local Storage:</strong> Para armazenar preferências localmente</li>
                  <li><strong>Session Storage:</strong> Para dados temporários da sessão</li>
                  <li><strong>Cache do Navegador:</strong> Para melhorar a velocidade de carregamento</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto de Desabilitar Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Se você escolher desabilitar cookies, algumas funcionalidades podem ser afetadas:
                </p>
                <ul>
                  <li>Você precisará fazer login a cada visita</li>
                  <li>Suas preferências não serão lembradas</li>
                  <li>Alguns recursos personalizados podem não funcionar</li>
                  <li>A experiência geral pode ser menos conveniente</li>
                </ul>
                
                <p>
                  <strong>Nota:</strong> Cookies essenciais são necessários para o funcionamento 
                  básico da plataforma e não podem ser desabilitados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atualizações desta Política</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Podemos atualizar esta Política de Cookies quando:
                </p>
                <ul>
                  <li>Implementarmos novos recursos que requerem cookies</li>
                  <li>Alterarmos nossos fornecedores de serviços</li>
                  <li>Houver mudanças em regulamentações aplicáveis</li>
                  <li>Melhorarmos nossa plataforma e experiência do usuário</li>
                </ul>
                
                <p>
                  Sempre notificaremos sobre mudanças significativas através da plataforma 
                  ou por email, quando aplicável.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contato e Dúvidas</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco:
                </p>
                
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> 
                    <a href="mailto:privacidade@sharecycle.app" className="text-primary hover:underline ml-2">
                      privacidade@sharecycle.app
                    </a>
                  </p>
                  
                  <p>
                    <strong>Políticas Relacionadas:</strong>
                  </p>
                  <ul>
                    <li>
                      <Link href="/privacy" className="text-primary hover:underline">
                        Política de Privacidade
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-primary hover:underline">
                        Termos de Uso
                      </Link>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Controle Sua Experiência</CardTitle>
                <CardDescription className="text-lg">
                  Gerencie suas preferências de cookies e privacidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      <Settings className="h-4 w-4 mr-2" />
                      Falar com Suporte
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/privacy">
                      <Shield className="h-4 w-4 mr-2" />
                      Ver Política de Privacidade
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 