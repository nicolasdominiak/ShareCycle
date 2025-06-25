import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { HelpCircle, User, Gift, Shield, MessageCircle, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ - Perguntas Frequentes - ShareCycle',
  description: 'Encontre respostas para as principais dúvidas sobre como usar o ShareCycle, fazer doações e solicitar itens.',
}

export default function FAQPage() {
  const faqCategories = [
    {
      icon: User,
      title: 'Conta e Cadastro',
      faqs: [
        {
          question: 'Como criar uma conta no ShareCycle?',
          answer: 'Clique em "Cadastrar" no topo da página, preencha seus dados básicos (nome, email e senha) e confirme seu email. É rápido e gratuito!'
        },
        {
          question: 'Esqueci minha senha, o que fazer?',
          answer: 'Na página de login, clique em "Esqueci minha senha", digite seu email e siga as instruções enviadas para redefinir sua senha.'
        },
        {
          question: 'Posso alterar minhas informações pessoais?',
          answer: 'Sim! Acesse seu perfil clicando no seu avatar no canto superior direito e edite as informações que desejar.'
        },
        {
          question: 'Como excluir minha conta?',
          answer: 'Entre em contato conosco através da página de contato solicitando a exclusão. Processaremos sua solicitação em até 48 horas.'
        }
      ]
    },
    {
      icon: Gift,
      title: 'Doações',
      faqs: [
        {
          question: 'Como criar uma doação?',
          answer: 'Faça login, clique em "Nova Doação", adicione fotos, título, descrição, categoria, quantidade e instruções de retirada. Publique e aguarde interessados!'
        },
        {
          question: 'Que tipos de itens posso doar?',
          answer: 'Você pode doar alimentos não perecíveis, roupas, eletrônicos funcionais, livros, brinquedos, utensílios domésticos e muito mais. Apenas certifique-se de que estejam em bom estado.'
        },
        {
          question: 'Posso doar itens perecíveis?',
          answer: 'Sim, mas com cuidado especial. Indique claramente a data de validade e certifique-se de que a retirada seja rápida.'
        },
        {
          question: 'Como editar ou excluir uma doação?',
          answer: 'Vá em "Minhas Doações", encontre o item e clique nos ícones de editar ou excluir. Você pode fazer isso a qualquer momento.'
        },
        {
          question: 'Posso definir quem recebe minha doação?',
          answer: 'Sim! Você recebe solicitações e pode escolher quem aprovará. Pode conversar com os interessados antes de decidir.'
        }
      ]
    },
    {
      icon: MessageCircle,
      title: 'Solicitações',
      faqs: [
        {
          question: 'Como solicitar uma doação?',
          answer: 'Encontre um item que você precisa, clique em "Solicitar Doação", escreva uma mensagem educada explicando sua necessidade e aguarde a resposta do doador.'
        },
        {
          question: 'Posso solicitar múltiplas doações?',
          answer: 'Sim, mas seja responsável. Solicite apenas o que você realmente precisa e consegue retirar.'
        },
        {
          question: 'O que fazer se minha solicitação foi rejeitada?',
          answer: 'Não desanime! Existem muitas outras doações disponíveis. Continue explorando e solicitando educadamente.'
        },
        {
          question: 'Como cancelar uma solicitação?',
          answer: 'Vá em "Minhas Solicitações" e clique em cancelar. É importante cancelar se você não precisar mais do item.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Segurança',
      faqs: [
        {
          question: 'O ShareCycle é seguro?',
          answer: 'Sim! Temos verificação de email, sistema de reputação e chat integrado. Sempre recomendamos encontros em locais públicos e movimentados.'
        },
        {
          question: 'Como me proteger durante a retirada?',
          answer: 'Marque encontros em locais públicos, leve acompanhante se possível, confie em seus instintos e relate qualquer comportamento suspeito.'
        },
        {
          question: 'O que fazer se algo der errado?',
          answer: 'Use o botão "Denunciar" ou entre em contato conosco imediatamente. Levamos todas as denúncias a sério.'
        },
        {
          question: 'Vocês verificam os usuários?',
          answer: 'Verificamos emails e temos sistema de reputação. Estamos sempre melhorando nossos processos de segurança.'
        }
      ]
    }
  ]

  const generalFaqs = [
    {
      question: 'O ShareCycle é gratuito?',
      answer: 'Completamente gratuito! Não cobramos nenhuma taxa de doadores ou receptores. Nossa missão é conectar pessoas, não lucrar.'
    },
    {
      question: 'Em que cidades o ShareCycle funciona?',
      answer: 'Funcionamos em todo o Brasil! Quanto mais usuários em sua cidade, mais doações disponíveis.'
    },
    {
      question: 'Como vocês ganham dinheiro?',
      answer: 'Atualmente somos um projeto sem fins lucrativos. No futuro, poderemos ter parcerias éticas que não afetem a experiência dos usuários.'
    },
    {
      question: 'Posso usar o ShareCycle no celular?',
      answer: 'Sim! Nossa plataforma é responsiva e funciona perfeitamente em celulares. Em breve teremos um app nativo.'
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <HelpCircle className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Perguntas <span className="text-primary">Frequentes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Encontre respostas rápidas para as principais dúvidas sobre o ShareCycle. 
            Se não encontrar o que procura, entre em contato conosco!
          </p>
        </div>

        {/* FAQ por Categorias */}
        <div className="space-y-12 mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <div className="grid gap-4">
                {category.faqs.map((faq, faqIndex) => (
                  <Card key={faqIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Perguntas Gerais */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Perguntas Gerais
          </h2>
          
          <div className="grid gap-4">
            {generalFaqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Não encontrou resposta */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Não encontrou sua resposta?</CardTitle>
              <CardDescription className="text-lg">
                Nossa equipe está sempre pronta para ajudar você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Entrar em Contato
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/how-it-works">
                    <Heart className="h-4 w-4 mr-2" />
                    Como Funciona
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Respondemos todas as mensagens em até 24 horas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 