# 🚨 Correção do Problema SMTP - WordPress

## Problema Identificado

```
SMTP Error: The following recipients failed: ariany.ferreira@ativary.com: 
<contato@thunderbold.com.br>: Sender address rejected: not owned by user contato@dirhect.com.br
```

O WordPress está tentando enviar emails com o remetente incorreto (`contato@thunderbold.com.br` em vez de `contato@dirhect.com.br`).

## Solução

### 1. Configurar SMTP no WordPress

Instale e configure o plugin **WP Mail SMTP**:

1. **Instalar Plugin:**
   - Painel WordPress → Plugins → Adicionar Novo
   - Pesquisar: "WP Mail SMTP"
   - Instalar e ativar

2. **Configurar SMTP:**
   - WordPress → WP Mail SMTP → Settings
   - **From Email:** `contato@dirhect.com.br`
   - **From Name:** `Dirhect`
   - **Mailer:** SMTP
   - **SMTP Host:** `smtp.hostinger.com`
   - **SMTP Port:** `465`
   - **Encryption:** `SSL`
   - **Authentication:** `ON`
   - **SMTP Username:** `contato@dirhect.com.br`
   - **SMTP Password:** `Dirhect_2025*`

3. **Testar Configuração:**
   - Clique em "Send Test Email"
   - Envie para um email de teste

### 2. Atualizar o Snippet WordPress

Substitua o código atual por esta versão corrigida:

