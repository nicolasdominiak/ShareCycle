# ShareCycle 🌱

> Transformar o excesso em oportunidade, conectando quem tem com quem precisa, um item por vez.

Uma plataforma web progressiva (PWA) que conecta pessoas dispostas a doar alimentos, objetos e recursos com aqueles que precisam, promovendo sustentabilidade e reduzindo o desperdício através da economia compartilhada.

## ✨ Funcionalidades

### Para Doadores
- 📝 Interface simples para cadastrar doações
- 🎯 Controle sobre quem recebe as doações  
- 📊 Impacto ambiental mensurável
- 🏆 Reconhecimento através de gamificação

### Para Receptores
- 🔍 Busca facilitada por localização
- 💬 Comunicação direta com doadores
- 🤝 Processo transparente e respeitoso
- ❤️ Acesso digno a recursos necessários

### Para o Planeta
- ♻️ Redução do desperdício
- 🌍 Diminuição da pegada de carbono
- 🔄 Promoção da economia circular
- 🌱 Conscientização ambiental

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15** (App Router) - Framework React com SSR
- **TypeScript** - Type safety e melhor DX
- **Tailwind CSS 3.4** - Styling utility-first
- **shadcn/ui** - Componentes acessíveis e customizáveis

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL com Row Level Security (RLS)
  - Autenticação integrada
  - Storage para imagens
  - Realtime para chat
  - Edge Functions

### Ferramentas Adicionais
- **TanStack Query** - Gerenciamento de estado servidor
- **React Hook Form + Zod** - Formulários e validação
- **Lucide React** - Ícones consistentes
- **next-pwa** - Progressive Web App

### Infraestrutura
- **Vercel** - Deploy e hosting
- **GitHub** - Versionamento e CI/CD

## 🏗️ Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Cliente PWA   │────▶│   Next.js App   │────▶│    Supabase     │
│   (Browser)     │     │   (Vercel)      │     │   (Backend)     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        │
         │                       │                        │
         ▼                       ▼                        ▼
   ┌──────────┐           ┌──────────┐            ┌──────────┐
   │ Service  │           │  Edge    │            │ Database │
   │ Worker   │           │ Function │            │ Storage  │
   └──────────┘           └──────────┘            └──────────┘
```

## 📱 Progressive Web App (PWA)

O ShareCycle é desenvolvido com abordagem **mobile-first** e funciona como PWA:

- 📱 **Instalável** - Ícone na home screen
- 🔄 **Offline** - Funciona sem internet (cache)
- 🎯 **Nativo** - Fullscreen, sem barra de navegação
- 🔔 **Notificações** - Push notifications nativas
- ⚡ **Atualizações** - Automáticas em background

### Breakpoints Responsivos
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/sharecycle.git
   cd sharecycle
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Preencha as variáveis no `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse o aplicativo**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
sharecycle/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── (auth)/            # Grupo de rotas autenticação
│   │   ├── (dashboard)/       # Grupo de rotas autenticadas
│   │   ├── api/               # API Routes
│   │   └── manifest.ts        # PWA manifest
│   ├── components/            # Componentes React
│   │   ├── ui/               # shadcn/ui components
│   │   ├── forms/            # Formulários específicos
│   │   └── features/         # Features completas
│   ├── lib/                   # Utilitários e configurações
│   │   ├── supabase/         # Cliente Supabase
│   │   ├── utils/            # Funções auxiliares
│   │   └── validations/      # Schemas Zod
│   ├── hooks/                 # Custom React Hooks
│   ├── types/                 # TypeScript types
│   └── styles/               # CSS global
├── public/                    # Assets estáticos
└── ...
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 🔒 Segurança

### Implementações de Segurança
- 🔐 **Autenticação JWT** gerenciada pelo Supabase
- 🛡️ **Row Level Security (RLS)** em todas as tabelas
- 🔄 **Refresh tokens** com rotação automática
- 🚫 **Rate limiting** em endpoints sensíveis
- ✅ **Validação** no cliente e servidor
- 🧹 **Sanitização** de inputs
- 📝 **Logs de auditoria**

### Privacidade
- Dados pessoais mínimos
- Opção de anonimato parcial  
- Compliance com LGPD
- Transparência no uso de dados

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte seu repositório GitHub à Vercel**
2. **Configure as variáveis de ambiente**
3. **Deploy automático** a cada push na branch `main`

### Variáveis de Ambiente para Produção
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📋 Roadmap de Desenvolvimento

### ✅ Fase 1: Fundação
- [x] Setup inicial do projeto
- [x] Configuração do Supabase
- [x] Sistema de autenticação
- [x] Layout base e navegação

### 🚧 Fase 2: Funcionalidades Core
- [ ] Sistema de doações (CRUD)
- [ ] Sistema de busca com filtros
- [ ] Geolocalização
- [ ] Detalhes e interações

### 📅 Fase 3: Comunicação
- [ ] Sistema de solicitações
- [ ] Chat em tempo real
- [ ] Sistema de notificações
- [ ] Email transacional

### 🎨 Fase 4: PWA e Polish
- [ ] Configuração PWA completa
- [ ] Otimização de performance
- [ ] UI/UX refinements
- [ ] Testes e monitoramento

## 📊 Métricas de Sucesso

### KPIs Técnicos
- 🚀 Lighthouse Score > 90
- ⚡ Time to Interactive < 3s
- 📱 Taxa de instalação PWA > 10%
- 🔄 Uptime > 99.9%

### KPIs de Negócio
- 👥 Usuários ativos mensais
- 🔄 Taxa de conversão doador/receptor
- ✅ Número de doações concluídas
- 📈 Taxa de retenção após 30 dias

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🌟 Suporte

Se você gostou do projeto, considere dar uma ⭐ no repositório!

Para dúvidas ou suporte:
- 📧 Email: contato@sharecycle.com
- 💬 Discord: [ShareCycle Community](https://discord.gg/sharecycle)
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/sharecycle/issues)

---

<div align="center">
  <p>Feito com ❤️ para um mundo mais sustentável</p>
  <p>ShareCycle © 2024</p>
</div> 