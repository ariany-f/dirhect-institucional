# Debug do Problema do Token

## Problema Identificado
O header `Authorization: Bearer null` indica que o token está sendo enviado como `null` em vez de um token JWT válido.

**Logs mostram:**
- `adminToken: null` (token não existe)
- `adminUser: {"email":"dirhect","name":"dirhect"}` (usuário existe)
- `adminTokenExpiry: 1753370919032` (expiração existe)

## Como Debugar

### Passo 1: Testar Token Diretamente
No console do navegador, execute:
```javascript
// Testar token diretamente (sem lógica de autenticação)
wordpressService.testTokenDirectly()
```

### Passo 2: Forçar Login e Verificar Token
```javascript
// Forçar login e verificar token
wordpressService.forceLoginAndCheck('dirhect', 'sua_senha')
  .then(result => {
    console.log('Resultado:', result)
  })
  .catch(error => {
    console.error('Erro:', error)
  })
```

### Passo 3: Verificar Console do Navegador
1. **Abra o DevTools** (F12)
2. Vá para a aba **Console**
3. **Execute os comandos acima**
4. **Verifique os logs** que aparecem

### Passo 4: Verificar localStorage
1. No DevTools, vá para **Application** (ou **Aplicação**)
2. Clique em **Local Storage** → **http://localhost:5174**
3. Verifique se existem as chaves:
   - `adminToken` ← **ESTE É O PROBLEMA**
   - `adminUser`
   - `adminTokenExpiry`

## Análise do Token JWT

O token que você recebeu:
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTI3NjYxMTYsImVtYWlsIjoiY29udGF0b0BkaXJoZWN0LmNvbS5iciJ9.yLp89jLnL3dP0dZ0d0vCnp-xwH-bH12j2xNOwjtgHs8
```

**Decodificado:**
- **Header:** `{"typ":"JWT","alg":"HS256"}`
- **Payload:** `{"iat":1752766116,"email":"contato@dirhect.com.br"}`
- **Assinatura:** `yLp89jLnL3dP0dZ0d0vCnp-xwH-bH12j2xNOwjtgHs8`

**Observações importantes:**
1. O token **NÃO tem campo `exp`** (expiration) no payload
2. Só tem `iat` (issued at) e `email`
3. Isso significa que o token **não expira automaticamente**

## Possíveis Causas

### 1. Token não está sendo salvo corretamente
- Verificar se há erro no localStorage
- Verificar se o token é válido

### 2. Problema na lógica de expiração
- O token não tem expiração, mas o código está verificando
- Pode estar usando a expiração local em vez da do JWT

### 3. Problema no Simple JWT Login
- Token não tem campo `exp` configurado
- Configuração incorreta do plugin

## Solução Rápida

Se o problema persistir, tente:

1. **Testar token diretamente**:
```javascript
wordpressService.testTokenDirectly()
```

2. **Limpar localStorage e forçar login**:
```javascript
localStorage.clear()
wordpressService.forceLoginAndCheck('dirhect', 'sua_senha')
```

3. **Verificar se o token foi salvo**:
```javascript
console.log('Token:', localStorage.getItem('adminToken'))
```

## Logs Esperados

Se funcionar, você verá:
```
=== TESTE DIRETO DO TOKEN ===
Token direto: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
User direto: {"email":"contato@dirhect.com.br","name":"dirhect"}
Expiry direto: 1753370919032
Token existe, testando se é válido...
Formato JWT válido
Payload do JWT: {"iat":1752766116,"email":"contato@dirhect.com.br"}
JWT expirado: false
========================
```

## Comandos para Testar Agora

Execute estes comandos no console do navegador:

```javascript
// 1. Testar token diretamente
wordpressService.testTokenDirectly()

// 2. Se o token não existir, fazer login
wordpressService.forceLoginAndCheck('dirhect', 'sua_senha')
```

## Próximos Passos

1. **Execute os comandos de teste**
2. **Me envie os logs** do console
3. **Verifique se o token está sendo salvo** no localStorage
4. **Identifique se o problema é na expiração** ou na lógica de autenticação 