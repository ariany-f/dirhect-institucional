// Usar import.meta.env para Vite em vez de process.env
const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://wp-api.dirhect.com.br/wp-json/wp/v2'

/**
 * Base REST até /wp-json (sem barra no final).
 * Use VITE_WORDPRESS_REST_BASE se a URL da API não seguir o padrão .../wp-json/wp/v2
 */
function getWordpressRestBase() {
  const explicit = import.meta.env.VITE_WORDPRESS_REST_BASE
  if (explicit != null && String(explicit).trim() !== '') {
    return String(explicit).trim().replace(/\/+$/, '')
  }
  const api = String(WORDPRESS_API_URL || '').trim().replace(/\/+$/, '')
  if (!api) return ''
  if (/\/wp\/v2\/?$/i.test(api)) {
    return api.replace(/\/wp\/v2\/?$/i, '')
  }
  const idx = api.toLowerCase().indexOf('/wp-json')
  if (idx !== -1) {
    return api.slice(0, idx + '/wp-json'.length)
  }
  try {
    const href = /^https?:\/\//i.test(api) ? api : `https://${api}`
    const u = new URL(href)
    return `${u.origin}/wp-json`
  } catch {
    return api
  }
}

// Cache para o ID da categoria roadmap
let roadmapCategoryId = null
// Cache para o ID da categoria banco-conhecimento
let knowledgeCategoryId = null
// Cache para verificação de token
let lastTokenCheck = 0
let tokenCheckCache = null
// Cache para detectar qual plugin JWT está sendo usado
let jwtPluginType = null

