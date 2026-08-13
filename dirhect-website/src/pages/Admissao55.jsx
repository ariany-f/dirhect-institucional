import React, { useState, useEffect, useRef } from 'react';
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
  Loader2
} from 'lucide-react';
import Header from '../components/Header.jsx?v=menu-nav-20260521';
import Footer from '../components/Footer';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './Admissao55.css';

const Admissao55 = () => {
  const [showModal, setShowModal] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [formData, setFormData] = useState({
    nomeContato: '',
    email: '',
    telefone: '',
    nomeEmpresa: '',
    numeroFuncionarios: '1-10 funcionários',
    mensagem: 'Tenho interesse na contratação da Admissão Digital avulsa por R$ 55 por admissão.'
  });

  const offerSectionRef = useRef(null);
  const finalCtaRef = useRef(null);

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

  const openFormModal = () => {
    setShowModal(true);
    setFormSubmitted(false);
    setSubmitError('');
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

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      telefone: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    if (!formData.nomeContato || !formData.email || !formData.telefone) {
      setSubmitError('Por favor, preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await sendDemoEmail({
        ...formData,
        necessidades: ['Admissão Digital - R$ 55']
      });

      if (response.success) {
        setFormSubmitted(true);
      } else {
        throw new Error(response.message || 'Erro ao enviar a solicitação.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Houve um erro no envio. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admissao-landing-page">
      <Header />

      {/* SEÇÃO 01 — HERO */}
      <section className="admissao-hero" aria-label="Introdução">
        <div className="landing-container admissao-hero-grid">
          <div className="admissao-hero-content animate-fade-in-left">
            <h1 className="admissao-hero-title">
              Sua próxima admissão pode levar minutos, não horas.
            </h1>
            <p className="admissao-hero-desc">
              Centralize documentos, dados e informações do novo colaborador em um único lugar e reduza o trabalho manual do RH.
            </p>
            
            <div className="admissao-hero-price-box">
              <span className="price-label">Apenas</span>
              <div className="price-value-container">
                <span className="price-currency">R$</span>
                <span className="price-value">55</span>
              </div>
              <span className="price-period">por admissão</span>
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
              <h3>Documentos espalhados</h3>
              <p>Arquivos perdidos em e-mails ou conversas que atrasam a formalização.</p>
            </div>

            <div className="admissao-pain-item">
              <div className="pain-icon-wrapper">
                <AlertCircle size={24} className="pain-icon" />
              </div>
              <h3>Informações incompletas</h3>
              <p>A necessidade constante de cobrar o colaborador por dados faltantes.</p>
            </div>

            <div className="admissao-pain-item">
              <div className="pain-icon-wrapper">
                <AlertTriangle size={24} className="pain-icon" />
              </div>
              <h3>Retrabalho do RH</h3>
              <p>Digitação de dados manualmente em diferentes sistemas internos.</p>
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
            <div className="admissao-step">
              <div className="step-number-container">
                <span className="step-number">01</span>
                <div className="step-pulse"></div>
              </div>
              <h3>Envie a admissão</h3>
              <p>O colaborador recebe o acesso para iniciar o processo.</p>
            </div>

            <div className="admissao-step">
              <div className="step-number-container">
                <span className="step-number">02</span>
              </div>
              <h3>Dados e documentos online</h3>
              <p>Ele preenche as informações e envia os documentos necessários digitalmente.</p>
            </div>

            <div className="admissao-step">
              <div className="step-number-container">
                <span className="step-number">03</span>
              </div>
              <h3>O RH acompanha</h3>
              <p>Veja o andamento da admissão e tudo que ainda precisa ser concluído.</p>
            </div>

            <div className="admissao-step">
              <div className="step-number-container">
                <span className="step-number">04</span>
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
                  <p>Preencha os dados abaixo e entraremos em contato para liberar o seu acesso por apenas <strong>R$ 55 por admissão</strong>.</p>
                </div>
                
                {submitError && (
                  <div className="modal-error-message">
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="modal-form">
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

                  <div className="form-row-2">
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
                    <div className="form-group">
                      <label htmlFor="telefone">Telefone / WhatsApp *</label>
                      <PhoneInput
                        value={formData.telefone}
                        onChange={handlePhoneChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
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
