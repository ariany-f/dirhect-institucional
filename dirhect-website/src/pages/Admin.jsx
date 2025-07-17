import { useState, useEffect } from 'react'
import { 
  User, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  RefreshCw, 
  TestTube, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Map,
  BookOpen
} from 'lucide-react'
import { createPortal } from 'react-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import RichTextEditor from '../components/RichTextEditor'
import './Admin.css'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('posts')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Estados para formulários
  const [posts, setPosts] = useState([])
  const [roadmap, setRoadmap] = useState([])
  const [knowledge, setKnowledge] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage] = useState(10)

  // Estados para notificações
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      
      if (!wordpressService.isAuthenticated()) {
        setLoading(false)
        return
      }

      const token = wordpressService.getCurrentToken()
      const result = await wordpressService.verifyAdminToken(token)
      
      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
        await loadContent(1)
      } else {
        wordpressService.adminLogout()
      }
    } catch (error) {
      console.error('Erro na verificação:', error)
      wordpressService.adminLogout()
      showNotification('Sessão expirada. Faça login novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      setLoading(true)
      setError(null)
      
      const result = await wordpressService.adminLogin(
        formData.get('username'),
        formData.get('password')
      )
      
      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
        await loadContent(1)
        
        // Disparar evento customizado para notificar o header
        window.dispatchEvent(new CustomEvent('authStateChanged', { 
          detail: { isAuthenticated: true, user: result.user } 
        }))
        
        showNotification('Login realizado com sucesso!', 'success')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      setError(error.message || 'Erro ao fazer login')
      showNotification(error.message || 'Erro ao fazer login', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    wordpressService.adminLogout()
    setIsAuthenticated(false)
    setUser(null)
    setPosts([])
    setRoadmap([])
    setKnowledge([])
    
    // Disparar evento customizado para notificar o header
    window.dispatchEvent(new CustomEvent('authStateChanged', { 
      detail: { isAuthenticated: false, user: null } 
    }))
    
    showNotification('Logout realizado com sucesso!', 'success')
  }

  const testConnection = async () => {
    try {
      setLoading(true)
      const result = await wordpressService.testConnection()
      
      if (result.success) {
        showNotification(result.message, 'success')
      } else {
        showNotification(result.message, 'error')
      }
    } catch (error) {
      console.error('Erro no teste de conexão:', error)
      showNotification('Erro ao testar conexão', 'error')
    } finally {
      setLoading(false)
    }
  }

  const loadContent = async (page = 1) => {
    try {
      setLoading(true)
      const token = wordpressService.getCurrentToken()
      
      console.log('Iniciando carregamento de conteúdo...')
      
      // Carregar todos os dados de uma vez (posts, roadmap e conhecimento)
      const [postsData, roadmapData, knowledgeData] = await Promise.all([
        wordpressService.getPosts({ 
          perPage: 100, // Carregar mais itens de uma vez
          page: 1,
          includeAllCategories: false // Excluir roadmap e banco-conhecimento da aba Posts
        }),
        wordpressService.getRoadmapPosts({ 
          perPage: 100,
          page: 1
        }),
        wordpressService.getAdminKnowledge(token, { 
          per_page: 100,
          page: 1
        })
      ])
      
      console.log('Posts carregados:', postsData.length)
      console.log('Roadmap carregado:', roadmapData.length)
      console.log('Conhecimento carregado:', knowledgeData.length)
      
      // Transformar posts para formato do admin
      const transformedPosts = postsData.map(post => ({
        id: post.id,
        title: getSafeTitle(post),
        content: post.content?.rendered || post.content || '',
        excerpt: post.excerpt?.rendered || post.excerpt || '',
        status: 'publish',
        date: post.date,
        modified: post.modified,
        author: post.author || 'Equipe Dirhect',
        slug: post.slug,
        link: post.link,
        featured_media: post.featured_media
      }))
      
      // Transformar roadmap para formato do admin
      const transformedRoadmap = roadmapData.map(item => ({
        id: item.id,
        title: item.title || 'Sem título',
        description: item.description || '',
        content: item.content || '',
        status: item.status || 'planned',
        priority: item.priority || 'medium',
        quarter: item.quarter || '',
        category: item.category || '',
        votes: item.votes || 0,
        estimatedDate: item.estimatedDate || '',
        launchedDate: item.launchedDate || '',
        features: item.features || [],
        date: item.date,
        author: item.author || 'Equipe Dirhect',
        featured_media: item.featured_media
      }))
      
      setPosts(transformedPosts)
      setRoadmap(transformedRoadmap)
      
      // Transformar dados do banco de conhecimento
      const transformedKnowledge = knowledgeData.map(item => ({
        id: item.id,
        title: getSafeTitle(item),
        content: item.content?.rendered || item.content || '',
        excerpt: item.excerpt?.rendered || item.excerpt || '',
        category: item.acf?.knowledge_category || 'tutorial',
        views: item.acf?.knowledge_views || 0,
        featured: item.acf?.knowledge_featured || false,
        difficulty: item.acf?.knowledge_difficulty || 'beginner',
        readTime: item.acf?.knowledge_read_time || 5,
        originalAuthor: item.acf?.knowledge_original_author || '',
        lastUpdated: item.acf?.knowledge_last_updated || null,
        date: item.date,
        author: item.author || 'Equipe Dirhect',
        featured_media: item.featured_media
      }))
      
      setKnowledge(transformedKnowledge)
      
      // Atualizar paginação baseada no total de itens
      const totalItems = Math.max(postsData.length, roadmapData.length, knowledgeData.length)
      setTotalItems(totalItems)
      setTotalPages(Math.ceil(totalItems / itemsPerPage))
      setCurrentPage(1)
      
      console.log('Carregamento concluído com sucesso!')
      showNotification('Conteúdo carregado com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
      showNotification(`Erro ao carregar conteúdo: ${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Função para mudar de página (agora apenas para paginação visual)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // Não recarregar dados, apenas mudar a página visual
  }

  // Função para mudar de aba (não recarrega dados)
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1) // Resetar para primeira página apenas visualmente
    // Não recarregar dados
  }

  const handleSave = async (type) => {
    try {
      setSaving(true)
      const token = wordpressService.getCurrentToken()
      
      let result
      switch (type) {
        case 'post':
          result = await wordpressService.savePost(token, formData)
          // Transformar o resultado para o formato esperado pelo admin
          const transformedPost = {
            id: result.id,
            title: getSafeTitle(result),
            content: result.content?.rendered || result.content || '',
            excerpt: result.excerpt?.rendered || result.excerpt || '',
            status: 'publish',
            date: result.date,
            modified: result.modified,
            author: result.author || 'Equipe Dirhect',
            slug: result.slug,
            link: result.link,
            featured_media: result.featured_media
          }
          setPosts(prev => editingItem ? prev.map(p => p.id === editingItem.id ? transformedPost : p) : [...prev, transformedPost])
          break
        case 'roadmap':
          result = await wordpressService.saveRoadmapItem(token, formData)
          // Transformar o resultado para o formato esperado pelo admin
          const transformedRoadmap = {
            id: result.id,
            title: getSafeTitle(result),
            description: result.description || '',
            content: result.content?.rendered || result.content || '',
            status: result.acf?.roadmap_status || result.status || 'planned',
            priority: result.acf?.roadmap_priority || result.priority || 'medium',
            quarter: result.acf?.roadmap_quarter || result.quarter || '',
            category: result.acf?.roadmap_category || result.category || '',
            votes: result.acf?.roadmap_votes || result.votes || 0,
            estimatedDate: result.acf?.roadmap_estimated_date || result.estimatedDate || '',
            launchedDate: result.acf?.roadmap_launched_date || result.launchedDate || '',
            features: result.acf?.roadmap_features || result.features || [],
            date: result.date,
            author: result.author || 'Equipe Dirhect',
            featured_media: result.featured_media
          }
          setRoadmap(prev => editingItem ? prev.map(r => r.id === editingItem.id ? transformedRoadmap : r) : [...prev, transformedRoadmap])
          break
        case 'knowledge':
          result = await wordpressService.saveKnowledgeArticle(token, formData)
          // Transformar o resultado para o formato esperado pelo admin
          const transformedKnowledge = {
            id: result.id,
            title: getSafeTitle(result),
            content: result.content?.rendered || result.content || '',
            excerpt: result.excerpt?.rendered || result.excerpt || '',
            category: result.acf?.knowledge_category || result.category || 'tutorial',
            views: result.acf?.knowledge_views || result.views || 0,
            featured: result.acf?.knowledge_featured || result.featured || false,
            difficulty: result.acf?.knowledge_difficulty || result.difficulty || 'beginner',
            readTime: result.acf?.knowledge_read_time || result.readTime || 5,
            originalAuthor: result.acf?.knowledge_original_author || result.originalAuthor || '',
            lastUpdated: result.acf?.knowledge_last_updated || result.lastUpdated || null,
            date: result.date,
            author: result.author || 'Equipe Dirhect',
            featured_media: result.featured_media
          }
          setKnowledge(prev => editingItem ? prev.map(k => k.id === editingItem.id ? transformedKnowledge : k) : [...prev, transformedKnowledge])
          break
      }
      
      setShowForm(false)
      setEditingItem(null)
      setFormData({})
      showNotification(`${type === 'post' ? 'Post' : type === 'roadmap' ? 'Item do roadmap' : 'Artigo'} salvo com sucesso!`, 'success')
      
    } catch (error) {
      console.error('Erro ao salvar:', error)
      showNotification(error.message || 'Erro ao salvar', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return
    
    try {
      const token = wordpressService.getCurrentToken()
      
      switch (type) {
        case 'post':
          await wordpressService.deletePost(token, id)
          setPosts(prev => prev.filter(p => p.id !== id))
          break
        case 'roadmap':
          await wordpressService.deletePost(token, id) // Roadmap também são posts
          setRoadmap(prev => prev.filter(r => r.id !== id))
          break
        case 'knowledge':
          await wordpressService.deletePost(token, id) // Knowledge também são posts
          setKnowledge(prev => prev.filter(k => k.id !== id))
          break
      }
      
      showNotification('Item excluído com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao excluir:', error)
      showNotification(error.message || 'Erro ao excluir', 'error')
    }
  }

  const handleEdit = (type, item) => {
    // Extrair dados corretamente baseado no tipo
    let extractedData = {}
    
    switch (type) {
      case 'post':
        extractedData = {
          id: item.id,
          title: getSafeTitle(item),
          content: item.content?.rendered || item.content || '',
          excerpt: item.excerpt?.rendered || item.excerpt || '',
          status: item.status || 'publish',
          featured_image: item.featured_media
        }
        break
      case 'roadmap':
        extractedData = {
          id: item.id,
          title: getSafeTitle(item),
          description: item.description || '',
          content: item.content?.rendered || item.content || '',
          status: item.status || 'planned',
          priority: item.priority || 'medium',
          quarter: item.quarter || '',
          category: item.category || '',
          estimatedDate: item.estimatedDate || item.roadmap_estimated_date || '',
          launchedDate: item.launchedDate || item.roadmap_launched_date || '',
          features: item.features || []
        }
        
        // Se o item tem campos ACF, extrair deles
        if (item.acf) {
          extractedData.status = item.acf.roadmap_status || extractedData.status
          extractedData.priority = item.acf.roadmap_priority || extractedData.priority
          extractedData.quarter = item.acf.roadmap_quarter || extractedData.quarter
          extractedData.category = item.acf.roadmap_category || extractedData.category
          extractedData.estimatedDate = item.acf.roadmap_estimated_date || extractedData.estimatedDate
          extractedData.launchedDate = item.acf.roadmap_launched_date || extractedData.launchedDate
          // Converter features de array para string se necessário
          const features = item.acf.roadmap_features || extractedData.features
          extractedData.features = Array.isArray(features) ? features.join('\n') : features
        }
        
        // Se o item tem campos meta, extrair deles também
        if (item.meta) {
          extractedData.status = item.meta.roadmap_status || extractedData.status
          extractedData.priority = item.meta.roadmap_priority || extractedData.priority
          extractedData.quarter = item.meta.roadmap_quarter || extractedData.quarter
          extractedData.category = item.meta.roadmap_category || extractedData.category
          extractedData.estimatedDate = item.meta.roadmap_estimated_date || extractedData.estimatedDate
          extractedData.launchedDate = item.meta.roadmap_launched_date || extractedData.launchedDate
          // Converter features de array para string se necessário
          const features = item.meta.roadmap_features || extractedData.features
          extractedData.features = Array.isArray(features) ? features.join('\n') : features
        }
        break
      case 'knowledge':
        extractedData = {
          id: item.id,
          title: getSafeTitle(item),
          content: item.content?.rendered || item.content || '',
          excerpt: item.excerpt?.rendered || item.excerpt || '',
          category: item.category || item.knowledge_category || 'tutorial',
          views: item.views || item.knowledge_views || 0,
          featured: item.featured || item.knowledge_featured || false,
          difficulty: item.difficulty || item.knowledge_difficulty || 'beginner',
          readTime: item.readTime || item.knowledge_read_time || 5,
          originalAuthor: item.originalAuthor || item.knowledge_original_author || '',
          lastUpdated: item.lastUpdated || item.knowledge_last_updated || null
        }
        
        // Se o item tem campos ACF, extrair deles
        if (item.acf) {
          extractedData.category = item.acf.knowledge_category || extractedData.category
          extractedData.views = item.acf.knowledge_views || extractedData.views
          extractedData.featured = item.acf.knowledge_featured || extractedData.featured
          extractedData.difficulty = item.acf.knowledge_difficulty || extractedData.difficulty
          extractedData.readTime = item.acf.knowledge_read_time || extractedData.readTime
          extractedData.originalAuthor = item.acf.knowledge_original_author || extractedData.originalAuthor
          extractedData.lastUpdated = item.acf.knowledge_last_updated || extractedData.lastUpdated
        }
        
        // Se o item tem campos meta, extrair deles também
        if (item.meta) {
          extractedData.category = item.meta.knowledge_category || extractedData.category
          extractedData.views = item.meta.knowledge_views || extractedData.views
          extractedData.featured = item.meta.knowledge_featured || extractedData.featured
          extractedData.difficulty = item.meta.knowledge_difficulty || extractedData.difficulty
          extractedData.readTime = item.meta.knowledge_read_time || extractedData.readTime
          extractedData.originalAuthor = item.meta.knowledge_original_author || extractedData.originalAuthor
          extractedData.lastUpdated = item.meta.knowledge_last_updated || extractedData.lastUpdated
        }
        break
    }
    
    setEditingItem(item)
    setFormData(extractedData)
    setShowForm(type)
  }

  const handleNew = (type) => {
    setEditingItem(null)
    setFormData({})
    setShowForm(type)
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Função auxiliar para extrair título de forma segura
  const getSafeTitle = (item) => {
    if (!item) return 'Sem título'
    
    // Se title é um objeto com propriedade rendered
    if (item.title && typeof item.title === 'object' && item.title.rendered) {
      return item.title.rendered
    }
    
    // Se title é uma string
    if (typeof item.title === 'string') {
      return item.title
    }
    
    // Se title é um objeto com propriedade raw
    if (item.title && typeof item.title === 'object' && item.title.raw) {
      return item.title.raw
    }
    
    return 'Sem título'
  }

  const renderLoginForm = () => (
    <div className="admin-login">
      <div className="admin-login-card">
        <h2>Área Administrativa</h2>
        <p>Faça login para acessar o painel de administração</p>
        
        {error && (
          <div className="login-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              placeholder="Digite seu usuário"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Digite sua senha"
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )

  const renderForm = () => {
    if (!showForm) return null

    const getFormFields = () => {
      switch (showForm) {
        case 'post':
          return [
            { name: 'title', label: 'Título', type: 'text', required: true, placeholder: 'Digite o título do post' },
            { name: 'content', label: 'Conteúdo', type: 'richtext', required: true },
            { name: 'excerpt', label: 'Resumo', type: 'textarea', required: false, placeholder: 'Digite um resumo do post' },
            { name: 'status', label: 'Status', type: 'select', required: true, options: ['draft', 'publish'] },
            { name: 'featured_image', label: 'Imagem Destacada', type: 'file', required: false }
          ]
        case 'roadmap':
          return [
            { name: 'title', label: 'Título', type: 'text', required: true, placeholder: 'Digite o título do item' },
            { name: 'description', label: 'Descrição', type: 'textarea', required: true, placeholder: 'Digite a descrição do item' },
            { name: 'content', label: 'Conteúdo Detalhado', type: 'richtext', required: false },
            { name: 'status', label: 'Status', type: 'select', required: true, options: ['planned', 'in-progress', 'completed'] },
            { name: 'priority', label: 'Prioridade', type: 'select', required: true, options: ['low', 'medium', 'high'] },
            { name: 'quarter', label: 'Trimestre', type: 'text', required: false, placeholder: 'Ex: Q1 2024' },
            { name: 'category', label: 'Categoria', type: 'text', required: false, placeholder: 'Ex: Interface, Backend, Mobile' },
            { name: 'estimatedDate', label: 'Data Estimada', type: 'date', required: false },
            { name: 'launchedDate', label: 'Data de Lançamento', type: 'date', required: false },
            { name: 'features', label: 'Funcionalidades', type: 'textarea', required: false, placeholder: 'Digite as funcionalidades, uma por linha' }
          ]
        case 'knowledge':
          return [
            { name: 'title', label: 'Título', type: 'text', required: true, placeholder: 'Digite o título do artigo' },
            { name: 'content', label: 'Conteúdo', type: 'richtext', required: true },
            { name: 'excerpt', label: 'Resumo', type: 'textarea', required: false, placeholder: 'Digite um resumo do artigo' },
            { name: 'category', label: 'Categoria', type: 'select', required: true, options: ['tutorial', 'guia', 'faq', 'dica', 'troubleshooting', 'best-practices'] },
            { name: 'difficulty', label: 'Nível de Dificuldade', type: 'select', required: true, options: ['beginner', 'intermediate', 'advanced', 'expert'] },
            { name: 'featured', label: 'Artigo Destacado', type: 'checkbox', required: false }
          ]
        default:
          return []
      }
    }

    const fields = getFormFields()

    const modalContent = (
      <div className="admin-form-overlay">
        <div className="admin-form">
          <div className="form-header">
            <h3>{editingItem ? 'Editar' : 'Novo'} {showForm === 'post' ? 'Post' : showForm === 'roadmap' ? 'Item do Roadmap' : 'Artigo'}</h3>
            <button onClick={() => setShowForm(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(showForm) }}>
            {fields.map(field => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === 'richtext' ? (
                  <RichTextEditor
                    value={formData[field.name] || ''}
                    onChange={val => setFormData(prev => ({ ...prev, [field.name]: val }))}
                    disabled={saving}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={field.name === 'content' ? 8 : 4}
                    disabled={saving}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    required={field.required}
                    disabled={saving}
                  >
                    <option value="">Selecione...</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option === 'tutorial' ? 'Tutorial' :
                         option === 'guia' ? 'Guia' :
                         option === 'faq' ? 'FAQ' :
                         option === 'dica' ? 'Dica' :
                         option === 'troubleshooting' ? 'Solução de Problemas' :
                         option === 'best-practices' ? 'Melhores Práticas' :
                         option === 'beginner' ? 'Iniciante' :
                         option === 'intermediate' ? 'Intermediário' :
                         option === 'advanced' ? 'Avançado' :
                         option === 'expert' ? 'Especialista' :
                         option === 'planned' ? 'Planejado' :
                         option === 'in-progress' ? 'Em Desenvolvimento' :
                         option === 'completed' ? 'Concluído' :
                         option === 'low' ? 'Baixa' :
                         option === 'medium' ? 'Média' :
                         option === 'high' ? 'Alta' :
                         option === 'draft' ? 'Rascunho' :
                         option === 'publish' ? 'Publicado' :
                         option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={formData[field.name] || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                      disabled={saving}
                    />
                    <span>Sim</span>
                  </label>
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || field.default || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    required={field.required}
                    placeholder={field.placeholder}
                    min={field.min}
                    disabled={saving}
                  />
                ) : field.type === 'file' ? (
                  <div className="file-upload-group">
                    <input
                      type="file"
                      id={field.name}
                      name={field.name}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, [field.name]: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      disabled={saving}
                    />
                    {(formData[field.name] || editingItem?.featured_media) && (
                      <div className="image-preview">
                        <img 
                          src={formData[field.name] || editingItem?.featured_media} 
                          alt="Preview" 
                          style={{ maxWidth: '200px', maxHeight: '150px', marginTop: '10px' }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    required={field.required}
                    placeholder={field.placeholder}
                    disabled={saving}
                  />
                )}
              </div>
            ))}
            
            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} disabled={saving}>
                Cancelar
              </button>
              <button type="submit" className="save-btn" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )

    // Usar createPortal para renderizar o modal fora da hierarquia do DOM
    return createPortal(modalContent, document.body)
  }

  const renderAdminPanel = () => (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-user-info">
          <h2>Painel Administrativo</h2>
          <p>Bem-vindo, {user?.name}</p>
        </div>
        <div className="admin-actions">
          <button onClick={() => loadContent(currentPage)} className="reload-btn" disabled={loading}>
            {loading ? 'Carregando...' : 'Recarregar'}
          </button>
          <button onClick={testConnection} className="test-btn" disabled={loading}>
            <AlertCircle size={16} />
            Testar Conexão
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabChange('posts')}
        >
          <FileText size={16} />
          Posts ({posts.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => handleTabChange('roadmap')}
        >
          <Map size={16} />
          Roadmap ({roadmap.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'knowledge' ? 'active' : ''}`}
          onClick={() => handleTabChange('knowledge')}
        >
          <BookOpen size={16} />
          Banco de Conhecimento ({knowledge.length})
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'posts' && renderPostsTab()}
        {activeTab === 'roadmap' && renderRoadmapTab()}
        {activeTab === 'knowledge' && renderKnowledgeTab()}
      </div>
    </div>
  )

  // Componente de paginação
  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Botão anterior
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
        >
          ← Anterior
        </button>
      )
    }

    // Primeira página
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="pagination-btn"
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key="dots1" className="pagination-dots">...</span>)
      }
    }

    // Páginas do meio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      )
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="pagination-dots">...</span>)
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
        >
          {totalPages}
        </button>
      )
    }

    // Botão próximo
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Próximo →
        </button>
      )
    }

    return (
      <div className="pagination">
        <div className="pagination-info">
          Página {currentPage} de {totalPages} • {totalItems} itens
        </div>
        <div className="pagination-controls">
          {pages}
        </div>
      </div>
    )
  }

  // Função para obter os itens da página atual
  const getCurrentPageItems = (items) => {
    const startIdx = (currentPage - 1) * itemsPerPage
    const endIdx = startIdx + itemsPerPage
    return items.slice(startIdx, endIdx)
  }

  // Atualizar totalPages ao mudar de aba ou dados
  useEffect(() => {
    let total = 0
    if (activeTab === 'posts') total = posts.length
    if (activeTab === 'roadmap') total = roadmap.length
    if (activeTab === 'knowledge') total = knowledge.length
    setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)))
    setTotalItems(total)
    setCurrentPage(1)
  }, [activeTab, posts, roadmap, knowledge, itemsPerPage])

  // Atualizar renderização das tabs para usar apenas os itens da página atual
  const renderPostsTab = () => (
    <div className="content-tab">
      <div className="tab-header">
        <h3>Gerenciar Posts</h3>
        <button onClick={() => handleNew('post')} className="add-btn">
          <Plus size={16} />
          Novo Post
        </button>
      </div>
      
      <div className="content-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <p>Nenhum post encontrado</p>
          </div>
        ) : (
          getCurrentPageItems(posts).map(post => (
            <div key={post.id} className="content-item">
              <div className="item-info">
                <h4>{getSafeTitle(post)}</h4>
                <span className={`status ${post.status}`}>{post.status}</span>
                <span className="date">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="item-actions">
                <button className="action-btn edit" onClick={() => handleEdit('post', post)}>
                  <Edit size={14} />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete('post', post.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {renderPagination()}
    </div>
  )

  const renderRoadmapTab = () => (
    <div className="content-tab">
      <div className="tab-header">
        <h3>Gerenciar Roadmap</h3>
        <button onClick={() => handleNew('roadmap')} className="add-btn">
          <Plus size={16} />
          Nova Funcionalidade
        </button>
      </div>
      
      <div className="content-list">
        {roadmap.length === 0 ? (
          <div className="empty-state">
            <Map size={48} />
            <p>Nenhum item do roadmap encontrado</p>
          </div>
        ) : (
          getCurrentPageItems(roadmap).map(item => (
            <div key={item.id} className="content-item">
              <div className="item-info">
                <h4>{item.title}</h4>
                <span className={`status ${item.status}`}>{item.status}</span>
                <span className={`priority ${item.priority}`}>{item.priority}</span>
                {item.quarter && <span className="quarter">{item.quarter}</span>}
                <span className="votes">{item.votes || 0} votos</span>
              </div>
              <div className="item-actions">
                <button className="action-btn edit" onClick={() => handleEdit('roadmap', item)}>
                  <Edit size={14} />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete('roadmap', item.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {renderPagination()}
    </div>
  )

  const renderKnowledgeTab = () => (
    <div className="content-tab">
      <div className="tab-header">
        <h3>Banco de Conhecimento</h3>
        <button onClick={() => handleNew('knowledge')} className="add-btn">
          <Plus size={16} />
          Novo Artigo
        </button>
      </div>
      
      <div className="content-list">
        {knowledge.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={48} />
            <p>Nenhum artigo encontrado</p>
          </div>
        ) : (
          getCurrentPageItems(knowledge).map(item => (
            <div key={item.id} className="content-item">
              <div className="item-info">
                <h4>{getSafeTitle(item)}</h4>
                <span className="category">{item.category}</span>
                <span className="views">{item.views || 0} visualizações</span>
                {item.featured && <span className="featured-badge">Destaque</span>}
              </div>
              <div className="item-actions">
                <button className="action-btn view">
                  <Eye size={14} />
                </button>
                <button className="action-btn edit" onClick={() => handleEdit('knowledge', item)}>
                  <Edit size={14} />
                </button>
                <button className="action-btn delete" onClick={() => handleDelete('knowledge', item.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {renderPagination()}
    </div>
  )

  if (loading) {
    return (
      <div className="admin-page">
        <Header />
        <div className="admin-loading">
          <div className="loading-spinner"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="admin-page">
      <Header />
      <main className="admin-main">
        {isAuthenticated ? renderAdminPanel() : renderLoginForm()}
        {renderForm()}
      </main>
      
      {/* Notificação */}
      {notification && (
        <div className={`admin-notification admin-notification--${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'error' && <AlertCircle size={20} />}
              {notification.type === 'info' && <AlertCircle size={20} />}
            </div>
            <span>{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}

export default Admin 