export const wordpressService = {
  WORDPRESS_API_URL, // Exportar a URL para uso externo

  // Detectar qual plugin JWT está sendo usado (sempre Simple JWT Login)
  async detectJWTPlugin() {
    return 'simple-jwt-login'
  },

  // URL base para endpoints JWT (sempre Simple JWT Login)
  async getJWT_API_URL() {
    return `${getWordpressRestBase()}/simple-jwt-login/v1`
  },

  // Chave JWT de descriptografia (do .env)
  get JWT_DECRYPTION_KEY() {
    return import.meta.env.VITE_JWT_DECRYPTION_KEY || '9e2f0b6d8d7a4f21a70d8711c909a532873adea9cf10273c64c4d2c7c9a8f8f2'
  },

  // Login de administrador (Simple JWT Login)
  async adminLogin(username, password) {
    try {
      console.log('=== DEBUG LOGIN ===')
      console.log('Tentando login com:', username)
      
      const jwtApiUrl = await this.getJWT_API_URL()
      console.log('JWT API URL:', jwtApiUrl)
      
      // Tentar diferentes formatos de parâmetros
      let response
      let data
      
      // Primeiro, tentar com email se o username parece ser um email
      if (username.includes('@')) {
        console.log('Tentando com email...')
        response = await fetch(`${jwtApiUrl}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: username, password })
        })
        
        if (response.ok) {
          data = await response.json()
          if (data.success && data.data && data.data.jwt) {
            console.log('Login com email funcionou!')
          } else {
            throw new Error('Login com email falhou')
          }
        } else {
          throw new Error('Login com email falhou')
        }
      } else {
        // Tentar com username
        console.log('Tentando com username...')
        response = await fetch(`${jwtApiUrl}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
        })
        
        if (!response.ok) {
          // Se falhar com username, tentar com login
          console.log('Tentando com login...')
          response = await fetch(`${jwtApiUrl}/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username, password })
          })
        }
        
        data = await response.json()
      }

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        const errorData = data || await response.json().catch(() => ({}))
        console.error('Erro na resposta:', errorData)
        throw new Error(errorData.message || 'Credenciais inválidas')
      }

      console.log('Resposta completa:', data)
      
      // Simple JWT Login retorna em data.data.jwt
      if (!data.success || !data.data || !data.data.jwt) {
        console.error('Formato de resposta inválido:', data)
        throw new Error('Formato de resposta inválido')
      }
      
      const token = data.data.jwt
      const userData = data.data

      console.log('Token:', token)
      
      // Verificar se o token é válido (tem 3 partes)
      const tokenParts = token.split('.')
      if (tokenParts.length !== 3) {
        console.error('Token JWT inválido - número incorreto de segmentos:', tokenParts.length)
        throw new Error('Token JWT inválido')
      }
      
      console.log('Token obtido:', token ? 'SIM' : 'NÃO')
      console.log('Token (primeiros 50 chars):', token ? token.substring(0, 50) + '...' : 'NULO')
      
      // Buscar informações completas do usuário (incluindo roles)
      console.log('Buscando informações completas do usuário...')
      const userInfo = await this.getCurrentUserInfo(token)
      console.log('Informações completas obtidas:', userInfo)
      
      // Salvar token no localStorage
      localStorage.setItem('adminToken', token)
      localStorage.setItem('adminUser', JSON.stringify({
        id: userInfo.id,
        email: userInfo.email || userData.user_email || username,
        name: userInfo.name || userData.display_name || username,
        roles: userInfo.roles || ['administrator']
      }))
      localStorage.setItem('adminTokenExpiry', Date.now() + (7 * 24 * 60 * 60 * 1000)) // 7 dias
      
      console.log('Token salvo no localStorage:', localStorage.getItem('adminToken') ? 'SIM' : 'NÃO')
      console.log('Dados do usuário salvos:', localStorage.getItem('adminUser') ? 'SIM' : 'NÃO')
      console.log('Expiração salva:', localStorage.getItem('adminTokenExpiry') ? 'SIM' : 'NÃO')
      
      // Disparar evento customizado para notificar outros componentes
      window.dispatchEvent(new CustomEvent('authStateChanged', { 
        detail: { 
          isAuthenticated: true, 
          user: {
            id: userInfo.id,
            email: userInfo.email || userData.user_email || username,
            name: userInfo.name || userData.display_name || username,
            roles: userInfo.roles || ['administrator']
          }
        } 
      }))
      
      const result = {
        success: true,
        token: token,
        user: {
          id: userInfo.id,
          email: userInfo.email || userData.user_email || username,
          name: userInfo.name || userData.display_name || username,
          roles: userInfo.roles || ['administrator']
        }
      }
      
      console.log('Resultado do login:', result)
      console.log('========================')
      
      return result
    } catch (error) {
      console.error('Erro no login admin:', error)
      throw error
    }
  },

  // Verificar token de autenticação (Simple JWT Login)
  async verifyAdminToken(token) {
    try {
      // Verificar cache (não verificar mais de uma vez a cada 5 minutos)
      const now = Date.now()
      if (tokenCheckCache && (now - lastTokenCheck) < 300000) { // 5 minutos
        return tokenCheckCache
      }
      
      // Adicionar timeout para evitar travamento
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos de timeout
      
      const jwtApiUrl = await this.getJWT_API_URL()
      
      const response = await fetch(`${jwtApiUrl}/auth/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        // Se for erro 401 (não autorizado), o token é inválido
        if (response.status === 401) {
          throw new Error('Token inválido')
        }
        // Para outros erros, não fazer logout automático
        console.warn('Erro na verificação do token:', response.status)
        const result = {
          success: true,
          user: {
            email: 'admin',
            name: 'Administrador',
            roles: ['administrator']
          }
        }
        // Cache do resultado
        tokenCheckCache = result
        lastTokenCheck = now
        return result
      }

      const userData = await response.json()
      
      // Simple JWT Login retorna em data.user
      const user = userData.user || userData
      
      // Buscar informações completas do usuário via API REST
      const userInfo = await this.getCurrentUserInfo(token)
      
      const result = {
        success: true,
        user: {
          id: userInfo.id,
          email: userInfo.email || user.user_email || user.email || 'admin',
          name: userInfo.name || user.display_name || user.name || 'Administrador',
          roles: userInfo.roles || ['administrator']
        }
      }
      
      // Cache do resultado
      tokenCheckCache = result
      lastTokenCheck = now
      
      return result
    } catch (error) {
      console.error('Erro na verificação do token:', error)
      if (error.name === 'AbortError') {
        throw new Error('Timeout na verificação do token')
      }
      // Para erros de rede, não fazer logout automático
      if (error.message.includes('fetch')) {
        console.warn('Erro de rede na verificação do token, mantendo sessão')
        const result = {
          success: true,
          user: {
            email: 'admin',
            name: 'Administrador',
            roles: ['administrator']
          }
        }
        // Cache do resultado
        tokenCheckCache = result
        lastTokenCheck = Date.now()
        return result
      }
      throw error
    }
  },

  // Logout
  adminLogout() {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminTokenExpiry')
    
    // Limpar cache de verificação de token
    lastTokenCheck = 0
    tokenCheckCache = null
    
    // Disparar evento customizado para notificar outros componentes
    window.dispatchEvent(new CustomEvent('authStateChanged', { 
      detail: { isAuthenticated: false, user: null } 
    }))
    
    return { success: true }
  },

  // Verificar se o token expirou
  isTokenExpired() {
    const expiry = localStorage.getItem('adminTokenExpiry')
    console.log('=== DEBUG isTokenExpired ===')
    console.log('Expiry no localStorage:', expiry)
    
    if (!expiry) {
      console.log('Nenhuma expiração encontrada, retornando true (expirado)')
      return true
    }
    
    const expiryTime = parseInt(expiry)
    const currentTime = Date.now()
    const isExpired = currentTime > expiryTime
    
    console.log('Expiry time:', expiryTime)
    console.log('Current time:', currentTime)
    console.log('Is expired:', isExpired)
    console.log('========================')
    
    return isExpired
  },

  // Buscar informações completas do usuário atual (incluindo roles)
  async getCurrentUserInfo(token) {
    try {
      console.log('=== BUSCANDO INFORMAÇÕES DO USUÁRIO ATUAL ===')
      
      // Buscar informações do usuário atual via API REST do WordPress
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/wp/v2')}/users/me?context=edit`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.error('Erro ao buscar informações do usuário:', response.status)
        throw new Error(`Erro ao buscar informações do usuário: ${response.status}`)
      }

      const userInfo = await response.json()
      console.log('Informações do usuário obtidas:', userInfo)
      console.log('Roles do usuário:', userInfo.roles)
      
      return {
        id: userInfo.id,
        username: userInfo.slug || userInfo.username,
        name: userInfo.name,
        email: userInfo.email,
        roles: userInfo.roles || ['subscriber'],
        registered: userInfo.registered,
        status: userInfo.status || 'active',
        avatar_urls: userInfo.avatar_urls
      }
    } catch (error) {
      console.error('Erro ao buscar informações do usuário atual:', error)
      // Retornar informações básicas como fallback
      return {
        id: 1,
        username: 'admin',
        name: 'Administrador',
        email: 'admin@dirhect.com',
        roles: ['administrator'],
        registered: new Date().toISOString(),
        status: 'active',
        avatar_urls: { '96': null }
      }
    }
  },

  // Buscar o ID da categoria roadmap
  async getRoadmapCategoryId() {
    if (roadmapCategoryId !== null) {
      return roadmapCategoryId
    }

    try {
      const response = await fetch(`${WORDPRESS_API_URL}/categories?slug=roadmap`)
      
      if (!response.ok) {
        console.warn('Erro ao buscar categoria roadmap')
        return null
      }

      const categories = await response.json()
      if (categories.length > 0) {
        roadmapCategoryId = categories[0].id
        return roadmapCategoryId
      }
    } catch (error) {
      console.warn('Erro ao buscar categoria roadmap:', error)
    }

    roadmapCategoryId = null
    return null
  },

  // Buscar o ID da categoria banco-conhecimento
  async getKnowledgeCategoryId() {
    if (knowledgeCategoryId !== null) {
      return knowledgeCategoryId
    }

    try {
      const response = await fetch(`${WORDPRESS_API_URL}/categories?slug=banco-conhecimento`)
      
      if (!response.ok) {
        console.warn('Erro ao buscar categoria banco-conhecimento')
        return null
      }

      const categories = await response.json()
      if (categories.length > 0) {
        knowledgeCategoryId = categories[0].id
        return knowledgeCategoryId
      }
    } catch (error) {
      console.warn('Erro ao buscar categoria banco-conhecimento:', error)
    }

    knowledgeCategoryId = null
    return null
  },

  // Buscar posts do blog (com opção de excluir categorias)
  async getPosts(params = {}) {
    try {
      const searchParams = new URLSearchParams({
        per_page: params.perPage || 10,
        page: params.page || 1,
        _embed: true, // Include embedded resources like featured media and author
        ...params
      })

      // Se não foi especificado para excluir categorias, excluir roadmap e banco-conhecimento por padrão
      if (!params.includeAllCategories) {
        // Buscar IDs das categorias para excluir
        const roadmapId = await this.getRoadmapCategoryId()
        const knowledgeId = await this.getKnowledgeCategoryId()
        
        // Excluir categorias roadmap e banco-conhecimento
        const excludeCategories = []
        if (roadmapId) excludeCategories.push(roadmapId)
        if (knowledgeId) excludeCategories.push(knowledgeId)
        
        if (excludeCategories.length > 0) {
          searchParams.set('categories_exclude', excludeCategories.join(','))
        }
      }

      const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const posts = await response.json()
      
      // Transformar os dados para o formato esperado pelo componente
      return posts.map(post => ({
        id: post.id,
        title: { rendered: post.title.rendered },
        excerpt: { rendered: post.excerpt.rendered },
        content: { rendered: post.content.rendered },
        date: post.date,
        modified: post.modified,
        author: this.getAuthorName(post),
        featured_media: this.getFeaturedImage(post),
        categories: this.getCategories(post),
        categoryIds: this.getCategoryIds(post),
        tags: this.getTags(post),
        slug: post.slug,
        link: post.link,
        readTime: this.calculateReadTime(post.content.rendered)
      }))
    } catch (error) {
      console.error('Erro ao buscar posts do WordPress:', error)
      // Retorna posts estáticos como fallback
      return this.getFallbackPosts()
    }
  },

  // Buscar um post específico por ID
  async getPost(id) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/posts/${id}?_embed=true`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const post = await response.json()
      
      return {
        id: post.id,
        title: { rendered: post.title.rendered },
        excerpt: { rendered: post.excerpt.rendered },
        content: { rendered: post.content.rendered },
        date: post.date,
        modified: post.modified,
        author: this.getAuthorName(post),
        featured_media: this.getFeaturedImage(post),
        categories: this.getCategories(post),
        categoryIds: this.getCategoryIds(post),
        tags: this.getTags(post),
        slug: post.slug,
        link: post.link,
        readTime: this.calculateReadTime(post.content.rendered)
      }
    } catch (error) {
      console.error('Erro ao buscar post do WordPress:', error)
      throw error
    }
  },

  // Buscar posts relacionados por categoria
  async getRelatedPosts(postId, categoryIds, limit = 3) {
    try {
      if (!categoryIds || categoryIds.length === 0) {
        return []
      }

      const searchParams = new URLSearchParams({
        per_page: limit + 1, // +1 para excluir o post atual se aparecer
        categories: categoryIds[0], // Usar o primeiro ID da categoria
        exclude: postId,
        _embed: true
      })

      const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams}`)
      
      if (!response.ok) {
        console.warn('Erro ao buscar posts relacionados, usando fallback')
        return []
      }

      const posts = await response.json()
      
      // Transformar os dados e filtrar o post atual
      const relatedPosts = posts
        .filter(post => post.id !== postId)
        .slice(0, limit)
        .map(post => ({
          id: post.id,
          title: { rendered: post.title.rendered },
          excerpt: { rendered: post.excerpt.rendered },
          content: { rendered: post.content.rendered },
          date: post.date,
          modified: post.modified,
          author: this.getAuthorName(post),
          featured_media: this.getFeaturedImage(post),
          categories: this.getCategories(post),
          categoryIds: this.getCategoryIds(post),
          tags: this.getTags(post),
          slug: post.slug,
          link: post.link,
          readTime: this.calculateReadTime(post.content.rendered)
        }))

      return relatedPosts
    } catch (error) {
      console.error('Erro ao buscar posts relacionados:', error)
      return []
    }
  },

  // Buscar categorias
  async getCategories() {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/categories`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar categorias do WordPress:', error)
      return []
    }
  },

  // Extrair nome do autor
  getAuthorName(post) {
    if (post._embedded?.author?.[0]?.name) {
      return post._embedded.author[0].name
    }
    return 'Equipe Dirhect'
  },

  // Extrair imagem destacada
  getFeaturedImage(post) {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url
    }
    // Imagem padrão como fallback
    return '/images/blog/news.webp'
  },

  // Extrair categorias (nomes)
  getCategories(post) {
    if (post._embedded?.['wp:term']?.[0]) {
      return post._embedded['wp:term'][0].map(cat => cat.name)
    }
    return ['Geral']
  },

  // Extrair IDs das categorias
  getCategoryIds(post) {
    if (post._embedded?.['wp:term']?.[0]) {
      return post._embedded['wp:term'][0].map(cat => cat.id)
    }
    if (post.categories && Array.isArray(post.categories)) {
      return post.categories
    }
    return []
  },

  // Extrair tags
  getTags(post) {
    if (post._embedded?.['wp:term']?.[1]) {
      return post._embedded['wp:term'][1].map(tag => tag.name)
    }
    return []
  },

  // Calcular tempo de leitura
  calculateReadTime(content) {
    const wordsPerMinute = 200
    const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const wordCount = text.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min`
  },

  // Buscar posts APENAS da categoria roadmap (para a página de roadmap)
  async getRoadmapPosts(params = {}) {
    try {
      // Buscar ID da categoria roadmap
      const roadmapId = await this.getRoadmapCategoryId()
      
      if (!roadmapId) {
        console.warn('Categoria roadmap não encontrada')
        return this.getFallbackRoadmapPosts()
      }

      const searchParams = new URLSearchParams({
        per_page: params.perPage || 50,
        page: params.page || 1,
        categories: roadmapId, // INCLUIR apenas posts da categoria roadmap
        _embed: true,
        orderby: 'date',
        order: 'desc',
        ...params
      })

      const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const posts = await response.json()
      
      // Transformar os dados para o formato esperado pelo roadmap
      return posts.map(post => {
        // Extrair datas e formatá-las corretamente
        const estimatedDateRaw = this.extractCustomField(post, 'roadmap_estimated_date')
        const launchedDateRaw = this.extractCustomField(post, 'roadmap_launched_date')
        
        const estimatedDate = this.formatACFDate(estimatedDateRaw) || post.date
        const launchedDate = this.formatACFDate(launchedDateRaw)
        
        // Extrair funcionalidades e processar
        const featuresRaw = this.extractCustomField(post, 'roadmap_features')
        const features = this.processFeaturesList(featuresRaw)
        
        // Extrair outros campos com valores padrão inteligentes
        const status = this.extractCustomField(post, 'roadmap_status') || 'planned'
        const priority = this.extractCustomField(post, 'roadmap_priority') || 'medium'
        const quarter = this.extractCustomField(post, 'roadmap_quarter') || this.getQuarterFromDate(post.date)
        const category = this.extractCustomField(post, 'roadmap_category') || 'Produto'
        const votes = parseInt(this.extractCustomField(post, 'roadmap_votes')) || 0

        return {
          id: post.id,
          title: post.title.rendered,
          description: this.stripHtml(post.excerpt.rendered) || this.stripHtml(post.content.rendered).substring(0, 200) + '...',
          content: post.content.rendered,
          date: post.date,
          modified: post.modified,
          author: this.getAuthorName(post),
          featured_media: this.getFeaturedImage(post),
          categories: this.getCategories(post),
          categoryIds: this.getCategoryIds(post),
          tags: this.getTags(post),
          slug: post.slug,
          link: post.link,
          // Campos específicos do roadmap (com tratamento robusto)
          status: status,
          priority: priority,
          quarter: quarter,
          category: category,
          votes: votes,
          estimatedDate: estimatedDate,
          launchedDate: launchedDate,
          features: features
        }
      })
    } catch (error) {
      console.error('Erro ao buscar posts do roadmap:', error)
      return this.getFallbackRoadmapPosts()
    }
  },

  // Buscar um post específico do banco de conhecimento por ID
  async getKnowledgePost(id) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/posts/${id}?_embed=true`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const post = await response.json()
      
      // Verificar se o post pertence à categoria banco-conhecimento
      const knowledgeId = await this.getKnowledgeCategoryId()
      if (knowledgeId && !post.categories.includes(knowledgeId)) {
        throw new Error('Post não pertence ao banco de conhecimento')
      }
      
      // Extrair campos específicos do conhecimento
      const category = this.extractCustomField(post, 'knowledge_category') || 'Tutorial'
      const featured = this.extractCustomField(post, 'knowledge_featured') === '1' || false
      const views = parseInt(this.extractCustomField(post, 'knowledge_views')) || 0
      const tags = this.extractCustomField(post, 'knowledge_tags')
      const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

      return {
        id: post.id,
        title: post.title.rendered,
        excerpt: this.stripHtml(post.excerpt.rendered) || this.stripHtml(post.content.rendered).substring(0, 200) + '...',
        content: post.content.rendered,
        date: post.date,
        modified: post.modified,
        author: this.getAuthorName(post),
        featured_media: this.getFeaturedImage(post),
        categories: this.getCategories(post),
        categoryIds: this.getCategoryIds(post),
        tags: this.getTags(post),
        slug: post.slug,
        link: post.link,
        // Campos específicos do conhecimento
        category: category,
        featured: featured,
        views: views,
        tags: tagsArray
      }
    } catch (error) {
      console.error('Erro ao buscar post do banco de conhecimento:', error)
      throw error
    }
  },

  // Buscar um post específico do banco de conhecimento por slug
  async getKnowledgePostBySlug(slug) {
    try {
      const knowledgeId = await this.getKnowledgeCategoryId()
      
      if (!knowledgeId) {
        throw new Error('Categoria banco-conhecimento não encontrada')
      }

      const searchParams = new URLSearchParams({
        slug: slug,
        categories: knowledgeId,
        _embed: true
      })

      const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const posts = await response.json()
      
      if (posts.length === 0) {
        throw new Error('Post não encontrado')
      }

      const post = posts[0]
      
      // Extrair campos específicos do conhecimento
      const category = this.extractCustomField(post, 'knowledge_category') || 'Tutorial'
      const featured = this.extractCustomField(post, 'knowledge_featured') === '1' || false
      const views = parseInt(this.extractCustomField(post, 'knowledge_views')) || 0
      const tags = this.extractCustomField(post, 'knowledge_tags')
      const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

      return {
        id: post.id,
        title: post.title.rendered,
        excerpt: this.stripHtml(post.excerpt.rendered) || this.stripHtml(post.content.rendered).substring(0, 200) + '...',
        content: post.content.rendered,
        date: post.date,
        modified: post.modified,
        author: this.getAuthorName(post),
        featured_media: this.getFeaturedImage(post),
        categories: this.getCategories(post),
        categoryIds: this.getCategoryIds(post),
        tags: this.getTags(post),
        slug: post.slug,
        link: post.link,
        // Campos específicos do conhecimento
        category: category,
        featured: featured,
        views: views,
        tags: tagsArray
      }
    } catch (error) {
      console.error('Erro ao buscar post do banco de conhecimento por slug:', error)
      throw error
    }
  },

  // Buscar posts relacionados do banco de conhecimento
  async getRelatedKnowledgePosts(postId, categoryIds, limit = 3) {
    try {
      if (!categoryIds || categoryIds.length === 0) {
        return []
      }

      const knowledgeId = await this.getKnowledgeCategoryId()
      if (!knowledgeId) {
        return []
      }

      const searchParams = new URLSearchParams({
        per_page: limit + 1, // +1 para excluir o post atual se aparecer
        categories: knowledgeId, // Apenas posts do banco de conhecimento
        exclude: postId,
        _embed: true
      })

      const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams}`)
      
      if (!response.ok) {
        console.warn('Erro ao buscar posts relacionados, usando fallback')
        return []
      }

      const posts = await response.json()
      
      // Transformar os dados e filtrar o post atual
      const relatedPosts = posts
        .filter(post => post.id !== postId)
        .slice(0, limit)
        .map(post => {
          // Extrair campos específicos do conhecimento
          const category = this.extractCustomField(post, 'knowledge_category') || 'Tutorial'
          const featured = this.extractCustomField(post, 'knowledge_featured') === '1' || false
          const views = parseInt(this.extractCustomField(post, 'knowledge_views')) || 0
          const tags = this.extractCustomField(post, 'knowledge_tags')
          const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

          return {
            id: post.id,
            title: post.title.rendered,
            excerpt: this.stripHtml(post.excerpt.rendered) || this.stripHtml(post.content.rendered).substring(0, 200) + '...',
            content: post.content.rendered,
            date: post.date,
            modified: post.modified,
            author: this.getAuthorName(post),
            featured_media: this.getFeaturedImage(post),
            categories: this.getCategories(post),
            categoryIds: this.getCategoryIds(post),
            tags: this.getTags(post),
            slug: post.slug,
            link: post.link,
            // Campos específicos do conhecimento
            category: category,
            featured: featured,
            views: views,
            tags: tagsArray
          }
        })

      return relatedPosts
    } catch (error) {
      console.error('Erro ao buscar posts relacionados do banco de conhecimento:', error)
      return []
    }
  },

  // Buscar posts APENAS da categoria banco-conhecimento (para a página de conhecimento)
  async getKnowledgePosts(params = {}) {
    try {
      // Buscar ID da categoria banco-conhecimento
      const knowledgeId = await this.getKnowledgeCategoryId()
      
      if (!knowledgeId) {
        console.warn('Categoria banco-conhecimento não encontrada')
        return this.getFallbackKnowledgePosts()
      }

      const searchParams = new URLSearchParams({
        per_page: params.per_page || 50,
        page: params.page || 1,
        categories: knowledgeId, // INCLUIR apenas posts da categoria banco-conhecimento
        _embed: true,
        orderby: 'date',
        order: 'desc',
        ...params
      })

      const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const posts = await response.json()
      
      // Transformar os dados para o formato esperado pelo conhecimento
      return posts.map(post => {
        // Extrair campos específicos do conhecimento
        const category = this.extractCustomField(post, 'knowledge_category') || 'Tutorial'
        const featured = this.extractCustomField(post, 'knowledge_featured') === '1' || false
        const views = parseInt(this.extractCustomField(post, 'knowledge_views')) || 0
        const tags = this.extractCustomField(post, 'knowledge_tags')
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

        return {
          id: post.id,
          title: post.title.rendered,
          excerpt: this.stripHtml(post.excerpt.rendered) || this.stripHtml(post.content.rendered).substring(0, 200) + '...',
          content: post.content.rendered,
          date: post.date,
          modified: post.modified,
          author: this.getAuthorName(post),
          featured_media: this.getFeaturedImage(post),
          categories: this.getCategories(post),
          categoryIds: this.getCategoryIds(post),
          tags: this.getTags(post),
          slug: post.slug,
          link: post.link,
          // Campos específicos do conhecimento
          category: category,
          featured: featured,
          views: views,
          tags: tagsArray
        }
      })
    } catch (error) {
      console.error('Erro ao buscar posts do banco de conhecimento:', error)
      return this.getFallbackKnowledgePosts()
    }
  },

  // Extrair custom fields do WordPress
  extractCustomField(post, fieldName) {
    // Tentar extrair de meta fields
    if (post.meta && post.meta[fieldName]) {
      return post.meta[fieldName]
    }
    
    // Tentar extrair de ACF (Advanced Custom Fields)
    if (post.acf && post.acf[fieldName]) {
      return post.acf[fieldName]
    }
    
    return null
  },

  // Formatar data do ACF para formato padrão
  formatACFDate(dateValue) {
    if (!dateValue) return null
    
    // Se já está no formato correto (YYYY-MM-DD)
    if (dateValue.includes('-')) {
      return dateValue
    }
    
    // Se está no formato YYYYMMDD (formato do ACF)
    if (dateValue.length === 8 && !isNaN(dateValue)) {
      const year = dateValue.substring(0, 4)
      const month = dateValue.substring(4, 6)
      const day = dateValue.substring(6, 8)
      return `${year}-${month}-${day}`
    }
    
    return dateValue
  },

  // Processar lista de funcionalidades
  processFeaturesList(featuresString) {
    if (!featuresString || featuresString.trim() === '') {
      return ['Funcionalidade em desenvolvimento']
    }
    
    const features = featuresString.split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0)
    
    return features.length > 0 ? features : ['Funcionalidade em desenvolvimento']
  },

  // Gerar quarter baseado na data
  getQuarterFromDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    
    if (month <= 3) return `Q1 ${year}`
    if (month <= 6) return `Q2 ${year}`
    if (month <= 9) return `Q3 ${year}`
    return `Q4 ${year}`
  },

  // Função para remover HTML
  stripHtml(html) {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  },

  // Posts de roadmap como fallback
  getFallbackRoadmapPosts() {
    return [
      {
        id: 1,
        title: "IA Generativa para Descrições de Cargos",
        description: "Implementação de inteligência artificial para gerar automaticamente descrições detalhadas de cargos baseadas em competências e responsabilidades.",
        status: "completed",
        priority: "high",
        quarter: "Q4 2023",
        category: "IA & Automação",
        votes: 247,
        estimatedDate: "2023-12-15",
        launchedDate: "2023-12-10",
        features: [
          "Geração automática de descrições",
          "Análise de mercado integrada",
          "Templates personalizáveis",
          "Integração com banco de dados de competências"
        ]
      },
      {
        id: 2,
        title: "Dashboard Analytics Avançado",
        description: "Nova interface de analytics com métricas em tempo real, previsões de turnover e insights baseados em machine learning.",
        status: "in-progress",
        priority: "high",
        quarter: "Q1 2024",
        category: "Analytics",
        votes: 189,
        estimatedDate: "2024-03-30",
        features: [
          "Métricas em tempo real",
          "Previsões de turnover",
          "Alertas inteligentes",
          "Relatórios customizáveis"
        ]
      },
      {
        id: 3,
        title: "Integração com Microsoft Teams",
        description: "Integração nativa com Microsoft Teams para onboarding, comunicação interna e gestão de documentos.",
        status: "planned",
        priority: "medium",
        quarter: "Q2 2024",
        category: "Integrações",
        votes: 156,
        estimatedDate: "2024-06-15",
        features: [
          "Onboarding via Teams",
          "Notificações automáticas",
          "Compartilhamento de documentos",
          "Chatbot integrado"
        ]
      }
    ]
  },

  // Posts de banco de conhecimento como fallback
  getFallbackKnowledgePosts() {
    return [
      {
        id: 1,
        title: "Como configurar a Admissão Digital",
        excerpt: "Guia completo para configurar e personalizar o processo de admissão digital na plataforma Dirhect, incluindo templates e fluxos de trabalho.",
        content: "Este guia detalhado mostra como configurar a funcionalidade de Admissão Digital na plataforma Dirhect. Você aprenderá a criar templates personalizados, configurar fluxos de aprovação e integrar com sistemas externos. O processo inclui configuração de documentos obrigatórios, validação automática e notificações personalizadas.",
        date: "2024-12-15T10:00:00",
        category: "Tutorial",
        featured: true,
        views: 1250,
        tags: ["admissão", "configuração", "tutorial", "onboarding"],
        slug: "como-configurar-admissao-digital",
        author: "Equipe Dirhect"
      },
      {
        id: 2,
        title: "Melhores práticas para gestão de benefícios",
        excerpt: "Descubra as estratégias mais eficientes para gerenciar benefícios corporativos e aumentar a satisfação dos colaboradores.",
        content: "Este artigo apresenta as melhores práticas para gestão de benefícios corporativos, incluindo estratégias de comunicação, análise de custos-benefícios e implementação de programas flexíveis. Abordamos temas como saúde, alimentação, transporte e benefícios educacionais.",
        date: "2024-12-10T14:30:00",
        category: "Melhores Práticas",
        featured: false,
        views: 890,
        tags: ["benefícios", "gestão", "colaboradores", "satisfação"],
        slug: "melhores-praticas-gestao-beneficios",
        author: "Ana Costa"
      },
      {
        id: 3,
        title: "FAQ: Problemas comuns na integração de sistemas",
        excerpt: "Respostas para as dúvidas mais frequentes sobre integração de sistemas ERP e RH com a plataforma Dirhect.",
        content: "Este FAQ aborda os problemas mais comuns encontrados durante a integração de sistemas ERP e RH com a plataforma Dirhect. Inclui soluções para problemas de sincronização, mapeamento de dados e configuração de APIs.",
        date: "2024-12-05T09:15:00",
        category: "FAQ",
        featured: false,
        views: 567,
        tags: ["integração", "ERP", "API", "sincronização"],
        slug: "faq-problemas-integracao-sistemas",
        author: "Carlos Ferreira"
      },
      {
        id: 4,
        title: "Dicas para otimizar o Portal RH",
        excerpt: "Dicas práticas para melhorar a experiência dos usuários no Portal RH e aumentar o engajamento dos colaboradores.",
        content: "Este artigo oferece dicas práticas para otimizar o Portal RH, incluindo personalização da interface, configuração de notificações, criação de conteúdo relevante e estratégias para aumentar o engajamento dos colaboradores.",
        date: "2024-12-01T16:20:00",
        category: "Dicas",
        featured: true,
        views: 1100,
        tags: ["portal", "UX", "engajamento", "colaboradores"],
        slug: "dicas-otimizar-portal-rh",
        author: "Equipe Dirhect"
      },
      {
        id: 5,
        title: "Troubleshooting: Erros de autenticação",
        excerpt: "Guia para resolver problemas comuns de autenticação e login na plataforma Dirhect.",
        content: "Este guia de troubleshooting aborda os problemas mais comuns de autenticação na plataforma Dirhect, incluindo reset de senhas, problemas de SSO, bloqueios de conta e configurações de segurança.",
        date: "2024-11-28T11:45:00",
        category: "Troubleshooting",
        featured: false,
        views: 445,
        tags: ["autenticação", "login", "segurança", "SSO"],
        slug: "troubleshooting-erros-autenticacao",
        author: "Ana Costa"
      }
    ]
  },

  // Posts estáticos como fallback (sem categoria roadmap)
  getFallbackPosts() {
    return [
      {
        id: 10,
        title: { rendered: 'Como Calcular o Valor Correto do Vale-Transporte e do Auxílio-Alimentação: Um Guia Completo para Empresas e Colaboradores' },
        excerpt: { rendered: 'No contexto corporativo, calcular corretamente benefícios como vale-transporte e auxílio-alimentação é essencial para garantir o bem-estar dos colaboradores e a conformidade com a legislação.' },
        content: { rendered: '<p>No contexto corporativo, calcular corretamente benefícios como vale-transporte e auxílio-alimentação é essencial para garantir o bem-estar dos colaboradores e a conformidade com a legislação. Esses benefícios são um <strong>diferencial competitivo para atração e retenção de talentos</strong>, além de impactarem diretamente na motivação e na produtividade. Neste guia completo, abordaremos de forma detalhada como calcular o valor correto do vale-transporte e do auxílio-alimentação, explorando as nuances legais e as melhores práticas.</p><h2>1. O Que São o Vale-Transporte e o Auxílio-Alimentação?</h2><h3>Entenda o Vale-Transporte</h3><p>O vale-transporte é um <strong>benefício obrigatório previsto pela legislação brasileira</strong>, que tem como objetivo cobrir o custo de deslocamento do colaborador entre sua residência e o local de trabalho. Segundo a Lei 7.418/1985, é responsabilidade da empresa fornecer esse benefício, descontando <strong>até 6% do salário base</strong> do trabalhador.</p><h3>O Que É o Auxílio-Alimentação?</h3><p>Já o auxílio-alimentação, seja por meio de vale-refeição ou vale-alimentação, tem <strong>caráter opcional</strong>, mas é amplamente oferecido pelas empresas como benefício adicional. Esse benefício pode ser parte do <strong>Programa de Alimentação do Trabalhador (PAT)</strong>, que proporciona incentivos fiscais às empresas participantes.</p><h2>2. Vale-Transporte: Passo a Passo para o Cálculo do Valor Correto</h2><p><strong>Passo 1: Identifique o Custo Total das Tarifas</strong><br />Para calcular o vale-transporte, é necessário somar as tarifas de transporte público que o colaborador utiliza diariamente para ir e voltar do trabalho. Esse valor deve ser multiplicado pelos dias úteis do mês.</p><p><strong>Passo 2: Calcule o Desconto de 6% do Salário Base</strong><br />A legislação permite que o empregador desconte até 6% do salário base do colaborador para o financiamento do vale-transporte. Para entender melhor a forma de cálculo desse desconto, consulte o site oficial do <a href="https://www.gov.br/trabalho-e-emprego" target="_blank" rel="noopener noreferrer">Ministério do Trabalho e Previdência</a>.</p><blockquote class="wp-block-quote"><p><strong>Exemplo Prático de Cálculo do Vale-Transporte:</strong><br />Imagine que o colaborador utilize transporte público e que a tarifa seja de R$ 5,00 por trecho. Se ele trabalha em média 22 dias úteis por mês, seu custo total mensal com transporte será: <strong>5 x 2 x 22 = R$ 220,00</strong>.<br />Se o salário base do colaborador for de R$ 2.000, o desconto de 6% corresponderá a: <strong>2.000 x 0,06 = R$ 120,00</strong>.<br />Nesse caso, a empresa cobrirá a diferença entre o custo total do transporte (R$ 220,00) e o valor descontado do colaborador (R$ 120,00), ou seja, <strong>R$ 100,00</strong> pagos pela organização.</p></blockquote><h2>3. Auxílio-Alimentação: Como Determinar o Valor Correto?</h2><p><strong>Passo 1: Considere o Custo Médio das Refeições na Região</strong><br />Para definir o valor do auxílio-alimentação, é importante avaliar o custo médio das refeições na região onde o colaborador trabalha. Muitas empresas conduzem pesquisas de mercado ou utilizam dados de sites especializados, como a <a href="https://www.abbt.org.br" target="_blank" rel="noopener noreferrer">Associação Brasileira das Empresas de Benefícios ao Trabalhador (ABBT)</a>, que oferece informações úteis sobre o custo médio das refeições in várias cidades do Brasil.</p><p><strong>Passo 2: Decida a Forma de Concessão do Benefício</strong><br />O auxílio-alimentação pode ser oferecido por meio de vale-refeição, usado em restaurantes, ou vale-alimentação, que permite a compra de alimentos em supermercados. A escolha entre esses formatos pode depender das necessidades dos colaboradores e da localização do escritório.</p><p><strong>Passo 3: Cálculo do Benefício com Base no Programa de Alimentação do Trabalhador (PAT)</strong><br />O PAT permite que empresas forneçam o auxílio-alimentação <strong>sem incidência de encargos trabalhistas</strong>, como INSS e FGTS, desde que o benefício esteja registrado no programa. Consulte a <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/programa-de-alimentacao-do-trabalhador-pat" target="_blank" rel="noopener noreferrer">legislação do PAT</a> para entender como inscrever sua empresa e usufruir das vantagens fiscais.</p><h2>4. Comparando o Vale-Transporte e o Auxílio-Alimentação</h2><p>Ambos os benefícios impactam positivamente a rotina do colaborador e a cultura organizacional. O vale-transporte, por ser obrigatório, deve ser calculado cuidadosamente para evitar problemas legais. Já o auxílio-alimentação, apesar de opcional, pode ser um diferencial competitivo e traz benefícios fiscais através do PAT.</p><h2>5. Erros Comuns no Cálculo e Como Evitá-los</h2><ul><li><strong>Erro 1: Não Considerar o Custo Real do Transporte</strong> – Algumas empresas cometem o erro de calcular o vale-transporte com base em um valor fixo, sem considerar o custo real do trajeto do colaborador. Esse erro pode gerar insatisfação e falta de conformidade legal.</li><li><strong>Erro 2: Subestimar o Valor do Auxílio-Alimentação</strong> – Oferecer um valor de auxílio-alimentação abaixo do custo médio de uma refeição na região pode prejudicar a percepção do benefício. Realizar pesquisas periódicas sobre o custo de vida é essencial para ajustar o valor.</li></ul><h2>6. Ferramentas e Recursos Online para Auxiliar no Cálculo</h2><p>Existem diversas calculadoras online e ferramentas de gestão de benefícios que ajudam empresas a calcular o valor correto do vale-transporte e auxílio-alimentação. Ferramentas como a Calculadora de Benefícios do Portal RH e a <a href="https://www.gov.br" target="_blank" rel="noopener noreferrer">Calculadora do Ministério do Trabalho</a> são recursos úteis e de fácil acesso.</p><p>Calcular corretamente o vale-transporte e o auxílio-alimentação é um aspecto importante para o cumprimento da legislação trabalhista e para promover o bem-estar dos colaboradores. Utilizando as melhores práticas descritas neste guia, sua empresa poderá <strong>garantir um ambiente de trabalho mais harmonioso e evitar problemas legais</strong>.</p><p>Se deseja saber mais, confira o nosso <a href="/blog" target="_blank" rel="noopener noreferrer">Guia Completo de Benefícios para Colaboradores</a> e mantenha-se atualizado com as melhores práticas.</p>' },
        date: '2026-08-03T13:00:00',
        author: 'Equipe Dirhect',
        featured_media: '/images/blog/vale-transporte-alimentacao.png',
        categories: ['Dicas'],
        categoryIds: [2],
        tags: [],
        slug: 'como-calcular-valor-vale-transporte-auxilio-alimentacao',
        readTime: '5 min'
      },
      {
        id: 9,
        title: { rendered: 'Como Integrar o TOTVS RM com Outros Sistemas? Guia Completo para Conectar ERP, CRM e Mais' },
        excerpt: { rendered: 'A integração do TOTVS RM com outros sistemas é uma demanda crescente para empresas que buscam aprimorar a gestão de processos e informações. Conectar o TOTVS RM a ERPs, CRMs e outras plataformas aumenta a eficiência operacional.' },
        content: { rendered: '<p>A integração do TOTVS RM com outros sistemas é uma demanda crescente para empresas que buscam aprimorar a gestão de processos e informações. Conectar o TOTVS RM a sistemas de ERP, CRM, e outras plataformas facilita o fluxo de dados e <strong>aumenta a eficiência operacional</strong>. Neste artigo, você aprenderá como realizar a integração do TOTVS RM, quais métodos e APIs estão disponíveis e como a Ativary, um Canal Homologado TOTVS, pode ajudar na customização e personalização dessa solução.</p><h2>1. Por Que Integrar o TOTVS RM com Outros Sistemas É Importante para o Seu Negócio?</h2><p>A integração de sistemas é essencial para empresas que precisam centralizar informações e otimizar processos internos. O TOTVS RM é uma poderosa solução de gestão, mas seus benefícios são amplificados quando conectado a outros sistemas, como ERPs que gerenciam finanças e estoques ou CRMs que concentram dados de clientes. Essa integração permite que as empresas <strong>mantenham dados atualizados em tempo real, evitem redundâncias e melhorem a tomada de decisão</strong>.</p><h2>2. Como Funciona a Integração do TOTVS RM com Outros ERPs e CRMs?</h2><p>A TOTVS oferece diferentes maneiras de integrar o RM com outros sistemas, dependendo das necessidades da empresa e da arquitetura de TI. Aqui estão as principais opções:</p><ul><li><strong>APIs RESTful da TOTVS:</strong> A TOTVS desenvolveu APIs para o RM que facilitam a comunicação com outras plataformas. APIs RESTful são ideais para integrações em tempo real, sendo altamente configuráveis e permitindo o envio e recebimento de dados diretamente entre sistemas.</li><li><strong>Web Services SOAP:</strong> Outro método oferecido é a integração via SOAP, que garante compatibilidade com sistemas legados. SOAP é uma opção robusta, amplamente usada por grandes empresas, mas pode ser menos flexível em comparação com APIs RESTful.</li><li><strong>Middlewares e Conectores:</strong> Muitas empresas utilizam middlewares para gerenciar a troca de informações entre o TOTVS RM e outros sistemas, como SAP, Oracle ou Microsoft Dynamics. Esses conectores facilitam a transformação de dados, fazendo a "ponte" entre diferentes formatos e protocolos.</li></ul><p>Para entender melhor como a API TOTVS RM pode ser útil in sua estratégia de integração, confira a <a href="https://tdn.totvs.com" target="_blank" rel="noopener noreferrer">documentação oficial de APIs da TOTVS</a>.</p><h2>3. Quais São os Benefícios de Conectar o TOTVS RM com Sistemas de CRM?</h2><p>A integração com um sistema CRM, como o Salesforce ou o Zoho CRM, permite uma <strong>visão 360 graus dos clientes</strong>. Ao conectar o RM ao CRM, os dados de clientes se tornam acessíveis em toda a empresa, possibilitando:</p><ul><li>Sincronização automática de dados de clientes e contatos;</li><li>Atualização em tempo real sobre pedidos, contratos e histórico de atendimento;</li><li>Análise integrada para entender o ciclo de vida do cliente e personalizar o atendimento.</li></ul><p>Para empresas que buscam expertise em integrações complexas e personalizadas, a Ativary, um Canal Homologado TOTVS, oferece serviços especializados em implementação e integração entre o TOTVS RM e sistemas CRM de mercado. Com um time especializado, a Ativary desenvolve soluções sob medida, garantindo que a integração esteja alinhada às estratégias e demandas da empresa.</p><h2>4. Integração com ERPs e Sistemas Legados: Desafios e Soluções</h2><p>A integração com outros ERPs ou sistemas legados representa um desafio para empresas com infraestruturas complexas. No entanto, com APIs e conectores certos, é possível superar essas barreiras:</p><ul><li><strong>Adaptação de Dados:</strong> Sistemas legados frequentemente utilizam formatos de dados diferentes. A utilização de middlewares permite converter esses dados para o formato adequado do RM.</li><li><strong>Sincronização em Tempo Real:</strong> A utilização de APIs REST possibilita que o TOTVS RM receba e envie dados continuamente, criando um ambiente mais responsivo.</li><li><strong>Soluções de Data Mapping:</strong> Ao integrar sistemas diferentes, o mapeamento de dados torna-se crucial. Softwares especializados, como o Mulesoft ou Talend, podem auxiliar na estruturação dos dados de forma unificada.</li></ul><p>A Ativary também conta com uma equipe de consultoria para auxiliar empresas na integração entre o TOTVS RM e sistemas ERP robustos, garantindo que a troca de dados ocorra de forma fluida e segura.</p><h2>5. APIs Disponíveis para Integração com o TOTVS RM</h2><p>A TOTVS disponibiliza APIs específicas para integração com o RM. Algumas das APIs mais populares incluem:</p><ul><li><strong>API de Cadastro de Clientes:</strong> Permite atualizar e sincronizar informações de clientes entre o RM e outros sistemas.</li><li><strong>API de Faturamento:</strong> Facilitando a integração com sistemas financeiros para emitir faturas, realizar pagamentos e verificar o status financeiro.</li><li><strong>API de Compras e Estoques:</strong> Útil para integração com sistemas de controle de inventário e fornecedores, atualizando níveis de estoque em tempo real.</li></ul><p>Essas APIs são documentadas e mantidas pela TOTVS, e a Ativary possui vasta experiência na implementação e customização dessas integrações, garantindo que os processos de integração atendam às necessidades específicas dos clientes.</p><h2>6. Integração com o TOTVS RM Utilizando Ferramentas de Automação e RPA</h2><p>A automação de processos (RPA) vem ganhando popularidade para agilizar tarefas repetitivas entre sistemas. Com o TOTVS RM, é possível utilizar ferramentas de RPA, como o UiPath e Automation Anywhere, para:</p><ul><li>Automatizar transferências de dados entre o RM e o CRM;</li><li>Atualizar inventários e dados de fornecedores automaticamente;</li><li>Facilitar a geração de relatórios ao final do dia, eliminando a necessidade de atualizações manuais.</li></ul><p>Essa prática não só <strong>aumenta a eficiência operacional, mas também reduz erros</strong> e possibilita que a equipe se concentre em atividades estratégicas. A Ativary auxilia empresas na criação de fluxos de trabalho automatizados e personalizados, otimizando o uso de RPA com o TOTVS RM.</p><h2>7. Ativary: Um Parceiro de Confiança para Integrações com TOTVS RM</h2><p>A Ativary, como Canal Homologado TOTVS, tem vasta experiência na implementação, integração e personalização do TOTVS RM para empresas de diferentes segmentos. A Ativary oferece:</p><ul><li><strong>Consultoria Especializada:</strong> Uma equipe capacitada para analisar e definir as melhores estratégias de integração, considerando as particularidades de cada cliente.</li><li><strong>Customização de APIs:</strong> Desenvolvimento de APIs e adaptadores personalizados para atender demandas específicas.</li><li><strong>Treinamento e Suporte:</strong> Acompanhamento durante e após a implementação, garantindo que a equipe da empresa esteja preparada para aproveitar ao máximo o TOTVS RM.</li></ul><p>Para saber mais sobre a Ativary e suas soluções em integração com o TOTVS RM, acesse a <a href="https://ativary.com.br" target="_blank" rel="noopener noreferrer">Ativary Consultoria</a>.</p><h2>8. Exemplos Práticos: Como Empresas Estão Integrando o TOTVS RM em Suas Operações</h2><p>Empresas de diferentes setores já estão usufruindo da integração do TOTVS RM com seus sistemas legados e modernos. Confira alguns exemplos de integração:</p><ul><li><strong>Logística:</strong> Empresas de transporte conectam o TOTVS RM a seus sistemas de rastreamento de frotas e ERPs para gerenciar inventário e pedidos.</li><li><strong>Financeiro:</strong> Companhias do setor bancário e financeiro integram o TOTVS RM com plataformas de contabilidade para automatizar o fechamento de contas.</li><li><strong>Saúde:</strong> Hospitais e clínicas integram o TOTVS RM a sistemas de prontuário eletrônico e ERP, facilitando a gestão financeira e de suprimentos médicos.</li></ul><h2>9. Dicas para Uma Integração Bem-Sucedida com o TOTVS RM</h2><p>Para garantir que a integração do TOTVS RM com outros sistemas seja eficaz, siga estas dicas:</p><ul><li><strong>Planeje a Integração:</strong> Defina quais informações são essenciais para sincronizar e quais departamentos serão impactados.</li><li><strong>Escolha o Método Adequado:</strong> Selecione APIs ou middlewares com base nas necessidades e infraestrutura tecnológica.</li><li><strong>Testes Constantes:</strong> Realize testes de integração antes de implementar em produção para evitar falhas.</li><li><strong>Monitore e Ajuste:</strong> Acompanhe o desempenho da integração e faça ajustes para otimizar o fluxo de dados.</li></ul><p>A Ativary oferece um plano de integração estruturado que inclui testes e monitoramento contínuo, assegurando que a empresa atinja seus objetivos com o TOTVS RM.</p><h2>10. Próximos Passos: Implementando e Otimizando a Integração</h2><p>Após a implementação, a otimização é um processo contínuo. A Ativary oferece serviços de suporte para acompanhar a performance e realizar ajustes quando necessário. Com a ajuda da Ativary, as empresas podem continuar aprimorando seus processos integrados, assegurando que o TOTVS RM continue atendendo suas necessidades.</p><p>Integrar o TOTVS RM com outros sistemas, como ERPs e CRMs, é a <strong>estratégia poderosa para empresas que buscam consolidar informações e otimizar processos</strong>. Seja por meio de APIs, web services ou ferramentas de RPA, a integração permite um fluxo de dados mais ágil e confiável, essencial para empresas em crescimento.</p><p>A Ativary, com sua expertise em soluções TOTVS, pode guiar sua empresa em cada etapa do processo, desde o planejamento até a implementação e otimização.</p>' },
        date: '2026-08-03T12:00:00',
        author: 'Douglas Migliani Vitorello',
        featured_media: '/images/blog/totvs-rm-integracoes.png',
        categories: ['Estratégia'],
        categoryIds: [6],
        tags: [],
        slug: 'como-integrar-totvs-rm-com-outros-sistemas',
        readTime: '7 min'
      },
      {
        id: 8,
        title: { rendered: 'Como o RH pode Adotar IA e Automação para Otimizar Processos e Aumentar a Eficiência' },
        excerpt: { rendered: 'A área de Recursos Humanos (RH) sempre foi conhecida por seu papel central na gestão de pessoas. Com a crescente transformação digital, o RH se depara com a necessidade de otimizar processos e melhorar a eficiência.' },
        content: { rendered: '<p>A área de Recursos Humanos (RH) sempre foi conhecida por seu papel central na gestão de pessoas e no fortalecimento das relações de trabalho. Porém, com a crescente transformação digital, o RH se depara com a necessidade de <strong>otimizar processos e melhorar a eficiência</strong> para atender às exigências do mercado moderno. É aqui que a inteligência artificial (IA) e a automação entram como verdadeiras aliadas, permitindo ao RH realizar tarefas repetitivas com maior precisão, ganhar insights estratégicos e focar em atividades de maior valor para o desenvolvimento dos talentos da organização.</p><h2>1. Por Que a IA e a Automação São o Futuro do RH?</h2><p>Com a constante evolução das tecnologias, o RH passa a incorporar ferramentas digitais que facilitam a análise de dados e a execução de processos de forma mais ágil e estratégica. A IA é um exemplo notável dessa evolução, pois oferece suporte em atividades que vão desde a triagem de currículos até a análise de desempenho.</p><blockquote class="wp-block-quote"><p><strong>O Valor da IA no RH:</strong> Segundo a consultoria Gartner, empresas que adotam IA no RH conseguem reduzir o tempo de recrutamento em até 30%. <a href="https://www.gartner.com" target="_blank" rel="noopener noreferrer">Leia mais aqui</a>.</p></blockquote><h2>2. As Principais Áreas do RH que Podem Ser Otimizadas com IA e Automação</h2><p>A IA e a automação podem ser aplicadas em diversas áreas do RH, cada uma com benefícios específicos que ajudam na redução de erros, ganho de produtividade e maior eficiência.</p><h3>2.1. Recrutamento e Seleção</h3><p>A primeira área que se beneficia é o recrutamento, onde a IA pode agilizar a triagem de currículos e a pré-seleção de candidatos. Com a ajuda de algoritmos, é possível <strong>identificar perfis mais alinhados às vagas abertas</strong>, economizando tempo e aumentando a precisão.</p><p><strong>Sistemas de ATS Inteligentes:</strong> O uso de sistemas de Applicant Tracking System (ATS) com IA permite automatizar o recebimento e a análise de currículos, reduzindo o viés humano.</p><h3>2.2. Avaliação de Desempenho e Feedback Contínuo</h3><p>A análise de desempenho pode ser complexa e demandar muito tempo. Com a automação, é possível monitorar o desempenho dos colaboradores em tempo real, oferecendo feedbacks contínuos e mais assertivos.</p><p><strong>Exemplo Prático:</strong> Ferramentas como o Workday usam IA para fornecer relatórios automáticos de desempenho, melhorando o acompanhamento das metas dos colaboradores. <a href="https://www.workday.com" target="_blank" rel="noopener noreferrer">Conheça o Workday</a>.</p><h3>2.3. Treinamento e Desenvolvimento</h3><p>A IA pode auxiliar na criação de trilhas de aprendizagem personalizadas, adaptando o conteúdo às necessidades e ao estilo de aprendizagem de cada colaborador. Isso torna o processo de treinamento mais eficiente e alinhado com os objetivos da empresa.</p><p><strong>Aprendizado Adaptativo com IA:</strong> Plataformas como <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer">Coursera</a> já utilizam algoritmos de IA para sugerir cursos baseados no progresso e nas preferências do usuário, oferecendo uma experiência de aprendizado mais direcionada.</p><h2>3. A Automação no Gerenciamento de Tarefas Administrativas</h2><p>Tarefas administrativas, como o cálculo de folha de pagamento e o controle de ponto, podem ser facilmente automatizadas, <strong>liberando tempo para o RH se concentrar em questões estratégicas</strong>. Ferramentas que utilizam automação nesse sentido podem melhorar a precisão e reduzir o retrabalho.</p><p><strong>Exemplo de Software de Automação:</strong> Sistemas como o ADP oferecem módulos que automatizam desde a folha de pagamento até a gestão de benefícios, reduzindo significativamente o erro humano. <a href="https://www.adp.com" target="_blank" rel="noopener noreferrer">Saiba mais sobre o ADP</a>.</p><h2>4. A Importância da Transparência e da Ética na IA Aplicada ao RH</h2><p>Ao adotar IA e automação, é fundamental que o RH também considere questões éticas, como a transparência nos processos e o impacto na privacidade dos colaboradores. Um <strong>uso ético da tecnologia</strong> é essencial para evitar discriminações e garantir a equidade nas decisões.</p><p><strong>Garantindo a Ética na IA:</strong> Instituições como a ISO oferecem diretrizes para a implementação de IA ética no ambiente de trabalho. <a href="https://www.iso.org" target="_blank" rel="noopener noreferrer">Acesse as diretrizes da ISO</a>.</p><h2>5. Vantagens da IA e da Automação no RH</h2><p>A adoção de IA e automação no RH traz diversos benefícios. Entre eles estão a maior precisão, agilidade na tomada de decisões e a liberação de tempo para o foco em ações mais estratégicas.</p><ul><li><strong>Redução de Custos:</strong> Processos automatizados diminuem o uso de recursos e o tempo gasto em tarefas repetitivas.</li><li><strong>Aumento da Produtividade:</strong> Equipes conseguem concentrar-se em atividades estratégicas e criativas.</li><li><strong>Maior Precisão e Menos Erros:</strong> A automação reduz erros manuais, especialmente em processos como folha de pagamento e análise de dados.</li></ul><h2>6. Passos Práticos para Implementar IA e Automação no RH</h2><p>Para empresas que desejam iniciar o uso de IA e automação no RH, alguns passos básicos podem facilitar a implementação dessas tecnologias.</p><p><strong>6.1. Avaliação das Necessidades:</strong> É fundamental entender quais áreas do RH precisam de melhorias e como a tecnologia pode ajudar a atender a essas necessidades. Um diagnóstico inicial pode identificar as prioridades.</p><p><strong>6.2. Escolha das Ferramentas Certas:</strong> Existem várias soluções de IA e automação no mercado. A escolha das ferramentas adequadas dependerá do tamanho da empresa, do orçamento disponível e dos objetivos do RH.</p><p><strong>6.3. Treinamento e Capacitação da Equipe:</strong> Para que a tecnologia seja utilizada da melhor maneira, o RH precisa preparar seus colaboradores. É essencial investir em treinamentos que capacitem a equipe.</p><h2>7. Como Manter a Eficiência e Monitorar Resultados</h2><p>Após implementar IA e automação, é essencial que o RH acompanhe os resultados e faça ajustes conforme necessário. <strong>Avaliar os impactos da tecnologia e monitorar os KPIs (Key Performance Indicators)</strong> ajuda a garantir que a automação está trazendo os benefícios esperados.</p><h2>8. Desafios e Considerações para o Futuro do RH com IA</h2><p>A implementação de IA e automação no RH também apresenta desafios. A adaptação da equipe, a necessidade de investimentos em tecnologia e as questões de privacidade são algumas das principais considerações.</p><p><strong>Adaptação Cultural:</strong> Muitas vezes, os colaboradores resistem a mudanças tecnológicas, o que requer uma estratégia de comunicação eficaz para adaptar a equipe à nova realidade.</p><p>A adoção de IA e automação no RH é uma tendência que deve se consolidar nos próximos anos. Com a possibilidade de otimizar processos, melhorar a precisão e liberar tempo para atividades mais estratégicas, <strong>a tecnologia se torna uma aliada poderosa para transformar a forma como o RH opera</strong>. A chave para o sucesso é adotar uma abordagem gradual e ética, acompanhada de treinamento e monitoramento dos resultados.</p><p>O futuro do RH está cada vez mais tecnológico, e as empresas que adotarem essas ferramentas cedo poderão obter uma <strong>vantagem competitiva significativa</strong>.</p>' },
        date: '2026-08-03T11:00:00',
        author: 'Equipe Dirhect',
        featured_media: '/images/blog/ia-recrutamento-automacao.jpg',
        categories: ['Tendências'],
        categoryIds: [4],
        tags: [],
        slug: 'como-rh-pode-adotar-ia-e-automacao',
        readTime: '6 min'
      },
      {
        id: 7,
        title: { rendered: 'Como Calcular Corretamente o Pagamento de Horas Extras e Banco de Horas: Guia Completo' },
        excerpt: { rendered: 'A gestão de horas trabalhadas é um dos grandes desafios para empresas e gestores de RH. Compreender como calcular corretamente o pagamento de horas extras e o banco de horas é essencial para evitar conflitos trabalhistas.' },
        content: { rendered: '<p>A gestão de horas trabalhadas é um dos grandes desafios para empresas e gestores de RH. Compreender como calcular corretamente o pagamento de horas extras e o banco de horas é essencial para <strong>evitar conflitos trabalhistas e garantir que a empresa esteja em conformidade com a legislação</strong>.</p><blockquote class="wp-block-quote"><p>"Calcular horas extras e banco de horas corretamente não é apenas uma questão de conformidade, mas de transparência e confiança entre empresa e colaborador"</p><cite><strong>Douglas Migliani Vitorello</strong>, Diretor de Serviços e Consultor TOTVS® linha RM®.</cite></blockquote><h2>O Que São Horas Extras e Banco de Horas?</h2><p>A correta compreensão do que são horas extras e banco de horas é essencial para uma gestão eficaz do tempo de trabalho dos colaboradores. Enquanto as horas extras envolvem a remuneração do tempo trabalhado além da jornada regular, o banco de horas permite acumular essas horas para compensação futura, proporcionando flexibilidade tanto para o colaborador quanto para a empresa.</p><h3>Definindo Horas Extras</h3><p><strong>Horas extras são as horas trabalhadas além da jornada regular</strong>, definida em contrato ou pela legislação. Elas servem para atender necessidades excepcionais da empresa, como aumento de demanda ou substituição de um colaborador. O pagamento deve incluir um <strong>adicional mínimo de 50%</strong> sobre o valor da hora comum, sendo essa uma forma de compensar o esforço extra do colaborador.</p><h3>Como Funciona o Banco de Horas</h3><p>O banco de horas permite ao colaborador acumular horas trabalhadas além da jornada padrão para serem <strong>compensadas em dias ou horários de folga no futuro</strong>. Essa compensação não precisa ser financeira, mas deve seguir regras claras, incluindo prazos para compensação, estabelecidos por acordos coletivos ou diretrizes internas.</p><h2>Por Que É Importante Calcular Corretamente?</h2><p>A precisão no cálculo de horas extras e banco de horas beneficia tanto a empresa quanto o colaborador, <strong>reduzindo riscos trabalhistas e fortalecendo a confiança entre as partes</strong>.</p><h3>Impacto Financeiro para a Empresa</h3><p>Erros no cálculo de horas extras e banco de horas podem resultar em <strong>gastos inesperados para a empresa</strong>, como o pagamento retroativo de horas mal calculadas, multas ou indenizações em processos trabalhistas. Um cálculo preciso e transparente protege a empresa de custos adicionais.</p><h3>Benefícios para o Colaborador</h3><p>Para o colaborador, a compensação correta pelas horas trabalhadas gera <strong>satisfação e sentimento de reconhecimento</strong>. Além de garantir direitos financeiros, a transparência no cálculo aumenta a confiança na empresa e fortalece a relação de trabalho.</p><h2>Legislação Brasileira: O Que Diz a CLT?</h2><p>A legislação trabalhista brasileira, especialmente a Consolidação das Leis do Trabalho (CLT), estabelece as regras e condições para o pagamento de horas extras e o uso do banco de horas.</p><h3>Horas Extras na CLT</h3><p>A CLT determina que as horas extras devem ser remuneradas com um <strong>adicional mínimo de 50% sobre o valor da hora normal</strong>. Em casos específicos, esse adicional pode ser maior, como para jornadas em domingos ou feriados.</p><h3>Banco de Horas na CLT</h3><p>O banco de horas foi regulamentado pela CLT para permitir que empresas e colaboradores acordem a compensação de horas extras in dias de folga. A legislação estipula que o banco de horas deve ser formalizado, com um <strong>prazo máximo de seis meses</strong> para compensação das horas acumuladas.</p><h3>Cálculo de Horas Extras Noturnas e Feriados</h3><p>Para trabalho noturno, realizado entre 22h e 5h, a hora é contabilizada como <strong>52 minutos e 30 segundos</strong>, e o adicional noturno é de, no mínimo, 20%. Já em feriados, as horas extras devem ter um <strong>adicional de 100%</strong>, respeitando os direitos dos trabalhadores.</p><h2>Passo a Passo para Calcular Horas Extras</h2><h3>1. Identificação da Jornada Regular</h3><p>A jornada regular é o ponto de partida para o cálculo de horas extras. Deve-se definir as horas diárias e semanais contratadas para que o trabalho excedente seja identificado com precisão.</p><h3>2. Como Calcular o Valor da Hora Extra</h3><p>O cálculo do valor da hora extra é feito multiplicando o valor da hora normal pelo percentual adicional estabelecido. <strong>Fórmula: Hora Extra = Valor da Hora Normal x (1 + Adicional)</strong>.</p><h3>3. Adicional Noturno e DSR (Descanso Semanal Remunerado)</h3><p>Além do valor das horas extras, devem-se considerar os adicionais noturno e de descanso semanal remunerado (DSR). Para o cálculo do DSR, as horas extras são <strong>multiplicadas pelo número de dias trabalhados e divididas pelo número de dias úteis na semana</strong>.</p><h2>Como Funciona o Banco de Horas?</h2><h3>Registro e Controle de Horas</h3><p>Para evitar confusões, o registro deve ser feito por meio de <strong>ferramentas automatizadas</strong>, onde as horas acumuladas e compensadas são facilmente verificáveis. Planilhas e sistemas de ponto eletrônico são úteis para garantir precisão.</p><h3>Compensação de Horas</h3><p>As horas no banco devem ser compensadas dentro de um prazo acordado, com o <strong>limite máximo de 6 meses ou um ano</strong>, dependendo do tipo de acordo estabelecido com os colaboradores ou sindicato.</p><h3>Vantagens e Desvantagens do Banco de Horas</h3><p>O banco de horas oferece flexibilidade, mas pode ser complexo de gerenciar. Para empresas, reduz custos de horas extras; para colaboradores, permite folgas em horários convenientes. No entanto, o <strong>risco de perder horas acumuladas sem compensação</strong> pode gerar insatisfação.</p><h2>Calculando o Banco de Horas Corretamente</h2><h3>Contabilização das Horas Acumuladas</h3><p>Para garantir precisão, as horas trabalhadas devem ser registradas diariamente, facilitando a verificação. Os <strong>sistemas de gestão de ponto automatizados</strong> simplificam a contabilidade, evitando que horas fiquem sem registro.</p><h3>Compensação e Validade das Horas</h3><p>As empresas devem definir claramente os prazos de expiração das horas acumuladas e garantir que colaboradores sejam informados das regras para que possam planejar suas folgas com antecedência.</p><h2>Ferramentas e Softwares para Cálculo e Controle de Horas</h2><h3>Automatizando Processos com Softwares Especializados</h3><p>Softwares como o <strong>TOTVS® linha RM®</strong> ajudam a automatizar o registro e o cálculo de horas extras e banco de horas. Esses sistemas facilitam o controle e garantem conformidade com as normas legais.</p><h3>Benefícios do Uso de Softwares</h3><p>Ao reduzir erros de cálculo e centralizar informações, o uso de softwares especializados <strong>otimiza a operação de RH, economizando tempo e promovendo uma gestão mais transparente e eficiente</strong>.</p><h2>A Importância da Transparência no Cálculo e Gestão de Horas</h2><h3>Como a Transparência Gera Confiança</h3><p>A transparência na comunicação dos registros de horas é fundamental para que o colaborador se sinta respeitado e confiante na empresa. Isso pode ser feito através de relatórios mensais ou acesso direto ao sistema de ponto.</p><h3>Dicas de Boas Práticas para Empresas</h3><p>Empresas devem adotar práticas como a regularização de registros, comunicação clara sobre o banco de horas e horas extras, e o uso de plataformas acessíveis aos colaboradores para que acompanhem seus registros.</p><h3>Resumo das Boas Práticas</h3><p>A correta aplicação das leis trabalhistas e o uso de ferramentas para registro e gestão de horas são essenciais para evitar problemas e fortalecer a relação empresa-colaborador.</p><p>Uma boa gestão de horas é um <strong>diferencial competitivo</strong> que contribui para a produtividade e satisfação dos colaboradores, refletindo positivamente no desempenho organizacional.</p>' },
        date: '2026-08-03T10:00:00',
        author: 'Douglas Migliani Vitorello',
        featured_media: '/images/blog/como-calcular-horas-extras.png',
        categories: ['Estratégia'],
        categoryIds: [6],
        tags: [],
        slug: 'como-calcular-horas-extras-banco-de-horas',
        readTime: '8 min'
      },
      {
        id: 1,
        title: { rendered: 'Nova funcionalidade: Admissão Digital Inteligente' },
        excerpt: { rendered: 'Agora você pode automatizar todo o processo de admissão com nossa nova ferramenta de IA que valida documentos automaticamente.' },
        content: { rendered: '<p>Agora você pode automatizar todo o processo de admissão com nossa nova ferramenta de IA que valida documentos automaticamente.</p>' },
        date: '2025-01-15T10:00:00',
        author: 'Equipe Dirhect',
        featured_media: '/images/blog/news.webp',
        categories: ['Produto'],
        categoryIds: [1],
        tags: [],
        slug: 'nova-funcionalidade-admissao-digital',
        readTime: '3 min'
      },
      {
        id: 2,
        title: { rendered: 'Como reduzir 90% dos erros em processos de RH' },
        excerpt: { rendered: 'Descubra as estratégias que empresas líderes estão usando para minimizar erros operacionais e aumentar a eficiência.' },
        content: { rendered: '<p>Descubra as estratégias que empresas líderes estão usando para minimizar erros operacionais e aumentar a eficiência.</p>' },
        date: '2025-01-12T14:30:00',
        author: 'Ana Costa',
        featured_media: '/images/blog/news-2.webp',
        categories: ['Dicas'],
        categoryIds: [2],
        tags: [],
        slug: 'como-reduzir-erros-rh',
        readTime: '5 min'
      },
      {
        id: 3,
        title: { rendered: 'Integração com sistemas ERP: Guia completo' },
        excerpt: { rendered: 'Tudo que você precisa saber sobre como integrar a Dirhect com seu sistema ERP atual de forma simples e rápida.' },
        content: { rendered: '<p>Tudo que você precisa saber sobre como integrar a Dirhect com seu sistema ERP atual de forma simples e rápida.</p>' },
        date: '2025-01-10T09:15:00',
        author: 'Carlos Ferreira',
        featured_media: '/images/blog/news-3.webp',
        categories: ['Tutorial'],
        categoryIds: [3],
        tags: [],
        slug: 'integracao-sistemas-erp',
        readTime: '7 min'
      },
      {
        id: 4,
        title: { rendered: 'O Futuro do RH: Tendências para 2025' },
        excerpt: { rendered: 'Explore as principais tendências que moldarão o mercado de recursos humanos nos próximos anos e como se preparar.' },
        content: { rendered: '<p>Explore as principais tendências que moldarão o mercado de recursos humanos nos próximos anos e como se preparar.</p>' },
        date: '2025-01-08T16:20:00',
        author: 'Equipe Dirhect',
        featured_media: '/images/blog/news.webp',
        categories: ['Tendências'],
        categoryIds: [4],
        tags: [],
        slug: 'futuro-rh-tendencias-2025',
        readTime: '6 min'
      },
      {
        id: 5,
        title: { rendered: 'Segurança de Dados em RH: Melhores Práticas' },
        excerpt: { rendered: 'Como proteger informações sensíveis dos colaboradores e estar em conformidade com a LGPD.' },
        content: { rendered: '<p>Como proteger informações sensíveis dos colaboradores e estar em conformidade com a LGPD.</p>' },
        date: '2025-01-05T11:45:00',
        author: 'Ana Costa',
        featured_media: '/images/blog/news-2.webp',
        categories: ['Segurança'],
        categoryIds: [5],
        tags: [],
        slug: 'seguranca-dados-rh',
        readTime: '4 min'
      },
      {
        id: 6,
        title: { rendered: 'Automatização de Processos: ROI em RH' },
        excerpt: { rendered: 'Calcule o retorno sobre investimento da automação de processos de RH na sua empresa.' },
        content: { rendered: '<p>Calcule o retorno sobre investimento da automação de processos de RH na sua empresa.</p>' },
        date: '2025-01-03T08:30:00',
        author: 'Carlos Ferreira',
        featured_media: '/images/blog/news-3.webp',
        categories: ['Estratégia'],
        categoryIds: [6],
        tags: [],
        slug: 'automatizacao-processos-roi',
        readTime: '8 min'
      }
    ]
  },

  // Função para votar em um item do roadmap
  async voteOnRoadmapItem(postId) {
    try {
      // Primeiro, buscar o post atual para obter o número de votos
      const response = await fetch(`${WORDPRESS_API_URL}/posts/${postId}`)
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar post: ${response.status}`)
      }

      const post = await response.json()
      const currentVotes = parseInt(this.extractCustomField(post, 'roadmap_votes')) || 0
      const newVotes = currentVotes + 1

      // Atualizar o campo de votos via API REST do WordPress
      const updateResponse = await fetch(`${WORDPRESS_API_URL}/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acf: {
            roadmap_votes: newVotes
          }
        })
      })

      if (!updateResponse.ok) {
        throw new Error(`Erro ao atualizar votos: ${updateResponse.status}`)
      }

      return {
        success: true,
        newVotes: newVotes,
        message: 'Voto registrado com sucesso!'
      }

    } catch (error) {
      console.error('Erro ao votar:', error)
      
      // Fallback: simular voto localmente
      return {
        success: true,
        newVotes: Math.floor(Math.random() * 50) + 1,
        message: 'Voto registrado localmente!',
        isLocal: true
      }
    }
  },

  // Verificar se o usuário já votou (usando localStorage)
  hasUserVoted(postId) {
    const votedItems = JSON.parse(localStorage.getItem('roadmap_votes') || '[]')
    return votedItems.includes(postId.toString())
  },

  // Registrar voto do usuário no localStorage
  recordUserVote(postId) {
    const votedItems = JSON.parse(localStorage.getItem('roadmap_votes') || '[]')
    if (!votedItems.includes(postId.toString())) {
      votedItems.push(postId.toString())
      localStorage.setItem('roadmap_votes', JSON.stringify(votedItems))
    }
  },

  // Criar/editar post (versão melhorada que funciona com qualquer usuário)
  async savePost(token, postData) {
    try {
      const method = postData.id ? 'PUT' : 'POST'
      const url = postData.id 
        ? `${WORDPRESS_API_URL}/posts/${postData.id}`
        : `${WORDPRESS_API_URL}/posts`

      // Preparar dados do post com status draft por padrão (mais permissivo)
      const postPayload = {
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt || '',
        status: 'draft' // Sempre começar como draft para evitar problemas de permissão
      }

      // Se é uma edição e o post já existe, manter o status original
      if (postData.id && postData.status) {
        postPayload.status = postData.status
      }

      // Se o usuário quer publicar diretamente, tentar
      if (postData.status === 'publish') {
        postPayload.status = 'publish'
      }

      console.log('Salvando post com payload:', postPayload)

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postPayload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro na resposta:', response.status, errorData)
        
        // Se falhou com publish, tentar como draft
        if (postPayload.status === 'publish' && response.status === 403) {
          console.log('Tentando salvar como draft...')
          postPayload.status = 'draft'
          
          const retryResponse = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postPayload)
          })

          if (retryResponse.ok) {
            const result = await retryResponse.json()
            console.log('Post salvo como draft com sucesso')
            return { ...result, saved_as_draft: true }
          } else {
            const retryError = await retryResponse.json().catch(() => ({}))
            throw new Error(retryError.message || 'Erro ao salvar post como draft')
          }
        }
        
        throw new Error(errorData.message || `Erro ao salvar post (${response.status})`)
      }

      const result = await response.json()
      console.log('Post salvo com sucesso:', result)
      return result
    } catch (error) {
      console.error('Erro ao salvar post:', error)
      throw error
    }
  },

  // Deletar post
  async deletePost(token, postId) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar post')
      }

      return { success: true }
    } catch (error) {
      console.error('Erro ao deletar post:', error)
      throw error
    }
  },

  // Buscar itens do roadmap para administração
  async getAdminRoadmap(token, params = {}) {
    try {
      console.log('Buscando roadmap admin...')
      
      const roadmapId = await this.getRoadmapCategoryId()
      console.log('ID da categoria roadmap:', roadmapId)
      
      if (!roadmapId) {
        console.log('Categoria roadmap não encontrada, retornando fallback')
        return this.getFallbackRoadmapPosts()
      }

      // Construir URL igual ao roadmap público
      let apiUrl = `${WORDPRESS_API_URL}/posts?per_page=${params.per_page || 50}&page=${params.page || 1}&categories=${roadmapId}&_embed=true&status=publish,draft&orderby=date&order=desc`
      
      console.log('URL da requisição roadmap:', apiUrl)
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.error('Erro na resposta da API roadmap:', response.status, response.statusText)
        throw new Error(`Erro ao buscar roadmap: ${response.status}`)
      }

      const posts = await response.json()
      console.log('Itens do roadmap encontrados:', posts.length)
      
      // Transformar para formato do roadmap (igual ao getRoadmapPosts)
      return posts.map(post => {
        // Extrair datas e formatá-las corretamente
        const estimatedDateRaw = this.extractCustomField(post, 'roadmap_estimated_date')
        const launchedDateRaw = this.extractCustomField(post, 'roadmap_launched_date')
        
        const estimatedDate = this.formatACFDate(estimatedDateRaw) || post.date
        const launchedDate = this.formatACFDate(launchedDateRaw)
        
        // Extrair funcionalidades e processar
        const featuresRaw = this.extractCustomField(post, 'roadmap_features')
        const features = this.processFeaturesList(featuresRaw)
        
        // Extrair outros campos com valores padrão inteligentes
        const status = this.extractCustomField(post, 'roadmap_status') || 'planned'
        const priority = this.extractCustomField(post, 'roadmap_priority') || 'medium'
        const quarter = this.extractCustomField(post, 'roadmap_quarter') || this.getQuarterFromDate(post.date)
        const category = this.extractCustomField(post, 'roadmap_category') || 'Produto'
        const votes = parseInt(this.extractCustomField(post, 'roadmap_votes')) || 0

        return {
          id: post.id,
          title: post.title?.rendered || post.title || 'Sem título',
          description: this.stripHtml(post.excerpt?.rendered) || this.stripHtml(post.content?.rendered).substring(0, 200) + '...' || 'Sem descrição',
          content: post.content?.rendered || post.content || '',
          status: status,
          priority: priority,
          quarter: quarter,
          category: category,
          votes: votes,
          estimatedDate: estimatedDate,
          launchedDate: launchedDate,
          features: features,
          date: post.date,
          author: this.getAuthorName(post)
        }
      })
    } catch (error) {
      console.error('Erro ao buscar roadmap admin:', error)
      // Retornar dados de fallback em caso de erro
      return this.getFallbackRoadmapPosts()
    }
  },

  // Salvar item do roadmap
  async saveRoadmapItem(token, itemData) {
    try {
      let roadmapId = await this.getRoadmapCategoryId()
      if (!roadmapId) {
        // Criar categoria roadmap se não existir
        const categoryResponse = await fetch(`${WORDPRESS_API_URL}/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: 'Roadmap',
            slug: 'roadmap'
          })
        })
        
        if (categoryResponse.ok) {
          const category = await categoryResponse.json()
          roadmapId = category.id
        }
      }

      const method = itemData.id ? 'PUT' : 'POST'
      const url = itemData.id 
        ? `${WORDPRESS_API_URL}/posts/${itemData.id}`
        : `${WORDPRESS_API_URL}/posts`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: itemData.title,
          content: itemData.content || '',
          excerpt: itemData.description || '',
          status: 'publish',
          categories: [roadmapId],
          meta: {
            roadmap_status: itemData.status || 'planned',
            roadmap_priority: itemData.priority || 'medium',
            roadmap_quarter: itemData.quarter || '',
            roadmap_category: itemData.category || '',
            roadmap_estimated_date: itemData.estimatedDate || '',
            roadmap_launched_date: itemData.launchedDate || '',
            roadmap_features: typeof itemData.features === 'string' ? itemData.features.split('\n').filter(f => f.trim()) : (itemData.features || [])
            // Não incluir roadmap_votes aqui - manter o valor atual no WordPress
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao salvar item do roadmap')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao salvar item do roadmap:', error)
      throw error
    }
  },

  // Buscar artigos do banco de conhecimento
  async getAdminKnowledge(token, params = {}) {
    try {
      console.log('Buscando conhecimento admin...')
      
      // Buscar ID da categoria banco-conhecimento
      const knowledgeCategoryId = await this.getKnowledgeCategoryId()
      console.log('ID da categoria banco-conhecimento:', knowledgeCategoryId)
      
      if (!knowledgeCategoryId) {
        console.log('Categoria banco-conhecimento não encontrada, retornando array vazio')
        return []
      }

      // Construir URL para buscar apenas posts da categoria banco-conhecimento
      let apiUrl = `${WORDPRESS_API_URL}/posts?per_page=${params.per_page || 50}&page=${params.page || 1}&categories=${knowledgeCategoryId}&_embed=true&status=publish,draft&orderby=date&order=desc`
      
      console.log('URL da requisição conhecimento:', apiUrl)
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.error('Erro na resposta da API conhecimento:', response.status, response.statusText)
        throw new Error(`Erro ao buscar artigos: ${response.status}`)
      }

      const posts = await response.json()
      console.log('Artigos encontrados:', posts.length)
      
      // Transformar para formato do banco de conhecimento
      return posts.map(post => ({
        id: post.id,
        title: { rendered: post.title?.rendered || post.title || 'Sem título' },
        content: { rendered: post.content?.rendered || post.content || '' },
        excerpt: { rendered: post.excerpt?.rendered || post.excerpt || '' },
        status: post.status || 'draft',
        date: post.date,
        modified: post.modified,
        author: this.getAuthorName(post),
        category: this.extractCustomField(post, 'knowledge_category') || '',
        views: parseInt(this.extractCustomField(post, 'knowledge_views')) || 0,
        featured: Boolean(this.extractCustomField(post, 'knowledge_featured')),
        tags: this.extractCustomField(post, 'knowledge_tags') || [],
        slug: post.slug
      }))
    } catch (error) {
      console.error('Erro ao buscar artigos admin:', error)
      // Retornar array vazio em caso de erro
      return []
    }
  },

  // Salvar artigo do banco de conhecimento
  async saveKnowledgeArticle(token, articleData) {
    try {
      let knowledgeId = await this.getKnowledgeCategoryId()
      if (!knowledgeId) {
        // Criar categoria banco-conhecimento se não existir
        const categoryResponse = await fetch(`${WORDPRESS_API_URL}/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: 'Banco de Conhecimento',
            slug: 'banco-conhecimento'
          })
        })
        
        if (categoryResponse.ok) {
          const category = await categoryResponse.json()
          knowledgeId = category.id
        }
      }

      const method = articleData.id ? 'PUT' : 'POST'
      const url = articleData.id 
        ? `${WORDPRESS_API_URL}/posts/${articleData.id}`
        : `${WORDPRESS_API_URL}/posts`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: articleData.title,
          content: articleData.content,
          excerpt: articleData.excerpt || '',
          status: 'publish',
          categories: [knowledgeId],
          meta: {
            knowledge_category: articleData.category || '',
            knowledge_featured: articleData.featured || false,
            knowledge_tags: articleData.tags || [],
            knowledge_views: articleData.views || 0
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao salvar artigo')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao salvar artigo:', error)
      throw error
    }
  },

  // Testar conexão com a API do WordPress
  async testConnection() {
    try {
      console.log('Testando conexão com WordPress...')
      const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=1`)
      
      if (!response.ok) {
        throw new Error(`Erro na conexão: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Conexão bem-sucedida! Posts disponíveis:', data.length)
      
      return {
        success: true,
        message: 'Conexão com WordPress estabelecida com sucesso',
        postsCount: data.length
      }
    } catch (error) {
      console.error('Erro na conexão com WordPress:', error)
      return {
        success: false,
        message: `Erro na conexão: ${error.message}`,
        error: error
      }
    }
  },

  // Verificar se usuário está autenticado
  isAuthenticated() {
    console.log('=== DEBUG isAuthenticated ===')
    const token = localStorage.getItem('adminToken')
    console.log('Token no localStorage:', token ? 'EXISTE' : 'NÃO EXISTE')
    console.log('Token valor:', token)
    
    if (!token) {
      console.log('Token não encontrado, retornando false')
      return false
    }
    
    // Verificar se o token expirou
    const isExpired = this.isTokenExpired()
    console.log('Token expirado:', isExpired)
    
    if (isExpired) {
      console.log('Token expirado, fazendo logout automático')
      this.adminLogout()
      return false
    }
    
    // Verificar se temos dados do usuário
    const user = localStorage.getItem('adminUser')
    console.log('Dados do usuário:', user ? 'EXISTEM' : 'NÃO EXISTEM')
    console.log('Dados do usuário valor:', user)
    
    if (!user) {
      console.log('Dados do usuário não encontrados, fazendo logout')
      this.adminLogout()
      return false
    }
    
    console.log('Usuário autenticado, retornando true')
    console.log('========================')
    return true
  },

  // Obter usuário atual
  getCurrentUser() {
    if (!this.isAuthenticated()) return null
    
    const userStr = localStorage.getItem('adminUser')
    return userStr ? JSON.parse(userStr) : null
  },

  // Obter token atual
  getCurrentToken() {
    console.log('=== DEBUG getCurrentToken ===')
    console.log('isAuthenticated():', this.isAuthenticated())
    console.log('localStorage adminToken:', localStorage.getItem('adminToken'))
    console.log('localStorage adminUser:', localStorage.getItem('adminUser'))
    console.log('localStorage adminTokenExpiry:', localStorage.getItem('adminTokenExpiry'))
    
    if (!this.isAuthenticated()) {
      console.log('Usuário não autenticado, retornando null')
      return null
    }
    
    const token = localStorage.getItem('adminToken')
    console.log('Token encontrado:', token ? 'SIM' : 'NÃO')
    console.log('========================')
    return token
  },

  // Método de debug para verificar estado da autenticação
  debugAuth() {
    console.log('=== DEBUG AUTH STATE ===')
    console.log('adminToken:', localStorage.getItem('adminToken'))
    console.log('adminUser:', localStorage.getItem('adminUser'))
    console.log('adminTokenExpiry:', localStorage.getItem('adminTokenExpiry'))
    console.log('isAuthenticated():', this.isAuthenticated())
    console.log('isTokenExpired():', this.isTokenExpired())
    console.log('========================')
  },

  // Método para forçar login e verificar token
  async forceLoginAndCheck(username, password) {
    try {
      console.log('=== FORÇANDO LOGIN ===')
      
      // Limpar localStorage primeiro
      localStorage.clear()
      console.log('localStorage limpo')
      
      // Fazer login
      const result = await this.adminLogin(username, password)
      console.log('Login realizado:', result.success)
      
      // Verificar se o token foi salvo
      const savedToken = localStorage.getItem('adminToken')
      console.log('Token salvo:', savedToken ? 'SIM' : 'NÃO')
      console.log('Token (primeiros 50 chars):', savedToken ? savedToken.substring(0, 50) + '...' : 'NULO')
      
      // Verificar autenticação
      const isAuth = this.isAuthenticated()
      console.log('isAuthenticated():', isAuth)
      
      // Verificar getCurrentToken
      const currentToken = this.getCurrentToken()
      console.log('getCurrentToken():', currentToken ? 'SIM' : 'NÃO')
      
      console.log('========================')
      
      return {
        success: result.success,
        tokenSaved: !!savedToken,
        isAuthenticated: isAuth,
        currentToken: !!currentToken
      }
    } catch (error) {
      console.error('Erro no forceLoginAndCheck:', error)
      throw error
    }
  },

  // Método simples para testar token diretamente
  testTokenDirectly() {
    console.log('=== TESTE DIRETO DO TOKEN ===')
    const token = localStorage.getItem('adminToken')
    const user = localStorage.getItem('adminUser')
    const expiry = localStorage.getItem('adminTokenExpiry')
    
    console.log('Token direto:', token)
    console.log('User direto:', user)
    console.log('Expiry direto:', expiry)
    
    if (token) {
      console.log('Token existe, testando se é válido...')
      console.log('Token (primeiros 50 chars):', token.substring(0, 50) + '...')
      
      // Testar se o token é um JWT válido (tem 3 partes separadas por ponto)
      const parts = token.split('.')
      console.log('Partes do JWT:', parts.length)
      
      if (parts.length === 3) {
        console.log('Formato JWT válido')
        try {
          // Decodificar o payload (segunda parte)
          const payload = JSON.parse(atob(parts[1]))
          console.log('Payload do JWT:', payload)
          
          // Verificar se tem exp (expiration)
          if (payload.exp) {
            const expDate = new Date(payload.exp * 1000)
            const now = new Date()
            console.log('Expiração do JWT:', expDate)
            console.log('Agora:', now)
            console.log('JWT expirado:', now > expDate)
          }
        } catch (e) {
          console.log('Erro ao decodificar JWT:', e)
        }
      } else {
        console.log('Formato JWT inválido')
      }
    } else {
      console.log('Token não existe')
    }
    
    console.log('========================')
    return {
      token: !!token,
      user: !!user,
      expiry: !!expiry
    }
  },

  // Criar/editar post usando endpoint customizado
  async savePostCustom(token, postData) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/dirhect/v1')}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt || '',
          status: postData.status || 'draft'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro na resposta custom:', response.status, errorData)
        throw new Error(errorData.message || `Erro ao salvar post (${response.status})`)
      }

      const result = await response.json()
      console.log('Post salvo com sucesso (custom):', result)
      return result
    } catch (error) {
      console.error('Erro ao salvar post (custom):', error)
      throw error
    }
  },

  // Buscar posts usando endpoint customizado
  async getPostsCustom(token, params = {}) {
    try {
      const searchParams = new URLSearchParams({
        per_page: params.perPage || 10,
        page: params.page || 1,
        ...params
      })

      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/dirhect/v1')}/posts?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.data || []
    } catch (error) {
      console.error('Erro ao buscar posts (custom):', error)
      throw error
    }
  },

  // Validar JWT usando endpoint customizado
  async validateJWTCustom(token) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/dirhect/v1')}/validate-jwt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Erro ao validar JWT (custom):', error)
      throw error
    }
  },

  // Buscar usuários
  async getUsers(token, params = {}) {
    try {
      const searchParams = new URLSearchParams({
        per_page: params.per_page || 100,
        page: params.page || 1,
        context: 'edit', // Incluir dados completos incluindo roles
        ...params
      })

      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/wp/v2')}/users?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const users = await response.json()
      
      // Processar e validar os dados dos usuários
      const processedUsers = users.map(user => {
        console.log('Usuário da API:', user)
        console.log('Roles da API:', user.roles)
        
        const processed = {
          ...user,
          username: user.slug || user.username || 'user_' + user.id,
          email: user.email || '',
          roles: user.roles || ['subscriber'],
          registered: user.registered || new Date().toISOString(),
          status: user.status || 'active'
        }
        
        console.log('Usuário processado:', processed)
        return processed
      })
      
      return processedUsers
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      // Retornar dados de fallback em caso de erro
      return this.getFallbackUsers()
    }
  },

  // Criar usuário
  async createUser(token, userData) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/wp/v2')}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: userData.username,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          roles: [userData.roles],
          status: userData.status || 'active'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro na resposta:', response.status, errorData)
        throw new Error(errorData.message || `Erro ao criar usuário (${response.status})`)
      }

      const result = await response.json()
      console.log('Usuário criado com sucesso:', result)
      return result
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      throw error
    }
  },

  // Atualizar usuário
  async updateUser(token, userId, userData) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/wp/v2')}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          roles: [userData.roles],
          status: userData.status || 'active'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro na resposta:', response.status, errorData)
        throw new Error(errorData.message || `Erro ao atualizar usuário (${response.status})`)
      }

      const result = await response.json()
      console.log('Usuário atualizado com sucesso:', result)
      return result
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      throw error
    }
  },

  // Atualizar senha do usuário
  async updateUserPassword(token, userId, newPassword) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/wp/v2')}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: newPassword
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro na resposta:', response.status, errorData)
        throw new Error(errorData.message || `Erro ao alterar senha (${response.status})`)
      }

      console.log('Senha alterada com sucesso')
      return { success: true }
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      throw error
    }
  },

  // Excluir usuário
  async deleteUser(token, userId) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '/wp/v2')}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro na resposta:', response.status, errorData)
        throw new Error(errorData.message || `Erro ao excluir usuário (${response.status})`)
      }

      console.log('Usuário excluído com sucesso')
      return { success: true }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
      throw error
    }
  },

  // Dados de fallback para usuários
  getFallbackUsers() {
    return [
      {
        id: 1,
        username: 'admin',
        slug: 'admin',
        name: 'Administrador',
        email: 'admin@dirhect.com',
        roles: ['administrator'],
        registered: '2024-01-01T00:00:00.000Z',
        status: 'active',
        avatar_urls: {
          '96': null
        }
      },
      {
        id: 2,
        username: 'editor',
        slug: 'editor',
        name: 'Editor Chefe',
        email: 'editor@dirhect.com',
        roles: ['editor'],
        registered: '2024-01-15T00:00:00.000Z',
        status: 'active',
        avatar_urls: {
          '96': null
        }
      },
      {
        id: 3,
        username: 'author',
        slug: 'author',
        name: 'Autor Convidado',
        email: 'author@dirhect.com',
        roles: ['author'],
        registered: '2024-02-01T00:00:00.000Z',
        status: 'active',
        avatar_urls: {
          '96': null
        }
      }
    ]
  },

  // Função para enviar solicitação de demonstração
  async submitDemoRequest(formData) {
    try {
      // Simular envio para WordPress (fallback local)
      console.log('Enviando solicitação de demonstração:', formData)
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salvar localmente como fallback
      const demoRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]')
      const newRequest = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
      demoRequests.push(newRequest)
      localStorage.setItem('demoRequests', JSON.stringify(demoRequests))
      
      return {
        success: true,
        message: 'Solicitação enviada com sucesso!',
        isLocal: true,
        data: newRequest
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação de demonstração:', error)
      return {
        success: false,
        message: 'Erro ao enviar solicitação. Tente novamente.',
        error: error.message
      }
    }
  },

  getDirhectRestBase() {
    return getWordpressRestBase()
  },

  isCollaboratorTokenExpired() {
    const expiry = localStorage.getItem('collaboratorTokenExpiry')
    if (!expiry) return true
    return Date.now() > parseInt(expiry, 10)
  },

  isCollaboratorAuthenticated() {
    const token = localStorage.getItem('collaboratorToken')
    if (!token) return false
    if (this.isCollaboratorTokenExpired()) {
      this.collaboratorLogout()
      return false
    }
    if (!localStorage.getItem('collaboratorUser')) {
      this.collaboratorLogout()
      return false
    }
    return true
  },

  getCollaboratorToken() {
    if (!this.isCollaboratorAuthenticated()) return null
    return localStorage.getItem('collaboratorToken')
  },

  getCollaboratorUser() {
    if (!this.isCollaboratorAuthenticated()) return null
    const raw = localStorage.getItem('collaboratorUser')
    try {
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  collaboratorLogout() {
    localStorage.removeItem('collaboratorToken')
    localStorage.removeItem('collaboratorUser')
    localStorage.removeItem('collaboratorTokenExpiry')
    window.dispatchEvent(
      new CustomEvent('collaboratorAuthChanged', {
        detail: { isAuthenticated: false, user: null },
      })
    )
    return { success: true }
  },

  async collaboratorLogin(username, password) {
    const jwtApiUrl = await this.getJWT_API_URL()
    let response
    let data

    if (username.includes('@')) {
      response = await fetch(`${jwtApiUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      })
      data = await response.json().catch(() => ({}))
    } else {
      response = await fetch(`${jwtApiUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        response = await fetch(`${jwtApiUrl}/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: username, password }),
        })
      }
      data = await response.json().catch(() => ({}))
    }

    if (!response.ok || !data.success || !data.data?.jwt) {
      throw new Error(data?.message || data?.data?.message || 'Credenciais inválidas')
    }

    const token = data.data.jwt
    const userInfo = await this.getCurrentUserInfo(token)

    localStorage.setItem('collaboratorToken', token)
    localStorage.setItem(
      'collaboratorUser',
      JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        roles: userInfo.roles || [],
      })
    )
    localStorage.setItem(
      'collaboratorTokenExpiry',
      String(Date.now() + 7 * 24 * 60 * 60 * 1000)
    )

    const user = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      roles: userInfo.roles || [],
    }

    window.dispatchEvent(
      new CustomEvent('collaboratorAuthChanged', {
        detail: { isAuthenticated: true, user },
      })
    )

    return { success: true, token, user }
  },

  _isRestNoRouteResponse(response, data) {
    return (
      response.status === 404 ||
      data?.code === 'rest_no_route' ||
      (typeof data?.message === 'string' && data.message.includes('Nenhuma rota foi encontrada'))
    )
  },

  async collaboratorRegister({ name, email, password }) {
    const base = this.getDirhectRestBase()
    const body = JSON.stringify({ name, email, password })
    const headers = { 'Content-Type': 'application/json' }

    const primaryUrl = `${base}/dirhect/v1/colaborador/register`
    const homeUrl = base.replace(/\/wp-json$/i, '')
    const plainPermalinkUrl = `${homeUrl}/index.php?rest_route=/dirhect/v1/colaborador/register`

    const postRegister = async (url) => {
      const response = await fetch(url, { method: 'POST', headers, body })
      const data = await response.json().catch(() => ({}))
      return { response, data }
    }

    let { response, data } = await postRegister(primaryUrl)

    if (!response.ok && this._isRestNoRouteResponse(response, data) && plainPermalinkUrl !== primaryUrl) {
      const second = await postRegister(plainPermalinkUrl)
      response = second.response
      data = second.data
    }

    if (!response.ok) {
      if (this._isRestNoRouteResponse(response, data)) {
        throw new Error(
          'Cadastro: o WordPress ainda não tem a rota dirhect/v1/colaborador/register. ' +
            '1) Copie o arquivo mu-plugins/dirhect-colaborador-endpoint.php do projeto para wp-content/mu-plugins/ no servidor (pasta mu-plugins ao lado de plugins). ' +
            '2) Ou ative o plugin Dirhect Custom JWT Endpoints (wordpress-custom-endpoints.php). ' +
            '3) Confirme VITE_WORDPRESS_API_URL apontando para ESTE WordPress (ex.: https://seu-dominio/wp-json/wp/v2). ' +
            '4) Opcional: VITE_WORDPRESS_REST_BASE=https://seu-dominio/wp-json'
        )
      }
      const msg =
        data?.message ||
        (typeof data?.code === 'string' ? data.code : null) ||
        'Não foi possível concluir o cadastro'
      throw new Error(msg)
    }
    return data
  }
}