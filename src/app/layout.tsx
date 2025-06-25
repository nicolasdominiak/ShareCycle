import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/lib/providers/query-provider'
import { GeolocationProvider } from '@/lib/providers/geolocation-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto' })

export const metadata: Metadata = {
  title: 'ShareCycle - Compartilhe, Receba, Transforme',
  description: 'Uma plataforma web progressiva que conecta pessoas dispostas a doar alimentos, objetos e recursos com aqueles que precisam, promovendo sustentabilidade e reduzindo o desperdício.',
  keywords: ['doação', 'sustentabilidade', 'economia compartilhada', 'desperdício zero', 'comunidade'],
  authors: [{ name: 'ShareCycle Team' }],
  creator: 'ShareCycle',
  publisher: 'ShareCycle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sharecycle.app'),
  openGraph: {
    title: 'ShareCycle - Compartilhe, Receba, Transforme',
    description: 'Conectando quem tem com quem precisa, um item por vez.',
    url: 'https://sharecycle.app',
    siteName: 'ShareCycle',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShareCycle - Compartilhe, Receba, Transforme',
    description: 'Conectando quem tem com quem precisa, um item por vez.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSans.variable} font-noto`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GeolocationProvider>
              {children}
            </GeolocationProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
} 