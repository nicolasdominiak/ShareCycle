import { Heart, Recycle, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout'
import { HomePageActions } from '@/components/features/home-page-actions'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <MainLayout showFooter={true}>
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary-100 rounded-full">
                <Recycle className="h-16 w-16 text-primary-700" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Share<span className="text-primary">Cycle</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transformar o excesso em oportunidade, conectando quem tem com quem precisa, 
              <span className="text-primary font-semibold"> um item por vez</span>
            </p>
            
                          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <Card className="text-center hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
                  <CardHeader>
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <CardTitle className="text-card-foreground">Para Doadores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      Interface simples para cadastrar doações e fazer a diferença na sua comunidade
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
                  <CardHeader>
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <CardTitle className="text-card-foreground">Para Receptores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      Acesso digno a recursos necessários através de uma busca facilitada
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
                  <CardHeader>
                    <Recycle className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-card-foreground">Para o Planeta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      Redução do desperdício e promoção da economia circular sustentável
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            
            <HomePageActions user={user} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 