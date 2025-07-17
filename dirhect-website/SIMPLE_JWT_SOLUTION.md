# Solução para Simple JWT Login

## Problema
```
Erro ao salvar: Error: Sem permissão para criar posts com este usuário.
```

**OU**

```
{
    "code": "rest_cookie_invalid_nonce",
    "message": "A verificação cookie falhou",
    "data": {
        "status": 403
    }
}
```

## Solução Rápida (RECOMENDADA)

### Passo 1: Adicionar Código PHP
1. **Acesse o WordPress**
2. Vá para **Aparência > Editor de Tema**
3. Clique em **functions.php** no painel direito
4. **Cole o código do arquivo `simple-jwt-fix.php`** no final do arquivo
5. Clique em **Atualizar Arquivo**

### Passo 2: Teste
1. Volte para seu painel React
2. Faça login
3. Tente criar um post
4. **Deve funcionar agora!**

## O que o código faz:

✅ **Valida tokens JWT do Simple JWT Login**
✅ **Permite que usuários autor criem posts**
✅ **Configura CORS automaticamente**
✅ **Desabilita verificação de nonce para JWT**
✅ **Gera logs para debug**

## Configuração do Simple JWT Login

Certifique-se de que o plugin está configurado corretamente:

1. **Acesse WordPress > Configurações > Simple JWT Login**
2. **Verifique se a autenticação está ativa**
3. **Confirme que o endpoint `/simple-jwt-login/v1/auth` funciona**

## Teste de Conexão

Para testar se está funcionando:

1. **Acesse seu painel React**
2. **Faça login com suas credenciais**
3. **Tente criar um post**
4. **Verifique os logs do WordPress** em `/wp-content/debug.log`

## Logs Esperados

Se funcionar, você verá nos logs:
```
Simple JWT Login Fix ativado com sucesso!
Simple JWT Login - Usuário autenticado: seu_usuario (ID: 1)
Simple JWT Login - Roles: administrator
```

## Se ainda não funcionar:

### Opção 1: Mudar Role do Usuário
1. WordPress → Usuários → Editar seu usuário
2. Mude **Função** de "Autor" para "Editor"
3. Clique **Atualizar Usuário**

### Opção 2: Verificar Configuração JWT
1. Teste o endpoint: `https://seu-site.com/wp-json/simple-jwt-login/v1/auth`
2. Verifique se retorna um token válido

### Opção 3: Debug Avançado
1. Ative `WP_DEBUG_LOG` no `wp-config.php`
2. Tente criar um post
3. Verifique os logs em `/wp-content/debug.log`

## Solução para Erro de Nonce

Se você receber o erro `rest_cookie_invalid_nonce`, o código PHP já inclui a solução:

- ✅ **Desabilita verificação de nonce para requisições com JWT**
- ✅ **Permite autenticação apenas com token Bearer**
- ✅ **Não requer cookies ou nonce**

## Suporte

Se ainda tiver problemas, me envie:
- Os logs do WordPress
- A resposta do endpoint JWT
- O erro exato que aparece

**Esta solução é específica para Simple JWT Login e resolve tanto permissões quanto nonce!** 