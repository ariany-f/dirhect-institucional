import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, BookOpen, ArrowRight, Users, Book, Tag, Star, Clock, TrendingUp, AlertCircle, CheckCircle, Code, Settings, Shield, Zap, AlertTriangle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import './Conhecimento.css'
import FloatingButtons from '../components/FloatingButtons'

const Conhecimento = () => {
  const [knowledgeItems, setKnowledgeItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  // Buscar dados do banco de conhecimento do WordPress
  useEffect(() => {
    const fetchKnowledgeData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Buscar posts da categoria conhecimento
        const knowledgePosts = await wordpressService.getKnowledgePosts({
          per_page: 50,
          orderby: 'date',
          order: 'desc'
        })
        
        setKnowledgeItems(knowledgePosts)
      } catch (err) {
        console.error('Erro ao carregar dados do banco de conhecimento:', err)
        setError('Erro ao carregar banco de conhecimento')
        
        // Usar dados de fallback em caso de erro
        const fallbackData = wordpressService.getFallbackKnowledgePosts()
        setKnowledgeItems(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchKnowledgeData()
  }, [])

  // Função para mostrar notificações
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Gerar lista de categorias dinamicamente baseada nos dados
  const categories = ['all', ...new Set(knowledgeItems.map(item => item.category))].filter(Boolean).sort()

  const getCategoryConfig = (category) => {
    const configs = {
      'Tutorial': {
        icon: <BookOpen size={20} />,
        text: 'Tutorial',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)'
      },
      'Guia': {
        icon: <Book size={20} />,
        text: 'Guia',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)'
      },
      'FAQ': {
        icon: <Users size={20} />,
        text: 'FAQ',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)'
      },
      'Dicas': {
        icon: <TrendingUp size={20} />,
        text: 'Dicas',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)'
      },
      'Melhores Práticas': {
        icon: <Star size={20} />,
        text: 'Melhores Práticas',
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)'
      },
      'Troubleshooting': {
        icon: <AlertTriangle size={20} />,
        text: 'Troubleshooting',
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.1)'
      },
      'Integração': {
        icon: <ArrowRight size={20} />,
        text: 'Integração',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.1)'
      },
      'API': {
        icon: <Code size={20} />,
        text: 'API',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.1)'
      },
      'Configuração': {
        icon: <Settings size={20} />,
        text: 'Configuração',
        color: '#0891b2',
        bgColor: 'rgba(8, 145, 178, 0.1)'
      },
      'Segurança': {
        icon: <Shield size={20} />,
        text: 'Segurança',
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.1)'
      },
      'Performance': {
        icon: <Zap size={20} />,
        text: 'Performance',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)'
      },
      'Outros': {
        icon: <BookOpen size={20} />,
        text: 'Outros',
        color: '#6b7280',
        bgColor: 'rgba(107, 114, 128, 0.1)'
      }
    }
    return configs[category] || configs['Outros']
  }

  // Calcular tempo de leitura baseado no conteúdo
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return readTime
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredItems = selectedCategory === 'all' 
    ? knowledgeItems 
    : knowledgeItems.filter(item => item.category === selectedCategory)

  const featuredItems = knowledgeItems.filter(item => item.featured)
  const tutorialItems = knowledgeItems.filter(item => item.category === 'Tutorial')
  const guideItems = knowledgeItems.filter(item => item.category === 'Guia')

  if (isLoading) {
    return (
      <div className="conhecimento-page">
        <Header />
        <div className="conhecimento-loading">
          <div className="loading-spinner"></div>
          <p>Carregando banco de conhecimento...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="conhecimento-page">
      <Header />
      
      <main className="conhecimento-main">
        <div className="conhecimento-hero">
          <div className="conhecimento-hero-content">
            <div className="conhecimento-badge">
              <Book size={16} />
              <span>Base de Conhecimento</span>
            </div>
            
            <h1 className="conhecimento-title">
              Banco de <span className="yellow-text">Conhecimento</span>
            </h1>
            
            <p className="conhecimento-subtitle">
              Explore nossa biblioteca de artigos, tutoriais e guias para aproveitar ao máximo 
              todas as funcionalidades da plataforma Dirhect
            </p>

            {error && (
              <div className="conhecimento-error">
                <p>{error}</p>
                <p><small>Exibindo conteúdo em cache</small></p>
              </div>
            )}

            <div className="conhecimento-stats">
              <div className="conhecimento-stat">
                <div className="conhecimento-stat-number">{knowledgeItems.length}</div>
                <div className="conhecimento-stat-label">Artigos Disponíveis</div>
              </div>
              <div className="conhecimento-stat">
                <div className="conhecimento-stat-number">{featuredItems.length}</div>
                <div className="conhecimento-stat-label">Em Destaque</div>
              </div>
              <div className="conhecimento-stat">
                <div className="conhecimento-stat-number">{tutorialItems.length}</div>
                <div className="conhecimento-stat-label">Tutoriais</div>
              </div>
            </div>
          </div>
        </div>

        <div className="conhecimento-container">
          {categories.length > 1 && (
            <div className="conhecimento-filters">
              <div className="conhecimento-filter-tabs">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`conhecimento-filter-tab ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Todas as Categorias' : category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="conhecimento-grid">
            {filteredItems.length === 0 ? (
              <div className="conhecimento-empty">
                <p>Nenhum artigo encontrado para a categoria selecionada.</p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const categoryConfig = getCategoryConfig(item.category)
                const readTime = calculateReadTime(item.content)
                
                return (
                  <div 
                    key={item.id} 
                    className={`conhecimento-card conhecimento-card--${item.category?.toLowerCase().replace(/\s+/g, '-') || 'outros'}`}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="conhecimento-card-header">
                      <div 
                        className={`conhecimento-card-category conhecimento-card-category--${item.category?.toLowerCase().replace(/\s+/g, '-') || 'outros'}`}
                        style={{ 
                          color: categoryConfig.color,
                          borderColor: categoryConfig.color 
                        }}
                      >
                        {categoryConfig.icon}
                        <span>{categoryConfig.text}</span>
                      </div>
                      
                      <div className="conhecimento-card-meta">
                        {item.featured && (
                          <div className="conhecimento-card-featured">
                            <Star size={12} />
                            Destaque
                          </div>
                        )}
                        <div className="conhecimento-card-date">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>

                    <div className="conhecimento-card-content">
                      <h3 className="conhecimento-card-title">{item.title}</h3>
                      <p className="conhecimento-card-excerpt">{item.excerpt}</p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="conhecimento-card-tags">
                          {item.tags.slice(0, 5).map((tag, idx) => (
                            <span key={idx} className="conhecimento-card-tag">
                              <Tag size={12} />
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 5 && (
                            <span className="conhecimento-card-tag">
                              +{item.tags.length - 5} mais
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="conhecimento-card-footer">
                      <div className="conhecimento-card-views">
                        <Eye size={16} />
                        <span>{item.views || 0} visualizações</span>
                      </div>
                      
                      <div className="conhecimento-card-read-time">
                        <Clock size={16} />
                        <span>{readTime} min de leitura</span>
                      </div>
                    </div>

                    <div className="conhecimento-card-cta">
                      <Link 
                        to={`/conhecimento/${item.id}`}
                        className="conhecimento-read-btn"
                      >
                        <span>Ler Artigo Completo</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>

      {/* Componente de Notificação */}
      {notification && (
        <div className={`conhecimento-notification conhecimento-notification--${notification.type}`}>
          <div className="conhecimento-notification-content">
            <div className="conhecimento-notification-icon">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'warning' && <AlertCircle size={20} />}
              {notification.type === 'error' && <AlertCircle size={20} />}
            </div>
            <span>{notification.message}</span>
            <button 
              className="conhecimento-notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Conhecimento 