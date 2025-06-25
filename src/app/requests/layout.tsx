import { ReactNode } from 'react'

export default function RequestsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50/50 to-teal-50/50 dark:from-green-950/20 dark:to-teal-950/20">
      {children}
    </main>
  )
} 