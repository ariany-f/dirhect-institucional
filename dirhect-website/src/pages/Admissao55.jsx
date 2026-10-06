import SEO from '../components/SEO';
import { trackLead } from '../services/analytics';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Zap,
  ArrowRight,
  Check,
  AlertTriangle,
  FileSpreadsheet,
  AlertCircle,
  X,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Gift,
  CheckSquare,
  UserCheck,
  Sliders,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Header from '../components/Header.jsx?v=menu-nav-20260521';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './Admissao55.css';


const OTHER_PRODUCTS = [
  {
    id: 'beneficios',
    badge: 'Benefícios',
    title: 'Gestão de Benefícios',
    description: 'Elegibilidade, inclusões e movimentações integradas a operadoras e à folha.',
    icon: Gift,
    iconColor: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    features: ['Operadoras & Folha', 'Elegibilidade'],
    link: '/gestao-beneficios'
  },
  {
    id: 'tarefas',
    badge: 'Workflow & DP',
    title: 'Gestão de Tarefas',
    description: 'Rotinas operacionais de RH e DP organizadas com prazos e responsáveis.',
    icon: CheckSquare,
    iconColor: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    features: ['Prazos & Etapas', 'Sem gargalos'],
    link: '/gestao-tarefas'
  },
  {
    id: 'portal',
    badge: 'Autosserviço',
    title: 'Portal do Colaborador',
    description: 'Acesso seguro a holerites, informes e solicitações direto pelo celular ou web.',
    icon: UserCheck,
    iconColor: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    features: ['Holerites digitais', 'Autosserviço 24/7'],
    link: '/portal-rh'
  },
  {
    id: 'bpms',
    badge: 'Processos',
    title: 'BPMS para RH',
    description: 'Modelagem visual de fluxos internos e aprovações multinível sob medida.',
    icon: Sliders,
    iconColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    features: ['Workflows flexíveis', 'Aprovações'],
    link: '/bpms'
  },
  {
    id: 'integracoes',
    badge: 'Conectores',
    title: 'Integrações & ERPs',
    description: 'Conecte o Dirhect a TOTVS RM, SAP HCM, Gupy, LG e operadoras via APIs.',
    icon: Layers,
    iconColor: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    features: ['TOTVS & SAP', 'APIs seguras'],
    link: '/integracoes'
  },
  {
    id: 'formulario',
    badge: 'Formulários',
    title: 'Formulários Customizados',
    description: 'Crie pesquisas de clima e coletas estruturadas de dados com links e QR Code.',
    icon: FileText,
    iconColor: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    features: ['Link & QR Code', 'Validações'],
    link: '/formulario'
  }
];

const REPEAT_SETS = 5;
const BASE_SET_INDEX = 2; // Conjunto central
const BASE_OFFSET = BASE_SET_INDEX * OTHER_PRODUCTS.length; // 12
const CAROUSEL_ITEMS = Array.from({ length: REPEAT_SETS }).flatMap(() => OTHER_PRODUCTS);

const INTEGRATION_COMPANIES = [
  {
    name: 'TOTVS',
    src: '/images/logos/totvs-logo.png',
    category: 'ERP & Folha',
    title: 'TOTVS RM & Protheus',
    description: 'Sincronização direta de dados cadastrais e documentos para a folha de pagamento.',
    highlight: 'Conexão Nativa'
  },
  {
    name: 'SAP',
    src: '/images/logos/sap-logo.webp',
    category: 'ERP Global',
    title: 'SAP HCM & SuccessFactors',
    description: 'Integração de novos colaboradores e estrutura organizacional sem retrabalho.',
    highlight: 'Conexão Segura'
  },
  {
    name: 'LG lugar de gente',
    src: '/images/logos/lgsistemas-logo.png',
    category: 'Folha & DP',
    title: 'LG Sistemas',
    description: 'Alimentação automatizada das rotinas de Departamento Pessoal e folha.',
    highlight: 'Fluxo Automatizado'
  },
  {
    name: 'Gupy',
    src: '/images/logos/gupy-logo.png',
    category: 'R&S / ATS',
    title: 'Gupy Admissão',
    description: 'Puxe candidatos aprovados direto do processo seletivo para a admissão digital.',
    highlight: 'Importação Direta'
  },
  {
    name: 'Nexti',
    src: '/images/logos/nexti-logo.png',
    category: 'Ponto & Escala',
    title: 'Nexti RH',
    description: 'Ativação imediata do colaborador nas escalas de trabalho e controle de ponto.',
    highlight: 'Sincronia em Tempo Real'
  },
  {
    name: 'Closecare',
    src: '/images/logos/closecare-logo.webp',
    category: 'Saúde & Benefícios',
    title: 'Closecare Saúde',
    description: 'Validação integrada de atestados e documentações médicas admissionais.',
    highlight: 'Validação Digital'
  }
];

