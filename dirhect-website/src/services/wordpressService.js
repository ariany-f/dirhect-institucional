const WORDPRESS_API_URL = 'https://dirhect-institucional.thunderbold.com.br/wp-json/wp/v2'

export const wordpressService = {
  WORDPRESS_API_URL, // Exportar a URL para uso externo

  // Buscar posts do blog
  async getPosts(params = {}) {
    try {
      const searchParams = new URLSearchParams({
        per_page: params.perPage || 10,
        page: params.page || 1,
        _embed: true, // Include embedded resources like featured media and author
        ...params
      })

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

  // Posts estáticos como fallback
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
  }
} 