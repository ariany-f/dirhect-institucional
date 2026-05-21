<?php
/**
 * Snippet WordPress — Envio de e-mails (API REST dirhect/v1)
 * Cole no functions.php do tema ou em um plugin (sem repetir <?php se já estiver no functions.php).
 */

if (!defined('ABSPATH')) {
    exit;
}

/** CC em notificações internas (equipe Dirhect), não em confirmações ao visitante */
if (!defined('DIRHECT_TEAM_CC')) {
    define('DIRHECT_TEAM_CC', 'Sylvio.luiz@dirhect.com.br');
}

if (!defined('DIRHECT_MAIL_FROM')) {
    define('DIRHECT_MAIL_FROM', 'contato@dirhect.com.br');
}

if (!defined('DIRHECT_MAIL_FROM_NAME')) {
    define('DIRHECT_MAIL_FROM_NAME', 'Dirhect');
}

/** Garante remetente alinhado ao SMTP (evita "Sender address rejected") */
add_action('phpmailer_init', function ($phpmailer) {
    $phpmailer->From = DIRHECT_MAIL_FROM;
    $phpmailer->FromName = DIRHECT_MAIL_FROM_NAME;
    $phpmailer->Sender = DIRHECT_MAIL_FROM;
});

add_action('wp_mail_failed', function ($wp_error) {
    $GLOBALS['dirhect_last_mail_error'] = $wp_error->get_error_message();
    error_log('Dirhect wp_mail_failed: ' . $wp_error->get_error_message());
});

/**
 * Lê JSON (fetch) ou form-urlencoded — get_params() sozinho falha com application/json.
 */
function dirhect_get_request_params($request) {
    $json = $request->get_json_params();
    if (is_array($json) && !empty($json)) {
        return $json;
    }
    $body = $request->get_body();
    if (is_string($body) && $body !== '') {
        $decoded = json_decode($body, true);
        if (is_array($decoded) && !empty($decoded)) {
            return $decoded;
        }
    }
    return $request->get_params();
}

function dirhect_get_mail_error() {
    if (!empty($GLOBALS['dirhect_last_mail_error'])) {
        return $GLOBALS['dirhect_last_mail_error'];
    }
    $mail_errors = $GLOBALS['phpmailer'] ?? null;
    if ($mail_errors && !empty($mail_errors->ErrorInfo)) {
        return $mail_errors->ErrorInfo;
    }
    return 'Erro desconhecido no envio';
}

function dirhect_team_notification_headers($reply_to = null) {
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . DIRHECT_MAIL_FROM_NAME . ' <' . DIRHECT_MAIL_FROM . '>',
        'Cc: ' . DIRHECT_TEAM_CC,
    );
    if ($reply_to && is_email($reply_to)) {
        $headers[] = 'Reply-To: ' . $reply_to;
    }
    return $headers;
}

function dirhect_user_confirmation_headers() {
    return array(
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . DIRHECT_MAIL_FROM_NAME . ' <' . DIRHECT_MAIL_FROM . '>',
    );
}

/**
 * @return bool
 */
function dirhect_send_mail($to, $subject, $message, $headers) {
    $GLOBALS['dirhect_last_mail_error'] = null;

    if (empty($to) || !is_email($to)) {
        $GLOBALS['dirhect_last_mail_error'] = 'E-mail de destino inválido: ' . $to;
        return false;
    }

    if (isset($GLOBALS['phpmailer']) && is_object($GLOBALS['phpmailer'])) {
        $GLOBALS['phpmailer']->clearAllRecipients();
        $GLOBALS['phpmailer']->clearAttachments();
        $GLOBALS['phpmailer']->clearCustomHeaders();
        $GLOBALS['phpmailer']->clearReplyTos();
    }

    $sent = wp_mail($to, $subject, $message, $headers);

    if (!$sent || !empty($GLOBALS['dirhect_last_mail_error'])) {
        return false;
    }

    if (isset($GLOBALS['phpmailer']) && !empty($GLOBALS['phpmailer']->ErrorInfo)) {
        $GLOBALS['dirhect_last_mail_error'] = $GLOBALS['phpmailer']->ErrorInfo;
        return false;
    }

    return true;
}

/**
 * Resposta da API: sucesso só se a confirmação ao visitante foi enviada.
 */
function dirhect_mail_endpoint_response($sent_team, $sent_user) {
    $sent = array(
        'team' => (bool) $sent_team,
        'user' => (bool) $sent_user,
    );

    if ($sent_user) {
        return array(
            'success' => true,
            'message' => $sent_team
                ? 'Emails enviados com sucesso!'
                : 'Confirmação enviada ao seu e-mail. (Falha ao notificar a equipe interna.)',
            'sent' => $sent,
        );
    }

    return new WP_Error(
        'email_error',
        'Não foi possível enviar a confirmação ao seu e-mail: ' . dirhect_get_mail_error(),
        array('status' => 500, 'sent' => $sent)
    );
}

