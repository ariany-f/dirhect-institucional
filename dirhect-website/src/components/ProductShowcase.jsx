import { useState, useEffect, useRef } from 'react'
import { 
  Monitor,
  Tablet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Users,
  Calendar,
  BarChart3,
  Settings,
  CheckCircle,
  Clock,
  DollarSign,
  UserPlus,
  TrendingUp,
  FileText
} from 'lucide-react'
import './ProductShowcase.css'

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('desktop')
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Demos animados das funcionalidades
  const showcaseDemos = [
    {
      id: 'contratos-beneficios',
      title: 'Gestão de Contratos e Benefícios',
      description: 'Configure e gerencie contratos, benefícios e regras de elegibilidade com facilidade',
      component: 'ContractManagement'
    },
    {
      id: 'calendario-ferias',
      title: 'Calendário de Férias',
      description: 'Visualize e gerencie as férias dos colaboradores com interface calendário intuitiva',
      component: 'VacationCalendar'
    },
    {
      id: 'dashboard-atividades',
      title: 'Dashboard de Atividades',
      description: 'Acompanhe métricas em tempo real: admissões, rescisões, férias e processos em andamento',
      component: 'ActivityDashboard'
    },
    {
      id: 'elegibilidade-grupos',
      title: 'Configuração de Elegibilidade',
      description: 'Defina grupos elegíveis e regras personalizadas para cada benefício de forma simples',
      component: 'EligibilityConfig'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % showcaseDemos.length)
    }, 6000) // 6 segundos para dar tempo de ver a animação

    return () => clearInterval(interval)
  }, [isAutoPlaying, showcaseDemos.length])

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % showcaseDemos.length)
  }

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + showcaseDemos.length) % showcaseDemos.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const goToDemo = (index) => {
    setCurrentDemo(index)
  }

  // Componente do Dashboard de Contratos
  const ContractManagement = () => (
    <div className="demo-screen-content">
      <div className="demo-header">
        <div className="demo-breadcrumb">
          <span>Dashboard</span> / <span>Benefícios</span> / <span>Contratos</span>
        </div>
        <div className="demo-user-info">
          <Users size={16} />
          <span>João Silva - Admin</span>
        </div>
      </div>
      
      <div className="demo-main-content">
        <div className="demo-sidebar">
          <div className="demo-nav-item active">
            <FileText size={16} />
            <span>Contratos</span>
          </div>
          <div className="demo-nav-item">
            <DollarSign size={16} />
            <span>Benefícios</span>
          </div>
          <div className="demo-nav-item">
            <Users size={16} />
            <span>Elegibilidade</span>
          </div>
        </div>
        
        <div className="demo-content-area">
          <div className="demo-benefits-grid">
            <div className="demo-benefit-card vale-alimentacao">
              <div className="benefit-header">
                <span className="benefit-icon">🍽️</span>
                <span className="benefit-name">Vale Alimentação</span>
              </div>
              <div className="benefit-value">R$ 800,00</div>
              <div className="benefit-status active">Ativo</div>
            </div>
            
            <div className="demo-benefit-card vale-combustivel">
              <div className="benefit-header">
                <span className="benefit-icon">⛽</span>
                <span className="benefit-name">Vale Combustível</span>
              </div>
              <div className="benefit-value">R$ 300,00</div>
              <div className="benefit-status active">Ativo</div>
            </div>
            
            <div className="demo-benefit-card vale-refeicao">
              <div className="benefit-header">
                <span className="benefit-icon">🥘</span>
                <span className="benefit-name">Vale Refeição</span>
              </div>
              <div className="benefit-value">R$ 600,00</div>
              <div className="benefit-status active">Ativo</div>
            </div>
          </div>
          
          <div className="demo-rules-section">
            <h4>Regras de Elegibilidade</h4>
            <div className="demo-rule-item">
              <CheckCircle size={16} className="rule-check" />
              <span>Colaboradores CLT com mais de 3 meses de empresa</span>
            </div>
            <div className="demo-rule-item">
              <CheckCircle size={16} className="rule-check" />
              <span>Carga horária mínima de 30h semanais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Componente do Calendário de Férias
  const VacationCalendar = () => (
    <div className="demo-screen-content">
      <div className="demo-header">
        <div className="demo-breadcrumb">
          <span>Dashboard</span> / <span>Gestão</span> / <span>Férias 2025</span>
        </div>
        <div className="demo-user-info">
          <Calendar size={16} />
          <span>Calendário de Férias</span>
        </div>
      </div>
      
      <div className="demo-calendar-container">
        <div className="demo-calendar-header">
          <h3>Janeiro 2025</h3>
          <div className="calendar-nav">
            <ChevronLeft size={20} />
            <ChevronRight size={20} />
          </div>
        </div>
        
        <div className="demo-calendar-grid">
          <div className="calendar-weekdays">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {Array.from({length: 31}, (_, i) => i + 1).map(day => (
              <div key={day} className={`calendar-day ${[15, 16, 17, 22, 23, 24].includes(day) ? 'has-vacation' : ''}`}>
                <span className="day-number">{day}</span>
                {[15, 16, 17].includes(day) && <div className="vacation-bar maria">Maria</div>}
                {[22, 23, 24].includes(day) && <div className="vacation-bar joao">João</div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="demo-vacation-legend">
          <div className="legend-item">
            <div className="legend-color maria"></div>
            <span>Maria Silva - Férias</span>
          </div>
          <div className="legend-item">
            <div className="legend-color joao"></div>
            <span>João Santos - Férias</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Componente do Dashboard de Atividades
  const ActivityDashboard = () => (
    <div className="demo-screen-content">
      <div className="demo-header">
        <div className="demo-breadcrumb">
          <span>Dashboard</span> / <span>Atividades</span> / <span>Visão Geral</span>
        </div>
        <div className="demo-user-info">
          <BarChart3 size={16} />
          <span>Dashboard de Atividades</span>
        </div>
      </div>
      
      <div className="demo-metrics-grid">
        <div className="demo-metric-card admissions">
          <div className="metric-icon">
            <UserPlus size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">24</div>
            <div className="metric-label">Admissões</div>
            <div className="metric-change positive">+15%</div>
          </div>
        </div>
        
        <div className="demo-metric-card terminations">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">8</div>
            <div className="metric-label">Rescisões</div>
            <div className="metric-change negative">-20%</div>
          </div>
        </div>
        
        <div className="demo-metric-card vacations">
          <div className="metric-icon">
            <Calendar size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">45</div>
            <div className="metric-label">Férias Programadas</div>
            <div className="metric-change positive">+8%</div>
          </div>
        </div>
        
        <div className="demo-metric-card pending">
          <div className="metric-icon">
            <Clock size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">12</div>
            <div className="metric-label">Pendências</div>
            <div className="metric-change negative">-5%</div>
          </div>
        </div>
      </div>
      
      <div className="demo-chart-area">
        <div className="demo-chart-header">
          <h4>Atividades por Mês</h4>
          <TrendingUp size={20} />
        </div>
        <div className="demo-chart">
          <div className="chart-bars">
            <div className="chart-bar" style={{height: '60%'}}></div>
            <div className="chart-bar" style={{height: '80%'}}></div>
            <div className="chart-bar" style={{height: '45%'}}></div>
            <div className="chart-bar" style={{height: '90%'}}></div>
            <div className="chart-bar" style={{height: '70%'}}></div>
            <div className="chart-bar" style={{height: '85%'}}></div>
          </div>
        </div>
      </div>
    </div>
  )

  // Componente de Configuração de Elegibilidade
  const EligibilityConfig = () => (
    <div className="demo-screen-content">
      <div className="demo-header">
        <div className="demo-breadcrumb">
          <span>Dashboard</span> / <span>Configurações</span> / <span>Elegibilidade</span>
        </div>
        <div className="demo-user-info">
          <Settings size={16} />
          <span>Configuração de Grupos</span>
        </div>
      </div>
      
      <div className="demo-config-content">
        <div className="demo-groups-section">
          <h4>Grupos de Elegibilidade</h4>
          
          <div className="demo-group-card">
            <div className="group-header">
              <span className="group-name">Diretoria</span>
              <span className="group-count">8 pessoas</span>
            </div>
            <div className="group-benefits">
              <span className="benefit-tag">Vale Alimentação</span>
              <span className="benefit-tag">Vale Combustível</span>
              <span className="benefit-tag">Plano de Saúde Premium</span>
            </div>
          </div>
          
          <div className="demo-group-card">
            <div className="group-header">
              <span className="group-name">Coordenação</span>
              <span className="group-count">25 pessoas</span>
            </div>
            <div className="group-benefits">
              <span className="benefit-tag">Vale Alimentação</span>
              <span className="benefit-tag">Vale Refeição</span>
              <span className="benefit-tag">Plano de Saúde</span>
            </div>
          </div>
          
          <div className="demo-group-card">
            <div className="group-header">
              <span className="group-name">Operacional</span>
              <span className="group-count">156 pessoas</span>
            </div>
            <div className="group-benefits">
              <span className="benefit-tag">Vale Alimentação</span>
              <span className="benefit-tag">Vale Transporte</span>
            </div>
          </div>
        </div>
        
        <div className="demo-criteria-section">
          <h4>Critérios de Elegibilidade</h4>
          <div className="criteria-list">
            <div className="criteria-item">
              <CheckCircle size={16} className="criteria-check" />
              <span>Tempo mínimo na empresa: 90 dias</span>
            </div>
            <div className="criteria-item">
              <CheckCircle size={16} className="criteria-check" />
              <span>Carga horária: Mínimo 20h/semana</span>
            </div>
            <div className="criteria-item">
              <CheckCircle size={16} className="criteria-check" />
              <span>Tipo de contrato: CLT ou PJ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentDemo = () => {
    switch(showcaseDemos[currentDemo].component) {
      case 'ContractManagement':
        return <ContractManagement />
      case 'VacationCalendar':
        return <VacationCalendar />
      case 'ActivityDashboard':
        return <ActivityDashboard />
      case 'EligibilityConfig':
        return <EligibilityConfig />
      default:
        return <ContractManagement />
    }
  }

  return (
    <section ref={sectionRef} className={`product-showcase ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-header">
            <div className="showcase-badge">
              <span>💻 Sistema Real</span>
            </div>
            <h2 className="showcase-title">
              Conheça nossa <span className="gradient-text">plataforma</span> em funcionamento
            </h2>
            <p className="showcase-subtitle">
              Explore as funcionalidades interativas da nossa aplicação para 
              gestão completa de RH, benefícios e processos administrativos.
            </p>
          </div>

          <div className="device-tabs">
            <button 
              className={`device-tab active`}
            >
              <Monitor size={20} />
              <span>Desktop</span>
            </button>
          </div>

          <div className="showcase-demo">
            <div className="demo-container desktop">
              <div className="demo-screen">
                <div className="screen-header">
                  <div className="screen-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <div className="screen-title">Dirhect - Sistema de RH</div>
                </div>
                
                <div className="screen-content">
                  <div className="demo-transition-wrapper">
                    {renderCurrentDemo()}
                  </div>
                  
                  <div className="demo-info">
                    <h4>{showcaseDemos[currentDemo]?.title}</h4>
                    <p>{showcaseDemos[currentDemo]?.description}</p>
                  </div>
                </div>
                
                <div className="demo-controls">
                  <button onClick={prevDemo} className="control-btn">
                    <ChevronLeft size={16} />
                    <span>Anterior</span>
                  </button>
                  
                  <button onClick={toggleAutoPlay} className="control-btn">
                    {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isAutoPlaying ? 'Pausar' : 'Reproduzir'}</span>
                  </button>
                  
                  <button onClick={nextDemo} className="control-btn">
                    <ChevronRight size={16} />
                    <span>Próximo</span>
                  </button>
                </div>

                <div className="demo-indicators">
                  {showcaseDemos.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentDemo ? 'active' : ''}`}
                      onClick={() => goToDemo(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-features">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h4>Dashboard Completo</h4>
              <p>Visão gerencial com métricas em tempo real</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚙️</div>
              <h4>Configuração Flexível</h4>
              <p>Adapte o sistema às suas necessidades</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🗓️</div>
              <h4>Gestão Visual</h4>
              <p>Calendários e interfaces intuitivas</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔐</div>
              <h4>Controle de Acesso</h4>
              <p>Segurança e permissões avançadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase 