# Configuração do JWT Authentication for WP-API no WordPress

## 1. Instalação do Plugin

1. No painel administrativo do WordPress, vá para **Plugins > Adicionar Novo**
2. Pesquise por "JWT Authentication for WP-API"
3. Instale e ative o plugin

## 2. Configuração do wp-config.php

Adicione as seguintes linhas no arquivo `wp-config.php` (antes da linha `/* That's all, stop editing! */`):

```php
// JWT Authentication
define('JWT_AUTH_SECRET_KEY', 'sua-chave-secreta-muito-segura-aqui');
define('JWT_AUTH_CORS_ENABLE', true);
```

**IMPORTANTE**: Substitua `sua-chave-secreta-muito-segura-aqui` por uma chave aleatória de pelo menos 32 caracteres.

## 3. Configuração do .htaccess

Adicione as seguintes linhas no arquivo `.htaccess` na raiz do WordPress:

```apache
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

## 4. Verificação da Configuração

### Teste de Login
Para testar se a configuração está funcionando, faça uma requisição POST para:
```
https://seu-site.com/wp-json/jwt-auth/v1/token
```

Com o corpo:
```json
{
  "username": "seu-usuario-admin",
  "password": "sua-senha"
}
```

### Resposta Esperada
Se tudo estiver configurado corretamente, você receberá:
```json
{
  "success": true,
  "statusCode": 200,
  "code": "jwt_auth_valid_credential",
  "message": "Credential is valid",
  "data": {
    "id": 1,
    "user_login": "admin",
    "user_nicename": "admin",
    "user_email": "admin@exemplo.com",
    "user_url": "",
    "user_registered": "2024-01-01T00:00:00",
    "user_activation_key": "",
    "user_status": "0",
    "display_name": "Administrador",
    "spam": "0",
    "deleted": "0",
    "roles": ["administrator"],
    "capabilities": {
      "manage_options": true,
      "manage_network": true,
      "activate_plugins": true,
      "edit_plugins": true,
      "install_plugins": true,
      "update_plugins": true,
      "delete_plugins": true,
      "edit_themes": true,
      "install_themes": true,
      "update_themes": true,
      "delete_themes": true,
      "edit_users": true,
      "create_users": true,
      "edit_network_users": true,
      "create_network_users": true,
      "delete_users": true,
      "delete_network_users": true,
      "manage_network_options": true,
      "moderate_comments": true,
      "manage_categories": true,
      "manage_links": true,
      "upload_files": true,
      "import": true,
      "unfiltered_html": true,
      "edit_posts": true,
      "edit_others_posts": true,
      "publish_posts": true,
      "edit_published_posts": true,
      "edit_private_posts": true,
      "delete_published_posts": true,
      "delete_private_posts": true,
      "delete_others_posts": true,
      "delete_posts": true,
      "delete_others_pages": true,
      "edit_pages": true,
      "edit_others_pages": true,
      "edit_published_pages": true,
      "publish_pages": true,
      "delete_published_pages": true,
      "delete_pages": true,
      "delete_private_pages": true,
      "edit_private_pages": true,
      "read_private_pages": true,
      "read_private_posts": true,
      "edit_network_plugins": true,
      "activate_network_plugins": true,
      "edit_network_themes": true,
      "edit_network_sites": true,
      "create_network_sites": true,
      "manage_network_sites": true,
      "delete_network_sites": true,
      "delete_sites": true,
      "read": true,
      "level_10": true,
      "level_9": true,
      "level_8": true,
      "level_7": true,
      "level_6": true,
      "level_5": true,
      "level_4": true,
      "level_3": true,
      "level_2": true,
      "level_1": true,
      "level_0": true,
      "edit_network_options": true,
      "delete_network_options": true,
      "update_core": true,
      "list_users": true,
      "remove_users": true,
      "add_users": true,
      "promote_users": true,
      "edit_network_users": true,
      "delete_network_users": true,
      "create_network_users": true,
      "manage_network": true,
      "setup_network": true,
      "manage_network_users": true,
      "manage_network_themes": true,
      "manage_network_plugins": true,
      "manage_network_options": true,
      "upgrade_network": true,
      "setup_network": true,
      "activate_plugins": true,
      "create_users": true,
      "delete_plugins": true,
      "delete_themes": true,
      "delete_users": true,
      "edit_files": true,
      "edit_plugins": true,
      "edit_theme_options": true,
      "edit_themes": true,
      "edit_users": true,
      "export": true,
      "import": true,
      "install_plugins": true,
      "install_themes": true,
      "list_users": true,
      "manage_options": true,
      "promote_users": true,
      "remove_users": true,
      "switch_themes": true,
      "update_core": true,
      "update_plugins": true,
      "update_themes": true,
      "edit_dashboard": true
    },
    "allcaps": {
      "manage_options": true,
      "manage_network": true,
      "activate_plugins": true,
      "edit_plugins": true,
      "install_plugins": true,
      "update_plugins": true,
      "delete_plugins": true,
      "edit_themes": true,
      "install_themes": true,
      "update_themes": true,
      "delete_themes": true,
      "edit_users": true,
      "create_users": true,
      "edit_network_users": true,
      "create_network_users": true,
      "delete_users": true,
      "delete_network_users": true,
      "manage_network_options": true,
      "moderate_comments": true,
      "manage_categories": true,
      "manage_links": true,
      "upload_files": true,
      "import": true,
      "unfiltered_html": true,
      "edit_posts": true,
      "edit_others_posts": true,
      "publish_posts": true,
      "edit_published_posts": true,
      "edit_private_posts": true,
      "delete_published_posts": true,
      "delete_private_posts": true,
      "delete_others_posts": true,
      "delete_posts": true,
      "delete_others_pages": true,
      "edit_pages": true,
      "edit_others_pages": true,
      "edit_published_pages": true,
      "publish_pages": true,
      "delete_published_pages": true,
      "delete_pages": true,
      "delete_private_pages": true,
      "edit_private_pages": true,
      "read_private_pages": true,
      "read_private_posts": true,
      "edit_network_plugins": true,
      "activate_network_plugins": true,
      "edit_network_themes": true,
      "edit_network_sites": true,
      "create_network_sites": true,
      "manage_network_sites": true,
      "delete_network_sites": true,
      "delete_sites": true,
      "read": true,
      "level_10": true,
      "level_9": true,
      "level_8": true,
      "level_7": true,
      "level_6": true,
      "level_5": true,
      "level_4": true,
      "level_3": true,
      "level_2": true,
      "level_1": true,
      "level_0": true,
      "edit_network_options": true,
      "delete_network_options": true,
      "update_core": true,
      "list_users": true,
      "remove_users": true,
      "add_users": true,
      "promote_users": true,
      "edit_network_users": true,
      "delete_network_users": true,
      "create_network_users": true,
      "manage_network": true,
      "setup_network": true,
      "manage_network_users": true,
      "manage_network_themes": true,
      "manage_network_plugins": true,
      "manage_network_options": true,
      "upgrade_network": true,
      "setup_network": true,
      "activate_plugins": true,
      "create_users": true,
      "delete_plugins": true,
      "delete_themes": true,
      "delete_users": true,
      "edit_files": true,
      "edit_plugins": true,
      "edit_theme_options": true,
      "edit_themes": true,
      "edit_users": true,
      "export": true,
      "import": true,
      "install_plugins": true,
      "install_themes": true,
      "list_users": true,
      "manage_options": true,
      "promote_users": true,
      "remove_users": true,
      "switch_themes": true,
      "update_core": true,
      "update_plugins": true,
      "update_themes": true,
      "edit_dashboard": true
    },
    "filter": null
  }
}
```

## 5. Teste de Validação de Token

Para testar a validação do token, faça uma requisição POST para:
```
https://seu-site.com/wp-json/jwt-auth/v1/token/validate
```

Com o header:
```
Authorization: Bearer SEU_TOKEN_JWT
```

## 6. Solução de Problemas

### Erro 401 Unauthorized
- Verifique se a chave secreta está definida corretamente
- Confirme se o plugin está ativo
- Verifique se o .htaccess está configurado

### Erro CORS
- Certifique-se de que `JWT_AUTH_CORS_ENABLE` está definido como `true`
- Verifique se o servidor está configurado para permitir CORS

### Token Inválido
- Verifique se o token não expirou
- Confirme se o token está sendo enviado corretamente no header Authorization

## 7. Segurança

- Use uma chave secreta forte e única
- Mantenha o WordPress e plugins atualizados
- Use HTTPS em produção
- Monitore logs de acesso
- Considere implementar rate limiting

## 8. Endpoints Disponíveis

- `POST /wp-json/jwt-auth/v1/token` - Login
- `POST /wp-json/jwt-auth/v1/token/validate` - Validar token
- `POST /wp-json/jwt-auth/v1/token/revoke` - Revogar token (se suportado)

## 9. Integração com o React

O código React já está configurado para usar estes endpoints. Certifique-se de que a URL base no `wordpressService.js` está correta:

```javascript
const WORDPRESS_API_URL = 'https://seu-site.com/wp-json/wp/v2'
``` 