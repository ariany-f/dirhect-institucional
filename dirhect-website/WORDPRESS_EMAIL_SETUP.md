# 🚀 Configuração de Emails - WordPress

## Sobre a Solução

Agora o sistema usa **WordPress nativo** para enviar emails, com confirmação automática para o usuário. Cada endpoint envia:
1. **Email principal** para a equipe Dirhect
2. **Email de confirmação** para quem preencheu o formulário

## 📋 Passo a Passo

### 1. Adicionar o Snippet no WordPress

1. Acesse o **Painel Administrativo** do WordPress
2. Vá em **Aparência** > **Editor de Tema**
3. Clique em **functions.php**
4. Cole o código do arquivo `wordpress-email-snippet.php` no final do arquivo
5. Clique em **Atualizar Arquivo**

### 2. Configurar Variáveis de Ambiente

No seu arquivo `.env`:

```env
# URL do WordPress
VITE_WORDPRESS_URL=https://wp-api.dirhect
```

### 3. Testar os Endpoints

Os endpoints estarão disponíveis em:

- **Demo:** `https://wp-api.dirhect/wp-json/dirhect/v1/send-demo`
- **Suporte:** `https://wp-api.dirhect/wp-json/dirhect/v1/send-support`
- **Indicação:** `https://wp-api.dirhect/wp-json/dirhect/v1/send-indication`

## 🎯 Funcionalidades

### ✅ Demonstração
- **Para equipe:** `contato@dirhect.com.br`
- **Para cliente:** Email de quem solicitou
- **Assunto:** `🎯 Nova Solicitação de Demonstração - [Empresa]`

### ✅ Suporte
- **Para equipe:** `suporte@dirhect.com.br`
- **Para cliente:** Email de quem solicitou
- **Assunto:** `🆘 Suporte - [Tipo] - [Nome]`

### ✅ Indicação
- **Para equipe:** `contato@dirhect.com.br`
- **Para indicador:** Email de quem fez a indicação
- **Assunto:** `🎁 Nova Indicação - [Empresa] - [Indicador]`

## 📧 Templates de Email

### Email Principal (para equipe)
- Design profissional com cores da Dirhect
- Todos os dados do formulário organizados
- Informações de contato e data/hora

### Email de Confirmação (para cliente)
- Template HTML responsivo
- Informações sobre próximos passos
- Contatos diretos da Dirhect
- Design profissional com logo

## 🔧 Configuração de SMTP (Opcional)

Para melhorar a entrega de emails, configure SMTP no WordPress:

### Plugin WP Mail SMTP
1. Instale o plugin **WP Mail SMTP**
2. Configure com suas credenciais SMTP:
   - **SMTP Host:** `smtp.hostinger.com`
   - **Porta:** `465`
   - **Criptografia:** `SSL`
   - **Email:** `contato@dirhect.com.br`
   - **Senha:** `Dirhect_2025*`

## 🧪 Teste

### 1. Teste de Demonstração
```javascript
// No console do navegador
fetch('https://wp-api.dirhect/wp-json/dirhect/v1/send-demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nomeEmpresa: 'Empresa Teste',
    cnpj: '12.345.678/0001-90',
    nomeContato: 'João Silva',
    email: 'joao@teste.com',
    telefone: '(11) 99999-9999',
    cargo: 'Gerente RH',
    numeroFuncionarios: '51-200 funcionários',
    segmento: 'Tecnologia',
    necessidades: ['Admissão Digital'],
    mensagem: 'Teste de demonstração'
  })
})
.then(r => r.json())
.then(console.log)
```

### 2. Teste de Suporte
```javascript
fetch('https://wp-api.dirhect/wp-json/dirhect/v1/send-support', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Maria Silva',
    email: 'maria@teste.com',
    subject: 'duvida',
    message: 'Teste de suporte'
  })
})
.then(r => r.json())
.then(console.log)
```

## ✅ Vantagens

- 🎯 **Controle Total:** WordPress nativo
- 📧 **Confirmação Automática:** Para todos os formulários
- 🎨 **Templates Profissionais:** HTML responsivo
- 🔒 **Seguro:** Validação e sanitização
- ⚡ **Rápido:** Sem dependências externas
- 💰 **Gratuito:** Sem custos adicionais

## 🚨 Troubleshooting

### Problema: Emails não chegam
**Solução:** Configure SMTP no WordPress

### Problema: Endpoint não encontrado
**Solução:** Verifique se o snippet foi adicionado corretamente

### Problema: Erro 500
**Solução:** Verifique logs do WordPress e validação de campos

## 📞 Suporte

Se precisar de ajuda:
- **Email:** suporte@dirhect.com.br
- **Telefone:** (11) 96898-9211

---

**Pronto!** Agora o sistema de emails está totalmente integrado ao WordPress! 🚀 