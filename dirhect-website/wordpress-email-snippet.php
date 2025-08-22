<?php
/**
 * Snippet WordPress para Envio de Emails com Confirmação
 * Adicione este código no functions.php do seu tema ou em um plugin
 */

// Configurar remetente padrão para todos os emails
add_filter('wp_mail_from', function($email) {
    return 'contato@dirhect.com.br';
});

add_filter('wp_mail_from_name', function($name) {
    return 'Dirhect';
});

// Configurar headers padrão
add_filter('wp_mail_content_type', function($content_type) {
    return 'text/html';
});

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

    // Headers para email HTML
    $headers = array(
        'Reply-To: ' . $email
    );

    // Enviar email para equipe comercial
    $sent_comercial = wp_mail($to_comercial, $subject_comercial, $message_comercial, $headers);

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

    // Headers para confirmação
    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>'
    );

    // Enviar confirmação para o cliente
    $sent_confirmacao = wp_mail($email, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

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

/**
 * Enviar email de suporte
 */
function dirhect_send_support_email($request) {
    $params = $request->get_params();
    
    // Validar campos obrigatórios
    $required_fields = ['name', 'email', 'subject', 'message'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    // Preparar dados
    $nome = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $assunto = sanitize_text_field($params['subject']);
    $mensagem = sanitize_textarea_field($params['message']);

    // Traduzir assunto
    $assuntos = array(
        'duvida' => 'Dúvida sobre funcionalidade',
        'problema' => 'Problema técnico',
        'sugestao' => 'Sugestão de melhoria',
        'comercial' => 'Questão comercial',
        'outro' => 'Outro'
    );
    $assunto_traduzido = isset($assuntos[$assunto]) ? $assuntos[$assunto] : $assunto;

    // Email para suporte
    $to_suporte = 'suporte@dirhect.com.br';
    $subject_suporte = "🆘 Suporte - $assunto_traduzido - $nome";
    
    $message_suporte = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #dc3545; }
            .value { background: #f8f9fa; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>🆘 Nova Solicitação de Suporte</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nome:</div>
                <div class='value'>$nome</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>Assunto:</div>
                <div class='value'>$assunto_traduzido</div>
            </div>
            <div class='field'>
                <div class='label'>Mensagem:</div>
                <div class='value'>$mensagem</div>
            </div>
            <div class='field'>
                <div class='label'>Data/Hora:</div>
                <div class='value'>" . date('d/m/Y H:i:s') . "</div>
            </div>
        </div>
    </body>
    </html>";

    // Headers
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <noreply@dirhect.com.br>',
        'Reply-To: ' . $email
    );

    // Enviar email para suporte
    $sent_suporte = wp_mail($to_suporte, $subject_suporte, $message_suporte, $headers);

    // Email de confirmação
    $subject_confirmacao = "✅ Confirmação - Suporte Dirhect";
    
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
                <p>Olá <strong>$nome</strong>,</p>
                
                <p>Recebemos sua solicitação de <strong>Suporte</strong> com sucesso!</p>
                
                <div class='highlight'>
                    <h3>⏰ Próximos Passos</h3>
                    <p>Nossa equipe de suporte entrará em contato em até <strong>4 horas</strong>.</p>
                </div>
                
                <div class='contact'>
                    <h3>📞 Contato Direto</h3>
                    <p>Se preferir, você pode entrar em contato diretamente:</p>
                    <p><strong>Email:</strong> suporte@dirhect.com.br</p>
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

    // Headers para confirmação
    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <suporte@dirhect.com.br>'
    );

    // Enviar confirmação
    $sent_confirmacao = wp_mail($email, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

    // Retornar resultado
    if ($sent_suporte && $sent_confirmacao) {
        return array(
            'success' => true,
            'message' => 'Emails enviados com sucesso!',
            'data' => array(
                'nome' => $nome,
                'email' => $email,
                'assunto' => $assunto_traduzido
            )
        );
    } else {
        return new WP_Error('email_error', 'Erro ao enviar emails', array('status' => 500));
    }
}

/**
 * Enviar email de indicação
 */
function dirhect_send_indication_email($request) {
    $params = $request->get_params();
    
    // Validar campos obrigatórios
    $required_fields = ['nomeIndicador', 'emailIndicador', 'nomeEmpresa', 'cnpj', 'nomeContato', 'emailContato'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    // Preparar dados
    $indicador = sanitize_text_field($params['nomeIndicador']);
    $email_indicador = sanitize_email($params['emailIndicador']);
    $empresa = sanitize_text_field($params['nomeEmpresa']);
    $cnpj = sanitize_text_field($params['cnpj']);
    $contato = sanitize_text_field($params['nomeContato']);
    $email_contato = sanitize_email($params['emailContato']);
    $mensagem = isset($params['mensagem']) ? sanitize_textarea_field($params['mensagem']) : '';

    // Email para comercial
    $to_comercial = 'contato@dirhect.com.br';
    $subject_comercial = "🎁 Nova Indicação - $empresa - $indicador";
    
    $message_comercial = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #28a745; }
            .value { background: #f8f9fa; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>🎁 Nova Indicação</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Indicador:</div>
                <div class='value'>$indicador ($email_indicador)</div>
            </div>
            <div class='field'>
                <div class='label'>Empresa Indicada:</div>
                <div class='value'>$empresa</div>
            </div>
            <div class='field'>
                <div class='label'>CNPJ:</div>
                <div class='value'>$cnpj</div>
            </div>
            <div class='field'>
                <div class='label'>Contato:</div>
                <div class='value'>$contato ($email_contato)</div>
            </div>";

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

    // Headers
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <noreply@dirhect.com.br>',
        'Reply-To: ' . $email_indicador
    );

    // Enviar email para comercial
    $sent_comercial = wp_mail($to_comercial, $subject_comercial, $message_comercial, $headers);

    // Email de confirmação para o indicador
    $subject_confirmacao = "✅ Confirmação - Indicação Dirhect";
    
    $message_confirmacao = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .reward { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
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
                <p>Olá <strong>$indicador</strong>,</p>
                
                <p>Recebemos sua <strong>Indicação</strong> com sucesso!</p>
                
                <div class='highlight'>
                    <h3>📋 Detalhes da Indicação</h3>
                    <p><strong>Empresa:</strong> $empresa</p>
                    <p><strong>Contato:</strong> $contato</p>
                </div>
                
                <div class='reward'>
                    <h3>🎁 Recompensa</h3>
                    <p>Você será recompensado com <strong>R$ 1.000</strong> se a indicação resultar em contrato!</p>
                </div>
                
                <div class='highlight'>
                    <h3>⏰ Próximos Passos</h3>
                    <p>Nossa equipe entrará em contato em até <strong>24 horas</strong>.</p>
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

    // Headers para confirmação
    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>'
    );

    // Enviar confirmação
    $sent_confirmacao = wp_mail($email_indicador, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

    // Retornar resultado
    if ($sent_comercial && $sent_confirmacao) {
        return array(
            'success' => true,
            'message' => 'Emails enviados com sucesso!',
            'data' => array(
                'indicador' => $indicador,
                'empresa' => $empresa,
                'contato' => $contato
            )
        );
    } else {
        return new WP_Error('email_error', 'Erro ao enviar emails', array('status' => 500));
    }
}
?> 