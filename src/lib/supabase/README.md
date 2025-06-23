# Configuração do Supabase - ShareCycle

## 📋 Resumo da Implementação

A **Tarefa 1.2: Configuração Supabase** foi concluída com sucesso! Todo o backend foi configurado usando o Supabase MCP.

## 🗄️ Schema do Banco de Dados

### Tabelas Criadas

1. **profiles** - Perfis dos usuários
   - Conectada à tabela `auth.users` do Supabase
   - Campos: id, email, full_name, avatar_url, phone, address, city, state, zip_code, latitude, longitude, bio
   - Trigger automático para criar perfil quando usuário se registra

2. **donations** - Doações disponíveis
   - Campos: id, donor_id, title, description, category, quantity, condition, images, pickup_address, etc.
   - Enums: `donation_category`, `donation_status`
   - Geolocalização para busca por proximidade

3. **requests** - Solicitações de doações
   - Relaciona doadores e receptores
   - Campos: id, donation_id, requester_id, donor_id, message, status, requested_quantity, etc.
   - Enum: `request_status`

4. **messages** - Sistema de chat
   - Mensagens entre doadores e receptores
   - Campos: id, request_id, sender_id, receiver_id, content, is_read

5. **notifications** - Notificações do sistema
   - Notificações automáticas para eventos importantes
   - Enum: `notification_type`

### Views Criadas

- **donations_with_donor** - Doações com informações do doador
- **requests_with_details** - Solicitações com detalhes completos
- **user_stats** - Estatísticas dos usuários

### Funções Criadas

- **search_donations_by_location** - Busca doações por proximidade geográfica
- **create_notification** - Cria notificações automaticamente

## 🔐 Segurança (RLS)

Todas as tabelas têm **Row Level Security (RLS)** habilitado com políticas específicas:

- **profiles**: Usuários podem ver todos os perfis, mas só editar o próprio
- **donations**: Qualquer um pode ver doações ativas, doadores gerenciam as próprias
- **requests**: Doadores veem solicitações para suas doações, solicitantes veem as próprias
- **messages**: Usuários veem apenas mensagens que enviaram ou receberam
- **notifications**: Usuários veem apenas suas próprias notificações

## 📁 Storage

Dois buckets configurados:

1. **avatars** - Fotos de perfil (5MB máximo)
2. **donation_images** - Imagens das doações (10MB máximo)

Ambos com políticas de acesso baseadas no ID do usuário.

## 🔧 Clientes Configurados

### Browser Client (`src/lib/supabase/client.ts`)
Para uso em Client Components:
```typescript
import { createBrowserClient } from '@/lib/supabase'
const supabase = createBrowserClient()
```

### Server Client (`src/lib/supabase/server.ts`)
Para uso em Server Components, Server Actions e Route Handlers:
```typescript
import { createServerClient } from '@/lib/supabase'
const supabase = await createServerClient()
```

## 📝 Tipos TypeScript

Tipos completos gerados automaticamente em `src/types/database.types.ts`:
- `Database` - Schema completo
- `Tables` - Tipos das tabelas
- `TablesInsert` - Tipos para inserção
- `TablesUpdate` - Tipos para atualização
- `Enums` - Enums do banco

## 🚀 Próximos Passos

Com o backend configurado, a próxima tarefa será:
**Tarefa 1.3: Sistema de Autenticação** - Implementar fluxo completo de login/registro.

## 📊 Estatísticas

- ✅ 5 tabelas criadas
- ✅ 3 views criadas
- ✅ 2 funções personalizadas
- ✅ 15+ políticas RLS
- ✅ 2 buckets de storage
- ✅ Triggers automáticos para notificações
- ✅ Tipos TypeScript gerados 