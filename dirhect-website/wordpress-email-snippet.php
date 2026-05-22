<?php
/**
 * Snippet WordPress — Envio de e-mails (API REST dirhect/v1)
 * Cole no functions.php do tema ou em um plugin (sem repetir <?php se já estiver no functions.php).
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Destinatários das notificações internas (um e-mail separado para cada um).
 * Evita Cc — no Hostinger/SMTP costuma falhar para @dirhect.com.br internos.
 * Inclua sempre contato@ (caixa do SMTP) se comercial@ ainda não existir no painel.
 */
if (!defined('DIRHECT_TEAM_NOTIFY')) {
    define(
        'DIRHECT_TEAM_NOTIFY',
        'comercial@dirhect.com.br,contato@dirhect.com.br,Sylvio.luiz@dirhect.com.br'
    );
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

/* ── Templates HTML — identidade do site: laranja #ffaa00–#ff8c00, navy #1B2232, fundo #F4F5F7 ── */

if (!defined('DIRHECT_SITE_URL')) {
    define('DIRHECT_SITE_URL', 'https://dirhect.com.br');
}

if (!defined('DIRHECT_EMAIL_LOGO')) {
    define('DIRHECT_EMAIL_LOGO', DIRHECT_SITE_URL . '/images/dirhect_color_invert.svg');
}

/** Cores sólidas (e-mail ignora gradientes CSS na maioria dos clientes) */
if (!defined('DIRHECT_EMAIL_NAVY')) {
    define('DIRHECT_EMAIL_NAVY', '#1B2232');
}
if (!defined('DIRHECT_EMAIL_ORANGE')) {
    define('DIRHECT_EMAIL_ORANGE', '#ff8c00');
}

function dirhect_email_e($text) {
    return esc_html((string) $text);
}

function dirhect_email_row($label, $value) {
    if ($value === '' || $value === null) {
        return '';
    }
    return '<tr>
<td style="padding:14px 18px;border-bottom:1px solid #E2E6EE;font-family:Inter,Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#8A96A8;text-transform:uppercase;letter-spacing:0.06em;width:36%;vertical-align:top;">'
        . dirhect_email_e($label) . '</td>
<td style="padding:14px 18px;border-bottom:1px solid #E2E6EE;font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;color:#1B2232;font-weight:500;vertical-align:top;">'
        . dirhect_email_e($value) . '</td>
</tr>';
}

function dirhect_email_fields_table($rows) {
    $inner = '';
    foreach ($rows as $row) {
        if (!is_array($row) || count($row) < 2) {
            continue;
        }
        $inner .= dirhect_email_row($row[0], $row[1]);
    }
    if ($inner === '') {
        return '';
    }
    return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #E2E6EE;border-radius:14px;overflow:hidden;background:#FFFFFF;">'
        . $inner . '</table>';
}

/**
 * Layout base dos e-mails (tabelas + CSS inline para clientes de e-mail).
 *
 * @param array $args preheader, eyebrow, title, subtitle, body, variant (team|user), footer
 */
function dirhect_email_layout($args) {
    $preheader = isset($args['preheader']) ? dirhect_email_e($args['preheader']) : '';
    $eyebrow = isset($args['eyebrow']) ? dirhect_email_e($args['eyebrow']) : 'Dirhect';
    $title = isset($args['title']) ? dirhect_email_e($args['title']) : '';
    $subtitle = isset($args['subtitle']) ? dirhect_email_e($args['subtitle']) : '';
    $body = isset($args['body']) ? $args['body'] : '';
    $variant = (isset($args['variant']) && $args['variant'] === 'user') ? 'user' : 'team';
    $footer = isset($args['footer']) ? $args['footer'] : '';

    $navy = DIRHECT_EMAIL_NAVY;
    $orange = DIRHECT_EMAIL_ORANGE;

    $header_sub = $subtitle !== ''
        ? '<p style="margin:10px 0 0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#E8ECF2;">' . $subtitle . '</p>'
        : '';

    $footer_html = $footer !== ''
        ? '<p style="margin:0 0 8px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:#8A96A8;">' . dirhect_email_e($footer) . '</p>'
        : '';

    $year = date('Y');

    return '<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>' . $title . '</title>
<!--[if mso]><style type="text/css">body,table,td{font-family:Arial,Helvetica,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F4F5F7;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">' . $preheader . '</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F4F5F7;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">

<tr><td style="border-radius:16px 16px 0 0;overflow:hidden;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="' . $navy . '" style="background-color:' . $navy . ';">
<tr><td bgcolor="' . $orange . '" style="height:4px;background-color:' . $orange . ';font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td bgcolor="' . $navy . '" style="padding:28px 32px 26px;background-color:' . $navy . ';">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
<tr>
<td align="left" valign="middle">
<img src="' . esc_url(DIRHECT_EMAIL_LOGO) . '" alt="Dirhect" width="140" height="36" style="display:block;height:36px;width:auto;max-width:140px;border:0;">
</td>
<td align="right" valign="middle">
<span style="display:inline-block;font-family:Inter,Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:' . $navy . ';background-color:' . $orange . ';padding:6px 12px;border-radius:999px;">' . $eyebrow . '</span>
</td>
</tr>
</table>
<h1 style="margin:22px 0 0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;">' . $title . '</h1>'
        . $header_sub . '
</td></tr>
</table>
</td></tr>

<tr><td style="background:#FFFFFF;padding:32px 32px 28px;border-left:1px solid #E2E6EE;border-right:1px solid #E2E6EE;">
' . $body . '
</td></tr>

<tr><td style="background:#ECEEF2;padding:24px 32px;border-radius:0 0 16px 16px;border:1px solid #E2E6EE;border-top:none;">
' . $footer_html . '
<p style="margin:0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8A96A8;">
© ' . $year . ' Dirhect · <a href="' . esc_url(DIRHECT_SITE_URL) . '" style="color:#D98A00;text-decoration:none;font-weight:600;">dirhect.com.br</a>
</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>';
}

/** E-mail interno (equipe) com tabela de dados */
function dirhect_email_team($title, $eyebrow, $intro, $rows, $extra_html = '') {
    $timestamp = date('d/m/Y H:i:s');
    $body = '<p style="margin:0 0 20px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#4A5568;">'
        . dirhect_email_e($intro) . '</p>';
    $body .= dirhect_email_fields_table($rows);
    if ($extra_html !== '') {
        $body .= '<div style="margin-top:20px;">' . $extra_html . '</div>';
    }
    $body .= '<p style="margin:24px 0 0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;color:#8A96A8;">'
        . 'Registrado em <strong style="color:#1B2232;">' . dirhect_email_e($timestamp) . '</strong>'
        . ' · Responda diretamente a este e-mail para falar com o solicitante.</p>';

    return dirhect_email_layout(array(
        'preheader' => $intro,
        'eyebrow' => $eyebrow,
        'title' => $title,
        'subtitle' => 'Notificação interna',
        'body' => $body,
        'variant' => 'team',
        'footer' => 'Mensagem automática do site institucional Dirhect.',
    ));
}

/** E-mail de confirmação ao visitante */
function dirhect_email_user_confirm($title, $greeting_name, $lead, $detail_rows = array(), $cta_label = '', $cta_url = '') {
    $name = dirhect_email_e($greeting_name);
    $body = '<p style="margin:0 0 16px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1B2232;">'
        . 'Olá, <strong>' . $name . '</strong>!</p>';
    $body .= '<p style="margin:0 0 24px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#4A5568;">'
        . dirhect_email_e($lead) . '</p>';

    if (!empty($detail_rows)) {
        $body .= dirhect_email_fields_table($detail_rows);
        $body .= '<div style="height:20px;line-height:20px;">&nbsp;</div>';
    }

    $body .= '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFF3D6" style="background-color:#FFF3D6;border:1px solid #FDEAC0;border-radius:14px;">
<tr><td bgcolor="#FFF3D6" style="padding:18px 20px;background-color:#FFF3D6;">
<p style="margin:0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#1B2232;">
<strong style="color:#D98A00;">Próximo passo:</strong> nossa equipe analisa sua solicitação e entra em contato em breve.
</p>
</td></tr>
</table>';

    if ($cta_label !== '' && $cta_url !== '') {
        $orange = DIRHECT_EMAIL_ORANGE;
        $body .= '<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 0;">
<tr><td align="center" bgcolor="' . $orange . '" style="border-radius:12px;background-color:' . $orange . ';">
<a href="' . esc_url($cta_url) . '" style="display:inline-block;padding:14px 28px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#1B2232;text-decoration:none;">'
            . dirhect_email_e($cta_label) . '</a>
</td></tr>
</table>';
    }

    return dirhect_email_layout(array(
        'preheader' => $lead,
        'eyebrow' => 'Confirmação',
        'title' => $title,
        'subtitle' => 'Recebemos sua mensagem com sucesso',
        'body' => $body,
        'variant' => 'user',
        'footer' => 'Se você não fez esta solicitação, ignore este e-mail ou fale conosco em contato@dirhect.com.br.',
    ));
}

function dirhect_team_notification_headers($reply_to = null) {
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . DIRHECT_MAIL_FROM_NAME . ' <' . DIRHECT_MAIL_FROM . '>',
    );
    if ($reply_to && is_email($reply_to)) {
        $headers[] = 'Reply-To: ' . $reply_to;
    }
    return $headers;
}

/**
 * Notifica a equipe: um wp_mail por destinatário (sem Cc).
 *
 * @return array{any: bool, all: bool, details: array<string, bool>}
 */
function dirhect_notify_team($subject, $message, $reply_to = null) {
    $raw = array_map('trim', explode(',', DIRHECT_TEAM_NOTIFY));
    $recipients = array();
    foreach ($raw as $addr) {
        $addr = sanitize_email($addr);
        if ($addr && is_email($addr)) {
            $recipients[$addr] = true;
        }
    }
    $recipients = array_keys($recipients);

    if (empty($recipients)) {
        return array('any' => false, 'all' => false, 'details' => array());
    }

    $headers = dirhect_team_notification_headers($reply_to);
    $details = array();
    $all_ok = true;

    foreach ($recipients as $to) {
        $ok = dirhect_send_mail($to, $subject, $message, $headers);
        if (!$ok) {
            $plain_headers = array(
                'Content-Type: text/plain; charset=UTF-8',
                'From: ' . DIRHECT_MAIL_FROM_NAME . ' <' . DIRHECT_MAIL_FROM . '>',
            );
            if ($reply_to && is_email($reply_to)) {
                $plain_headers[] = 'Reply-To: ' . $reply_to;
            }
            $plain_body = wp_strip_all_tags($message);
            $ok = dirhect_send_mail($to, $subject, $plain_body, $plain_headers);
        }
        $details[$to] = $ok;
        if (!$ok) {
            $all_ok = false;
            error_log("Dirhect notify_team falhou para $to: " . dirhect_get_mail_error());
        }
    }

    return array(
        'any' => in_array(true, $details, true),
        'all' => $all_ok,
        'details' => $details,
    );
}

function dirhect_user_confirmation_headers() {
    return array(
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . DIRHECT_MAIL_FROM_NAME . ' <' . DIRHECT_MAIL_FROM . '>',
    );
}

/**
 * Limpa estado do PHPMailer entre envios (evita destinatário/header duplicado).
 */
function dirhect_reset_phpmailer() {
    global $phpmailer;
    if (!is_object($phpmailer)) {
        return;
    }
    $phpmailer->clearAllRecipients();
    $phpmailer->clearAttachments();
    $phpmailer->clearCustomHeaders();
    if (method_exists($phpmailer, 'clearReplyTos')) {
        $phpmailer->clearReplyTos();
    }
    $phpmailer->ErrorInfo = '';
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

    dirhect_reset_phpmailer();

    $sent = wp_mail($to, $subject, $message, $headers);

    if (!empty($GLOBALS['dirhect_last_mail_error'])) {
        return false;
    }

    if (!$sent) {
        global $phpmailer;
        if (is_object($phpmailer) && !empty($phpmailer->ErrorInfo)) {
            $GLOBALS['dirhect_last_mail_error'] = $phpmailer->ErrorInfo;
        } else {
            $GLOBALS['dirhect_last_mail_error'] = 'wp_mail retornou false para ' . $to;
        }
        return false;
    }

    return true;
}

/**
 * Ordem fixa: 1º notifica a equipe · 2º confirmação ao solicitante.
 *
 * @param string      $team_subject
 * @param string      $team_html
 * @param string      $user_email
 * @param string      $user_subject
 * @param string      $user_html
 * @param string|null $reply_to E-mail do visitante (Reply-To nos avisos internos)
 * @return array|WP_Error
 */
function dirhect_send_form_emails($team_subject, $team_html, $user_email, $user_subject, $user_html, $reply_to = null) {
    if (!is_email($user_email)) {
        return new WP_Error('invalid_email', 'E-mail do solicitante inválido', array('status' => 400));
    }

    if (empty($team_html) || empty($user_html)) {
        return new WP_Error('email_error', 'Conteúdo do e-mail vazio', array('status' => 500));
    }

    // 1º — equipe Dirhect (comercial, contato, etc.)
    $team_notify = dirhect_notify_team($team_subject, $team_html, $reply_to);

    // 2º — confirmação para quem preencheu o formulário
    $user_headers = dirhect_user_confirmation_headers();
    $sent_user = dirhect_send_mail($user_email, $user_subject, $user_html, $user_headers);

    if (!$sent_user) {
        $plain_headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: ' . DIRHECT_MAIL_FROM_NAME . ' <' . DIRHECT_MAIL_FROM . '>',
        );
        $sent_user = dirhect_send_mail(
            $user_email,
            $user_subject,
            wp_strip_all_tags($user_html),
            $plain_headers
        );
    }

    if (!$sent_user) {
        error_log('Dirhect: falha e-mail ao solicitante ' . $user_email . ' — ' . dirhect_get_mail_error());
    }

    return dirhect_mail_endpoint_response($team_notify, $sent_user);
}

