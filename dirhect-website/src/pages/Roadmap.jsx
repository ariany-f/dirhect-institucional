import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, Circle, AlertCircle, ArrowRight, Users, Zap } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import './Roadmap.css'
import FloatingButtons from '../components/FloatingButtons'

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuarter, setSelectedQuarter] = useState('all')
  const [error, setError] = useState(null)

  // Buscar dados do roadmap do WordPress
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Buscar posts da categoria roadmap
        const roadmapPosts = await wordpressService.getRoadmapPosts({
          per_page: 50,
          orderby: 'date',
          order: 'desc'
        })
        
        setRoadmapItems(roadmapPosts)
      } catch (err) {
        console.error('Erro ao carregar dados do roadmap:', err)
        setError('Erro ao carregar roadmap')
        
        // Usar dados de fallback em caso de erro
        const fallbackData = wordpressService.getFallbackRoadmapPosts()
        setRoadmapItems(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoadmapData()
  }, [])

  // Gerar lista de quarters dinamicamente baseada nos dados
  const quarters = ['all', ...new Set(roadmapItems.map(item => item.quarter))].sort((a, b) => {
    if (a === 'all') return -1
    if (b === 'all') return 1
    return b.localeCompare(a) // Ordem decrescente (mais recente primeiro)
  })

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: <CheckCircle size={20} />,
        text: 'Lançado',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)'
      },
      'in-progress': {
        icon: <Clock size={20} />,
        text: 'Em Desenvolvimento',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)'
      },
      planned: {
        icon: <Circle size={20} />,
        text: 'Planejado',
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.1)'
      },
      research: {
        icon: <AlertCircle size={20} />,
        text: 'Pesquisa',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)'
      }
    }
    return configs[status] || configs.planned
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    }
    return colors[priority] || colors.medium
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredItems = selectedQuarter === 'all' 
    ? roadmapItems 
    : roadmapItems.filter(item => item.quarter === selectedQuarter)

  const completedItems = roadmapItems.filter(item => item.status === 'completed')
  const inProgressItems = roadmapItems.filter(item => item.status === 'in-progress')
  const plannedItems = roadmapItems.filter(item => item.status === 'planned' || item.status === 'research')

  if (isLoading) {
    return (
      <div className="roadmap-page">
        <Header />
        <div className="roadmap-loading">
          <div className="loading-spinner"></div>
          <p>Carregando roadmap...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="roadmap-page">
      <Header />
      
      <main className="roadmap-main">
        <div className="roadmap-hero">
          <div className="roadmap-hero-content">
            <div className="roadmap-badge">
              <Zap size={16} />
              <span>Inovação Contínua</span>
            </div>
            
            <h1 className="roadmap-title">
              Roadmap de <span className="gradient-text">Inovações</span>
            </h1>
            
            <p className="roadmap-subtitle">
              Acompanhe as funcionalidades já lançadas e as próximas melhorias que estamos desenvolvendo 
              para revolucionar ainda mais sua experiência de RH
            </p>

            {error && (
              <div className="roadmap-error">
                <p>{error}</p>
                <p><small>Exibindo conteúdo em cache</small></p>
              </div>
            )}

            <div className="roadmap-stats">
              <div className="roadmap-stat">
                <div className="roadmap-stat-number">{completedItems.length}</div>
                <div className="roadmap-stat-label">Já Lançadas</div>
              </div>
              <div className="roadmap-stat">
                <div className="roadmap-stat-number">{inProgressItems.length}</div>
                <div className="roadmap-stat-label">Em Desenvolvimento</div>
              </div>
              <div className="roadmap-stat">
                <div className="roadmap-stat-number">{plannedItems.length}</div>
                <div className="roadmap-stat-label">Planejadas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="roadmap-container">
          {quarters.length > 1 && (
            <div className="roadmap-filters">
              <div className="roadmap-filter-tabs">
                {quarters.map(quarter => (
                  <button
                    key={quarter}
                    className={`roadmap-filter-tab ${selectedQuarter === quarter ? 'active' : ''}`}
                    onClick={() => setSelectedQuarter(quarter)}
                  >
                    {quarter === 'all' ? 'Todos os Períodos' : quarter}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="roadmap-grid">
            {filteredItems.length === 0 ? (
              <div className="roadmap-empty">
                <p>Nenhum item encontrado para o período selecionado.</p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const statusConfig = getStatusConfig(item.status)
                
                return (
                  <div 
                    key={item.id} 
                    className={`roadmap-card roadmap-card--${item.status}`}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="roadmap-card-header">
                      <div className="roadmap-card-status" style={{ 
                        color: statusConfig.color,
                        backgroundColor: statusConfig.bgColor 
                      }}>
                        {statusConfig.icon}
                        <span>{statusConfig.text}</span>
                      </div>
                      
                      <div className="roadmap-card-meta">
                        <div 
                          className="roadmap-card-priority"
                          style={{ backgroundColor: getPriorityColor(item.priority) }}
                        >
                          {item.priority === 'high' ? 'Alta' : 
                           item.priority === 'medium' ? 'Média' : 'Baixa'}
                        </div>
                        <div className="roadmap-card-quarter">{item.quarter}</div>
                      </div>
                    </div>

                    <div className="roadmap-card-content">
                      <div className="roadmap-card-category">{item.category}</div>
                      <h3 className="roadmap-card-title">{item.title}</h3>
                      <p className="roadmap-card-description">{item.description}</p>

                      <div className="roadmap-card-features">
                        <h4>Principais funcionalidades:</h4>
                        <ul>
                          {item.features.map((feature, idx) => (
                            <li key={idx}>
                              <CheckCircle size={14} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="roadmap-card-footer">
                      <div className="roadmap-card-date">
                        <Calendar size={16} />
                        <span>
                          {item.status === 'completed' && item.launchedDate
                            ? `Lançado: ${new Date(item.launchedDate).toLocaleDateString('pt-BR')}`
                            : `Previsão: ${new Date(item.estimatedDate).toLocaleDateString('pt-BR')}`
                          }
                        </span>
                      </div>
                      
                      {item.status !== 'completed' && (
                        <div className="roadmap-card-votes">
                          <Users size={16} />
                          <span>{item.votes} votos</span>
                        </div>
                      )}
                    </div>

                    {item.status !== 'completed' && (
                      <div className="roadmap-card-cta">
                        <button className="roadmap-vote-btn">
                          <span>Votar nesta funcionalidade</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Roadmap 