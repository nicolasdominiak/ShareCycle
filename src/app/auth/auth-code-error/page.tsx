import { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Erro de Autenticação | ShareCycle',
  description: 'Ocorreu um erro durante a autenticação',
}

export default function AuthCodeErrorPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Erro de Autenticação</CardTitle>
          <CardDescription>
            Ocorreu um erro durante o processo de autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            Isso pode ter acontecido por alguns motivos:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>O link de verificação expirou</li>
            <li>O link já foi usado anteriormente</li>
            <li>Houve um problema na comunicação com o servidor</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/auth/login">
              Tentar fazer login novamente
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/register">
              Criar nova conta
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/">
              Voltar à página inicial
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 