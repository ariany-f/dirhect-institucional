# Configuração do Simple JWT Login no WordPress

## 1. Instalação do Plugin

1. No painel administrativo do WordPress, vá para **Plugins > Adicionar Novo**
2. Pesquise por "Simple JWT Login"
3. Instale e ative o plugin

## 2. Configuração do Plugin

### 2.1 Configurações Gerais
1. Vá para **Configurações > Simple JWT Login**
2. Na aba **General**, configure:
   - **JWT Secret**: Digite uma chave secreta forte (mínimo 32 caracteres)
   - **JWT Decrypt Key**: Digite a chave de descriptografia: `9e2f0b6d8d7a4f21a70d8711c909a532873adea9cf10273c64c4d2c7c9a8f8f2`
   - **JWT Expiration**: Configure o tempo de expiração (ex: 86400 para 24 horas)

### 2.2 Configurações de Autenticação
1. Na aba **Authentication**, configure:
   - **Allow Authentication**: Marque como **Yes**
   - **Require Authentication Key**: Marque como **No** (para facilitar o desenvolvimento)
   - **Allowed IPs**: Deixe vazio para permitir de qualquer IP

### 2.3 Configurações de CORS
1. Na aba **CORS**, configure:
   - **Allow CORS**: Marque como **Yes**
   - **Allow Origin**: Digite `*` ou o domínio do seu site React
   - **Allow Methods**: Digite `GET, POST, PUT, DELETE, OPTIONS`
   - **Allow Headers**: Digite `Content-Type, Authorization`

### 2.4 Configurações de Hooks
1. Na aba **Hooks**, configure:
   - **Redirect URL**: Deixe vazio
   - **User Profile**: Marque como **Yes** para retornar dados do usuário

## 3. Configuração do React (.env)

Crie um arquivo `.env` na raiz do projeto React com as seguintes variáveis:

```env
# Configurações do WordPress
VITE_WORDPRESS_API_URL=https://dirhect-institucional.thunderbold.com.br/wp-json/wp/v2

# Chave JWT de descriptografia (Simple JWT Login)
VITE_JWT_DECRYPTION_KEY=9e2f0b6d8d7a4f21a70d8711c909a532873adea9cf10273c64c4d2c7c9a8f8f2

# Outras configurações
VITE_SITE_URL=https://dirhect-institucional.thunderbold.com.br
```

**Importante**: 
- O arquivo `.env` deve estar na raiz do projeto React
- As variáveis devem começar com `VITE_` (para compatibilidade com Vite)
- Após criar/modificar o `.env`, reinicie o servidor de desenvolvimento

## 4. Endpoints Disponíveis

### 4.1 Login
```
POST /wp-json/simple-jwt-login/v1/auth
```

**Corpo da requisição:**
```json
{
  "username": "seu-usuario-admin",
  "password": "sua-senha"
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "jwt_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "user_login": "admin",
      "user_email": "admin@exemplo.com",
      "display_name": "Administrador",
      "roles": ["administrator"],
      "capabilities": {
        "manage_options": true,
        "edit_posts": true,
        "publish_posts": true,
        "delete_posts": true
      }
    }
  }
}
```

### 4.2 Validação de Token
```
POST /wp-json/simple-jwt-login/v1/auth/validate
```

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "user_login": "admin",
      "user_email": "admin@exemplo.com",
      "display_name": "Administrador",
      "roles": ["administrator"],
      "capabilities": {
        "manage_options": true,
        "edit_posts": true,
        "publish_posts": true,
        "delete_posts": true
      }
    }
  }
}
```

## 5. Teste da Configuração

### 5.1 Teste de Login
Use curl ou Postman para testar:

```bash
curl -X POST https://seu-site.com/wp-json/simple-jwt-login/v1/auth \
  -H "Content-Type: application/json" \
  -d '{
    "username": "seu-usuario-admin",
    "password": "sua-senha"
  }'
```

### 5.2 Teste de Validação
```bash
curl -X POST https://seu-site.com/wp-json/simple-jwt-login/v1/auth/validate \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

## 6. Integração com o React

O código React já está configurado para usar estes endpoints. O serviço `wordpressService.js` agora usa as variáveis de ambiente do Vite:

```javascript
const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://dirhect-institucional.thunderbold.com.br/wp-json/wp/v2'

// Chave JWT de descriptografia (do .env)
get JWT_DECRYPTION_KEY() {
  return import.meta.env.VITE_JWT_DECRYPTION_KEY || '9e2f0b6d8d7a4f21a70d8711c909a532873adea9cf10273c64c4d2c7c9a8f8f2'
}
```

## 7. Solução de Problemas

### 7.1 Erro 401 Unauthorized
- Verifique se o plugin está ativo
- Confirme se as chaves JWT estão configuradas corretamente
- Verifique se o usuário tem permissões de administrador
- Confirme se o arquivo `.env` está configurado corretamente

### 7.2 Erro CORS
- Verifique se o CORS está habilitado no plugin
- Confirme se o domínio de origem está permitido
- Verifique se os headers estão configurados corretamente

### 7.3 Token Inválido
- Verifique se o token não expirou
- Confirme se o token está sendo enviado corretamente no header Authorization
- Verifique se as chaves de criptografia estão corretas
- Confirme se a chave JWT no `.env` está correta

### 7.4 Variáveis de Ambiente não Carregadas
- Certifique-se de que o arquivo `.env` está na raiz do projeto
- Verifique se as variáveis começam com `VITE_` (para Vite)
- Reinicie o servidor de desenvolvimento após criar/modificar o `.env`
- Verifique se não há espaços extras ou caracteres especiais
- Para Vite, use `import.meta.env.VITE_NOME_DA_VARIAVEL`

### 7.5 Erro "process is not defined"
- Este erro ocorre quando se usa `process.env` em vez de `import.meta.env` no Vite
- Substitua `process.env.REACT_APP_` por `import.meta.env.VITE_`
- Reinicie o servidor de desenvolvimento após a correção

## 8. Segurança

- Use chaves JWT fortes e únicas
- Mantenha o WordPress e plugins atualizados
- Use HTTPS em produção
- Monitore logs de acesso
- Considere implementar rate limiting
- Em produção, configure IPs permitidos
- **Nunca commite o arquivo `.env` no repositório**
- Use `.env.example` para documentar as variáveis necessárias

## 9. URLs das Páginas de Criação

Após a configuração, você poderá acessar:

- **Admin**: `https://seu-site.com/admin`
- **Criar Post**: `https://seu-site.com/admin/criar-post`
- **Criar Roadmap**: `https://seu-site.com/admin/criar-roadmap`
- **Criar Conhecimento**: `https://seu-site.com/admin/criar-conhecimento`

## 10. Funcionalidades Implementadas

### 10.1 Página de Criação de Posts
- Editor de título e conteúdo
- Upload de imagem destacada
- Seleção de categorias
- Sistema de tags
- Salvar como rascunho ou publicar

### 10.2 Página de Criação de Roadmap
- Campos específicos para funcionalidades
- Status (Planejado, Em Desenvolvimento, Concluído)
- Prioridade (Baixa, Média, Alta)
- Trimestre e categoria
- Datas estimadas e de lançamento
- Lista de funcionalidades principais

### 10.3 Página de Criação de Conhecimento
- Editor de artigos
- Sistema de tags dinâmico
- Categorias predefinidas
- Marcação de destaque
- Contador de visualizações

## 11. Próximos Passos

1. Configure o plugin Simple JWT Login no WordPress
2. Crie o arquivo `.env` com as configurações corretas
3. Teste o login com um usuário administrador
4. Acesse `/admin` para verificar se a autenticação está funcionando
5. Teste a criação de conteúdo nas páginas específicas
6. Configure HTTPS em produção
7. Implemente medidas de segurança adicionais conforme necessário

## 12. Arquivos CSS Criados

- `src/pages/Admin.css` - Estilos para a página de administração
- `src/pages/CriarPost.css` - Estilos para criação de posts
- `src/pages/CriarRoadmap.css` - Estilos para criação de roadmap
- `src/pages/CriarConhecimento.css` - Estilos para criação de conhecimento

Todos os arquivos CSS incluem design responsivo e moderno, com animações e transições suaves. 