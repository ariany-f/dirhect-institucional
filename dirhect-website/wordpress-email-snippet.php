<?php
/**
 * Snippet WordPress para Envio de Emails com Confirmação + Detalhes de Erro
 * Adicione este código no functions.php do seu tema ou em um plugin
 */

// Capturar erros do wp_mail
add_action('wp_mail_failed', function ($wp_error) {
    error_log('Erro no envio de e-mail: ' . $wp_error->get_error_message());
});

/**
 * Helper para detalhar erros do wp_mail
 */
function dirhect_get_mail_error() {
    $mail_errors = $GLOBALS['phpmailer'] ?? null;
    if ($mail_errors && isset($mail_errors->ErrorInfo)) {
        return $mail_errors->ErrorInfo;
    }
    return 'Erro desconhecido';
}

// Adicionar endpoints personalizados
add_action('rest_api_init', function () {
    register_rest_route('dirhect/v1', '/send-demo', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_demo_email',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('dirhect/v1', '/send-support', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_support_email',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('dirhect/v1', '/send-indication', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_indication_email',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('dirhect/v1', '/send-partnership', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_partnership_email',
        'permission_callback' => '__return_true'
    ));
});

/**
 * Enviar email de demonstração
 */
function dirhect_send_demo_email($request) {
    $params = $request->get_params();

    $required_fields = ['nomeEmpresa', 'cnpj', 'nomeContato', 'email', 'telefone', 'cargo', 'numeroFuncionarios', 'segmento'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

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

    $to_comercial = 'contato@dirhect.com.br';
    $subject_comercial = "🎯 Nova Solicitação de Demonstração - $empresa";

    $message_comercial = "
    <html><body>
    <h1>🎯 Nova Solicitação de Demonstração</h1>
    <p><strong>Empresa:</strong> $empresa</p>
    <p><strong>CNPJ:</strong> $cnpj</p>
    <p><strong>Segmento:</strong> $segmento</p>
    <p><strong>Funcionários:</strong> $funcionarios</p>
    <p><strong>Contato:</strong> $contato</p>
    <p><strong>Cargo:</strong> $cargo</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Telefone:</strong> $telefone</p>";

    if (!empty($necessidades)) {
        $necessidades_text = is_array($necessidades) ? implode(', ', $necessidades) : $necessidades;
        $message_comercial .= "<p><strong>Necessidades:</strong> $necessidades_text</p>";
    }

    if (!empty($mensagem)) {
        $message_comercial .= "<p><strong>Mensagem:</strong> $mensagem</p>";
    }

    $message_comercial .= "<p><strong>Data/Hora:</strong> " . date('d/m/Y H:i:s') . "</p></body></html>";

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>',
        'Reply-To: ' . $email
    );

    $sent_comercial = wp_mail($to_comercial, $subject_comercial, $message_comercial, $headers);

    $subject_confirmacao = "✅ Confirmação - Demonstração Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$contato</strong>, recebemos sua solicitação de Demonstração!</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>'
    );

    $sent_confirmacao = wp_mail($email, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

    if ($sent_comercial && $sent_confirmacao) {
        return array('success' => true, 'message' => 'Emails enviados com sucesso!');
    }

    return new WP_Error('email_error', 'Erro ao enviar emails: ' . dirhect_get_mail_error(), array('status' => 500));
}

/**
 * Enviar email de suporte
 */
function dirhect_send_support_email($request) {
    $params = $request->get_params();

    $required_fields = ['name', 'email', 'subject', 'message'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    $nome = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $assunto = sanitize_text_field($params['subject']);
    $mensagem = sanitize_textarea_field($params['message']);

    $assuntos = array(
        'duvida' => 'Dúvida sobre funcionalidade',
        'problema' => 'Problema técnico',
        'sugestao' => 'Sugestão de melhoria',
        'comercial' => 'Questão comercial',
        'outro' => 'Outro'
    );
    $assunto_traduzido = isset($assuntos[$assunto]) ? $assuntos[$assunto] : $assunto;

    $to_suporte = 'contato@dirhect.com.br';
    $subject_suporte = "🆘 Suporte - $assunto_traduzido - $nome";

    $message_suporte = "
    <html><body>
    <h1>🆘 Nova Solicitação de Suporte</h1>
    <p><strong>Nome:</strong> $nome</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Assunto:</strong> $assunto_traduzido</p>
    <p><strong>Mensagem:</strong> $mensagem</p>
    <p><strong>Data/Hora:</strong> " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>',
        'Reply-To: ' . $email
    );

    $sent_suporte = wp_mail($to_suporte, $subject_suporte, $message_suporte, $headers);

    $subject_confirmacao = "✅ Confirmação - Suporte Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$nome</strong>, recebemos sua solicitação de Suporte!</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>'
    );

    $sent_confirmacao = wp_mail($email, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

    if ($sent_suporte && $sent_confirmacao) {
        return array('success' => true, 'message' => 'Emails enviados com sucesso!');
    }

    return new WP_Error('email_error', 'Erro ao enviar emails: ' . dirhect_get_mail_error(), array('status' => 500));
}

