<?php
/**
 * Plugin Name: Dirhect Custom JWT Endpoints
 * Description: Endpoints customizados para autenticação JWT e criação de posts
 * Version: 1.0.3
 * Author: Dirhect
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

class DirhectCustomJWTEndpoints {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_endpoints'));
    }
    
    public function register_endpoints() {
        // Endpoint para criar posts com JWT
        register_rest_route('dirhect/v1', '/posts', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_post_with_jwt'),
            'permission_callback' => array($this, 'check_jwt_permission'),
            'args' => array(
                'title' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'content' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'wp_kses_post'
                ),
                'excerpt' => array(
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field'
                ),
                'status' => array(
                    'required' => false,
                    'type' => 'string',
                    'default' => 'draft',
                    'enum' => array('draft', 'publish', 'private')
                )
            )
        ));
        
        // Endpoint para validar JWT
        register_rest_route('dirhect/v1', '/validate-jwt', array(
            'methods' => 'POST',
            'callback' => array($this, 'validate_jwt'),
            'permission_callback' => '__return_true'
        ));

        // Cadastro público de colaborador (subscriber)
        register_rest_route('dirhect/v1', '/colaborador/register', array(
            'methods' => 'POST',
            'callback' => array($this, 'colaborador_register'),
            'permission_callback' => '__return_true',
            'args' => array(
                'name' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field'
                ),
                'email' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_email'
                ),
                'password' => array(
                    'required' => true,
                    'type' => 'string'
                )
            )
        ));
    }

    public function colaborador_register($request) {
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
            'role' => 'subscriber'
        ));

        return array(
            'success' => true,
            'message' => 'Conta criada. Faça login com seu e-mail e senha.',
            'user_id' => (int) $user_id,
            'username' => $username
        );
    }
    
    public function check_jwt_permission($request) {
        // Obter token do header Authorization
        $auth_header = $request->get_header('Authorization');
        if (!$auth_header) {
            return new WP_Error('no_auth_header', 'Authorization header required', array('status' => 401));
        }
        
        // Extrair token do header "Bearer TOKEN"
        if (!preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            return new WP_Error('invalid_auth_header', 'Invalid Authorization header format', array('status' => 401));
        }
        
        $jwt = $matches[1];
        
        // Verificar se o token tem o formato correto (3 partes)
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return new WP_Error('invalid_jwt_format', 'Invalid JWT format - wrong number of segments', array('status' => 401));
        }
        
        try {
            // Decodificar o payload (segunda parte)
            $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
            
            if (!$payload) {
                return new WP_Error('invalid_jwt_payload', 'Invalid JWT payload', array('status' => 401));
            }
            
            // Extrair informações do usuário do JWT
            $user_email = isset($payload['email']) ? $payload['email'] : null;
            $username = isset($payload['username']) ? $payload['username'] : null;
            
            if (!$user_email && !$username) {
                return new WP_Error('no_user_info', 'No user information in JWT', array('status' => 401));
            }
            
            // Buscar usuário no WordPress
            $user = null;
            if ($user_email) {
                $user = get_user_by('email', $user_email);
            }
            if (!$user && $username) {
                $user = get_user_by('login', $username);
            }
            
            if (!$user) {
                return new WP_Error('user_not_found', 'User not found', array('status' => 401));
            }
            
            // Verificar se o usuário tem permissões
            if (!user_can($user->ID, 'edit_posts')) {
                return new WP_Error('insufficient_permissions', 'Insufficient permissions', array('status' => 403));
            }
            
            // Definir usuário atual para a requisição
            wp_set_current_user($user->ID);
            
            return true;
            
        } catch (Exception $e) {
            return new WP_Error('jwt_validation_error', $e->getMessage(), array('status' => 401));
        }
    }
    
    public function create_post_with_jwt($request) {
        $title = $request->get_param('title');
        $content = $request->get_param('content');
        $excerpt = $request->get_param('excerpt');
        $status = $request->get_param('status');
        
        // Criar post
        $post_data = array(
            'post_title' => $title,
            'post_content' => $content,
            'post_excerpt' => $excerpt,
            'post_status' => $status,
            'post_type' => 'post'
        );
        
        $post_id = wp_insert_post($post_data);
        
        if (is_wp_error($post_id)) {
            return new WP_Error('post_creation_failed', $post_id->get_error_message(), array('status' => 500));
        }
        
        // Retornar dados do post criado
        $post = get_post($post_id);
        
        return array(
            'success' => true,
            'data' => array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
                'excerpt' => $post->post_excerpt,
                'status' => $post->post_status,
                'date' => $post->post_date,
                'link' => get_permalink($post->ID)
            )
        );
    }
    
    public function validate_jwt($request) {
        $auth_header = $request->get_header('Authorization');
        if (!$auth_header) {
            return array(
                'success' => false,
                'message' => 'Authorization header required'
            );
        }
        
        if (!preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            return array(
                'success' => false,
                'message' => 'Invalid Authorization header format'
            );
        }
        
        $jwt = $matches[1];
        
        // Verificar se o token tem o formato correto
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return array(
                'success' => false,
                'message' => 'Invalid JWT format - wrong number of segments'
            );
        }
        
        try {
            // Decodificar o payload
            $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
            
            if (!$payload) {
                return array(
                    'success' => false,
                    'message' => 'Invalid JWT payload'
                );
            }
            
            return array(
                'success' => true,
                'data' => $payload
            );
            
        } catch (Exception $e) {
            return array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
    }
}

// Inicializar plugin
new DirhectCustomJWTEndpoints(); 