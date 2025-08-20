import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Eye, 
  Clock, 
  Tag, 
  BookOpen, 
  Book, 
  Users, 
  TrendingUp, 
  Star, 
  AlertTriangle, 
  ArrowRight, 
  Code, 
  Settings, 
  Shield, 
  Zap 
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import './ConhecimentoDetalhe.css'
import FloatingButtons from '../components/FloatingButtons'

const ConhecimentoDetalhe = () => {
  const { id } = useParams()
  const [artigo, setArtigo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])

  // Buscar artigo específico
  useEffect(() => {
    const fetchArtigo = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Tentar buscar por ID primeiro
        let artigoData
        try {
          artigoData = await wordpressService.getKnowledgePost(id)
        } catch (err) {
          // Se falhar por ID, tentar buscar por slug
          console.log('Tentando buscar por slug...')
          artigoData = await wordpressService.getKnowledgePostBySlug(id)
        }
        
        setArtigo(artigoData)
        
        // Buscar artigos relacionados
        if (artigoData.categoryIds && artigoData.categoryIds.length > 0) {
          const related = await wordpressService.getRelatedKnowledgePosts(
            artigoData.id, 
            artigoData.categoryIds, 
            3
          )
          setRelatedArticles(related)
        }
        
      } catch (err) {
        console.error('Erro ao carregar artigo:', err)
        setError('Artigo não encontrado ou erro ao carregar')
        
        // Usar dados de fallback
        const fallbackData = wordpressService.getFallbackKnowledgePosts()
        const fallbackArtigo = fallbackData.find(item => 
          item.id.toString() === id || item.slug === id
        )
        
        if (fallbackArtigo) {
          setArtigo(fallbackArtigo)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchArtigo()
    }
  }, [id])

  // Calcular tempo de leitura
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return readTime
  }

  // Obter configuração da categoria
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <div className="conhecimento-detalhe-page">
        <Header />
        <div className="artigo-loading">
          <div className="loading-spinner"></div>
          <p>Carregando artigo...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error && !artigo) {
    return (
      <div className="conhecimento-detalhe-page">
        <Header />
        <div className="conhecimento-detalhe-container">
          <div className="artigo-error">
            <h2>Artigo não encontrado</h2>
            <p>O artigo que você está procurando não foi encontrado ou pode ter sido removido.</p>
            <Link to="/conhecimento" className="artigo-error-btn">
              <ArrowLeft size={16} />
              Voltar ao Banco de Conhecimento
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!artigo) {
    return (
      <div className="conhecimento-detalhe-page">
        <Header />
        <div className="conhecimento-detalhe-container">
          <div className="artigo-error">
            <h2>Artigo não encontrado</h2>
            <p>O artigo que você está procurando não foi encontrado.</p>
            <Link to="/conhecimento" className="artigo-error-btn">
              <ArrowLeft size={16} />
              Voltar ao Banco de Conhecimento
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const categoryConfig = getCategoryConfig(artigo.category)
  const readTime = calculateReadTime(artigo.content)
  const categorySlug = artigo.category?.toLowerCase().replace(/\s+/g, '-') || 'outros'

  return (
    <div className="conhecimento-detalhe-page">
      <Header />
      
      <main className="conhecimento-detalhe-main">
        <div className="conhecimento-detalhe-container">
          {/* Header do Artigo */}
          <div className="artigo-header">
            <Link to="/conhecimento" className="back-btn">
              <ArrowLeft size={16} />
              Voltar ao Banco de Conhecimento
            </Link>

            <div className="artigo-meta">
              <div 
                className={`artigo-category artigo-category--${categorySlug}`}
                style={{ 
                  color: categoryConfig.color,
                  borderColor: categoryConfig.color 
                }}
              >
                {categoryConfig.icon}
                <span>{categoryConfig.text}</span>
              </div>
              
              <div className="artigo-date">
                <Calendar size={16} />
                <span>{new Date(artigo.date).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="artigo-author">
                <User size={16} />
                <span>{artigo.author}</span>
              </div>
              
              <div className="artigo-views">
                <Eye size={16} />
                <span>{artigo.views || 0} visualizações</span>
              </div>
              
              <div className="artigo-read-time">
                <Clock size={16} />
                <span>{readTime} min de leitura</span>
              </div>
            </div>

            <h1 className="artigo-title">{artigo.title}</h1>
            
            {artigo.excerpt && (
              <p className="artigo-excerpt">{artigo.excerpt}</p>
            )}

            {artigo.tags && artigo.tags.length > 0 && (
              <div className="artigo-tags">
                {artigo.tags.map((tag, idx) => (
                  <span key={idx} className="artigo-tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Conteúdo do Artigo */}
          <div 
            className="artigo-content"
            dangerouslySetInnerHTML={{ __html: artigo.content }}
          />

          {/* Artigos Relacionados */}
          {relatedArticles.length > 0 && (
            <div className="artigos-relacionados">
              <h3>Artigos Relacionados</h3>
              <div className="artigos-relacionados-grid">
                {relatedArticles.map((relatedArtigo) => (
                  <Link 
                    key={relatedArtigo.id} 
                    to={`/conhecimento/${relatedArtigo.id}`}
                    className="artigo-relacionado-card"
                  >
                    <h4>{relatedArtigo.title}</h4>
                    <p>{relatedArtigo.excerpt}</p>
                    <div className="artigo-relacionado-meta">
                      <span>{new Date(relatedArtigo.date).toLocaleDateString('pt-BR')}</span>
                      <span>{calculateReadTime(relatedArtigo.content)} min</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default ConhecimentoDetalhe 