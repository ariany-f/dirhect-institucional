# Solução Simples para Erro de Permissões WordPress

## Problema
```
Erro ao salvar: Error: Sem permissão para criar posts com este usuário.
```

## Solução 1: Código PHP Simples (RECOMENDADO)

### Passo 1: Acesse o WordPress
1. Vá para **Aparência > Editor de Tema**
2. Clique em **functions.php** no painel direito
3. Cole o código do arquivo `fix-permissions.php` no final do arquivo
4. Clique em **Atualizar Arquivo**

### Passo 2: Teste
1. Volte para seu painel React
2. Tente criar um post
3. Deve funcionar agora!

## Solução 2: Mudar Role do Usuário (MAIS RÁPIDA)

1. **Acesse o WordPress**
2. Vá para **Usuários > Todos os Usuários**
3. Clique em **Editar** no seu usuário
4. Mude **Função** de "Autor" para "Editor"
5. Clique **Atualizar Usuário**

## Solução 3: Plugin Simples

1. Crie um arquivo chamado `simple-fix.php`
2. Cole este código:

```php
<?php
/*
Plugin Name: Simple Permissions Fix
Description: Corrige permissões da API REST
Version: 1.0
*/

add_filter('user_has_cap', function($allcaps, $caps, $args) {
    $user = wp_get_current_user();
    if ($user->ID > 0 && in_array('author', $user->roles)) {
        $allcaps['edit_posts'] = true;
        $allcaps['publish_posts'] = true;
        $allcaps['upload_files'] = true;
    }
    return $allcaps;
}, 10, 3);
```

3. Faça upload para `/wp-content/plugins/`
4. Ative o plugin

## Qual Solução Usar?

- **Solução 1**: Mais completa, funciona com qualquer usuário
- **Solução 2**: Mais rápida, mas precisa mudar o usuário
- **Solução 3**: Plugin simples, funciona bem

## Teste

Depois de aplicar qualquer solução:

1. Acesse seu painel React
2. Faça login
3. Tente criar um post
4. Deve funcionar sem erro!

## Logs

Se ainda não funcionar, verifique os logs do WordPress em:
- `/wp-content/debug.log` (se WP_DEBUG_LOG estiver ativo)
- Logs do servidor web

## Suporte

Se ainda tiver problemas, me avise que criamos uma solução ainda mais específica! 