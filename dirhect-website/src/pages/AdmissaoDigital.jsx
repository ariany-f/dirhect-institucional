import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Zap,
  ArrowRight,
  Building2,
  Calendar,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Award,
  TrendingUp,
  Target,
  Rocket,
  Star,
  Heart,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Smile,
  Database,
  ShieldCheck,
  Check,
  Upload,
  Settings,
  Sliders,
  Laptop
} from 'lucide-react';
import Header from '../components/Header.jsx?v=menu-nav-20260521';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './AdmissaoDigital.css';

const collaboratorPool = [
  { nome: 'Lucas Alencar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Matriz SP', cargo: 'Analista de Vendas', dataAdmissao: '15/10/2026' },
  { nome: 'Beatriz Farias', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Filial RJ', cargo: 'Dev Frontend Senior', dataAdmissao: '20/10/2026' },
  { nome: 'Maurício Silva', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Matriz SP', cargo: 'Coordenador Financeiro', dataAdmissao: '01/10/2026' },
  { nome: 'Mariana Costa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Escritório BH', cargo: 'Gerente de Marketing', dataAdmissao: '18/10/2026' },
  { nome: 'Thiago Souza', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Filial RS', cargo: 'Analista de Suporte', dataAdmissao: '22/10/2026' },
  { nome: 'Aline Ribeiro', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Matriz SP', cargo: 'Designer UX', dataAdmissao: '25/10/2026' },
  { nome: 'Gabriel Mendes', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Filial RJ', cargo: 'Engenheiro de Dados', dataAdmissao: '28/10/2026' },
  { nome: 'Juliana Lins', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Escritório BH', cargo: 'Coordenadora de RH', dataAdmissao: '30/10/2026' }
];

const AdmissaoDigital = () => {
  const [activeVantagemPillar, setActiveVantagemPillar] = useState(0);

  const vantagensPillars = [
    {
      id: 0,
      title: "Automação e Produtividade",
      icon: <Zap size={20} />,
      features: [
        {
          title: "Redução de atividades manuais",
          desc: "Elimine a digitação repetitiva e centralize as informações do colaborador em um único fluxo transparente.",
          icon: <Sliders size={18} />
        },
        {
          title: "Menos erros e retrabalho",
          desc: "Padronize o preenchimento dos dados e identifique informações pendentes ou incorretas antes do fechamento.",
          icon: <AlertTriangle size={18} />
        }
      ]
    },
    {
      id: 1,
      title: "Gestão e Controle",
      icon: <Clock size={20} />,
      features: [
        {
          title: "Acompanhamento em tempo real",
          desc: "Visualize quais admissões estão em andamento, concluídas ou aguardando alguma ação de forma instantânea.",
          icon: <Clock size={18} />
        },
        {
          title: "Mais controle e rastreabilidade",
          desc: "Mantenha o histórico completo das etapas de admissão, alteração de dados e permissões.",
          icon: <ShieldCheck size={18} />
        }
      ]
    },
    {
      id: 2,
      title: "Experiência e Flexibilidade",
      icon: <Smile size={20} />,
      features: [
        {
          title: "Processos personalizados",
          desc: "Configure etapas, documentos, campos obrigatórios e fluxos de aprovação conforme as regras do seu negócio.",
          icon: <Settings size={18} />
        },
        {
          title: "Melhor experiência para o colaborador",
          desc: "Ofereça uma jornada digital, organizada, fluida e amigável desde o primeiro contato com a empresa.",
          icon: <Smile size={18} />
        }
      ]
    },
    {
      id: 3,
      title: "Integração e Segurança",
      icon: <Shield size={20} />,
      features: [
        {
          title: "Integração com o seu ecossistema",
          desc: "Conecte a admissão aos sistemas de folha, ERP, benefícios, recrutamento e controle de ponto.",
          icon: <Zap size={18} />
        },
        {
          title: "Segurança das informações",
          desc: "Centralize os dados dos colaboradores em ambiente seguro, reduzindo envios de arquivos confidenciais por redes sociais.",
          icon: <Shield size={18} />
        }
      ]
    }
  ];

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    funcionarios: '',
    mensagem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [dashboardState, setDashboardState] = useState({
    activeList: [
      { nome: 'Lucas Alencar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Matriz SP', cargo: 'Analista de Vendas', dataAdmissao: '15/10/2026', progresso: 30, key: 0 },
      { nome: 'Beatriz Farias', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Filial RJ', cargo: 'Dev Frontend Senior', dataAdmissao: '20/10/2026', progresso: 65, key: 1 },
      { nome: 'Maurício Silva', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', unidade: 'Matriz SP', cargo: 'Coordenador Financeiro', dataAdmissao: '01/10/2026', progresso: 90, key: 2 }
    ],
    poolIdx: 3,
    keyCounter: 3,
    isResetting: false
  });

  useEffect(() => {
    let timeoutId;
    const interval = setInterval(() => {
      setDashboardState(prev => {
        const { activeList, poolIdx, keyCounter, isResetting } = prev;
        if (isResetting) return prev;

        const updatedList = activeList.map((col, idx) => {
          let increment = 5;
          if (idx === 0) increment = 6;
          if (idx === 1) increment = 4;
          if (idx === 2) increment = 3;
          return {
            ...col,
            progresso: Math.min(100, col.progresso + increment)
          };
        });

        const reached100Idx = updatedList.findIndex(col => col.progresso >= 100);

        if (reached100Idx !== -1) {
          timeoutId = setTimeout(() => {
            setDashboardState(current => {
              const completedIdx = current.activeList.findIndex(col => col.progresso >= 100);
              if (completedIdx === -1) return current;

              const nextCollaborator = collaboratorPool[current.poolIdx];
              const nextPoolIdx = (current.poolIdx + 1) % collaboratorPool.length;
              const nextKeyCounter = current.keyCounter + 1;

              const remaining = current.activeList.filter((_, idx) => idx !== completedIdx);

              return {
                activeList: [
                  { ...nextCollaborator, progresso: 0, key: current.keyCounter },
                  ...remaining
                ],
                poolIdx: nextPoolIdx,
                keyCounter: nextKeyCounter,
                isResetting: false
              };
            });
          }, 1000);

          return {
            ...prev,
            activeList: updatedList,
            isResetting: true
          };
        }

        return {
          ...prev,
          activeList: updatedList
        };
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const getStatusInfo = (progresso) => {
    if (progresso < 30) {
      return {
        badgeClass: 'status-badge progress',
        label: 'Preenchimento',
        responsavel: 'Colaborador'
      };
    } else if (progresso < 75) {
      return {
        badgeClass: 'status-badge progress',
        label: 'Envio de Docs',
        responsavel: 'Colaborador'
      };
    } else if (progresso < 95) {
      return {
        badgeClass: 'status-badge review',
        label: 'Em Análise RH',
        responsavel: 'RH Dirhect'
      };
    } else if (progresso < 100) {
      return {
        badgeClass: 'status-badge review',
        label: 'Aprovação Final',
        responsavel: 'RH Dirhect'
      };
    } else {
      return {
        badgeClass: 'status-badge success',
        label: 'Concluída',
        responsavel: 'Finalizado'
      };
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const funcionariosOptions = [
    '1-10 funcionários',
    '11-50 funcionários',
    '51-200 funcionários',
    '201-500 funcionários',
    '501-1000 funcionários',
    'Mais de 1000 funcionários'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const requiredFields = ['nome', 'email', 'telefone', 'empresa', 'funcionarios'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
      
      if (missingFields.length > 0) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      const result = await sendDemoEmail(formData);

      if (result.success) {
        setSubmitSuccess(true);
        console.log('Solicitação enviada:', result);
      } else {
        throw new Error(result.message || 'Erro ao enviar solicitação');
      }

    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  if (submitSuccess) {
    return (
      <div>
        <Header />
        <div className="admissao-success">
          <div className="container">
            <div className="admissao-success-content">
              <div className="admissao-success-icon">
                <CheckCircle2 size={80} />
              </div>
              <h1>Solicitação Enviada com Sucesso!</h1>
              <p>
                Obrigado pelo interesse na nossa solução de Admissão Digital! 
                Nossa equipe entrará em contato em até 24 horas para agendar uma demonstração.
              </p>
              <div className="admissao-success-info">
                <div className="admissao-info-item">
                  <Clock size={20} />
                  <span>Contato em até 24h</span>
                </div>
                <div className="admissao-info-item">
                  <Shield size={20} />
                  <span>Demonstração gratuita</span>
                </div>
                <div className="admissao-info-item">
                  <Zap size={20} />
                  <span>Implementação rápida</span>
                </div>
                <div className="admissao-info-item">
                  <Award size={20} />
                  <span>Suporte especializado</span>
                </div>
              </div>
              <button className="btn-primary" onClick={() => window.location.href = '/'}>
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admissao-digital-page">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="admissao-hero">
        <div className="admissao-hero-media" aria-hidden="true">
          <img
            className="admissao-hero-image"
            src="/images/admissao-hero-handshake.jpg"
            alt=""
            width={1200}
            height={800}
            decoding="async"
          />
          <div className="admissao-hero-media-fade" />
        </div>

        <div className="container">
          <div className="admissao-hero-grid">
            <div className="admissao-hero-text">
              <div className="admissao-mockup-badge">
                <Sparkles size={16} className="badge-icon" />
                <span className="badge-text">Solução de Admissão Digital</span>
              </div>
              
              <h1>
                Transforme a admissão de <br />
                colaboradores em um processo <br />
                <span className="admissao-highlight">simples, digital e integrado</span>
              </h1>
              
              <p className="admissao-hero-subtitle">
                Centralize documentos, dados cadastrais, aprovações e integrações em uma única plataforma. Com o Dirhect, o RH acompanha cada etapa da admissão com mais agilidade, segurança e controle.
              </p>
              
              <div className="admissao-hero-actions">
                <Link to="/demo" className="admissao-mockup-btn-primary">
                  <span>Fale com um especialista</span>
                  <span className="btn-circle-arrow">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="admissao-hero-stats">
                <div className="admissao-stat-item">
                  <span className="stat-number">-90%</span>
                  <span className="stat-label">Tempo de processo</span>
                </div>
                <div className="admissao-stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Digital e sem papel</span>
                </div>
                <div className="admissao-stat-item">
                  <span className="stat-number">Zero</span>
                  <span className="stat-label">Redundância de dados</span>
                </div>
              </div>
            </div>

            {/* Empty Visual Column to keep the grid spacing */}
            <div className="admissao-hero-visual" />
          </div>
        </div>
      </section>

      {/* 2. TRANSITION STRIPE */}
      <div className="admissao-transition-stripe">
        <div className="stripe-track">
          <span className="stripe-item">Sem Papel</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Assinatura Eletrônica</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Validação Inteligente</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Integração de Sistemas</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Experiência Mobile</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Histórico Completo</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Conformidade e eSocial</span>
        </div>
      </div>

      {/* 7. GESTÃO DAS ADMISSÕES (Painel Mockup) */}
      <section className="admissao-painel-rh">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Gestão Unificada</span>
            <h2>Acompanhe <span className="highlight-orange">todas as admissões</span> em um único painel</h2>
            <p>Tenha uma visão centralizada de todos os processos e identifique rapidamente o que precisa de atenção.</p>
          </div>

          {/* Table Mockup Dashboard */}
          <div className="dashboard-mockup-container">
            <div className="dashboard-filters">
              <div className="filter-group search">
                <input type="text" placeholder="Buscar colaborador..." disabled />
              </div>
              <div className="filter-group">
                <select disabled><option>Empresa (Todas)</option></select>
              </div>
              <div className="filter-group">
                <select disabled><option>Status (Em preenchimento)</option></select>
              </div>
              <div className="filter-group">
                <select disabled><option>Vínculo (CLT)</option></select>
              </div>
            </div>

            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Colaborador</th>
                    <th>Unidade</th>
                    <th>Cargo</th>
                    <th>Data Admissão</th>
                    <th>Progresso</th>
                    <th className="col-status">Status</th>
                    <th>Responsável</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dashboardState.activeList]
                    .sort((a, b) => a.progresso - b.progresso)
                    .map((col) => {
                      const statusInfo = getStatusInfo(col.progresso);
                    return (
                      <tr key={col.key}>
                        <td>
                          <div className="user-avatar-info">
                            <div className="avatar-circle">
                              <img src={col.avatar} alt={col.nome} className="avatar-img" />
                            </div>
                            <strong>{col.nome}</strong>
                          </div>
                        </td>
                        <td>{col.unidade}</td>
                        <td>{col.cargo}</td>
                        <td>{col.dataAdmissao}</td>
                        <td>
                          <div className="progress-bar-container">
                            <span className="progress-text">{col.progresso}%</span>
                            <div className="progress-bar">
                              <div 
                                className={`progress-fill ${col.progresso === 100 ? 'complete' : ''}`} 
                                style={{ width: `${col.progresso}%`, transition: 'width 0.3s ease' }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="col-status">
                          <span className={statusInfo.badgeClass}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>{statusInfo.responsavel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admissao-painel-footer">
            <p>O RH deixa de procurar informações em diferentes planilhas, e-mails e sistemas e passa a acompanhar toda a operação em só um lugar.</p>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO DE PROBLEMA */}
      <section className="admissao-problema">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">O Problema</span>
            <h2>A admissão de colaboradores não precisa ser um <span className="highlight-orange">processo demorado</span></h2>
            <p>
              Em muitas empresas, a admissão ainda depende de planilhas, formulários, documentos enviados por e-mail e conferências manuais. Isso aumenta o risco de erros, atrasa o início do colaborador e gera retrabalho para o RH e o Departamento Pessoal.
            </p>
          </div>

          <div className="admissao-problemas-diagrama">
            {/* Coluna 1 */}
            <div className="diagrama-coluna">
              <div className="coluna-header">
                <div className="coluna-number">01</div>
                <div className="coluna-info">
                  <h3>Coleta Fragmentada</h3>
                  <p className="coluna-sub">A primeira barreira do processo: o recebimento de arquivos e dados</p>
                </div>
              </div>
              <div className="coluna-content">
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Documentos dispersos</h4>
                    <p>Arquivos espalhados entre e-mails, WhatsApp, mensagens e papel físico, gerando desorganização.</p>
                  </div>
                </div>
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Dados incorretos ou rasurados</h4>
                    <p>Falta de validação que resulta em fotos ilegíveis, CPFs inválidos e falta de assinaturas.</p>
                  </div>
                </div>
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Cobrança manual de pendências</h4>
                    <p>O RH precisa cobrar individualmente cada colaborador por e-mail ou telefone para reenvio.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="diagrama-coluna">
              <div className="coluna-header">
                <div className="coluna-number">02</div>
                <div className="coluna-info">
                  <h3>Retrabalho Operacional</h3>
                  <p className="coluna-sub">O desperdício de tempo e esforço com tarefas repetitivas</p>
                </div>
              </div>
              <div className="coluna-content">
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Digitação duplicada</h4>
                    <p>Necessidade de digitar os mesmos dados do colaborador em planilhas e sistemas diferentes.</p>
                  </div>
                </div>
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Ausência de integrações</h4>
                    <p>RH e DP perdendo horas transferindo informações da ficha de registro para o sistema de folha (ERP).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 3 */}
            <div className="diagrama-coluna">
              <div className="coluna-header">
                <div className="coluna-number">03</div>
                <div className="coluna-info">
                  <h3>Visão Limitada</h3>
                  <p className="coluna-sub">Falta de controle geral e padrões descentralizados</p>
                </div>
              </div>
              <div className="coluna-content">
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Dificuldade de rastreamento</h4>
                    <p>Impossibilidade de saber em tempo real em qual etapa cada novo colaborador está no fluxo.</p>
                  </div>
                </div>
                <div className="diagrama-problema-item">
                  <div className="item-icon-wrapper">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="item-text">
                    <h4>Falta de padronização</h4>
                    <p>Diferentes unidades ou filiais realizando a admissão de formas variadas e sem conformidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admissao-problema-footer">
            <p>Com o Dirhect, todas as etapas ficam organizadas em um único fluxo digital.</p>
          </div>
        </div>
      </section>

      {/* 4. COMO FUNCIONA */}
      <section id="admissao-como-funciona" className="admissao-solucao">
        <div className="container">
          <div className="section-header section-header--light">
            <span className="section-tag section-tag--light">O Processo</span>
            <h2>Uma jornada de admissão simples do início ao fim</h2>
            <p>Conectamos todas as pontas do fluxo de admissão digital em tempo real.</p>
          </div>
          
          <div className="admissao-flow">
            <div className="flow-step">
              <div className="flow-number">01</div>
              <div className="flow-icon">
                <Building2 size={20} />
              </div>
              <h3>Início da admissão</h3>
              <p>O RH inicia o processo manualmente ou via integração com o ATS.</p>
            </div>

            <div className="flow-step">
              <div className="flow-number">02</div>
              <div className="flow-icon">
                <Mail size={20} />
              </div>
              <h3>Convite</h3>
              <p>O colaborador recebe o link de acesso por e-mail ou WhatsApp.</p>
            </div>

            <div className="flow-step highlight">
              <div className="flow-number">03</div>
              <div className="flow-icon">
                <Smartphone size={20} />
              </div>
              <h3>Preenchimento</h3>
              <p>Preenchimento dos dados cadastrais, dependentes e benefícios.</p>
            </div>

            <div className="flow-step">
              <div className="flow-number">04</div>
              <div className="flow-icon">
                <Upload size={20} />
              </div>
              <h3>Documentos</h3>
              <p>Envio de fotos dos documentos diretamente pelo celular.</p>
            </div>

            <div className="flow-step">
              <div className="flow-number">05</div>
              <div className="flow-icon">
                <ShieldCheck size={20} />
              </div>
              <h3>Análise</h3>
              <p>O DP valida as informações e solicita correções se necessário.</p>
            </div>

            <div className="flow-step">
              <div className="flow-number">06</div>
              <div className="flow-icon">
                <Zap size={20} />
              </div>
              <h3>Integração</h3>
              <p>Envio automático de dados para o sistema de folha e eSocial.</p>
            </div>

            <div className="flow-step complete">
              <div className="flow-number">07</div>
              <div className="flow-icon">
                <CheckCircle2 size={20} />
              </div>
              <h3>Concluído</h3>
              <p>Admissão finalizada, com histórico e documentos salvos.</p>
            </div>
          </div>

          <div className="solucao-cta-container">
            <Link to="/demo" className="beneficios-mockup-btn-primary solucao-cta-btn">
              <span>Automatizar admissões</span>
              <span className="btn-circle-arrow">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BENEFÍCIOS */}
      <section className="admissao-beneficios-detalhados">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Vantagens</span>
            <h2>Mais eficiência para o RH. <br />Mais simplicidade para o novo colaborador.</h2>
            <p>Uma solução desenhada para otimizar tempo, eliminar o uso de papéis e garantir conformidade e segurança da informação.</p>
          </div>

          <div className="admissao-beneficios-split">
            {/* Left Column: Image of the HR Professional */}
            <div className="beneficios-image-column">
              <div className="beneficios-image-wrapper">
                <div className="beneficios-image-bg-effect"></div>
                <img 
                  src="/images/hr-professional.png" 
                  alt="Profissional de RH apresentando as vantagens da admissão digital" 
                  className="beneficios-person-img"
                />
                <div className="beneficios-floating-tag">Processo Otimizado</div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="beneficios-cards-column">
              <div className="funcionalidades-accordion">
                {vantagensPillars.map((pillar) => {
                  const isActive = activeVantagemPillar === pillar.id;
                  return (
                    <div 
                      key={pillar.id} 
                      className={`accordion-pillar ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveVantagemPillar(pillar.id)}
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

      {/* 6. PERSONALIZAÇÃO DO PROCESSO */}
      <section className="admissao-personalizacao">
        <div className="container">
          <div className="personalizacao-split-grid">
            <div className="personalizacao-text-col">
              <span className="section-tag">Customização</span>
              <h2>Um processo de admissão adaptado à realidade da sua empresa</h2>
              <p className="subtitle">
                Cada organização possui documentos, regras, etapas e aprovações diferentes. Por isso, o Dirhect permite estruturar fluxos personalizados de acordo com a operação de cada cliente.
              </p>
              
              <ul className="personalizacao-features-list">
                <li>
                  <span className="check-bullet"><Check size={12} /></span>
                  <div>
                    <strong>Regras de preenchimento flexíveis</strong>
                    <span>Configure campos obrigatórios por cargo, unidade ou regime.</span>
                  </div>
                </li>
                <li>
                  <span className="check-bullet"><Check size={12} /></span>
                  <div>
                    <strong>Documentação específica</strong>
                    <span>Solicite documentos sob medida para CLT, estagiário, PJ, autônomo ou menor aprendiz.</span>
                  </div>
                </li>
                <li>
                  <span className="check-bullet"><Check size={12} /></span>
                  <div>
                    <strong>Aprovações em múltiplos níveis</strong>
                    <span>Adicione etapas de aprovação por diferentes lideranças e gestores.</span>
                  </div>
                </li>
                <li>
                  <span className="check-bullet"><Check size={12} /></span>
                  <div>
                    <strong>Formulários inteligentes</strong>
                    <span>Captação de dependentes, solicitações de benefícios (plano de saúde, vale transporte, etc.).</span>
                  </div>
                </li>
              </ul>

            </div>

            {/* Visual: Configured flow diagram representation */}
            <div className="personalizacao-visual-col">
              <div className="flow-visual-container">
                <div className="flow-visual-title">Fluxo Configurado: Contratação CLT</div>
                
                <div className="flow-visual-nodes">
                  <div className="flow-node active">
                    <span className="node-number">1</span>
                    <div className="node-info">
                      <strong>Triagem e Convite</strong>
                      <span>Envio por e-mail e SMS</span>
                    </div>
                  </div>
                  
                  <div className="flow-visual-arrow"></div>

                  <div className="flow-node active">
                    <span className="node-number">2</span>
                    <div className="node-info">
                      <strong>Ficha Cadastral</strong>
                      <span>Campos personalizados CLT</span>
                    </div>
                  </div>

                  <div className="flow-visual-arrow"></div>

                  <div className="flow-node active">
                    <span className="node-number">3</span>
                    <div className="node-info">
                      <strong>Envio de Arquivos</strong>
                      <span>Validação com OCR de CNH/RG</span>
                    </div>
                  </div>

                  <div className="flow-visual-arrow"></div>

                  <div className="flow-node pending">
                    <span className="node-number">4</span>
                    <div className="node-info">
                      <strong>Aprovação RH / DP</strong>
                      <span>Assinatura eletrônica Dirhect</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="personalizacao-cta-wrapper">
            <Link to="/demo" className="beneficios-mockup-btn-primary solucao-cta-btn personalizacao-cta-btn">
              <span>Conhecer o Dirhect</span>
              <span className="btn-circle-arrow">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. INTELIGÊNCIA ARTIFICIAL - OCR */}
      <section className="admissao-ia-ocr">
        <div className="container">
          <div className="ia-ocr-grid">

            {/* Coluna Esquerda: GIF */}
            <div className="ia-ocr-visual">
              <div className="ia-ocr-gif-wrapper">
                <img
                  src="/images/admissao-ocr-ai.gif"
                  alt="Demonstração da leitura automática de documentos por inteligência artificial"
                  className="ia-ocr-gif"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Coluna Direita: Texto */}
            <div className="ia-ocr-text">
              <span className="section-tag ia-ocr-tag">Inteligência Artificial</span>
              <h2>
                Conheça a AR<span className="aria-ia-pulse">IA</span>, a{' '}
                <span className="admissao-highlight">inteligência artificial</span>{' '}
                do Dirhect
              </h2>
              <p className="ia-ocr-desc">
                Basta digitalizar o documento ou tirar uma foto. A{' '}
                <strong>inteligência artificial</strong> do Dirhect identifica os dados e preenche{' '}
                <strong>automaticamente</strong> as informações do candidato, reduzindo erros e
                agilizando a admissão.
              </p>

              <div className="ia-ocr-benefits">
                <div className="ia-ocr-benefit">
                  <span className="ia-benefit-dot" />
                  <span>Leitura automática</span>
                </div>
                <div className="ia-ocr-benefit">
                  <span className="ia-benefit-dot" />
                  <span>Preenchimento inteligente</span>
                </div>
                <div className="ia-ocr-benefit">
                  <span className="ia-benefit-dot" />
                  <span>Menos erros e retrabalho</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. INTEGRAÇÕES */}

      <section className="admissao-integracoes">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Conectividade</span>
            <h2>Conecte a admissão aos sistemas que sua empresa já utiliza</h2>
          </div>

          <div className="integracoes-split-grid">
            <div className="integracoes-text-col">
              <p>
                O Dirhect não precisa substituir todo o seu ambiente atual. A plataforma conecta as etapas da admissão aos sistemas utilizados pela empresa, reduzindo a necessidade de lançamentos manuais e informações duplicadas.
              </p>
              
              <div className="integracoes-categories-list">
                <div className="category-item">
                  <Database size={16} />
                  <span>Sistemas de folha de pagamento & eSocial</span>
                </div>
                <div className="category-item">
                  <Award size={16} />
                  <span>ERPs de mercado</span>
                </div>
                <div className="category-item">
                  <Users size={16} />
                  <span>Plataformas de recrutamento e seleção (ATS)</span>
                </div>
                <div className="category-item">
                  <Heart size={16} />
                  <span>Operadoras de benefícios</span>
                </div>
                <div className="category-item">
                  <Clock size={16} />
                  <span>Sistemas de ponto e jornada</span>
                </div>
                <div className="category-item">
                  <FileText size={16} />
                  <span>Soluções de assinatura eletrônica</span>
                </div>
              </div>

              <div className="integracoes-highlight-banner">
                <p>Independente do seu sistema de RH ou DP, o Dirhect ajuda a conectar toda a operação.</p>
              </div>
            </div>

            {/* Orbit integration visualization */}
            <div className="integracoes-visual-col">
              <div className="orbit-container">
                {/* SVG Connections with data flow */}
                <svg className="orbit-connections-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="50" x2="50" y2="15" className="conn-line conn-folha" />
                  <line x1="50" y1="50" x2="87" y2="44" className="conn-line conn-erp" />
                  <line x1="50" y1="50" x2="68" y2="80" className="conn-line conn-ats" />
                  <line x1="50" y1="50" x2="32" y2="80" className="conn-line conn-ponto" />
                  <line x1="50" y1="50" x2="13" y2="44" className="conn-line conn-beneficios" />
                </svg>

                <div className="orbit-center">
                  <div className="radar-wave wave-1"></div>
                  <div className="radar-wave wave-2"></div>
                  <div className="radar-wave wave-3"></div>
                  <strong>Dirhect</strong>
                </div>
                <div className="orbit-ring"></div>
                <div className="orbit-item logo-folha">
                  <FileText size={16} />
                  <span>Folha</span>
                </div>
                <div className="orbit-item logo-erp">
                  <Building2 size={16} />
                  <span>ERP</span>
                </div>
                <div className="orbit-item logo-ats">
                  <Users size={16} />
                  <span>ATS</span>
                </div>
                <div className="orbit-item logo-ponto">
                  <Clock size={16} />
                  <span>Ponto</span>
                </div>
                <div className="orbit-item logo-beneficios">
                  <Heart size={16} />
                  <span>Benefícios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EXPERIÊNCIA DO COLABORADOR */}
      <section className="admissao-experiencia">
        <div className="container">
          <div className="experiencia-split-grid">
            <div className="experiencia-visual-col">
              <div className="mockup-device-wrapper">
                <div className="device-screen">
                  <div className="mobile-mockup-header">
                    <span>Dirhect Admissão</span>
                    <div className="mobile-user-badge">Olá, Lucas</div>
                  </div>
                  <div className="mobile-mockup-body">
                    <p className="mobile-welcome">Complete sua admissão de forma simples:</p>
                    <div className="mobile-task-card complete">
                      <CheckCircle2 size={16} className="task-check" />
                      <span>1. Ficha cadastral básica</span>
                    </div>
                    <div className="mobile-task-card active">
                      <div className="task-bullet">2</div>
                      <span>2. Foto dos documentos (CNH/RG)</span>
                      <button className="task-btn">Tirar Foto</button>
                    </div>
                    <div className="mobile-task-card">
                      <div className="task-bullet text-muted">3</div>
                      <span>3. Dados dos dependentes</span>
                    </div>
                    <div className="mobile-task-card">
                      <div className="task-bullet text-muted">4</div>
                      <span>4. Assinar Contrato</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="experiencia-text-col">
              <span className="section-tag">Experiência do Candidato</span>
              <h2>Uma experiência de admissão mais simples desde o primeiro dia</h2>
              <p>
                O novo colaborador recebe uma jornada clara e orientada, podendo preencher as informações e enviar os documentos pelo computador ou celular de forma fluida.
              </p>
              
              <ul className="experiencia-bullets">
                <li>
                  <span className="bullet-bullet"><Check size={10} /></span>
                  <div>
                    <strong>Interface simples e responsiva:</strong>
                    <span>Adaptação total para preenchimento fácil em qualquer celular ou notebook.</span>
                  </div>
                </li>
                <li>
                  <span className="bullet-bullet"><Check size={10} /></span>
                  <div>
                    <strong>Orientações em tempo real:</strong>
                    <span>Instruções em vídeo ou texto em cada etapa, minimizando dúvidas e erros de envio.</span>
                  </div>
                </li>
                <li>
                  <span className="bullet-bullet"><Check size={10} /></span>
                  <div>
                    <strong>Envio digital de documentos por foto:</strong>
                    <span>Basta tirar uma foto do documento com o celular para enviá-lo ao sistema.</span>
                  </div>
                </li>
                <li>
                  <span className="bullet-bullet"><Check size={10} /></span>
                  <div>
                    <strong>Visualização de pendências em tempo real:</strong>
                    <span>O colaborador vê claramente o que falta e pode corrigir o que o RH solicitar.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. RESULTADOS (Antes vs. Depois) */}
      <section className="admissao-resultados">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Resultados</span>
            <h2>O que muda com a Admissão Digital do Dirhect</h2>
            <p>Compare o fluxo manual tradicional com a eficiência da admissão digital centralizada.</p>
          </div>

          <div className="comparacao-grid">
            <div className="comparacao-col antes">
              <h3>Antes</h3>
              <ul className="comparacao-list">
                <li>Fichas em papel e controles manuais</li>
                <li>Cópias de RG e CNH enviadas por e-mails ou WhatsApp</li>
                <li>Conferência exaustiva de documentos rasurados ou ilegíveis</li>
                <li>Digitação manual de dados cadastrais no sistema de folha</li>
                <li>RH sem saber quem enviou as informações</li>
                <li>Cobranças sucessivas por telefone de dados pendentes</li>
              </ul>
            </div>

            <div className="comparacao-col depois">
              <h3>Com o Dirhect</h3>
              <ul className="comparacao-list">
                <li>Fluxo 100% digital e centralizado</li>
                <li>Documentos e fotos organizados diretamente na plataforma</li>
                <li>Validação inteligente com feedback instantâneo de preenchimento</li>
                <li>Integração automatizada com folha, eSocial e ponto</li>
                <li>Visão em tempo real de quem iniciou e de prazos de contratação</li>
                <li>Notificações automáticas para resolver pendências</li>
              </ul>
            </div>
          </div>

          <div className="resultados-highlight-banner">
            <p>O RH deixa de administrar tarefas isoladas e passa a controlar toda a jornada de admissão.</p>
          </div>
        </div>
      </section>



      {/* 14. CTA FINAL (Faixa Laranja) */}
      <section className="admissao-cta-final">
        <div className="container">
          <div className="admissao-cta-flex admissao-cta-flex--single">
            <h2 className="admissao-cta-title-inline">Simplifique a admissão dos seus próximos colaboradores</h2>
            <div className="admissao-cta-actions">
              <Link to="/demo" className="final-cta-btn">
                <span>Fale com um especialista</span>
                <span className="btn-circle-arrow">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdmissaoDigital;