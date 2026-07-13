import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Apple, 
  Coffee, 
  Bus, 
  ShieldCheck, 
  Smile, 
  CheckCircle2, 
  Rocket, 
  Sparkles,
  ArrowRight, 
  Clock, 
  Shield, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Award, 
  FileText, 
  Check, 
  Sliders,
  ChevronRight,
  Database,
  ArrowLeft,
  Settings,
  Star
} from 'lucide-react';
import './GestaoBeneficios.css';
import Footer from '../components/Footer';

const GestaoBeneficios = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 0,
      title: "Experiência do Colaborador",
      icon: <Users size={20} />,
      features: [
        {
          title: "Solicitação de benefícios",
          desc: "Escolha de planos de saúde, odonto, VR, VA e VT via portal do colaborador.",
          icon: <FileText size={18} />
        },
        {
          title: "Elegibilidade automática",
          desc: "Regras dinâmicas por cargo ou localidade, exibindo apenas opções elegíveis.",
          icon: <Sliders size={18} />
        }
      ]
    },
    {
      id: 1,
      title: "Automação para o RH",
      icon: <Zap size={20} />,
      features: [
        {
          title: "Aprovação simplificada",
          desc: "Análise e aprovação ágil de solicitações pelo RH em poucos cliques.",
          icon: <CheckCircle2 size={18} />
        },
        {
          title: "Movimentações automáticas",
          desc: "Processamento automático de inclusões e exclusões de beneficiários.",
          icon: <Zap size={18} />
        }
      ]
    },
    {
      id: 2,
      title: "Integração de Ecossistema",
      icon: <Database size={20} />,
      features: [
        {
          title: "Integração com operadoras",
          desc: "Integração e layouts compatíveis com as maiores operadoras.",
          icon: <Database size={18} />
        },
        {
          title: "Integração com a folha",
          desc: "Exportação de descontos para fechamento de folha de pagamento sem erros.",
          icon: <Settings size={18} />
        }
      ]
    },
    {
      id: 3,
      title: "Governança e Controle",
      icon: <ShieldCheck size={20} />,
      features: [
        {
          title: "Histórico completo",
          desc: "Trilha de auditoria completa com log de todas as movimentações.",
          icon: <Clock size={18} />
        },
        {
          title: "Dashboard gerencial",
          desc: "Acompanhamento de custos por categoria, adesão de planos e pendências.",
          icon: <TrendingUp size={18} />
        }
      ]
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('beneficios-funcionalidades').scrollIntoView({ behavior: 'smooth' });
  };

  const partnerLogos = [
    { name: 'SAP', logo: '/images/logos/sap-logo.webp' },
    { name: 'TOTVS', logo: '/images/logos/totvs-logo.png' },
    { name: 'Closecare', logo: '/images/logos/closecare-logo.webp' },
    { name: 'LG Sistemas', logo: '/images/logos/lgsistemas-logo.png' },
    { name: 'Pandapé', logo: '/images/logos/pandape-logo.svg' },
    { name: 'Gupy', logo: '/images/logos/gupy-logo.png' },
    { name: 'Nexti', logo: '/images/logos/nexti-logo.png' }
  ];

  return (
    <div className="gestao-beneficios-page">
      {/* Hero Section */}
      <section className="beneficios-hero">
        <div className="container">
          <div className="beneficios-hero-grid">
            <div className="beneficios-hero-text">
              {/* Badges like "Hello There!" in the mockup */}
              <div className="beneficios-mockup-badge">
                <Sparkles size={14} className="badge-icon" />
                <span className="badge-text">Solução de Gestão de Benefícios</span>
              </div>
              
              <h1>
                Gestão de Benefícios <br />
                <span className="beneficios-highlight">integrada ao seu RH</span>
              </h1>
              
              <p className="beneficios-hero-subtitle">
                Centralize solicitações, aprovações, integrações e movimentações de benefícios em uma única plataforma, conectando RH, colaboradores, operadoras e folha de pagamento.
              </p>
              
              <div className="beneficios-hero-actions">
                <Link to="/demo" className="beneficios-mockup-btn-primary">
                  <span>Solicitar demonstração</span>
                  <span className="btn-circle-arrow">
                    <ArrowRight size={16} />
                  </span>
                </Link>
                <button onClick={scrollToFeatures} className="beneficios-mockup-btn-secondary">
                  <span>Conhecer soluções</span>
                </button>
              </div>

              {/* Stats row like the mockup */}
              <div className="beneficios-hero-stats">
                <div className="beneficios-stat-item">
                  <span className="stat-number">-80%</span>
                  <span className="stat-label">Tempo operacional</span>
                </div>
                <div className="beneficios-stat-item">
                  <span className="stat-number">Zero</span>
                  <span className="stat-label">Erros de cálculo</span>
                </div>
                <div className="beneficios-stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Rastreabilidade</span>
                </div>
              </div>
            </div>

            {/* Mockup-style visual: Person inside yellow circle with floating tags */}
            <div className="beneficios-hero-visual">
              <div className="beneficios-visual-wrapper">
                {/* Yellow circle behind the person */}
                <div className="beneficios-visual-bg-circle"></div>
                
                {/* Person Photo */}
                <img 
                  src="/images/hero-parceiro-tablet-sem-fundo.png" 
                  className="beneficios-visual-person" 
                  alt="Gestão de Benefícios Dirhect" 
                />

                {/* Floating tags representing the benefits */}
                <div className="floating-tag tag-saude">
                  <Activity size={14} className="tag-icon" />
                  <span>Plano de Saúde</span>
                </div>

                <div className="floating-tag tag-odonto">
                  <Smile size={14} className="tag-icon" />
                  <span>Odontológico</span>
                </div>

                <div className="floating-tag tag-refeicao">
                  <Coffee size={14} className="tag-icon" />
                  <span>Vale Refeição</span>
                </div>

                <div className="floating-tag tag-vida">
                  <ShieldCheck size={14} className="tag-icon" />
                  <span>Seguro de Vida</span>
                </div>
                
                <div className="floating-tag tag-transporte">
                  <Bus size={14} className="tag-icon" />
                  <span>Vale Transporte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Stripe (Gray Banner) */}
      <div className="beneficios-transition-stripe">
        <div className="stripe-track">
          <span className="stripe-item">Plano de Saúde</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Vale Refeição</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Seguro de Vida</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Vale Transporte</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Odontológico</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Elegibilidade Automática</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Integração com Folha</span>
        </div>
      </div>

      {/* Problema Section */}
      <section className="beneficios-problema">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— O Problema</span>
            <h2>Sua gestão de benefícios ainda depende de <span className="highlight-orange">planilhas e e-mails?</span></h2>
            <p>O controle manual de benefícios drena o tempo do seu time e gera erros custosos para a empresa.</p>
          </div>
          <div className="beneficios-problema-grid">
            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Informações descentralizadas</h3>
              <p>Dados de colaboradores espalhados em dezenas de planilhas locais e e-mails, dificultando a conciliação.</p>
            </div>
            
            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Inclusões e exclusões manuais</h3>
              <p>O RH precisa acessar o portal de cada operadora individualmente para cadastrar ou excluir colaboradores.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Risco de erro na folha</h3>
              <p>Descontos manuais de coparticipação ou atraso no repasse de dados geram erros diretamente no fechamento.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Falta de histórico</h3>
              <p>Dificuldade para auditar quem solicitou, quem aprovou e quando a movimentação foi feita na operadora.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Retrabalho constante entre RH, DP e Operadoras</h3>
              <p>Trocas intermináveis de mensagens para resolver inconsistências cadastrais, faturas divergentes e cartões não entregues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solução Section (Forest Green Background) */}
      <section className="beneficios-solucao">
        <div className="container">
          <div className="section-header section-header--light">
            <span className="section-tag section-tag--light">— O Processo</span>
            <h2>Com o Dirhect, o processo fica centralizado e automatizado</h2>
            <p>Conectamos todas as pontas do fluxo de benefícios de ponta a ponta em tempo real.</p>
          </div>
          
          <div className="beneficios-flow">
            <div className="flow-step">
              <div className="flow-number">01</div>
              <div className="flow-icon">
                <Users size={28} />
              </div>
              <h3>Colaborador</h3>
              <p>Solicita inclusão ou alteração de benefícios diretamente pelo portal.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={24} />
            </div>

            <div className="flow-step highlight">
              <div className="flow-number">02</div>
              <div className="flow-icon">
                <Heart size={28} />
              </div>
              <h3>Dirhect Hub</h3>
              <p>Valida a elegibilidade e centraliza os dados cadastrais.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={24} />
            </div>

            <div className="flow-step">
              <div className="flow-number">03</div>
              <div className="flow-icon">
                <ShieldCheck size={28} />
              </div>
              <h3>RH / DP</h3>
              <p>Aprova a solicitação no dashboard em apenas um clique.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={24} />
            </div>

            <div className="flow-step">
              <div className="flow-number">04</div>
              <div className="flow-icon">
                <Zap size={28} />
              </div>
              <h3>Operadora & Folha</h3>
              <p>A movimentação é enviada à operadora e os dados de desconto são computados.</p>
            </div>
          </div>
          
          <div className="solucao-cta-container">
            <Link to="/demo" className="beneficios-mockup-btn-primary solucao-cta-btn">
              <span>Automatizar meu processo</span>
              <span className="btn-circle-arrow">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section (Mockup Services Layout) */}
      <section id="beneficios-funcionalidades" className="beneficios-funcionalidades">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Funcionalidades</span>
            <h2>Gestão ponta a ponta na mesma plataforma</h2>
            <p>Ferramentas robustas criadas para dar autonomia ao colaborador e controle ao RH.</p>
          </div>

          <div className="beneficios-funcionalidades-split">
            {/* Left Column: Image of the HR Professional */}
            <div className="funcionalidades-image-column">
              <div className="funcionalidades-image-wrapper">
                <div className="funcionalidades-image-bg-effect"></div>
                <img 
                  src="/images/hr-professional.png" 
                  alt="Profissional de RH apresentando a plataforma de benefícios" 
                  className="funcionalidades-person-img"
                />
                <div className="funcionalidades-floating-tag">Plataforma Completa</div>
              </div>
            </div>

            {/* Right Column: Funcionalidades Accordion */}
            <div className="funcionalidades-cards-column">
              <div className="funcionalidades-accordion">
                {pillars.map((pillar) => {
                  const isActive = activePillar === pillar.id;
                  return (
                    <div 
                      key={pillar.id} 
                      className={`accordion-pillar ${isActive ? 'active' : ''}`}
                      onClick={() => setActivePillar(pillar.id)}
                    >
                      <div className="accordion-header">
                        <div className="accordion-title-block">
                          <div className="accordion-icon-wrapper">
                            {pillar.icon}
                          </div>
                          <h3>{pillar.title}</h3>
                        </div>
                        <div className="accordion-chevron">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                      
                      <div className="accordion-content">
                        <div className="accordion-features-grid">
                          {pillar.features.map((feat, idx) => (
                            <div key={idx} className="accordion-feature-item">
                              <div className="accordion-feat-icon">
                                {feat.icon}
                              </div>
                              <div className="accordion-feat-text">
                                <h4>{feat.title}</h4>
                                <p>{feat.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Empresa Section (Split: Graphic Left, Benefits Right with Gold Checkmarks) */}
      <section className="beneficios-empresa">
        <div className="container">
          <div className="beneficios-empresa-split">
            {/* Visual element like mockup About section */}
            <div className="empresa-visual-column">
              <div className="empresa-circle-image-wrapper">
                <div className="empresa-bg-decoration-circle"></div>
                <img 
                  src="/images/showcase/SITE - BENEFICIOS.png" 
                  alt="Painel de Benefícios Dirhect" 
                  className="empresa-main-img" 
                />
                
                {/* Floating pill badges around the image */}
                <div className="empresa-floating-pill pill-1">Gestão Centralizada</div>
                <div className="empresa-floating-pill pill-2">Autonomia</div>
                <div className="empresa-floating-pill pill-3">Sem Erros</div>
              </div>
            </div>

            <div className="empresa-content-column">
              <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2.5rem' }}>
                <span className="section-tag">— Vantagens</span>
                <h2>Por que a sua empresa escolhe o Dirhect?</h2>
                <p>Entregamos agilidade para o RH e uma experiência de primeiro mundo para os colaboradores.</p>
              </div>

              <div className="empresa-beneficios-list">
                <div className="empresa-beneficio-item">
                  <div className="empresa-icon-bullet">
                    <Check size={12} />
                  </div>
                  <div className="empresa-item-text">
                    <h3>Menos retrabalho</h3>
                    <p>Elimine o preenchimento de planilhas extras e cadastros repetitivos nos sites das operadoras.</p>
                  </div>
                </div>

                <div className="empresa-beneficio-item">
                  <div className="empresa-icon-bullet">
                    <Check size={12} />
                  </div>
                  <div className="empresa-item-text">
                    <h3>Mais controle e segurança</h3>
                    <p>Monitore prazos e elegibilidade dos pacotes de benefícios oferecidos de acordo com a política interna.</p>
                  </div>
                </div>

                <div className="empresa-beneficio-item">
                  <div className="empresa-icon-bullet">
                    <Check size={12} />
                  </div>
                  <div className="empresa-item-text">
                    <h3>Redução drástica de erros</h3>
                    <p>Evite descontos duplicados ou faltantes na folha de pagamento por conta de falhas de digitação.</p>
                  </div>
                </div>

                <div className="empresa-beneficio-item">
                  <div className="empresa-icon-bullet">
                    <Check size={12} />
                  </div>
                  <div className="empresa-item-text">
                    <h3>Velocidade no atendimento</h3>
                    <p>Processe movimentações e libere a utilização de planos de saúde de forma muito mais rápida.</p>
                  </div>
                </div>

                <div className="empresa-beneficio-item">
                  <div className="empresa-icon-bullet">
                    <Check size={12} />
                  </div>
                  <div className="empresa-item-text">
                    <h3>Melhor experiência do colaborador</h3>
                    <p>Portal intuitivo e integrado onde as solicitações de benefícios são feitas de forma amigável.</p>
                  </div>
                </div>

                <div className="empresa-beneficio-item">
                  <div className="empresa-icon-bullet">
                    <Check size={12} />
                  </div>
                  <div className="empresa-item-text">
                    <h3>Rastreabilidade total</h3>
                    <p>Acesse o log de auditoria de qualquer movimentação para conferência em poucos segundos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Favorite Tools Section (Adapted as Partner Integrations) */}
      <section className="beneficios-integracoes-tools">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Integrações</span>
            <h2>Explorando as Conexões de Sistemas</h2>
            <p>Integramos nativamente com as principais operadoras de benefícios e sistemas de folha de pagamento do mercado.</p>
          </div>

          <div className="tools-bubbles-container">
            {partnerLogos.map((partner, index) => (
              <div 
                key={partner.name} 
                className="tool-bubble-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tool-bubble">
                  <img src={partner.logo} alt={`Logo ${partner.name}`} className="tool-logo-img" />
                </div>
                <span className="tool-bubble-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final (Mockup styled Contact Section) */}
      <section className="beneficios-cta-final" id="beneficios-form">
        <div className="container">
          <div className="beneficios-cta-content">
            <div className="beneficios-cta-text">
              <h2>Automatize a gestão de benefícios da sua empresa</h2>
            </div>
            <Link to="/demo" className="beneficios-mockup-btn-primary final-cta-btn">
              <span>Solicitar demonstração</span>
              <span className="btn-circle-arrow">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GestaoBeneficios;