const Admissao55 = () => {
  const [showModal, setShowModal] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  
  const [formData, setFormData] = useState({
    nomeContato: '',
    email: '',
    telefone: '',
    nomeEmpresa: '',
    cnpj: '',
    numeroFuncionarios: '1-10 funcionários',
    mensagem: 'Tenho interesse na contratação da Admissão Digital avulsa por R$ 55 por admissão.'
  });

  const offerSectionRef = useRef(null);
  const finalCtaRef = useRef(null);
  const trackRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const leadTrackedRef = useRef(false);

  // Carousel Infinite Loop & Autoplay State
  const [currentIndex, setCurrentIndex] = useState(BASE_OFFSET);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Active product index (0 a 5) para indicadores e acessibilidade
  const activeProductIndex = ((currentIndex % OTHER_PRODUCTS.length) + OTHER_PRODUCTS.length) % OTHER_PRODUCTS.length;

  // Autoplay: avança continuamente a cada 3.5 segundos (pausa ao interagir)
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  // Pausa o autoplay se a aba do navegador ficar inativa
  useEffect(() => {
    const handleVisibility = () => {
      setIsCarouselHovered(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Normalização invisível para carrossel infinito contínuo sem retorno brusco
  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;

    const minThreshold = OTHER_PRODUCTS.length * 2; // 12
    const maxThreshold = OTHER_PRODUCTS.length * 3; // 18

    if (currentIndex >= maxThreshold || currentIndex < minThreshold) {
      const normalized = BASE_OFFSET + (((currentIndex % OTHER_PRODUCTS.length) + OTHER_PRODUCTS.length) % OTHER_PRODUCTS.length);
      setIsAnimating(false);
      setCurrentIndex(normalized);
    }
  };

  // Reabilita transições suaves logo após o reposicionamento imperceptível
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handlePrevProduct = () => {
    if (!isAnimating) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNextProduct = () => {
    if (!isAnimating) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (targetIndex) => {
    if (!isAnimating) return;
    let diff = targetIndex - activeProductIndex;
    if (diff > OTHER_PRODUCTS.length / 2) {
      diff -= OTHER_PRODUCTS.length;
    } else if (diff < -OTHER_PRODUCTS.length / 2) {
      diff += OTHER_PRODUCTS.length;
    }
    setCurrentIndex((prev) => prev + diff);
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sticky CTA visibility handler (show after hero, hide at final CTA)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Mostrar após scrollar a primeira dobra (aproximadamente 600px ou altura da viewport)
      const showSticky = scrollPosition > windowHeight - 150;
      
      // Esconder se o usuário estiver próximo do CTA Final
      let nearFinalCta = false;
      if (finalCtaRef.current) {
        const finalCtaTop = finalCtaRef.current.getBoundingClientRect().top + window.scrollY;
        nearFinalCta = scrollPosition + windowHeight > finalCtaTop + 50;
      }

      setStickyVisible(showSticky && !nearFinalCta);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loop for the process steps (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev === 4 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const openFormModal = () => {
    setShowModal(true);
    setFormSubmitted(false);
    setSubmitError('');
    isSubmittingRef.current = false;
    leadTrackedRef.current = false;
  };

  const closeFormModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (eOrValue) => {
    const val = (eOrValue && typeof eOrValue === 'object' && 'target' in eOrValue)
      ? (eOrValue.target?.value ?? '')
      : (typeof eOrValue === 'string' ? eOrValue : String(eOrValue || ''));
    setFormData(prev => ({
      ...prev,
      telefone: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Previne envios concorrentes ou cliques múltiplos repetidos
    if (isSubmittingRef.current || isSubmitting || leadTrackedRef.current) {
      return;
    }

    setSubmitError('');

    const nome = typeof formData.nomeContato === 'string' ? formData.nomeContato.trim() : '';
    const email = typeof formData.email === 'string' ? formData.email.trim() : '';
    const rawTelefone = (
      typeof formData.telefone === 'string'
        ? formData.telefone
        : (formData.telefone?.target?.value || '')
    ).trim();
    // Garante que o telefone tenha pelo menos 10 dígitos (DDD + número)
    const phoneDigits = rawTelefone.replace(/\D/g, '');
    const telefone = phoneDigits.length >= 10 ? rawTelefone : '';

    // Validação estrita dos campos obrigatórios
    if (!nome || !email || !telefone) {
      setSubmitError('Por favor, preencha todos os campos obrigatórios com um telefone válido.');
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await sendDemoEmail({
        ...formData,
        nomeEmpresa: (formData.nomeEmpresa || '').trim() || 'Não informada',
        cnpj: (formData.cnpj || '').trim() || 'Não informado',
        cargo: 'Não informado',
        segmento: 'Outros',
        necessidades: ['Admissão Digital - R$ 55']
      });

      // Dispara generate_lead SOMENTE quando o backend confirmar sucesso na criação do lead
      if (response && response.success) {
        setFormSubmitted(true);
        if (!leadTrackedRef.current) {
          leadTrackedRef.current = true;
          trackLead({
            formName: 'admissao_digital',
            formLocation: 'landing_page_admissao_55'
          });
        }
      } else {
        throw new Error(response?.message || 'Erro ao enviar a solicitação.');
      }
    } catch (err) {
      // Reabilita em caso de falha de conexão / erro de servidor para que o usuário possa tentar novamente
      isSubmittingRef.current = false;
      setSubmitError(err.message || 'Houve um erro no envio. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admissao-landing-page">
      <SEO
        title="Admissão Digital Avulsa por R$ 55 | Dirhect"
        description="Contrate a admissão digital avulsa do Dirhect por R$ 55 por admissão. Coleta rápida de documentos, validação e integração sem mensalidade fixa."
        canonical="https://dirhect.com.br/admissao_55"
      />
      <Header />

      {/* SEÇÃO 01 — HERO */}
      <section className="admissao-hero" aria-label="Introdução">
        <div className="landing-container admissao-hero-grid">
          <div className="admissao-hero-content animate-fade-in-left">
            <h1 className="admissao-hero-title">
              Sua próxima admissão <span className="highlight-orange">pode levar minutos</span>, não horas.
            </h1>
            <p className="admissao-hero-desc">
              Centralize documentos, dados e informações do novo colaborador em um único lugar e reduza o trabalho manual do RH.
            </p>
            
            <div className="admissao-hero-price-box">
              <div className="price-promo-row">
                <span className="price-from-label">
                  De <span className="price-strikethrough">R$ 70</span> por
                </span>
              </div>
              <div className="price-current-row">
                <div className="price-value-container">
                  <span className="price-currency">R$</span>
                  <span className="price-value">55</span>
                </div>
                <div className="price-badge-period-cluster">
                  <span className="price-discount-tag">
                    <Check size={11} strokeWidth={3} className="discount-icon" />
                    21% OFF
                  </span>
                  <span className="price-period">por admissão</span>
                </div>
              </div>
            </div>

            <div className="admissao-hero-action">
              <button onClick={openFormModal} className="admissao-btn-primary">
                COMEÇAR MINHA ADMISSÃO DIGITAL
                <ArrowRight size={18} className="admissao-btn-icon" />
              </button>
              <p className="admissao-microcopy">
                Sem precisar contratar uma plataforma completa de RH.
              </p>
            </div>
          </div>

          <div className="admissao-hero-media animate-fade-in-right">
            <img 
              src="/images/admissao-hero-professional.png" 
              alt="Profissional de Recursos Humanos trabalhando de forma tranquila em um escritório moderno com iluminação natural." 
              className="admissao-hero-img"
              width={600}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO DESTAQUE — PERSONALIZAÇÃO */}
      <section className="admissao-custom-banner-section" aria-label="Diferencial de personalização">
        <div className="landing-container">
          <div className="admissao-custom-banner-card">
            <Sparkles size={18} className="custom-banner-icon" aria-hidden="true" />
            <p className="custom-banner-phrase">
              Admissão digital <span className="custom-banner-highlight">totalmente personalizável</span>, que se adapta às necessidades da sua empresa.
            </p>
          </div>
        </div>
      </section>



      {/* SEÇÃO 02 — A DOR */}
      <section className="admissao-pain-section">
        <div className="landing-container">
          <div className="admissao-section-header">
            <h2>A admissão ainda começa no WhatsApp?</h2>
            <p className="admissao-section-desc">
              Documentos enviados por WhatsApp, informações faltando, e-mails, planilhas e horas gastas conferindo dados. Um processo que deveria ser simples acaba consumindo o tempo do RH.
            </p>
          </div>

          <div className="admissao-pain-items">
            <div className="admissao-pain-item">
              <div className="pain-icon-wrapper">
                <FileSpreadsheet size={24} className="pain-icon" />
              </div>
              <div className="pain-text-content">
                <h3>Documentos espalhados</h3>
                <p>Arquivos perdidos em e-mails ou conversas que atrasam a formalização.</p>
              </div>
            </div>

            <div className="admissao-pain-item">
              <div className="pain-icon-wrapper">
                <AlertCircle size={24} className="pain-icon" />
              </div>
              <div className="pain-text-content">
                <h3>Informações incompletas</h3>
                <p>A necessidade constante de cobrar o colaborador por dados faltantes.</p>
              </div>
            </div>

            <div className="admissao-pain-item">
              <div className="pain-icon-wrapper">
                <AlertTriangle size={24} className="pain-icon" />
              </div>
              <div className="pain-text-content">
                <h3>Retrabalho do RH</h3>
                <p>Digitação de dados manualmente em diferentes sistemas internos.</p>
              </div>
            </div>
          </div>

          <div className="admissao-pain-footer">
            <p>Com a Admissão Digital Dirhect, todo o processo fica centralizado em um único lugar.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 03 — COMO FUNCIONA */}
      <section className="admissao-steps-section">
        <div className="landing-container">
          <div className="admissao-section-header">
            <h2>Da contratação à admissão em poucos passos</h2>
          </div>

          <div className="admissao-steps-flow">
            <div className={`admissao-step ${activeStep === 1 ? 'active' : ''}`}>
              <div className="step-number-container">
                <span className="step-number">01</span>
                {activeStep === 1 && <div className="step-pulse"></div>}
              </div>
              <h3>Envie a admissão</h3>
              <p>O colaborador recebe o acesso para iniciar o processo.</p>
            </div>

            <div className={`admissao-step ${activeStep === 2 ? 'active' : ''}`}>
              <div className="step-number-container">
                <span className="step-number">02</span>
                {activeStep === 2 && <div className="step-pulse"></div>}
              </div>
              <h3>Dados e documentos online</h3>
              <p>Ele preenche as informações e envia os documentos necessários digitalmente.</p>
            </div>

            <div className={`admissao-step ${activeStep === 3 ? 'active' : ''}`}>
              <div className="step-number-container">
                <span className="step-number">03</span>
                {activeStep === 3 && <div className="step-pulse"></div>}
              </div>
              <h3>O RH acompanha</h3>
              <p>Veja o andamento da admissão e tudo que ainda precisa ser concluído.</p>
            </div>

            <div className={`admissao-step ${activeStep === 4 ? 'active' : ''}`}>
              <div className="step-number-container">
                <span className="step-number">04</span>
                {activeStep === 4 && <div className="step-pulse"></div>}
              </div>
              <h3>Processo organizado</h3>
              <p>As informações ficam centralizadas e prontas para seguir para as próximas etapas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 04 — PRODUTO EM CONTEXTO */}
      <section className="admissao-context-section">
        <div className="landing-container admissao-context-grid">
          <div className="admissao-context-visual" loading="lazy">
            {/* Mockup da Interface da Admissão Digital usando CSS Nativo */}
            <div className="dashboard-mockup-container">
              <div className="dashboard-mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-title">Painel Dirhect - Admissões</div>
              </div>
              
              <div className="dashboard-mockup-body">
                <div className="dashboard-list-title">Admissões em Andamento</div>
                
                <div className="mockup-list-item">
                  <div className="mockup-item-info">
                    <div className="mockup-avatar">LA</div>
                    <div>
                      <div className="mockup-name">Lucas Alencar</div>
                      <div className="mockup-subtext">Analista de Vendas</div>
                    </div>
                  </div>
                  <div className="mockup-item-progress">
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: '80%' }}></div>
                    </div>
                    <span className="progress-percent">80%</span>
                  </div>
                  <span className="mockup-status-badge badge-warning">Aguardando RH</span>
                </div>

                <div className="mockup-list-item">
                  <div className="mockup-item-info">
                    <div className="mockup-avatar avatar-blue">BF</div>
                    <div>
                      <div className="mockup-name">Beatriz Farias</div>
                      <div className="mockup-subtext">Dev Frontend Senior</div>
                    </div>
                  </div>
                  <div className="mockup-item-progress">
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: '45%' }}></div>
                    </div>
                    <span className="progress-percent">45%</span>
                  </div>
                  <span className="mockup-status-badge badge-info">Em Preenchimento</span>
                </div>

                <div className="mockup-list-item">
                  <div className="mockup-item-info">
                    <div className="mockup-avatar avatar-green">MS</div>
                    <div>
                      <div className="mockup-name">Maurício Silva</div>
                      <div className="mockup-subtext">Coordenador Financeiro</div>
                    </div>
                  </div>
                  <div className="mockup-item-progress">
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill fill-success" style={{ width: '100%' }}></div>
                    </div>
                    <span className="progress-percent">100%</span>
                  </div>
                  <span className="mockup-status-badge badge-success">Concluído</span>
                </div>

                <div className="mockup-checklist-box">
                  <div className="checklist-title">Documentos Recebidos - Lucas Alencar</div>
                  <div className="checklist-items">
                    <div className="checklist-item done">
                      <CheckCircle2 size={16} className="check-icon-done" />
                      <span>Documento de Identidade (RG/CNH)</span>
                    </div>
                    <div className="checklist-item done">
                      <CheckCircle2 size={16} className="check-icon-done" />
                      <span>Comprovante de Residência</span>
                    </div>
                    <div className="checklist-item pending">
                      <div className="check-icon-pending"></div>
                      <span>Carteira de Trabalho (CTPS)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admissao-context-content">
            <h2>Tudo em um único lugar.</h2>
            <p>
              O colaborador envia as informações. O RH acompanha o andamento. E os documentos deixam de ficar espalhados entre e-mails, mensagens e planilhas.
            </p>

            <ul className="admissao-checklist">
              <li>
                <div className="checklist-icon"><Check size={16} /></div>
                <span>Dados centralizados</span>
              </li>
              <li>
                <div className="checklist-icon"><Check size={16} /></div>
                <span>Documentos organizados</span>
              </li>
              <li>
                <div className="checklist-icon"><Check size={16} /></div>
                <span>Acompanhamento do processo</span>
              </li>
            </ul>

            <button onClick={openFormModal} className="admissao-btn-primary context-btn">
              COMEÇAR MINHA ADMISSÃO DIGITAL
              <ArrowRight size={18} className="admissao-btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 05 — BENEFÍCIOS */}
      <section className="admissao-benefits-section">
        <div className="landing-container">
          <div className="admissao-section-header">
            <h2>Menos operação. Mais controle.</h2>
          </div>

          <div className="admissao-benefits-grid">
            <div className="benefit-card">
              <h3>Economize tempo</h3>
              <p>Reduza tarefas manuais e processos repetitivos.</p>
            </div>

            <div className="benefit-card">
              <h3>Centralize informações</h3>
              <p>Dados e documentos organizados em um único ambiente.</p>
            </div>

            <div className="benefit-card">
              <h3>Reduza erros</h3>
              <p>Evite informações incompletas e problemas causados por processos manuais.</p>
            </div>

            <div className="benefit-card">
              <h3>Tenha mais controle</h3>
              <p>Acompanhe cada admissão e saiba o que ainda precisa ser concluído.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 06 — HUMANIZAÇÃO */}
      <section className="admissao-human-section">
        <div className="landing-container admissao-human-grid">
          <div className="admissao-human-media">
            <img 
              src="/images/admissao-humanizacao-employee.png" 
              alt="Novo funcionário sorrindo ao enviar seus documentos pelo celular, usufruindo de uma ótima experiência de onboarding." 
              className="admissao-human-img"
              loading="lazy"
              width={600}
              height={600}
            />
          </div>

          <div className="admissao-human-content">
            <h2>Mais simples para quem entra. Mais fácil para quem contrata.</h2>
            <p>
              Enquanto o novo colaborador envia seus dados e documentos de forma digital, o RH acompanha tudo sem depender de dezenas de mensagens e arquivos espalhados.
            </p>
            <button onClick={openFormModal} className="admissao-btn-primary human-btn">
              COMEÇAR MINHA ADMISSÃO DIGITAL
              <ArrowRight size={18} className="admissao-btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO — INTEGRAÇÃO & CONECTIVIDADE (SHOWCASE PREMIUM) */}
      <section className="admissao-integrations-section" aria-labelledby="integrations-title">
        <div className="landing-container">
          <div className="admissao-integrations-header">
            <div className="admissao-integrations-badge">
              <span className="integrations-badge-dot" aria-hidden="true" />
              <Zap size={14} className="integrations-badge-icon" aria-hidden="true" />
              <span>INTEGRAÇÃO & CONECTIVIDADE</span>
            </div>
            <h2 id="integrations-title" className="admissao-integrations-title">
              Conectado aos principais <span className="highlight-orange">sistemas e ERPs</span> do mercado
            </h2>
            <p className="admissao-integrations-desc">
              Os dados e documentos da admissão digital fluem com segurança direto para a folha e o DP, eliminando retrabalho manual e digitação dupla.
            </p>
          </div>

          <div className="admissao-integrations-grid">
            {INTEGRATION_COMPANIES.map((company) => (
              <div key={company.name} className="admissao-integration-tile">
                <div className="integration-tile-top">
                  <div className="integration-logo-badge">
                    <img src={company.src} alt={`Logo ${company.name}`} loading="lazy" />
                  </div>
                  <span className="integration-category-pill">{company.category}</span>
                </div>
                <h3 className="integration-tile-title">{company.title}</h3>
                <p className="integration-tile-desc">{company.description}</p>
                <div className="integration-tile-footer">
                  <span className="integration-status">
                    <CheckCircle2 size={13} className="status-check" aria-hidden="true" />
                    {company.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="admissao-integrations-bottom-bar">
            <div className="integration-trust-item">
              <Shield size={18} className="integration-trust-icon" aria-hidden="true" />
              <span>APIs RESTful seguras & criptografia ponta a ponta</span>
            </div>
            <span className="benefit-separator" aria-hidden="true">•</span>
            <div className="integration-trust-item">
              <Clock size={18} className="integration-trust-icon" aria-hidden="true" />
              <span>Sincronização ágil sem espera de TI</span>
            </div>
            <span className="benefit-separator" aria-hidden="true">•</span>
            <div className="integration-trust-item">
              <Check size={18} className="integration-trust-icon" aria-hidden="true" />
              <span>Sem custo adicional de mensalidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 07 — OFERTA */}
      <section ref={offerSectionRef} className="admissao-offer-section" id="oferta">
        <div className="landing-container">
          <div className="admissao-offer-card animate-pulse-border">
            <span className="offer-tag">ADMISSÃO DIGITAL DIRHECT</span>
            <h2>Quanto vale uma admissão sem retrabalho?</h2>
            
            <div className="offer-price-block">
              <span className="offer-currency">R$</span>
              <span className="offer-price">55</span>
              <span className="offer-per-admissao">por admissão</span>
            </div>

            <p className="offer-text">
              Digitalize o processo sem precisar contratar toda uma plataforma de RH.
            </p>
            
            <button onClick={openFormModal} className="admissao-btn-primary offer-btn">
              COMEÇAR AGORA POR R$ 55
              <ArrowRight size={18} className="admissao-btn-icon" />
            </button>
            
            <div className="offer-details">
              <span className="offer-detail-item">Você paga apenas pela admissão.</span>
              <span className="offer-detail-divider">•</span>
              <span className="offer-detail-item highlight-free">Sem mensalidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 08 — OUTROS PRODUTOS (CARROSSEL AUTOMÁTICO COM DESTAQUE CENTRAL) */}
      <section className="admissao-other-products-section" aria-labelledby="other-products-title">
        <div className="landing-container">
          <div className="admissao-other-products-header">
            <div className="other-products-badge">
              <Sparkles size={14} className="other-products-badge-icon" />
              <span>ECOSSISTEMA DIRHECT</span>
            </div>
            <h2 id="other-products-title">Conheça nossos outros produtos</h2>
            <p className="admissao-section-desc">
              Além da admissão digital, explore soluções integradas projetadas para simplificar e automatizar o dia a dia do seu RH.
            </p>
          </div>

          <div 
            className="other-products-carousel-shell"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            onTouchStart={() => setIsCarouselHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsCarouselHovered(false), 2000)}
          >
            <button 
              type="button" 
              className="carousel-arrow-btn prev"
              onClick={handlePrevProduct}
              aria-label="Produto anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="other-products-carousel-stage">
              <div 
                ref={trackRef}
                className={`other-products-carousel-track ${!isAnimating ? 'no-transition' : ''}`}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(calc(50% - (var(--card-w) / 2) - (${currentIndex} * (var(--card-w) + var(--card-gap)))))`
                }}
              >
                {CAROUSEL_ITEMS.map((prod, loopIdx) => {
                  const isActive = loopIdx === currentIndex;
                  const IconComponent = prod.icon;
                  return (
                    <Link
                      to={prod.link}
                      key={`${prod.id}-${loopIdx}`}
                      className={`other-product-card ${isActive ? 'is-active' : 'is-side'}`}
                      aria-current={isActive ? 'true' : undefined}
                      title={`Conhecer ${prod.title}`}
                    >
                      <div className="other-product-card-top">
                        <div className="other-product-icon-wrap" style={{ color: prod.iconColor, backgroundColor: prod.bgColor }}>
                          <IconComponent size={20} strokeWidth={2.2} />
                        </div>
                        <span className="other-product-pill" style={{ color: prod.iconColor, backgroundColor: prod.bgColor }}>
                          {prod.badge}
                        </span>
                      </div>

                      <div className="other-product-card-body">
                        <h3 className="other-product-card-title">{prod.title}</h3>
                        <p className="other-product-card-desc">{prod.description}</p>
                      </div>

                      <div className="other-product-card-footer">
                        <div className="other-product-tags">
                          {prod.features.map((feat, fIdx) => (
                            <span key={fIdx} className="other-product-tag-chip">
                              <Check size={11} strokeWidth={2.8} className="tag-check" />
                              {feat}
                            </span>
                          ))}
                        </div>
                        <div className="other-product-cta-link">
                          <span>Acessar</span>
                          <ArrowRight size={14} className="cta-arrow" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <button 
              type="button" 
              className="carousel-arrow-btn next"
              onClick={handleNextProduct}
              aria-label="Próximo produto"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="other-products-dots" role="tablist" aria-label="Navegação do carrossel">
            {OTHER_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                role="tab"
                aria-selected={activeProductIndex === idx}
                aria-label={`Ir para ${prod.title}`}
                className={`other-products-dot ${activeProductIndex === idx ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 09 — CTA FINAL */}
      <section ref={finalCtaRef} className="admissao-final-cta-section">
        <div className="landing-container">
          <div className="final-cta-content">
            <h2>Sua próxima admissão pode começar diferente.</h2>
            <p className="final-cta-subtitle">
              Menos papelada para o colaborador. Menos trabalho operacional para o RH.
            </p>
            
            <div className="final-cta-pricing">
              <strong className="final-cta-title-tag">Admissão Digital Dirhect</strong>
              <div className="final-price-value">R$ 55 por admissão</div>
            </div>

            <button onClick={openFormModal} className="admissao-btn-primary final-btn">
              COMEÇAR MINHA ADMISSÃO DIGITAL
              <ArrowRight size={18} className="admissao-btn-icon animate-arrow-hover" />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* STICKY CTA (MOBILE ONLY) */}
      {stickyVisible && (
        <div className="admissao-sticky-cta-mobile animate-slide-up">
          <div className="sticky-cta-content">
            <div className="sticky-price-info">
              <span className="sticky-title">Admissão Digital</span>
              <span className="sticky-price">R$ 55 /admissão</span>
            </div>
            <button onClick={openFormModal} className="admissao-btn-primary sticky-btn">
              Começar
            </button>
          </div>
        </div>
      )}

      {/* LEAD CAPTURE FORM MODAL */}
      {showModal && (
        <div className="admissao-modal-overlay animate-fade-in" onClick={closeFormModal}>
          <div className="admissao-modal-container animate-scale-up" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeFormModal} aria-label="Fechar">
              <X size={20} />
            </button>
            
            {!formSubmitted ? (
              <div className="modal-form-content">
                <div className="modal-header">
                  <h3>Iniciar Admissão Digital</h3>
                  <p>Preencha os dados abaixo para liberar seu acesso por apenas <strong>R$ 55 por admissão</strong>.</p>
                </div>
                
                {submitError && (
                  <div className="modal-error-message">
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="nomeContato">Seu Nome *</label>
                      <input 
                        type="text" 
                        id="nomeContato" 
                        name="nomeContato" 
                        required 
                        value={formData.nomeContato}
                        onChange={handleInputChange}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-mail Corporativo *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="form-group form-group--phone">
                    <label htmlFor="telefone">Telefone / WhatsApp *</label>
                    <PhoneInput
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="nomeEmpresa">Nome da Empresa</label>
                      <input 
                        type="text" 
                        id="nomeEmpresa" 
                        name="nomeEmpresa" 
                        value={formData.nomeEmpresa}
                        onChange={handleInputChange}
                        placeholder="Empresa Ltda"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="numeroFuncionarios">Tamanho da Empresa</label>
                      <select 
                        id="numeroFuncionarios" 
                        name="numeroFuncionarios" 
                        value={formData.numeroFuncionarios}
                        onChange={handleInputChange}
                      >
                        <option value="1-10 funcionários">1 a 10 funcionários</option>
                        <option value="11-50 funcionários">11 a 50 funcionários</option>
                        <option value="51-200 funcionários">51 a 200 funcionários</option>
                        <option value="201-500 funcionários">201 a 500 funcionários</option>
                        <option value="Mais de 500 funcionários">Mais de 500 funcionários</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="admissao-btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Enviando solicitação...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Solicitar Acesso - R$ 55</span>
                      </>
                    )}
                  </button>
                  
                  <span className="form-security-note">
                    <Shield size={12} /> Seus dados estão seguros e protegidos pela LGPD.
                  </span>
                </form>
              </div>
            ) : (
              <div className="modal-success-content animate-fade-in">
                <div className="success-icon-wrapper">
                  <Check className="success-icon animate-check" size={40} />
                </div>
                <h3>Solicitação enviada com sucesso!</h3>
                <p>Obrigado pelo seu interesse. Nossa equipe comercial entrará em contato nas próximas horas para liberar o seu acesso à <strong>Admissão Digital por R$ 55</strong>.</p>
                <button onClick={closeFormModal} className="admissao-btn-primary success-btn">
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissao55;
