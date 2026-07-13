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

const AdmissaoDigital = () => {
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
        <div className="container">
          <div className="admissao-hero-grid">
            <div className="admissao-hero-text">
              <div className="admissao-mockup-badge">
                <Sparkles size={14} className="badge-icon" />
                <span className="badge-text">Solução de Admissão Digital</span>
              </div>
              
              <h1>
                Transforme a admissão de colaboradores em um processo <br />
                <span className="admissao-highlight">simples, digital e integrado</span>
              </h1>
              
              <p className="admissao-hero-subtitle">
                Centralize documentos, dados cadastrais, aprovações e integrações em uma única plataforma. Com o Dirhect, o RH acompanha cada etapa da admissão com mais agilidade, segurança e controle.
              </p>
              
              <div className="admissao-hero-actions">
                <button onClick={() => scrollToSection('admissao-como-funciona')} className="admissao-mockup-btn-primary">
                  <span>Conheça a Admissão Digital</span>
                  <span className="btn-circle-arrow">
                    <ArrowRight size={16} />
                  </span>
                </button>
                <Link to="/demo" className="admissao-mockup-btn-secondary">
                  <span>Fale com um especialista</span>
                </Link>
              </div>

              <span className="admissao-hero-support-phrase">
                Menos tarefas manuais. Mais agilidade para o RH e uma experiência melhor para o novo colaborador.
              </span>

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

            {/* Visual Column: Staggered flowing timeline cards representing the admission process */}
            <div className="admissao-hero-visual">
              <div className="admissao-visual-wrapper">
                <div className="admissao-visual-bg-circle"></div>
                
                <div className="admissao-flow-timeline">
                  <div className="timeline-card card-step-1">
                    <div className="timeline-icon">
                      <Mail size={16} />
                    </div>
                    <div className="timeline-content">
                      <h4>Convite enviado</h4>
                      <p>Link exclusivo enviado por e-mail/WhatsApp</p>
                    </div>
                    <div className="timeline-badge pending">Pendente</div>
                  </div>

                  <div className="timeline-card card-step-2">
                    <div className="timeline-icon">
                      <FileText size={16} />
                    </div>
                    <div className="timeline-content">
                      <h4>Preenchimento inteligente</h4>
                      <p>Dados cadastrais, dependentes e bancários</p>
                    </div>
                    <div className="timeline-badge process">Em progresso</div>
                  </div>

                  <div className="timeline-card card-step-3">
                    <div className="timeline-icon">
                      <Upload size={16} />
                    </div>
                    <div className="timeline-content">
                      <h4>Envio de documentos</h4>
                      <p>Fotos legíveis de CNH, RG, CTPS direto do celular</p>
                    </div>
                  </div>

                  <div className="timeline-card card-step-4">
                    <div className="timeline-icon">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="timeline-content">
                      <h4>Validação e Aprovação</h4>
                      <p>Conferência rápida pelo DP em tela unificada</p>
                    </div>
                    <div className="timeline-badge success">Aprovado</div>
                  </div>

                  <div className="timeline-card card-step-5">
                    <div className="timeline-icon">
                      <Rocket size={16} />
                    </div>
                    <div className="timeline-content">
                      <h4>Admissão concluída</h4>
                      <p>Dados enviados para folha e eSocial</p>
                    </div>
                    <div className="timeline-badge complete">Concluído ✦</div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* 3. SEÇÃO DE PROBLEMA */}
      <section className="admissao-problema">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— O Problema</span>
            <h2>A admissão de colaboradores não precisa ser um <span className="highlight-orange">processo demorado</span></h2>
            <p>
              Em muitas empresas, a admissão ainda depende de planilhas, formulários, documentos enviados por e-mail e conferências manuais. Isso aumenta o risco de erros, atrasa o início do colaborador e gera retrabalho para o RH e o Departamento Pessoal.
            </p>
          </div>

          <div className="admissao-problemas-grid">
            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Documentos por diferentes canais</h3>
              <p>Arquivos espalhados no e-mail, WhatsApp e pastas físicas, dificultando o controle.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Informações incompletas ou incorretas</h3>
              <p>Erros comuns como falta de assinatura, fotos ilegíveis de RG ou CPF incorreto.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Digitação repetida dos mesmos dados</h3>
              <p>Inserção manual das informações do novo contratado na planilha de benefícios, no sistema de folha e no ponto.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Dificuldade para acompanhar o andamento</h3>
              <p>Dificuldade em visualizar quem enviou os dados ou quais assinaturas estão pendentes para iniciar a contratação.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Falta de padronização</h3>
              <p>Unidades distantes ou empresas do mesmo grupo realizando o fluxo de contratação de formas completamente distintas.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Retrabalho na inclusão nos sistemas</h3>
              <p>Perda de tempo transferindo informações da ficha de registro para o software de folha (ERP).</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={18} />
              </div>
              <h3>Pouca visibilidade de pendências</h3>
              <p>Contatos sucessivos por e-mail para cobrar dependentes, fotos ou assinatura de contratos.</p>
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
            <span className="section-tag section-tag--light">— O Processo</span>
            <h2>Uma jornada de admissão simples do início ao fim</h2>
            <p>Conectamos todas as pontas do fluxo de admissão digital em tempo real.</p>
          </div>
          
          <div className="admissao-flow">
            <div className="flow-step">
              <div className="flow-number">01</div>
              <div className="flow-icon">
                <Building2 size={24} />
              </div>
              <h3>Início da admissão</h3>
              <p>O RH cadastra o novo colaborador ou inicia a admissão por meio de uma integração com o sistema de recrutamento.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={20} />
            </div>

            <div className="flow-step">
              <div className="flow-number">02</div>
              <div className="flow-icon">
                <Mail size={24} />
              </div>
              <h3>Convite</h3>
              <p>O novo colaborador recebe um acesso para preencher seus dados e enviar os documentos necessários.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={20} />
            </div>

            <div className="flow-step highlight">
              <div className="flow-number">03</div>
              <div className="flow-icon">
                <Smartphone size={24} />
              </div>
              <h3>Preenchimento</h3>
              <p>O colaborador informa seus dados pessoais, bancários, dependentes, benefícios e demais informações exigidas.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={20} />
            </div>

            <div className="flow-step">
              <div className="flow-number">04</div>
              <div className="flow-icon">
                <Upload size={24} />
              </div>
              <h3>Documentos</h3>
              <p>Os documentos são enviados diretamente pela plataforma, permitindo a conferência e acompanhamento.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={20} />
            </div>

            <div className="flow-step">
              <div className="flow-number">05</div>
              <div className="flow-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Análise</h3>
              <p>O RH acompanha o processo, solicita correções quando necessário e aprova as informações recebidas.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={20} />
            </div>

            <div className="flow-step">
              <div className="flow-number">06</div>
              <div className="flow-icon">
                <Zap size={24} />
              </div>
              <h3>Integração</h3>
              <p>Após a aprovação, os dados são enviados para os sistemas de folha, ERP, benefícios e outras plataformas.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={20} />
            </div>

            <div className="flow-step complete">
              <div className="flow-number">07</div>
              <div className="flow-icon">
                <CheckCircle2 size={24} />
              </div>
              <h3>Concluído</h3>
              <p>O processo é finalizado com todas as informações organizadas, rastreáveis e disponíveis para consulta.</p>
            </div>
          </div>

          <div className="solucao-cta-container">
            <button onClick={() => scrollToSection('admissao-form')} className="beneficios-mockup-btn-primary solucao-cta-btn">
              <span>Automatizar admissões</span>
              <span className="btn-circle-arrow">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. BENEFÍCIOS */}
      <section className="admissao-beneficios-detalhados">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Vantagens</span>
            <h2>Mais eficiência para o RH. <br />Mais simplicidade para o novo colaborador.</h2>
            <p>Uma solução desenhada para otimizar tempo, eliminar o uso de papéis e garantir conformidade e segurança da informação.</p>
          </div>

          <div className="admissao-beneficios-grid">
            <div className="beneficio-card">
              <div className="beneficio-icon">
                <Sliders size={20} />
              </div>
              <h3>Redução de atividades manuais</h3>
              <p>Elimine a digitação repetitiva e centralize as informações do colaborador em um único fluxo transparente.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <AlertTriangle size={20} />
              </div>
              <h3>Menos erros e retrabalho</h3>
              <p>Padronize o preenchimento dos dados e identifique informações pendentes ou incorretas antes do fechamento.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <Clock size={20} />
              </div>
              <h3>Acompanhamento em tempo real</h3>
              <p>Visualize quais admissões estão em andamento, concluídas ou aguardando alguma ação de forma instantânea.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <Settings size={20} />
              </div>
              <h3>Processos personalizados</h3>
              <p>Configure etapas, documentos, campos obrigatórios e fluxos de aprovação conforme as regras do seu negócio.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <Zap size={20} />
              </div>
              <h3>Integração com o seu ecossistema</h3>
              <p>Conecte a admissão aos sistemas de folha, ERP, benefícios, recrutamento e controle de ponto.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <Smile size={20} />
              </div>
              <h3>Melhor experiência para o colaborador</h3>
              <p>Ofereça uma jornada digital, organizada, fluida e amigável desde o primeiro contato com a empresa.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <ShieldCheck size={20} />
              </div>
              <h3>Mais controle e rastreabilidade</h3>
              <p>Mantenha o histórico completa das etapas de admissão, alteração de dados e permissões.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">
                <Shield size={20} />
              </div>
              <h3>Segurança das informações</h3>
              <p>Centralize os dados dos colaboradores em ambiente seguro, reduzindo envios de arquivos confidenciais por redes sociais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERSONALIZAÇÃO DO PROCESSO */}
      <section className="admissao-personalizacao">
        <div className="container">
          <div className="personalizacao-split-grid">
            <div className="personalizacao-text-col">
              <span className="section-tag">— Customização</span>
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
        </div>
      </section>

      {/* 7. GESTÃO DAS ADMISSÕES (Painel Mockup) */}
      <section className="admissao-painel-rh">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Gestão Unificada</span>
            <h2>Acompanhe todas as admissões em um único painel</h2>
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
                    <th>Status</th>
                    <th>Responsável</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="user-avatar-info">
                        <div className="avatar-circle">LA</div>
                        <strong>Lucas Alencar</strong>
                      </div>
                    </td>
                    <td>Matriz SP</td>
                    <td>Analista de Vendas</td>
                    <td>15/10/2026</td>
                    <td>
                      <div className="progress-bar-container">
                        <span className="progress-text">60%</span>
                        <div className="progress-bar"><div className="progress-fill" style={{ width: '60%' }}></div></div>
                      </div>
                    </td>
                    <td><span className="status-badge progress">Preenchimento</span></td>
                    <td>Colaborador</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-avatar-info">
                        <div className="avatar-circle">BF</div>
                        <strong>Beatriz Farias</strong>
                      </div>
                    </td>
                    <td>Filial RJ</td>
                    <td>Dev Frontend Senior</td>
                    <td>20/10/2026</td>
                    <td>
                      <div className="progress-bar-container">
                        <span className="progress-text">95%</span>
                        <div className="progress-bar"><div className="progress-fill" style={{ width: '95%' }}></div></div>
                      </div>
                    </td>
                    <td><span className="status-badge review">Em Análise RH</span></td>
                    <td>RH Dirhect</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="user-avatar-info">
                        <div className="avatar-circle">MS</div>
                        <strong>Maurício Silva</strong>
                      </div>
                    </td>
                    <td>Matriz SP</td>
                    <td>Coordenador Financeiro</td>
                    <td>01/10/2026</td>
                    <td>
                      <div className="progress-bar-container">
                        <span className="progress-text">100%</span>
                        <div className="progress-bar"><div className="progress-fill complete" style={{ width: '100%' }}></div></div>
                      </div>
                    </td>
                    <td><span className="status-badge success">Concluída</span></td>
                    <td>Finalizado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="admissao-painel-footer">
            <p>O RH deixa de procurar informações em diferentes planilhas, e-mails e sistemas e passa a acompanhar toda a operação em um único ambiente.</p>
          </div>
        </div>
      </section>

      {/* 8. INTEGRAÇÕES */}
      <section className="admissao-integracoes">
        <div className="container">
          <div className="integracoes-split-grid">
            <div className="integracoes-text-col">
              <span className="section-tag">— Conectividade</span>
              <h2>Conecte a admissão aos sistemas que sua empresa já utiliza</h2>
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
                <div className="orbit-center">
                  <strong>Dirhect</strong>
                </div>
                <div className="orbit-ring"></div>
                <div className="orbit-item logo-folha">Folha</div>
                <div className="orbit-item logo-erp">ERP</div>
                <div className="orbit-item logo-ats">ATS</div>
                <div className="orbit-item logo-ponto">Ponto</div>
                <div className="orbit-item logo-beneficios">Benefícios</div>
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
              <span className="section-tag">— Experiência do Candidato</span>
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

      {/* 10. CONTROLE, SEGURANÇA E CONFORMIDADE */}
      <section className="admissao-seguranca">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Segurança e LGPD</span>
            <h2>Dados organizados, acessos controlados e processos rastreáveis</h2>
            <p>
              Informações admissionais são altamente sensíveis e precisam ser tratadas com responsabilidade. O Dirhect permite organizar os acessos corporativos e acompanhar as ações de auditoria realizadas durante cada processo.
            </p>
          </div>

          <div className="seguranca-grid">
            <div className="seguranca-card">
              <div className="seguranca-icon-circle"><ShieldCheck size={20} /></div>
              <h4>Controle de acesso por perfil</h4>
              <p>Somente pessoas autorizadas do RH, DP ou contabilidade visualizam dados pessoais e bancários do colaborador.</p>
            </div>

            <div className="seguranca-card">
              <div className="seguranca-icon-circle"><FileText size={20} /></div>
              <h4>Histórico de alterações e auditoria</h4>
              <p>Mantenha um log detalhado de quem inseriu, alterou ou validou cada informação no sistema.</p>
            </div>

            <div className="seguranca-card">
              <div className="seguranca-icon-circle"><CheckCircle2 size={20} /></div>
              <h4>Registro e conformidade interna</h4>
              <p>Auxiliamos a sua equipe de compliance a gerenciar termos de consentimento e processos organizados.</p>
            </div>

            <div className="seguranca-card">
              <div className="seguranca-icon-circle"><Users size={20} /></div>
              <h4>Apoio às boas práticas da LGPD</h4>
              <p>Evite o compartilhamento de cópias de documentos pessoais em canais desprotegidos ou e-mails abertos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PARA QUEM É */}
      <section className="admissao-publico">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Para Quem É</span>
            <h2>Admissão Digital para operações de todos os tamanhos</h2>
            <p>O Dirhect se adapta desde operações mais enxutas até estruturas complexas com múltiplos responsáveis, empresas, filiais e regras de admissão.</p>
          </div>

          <div className="publico-grid">
            <div className="publico-item">
              <div className="publico-icon"><Building2 size={20} /></div>
              <span>Empresas com alto volume de contratações</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><Sliders size={20} /></div>
              <span>Grupos empresariais com diferentes filiais</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><Users size={20} /></div>
              <span>Departamentos de RH e DP modernos</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><FileText size={20} /></div>
              <span>Escritórios de contabilidade e consultorias</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><Zap size={20} /></div>
              <span>Empresas de BPO de folha de pagamento</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><MapPin size={20} /></div>
              <span>Empresas com operações descentralizadas</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><Database size={20} /></div>
              <span>Organizações que usam vários sistemas de RH</span>
            </div>
            <div className="publico-item">
              <div className="publico-icon"><Check size={20} /></div>
              <span>Empresas que precisam padronizar admissões</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. RESULTADOS (Antes vs. Depois) */}
      <section className="admissao-resultados">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">— Resultados</span>
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

      {/* 13. FORMULÁRIO DE DEMONSTRAÇÃO */}
      <section id="admissao-form" className="admissao-formulario-section">
        <div className="container">
          <div className="admissao-form-content">
            <div className="admissao-form-header">
              <h2>Solicite sua demonstração</h2>
              <p>Preencha os dados e nossa equipe entrará em contato para agendar uma demonstração personalizada da admissão digital.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="admissao-form">
              <div className="admissao-form-grid">
                <div className="admissao-form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu.email@empresa.com"
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <PhoneInput
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <label>Empresa *</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nome da sua empresa"
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <label>Número de Funcionários *</label>
                  <select
                    name="funcionarios"
                    value={formData.funcionarios}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione a quantidade</option>
                    {funcionariosOptions.map(opcao => (
                      <option key={opcao} value={opcao}>{opcao}</option>
                    ))}
                  </select>
                </div>
                <div className="admissao-form-group admissao-form-group-full">
                  <label>Mensagem (opcional)</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos mais sobre as necessidades de admissão da sua empresa..."
                    rows="4"
                  />
                </div>
              </div>

              {submitError && (
                <div className="admissao-error-message">
                  <p>{submitError}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="admissao-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="admissao-submit-spinner"></div>
                    Enviando solicitação...
                  </>
                ) : (
                  <>
                    <Rocket size={18} />
                    Solicitar Demonstração
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 14. CTA FINAL (Faixa Laranja) */}
      <section className="admissao-cta-final">
        <div className="container">
          <div className="admissao-cta-flex">
            <div className="admissao-cta-text">
              <h2>Simplifique a admissão dos seus próximos colaboradores</h2>
              <p className="admissao-cta-sub">Digitalize o processo, reduza o retrabalho e conecte todas as etapas em uma única plataforma.</p>
            </div>
            
            <div className="admissao-cta-actions">
              <button onClick={() => scrollToSection('admissao-form')} className="final-cta-btn">
                <span>Fale com um especialista</span>
                <span className="btn-circle-arrow">
                  <ArrowRight size={16} />
                </span>
              </button>
              <button onClick={() => scrollToSection('admissao-form')} className="final-cta-btn secondary">
                <span>Solicite uma demonstração</span>
              </button>
            </div>
          </div>
          
          <div className="admissao-cta-footer-note">
            <p>Descubra como a Admissão Digital do Dirhect pode se adaptar à operação da sua empresa.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdmissaoDigital;