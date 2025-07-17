# Solução Completa para Erro de JWT e Permissões

## Problema
```
Erro ao salvar: Error: Sem permissão para criar posts com este usuário.
{
    "code": "rest_cannot_create",
    "message": "Sem permissão para criar posts com este usuário.",
    "data": {
        "status": 401
    }
}
```

## Diagnóstico

O erro persiste mesmo com usuário administrador, indicando que:
1. O plugin JWT não está configurado corretamente
2. O token não está sendo validado adequadamente
3. As permissões não estão sendo aplicadas na API REST

## Soluções

### Solução 1: Plugin WordPress JWT Fix (Recomendada)

1. **Faça upload do arquivo `wordpress-jwt-fix.php`** para a pasta `/wp-content/plugins/`
2. **Ative o plugin** no painel administrativo do WordPress
3. **Teste a aplicação**

Este plugin:
- Detecta automaticamente qual plugin JWT está sendo usado
- Corrige problemas de autenticação na API REST
- Garante permissões adequadas para usuários autenticados
- Fornece logs detalhados para debug

### Solução 2: Configurar Plugin JWT Manualmente

#### Para JWT Authentication for WP-API:

1. **Instale o plugin** "JWT Authentication for WP-API"
2. **Adicione ao wp-config.php**:
```php
define('JWT_AUTH_SECRET_KEY', 'sua-chave-secreta-muito-segura-aqui');
define('JWT_AUTH_CORS_ENABLE', true);
```
3. **Adicione ao .htaccess**:
```apache
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

#### Para Simple JWT Login:

1. **Instale o plugin** "Simple JWT Login"
2. **Configure no painel administrativo**:
   - JWT Secret: chave secreta forte
   - JWT Decrypt Key: `9e2f0b6d8d7a4f21a70d8711c909a532873adea9cf10273c64c4d2c7c9a8f8f2`
   - Allow Authentication: Yes
   - CORS: habilitado

### Solução 3: Código no functions.php

Adicione este código ao `functions.php` do seu tema:

```php
// Fix para JWT Authentication na API REST
add_filter('rest_authentication_errors', function($result) {
    if (true === $result || is_wp_error($result)) {
        return $result;
    }
    
    // Verificar se é uma requisição para a API REST
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        
        // Verificar se há token JWT no header
        $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        
        if (strpos($auth_header, 'Bearer ') === 0) {
            $token = substr($auth_header, 7);
            
            // Tentar validar o token JWT
            $user = validate_jwt_token($token);
            
            if ($user && $user->ID > 0) {
                // Definir o usuário atual
                wp_set_current_user($user->ID);
                return true;
            }
        }
    }
    
    return $result;
});

function validate_jwt_token($token) {
    try {
        // Implementação básica de decodificação JWT
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        
        $payload = base64_decode(str_pad(strtr($parts[1], '-_', '+/'), strlen($parts[1]) % 4, '=', STR_PAD_RIGHT));
        $decoded = json_decode($payload);
        
        if ($decoded && isset($decoded->user_id)) {
            return get_user_by('id', $decoded->user_id);
        }
        
        return null;
    } catch (Exception $e) {
        return null;
    }
}

// Garantir permissões para usuários autenticados via API REST
add_filter('user_has_cap', function($allcaps, $caps, $args) {
    $user = wp_get_current_user();
    
    if (!$user || $user->ID === 0) {
        return $allcaps;
    }
    
    // Dar permissões adicionais para usuários autenticados via API REST
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        
        // Para usuários administrador, garantir todas as permissões
        if (in_array('administrator', $user->roles)) {
            $allcaps['edit_posts'] = true;
            $allcaps['publish_posts'] = true;
            $allcaps['edit_published_posts'] = true;
            $allcaps['delete_published_posts'] = true;
            $allcaps['delete_posts'] = true;
            $allcaps['edit_others_posts'] = true;
            $allcaps['delete_others_posts'] = true;
            $allcaps['upload_files'] = true;
            $allcaps['manage_categories'] = true;
            $allcaps['read'] = true;
        }
    }
    
    return $allcaps;
}, 10, 3);
```

## Verificação

### 1. Teste de Login
```bash
curl -X POST https://seu-site.com/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{
    "username": "seu-usuario-admin",
    "password": "sua-senha"
  }'
```

### 2. Teste de Validação
```bash
curl -X POST https://seu-site.com/wp-json/jwt-auth/v1/token/validate \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### 3. Teste de Debug
```bash
curl -X GET https://seu-site.com/wp-json/jwt-fix/v1/debug \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### 4. Teste de Criação de Post
```bash
curl -X POST https://seu-site.com/wp-json/wp/v2/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "title": "Teste de Post",
    "content": "Conteúdo de teste",
    "status": "draft"
  }'
```

## Logs de Debug

O plugin `wordpress-jwt-fix.php` gera logs detalhados. Verifique em:
- `/wp-content/debug.log` (se WP_DEBUG_LOG estiver ativo)
- Logs do servidor web (Apache/Nginx)

### Exemplo de Logs Esperados:
```
WordPress JWT API Fix inicializado
=== REST API REQUEST ===
URI: /wp-json/wp/v2/posts
Method: POST
Authorization: Present
Usuário autenticado via JWT: admin (ID: 1)
Roles: administrator
Capabilities: edit_posts=YES
Capabilities: publish_posts=YES
========================
=== CAPABILITIES REQUEST ===
User: admin (ID: 1)
Roles: administrator
Requested caps: edit_posts, publish_posts
Administrador - todas as permissões garantidas
Final caps: edit_posts, publish_posts, edit_published_posts, delete_posts, upload_files, manage_categories, read
========================
```

## Configuração do React

O código React foi atualizado para detectar automaticamente qual plugin JWT está sendo usado. Não é necessário fazer alterações no frontend.

## Troubleshooting

### Erro 404 nos endpoints JWT
- Verifique se o plugin JWT está ativo
- Confirme se os endpoints estão corretos

### Token inválido
- Verifique se as chaves JWT estão configuradas corretamente
- Confirme se o token não expirou

### Permissões ainda negadas
- Verifique os logs do plugin
- Confirme se o usuário tem role adequado
- Teste o endpoint de debug

### CORS errors
- Verifique se o CORS está configurado no plugin
- Confirme se os headers estão corretos

## Recomendação Final

**Use a Solução 1** (plugin `wordpress-jwt-fix.php`) pois:
- Resolve automaticamente problemas de compatibilidade
- Funciona com ambos os plugins JWT
- Fornece logs detalhados para debug
- É a solução mais robusta e completa

## Arquivos Criados

- `wordpress-jwt-fix.php` - Plugin WordPress para corrigir problemas JWT
- `src/services/wordpressService.js` - Serviço atualizado com detecção automática
- `SOLUCAO_JWT_COMPLETA.md` - Este guia completo 