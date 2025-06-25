import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Recycle, Heart, Users, Globe, Leaf, Target, Lightbulb, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'

export const metadata: Metadata = {
  title: 'Sobre - ShareCycle',
  description: 'Conheça nossa missão de transformar o excesso em oportunidade, conectando quem tem com quem precisa através da economia compartilhada sustentável.',
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Recycle className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Sobre o <span className="text-primary">ShareCycle</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Uma plataforma que conecta pessoas dispostas a doar alimentos, objetos e recursos 
          com aqueles que precisam, promovendo sustentabilidade e reduzindo o desperdício 
          através da economia compartilhada.
        </p>
      </div>

      {/* Missão */}
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader className="text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground italic">
              "Transformar o excesso em oportunidade, conectando quem tem com quem precisa, um item por vez."
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Proposta de Valor */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Como Fazemos a Diferença
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-foreground">Para Doadores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Interface simples para cadastrar doações
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Controle sobre quem recebe as doações
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Impacto ambiental mensurável
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Reconhecimento da comunidade
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-foreground">Para Receptores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Acesso digno a recursos necessários
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Busca facilitada por localização
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Comunicação direta com doadores
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Processo transparente e respeitoso
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-foreground">Para o Planeta</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Redução do desperdício
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Diminuição da pegada de carbono
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Promoção da economia circular
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Conscientização ambiental
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tecnologia */}
      <div className="mb-16">
        <Card className="bg-gradient-to-r from-secondary/10 to-primary/10">
          <CardHeader className="text-center">
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Tecnologia Moderna</CardTitle>
            <CardDescription className="text-lg">
              Desenvolvido com as melhores práticas e tecnologias atuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Frontend</Badge>
                <p className="text-sm text-muted-foreground">Next.js 15, TypeScript, Tailwind CSS</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Backend</Badge>
                <p className="text-sm text-muted-foreground">Supabase, PostgreSQL, Auth</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">PWA</Badge>
                <p className="text-sm text-muted-foreground">Instalável, Offline, Notificações</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Deploy</Badge>
                <p className="text-sm text-muted-foreground">Vercel, Edge Network Global</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Público-Alvo */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          Quem Faz Parte da Nossa Comunidade
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-8 w-8 text-red-500 mx-auto" />
              <CardTitle className="text-lg">Doadores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pessoas e empresas com excesso de alimentos ou objetos em bom estado
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-500 mx-auto" />
              <CardTitle className="text-lg">Receptores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Indivíduos e famílias que podem se beneficiar desses recursos
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-8 w-8 text-green-500 mx-auto" />
              <CardTitle className="text-lg">Organizações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                ONGs, instituições e grupos comunitários
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Faça Parte da Mudança</CardTitle>
            <CardDescription className="text-lg">
              Junte-se a nós na missão de criar um mundo mais sustentável e solidário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/donations/new">
                  <Heart className="h-4 w-4 mr-2" />
                  Fazer uma Doação
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/donations">
                  <Users className="h-4 w-4 mr-2" />
                  Explorar Doações
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