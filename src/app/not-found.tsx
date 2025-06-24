'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft, Recycle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ClientMainLayout } from '@/components/layout/client-main-layout'

export default function NotFound() {
  return (
    <ClientMainLayout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            {/* Ícone principal */}
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-primary/10 rounded-full">
                <Recycle className="h-24 w-24 text-primary opacity-60" />
              </div>
            </div>
            
            {/* Título e descrição */}
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
              4<span className="text-primary">0</span>4
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Página não encontrada
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
              Ops! Parece que esta página foi reciclada para um lugar melhor. 
              Que tal explorarmos outras oportunidades?
            </p>
            
            {/* Cards de ações */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
                <CardHeader>
                  <Home className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-foreground">Página Inicial</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    Volte para a página principal e descubra o ShareCycle
                  </CardDescription>
                  <Button asChild className="w-full">
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Ir para Home
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
                <CardHeader>
                  <Search className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle className="text-foreground">Explorar Doações</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    Encontre doações disponíveis em sua comunidade
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/donations">
                      <Search className="h-4 w-4 mr-2" />
                      Ver Doações
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow bg-white/40 dark:bg-[#031c14]/40 border dark:border-green-800/30">
                <CardHeader>
                  <Recycle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-foreground">Fazer Doação</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    Cadastre uma nova doação e ajude sua comunidade
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/donations/new">
                      <Recycle className="h-4 w-4 mr-2" />
                      Doar Agora
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Botão voltar */}
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar à página anterior
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ClientMainLayout>
  )
} 