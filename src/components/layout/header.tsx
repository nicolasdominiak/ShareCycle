'use client'

import Link from 'next/link'
import { Recycle, Menu, Search, Bell, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { User } from '@supabase/supabase-js'

interface HeaderProps {
  user?: User | null
}

const navigationItems = [
  {
    title: 'Explorar',
    href: '/donations',
    description: 'Encontre doações disponíveis na sua região'
  },
  {
    title: 'Doar',
    href: '/donations/new',
    description: 'Cadastre uma nova doação'
  },
  {
    title: 'Comunidade',
    href: '/community',
    description: 'Conecte-se com outros membros'
  },
  {
    title: 'Sobre',
    href: '/about',
    description: 'Conheça nossa missão e impacto'
  }
]

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
              <Recycle className="h-6 w-6 text-primary" />
            </div>
          <span className="font-bold text-xl text-foreground">
            Share<span className="text-primary">Cycle</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="bg-transparent">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {user ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
                <span className="sr-only">Notificações</span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name} />
                      <AvatarFallback>
                        {user?.user_metadata?.name?.charAt(0) || <UserIcon className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.user_metadata?.name && <p className="font-medium">{user.user_metadata.name}</p>}
                      {user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/donations/my">Minhas Doações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/requests/my">Minhas Solicitações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Cadastrar</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="flex items-center space-x-2 pb-4 border-b border-border">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Recycle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-bold text-lg text-foreground">
                    Share<span className="text-primary">Cycle</span>
                  </span>
                </Link>
                
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex flex-col space-y-1 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.description}</span>
                  </Link>
                ))}

                {!user && (
                  <div className="pt-4 border-t border-border space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login">Entrar</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/auth/register">Cadastrar</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 