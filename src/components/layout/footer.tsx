'use client'

import Link from 'next/link'
import { Recycle, Heart, Github, Twitter, Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

const footerLinks = {
  product: [
    { title: 'Explorar Doações', href: '/donations' },
    { title: 'Criar Doação', href: '/donations/new' },
    { title: 'Como Funciona', href: '/how-it-works' }
  ],
  company: [
    { title: 'Sobre Nós', href: '/about' },
    { title: 'Nossa Missão', href: '/mission' },
    { title: 'Impacto', href: '/impact' }
  ],
  support: [
    { title: 'Contato', href: '/contact' },
    { title: 'Denunciar', href: '/report' },
    { title: 'FAQ', href: '/faq' }
  ],
  legal: [
    { title: 'Termos de Uso', href: '/terms' },
    { title: 'Política de Privacidade', href: '/privacy' },
    { title: 'Cookies', href: '/cookies' }
  ]
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/sharecycle', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/sharecycle', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/sharecycle', label: 'Instagram' },
  { icon: Mail, href: 'mailto:contato@sharecycle.app', label: 'Email' }
]

export function Footer() {
  const isMobile = useIsMobile()

  // Versão mobile resumida e centralizada
  if (isMobile) {
    return (
      <footer className="bg-muted/50 dark:bg-background border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            {/* Brand */}
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="p-1.5 bg-primary rounded-lg">
                <Recycle className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">
                Share<span className="text-primary">Cycle</span>
              </span>
            </Link>

            {/* Links essenciais */}
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/donations" className="text-muted-foreground hover:text-foreground">
                Doações
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contato
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>

            {/* Redes sociais */}
            <div className="flex justify-center space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8 p-0"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-3.5 w-3.5" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span>Feito com</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span>para um mundo melhor</span>
              </div>
              <p>© 2025 ShareCycle. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Versão desktop completa
  return (
    <footer className="bg-muted/50 dark:bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Recycle className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                Share<span className="text-primary">Cycle</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Transformando o excesso em oportunidade, conectando quem tem com quem precisa, 
              um item por vez.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                © 2025 ShareCycle. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <span className="text-sm">Feito com</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span className="text-sm">para um mundo melhor</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Versão 0.0.1</span>
              <span>•</span>
              <span>Status: Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 