import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/main-layout'
import { FileText, Calendar, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Termos de Uso - ShareCycle',
  description: 'Termos de Uso do ShareCycle. Leia as condições para utilização de nossa plataforma de doações.',
}

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <FileText className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Termos de <span className="text-primary">Uso</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: 15 de Janeiro de 2025</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bem-vindo ao ShareCycle</CardTitle>
              <CardDescription>
                Estes Termos de Uso regem o uso de nossa plataforma. Ao usar o ShareCycle, 
                você concorda em cumprir estes termos.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                O ShareCycle é uma plataforma online que conecta pessoas que desejam doar 
                itens com aqueles que precisam deles. Ao usar nossos serviços, você concorda 
                em seguir estes termos e todas as leis aplicáveis.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Ao acessar e usar o ShareCycle, você aceita estar vinculado a estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma.
                </p>
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após a publicação.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  O ShareCycle fornece uma plataforma onde usuários podem:
                </p>
                <ul>
                  <li>Publicar doações de itens que não utilizam mais</li>
                  <li>Buscar e solicitar itens doados por outros usuários</li>
                  <li>Comunicar-se diretamente com outros usuários</li>
                  <li>Coordenar a entrega ou retirada de itens</li>
                </ul>
                <p>
                  O ShareCycle atua apenas como intermediário, facilitando o contato entre doadores e receptores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cadastro e Conta do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Para usar certas funcionalidades, você deve criar uma conta fornecendo 
                  informações precisas e atualizadas. Você é responsável por:
                </p>
                <ul>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Todas as atividades que ocorrem em sua conta</li>
                  <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Conduta do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Ao usar o ShareCycle, você concorda em não:
                </p>
                <ul>
                  <li>Publicar conteúdo falso, enganoso ou fraudulento</li>
                  <li>Assediar, intimidar ou prejudicar outros usuários</li>
                  <li>Usar a plataforma para atividades comerciais não autorizadas</li>
                  <li>Violar leis locais, nacionais ou internacionais</li>
                  <li>Interferir no funcionamento da plataforma</li>
                  <li>Criar múltiplas contas para burlar restrições</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Doações e Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  <strong>Doadores são responsáveis por:</strong>
                </p>
                <ul>
                  <li>Garantir que os itens estão em condições adequadas</li>
                  <li>Fornecer descrições precisas dos itens</li>
                  <li>Cumprir com os acordos de entrega</li>
                  <li>Verificar se a doação é legal e apropriada</li>
                </ul>
                
                <p>
                  <strong>Receptores são responsáveis por:</strong>
                </p>
                <ul>
                  <li>Usar os itens recebidos de forma apropriada</li>
                  <li>Comparecer nos locais e horários combinados</li>
                  <li>Tratar doadores com respeito e cortesia</li>
                  <li>Não revender itens doados gratuitamente</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Segurança e Encontros</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  O ShareCycle não é responsável por encontros presenciais entre usuários. 
                  Recomendamos fortemente:
                </p>
                <ul>
                  <li>Encontros em locais públicos e seguros</li>
                  <li>Levar acompanhante quando possível</li>
                  <li>Confiar em seus instintos sobre segurança</li>
                  <li>Denunciar comportamentos suspeitos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  O ShareCycle e todo seu conteúdo, incluindo textos, gráficos, logos, 
                  ícones e software, são propriedade do ShareCycle e protegidos por 
                  leis de direitos autorais.
                </p>
                <p>
                  Você mantém os direitos sobre o conteúdo que publica, mas concede ao 
                  ShareCycle uma licença para usar, exibir e distribuir esse conteúdo 
                  na plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Privacidade</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Sua privacidade é importante para nós. Consulte nossa 
                  <a href="/privacy" className="text-primary hover:underline"> Política de Privacidade </a>
                  para entender como coletamos, usamos e protegemos suas informações.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Isenção de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  O ShareCycle é fornecido "como está". Não garantimos que:
                </p>
                <ul>
                  <li>O serviço será ininterrupto ou livre de erros</li>
                  <li>Os itens doados atenderão às suas expectativas</li>
                  <li>As interações entre usuários serão satisfatórias</li>
                  <li>Os usuários cumprirão seus compromissos</li>
                </ul>
                <p>
                  Você usa a plataforma por sua própria conta e risco.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Em nenhuma circunstância o ShareCycle será responsável por:
                </p>
                <ul>
                  <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                  <li>Perda de lucros, dados ou uso</li>
                  <li>Problemas decorrentes de encontros entre usuários</li>
                  <li>Qualidade, segurança ou legalidade dos itens doados</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Rescisão</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Podemos suspender ou encerrar sua conta a qualquer momento, 
                  com ou sem aviso, por violação destes termos ou por qualquer 
                  outro motivo.
                </p>
                <p>
                  Você pode encerrar sua conta a qualquer momento entrando em 
                  contato conosco.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Lei Aplicável</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Estes termos são regidos pelas leis do Brasil. Qualquer disputa 
                  será resolvida nos tribunais competentes do Brasil.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>13. Contato</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:legal@sharecycle.app" className="hover:underline">
                    legal@sharecycle.app
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 