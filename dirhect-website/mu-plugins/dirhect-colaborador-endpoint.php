<?php
/**
 * Plugin Name: Dirhect — cadastro colaborador (Must-Use)
 * Description: Registra POST /wp-json/dirhect/v1/colaborador/register sem precisar ativar plugin no painel.
 *
 * INSTALAÇÃO: copie este arquivo para wp-content/mu-plugins/ (crie a pasta mu-plugins se não existir).
 * Não use "Ativar" — mu-plugins carregam sempre. Se já usar wordpress-custom-endpoints.php ativo, este arquivo
 * detecta a rota e não duplica.
 *
 * @package Dirhect
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Mesma lógica de cadastro do wordpress-custom-endpoints.php
 */
function dirhect_mu_colaborador_register_cb($request) {
    $email = $request->get_param('email');
    $password = $request->get_param('password');
    $name = $request->get_param('name');

    if (strlen((string) $password) < 8) {
        return new WP_Error('weak_password', 'A senha deve ter no mínimo 8 caracteres.', array('status' => 400));
    }

    if (email_exists($email)) {
        return new WP_Error('email_exists', 'Este e-mail já está cadastrado.', array('status' => 400));
    }

    $email_local = strstr($email, '@', true);
    $base = sanitize_user($email_local ? $email_local : 'colaborador', true);
    if ($base === '') {
        $base = 'colaborador';
    }

    $username = $base;
    $i = 0;
    while (username_exists($username)) {
        $i++;
        $username = $base . $i;
    }

    $user_id = wp_create_user($username, $password, $email);
    if (is_wp_error($user_id)) {
        return $user_id;
    }

    wp_update_user(array(
        'ID' => $user_id,
        'display_name' => $name,
        'first_name' => $name,
        'role' => 'subscriber',
    ));

    return array(
        'success' => true,
        'message' => 'Conta criada. Faça login com seu e-mail e senha.',
        'user_id' => (int) $user_id,
        'username' => $username,
    );
}

add_action('rest_api_init', function () {
    $server = rest_get_server();
    if (!$server) {
        return;
    }
    foreach (array_keys($server->get_routes()) as $path) {
        if (strpos($path, 'colaborador/register') !== false) {
            return;
        }
    }

    register_rest_route(
        'dirhect/v1',
        '/colaborador/register',
        array(
            'methods' => 'POST',
            'callback' => 'dirhect_mu_colaborador_register_cb',
            'permission_callback' => '__return_true',
            'args' => array(
                'name' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'email' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_email',
                ),
                'password' => array(
                    'required' => true,
                    'type' => 'string',
                ),
            ),
        )
    );
}, 20);
