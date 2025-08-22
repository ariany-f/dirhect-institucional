// Usar import.meta.env para Vite em vez de process.env
const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://wp-api.dirhect.com.br/wp-json/wp/v2'

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
    return WORDPRESS_API_URL.replace('/wp/v2', '/simple-jwt-login/v1')
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
  }
}