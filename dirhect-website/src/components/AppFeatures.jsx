import { useState } from 'react'
import { 
  Monitor, 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  Bell,
  Shield,
  Zap,
  Menu,
  Search,
  User
} from 'lucide-react'
import './AppFeatures.css'

const AppFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: 'dashboard',
      title: 'Dashboard Inteligente',
      description: 'Visualize todas as métricas de RH em um só lugar. Acompanhe indicadores, processos e performance em tempo real.',
      icon: <BarChart3 size={24} />,
      image: '/images/dashboard-preview.svg'
    },
    {
      id: 'candidates',
      title: 'Gestão de Candidatos',
      description: 'Organize e gerencie todo o pipeline de candidatos de forma visual e intuitiva.',
      icon: <Users size={24} />,
      image: '/images/candidates-preview.svg'
    },
    {
      id: 'documents',
      title: 'Documentos Digitais',
      description: 'Centralize todos os documentos dos colaboradores com segurança e praticidade.',
      icon: <FileText size={24} />,
      image: '/images/documents-preview.svg'
    },
    {
      id: 'calendar',
      title: 'Agenda Integrada',
      description: 'Gerencie entrevistas, reuniões e processos seletivos em uma agenda unificada.',
      icon: <Calendar size={24} />,
      image: '/images/calendar-preview.svg'
    }
  ]

  return (
    <section className="app-features section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Um app para tudo. E tudo <span className="gradient-text">no app</span></h2>
          <p>Centralize toda a gestão de RH em uma plataforma web moderna e intuitiva</p>
        </div>

        <div className="features-content">
          <div className="features-navigation">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                className={`feature-nav-item ${index === activeFeature ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-nav-icon">
                  {feature.icon}
                </div>
                <div className="feature-nav-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="features-visual">
            <div className="desktop-mockup">
              <div className="monitor-setup">
                <div className="monitor-screen">
                  <div className="screen-bezel">
                    <div className="app-content">
                      <div className="app-sidebar">
                        <div className="app-logo">
                          <div className="logo-icon"></div>
                          <span>Dirhect</span>
                        </div>
                        <nav className="sidebar-nav">
                          <div className="nav-item active">
                            <BarChart3 size={18} />
                            <span>Dashboard</span>
                          </div>
                          <div className="nav-item">
                            <Users size={18} />
                            <span>Candidatos</span>
                          </div>
                          <div className="nav-item">
                            <FileText size={18} />
                            <span>Documentos</span>
                          </div>
                          <div className="nav-item">
                            <Calendar size={18} />
                            <span>Agenda</span>
                          </div>
                        </nav>
                      </div>
                      
                      <div className="app-main">
                        <div className="app-header">
                          <div className="header-left">
                            <h4>{features[activeFeature].title}</h4>
                          </div>
                          <div className="header-actions">
                            <Search size={20} />
                            <Bell size={20} />
                            <User size={20} />
                          </div>
                        </div>
                        
                        <div className="feature-preview">
                          <div className={`preview-content preview-${features[activeFeature].id}`}>
                            {features[activeFeature].id === 'dashboard' && (
                              <div className="dashboard-preview">
                                <div className="metric-cards">
                                  <div className="metric-card">
                                    <span className="metric-value">147</span>
                                    <span className="metric-label">Candidatos Ativos</span>
                                  </div>
                                  <div className="metric-card">
                                    <span className="metric-value">23</span>
                                    <span className="metric-label">Vagas Abertas</span>
                                  </div>
                                  <div className="metric-card">
                                    <span className="metric-value">8</span>
                                    <span className="metric-label">Entrevistas Hoje</span>
                                  </div>
                                </div>
                                <div className="chart-section">
                                  <h5>Processos por Mês</h5>
                                  <div className="chart-area">
                                    <div className="chart-bars">
                                      <div className="bar" style={{height: '60%'}}></div>
                                      <div className="bar" style={{height: '80%'}}></div>
                                      <div className="bar" style={{height: '45%'}}></div>
                                      <div className="bar" style={{height: '90%'}}></div>
                                      <div className="bar" style={{height: '70%'}}></div>
                                      <div className="bar" style={{height: '85%'}}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {features[activeFeature].id === 'candidates' && (
                              <div className="candidates-preview">
                                <div className="candidates-header">
                                  <h5>Pipeline de Candidatos</h5>
                                  <button className="add-btn">+ Novo</button>
                                </div>
                                <div className="candidates-list">
                                  <div className="candidate-item">
                                    <div className="candidate-avatar">JS</div>
                                    <div className="candidate-info">
                                      <span className="candidate-name">João Silva</span>
                                      <span className="candidate-role">Frontend Developer</span>
                                      <span className="candidate-stage">Entrevista Técnica</span>
                                    </div>
                                    <div className="candidate-status approved">Aprovado</div>
                                  </div>
                                  <div className="candidate-item">
                                    <div className="candidate-avatar">MS</div>
                                    <div className="candidate-info">
                                      <span className="candidate-name">Maria Santos</span>
                                      <span className="candidate-role">UX Designer</span>
                                      <span className="candidate-stage">Análise de Portfólio</span>
                                    </div>
                                    <div className="candidate-status pending">Em Análise</div>
                                  </div>
                                  <div className="candidate-item">
                                    <div className="candidate-avatar">AL</div>
                                    <div className="candidate-info">
                                      <span className="candidate-name">Ana Lima</span>
                                      <span className="candidate-role">Product Manager</span>
                                      <span className="candidate-stage">Entrevista RH</span>
                                    </div>
                                    <div className="candidate-status interview">Agendado</div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {features[activeFeature].id === 'documents' && (
                              <div className="documents-preview">
                                <div className="documents-header">
                                  <h5>Documentos Recentes</h5>
                                  <button className="upload-btn">Upload</button>
                                </div>
                                <div className="documents-list">
                                  <div className="document-item">
                                    <FileText size={20} />
                                    <div className="document-info">
                                      <span className="document-name">Contrato - João Silva.pdf</span>
                                      <span className="document-date">Hoje, 14:30 • 2.4 MB</span>
                                    </div>
                                    <div className="document-actions">
                                      <button>Download</button>
                                    </div>
                                  </div>
                                  <div className="document-item">
                                    <Shield size={20} />
                                    <div className="document-info">
                                      <span className="document-name">Termo de Confidencialidade.pdf</span>
                                      <span className="document-date">Ontem, 09:15 • 1.2 MB</span>
                                    </div>
                                    <div className="document-actions">
                                      <button>Visualizar</button>
                                    </div>
                                  </div>
                                  <div className="document-item">
                                    <Zap size={20} />
                                    <div className="document-info">
                                      <span className="document-name">Política de Benefícios.docx</span>
                                      <span className="document-date">3 dias atrás • 850 KB</span>
                                    </div>
                                    <div className="document-actions">
                                      <button>Editar</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {features[activeFeature].id === 'calendar' && (
                              <div className="calendar-preview">
                                <div className="calendar-header">
                                  <h5>Janeiro 2024</h5>
                                  <div className="calendar-controls">
                                    <button>← Anterior</button>
                                    <button>Próximo →</button>
                                  </div>
                                </div>
                                <div className="calendar-view">
                                  <div className="calendar-grid">
                                    <div className="calendar-day header">Dom</div>
                                    <div className="calendar-day header">Seg</div>
                                    <div className="calendar-day header">Ter</div>
                                    <div className="calendar-day header">Qua</div>
                                    <div className="calendar-day header">Qui</div>
                                    <div className="calendar-day header">Sex</div>
                                    <div className="calendar-day header">Sáb</div>
                                    <div className="calendar-day">31</div>
                                    <div className="calendar-day">1</div>
                                    <div className="calendar-day">2</div>
                                    <div className="calendar-day has-event">3</div>
                                    <div className="calendar-day">4</div>
                                    <div className="calendar-day">5</div>
                                    <div className="calendar-day">6</div>
                                    <div className="calendar-day">7</div>
                                    <div className="calendar-day has-event">8</div>
                                    <div className="calendar-day">9</div>
                                    <div className="calendar-day">10</div>
                                    <div className="calendar-day">11</div>
                                    <div className="calendar-day">12</div>
                                    <div className="calendar-day">13</div>
                                  </div>
                                  <div className="calendar-events">
                                    <div className="event-item">
                                      <div className="event-time">10:00</div>
                                      <div className="event-title">Entrevista - Ana Lima</div>
                                      <div className="event-type">Presencial</div>
                                    </div>
                                    <div className="event-item">
                                      <div className="event-time">14:30</div>
                                      <div className="event-title">Reunião de Feedback</div>
                                      <div className="event-type">Online</div>
                                    </div>
                                    <div className="event-item">
                                      <div className="event-time">16:00</div>
                                      <div className="event-title">Apresentação Final</div>
                                      <div className="event-type">Híbrido</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="monitor-stand">
                  <div className="monitor-neck"></div>
                  <div className="monitor-base"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppFeatures 