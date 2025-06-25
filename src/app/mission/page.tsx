import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { Target, Heart, Globe, Users, Leaf, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nossa Missão - ShareCycle',
  description: 'Conheça nossa missão de transformar o excesso em oportunidade e nossos valores fundamentais para um mundo mais sustentável.',
}

export default function MissionPage() {
  const values = [
    {
      icon: Heart,
      title: 'Solidariedade',
      description: 'Acreditamos na força da união e na importância de cuidar uns dos outros.',
      details: 'Promovemos um ambiente onde cada gesto de generosidade conta e fortalece nossa comunidade.'
    },
    {
      icon: Globe,
      title: 'Sustentabilidade',
      description: 'Comprometidos com a preservação do meio ambiente para as próximas gerações.',
      details: 'Reduzimos o desperdício e incentivamos práticas que respeitam nosso planeta.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Valorizamos as relações humanas e o poder transformador da colaboração.',
      details: 'Construímos pontes entre pessoas, criando uma rede de apoio e confiança mútua.'
    },
    {
      icon: Leaf,
      title: 'Economia Circular',
      description: 'Promovemos um modelo onde nada é desperdiçado e tudo tem valor.',
      details: 'Transformamos itens não utilizados em recursos valiosos para quem precisa.'
    }
  ]

  const goals = [
    {
      title: 'Reduzir o Desperdício',
      description: 'Diminuir a quantidade de itens úteis que vão para o lixo',
      target: '50% menos desperdício'
    },
    {
      title: 'Conectar Pessoas',
      description: 'Facilitar conexões entre doadores e receptores',
      target: '10.000 conexões'
    },
    {
      title: 'Impacto Ambiental',
      description: 'Reduzir a pegada de carbono através da reutilização',
      target: '1.000 toneladas de CO₂'
    },
    {
      title: 'Fortalecer Comunidades',
      description: 'Criar redes de apoio locais e duradouras',
      target: '100 comunidades ativas'
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Target className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossa <span className="text-primary">Missão</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Construir um mundo onde o excesso se torna oportunidade e onde cada pessoa 
            tem acesso digno aos recursos de que precisa.
          </p>
        </div>

        {/* Missão Principal */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Transformar o Excesso em Oportunidade</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-muted-foreground italic max-w-4xl mx-auto">
                &quot;Conectando quem tem com quem precisa, um item por vez, construindo pontes 
                de solidariedade que fortalecem nossa sociedade e preservam nosso planeta.&quot;
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                  <p className="text-sm text-muted-foreground">Itens salvos do desperdício</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <p className="text-sm text-muted-foreground">Famílias beneficiadas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Comunidades conectadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nossos Valores */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Nossos Valores Fundamentais
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {value.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Objetivos e Metas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Nossos Objetivos para 2025
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-3">
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {goal.target}
                  </div>
                  <p className="text-sm text-muted-foreground">Meta para 2025</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Como Alcançamos Nossa Missão */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-secondary/10 to-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Como Alcançamos Nossa Missão</CardTitle>
              <CardDescription className="text-lg">
                Através de tecnologia, comunidade e compromisso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Tecnologia Acessível</h3>
                  <p className="text-sm text-muted-foreground">
                    Plataforma simples e intuitiva que funciona em qualquer dispositivo
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Comunidade Engajada</h3>
                  <p className="text-sm text-muted-foreground">
                    Usuários ativos que compartilham os mesmos valores e objetivos
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Impacto Mensurável</h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhamos e compartilhamos o impacto real de cada ação
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visão de Futuro */}
        <div className="mb-16">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Nossa Visão de Futuro</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Sonhamos com um mundo onde o desperdício seja história, onde cada comunidade 
                seja auto-suficiente e solidária, e onde a tecnologia seja uma força 
                unificadora para o bem comum.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg" asChild>
                  <Link href="/donations/new">
                    <Heart className="h-4 w-4 mr-2" />
                    Fazer Parte da Missão
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Conhecer Mais
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