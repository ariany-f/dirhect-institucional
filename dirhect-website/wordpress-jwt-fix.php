<?php
/**
 * Plugin Name: WordPress JWT API Fix
 * Description: Corrige problemas de permissão na API REST com JWT Authentication
 * Version: 1.0
 * Author: Dirhect
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

class WordPressJWTAPIFix {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_filter('rest_authentication_errors', array($this, 'handle_rest_authentication'), 10, 1);
        add_filter('user_has_cap', array($this, 'modify_user_capabilities'), 10, 3);
        add_action('rest_api_init', array($this, 'register_debug_endpoint'));
        add_action('wp_loaded', array($this, 'setup_cors'));
    }
    
    public function init() {
        // Log de inicialização
        error_log('WordPress JWT API Fix inicializado');
    }
    
    public function setup_cors() {
        // Configurar CORS para permitir requisições da aplicação
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
    }
    
    public function handle_rest_authentication($result) {
        // Se já há um erro de autenticação, retornar
        if (true === $result || is_wp_error($result)) {
            return $result;
        }
        
        // Verificar se é uma requisição para a API REST
        if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
            
            // Log da requisição para debug
            error_log('=== REST API REQUEST ===');
            error_log('URI: ' . $_SERVER['REQUEST_URI']);
            error_log('Method: ' . $_SERVER['REQUEST_METHOD']);
            error_log('Authorization: ' . (isset($_SERVER['HTTP_AUTHORIZATION']) ? 'Present' : 'Missing'));
            
            // Verificar se há token JWT no header
            $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
            
            if (strpos($auth_header, 'Bearer ') === 0) {
                $token = substr($auth_header, 7);
                
                // Tentar validar o token JWT
                $user = $this->validate_jwt_token($token);
                
                if ($user && $user->ID > 0) {
                    error_log('Usuário autenticado via JWT: ' . $user->user_login . ' (ID: ' . $user->ID . ')');
                    error_log('Roles: ' . implode(', ', $user->roles));
                    error_log('Capabilities: edit_posts=' . (user_can($user->ID, 'edit_posts') ? 'YES' : 'NO'));
                    error_log('Capabilities: publish_posts=' . (user_can($user->ID, 'publish_posts') ? 'YES' : 'NO'));
                    error_log('========================');
                    
                    // Definir o usuário atual
                    wp_set_current_user($user->ID);
                    
                    return true;
                } else {
                    error_log('Token JWT inválido ou usuário não encontrado');
                    error_log('========================');
                }
            } else {
                error_log('Header Authorization não encontrado ou formato inválido');
                error_log('========================');
            }
        }
        
        return $result;
    }
    
    public function validate_jwt_token($token) {
        try {
            // Tentar com JWT Authentication for WP-API
            $jwt_auth_user = $this->validate_jwt_auth_token($token);
            if ($jwt_auth_user) {
                return $jwt_auth_user;
            }
            
            // Tentar com Simple JWT Login
            $simple_jwt_user = $this->validate_simple_jwt_token($token);
            if ($simple_jwt_user) {
                return $simple_jwt_user;
            }
            
            return null;
        } catch (Exception $e) {
            error_log('Erro ao validar token JWT: ' . $e->getMessage());
            return null;
        }
    }
    
    public function validate_jwt_auth_token($token) {
        // Verificar se o plugin JWT Authentication for WP-API está ativo
        if (!class_exists('JWT_AUTH_Service')) {
            return null;
        }
        
        try {
            // Decodificar o token JWT
            $decoded = JWT_AUTH_Service::decode_token($token);
            
            if ($decoded && isset($decoded->data->user->id)) {
                $user_id = $decoded->data->user->id;
                return get_user_by('id', $user_id);
            }
        } catch (Exception $e) {
            error_log('Erro ao validar JWT Auth token: ' . $e->getMessage());
        }
        
        return null;
    }
    
    public function validate_simple_jwt_token($token) {
        // Verificar se o plugin Simple JWT Login está ativo
        if (!class_exists('SimpleJWTLoginService')) {
            return null;
        }
        
        try {
            // Tentar decodificar o token
            $decoded = $this->decode_simple_jwt_token($token);
            
            if ($decoded && isset($decoded->user_id)) {
                return get_user_by('id', $decoded->user_id);
            }
        } catch (Exception $e) {
            error_log('Erro ao validar Simple JWT token: ' . $e->getMessage());
        }
        
        return null;
    }
    
    public function decode_simple_jwt_token($token) {
        // Implementação básica de decodificação JWT
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        
        $payload = base64_decode(str_pad(strtr($parts[1], '-_', '+/'), strlen($parts[1]) % 4, '=', STR_PAD_RIGHT));
        return json_decode($payload);
    }
    
    public function modify_user_capabilities($allcaps, $caps, $args) {
        $user = wp_get_current_user();
        
        if (!$user || $user->ID === 0) {
            return $allcaps;
        }
        
        // Log das capacidades solicitadas
        error_log('=== CAPABILITIES REQUEST ===');
        error_log('User: ' . $user->user_login . ' (ID: ' . $user->ID . ')');
        error_log('Roles: ' . implode(', ', $user->roles));
        error_log('Requested caps: ' . implode(', ', $caps));
        
        // Dar permissões adicionais para usuários autenticados via API REST
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
                
                error_log('Administrador - todas as permissões garantidas');
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
                
                error_log('Editor - permissões de posts garantidas');
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
                
                error_log('Autor - permissões básicas garantidas');
            }
        }
        
        error_log('Final caps: ' . implode(', ', array_keys(array_filter($allcaps))));
        error_log('========================');
        
        return $allcaps;
    }
    
    public function register_debug_endpoint() {
        // Endpoint para debug de permissões
        register_rest_route('jwt-fix/v1', '/debug', array(
            'methods' => 'GET',
            'callback' => array($this, 'debug_permissions'),
            'permission_callback' => function() {
                return is_user_logged_in();
            }
        ));
    }
    
    public function debug_permissions($request) {
        $user = wp_get_current_user();
        
        return array(
            'user_id' => $user->ID,
            'user_login' => $user->user_login,
            'user_email' => $user->user_email,
            'roles' => $user->roles,
            'capabilities' => array(
                'edit_posts' => user_can($user->ID, 'edit_posts'),
                'publish_posts' => user_can($user->ID, 'publish_posts'),
                'edit_published_posts' => user_can($user->ID, 'edit_published_posts'),
                'delete_posts' => user_can($user->ID, 'delete_posts'),
                'upload_files' => user_can($user->ID, 'upload_files'),
                'manage_categories' => user_can($user->ID, 'manage_categories'),
                'read' => user_can($user->ID, 'read')
            ),
            'request_uri' => $_SERVER['REQUEST_URI'] ?? 'N/A',
            'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'N/A',
            'has_authorization' => isset($_SERVER['HTTP_AUTHORIZATION'])
        );
    }
}

// Inicializar o plugin
new WordPressJWTAPIFix();

// Adicionar hook de ativação
register_activation_hook(__FILE__, function() {
    error_log('WordPress JWT API Fix plugin ativado');
});

// Adicionar hook de desativação
register_deactivation_hook(__FILE__, function() {
    error_log('WordPress JWT API Fix plugin desativado');
});
?> 