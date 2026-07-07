import React, { useState, useEffect } from 'react';
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
  Settings
} from 'lucide-react';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './GestaoBeneficios.css';
import Footer from '../components/Footer';

const GestaoBeneficios = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    colaboradores: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    setError('');

    try {
      const response = await sendDemoEmail({
        ...formData,
        nomeContato: formData.nome,
        nomeEmpresa: formData.empresa,
        numeroFuncionarios: formData.colaboradores,
        cargo: 'Não Informado',
        cnpj: '00.000.000/0000-00',
        segmento: 'Outros',
        aceiteTermos: true,
        tipo: 'Gestão de Benefícios'
      });
      
      if (response && response.success) {
        setIsSuccess(true);
      } else {
        setError(response?.message || 'Erro ao enviar solicitação. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('beneficios-form').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('beneficios-funcionalidades').scrollIntoView({ behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <div className="beneficios-success">
        <div className="container">
          <div className="beneficios-success-content">
            <div className="beneficios-success-icon">
              <CheckCircle2 size={64} />
            </div>
            <h1>Solicitação Enviada com Sucesso!</h1>
            <p>
              Obrigado pelo seu interesse em nossa solução de Gestão de Benefícios. 
              Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração.
            </p>
            <div className="beneficios-success-info">
              <div className="beneficios-info-item">
                <Clock size={20} />
                <span>Resposta em 24h</span>
              </div>
              <div className="beneficios-info-item">
                <Users size={20} />
                <span>Demonstração personalizada</span>
              </div>
              <div className="beneficios-info-item">
                <Shield size={20} />
                <span>Sem compromisso</span>
              </div>
            </div>
            <button className="btn-back-home" onClick={() => window.location.href = '/'}>
              <ArrowLeft size={18} />
              Voltar para a Página Inicial
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="gestao-beneficios-page">
      {/* Hero Section */}
      <section className="beneficios-hero">
        <div className="container">
          <div className="beneficios-hero-grid">
            <div className="beneficios-hero-text">
              <div className="beneficios-professional-badge">
                <Heart size={16} className="heart-pulse-icon" />
                <span>Solução de Gestão de Benefícios</span>
              </div>
              <h1>
                Gestão de Benefícios <span className="beneficios-highlight">integrada ao seu RH</span>
              </h1>
              <p>
                Centralize solicitações, aprovações, integrações e movimentações de benefícios em uma única plataforma, conectando RH, colaboradores, operadoras e folha de pagamento.
              </p>
              
              <div className="beneficios-hero-actions">
                <button onClick={scrollToForm} className="beneficios-cta-button beneficios-cta-button--primary">
                  <Rocket size={20} />
                  Solicitar demonstração
                </button>
                <button onClick={scrollToFeatures} className="beneficios-cta-button beneficios-cta-button--secondary">
                  Conhecer soluções
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="beneficios-hero-stats">
                <div className="beneficios-stat-item">
                  <Clock size={28} />
                  <strong>-80%</strong>
                  <span>Tempo operacional</span>
                </div>
                <div className="beneficios-stat-item">
                  <Shield size={28} />
                  <strong>Zero</strong>
                  <span>Erros de cálculo</span>
                </div>
                <div className="beneficios-stat-item">
                  <TrendingUp size={28} />
                  <strong>100%</strong>
                  <span>Rastreabilidade</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Mockup / Diagram */}
            <div className="beneficios-hero-visual">
              <div className="beneficios-diagram-wrapper">
                <svg viewBox="0 0 500 500" width="100%" height="100%" className="beneficios-diagram-svg">
                  <defs>
                    <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#27aa63" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#27aa63" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="hub-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2ecc71" />
                      <stop offset="100%" stopColor="#27aa63" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.1" />
                    </filter>
                  </defs>

                  {/* Connecting lines */}
                  <g className="connecting-lines">
                    <line x1="250" y1="250" x2="250" y2="80" stroke="#c2f0d5" strokeWidth="3" strokeDasharray="6 6" className="dash-line" />
                    <line x1="250" y1="250" x2="410" y2="160" stroke="#c2f0d5" strokeWidth="3" strokeDasharray="6 6" className="dash-line" />
                    <line x1="250" y1="250" x2="410" y2="340" stroke="#c2f0d5" strokeWidth="3" strokeDasharray="6 6" className="dash-line" />
                    <line x1="250" y1="250" x2="250" y2="420" stroke="#c2f0d5" strokeWidth="3" strokeDasharray="6 6" className="dash-line" />
                    <line x1="250" y1="250" x2="90" y2="340" stroke="#c2f0d5" strokeWidth="3" strokeDasharray="6 6" className="dash-line" />
                    <line x1="250" y1="250" x2="90" y2="160" stroke="#c2f0d5" strokeWidth="3" strokeDasharray="6 6" className="dash-line" />
                  </g>

                  {/* Central Hub Glow */}
                  <circle cx="250" cy="250" r="100" fill="url(#hub-glow)" />

                  {/* Central Hub Circle */}
                  <g filter="url(#shadow)" className="center-hub">
                    <circle cx="250" cy="250" r="60" fill="url(#hub-gradient)" />
                    <text x="250" y="248" fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Dirhect</text>
                    <text x="250" y="264" fill="#e2fbe9" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">BENEFÍCIOS</text>
                  </g>

                  {/* Floating Bubble 1: Plano de Saúde */}
                  <g className="floating-bubble bubble-1" filter="url(#shadow)" transform="translate(250, 80)">
                    <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#27aa63" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="26" fill="#e8f8f0" />
                    {/* Activity Icon inside circle */}
                    <path d="M-10 0 L-6 0 L-2 -10 L2 10 L6 -4 L8 0 L12 0" fill="none" stroke="#27aa63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="0" y="48" fill="#1e293b" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Plano de Saúde</text>
                  </g>

                  {/* Floating Bubble 2: Plano Odonto */}
                  <g className="floating-bubble bubble-2" filter="url(#shadow)" transform="translate(410, 160)">
                    <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="26" fill="#eff6ff" />
                    {/* Smile Icon */}
                    <path d="M-8 -3 A3 3 0 0 1 -2 -3 M2 -3 A3 3 0 0 1 8 -3" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M-10 6 Q0 16 10 6" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="0" y="48" fill="#1e293b" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Odontológico</text>
                  </g>

                  {/* Floating Bubble 3: Vale Refeição */}
                  <g className="floating-bubble bubble-3" filter="url(#shadow)" transform="translate(410, 340)">
                    <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#ff8c00" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="26" fill="#fff7ed" />
                    {/* Coffee/Food Icon */}
                    <path d="M-8 -8 h12 a4 4 0 0 1 4 4 v4 a4 4 0 0 1 -4 4 h-12 z" fill="none" stroke="#ff8c00" strokeWidth="2.5" />
                    <path d="M4 -4 h4 a2 2 0 0 1 2 2 v0 a2 2 0 0 1 -2 2 h-4" fill="none" stroke="#ff8c00" strokeWidth="2" />
                    <path d="M-4 -12 v2 M0 -12 v2 M4 -12 v2" fill="none" stroke="#ff8c00" strokeWidth="1.5" strokeLinecap="round" />
                    <text x="0" y="48" fill="#1e293b" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Vale Refeição</text>
                  </g>

                  {/* Floating Bubble 4: Vale Alimentação */}
                  <g className="floating-bubble bubble-4" filter="url(#shadow)" transform="translate(250, 420)">
                    <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#eab308" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="26" fill="#fef9c3" />
                    {/* Apple Icon */}
                    <path d="M0 6 C-12 6 -10 -10 0 -10 C10 -10 12 6 0 6 z" fill="none" stroke="#eab308" strokeWidth="2.5" />
                    <path d="M0 -10 C2 -14 6 -12 6 -12" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
                    <text x="0" y="48" fill="#1e293b" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Vale Alimentação</text>
                  </g>

                  {/* Floating Bubble 5: Vale Transporte */}
                  <g className="floating-bubble bubble-5" filter="url(#shadow)" transform="translate(90, 340)">
                    <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#14b8a6" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="26" fill="#f0fdfa" />
                    {/* Bus Icon */}
                    <rect x="-10" y="-8" width="20" height="14" rx="2" fill="none" stroke="#14b8a6" strokeWidth="2.5" />
                    <circle cx="-5" cy="10" r="2.5" fill="#14b8a6" />
                    <circle cx="5" cy="10" r="2.5" fill="#14b8a6" />
                    <path d="M-10 0 h20" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
                    <text x="0" y="48" fill="#1e293b" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Vale Transporte</text>
                  </g>

                  {/* Floating Bubble 6: Seguro de Vida */}
                  <g className="floating-bubble bubble-6" filter="url(#shadow)" transform="translate(90, 160)">
                    <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="26" fill="#f5f3ff" />
                    {/* Shield Icon */}
                    <path d="M0 -10 Q8 -10 8 -2 Q8 6 0 10 Q-8 6 -8 -2 Q-8 -10 0 -10 z" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinejoin="round" />
                    <text x="0" y="48" fill="#1e293b" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">Seguro de Vida</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="beneficios-problema">
        <div className="container">
          <div className="section-header">
            <h2>Sua gestão de benefícios ainda depende de planilhas e e-mails?</h2>
            <p>O controle manual de benefícios drena o tempo do seu time e gera erros custosos para a empresa.</p>
          </div>
          <div className="beneficios-problema-grid">
            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={24} />
              </div>
              <h3>Informações descentralizadas</h3>
              <p>Dados de colaboradores espalhados em dezenas de planilhas locais e e-mails, dificultando a conciliação e rastreamento das solicitações.</p>
            </div>
            
            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={24} />
              </div>
              <h3>Inclusões e exclusões manuais</h3>
              <p>O RH precisa acessar o portal de cada operadora individualmente para cadastrar ou excluir colaboradores, gerando alto estresse operacional.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={24} />
              </div>
              <h3>Risco de erro na folha</h3>
              <p>Descontos manuais de coparticipação ou atraso no repasse de dados para o fechamento geram erros que afetam diretamente o bolso do colaborador.</p>
            </div>

            <div className="problema-card">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={24} />
              </div>
              <h3>Falta de histórico</h3>
              <p>Dificuldade para auditar quem solicitou, quem aprovou e quando a movimentação foi feita na operadora, gerando retrabalho em auditorias.</p>
            </div>

            <div className="problema-card problema-card--full">
              <div className="problema-icon-wrapper">
                <AlertTriangle size={24} />
              </div>
              <h3>Retrabalho constante entre RH, DP e Operadoras</h3>
              <p>Trocas intermináveis de mensagens para resolver inconsistências cadastrais, faturas divergentes e cartões de benefício não entregues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solução Section */}
      <section className="beneficios-solucao">
        <div className="container">
          <div className="section-header section-header--light">
            <h2>Com o Dirhect, o processo fica centralizado e automatizado</h2>
            <p>Conectamos todas as pontas do fluxo de benefícios de ponta a ponta em tempo real.</p>
          </div>
          
          <div className="beneficios-flow">
            <div className="flow-step">
              <div className="flow-number">1</div>
              <div className="flow-icon">
                <Users size={32} />
              </div>
              <h3>Colaborador</h3>
              <p>Solicita inclusão ou alteração de benefícios diretamente pelo portal.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={28} />
            </div>

            <div className="flow-step highlight">
              <div className="flow-number">2</div>
              <div className="flow-icon">
                <Heart size={32} />
              </div>
              <h3>Dirhect Hub</h3>
              <p>Valida a elegibilidade e centraliza os dados cadastrais.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={28} />
            </div>

            <div className="flow-step">
              <div className="flow-number">3</div>
              <div className="flow-icon">
                <ShieldCheck size={32} />
              </div>
              <h3>RH / DP</h3>
              <p>Aprova a solicitação no dashboard em apenas um clique.</p>
            </div>

            <div className="flow-connector">
              <ChevronRight size={28} />
            </div>

            <div className="flow-step">
              <div className="flow-number">4</div>
              <div className="flow-icon">
                <Zap size={32} />
              </div>
              <h3>Operadora & Folha</h3>
              <p>A movimentação é enviada à operadora e os dados de desconto são computados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="beneficios-funcionalidades" className="beneficios-funcionalidades">
        <div className="container">
          <div className="section-header">
            <h2>Gestão ponta a ponta na mesma plataforma</h2>
            <p>Ferramentas robustas criadas para dar autonomia ao colaborador e controle ao RH.</p>
          </div>

          <div className="funcionalidades-grid">
            <div className="funcionalidade-card">
              <div className="func-icon">
                <FileText size={24} />
              </div>
              <h3>Solicitação de benefícios</h3>
              <p>Interface simples para colaboradores escolherem planos de saúde, odontológico, alimentação e transporte.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <CheckCircle2 size={24} />
              </div>
              <h3>Aprovação simplificada</h3>
              <p>O RH analisa e aprova solicitações pendentes de maneira ágil, com visibilidade de dependentes e regras.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <Sliders size={24} />
              </div>
              <h3>Elegibilidade automática</h3>
              <p>Definição de regras por cargo, localidade ou tempo de casa. O sistema exibe apenas o que o colaborador tem direito.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <Zap size={24} />
              </div>
              <h3>Movimentações automáticas</h3>
              <p>Inclusões e exclusões centralizadas e processadas, reduzindo a necessidade de portais de terceiros.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <Database size={24} />
              </div>
              <h3>Integração com operadoras</h3>
              <p>Formatos compatíveis com as principais operadoras de saúde, seguros e benefícios flexíveis do mercado.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <Settings size={24} />
              </div>
              <h3>Integração com a folha</h3>
              <p>Exportação consolidada dos descontos de benefícios diretamente para fechar a folha sem retrabalho.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <Clock size={24} />
              </div>
              <h3>Histórico completo</h3>
              <p>Trilha de auditoria detalhada que registra todas as solicitações, aprovações e processamentos.</p>
            </div>

            <div className="funcionalidade-card">
              <div className="func-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Dashboard gerencial</h3>
              <p>Visão clara dos custos com benefícios por categoria, adesão dos colaboradores e pendências.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Empresa Section */}
      <section className="beneficios-empresa">
        <div className="container">
          <div className="section-header">
            <h2>Por que a sua empresa escolhe o Dirhect?</h2>
            <p>Entregamos agilidade para o RH e uma experiência de primeiro mundo para os colaboradores.</p>
          </div>

          <div className="empresa-beneficios-grid">
            <div className="empresa-beneficio-item">
              <div className="empresa-icon-bullet">
                <Check size={18} />
              </div>
              <div>
                <h3>Menos retrabalho</h3>
                <p>Elimine o preenchimento de planilhas extras e cadastros repetitivos nos sites das operadoras.</p>
              </div>
            </div>

            <div className="empresa-beneficio-item">
              <div className="empresa-icon-bullet">
                <Check size={18} />
              </div>
              <div>
                <h3>Mais controle e segurança</h3>
                <p>Monitore prazos e elegibilidade dos pacotes de benefícios oferecidos de acordo com a política interna.</p>
              </div>
            </div>

            <div className="empresa-beneficio-item">
              <div className="empresa-icon-bullet">
                <Check size={18} />
              </div>
              <div>
                <h3>Redução drástica de erros</h3>
                <p>Evite descontos duplicados ou faltantes na folha de pagamento por conta de falhas de digitação.</p>
              </div>
            </div>

            <div className="empresa-beneficio-item">
              <div className="empresa-icon-bullet">
                <Check size={18} />
              </div>
              <div>
                <h3>Velocidade no atendimento</h3>
                <p>Processe movimentações e libere a utilização de planos de saúde de forma muito mais rápida.</p>
              </div>
            </div>

            <div className="empresa-beneficio-item">
              <div className="empresa-icon-bullet">
                <Check size={18} />
              </div>
              <div>
                <h3>Melhor experiência do colaborador</h3>
                <p>Portal intuitivo e integrado onde as solicitações de benefícios são feitas de forma amigável.</p>
              </div>
            </div>

            <div className="empresa-beneficio-item">
              <div className="empresa-icon-bullet">
                <Check size={18} />
              </div>
              <div>
                <h3>Rastreabilidade total</h3>
                <p>Acesse o log de auditoria de qualquer movimentação para conferência em poucos segundos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário / CTA Final */}
      <section className="beneficios-formulario-section" id="beneficios-form">
        <div className="container">
          <div className="beneficios-form-content">
            <div className="beneficios-form-header">
              <h2>Automatize a gestão de benefícios da sua empresa</h2>
              <p>
                O Dirhect conecta todos os envolvidos no processo para tornar a operação de benefícios mais simples, segura e eficiente. Solicite uma demonstração agora mesmo.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="beneficios-form">
              {error && <div className="beneficios-error-message">{error}</div>}
              <div className="beneficios-form-grid">
                <div className="beneficios-form-group">
                  <label htmlFor="nome">Nome Completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div className="beneficios-form-group">
                  <label htmlFor="email">E-mail Corporativo *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="seu.email@empresa.com"
                  />
                </div>
                <div className="beneficios-form-group">
                  <PhoneInput
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="beneficios-form-group">
                  <label htmlFor="empresa">Empresa *</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div className="beneficios-form-group">
                  <label htmlFor="colaboradores">Número de Colaboradores *</label>
                  <select
                    id="colaboradores"
                    name="colaboradores"
                    value={formData.colaboradores}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="1-50">1 a 50 colaboradores</option>
                    <option value="51-200">51 a 200 colaboradores</option>
                    <option value="201-500">201 a 500 colaboradores</option>
                    <option value="501-1000">501 a 1.000 colaboradores</option>
                    <option value="1000+">Mais de 1.000 colaboradores</option>
                  </select>
                </div>
                <div className="beneficios-form-group beneficios-form-group-full">
                  <label htmlFor="mensagem">Mensagem (Opcional)</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos sobre seus desafios atuais na gestão de benefícios..."
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="beneficios-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="beneficios-submit-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Rocket size={20} />
                    Solicitar Demonstração
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GestaoBeneficios;