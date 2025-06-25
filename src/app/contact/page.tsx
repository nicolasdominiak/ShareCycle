import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MainLayout } from '@/components/layout/main-layout'
import { Mail, MessageCircle, MapPin, Clock, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato - ShareCycle',
  description: 'Entre em contato conosco. Estamos aqui para ajudar e responder suas dúvidas sobre o ShareCycle.',
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@sharecycle.app',
      description: 'Resposta em até 24 horas'
    },
    {
      icon: MessageCircle,
      title: 'Chat Online',
      value: 'Chat ao vivo',
      description: 'Segunda a sexta, 9h às 18h'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'São Paulo, SP',
      description: 'Brasil'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      value: '9h às 18h',
      description: 'Segunda a sexta-feira'
    }
  ]

  const faqs = [
    {
      question: 'Como faço para criar uma doação?',
      answer: 'É muito simples! Faça login na sua conta, clique em "Nova Doação" e preencha as informações do item que você quer doar.'
    },
    {
      question: 'Como solicito uma doação?',
      answer: 'Navegue pelas doações disponíveis, encontre algo que você precisa e clique em "Solicitar". Você poderá conversar diretamente com o doador.'
    },
    {
      question: 'O ShareCycle é gratuito?',
      answer: 'Sim! O ShareCycle é completamente gratuito para doadores e receptores. Nossa missão é conectar pessoas, não lucrar.'
    },
    {
      question: 'Como funciona a segurança da plataforma?',
      answer: 'Temos verificação de email, sistema de reputação e chat integrado. Recomendamos sempre encontros em locais públicos.'
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Entre em <span className="text-primary">Contato</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estamos aqui para ajudar! Se você tem dúvidas, sugestões ou precisa de suporte, 
            não hesite em nos contatar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Formulário de Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e retornaremos em breve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome *</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Seu nome completo"
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com"
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Assunto *</Label>
                  <Input 
                    id="subject" 
                    type="text" 
                    placeholder="Sobre o que você quer falar?"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Conte-nos como podemos ajudar..."
                    rows={5}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Informações de Contato</CardTitle>
                <CardDescription>
                  Outras formas de nos alcançar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-primary font-medium">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Redes Sociais */}
            <Card>
              <CardHeader>
                <CardTitle>Siga-nos nas Redes Sociais</CardTitle>
                <CardDescription>
                  Fique por dentro das novidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://instagram.com/sharecycle" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://twitter.com/sharecycle" target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com/sharecycle" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Precisa de Ajuda Imediata?</CardTitle>
              <CardDescription className="text-lg">
                Consulte nossa base de conhecimento ou entre em contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/faq">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ver FAQ Completo
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:contato@sharecycle.app">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Direto
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 