```php
<?php
/**
 * Snippet WordPress para Envio de Emails com Confirmação
 * Versão corrigida para SMTP
 */

// Adicionar endpoints personalizados para envio de emails
add_action('rest_api_init', function () {
    // Endpoint para demonstração
    register_rest_route('dirhect/v1', '/send-demo', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_demo_email',
        'permission_callback' => '__return_true'
    ));

    // Endpoint para suporte
    register_rest_route('dirhect/v1', '/send-support', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_support_email',
        'permission_callback' => '__return_true'
    ));

    // Endpoint para indicação
    register_rest_route('dirhect/v1', '/send-indication', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_indication_email',
        'permission_callback' => '__return_true'
    ));
});

/**
 * Enviar email de demonstração
 */
function dirhect_send_demo_email($request) {
    $params = $request->get_params();
    
    // Validar campos obrigatórios
    $required_fields = ['nomeEmpresa', 'cnpj', 'nomeContato', 'email', 'telefone', 'cargo', 'numeroFuncionarios', 'segmento'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    // Preparar dados do email
    $empresa = sanitize_text_field($params['nomeEmpresa']);
    $cnpj = sanitize_text_field($params['cnpj']);
    $contato = sanitize_text_field($params['nomeContato']);
    $email = sanitize_email($params['email']);
    $telefone = sanitize_text_field($params['telefone']);
    $cargo = sanitize_text_field($params['cargo']);
    $funcionarios = sanitize_text_field($params['numeroFuncionarios']);
    $segmento = sanitize_text_field($params['segmento']);
    $necessidades = isset($params['necessidades']) ? $params['necessidades'] : [];
    $mensagem = isset($params['mensagem']) ? sanitize_textarea_field($params['mensagem']) : '';

    // Email para a equipe comercial
    $to_comercial = 'contato@dirhect.com.br';
    $subject_comercial = "🎯 Nova Solicitação de Demonstração - $empresa";
    
    $message_comercial = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2563eb; }
            .value { background: #f8f9fa; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>🎯 Nova Solicitação de Demonstração</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Empresa:</div>
                <div class='value'>$empresa</div>
            </div>
            <div class='field'>
                <div class='label'>CNPJ:</div>
                <div class='value'>$cnpj</div>
            </div>
            <div class='field'>
                <div class='label'>Segmento:</div>
                <div class='value'>$segmento</div>
            </div>
            <div class='field'>
                <div class='label'>Funcionários:</div>
                <div class='value'>$funcionarios</div>
            </div>
            <div class='field'>
                <div class='label'>Contato:</div>
                <div class='value'>$contato</div>
            </div>
            <div class='field'>
                <div class='label'>Cargo:</div>
                <div class='value'>$cargo</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>Telefone:</div>
                <div class='value'>$telefone</div>
            </div>";

    if (!empty($necessidades)) {
        $necessidades_text = is_array($necessidades) ? implode(', ', $necessidades) : $necessidades;
        $message_comercial .= "
            <div class='field'>
                <div class='label'>Necessidades:</div>
                <div class='value'>$necessidades_text</div>
            </div>";
    }

    if (!empty($mensagem)) {
        $message_comercial .= "
            <div class='field'>
                <div class='label'>Mensagem:</div>
                <div class='value'>$mensagem</div>
            </div>";
    }

    $message_comercial .= "
            <div class='field'>
                <div class='label'>Data/Hora:</div>
                <div class='value'>" . date('d/m/Y H:i:s') . "</div>
            </div>
        </div>
    </body>
    </html>";

    // Enviar email para equipe comercial
    $sent_comercial = wp_mail($to_comercial, $subject_comercial, $message_comercial);

    // Email de confirmação para o cliente
    $subject_confirmacao = "✅ Confirmação - Demonstração Dirhect";
    
    $message_confirmacao = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .contact { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>✅ Confirmação Recebida</h1>
            </div>
            <div class='content'>
                <p>Olá <strong>$contato</strong>,</p>
                
                <p>Recebemos sua solicitação de <strong>Demonstração</strong> com sucesso!</p>
                
                <div class='highlight'>
                    <h3>📋 Detalhes da Solicitação</h3>
                    <p><strong>Empresa:</strong> $empresa</p>
                    <p><strong>Prazo de resposta:</strong> 24 horas</p>
                </div>
                
                <div class='highlight'>
                    <h3>⏰ Próximos Passos</h3>
                    <p>Nossa equipe entrará em contato em até <strong>24 horas</strong> para:</p>
                    <ul>
                        <li>Agendar sua demonstração personalizada</li>
                        <li>Discutir suas necessidades específicas</li>
                        <li>Apresentar a solução ideal para sua empresa</li>
                    </ul>
                </div>
                
                <div class='contact'>
                    <h3>📞 Contato Direto</h3>
                    <p>Se preferir, você pode entrar em contato diretamente:</p>
                    <p><strong>Email:</strong> contato@dirhect.com.br</p>
                    <p><strong>Telefone:</strong> (11) 96898-9211</p>
                </div>
                
                <div class='footer'>
                    <p>Esta confirmação foi enviada em " . date('d/m/Y') . " às " . date('H:i:s') . "</p>
                    <p>© 2024 Dirhect. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </body>
    </html>";

    // Enviar confirmação para o cliente
    $sent_confirmacao = wp_mail($email, $subject_confirmacao, $message_confirmacao);

    // Retornar resultado
    if ($sent_comercial && $sent_confirmacao) {
        return array(
            'success' => true,
            'message' => 'Emails enviados com sucesso!',
            'data' => array(
                'empresa' => $empresa,
                'contato' => $contato,
                'email' => $email
            )
        );
    } else {
        return new WP_Error('email_error', 'Erro ao enviar emails', array('status' => 500));
    }
}

// ... (continuar com as outras funções)
?>
```

### 3. Verificar Configuração

1. **Teste o SMTP:**
   - WP Mail SMTP → Tools → Email Test
   - Envie para um email de teste

2. **Verificar Logs:**
   - WP Mail SMTP → Tools → Email Log
   - Verifique se os emails estão sendo enviados

3. **Testar Endpoint:**
   ```javascript
   fetch('https://dirhect-institucional.thunderbold.com.br/wp-json/dirhect/v1/send-demo', {
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
       segmento: 'Tecnologia'
     })
   })
   .then(r => r.json())
   .then(console.log)
   ```

## Resumo da Correção

1. ✅ **Configurar WP Mail SMTP** com credenciais corretas
2. ✅ **Remover headers personalizados** do código
3. ✅ **Usar configuração global** do WordPress
4. ✅ **Testar envio** de emails

Após essas correções, o sistema deve funcionar corretamente! 🚀 