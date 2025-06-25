import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { 
  UserPlus, 
  Gift, 
  Search, 
  MessageCircle, 
  Handshake, 
  CheckCircle,
  ArrowRight,
  Users,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como Funciona - ShareCycle',
  description: 'Descubra como é simples doar e receber através do ShareCycle. Um processo transparente e seguro para conectar pessoas.',
}

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Cadastre-se',
      description: 'Crie sua conta gratuita e faça parte da nossa comunidade sustentável.',
      details: ['Email e senha', 'Perfil básico', 'Verificação de email']
    },
    {
      icon: Gift,
      title: 'Publique Doações',
      description: 'Cadastre itens que você não usa mais e quer doar para quem precisa.',
      details: ['Fotos e descrição', 'Categoria e quantidade', 'Local de retirada']
    },
    {
      icon: Search,
      title: 'Explore e Busque',
      description: 'Encontre doações próximas a você usando nossa busca inteligente.',
      details: ['Filtros por categoria', 'Ordenação por distância', 'Busca por palavra-chave']
    },
    {
      icon: MessageCircle,
      title: 'Solicite e Converse',
      description: 'Entre em contato direto com o doador para combinar a retirada.',
      details: ['Solicitação com mensagem', 'Chat em tempo real', 'Notificações automáticas']
    },
    {
      icon: Handshake,
      title: 'Combine a Retirada',
      description: 'Defina local, horário e detalhes da entrega com total transparência.',
      details: ['Local e horário', 'Instruções especiais', 'Confirmação mútua']
    },
    {
      icon: CheckCircle,
      title: 'Complete a Doação',
      description: 'Finalize o processo e acompanhe o impacto positivo gerado.',
      details: ['Marcar como entregue', 'Avaliação opcional', 'Impacto registrado']
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Como Funciona o <span className="text-primary">ShareCycle</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Um processo simples e transparente para conectar quem tem com quem precisa. 
            Descubra como é fácil fazer a diferença na sua comunidade.
          </p>
        </div>

        {/* Processo Passo a Passo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Processo Passo a Passo
          </h2>
          
          <div className="grid gap-8 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Número e Ícone */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <Card className="flex-1 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Seta conectora */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex justify-center mt-6">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Usuário */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Para Doadores e Receptores
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Para Doadores</CardTitle>
                <CardDescription className="text-lg">
                  Transforme seus itens não utilizados em ajuda real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-left space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Cadastre facilmente seus itens com fotos e descrições</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Receba solicitações de pessoas interessadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Escolha quem receberá sua doação</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Acompanhe o impacto das suas ações</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/donations/new">
                    Fazer uma Doação
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Para Receptores</CardTitle>
                <CardDescription className="text-lg">
                  Encontre o que você precisa na sua comunidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-left space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Explore doações por categoria e localização</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Solicite itens de forma respeitosa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Converse diretamente com os doadores</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Combine retirada de forma conveniente</span>
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/donations">
                    Explorar Doações
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Segurança e Transparência */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Segurança e Transparência</CardTitle>
              <CardDescription className="text-lg">
                Priorizamos a confiança e segurança de nossa comunidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Verificação de Usuários</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os usuários passam por verificação de email e perfil
                  </p>
                </div>
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Comunicação Segura</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat integrado e protegido para todas as conversas
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Comunidade Ativa</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema de reputação e feedback da comunidade
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Pronto para Começar?</CardTitle>
              <CardDescription className="text-lg">
                Junte-se à nossa comunidade e faça a diferença hoje mesmo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Criar Conta Gratuita
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/donations">
                    Ver Doações Disponíveis
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 