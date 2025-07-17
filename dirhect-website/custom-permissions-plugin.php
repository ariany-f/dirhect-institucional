<?php
/**
 * Plugin Name: Custom REST API Permissions
 * Description: Permite que usuários autor criem posts via API REST
 * Version: 1.0
 * Author: Dirhect
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

class CustomRestAPIPermissions {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_filter('rest_authentication_errors', array($this, 'handle_authentication'), 10, 1);
        add_filter('user_has_cap', array($this, 'modify_user_capabilities'), 10, 3);
        add_action('rest_api_init', array($this, 'register_custom_endpoints'));
    }
    
    public function init() {
        // Configurar CORS
        $this->setup_cors();
    }
    
    public function setup_cors() {
        // Permitir CORS para requisições da aplicação
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
        
        // Responder a requisições OPTIONS (preflight)
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit();
        }
    }
    
    public function handle_authentication($result) {
        // Se já há um erro de autenticação, retornar
        if (true === $result || is_wp_error($result)) {
            return $result;
        }
        
        // Verificar se é uma requisição para a API REST
        if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
            // Permitir acesso para usuários autenticados
            $user = wp_get_current_user();
            if ($user->ID > 0) {
                return true;
            }
        }
        
        return $result;
    }
    
    public function modify_user_capabilities($allcaps, $caps, $args) {
        $user = wp_get_current_user();
        
        // Se o usuário é autor, dar permissões adicionais para API REST
        if (in_array('author', $user->roles)) {
            // Permissões básicas para posts
            $allcaps['edit_posts'] = true;
            $allcaps['publish_posts'] = true;
            $allcaps['edit_published_posts'] = true;
            $allcaps['delete_published_posts'] = true;
            $allcaps['delete_posts'] = true;
            
            // Permissões para categorias
            $allcaps['manage_categories'] = true;
            
            // Permissões para mídia
            $allcaps['upload_files'] = true;
            
            // Permissões para API REST
            $allcaps['read'] = true;
            
            // Não permitir editar posts de outros usuários
            $allcaps['edit_others_posts'] = false;
            $allcaps['delete_others_posts'] = false;
        }
        
        return $allcaps;
    }
    
    public function register_custom_endpoints() {
        // Registrar endpoint customizado para verificar permissões
        register_rest_route('custom/v1', '/permissions', array(
            'methods' => 'GET',
            'callback' => array($this, 'check_permissions'),
            'permission_callback' => function() {
                return is_user_logged_in();
            }
        ));
    }
    
    public function check_permissions($request) {
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
                'manage_categories' => user_can($user->ID, 'manage_categories')
            )
        );
    }
}

// Inicializar o plugin
new CustomRestAPIPermissions();

// Adicionar hook de ativação
register_activation_hook(__FILE__, function() {
    // Log de ativação
    error_log('Custom REST API Permissions plugin ativado');
});

// Adicionar hook de desativação
register_deactivation_hook(__FILE__, function() {
    // Log de desativação
    error_log('Custom REST API Permissions plugin desativado');
});
?> 