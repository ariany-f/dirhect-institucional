<?php
/**
 * Fix de Permissões para Simple JWT Login
 * 
 * Adicione este código ao arquivo functions.php do seu tema WordPress
 * 
 * Este código resolve o problema de permissões para usuários autor
 * criarem posts via API REST com Simple JWT Login.
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Permitir que usuários autor criem posts via API REST
 */
add_filter('rest_authentication_errors', function($result) {
    // Se já há um erro de autenticação, retornar
    if (true === $result || is_wp_error($result)) {
        return $result;
    }
    
    // Verificar se é uma requisição para a API REST
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        
        // Verificar se há token JWT no header
        $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
        
        if (strpos($auth_header, 'Bearer ') === 0) {
            $token = substr($auth_header, 7);
            
            // Validar token JWT do Simple JWT Login
            $user = validate_simple_jwt_token($token);
            
            if ($user && $user->ID > 0) {
                // Definir o usuário atual
                wp_set_current_user($user->ID);
                
                // Log para debug
                error_log("Simple JWT Login - Usuário autenticado: {$user->user_login} (ID: {$user->ID})");
                error_log("Simple JWT Login - Roles: " . implode(', ', $user->roles));
                
                return true;
            }
        }
    }
    
    return $result;
});

/**
 * Validar token JWT do Simple JWT Login
 */
function validate_simple_jwt_token($token) {
    try {
        // Decodificar o payload do JWT
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        
        $payload = base64_decode(str_pad(strtr($parts[1], '-_', '+/'), strlen($parts[1]) % 4, '=', STR_PAD_RIGHT));
        $data = json_decode($payload);
        
        // Simple JWT Login usa user_id no payload
        if ($data && isset($data->user_id)) {
            return get_user_by('id', $data->user_id);
        }
        
        return null;
    } catch (Exception $e) {
        error_log('Erro ao validar Simple JWT token: ' . $e->getMessage());
        return null;
    }
}

/**
 * Modificar capacidades do usuário para permitir criação de posts
 */
add_filter('user_has_cap', function($allcaps, $caps, $args) {
    $user = wp_get_current_user();
    
    if (!$user || $user->ID === 0) {
        return $allcaps;
    }
    
    // Verificar se é uma requisição para a API REST
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        
        // Para usuários administrador, garantir todas as permissões
        if (in_array('administrator', $user->roles)) {
            $allcaps['edit_posts'] = true;
            $allcaps['publish_posts'] = true;
            $allcaps['edit_published_posts'] = true;
            $allcaps['delete_published_posts'] = true;
            $allcaps['delete_posts'] = true;
            $allcaps['edit_others_posts'] = true;
            $allcaps['delete_others_posts'] = true;
            $allcaps['upload_files'] = true;
            $allcaps['manage_categories'] = true;
            $allcaps['read'] = true;
        }
        // Para usuários editor, garantir permissões de posts
        elseif (in_array('editor', $user->roles)) {
            $allcaps['edit_posts'] = true;
            $allcaps['publish_posts'] = true;
            $allcaps['edit_published_posts'] = true;
            $allcaps['delete_published_posts'] = true;
            $allcaps['delete_posts'] = true;
            $allcaps['edit_others_posts'] = true;
            $allcaps['delete_others_posts'] = true;
            $allcaps['upload_files'] = true;
            $allcaps['manage_categories'] = true;
            $allcaps['read'] = true;
        }
        // Para usuários autor, garantir permissões básicas
        elseif (in_array('author', $user->roles)) {
            $allcaps['edit_posts'] = true;
            $allcaps['publish_posts'] = true;
            $allcaps['edit_published_posts'] = true;
            $allcaps['delete_published_posts'] = true;
            $allcaps['delete_posts'] = true;
            $allcaps['upload_files'] = true;
            $allcaps['manage_categories'] = true;
            $allcaps['read'] = true;
        }
        // Para usuários contributor, permitir criar drafts
        elseif (in_array('contributor', $user->roles)) {
            $allcaps['edit_posts'] = true;
            $allcaps['upload_files'] = true;
            $allcaps['read'] = true;
        }
    }
    
    return $allcaps;
}, 10, 3);

/**
 * Configurar CORS para permitir requisições da aplicação
 */
add_action('init', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    } else {
        header('Access-Control-Allow-Origin: *');
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
    header('Access-Control-Allow-Credentials: true');
    
    // Responder a requisições OPTIONS (preflight)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
});

/**
 * Desabilitar verificação de nonce para usuários autenticados via JWT
 */
add_filter('rest_cookie_collect_status', function($status, $request, $key) {
    // Se há token JWT no header, não verificar cookies/nonce
    $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (strpos($auth_header, 'Bearer ') === 0) {
        return false;
    }
    return $status;
}, 10, 3);

// Log de ativação
error_log('Simple JWT Login Fix ativado com sucesso!');
?> 