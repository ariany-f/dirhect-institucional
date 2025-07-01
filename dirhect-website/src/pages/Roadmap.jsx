import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, Circle, AlertCircle, ArrowRight, Users, Zap } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Roadmap.css'
import FloatingButtons from '../components/FloatingButtons'

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuarter, setSelectedQuarter] = useState('all')

  // Dados fake do roadmap incluindo funcionalidades já lançadas
  const fakeRoadmapData = [
    // Funcionalidades já lançadas
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
      id: 7,
      title: "Dashboard de Performance 3.0",
      description: "Nova versão do dashboard com visualizações interativas, comparativos históricos e métricas de engajamento em tempo real.",
      status: "completed",
      priority: "high",
      quarter: "Q3 2023",
      category: "Analytics",
      votes: 198,
      estimatedDate: "2023-09-30",
      launchedDate: "2023-09-25",
      features: [
        "Gráficos interativos",
        "Comparativos históricos",
        "Métricas de engajamento",
        "Exportação em PDF"
      ]
    },
    {
      id: 8,
      title: "Sistema de Avaliação 360°",
      description: "Plataforma completa para avaliações 360 graus com feedback multidirecional, relatórios automatizados e planos de desenvolvimento.",
      status: "completed",
      priority: "medium",
      quarter: "Q2 2023",
      category: "Avaliações",
      votes: 167,
      estimatedDate: "2023-06-30",
      launchedDate: "2023-06-28",
      features: [
        "Avaliação multidirecional",
        "Relatórios automatizados",
        "Planos de desenvolvimento",
        "Notificações inteligentes"
      ]
    },
    // Funcionalidades em desenvolvimento
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
    // Funcionalidades planejadas
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
    },
    {
      id: 4,
      title: "Portal do Colaborador Mobile 2.0",
      description: "Redesign completo do aplicativo mobile com nova UX/UI, performance otimizada e funcionalidades offline.",
      status: "planned",
      priority: "high",
      quarter: "Q2 2024",
      category: "Mobile",
      votes: 312,
      estimatedDate: "2024-05-20",
      features: [
        "Interface redesenhada",
        "Modo offline",
        "Push notifications inteligentes",
        "Biometria para acesso"
      ]
    },
    {
      id: 5,
      title: "Blockchain para Certificações",
      description: "Sistema de certificações digitais baseado em blockchain para garantir autenticidade e imutabilidade dos documentos.",
      status: "research",
      priority: "low",
      quarter: "Q3 2024",
      category: "Blockchain",
      votes: 89,
      estimatedDate: "2024-09-30",
      features: [
        "Certificados à prova de fraude",
        "Verificação instantânea",
        "NFTs para conquistas",
        "Portfólio profissional descentralizado"
      ]
    },
    {
      id: 6,
      title: "API de Integração Avançada",
      description: "Nova versão da API com GraphQL, webhooks em tempo real e SDK para principais linguagens de programação.",
      status: "planned",
      priority: "medium",
      quarter: "Q3 2024",
      category: "Desenvolvimento",
      votes: 134,
      estimatedDate: "2024-08-15",
      features: [
        "GraphQL endpoint",
        "Webhooks em tempo real",
        "SDK multi-linguagem",
        "Documentação interativa"
      ]
    }
  ]

  const quarters = ['all', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024']

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

  useEffect(() => {
    // Simula carregamento de dados do WordPress
    setTimeout(() => {
      setRoadmapItems(fakeRoadmapData)
      setIsLoading(false)
    }, 1000)
  }, [])

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

          <div className="roadmap-grid">
            {filteredItems.map((item, index) => {
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
                        {item.status === 'completed' 
                          ? `Lançado: ${new Date(item.launchedDate).toLocaleDateString('pt-BR')}`
                          : `Previsão: ${new Date(item.estimatedDate).toLocaleDateString('pt-BR')}`
                        }
                      </span>
                    </div>
                    
                    <div className="roadmap-card-votes">
                      <Users size={16} />
                      <span>{item.votes} votos</span>
                    </div>
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
            })}
          </div>
        </div>
      </main>

      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Roadmap 