import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MainLayout } from '@/components/layout/main-layout'
import { Shield, AlertTriangle, MessageCircle, FileText, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Denunciar - ShareCycle',
  description: 'Reporte comportamentos inadequados, conteúdo impróprio ou problemas de segurança no ShareCycle.',
}

export default function ReportPage() {
  const reportTypes = [
    { value: 'inappropriate-content', label: 'Conteúdo inadequado' },
    { value: 'suspicious-behavior', label: 'Comportamento suspeito' },
    { value: 'fraud', label: 'Fraude ou golpe' },
    { value: 'harassment', label: 'Assédio ou bullying' },
    { value: 'fake-donation', label: 'Doação falsa' },
    { value: 'safety-concern', label: 'Preocupação de segurança' },
    { value: 'spam', label: 'Spam ou propaganda' },
    { value: 'other', label: 'Outro' }
  ]

  const safetyTips = [
    {
      icon: Shield,
      title: 'Sua Segurança é Prioridade',
      description: 'Sempre marque encontros em locais públicos e movimentados'
    },
    {
      icon: AlertTriangle,
      title: 'Confie nos Seus Instintos',
      description: 'Se algo parecer suspeito, não hesite em cancelar ou denunciar'
    },
    {
      icon: MessageCircle,
      title: 'Documente Tudo',
      description: 'Mantenha registros das conversas e interações problemáticas'
    }
  ]

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <Shield className="h-16 w-16 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Central de <span className="text-red-600">Denúncias</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sua segurança e bem-estar são nossa prioridade. Use este formulário para 
            reportar qualquer comportamento inadequado ou preocupação de segurança.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Formulário de Denúncia */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-2xl text-red-700 dark:text-red-300">
                <AlertTriangle className="h-6 w-6 inline mr-2" />
                Fazer uma Denúncia
              </CardTitle>
              <CardDescription>
                Todas as denúncias são levadas a sério e investigadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="report-type">Tipo de Denúncia *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de problema" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reporter-name">Seu Nome</Label>
                    <Input 
                      id="reporter-name" 
                      type="text" 
                      placeholder="Nome (opcional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporter-email">Seu Email</Label>
                    <Input 
                      id="reporter-email" 
                      type="email" 
                      placeholder="email@exemplo.com (opcional)"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reported-user">Usuário Reportado</Label>
                  <Input 
                    id="reported-user" 
                    type="text" 
                    placeholder="Nome do usuário ou link do perfil"
                  />
                </div>

                <div>
                  <Label htmlFor="donation-link">Link da Doação (se aplicável)</Label>
                  <Input 
                    id="donation-link" 
                    type="url" 
                    placeholder="https://sharecycle.app/donations/..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="incident-description">Descrição do Incidente *</Label>
                  <Textarea 
                    id="incident-description" 
                    placeholder="Descreva detalhadamente o que aconteceu, quando ocorreu e qualquer evidência que você tenha..."
                    rows={6}
                    required 
                  />
                </div>

                <div>
                  <Label htmlFor="evidence">Evidências Adicionais</Label>
                  <Textarea 
                    id="evidence" 
                    placeholder="Cole aqui links para screenshots, conversas ou outras evidências (opcional)"
                    rows={3}
                  />
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Importante:</strong> Se você está em perigo imediato, entre em contato 
                    com as autoridades locais (190) antes de usar este formulário.
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Denúncia
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Segurança */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Dicas de Segurança</CardTitle>
                <CardDescription>
                  Como se proteger na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                      <tip.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">
                  O que Acontece Após a Denúncia?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Sua denúncia é registrada imediatamente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Nossa equipe inicia investigação em até 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Você recebe atualizações se forneceu email</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Medidas apropriadas são tomadas</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outras Formas de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Email de Emergência:</strong>
                  <br />
                  <a href="mailto:seguranca@sharecycle.app" className="text-primary hover:underline">
                    seguranca@sharecycle.app
                  </a>
                </div>
                <div>
                  <strong>Chat de Suporte:</strong>
                  <br />
                  <span className="text-muted-foreground">Segunda a sexta, 9h às 18h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tipos de Problemas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Tipos de Problemas que Você Pode Reportar
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">{type.label}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">
                Juntos por uma Comunidade Segura
              </CardTitle>
              <CardDescription className="text-lg text-blue-700 dark:text-blue-300">
                Sua participação ativa ajuda a manter o ShareCycle seguro para todos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Lembre-se: denunciar comportamentos inadequados protege toda nossa comunidade. 
                Não hesite em nos contatar se algo não estiver certo.
              </p>
              
              <Button asChild variant="outline">
                <a href="/contact">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Falar com Suporte
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 