import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/main-layout'
import { Shield, Calendar, Mail, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidade - ShareCycle',
  description: 'Política de Privacidade do ShareCycle. Saiba como coletamos, usamos e protegemos suas informações pessoais.',
}

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Política de <span className="text-blue-600">Privacidade</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: 15 de Janeiro de 2025</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">
                Sua Privacidade é Nossa Prioridade
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Esta Política de Privacidade explica como coletamos, usamos, armazenamos e 
                protegemos suas informações pessoais quando você usa o ShareCycle.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none text-blue-600 dark:text-blue-400">
              <p>
                No ShareCycle, respeitamos sua privacidade e nos comprometemos a proteger 
                suas informações pessoais de acordo com as melhores práticas de segurança 
                e conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informações que Coletamos</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  <strong>Informações fornecidas diretamente por você:</strong>
                </p>
                <ul>
                  <li>Nome completo e email (obrigatórios para cadastro)</li>
                  <li>Informações de perfil opcionais</li>
                  <li>Conteúdo de doações (títulos, descrições, fotos)</li>
                  <li>Mensagens e comunicações na plataforma</li>
                  <li>Informações de localização (quando autorizado)</li>
                </ul>
                
                <p>
                  <strong>Informações coletadas automaticamente:</strong>
                </p>
                <ul>
                  <li>Dados de uso da plataforma (páginas visitadas, tempo de sessão)</li>
                  <li>Informações do dispositivo (tipo, navegador, sistema operacional)</li>
                  <li>Endereço IP e dados de localização aproximada</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Como Usamos Suas Informações</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Utilizamos suas informações para:
                </p>
                <ul>
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Facilitar conexões entre doadores e receptores</li>
                  <li>Enviar notificações sobre atividades relevantes</li>
                  <li>Personalizar sua experiência na plataforma</li>
                  <li>Detectar e prevenir fraudes ou atividades suspeitas</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Comunicar atualizações importantes sobre o serviço</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Base Legal para Processamento</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Processamos suas informações com base em:
                </p>
                <ul>
                  <li><strong>Consentimento:</strong> Para funcionalidades opcionais como geolocalização</li>
                  <li><strong>Execução de contrato:</strong> Para fornecer os serviços acordados</li>
                  <li><strong>Interesse legítimo:</strong> Para melhorar nossos serviços e segurança</li>
                  <li><strong>Cumprimento legal:</strong> Para atender obrigações regulamentares</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Compartilhamento de Informações</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  <strong>Não vendemos suas informações pessoais.</strong> Podemos compartilhar informações limitadas em situações específicas:
                </p>
                <ul>
                  <li><strong>Com outros usuários:</strong> Informações públicas do perfil e doações</li>
                  <li><strong>Provedores de serviços:</strong> Empresas que nos ajudam a operar a plataforma</li>
                  <li><strong>Autoridades legais:</strong> Quando exigido por lei ou ordem judicial</li>
                  <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos ou de terceiros</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Segurança das Informações</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Implementamos medidas de segurança robustas para proteger suas informações:
                </p>
                <ul>
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Autenticação segura e verificação de email</li>
                  <li>Monitoramento contínuo de atividades suspeitas</li>
                  <li>Acesso restrito a informações pessoais</li>
                  <li>Backups regulares e recuperação de desastres</li>
                  <li>Auditorias regulares de segurança</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Seus Direitos (LGPD)</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  De acordo com a LGPD, você tem direito a:
                </p>
                <ul>
                  <li><strong>Acesso:</strong> Saber quais dados pessoais tratamos sobre você</li>
                  <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li><strong>Exclusão:</strong> Solicitar a eliminação de seus dados pessoais</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados pessoais</li>
                  <li><strong>Revogação:</strong> Revogar consentimento a qualquer momento</li>
                </ul>
                
                <p>
                  Para exercer seus direitos, entre em contato conosco através de 
                  <a href="mailto:privacidade@sharecycle.app" className="text-primary hover:underline">
                    privacidade@sharecycle.app
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Mantemos suas informações pelo tempo necessário para:
                </p>
                <ul>
                  <li>Fornecer nossos serviços enquanto você mantiver uma conta</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Resolver disputas e fazer cumprir acordos</li>
                  <li>Prevenir fraudes e melhorar a segurança</li>
                </ul>
                
                <p>
                  Após o encerramento da conta, alguns dados podem ser mantidos em 
                  formato anonimizado para fins estatísticos e de melhoria do serviço.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Utilizamos cookies para:
                </p>
                <ul>
                  <li>Manter você logado na plataforma</li>
                  <li>Lembrar suas preferências e configurações</li>
                  <li>Analisar uso da plataforma e melhorar funcionalidades</li>
                  <li>Personalizar conteúdo e experiência</li>
                </ul>
                
                <p>
                  Você pode controlar cookies através das configurações do seu navegador. 
                  Consulte nossa <a href="/cookies" className="text-primary hover:underline">Política de Cookies</a> 
                  para mais detalhes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Transferências Internacionais</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Seus dados são processados principalmente no Brasil. Em casos específicos, 
                  podemos transferir dados para outros países, sempre garantindo:
                </p>
                <ul>
                  <li>Adequação do nível de proteção do país de destino</li>
                  <li>Cláusulas contratuais padrão de proteção</li>
                  <li>Consentimento específico quando necessário</li>
                  <li>Conformidade com regulamentações aplicáveis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Menores de Idade</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  O ShareCycle é destinado a usuários maiores de 18 anos. Não coletamos 
                  intencionalmente informações de menores de idade. Se tomarmos conhecimento 
                  de que coletamos dados de um menor, excluiremos essas informações imediatamente.
                </p>
                
                <p>
                  Pais ou responsáveis que acreditam que seu filho forneceu informações 
                  pessoais devem entrar em contato conosco imediatamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Alterações nesta Política</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. 
                  Quando fizermos alterações significativas:
                </p>
                <ul>
                  <li>Notificaremos você por email ou através da plataforma</li>
                  <li>Atualizaremos a data de &quot;última modificação&quot;</li>
                  <li>Daremos tempo adequado para revisão antes das mudanças entrarem em vigor</li>
                  <li>Solicitaremos novo consentimento quando necessário</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Contato e Encarregado de Dados</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Para questões sobre privacidade, proteção de dados ou exercício de direitos:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <strong>Email do Encarregado de Dados:</strong>
                      <br />
                      <a href="mailto:privacidade@sharecycle.app" className="text-primary hover:underline">
                        privacidade@sharecycle.app
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <div>
                      <strong>Autoridade Nacional de Proteção de Dados (ANPD):</strong>
                      <br />
                      Você também pode apresentar reclamações à ANPD se acreditar 
                      que seus direitos foram violados.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 