# Solução para Erro de Permissão no WordPress

## Problema
```
Erro ao salvar: Error: Sem permissão para criar posts com este usuário.
```

## Causa
O usuário com role "Autor" no WordPress tem permissões limitadas para criar posts via API REST.

## Soluções

### Solução 1: Elevar Permissões do Usuário (Mais Simples)

1. **Acesse o painel administrativo do WordPress**
2. Vá para **Usuários > Todos os Usuários**
3. Clique em **Editar** no usuário que está tentando criar posts
4. Mude a **Função** de "Autor" para "Editor" ou "Administrador"
5. Clique em **Atualizar Usuário**

### Solução 2: Adicionar Código ao functions.php

Adicione este código ao arquivo `functions.php` do seu tema:

```php
// Permitir que usuários autor criem posts via API REST
add_filter('rest_authentication_errors', function($result) {
    if (true === $result || is_wp_error($result)) {
        return $result;
    }
    
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/wp/v2/posts') !== false) {
            return true;
        }
    }
    
    return $result;
});

// Adicionar permissões customizadas para usuários autor
add_filter('user_has_cap', function($allcaps, $caps, $args) {
    $user = wp_get_current_user();
    
    if (in_array('author', $user->roles)) {
        $allcaps['edit_posts'] = true;
        $allcaps['publish_posts'] = true;
        $allcaps['edit_published_posts'] = true;
        $allcaps['delete_published_posts'] = true;
        $allcaps['upload_files'] = true;
        $allcaps['manage_categories'] = true;
    }
    
    return $allcaps;
}, 10, 3);
```

### Solução 3: Instalar Plugin Customizado

1. **Crie um arquivo chamado `custom-permissions-plugin.php`**
2. **Cole o código do arquivo `custom-permissions-plugin.php` que foi criado**
3. **Faça upload do arquivo para a pasta `/wp-content/plugins/`**
4. **Ative o plugin no painel administrativo**

### Solução 4: Configurar JWT Simple Login

Se estiver usando o plugin JWT Simple Login, adicione estas configurações:

1. **No painel administrativo do WordPress**
2. Vá para **JWT Simple Login > Settings**
3. Em **Authentication Settings**, marque:
   - ✅ Allow authentication for all users
   - ✅ Allow authentication for authors
4. Em **CORS Settings**, adicione:
   - Origin: `*` (ou o domínio da sua aplicação)
   - Methods: `GET, POST, PUT, DELETE, OPTIONS`
   - Headers: `Content-Type, Authorization`

## Verificação

Após aplicar uma das soluções, teste:

1. **Faça login na aplicação React**
2. **Tente criar um novo post**
3. **Verifique se o erro foi resolvido**

## Logs de Debug

Para verificar se as permissões estão funcionando, adicione este código ao `functions.php`:

```php
// Log de debug para permissões
add_action('rest_api_init', function() {
    error_log('=== DEBUG PERMISSIONS ===');
    $user = wp_get_current_user();
    error_log('User ID: ' . $user->ID);
    error_log('User Roles: ' . implode(', ', $user->roles));
    error_log('Can edit posts: ' . (user_can($user->ID, 'edit_posts') ? 'YES' : 'NO'));
    error_log('Can publish posts: ' . (user_can($user->ID, 'publish_posts') ? 'YES' : 'NO'));
    error_log('=======================');
});
```

## Permissões por Role no WordPress

| Role | edit_posts | publish_posts | edit_others_posts | delete_posts |
|------|------------|---------------|-------------------|--------------|
| Subscriber | ❌ | ❌ | ❌ | ❌ |
| Contributor | ✅ | ❌ | ❌ | ❌ |
| **Author** | ✅ | ✅ | ❌ | ✅ |
| Editor | ✅ | ✅ | ✅ | ✅ |
| Administrator | ✅ | ✅ | ✅ | ✅ |

## Recomendação

**Use a Solução 1** (elevar para Editor) se for um ambiente de desenvolvimento ou se confiar no usuário.

**Use a Solução 3** (plugin customizado) se precisar manter o usuário como Autor mas dar permissões específicas.

## Contato

Se o problema persistir, verifique:
1. Se o JWT Simple Login está configurado corretamente
2. Se o token está sendo enviado corretamente
3. Se há conflitos com outros plugins
4. Os logs de erro do WordPress 