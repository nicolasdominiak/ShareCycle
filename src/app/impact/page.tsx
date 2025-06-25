import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { 
  TrendingUp, 
  Users, 
  Package, 
  Leaf, 
  Heart, 
  Recycle,
  Globe,
  Award,
  BarChart3,
  TreePine,
  Building
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impacto - ShareCycle',
  description: 'Conheça o impacto positivo que o ShareCycle tem gerado na sociedade e no meio ambiente através da economia compartilhada.',
}

export default function ImpactPage() {
  const mainMetrics = [
    {
      icon: Users,
      title: 'Usuários Ativos',
      value: '125,847',
      description: 'Pessoas conectadas mensalmente',
      growth: '+23%',
      color: 'text-blue-600'
    },
    {
      icon: Package,
      title: 'Itens Doados',
      value: '1,245,392',
      description: 'Total de itens que encontraram novo lar',
      growth: '+156%',
      color: 'text-green-600'
    },
    {
      icon: Leaf,
      title: 'CO₂ Evitado',
      value: '2,847 t',
      description: 'Toneladas de CO₂ não emitidas',
      growth: '+89%',
      color: 'text-emerald-600'
    },
    {
      icon: Heart,
      title: 'Famílias Beneficiadas',
      value: '67,843',
      description: 'Famílias que receberam doações',
      growth: '+78%',
      color: 'text-red-600'
    }
  ]

  const environmentalImpact = [
    {
      icon: TreePine,
      title: 'Árvores Preservadas',
      value: '45,230',
      description: 'Equivalente em árvores poupadas pelo reuso'
    },
    {
      icon: Recycle,
      title: 'Resíduos Evitados',
      value: '3,456 t',
      description: 'Toneladas que não foram para aterros'
    },
    {
      icon: Globe,
      title: 'Água Economizada',
      value: '2.3M L',
      description: 'Litros de água poupados na produção'
    },
    {
      icon: Leaf,
      title: 'Energia Poupada',
      value: '567 MWh',
      description: 'Megawatts-hora economizados'
    }
  ]

  const socialImpact = [
    {
      title: 'Alimentação',
      description: 'Famílias que receberam alimentos',
      value: '23,456',
      percentage: 35
    },
    {
      title: 'Vestuário',
      description: 'Pessoas que receberam roupas',
      value: '18,742',
      percentage: 28
    },
    {
      title: 'Educação',
      description: 'Estudantes beneficiados com livros',
      value: '12,389',
      percentage: 18
    },
    {
      title: 'Outros Itens',
      description: 'Eletrônicos, móveis e diversos',
      value: '13,256',
      percentage: 19
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: 'Prêmio Sustentabilidade 2024',
      description: 'Reconhecimento pelo impacto ambiental positivo',
      date: 'Dezembro 2024'
    },
    {
      icon: Users,
      title: '100k Usuários Alcançados',
      description: 'Marco histórico de comunidade engajada',
      date: 'Novembro 2024'
    },
    {
      icon: Building,
      title: 'Parceria com ONGs',
      description: '50+ organizações parceiras ativas',
      date: 'Outubro 2024'
    },
    {
      icon: Globe,
      title: 'Expansão Nacional',
      description: 'Presente em todos os estados brasileiros',
      date: 'Setembro 2024'
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <TrendingUp className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nosso <span className="text-primary">Impacto</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubra como a comunidade ShareCycle está transformando vidas e 
            construindo um futuro mais sustentável através de ações concretas.
          </p>
        </div>

        {/* Métricas Principais */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Resultados em Números
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainMetrics.map((metric, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-center mb-3">
                    <metric.icon className={`h-12 w-12 ${metric.color}`} />
                  </div>
                  <CardTitle className="text-3xl font-bold">{metric.value}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {metric.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {metric.description}
                  </p>
                  <div className="flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-600">
                      {metric.growth} este ano
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impacto Ambiental */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Impacto Ambiental
          </h2>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800 dark:text-green-200">
                Preservando Nosso Planeta
              </CardTitle>
              <CardDescription className="text-lg">
                Cada doação contribui para um futuro mais sustentável
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {environmentalImpact.map((impact, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <impact.icon className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-1">
                      {impact.value}
                    </div>
                    <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {impact.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impacto Social */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Impacto Social por Categoria
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialImpact.map((impact, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{impact.title}</CardTitle>
                  <CardDescription>
                    {impact.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-3">
                    {impact.value}
                  </div>
                  
                  {/* Barra de progresso */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${impact.percentage}%` }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {impact.percentage}% do total de doações
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conquistas e Marcos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Conquistas e Marcos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {achievement.date}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gráfico de Crescimento */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Crescimento Contínuo</CardTitle>
              <CardDescription className="text-lg">
                Nossa comunidade cresce a cada mês que passa
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2023</div>
                  <p className="text-muted-foreground">Ano de lançamento</p>
                  <p className="text-sm">10k usuários</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2024</div>
                  <p className="text-muted-foreground">Crescimento exponencial</p>
                  <p className="text-sm">125k usuários</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2025</div>
                  <p className="text-muted-foreground">Meta ambiciosa</p>
                  <p className="text-sm">500k usuários</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Faça Parte Deste Impacto</CardTitle>
              <CardDescription className="text-lg">
                Sua próxima doação pode ser o ponto de virada na vida de alguém
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/donations/new">
                    <Heart className="h-4 w-4 mr-2" />
                    Criar Doação
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/donations">
                    <Users className="h-4 w-4 mr-2" />
                    Explorar Doações
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Juntos, podemos multiplicar esse impacto positivo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 