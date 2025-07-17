# Dirhect JWT Fix

## Descrição

Plugin WordPress que corrige problemas de permissão na API REST com JWT Authentication. Compatível com os plugins JWT Authentication for WP-API e Simple JWT Login.

## Funcionalidades

- ✅ Detecta automaticamente qual plugin JWT está sendo usado
- ✅ Corrige problemas de autenticação na API REST
- ✅ Garante permissões adequadas para usuários autenticados
- ✅ Fornece logs detalhados para debug
- ✅ Configura CORS automaticamente
- ✅ Endpoint de debug para verificar permissões

## Instalação

1. Faça upload do arquivo ZIP para `/wp-content/plugins/`
2. Ative o plugin no painel administrativo
3. O plugin funcionará automaticamente

## Compatibilidade

- WordPress 5.0+
- PHP 7.4+
- JWT Authentication for WP-API
- Simple JWT Login

## Endpoints de Debug

### Verificar Permissões
```
GET /wp-json/dirhect-jwt-fix/v1/debug
```

**Headers:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

**Resposta:**
```json
{
  "user_id": 1,
  "user_login": "admin",
  "user_email": "admin@exemplo.com",
  "roles": ["administrator"],
  "capabilities": {
    "edit_posts": true,
    "publish_posts": true,
    "edit_published_posts": true,
    "delete_posts": true,
    "upload_files": true,
    "manage_categories": true,
    "read": true
  },
  "request_uri": "/wp-json/wp/v2/posts",
  "request_method": "POST",
  "has_authorization": true
}
```

## Logs

O plugin gera logs detalhados. Verifique em:
- `/wp-content/debug.log` (se WP_DEBUG_LOG estiver ativo)
- Logs do servidor web (Apache/Nginx)

## Suporte

Para suporte, entre em contato com a equipe Dirhect.

## Licença

GPL v2 ou posterior 