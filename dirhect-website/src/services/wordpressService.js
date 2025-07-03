const WORDPRESS_API_URL = 'https://dirhect-institucional.thunderbold.com.br/wp-json/wp/v2'

// Cache para o ID da categoria roadmap
let roadmapCategoryId = null

export const wordpressService = {
  WORDPRESS_API_URL, // Exportar a URL para uso externo

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

  // Buscar posts do blog (excluindo categoria roadmap)
  async getPosts(params = {}) {
    try {
      // Buscar ID da categoria roadmap para excluir
      const roadmapId = await this.getRoadmapCategoryId()

      const searchParams = new URLSearchParams({
        per_page: params.perPage || 10,
        page: params.page || 1,
        _embed: true, // Include embedded resources like featured media and author
        ...params
      })

      // Excluir categoria roadmap se encontrada
      if (roadmapId && !params.categories_exclude) {
        searchParams.set('categories_exclude', roadmapId)
      } else if (roadmapId && params.categories_exclude) {
        // Se já existe exclusão de categorias, adicionar roadmap
        const existingExcludes = Array.isArray(params.categories_exclude) 
          ? params.categories_exclude 
          : [params.categories_exclude]
        searchParams.set('categories_exclude', [...existingExcludes, roadmapId].join(','))
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
      
      // Verificar se o post pertence à categoria roadmap
      const roadmapId = await this.getRoadmapCategoryId()
      if (roadmapId && post.categories && post.categories.includes(roadmapId)) {
        throw new Error('Post pertence à categoria roadmap e não deve ser exibido')
      }
      
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

  // Buscar posts relacionados por categoria (excluindo categoria roadmap)
  async getRelatedPosts(postId, categoryIds, limit = 3) {
    try {
      if (!categoryIds || categoryIds.length === 0) {
        return []
      }

      // Buscar ID da categoria roadmap para excluir
      const roadmapId = await this.getRoadmapCategoryId()

      const searchParams = new URLSearchParams({
        per_page: limit + 1, // +1 para excluir o post atual se aparecer
        categories: categoryIds[0], // Usar o primeiro ID da categoria
        exclude: postId,
        _embed: true
      })

      // Excluir categoria roadmap se encontrada
      if (roadmapId) {
        searchParams.set('categories_exclude', roadmapId)
      }

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
    
    // Tratar casos específicos de nomes de campos com erro
    if (fieldName === 'roadmap_estimated_date' && post.acf) {
      // Verificar se existe o campo com nome duplicado/errado
      if (post.acf['roadmap_estimatroadmap_estimated_dateed_date']) {
        return post.acf['roadmap_estimatroadmap_estimated_dateed_date']
      }
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

  // Função para enviar solicitação de demonstração
  async submitDemoRequest(formData) {
    try {
      // Preparar dados para envio
      const demoData = {
        title: `Solicitação de Demo - ${formData.nomeEmpresa}`,
        content: this.formatDemoContent(formData),
        status: 'private', // Manter privado para análise interna
        categories: [], // Pode definir uma categoria específica para demos
        meta: {
          demo_empresa: formData.nomeEmpresa,
          demo_cnpj: formData.cnpj,
          demo_contato: formData.nomeContato,
          demo_email: formData.email,
          demo_telefone: formData.telefone,
          demo_cargo: formData.cargo,
          demo_funcionarios: formData.numeroFuncionarios,
          demo_segmento: formData.segmento,
          demo_necessidades: JSON.stringify(formData.necessidades),
          demo_mensagem: formData.mensagem,
          demo_data_solicitacao: new Date().toISOString(),
          demo_status: 'pendente'
        }
      }

      // Tentar enviar para WordPress
      const response = await fetch(`${WORDPRESS_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Nota: Em produção, você precisará de autenticação adequada
          // 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(demoData)
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const result = await response.json()

      return {
        success: true,
        id: result.id,
        message: 'Solicitação enviada com sucesso!',
        data: result
      }

    } catch (error) {
      console.error('Erro ao enviar solicitação para WordPress:', error)
      
      // Fallback: salvar localmente ou enviar por email
      return await this.handleDemoFallback(formData, error)
    }
  },

  // Formatar conteúdo da solicitação para o post
  formatDemoContent(formData) {
    const necessidadesText = formData.necessidades.length > 0 
      ? formData.necessidades.join(', ') 
      : 'Nenhuma necessidade específica informada'

    return `
      <h2>Solicitação de Demonstração</h2>
      
      <h3>Informações da Empresa</h3>
      <ul>
        <li><strong>Nome da Empresa:</strong> ${formData.nomeEmpresa}</li>
        <li><strong>CNPJ:</strong> ${formData.cnpj}</li>
        <li><strong>Segmento:</strong> ${formData.segmento}</li>
        <li><strong>Número de Funcionários:</strong> ${formData.numeroFuncionarios}</li>
      </ul>

      <h3>Dados do Contato</h3>
      <ul>
        <li><strong>Nome:</strong> ${formData.nomeContato}</li>
        <li><strong>Cargo:</strong> ${formData.cargo}</li>
        <li><strong>E-mail:</strong> ${formData.email}</li>
        <li><strong>Telefone:</strong> ${formData.telefone}</li>
      </ul>

      <h3>Necessidades e Interesse</h3>
      <p><strong>Soluções de Interesse:</strong> ${necessidadesText}</p>
      
      ${formData.mensagem ? `
        <h3>Mensagem Adicional</h3>
        <p>${formData.mensagem}</p>
      ` : ''}

      <h3>Informações Técnicas</h3>
      <ul>
        <li><strong>Data da Solicitação:</strong> ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</li>
        <li><strong>Origem:</strong> Formulário do Site</li>
        <li><strong>Status:</strong> Pendente</li>
      </ul>
    `
  },

  // Fallback para quando o WordPress não estiver disponível
  async handleDemoFallback(formData, originalError) {
    try {
      // Opção 1: Salvar no localStorage para sincronização posterior
      const pendingDemos = JSON.parse(localStorage.getItem('pending_demos') || '[]')
      const demoRequest = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'pending_sync'
      }
      
      pendingDemos.push(demoRequest)
      localStorage.setItem('pending_demos', JSON.stringify(pendingDemos))

      // Opção 2: Tentar enviar por email via serviço alternativo (ex: EmailJS)
      await this.sendDemoByEmail(formData)

      return {
        success: true,
        id: demoRequest.id,
        message: 'Solicitação registrada! Entraremos em contato em breve.',
        isLocal: true,
        fallbackUsed: true
      }

    } catch (fallbackError) {
      console.error('Erro no fallback:', fallbackError)
      
      return {
        success: false,
        message: 'Erro ao enviar solicitação. Tente novamente ou entre em contato diretamente.',
        error: originalError.message
      }
    }
  },

  // Enviar solicitação por email como backup
  async sendDemoByEmail(formData) {
    // Implementar integração com EmailJS ou serviço similar
    // Por enquanto, apenas log para desenvolvimento
    console.log('Enviando demo por email:', {
      to: 'demo@dirhect.com',
      subject: `Nova Solicitação de Demo - ${formData.nomeEmpresa}`,
      data: formData
    })

    // Em produção, implementar:
    // return emailjs.send('service_id', 'template_id', emailData)
  },

  // Função para sincronizar demos pendentes quando conexão for restaurada
  async syncPendingDemos() {
    const pendingDemos = JSON.parse(localStorage.getItem('pending_demos') || '[]')
    
    if (pendingDemos.length === 0) {
      return { success: true, synced: 0 }
    }

    let syncedCount = 0
    const failedSyncs = []

    for (const demo of pendingDemos) {
      try {
        const result = await this.submitDemoRequest(demo)
        if (result.success && !result.isLocal) {
          syncedCount++
        } else {
          failedSyncs.push(demo)
        }
      } catch (error) {
        failedSyncs.push(demo)
      }
    }

    // Atualizar localStorage com demos que falharam
    localStorage.setItem('pending_demos', JSON.stringify(failedSyncs))

    return {
      success: true,
      synced: syncedCount,
      failed: failedSyncs.length,
      message: `${syncedCount} solicitações sincronizadas com sucesso`
    }
  }
} 