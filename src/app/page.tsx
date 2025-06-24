import { Heart, Recycle, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { HomePageActions } from '@/components/features/home-page-actions'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-primary-100 rounded-full">
              <Recycle className="h-16 w-16 text-primary-700" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
            Share<span className="text-primary-700">Cycle</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            Transformar o excesso em oportunidade, conectando quem tem com quem precisa, 
            <span className="text-primary-700 font-semibold"> um item por vez</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-semantic-error mx-auto mb-4" />
                <CardTitle className="text-neutral-900">Para Doadores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-600">
                  Interface simples para cadastrar doações e fazer a diferença na sua comunidade
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-semantic-info mx-auto mb-4" />
                <CardTitle className="text-neutral-900">Para Receptores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-600">
                  Acesso digno a recursos necessários através de uma busca facilitada
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Recycle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <CardTitle className="text-neutral-900">Para o Planeta</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-600">
                  Redução do desperdício e promoção da economia circular sustentável
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <HomePageActions user={user} />
        </div>
      </div>
    </main>
  )
} 