/**
 * Enviar email de indicação
 */
function dirhect_send_indication_email($request) {
    $params = $request->get_params();

    $required_fields = ['nomeIndicador', 'emailIndicador', 'nomeEmpresa', 'cnpj', 'nomeContato', 'emailContato'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    $indicador = sanitize_text_field($params['nomeIndicador']);
    $email_indicador = sanitize_email($params['emailIndicador']);
    $empresa = sanitize_text_field($params['nomeEmpresa']);
    $cnpj = sanitize_text_field($params['cnpj']);
    $contato = sanitize_text_field($params['nomeContato']);
    $email_contato = sanitize_email($params['emailContato']);
    $mensagem = isset($params['mensagem']) ? sanitize_textarea_field($params['mensagem']) : '';

    $to_comercial = 'contato@dirhect.com.br';
    $subject_comercial = "🎁 Nova Indicação - $empresa - $indicador";

    $message_comercial = "
    <html><body>
    <h1>🎁 Nova Indicação</h1>
    <p><strong>Indicador:</strong> $indicador ($email_indicador)</p>
    <p><strong>Empresa:</strong> $empresa</p>
    <p><strong>CNPJ:</strong> $cnpj</p>
    <p><strong>Contato:</strong> $contato ($email_contato)</p>";

    if (!empty($mensagem)) {
        $message_comercial .= "<p><strong>Mensagem:</strong> $mensagem</p>";
    }

    $message_comercial .= "<p><strong>Data/Hora:</strong> " . date('d/m/Y H:i:s') . "</p></body></html>";

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>',
        'Reply-To: ' . $email_indicador
    );

    $sent_comercial = wp_mail($to_comercial, $subject_comercial, $message_comercial, $headers);

    $subject_confirmacao = "✅ Confirmação - Indicação Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$indicador</strong>, recebemos sua indicação!</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>'
    );

    $sent_confirmacao = wp_mail($email_indicador, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

    if ($sent_comercial && $sent_confirmacao) {
        return array('success' => true, 'message' => 'Emails enviados com sucesso!');
    }

    return new WP_Error('email_error', 'Erro ao enviar emails: ' . dirhect_get_mail_error(), array('status' => 500));
}

/**
 * Enviar email de parceria (página Parceiros)
 */
function dirhect_send_partnership_email($request) {
    $params = $request->get_params();

    $required_fields = ['companyName', 'contactName', 'email', 'phone', 'businessArea'];
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    $empresa = sanitize_text_field($params['companyName']);
    $contato = sanitize_text_field($params['contactName']);
    $email = sanitize_email($params['email']);
    $telefone = sanitize_text_field($params['phone']);
    $area = sanitize_text_field($params['businessArea']);
    $mensagem = isset($params['message']) ? sanitize_textarea_field($params['message']) : '';

    $areas = array(
        'erp' => 'ERP / Sistemas Empresariais',
        'rh' => 'Recursos Humanos',
        'beneficios' => 'Benefícios Corporativos',
        'recrutamento' => 'Recrutamento e Seleção',
        'folha' => 'Folha de Pagamento',
        'ponto' => 'Controle de Ponto',
        'saude' => 'Saúde Ocupacional',
        'outros' => 'Outros',
    );
    $area_label = isset($areas[$area]) ? $areas[$area] : $area;

    $to_comercial = 'comercial@dirhect.com.br';
    $subject_comercial = "🤝 Nova Solicitação de Parceria - $empresa";

    $message_comercial = "
    <html><body>
    <h1>🤝 Nova Solicitação de Parceria</h1>
    <p><strong>Empresa:</strong> $empresa</p>
    <p><strong>Contato:</strong> $contato</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Telefone:</strong> $telefone</p>
    <p><strong>Área de atuação:</strong> $area_label</p>";

    if (!empty($mensagem)) {
        $message_comercial .= "<p><strong>Mensagem:</strong> $mensagem</p>";
    }

    $message_comercial .= "<p><strong>Data/Hora:</strong> " . date('d/m/Y H:i:s') . "</p></body></html>";

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>',
        'Reply-To: ' . $email
    );

    $sent_comercial = wp_mail($to_comercial, $subject_comercial, $message_comercial, $headers);

    $subject_confirmacao = "✅ Confirmação - Parceria Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$contato</strong>, recebemos sua solicitação de parceria!</p>
    <p><strong>Empresa:</strong> $empresa</p>
    <p>Nossa equipe comercial entrará em contato em até 24 horas.</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $headers_confirmacao = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Dirhect <contato@dirhect.com.br>'
    );

    $sent_confirmacao = wp_mail($email, $subject_confirmacao, $message_confirmacao, $headers_confirmacao);

    if ($sent_comercial && $sent_confirmacao) {
        return array('success' => true, 'message' => 'Emails enviados com sucesso!');
    }

    return new WP_Error('email_error', 'Erro ao enviar emails: ' . dirhect_get_mail_error(), array('status' => 500));
}