/**
 * Resposta da API: sucesso só se a confirmação ao visitante foi enviada.
 */
function dirhect_mail_endpoint_response($team_notify, $sent_user) {
    if (is_array($team_notify)) {
        $sent_team = !empty($team_notify['any']);
        $team_details = isset($team_notify['details']) ? $team_notify['details'] : array();
    } else {
        $sent_team = (bool) $team_notify;
        $team_details = array();
    }

    $sent = array(
        'team' => $sent_team,
        'user' => (bool) $sent_user,
        'teamDetails' => $team_details,
    );

    if ($sent_user) {
        return array(
            'success' => true,
            'message' => $sent_team
                ? 'Emails enviados com sucesso!'
                : 'Confirmação enviada ao seu e-mail. (Falha ao notificar a equipe interna — verifique caixas comercial/contato.)',
            'sent' => $sent,
        );
    }

    $err = dirhect_get_mail_error();
    $hint = '';
    if (!$sent_team && !empty($team_details)) {
        $hint = ' Equipe: ' . wp_json_encode($team_details);
    }

    return new WP_Error(
        'email_error',
        'Não foi possível enviar a confirmação ao seu e-mail: ' . $err . $hint,
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

    $subject_comercial = "Nova demonstração — $empresa";

    $rows = array(
        array('Empresa', $empresa),
        array('CNPJ', $cnpj),
        array('Segmento', $segmento),
        array('Funcionários', $funcionarios),
        array('Contato', $contato),
        array('Cargo', $cargo),
        array('E-mail', $email),
        array('Telefone', $telefone),
    );
    if (!empty($necessidades)) {
        $necessidades_text = is_array($necessidades) ? implode(', ', $necessidades) : $necessidades;
        $rows[] = array('Necessidades', $necessidades_text);
    }
    if (!empty($mensagem)) {
        $rows[] = array('Mensagem', $mensagem);
    }

    $message_comercial = dirhect_email_team(
        'Nova solicitação de demonstração',
        'Demonstração',
        'Um visitante pediu uma demonstração da plataforma Dirhect.',
        $rows
    );

    return dirhect_send_form_emails(
        $subject_comercial,
        $message_comercial,
        $email,
        'Confirmação — Demonstração Dirhect',
        dirhect_email_user_confirm(
            'Solicitação recebida',
            $contato,
            'Recebemos seu pedido de demonstração. Nossa equipe comercial entrará em contato em breve.',
            array(
                array('Empresa', $empresa),
                array('Segmento', $segmento),
            ),
            'Conhecer a Dirhect',
            DIRHECT_SITE_URL
        ),
        $email
    );
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

    $subject_suporte = "Suporte — $assunto_traduzido — $nome";

    $message_suporte = dirhect_email_team(
        'Nova solicitação de suporte',
        'Suporte',
        'Um visitante enviou uma mensagem pelo formulário de suporte.',
        array(
            array('Nome', $nome),
            array('E-mail', $email),
            array('Assunto', $assunto_traduzido),
            array('Mensagem', $mensagem),
        )
    );

    return dirhect_send_form_emails(
        $subject_suporte,
        $message_suporte,
        $email,
        'Confirmação — Suporte Dirhect',
        dirhect_email_user_confirm(
            'Mensagem recebida',
            $nome,
            'Recebemos sua solicitação de suporte e retornaremos o mais breve possível.',
            array(array('Assunto', $assunto_traduzido)),
            'Acessar o site',
            DIRHECT_SITE_URL
        ),
        $email
    );
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

    $subject_comercial = "Indique e ganhe — $empresa — $indicador";

    $rows = array(
        array('Indicador', $indicador),
        array('E-mail do indicador', $email_indicador),
        array('Empresa indicada', $empresa),
        array('CNPJ', $cnpj),
        array('Contato na empresa', $contato),
        array('E-mail do contato', $email_contato),
    );
    if (!empty($mensagem)) {
        $rows[] = array('Mensagem', $mensagem);
    }

    $message_comercial = dirhect_email_team(
        'Nova indicação',
        'Indique e ganhe',
        'Alguém indicou uma empresa pelo programa Indique e Ganhe.',
        $rows
    );

    return dirhect_send_form_emails(
        $subject_comercial,
        $message_comercial,
        $email_indicador,
        'Confirmação — Indicação Dirhect',
        dirhect_email_user_confirm(
            'Indicação registrada',
            $indicador,
            'Obrigado por indicar a empresa ' . $empresa . '. Nossa equipe vai analisar e entrar em contato.',
            array(array('Empresa indicada', $empresa)),
            'Ver programa Indique e Ganhe',
            DIRHECT_SITE_URL . '/indique-ganhe'
        ),
        $email_indicador
    );
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

    $subject_comercial = "Parceria — $empresa";

    $rows = array(
        array('Empresa', $empresa),
        array('Contato', $contato),
        array('E-mail', $email),
        array('Telefone', $telefone),
        array('Perfil / área', $area_label),
    );
    if (!empty($mensagem)) {
        $rows[] = array('Mensagem', $mensagem);
    }

    $message_comercial = dirhect_email_team(
        'Nova candidatura de parceiro',
        'Parceiros',
        'Alguém enviou o formulário do Programa de Parceiros Dirhect.',
        $rows
    );

    return dirhect_send_form_emails(
        $subject_comercial,
        $message_comercial,
        $email,
        'Confirmação — Parceria Dirhect',
        dirhect_email_user_confirm(
            'Candidatura recebida',
            $contato,
            'Recebemos sua candidatura ao Programa de Parceiros Dirhect. Nossa equipe comercial entrará em contato em até 24 horas.',
            array(
                array('Empresa', $empresa),
                array('Perfil', $area_label),
            ),
            'Conhecer o programa',
            DIRHECT_SITE_URL . '/parceiro'
        ),
        $email
    );
}
