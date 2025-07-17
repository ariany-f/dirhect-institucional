<?php
/**
 * Configuração customizada para JWT Simple Login
 * Adicione este código ao functions.php do seu tema ou em um plugin customizado
 */

// Permitir que usuários autor criem posts via API REST
add_filter('rest_authentication_errors', function($result) {
    // Se já há um erro de autenticação, retornar
    if (true === $result || is_wp_error($result)) {
        return $result;
    }
    
    // Verificar se é uma requisição para criar posts
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/wp-json/wp/v2/posts') !== false) {
            // Permitir que usuários autor criem posts
            return true;
        }
    }
    
    return $result;
});

// Adicionar permissões customizadas para usuários autor
add_filter('user_has_cap', function($allcaps, $caps, $args) {
    $user = wp_get_current_user();
    
    // Se o usuário é autor, dar permissões adicionais
    if (in_array('author', $user->roles)) {
        $allcaps['edit_posts'] = true;
        $allcaps['publish_posts'] = true;
        $allcaps['edit_published_posts'] = true;
        $allcaps['delete_published_posts'] = true;
        $allcaps['edit_others_posts'] = false; // Apenas seus próprios posts
        $allcaps['delete_others_posts'] = false;
    }
    
    return $allcaps;
}, 10, 3);

// Permitir que usuários autor acessem a API REST
add_filter('rest_authentication_errors', function($result) {
    if (true === $result || is_wp_error($result)) {
        return $result;
    }
    
    // Verificar se o usuário está autenticado
    $user = wp_get_current_user();
    if ($user->ID > 0) {
        // Permitir acesso para usuários logados
        return true;
    }
    
    return $result;
});

// Configurar CORS para permitir requisições da aplicação
add_action('init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
});

// Log para debug
add_action('rest_api_init', function() {
    error_log('REST API inicializada - Permissões customizadas ativas');
});
?> 