add_action('rest_api_init', function () {
    register_rest_route('dirhect/v1', '/send-demo', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_demo_email',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('dirhect/v1', '/send-support', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_support_email',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('dirhect/v1', '/send-indication', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_indication_email',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('dirhect/v1', '/send-partnership', array(
        'methods' => 'POST',
        'callback' => 'dirhect_send_partnership_email',
        'permission_callback' => '__return_true',
    ));
});

function dirhect_send_demo_email($request) {
    $params = dirhect_get_request_params($request);

    $required_fields = array('nomeEmpresa', 'cnpj', 'nomeContato', 'email', 'telefone', 'cargo', 'numeroFuncionarios', 'segmento');
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
    $necessidades = isset($params['necessidades']) ? $params['necessidades'] : array();
    $mensagem = isset($params['mensagem']) ? sanitize_textarea_field($params['mensagem']) : '';

    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'E-mail do contato inválido', array('status' => 400));
    }

    $to_comercial = 'comercial@dirhect.com.br';
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

    $sent_comercial = dirhect_send_mail($to_comercial, $subject_comercial, $message_comercial, dirhect_team_notification_headers($email));

    $subject_confirmacao = "✅ Confirmação - Demonstração Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$contato</strong>, recebemos sua solicitação de Demonstração!</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $sent_confirmacao = dirhect_send_mail($email, $subject_confirmacao, $message_confirmacao, dirhect_user_confirmation_headers());

    return dirhect_mail_endpoint_response($sent_comercial, $sent_confirmacao);
}

function dirhect_send_support_email($request) {
    $params = dirhect_get_request_params($request);

    $required_fields = array('name', 'email', 'subject', 'message');
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Campo obrigatório: $field", array('status' => 400));
        }
    }

    $nome = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $assunto = sanitize_text_field($params['subject']);
    $mensagem = sanitize_textarea_field($params['message']);

    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'E-mail inválido', array('status' => 400));
    }

    $assuntos = array(
        'duvida' => 'Dúvida sobre funcionalidade',
        'problema' => 'Problema técnico',
        'sugestao' => 'Sugestão de melhoria',
        'comercial' => 'Questão comercial',
        'outro' => 'Outro',
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

    $sent_suporte = dirhect_send_mail($to_suporte, $subject_suporte, $message_suporte, dirhect_team_notification_headers($email));

    $subject_confirmacao = "✅ Confirmação - Suporte Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$nome</strong>, recebemos sua solicitação de Suporte!</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $sent_confirmacao = dirhect_send_mail($email, $subject_confirmacao, $message_confirmacao, dirhect_user_confirmation_headers());

    return dirhect_mail_endpoint_response($sent_suporte, $sent_confirmacao);
}

function dirhect_send_indication_email($request) {
    $params = dirhect_get_request_params($request);

    $required_fields = array('nomeIndicador', 'emailIndicador', 'nomeEmpresa', 'cnpj', 'nomeContato', 'emailContato');
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

    if (!is_email($email_indicador)) {
        return new WP_Error('invalid_email', 'E-mail do indicador inválido', array('status' => 400));
    }

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

    $sent_comercial = dirhect_send_mail($to_comercial, $subject_comercial, $message_comercial, dirhect_team_notification_headers($email_indicador));

    $subject_confirmacao = "✅ Confirmação - Indicação Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$indicador</strong>, recebemos sua indicação!</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $sent_confirmacao = dirhect_send_mail($email_indicador, $subject_confirmacao, $message_confirmacao, dirhect_user_confirmation_headers());

    return dirhect_mail_endpoint_response($sent_comercial, $sent_confirmacao);
}

function dirhect_send_partnership_email($request) {
    $params = dirhect_get_request_params($request);

    $required_fields = array('companyName', 'contactName', 'email', 'phone', 'businessArea');
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

    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'E-mail inválido', array('status' => 400));
    }

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

    $sent_comercial = dirhect_send_mail($to_comercial, $subject_comercial, $message_comercial, dirhect_team_notification_headers($email));

    $subject_confirmacao = "✅ Confirmação - Parceria Dirhect";
    $message_confirmacao = "
    <html><body>
    <h1>✅ Confirmação Recebida</h1>
    <p>Olá <strong>$contato</strong>, recebemos sua solicitação de parceria!</p>
    <p><strong>Empresa:</strong> $empresa</p>
    <p>Nossa equipe comercial entrará em contato em até 24 horas.</p>
    <p>Data/Hora: " . date('d/m/Y H:i:s') . "</p>
    </body></html>";

    $sent_confirmacao = dirhect_send_mail($email, $subject_confirmacao, $message_confirmacao, dirhect_user_confirmation_headers());

    return dirhect_mail_endpoint_response($sent_comercial, $sent_confirmacao);
}
