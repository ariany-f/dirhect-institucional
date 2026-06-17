import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Rocket,
  Clock,
  Users,
  UserCheck,
  Smartphone,
  Shield,
  Zap,
  Sliders,
  Layers,
  Copy,
  PenTool,
  Sparkles,
  User,
  Mail,
  ChevronRight,
  Plus,
  Settings,
  Search
} from 'lucide-react';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './Formulario.css';
import Footer from '../components/Footer';
import heroDiagramBg from '../assets/hero-diagram-bg.svg';

const Formulario = () => {
  const [animState, setAnimState] = useState('clean'); // clean, window1, typing, closing1, window2, fields, closing2, checkmark, phrase
  const [showInput, setShowInput] = useState(false);
  const [showGenerateBtn, setShowGenerateBtn] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [visibleFields, setVisibleFields] = useState(0); // 0 to 7
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

  // Rolar para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animacao de criacao automatica de formulario
  useEffect(() => {
    let active = true;
    let timerId = null;
    let typingTimerId = null;
    let fieldsTimerId = null;

    const runLoop = () => {
      if (!active) return;
      
      // Step 1: Fundo limpo
      setAnimState('clean');
      setTypedText('');
      setVisibleFields(0);
      setShowInput(false);
      setShowGenerateBtn(false);
      setIsBtnClicked(false);

      // Step 2: Abre janela 1 (modal de pergunta)
      timerId = setTimeout(() => {
        if (!active) return;
        setAnimState('window1');

        // Step 2b: Exibe o campo de input
        timerId = setTimeout(() => {
          if (!active) return;
          setShowInput(true);

            // Step 3: Digitação automática
            timerId = setTimeout(() => {
              if (!active) return;
              setAnimState('typing');
              
              const fullText = "Criar formulário para cadastro bancário";
              let charIndex = 0;
              
              const typeNextChar = () => {
                if (!active) return;
                if (charIndex <= fullText.length) {
                  setTypedText(fullText.slice(0, charIndex));
                  charIndex++;
                  typingTimerId = setTimeout(typeNextChar, 80);
                } else {
                  // Digitação concluída -> Mostrar botão gerar
                  timerId = setTimeout(() => {
                    if (!active) return;
                    setShowGenerateBtn(true);

                    // Simular clique do botão gerar
                    timerId = setTimeout(() => {
                      if (!active) return;
                      setIsBtnClicked(true);

                      // Soltar clique e fechar janela 1
                      timerId = setTimeout(() => {
                        if (!active) return;
                        setIsBtnClicked(false);

                        timerId = setTimeout(() => {
                          if (!active) return;
                          setAnimState('closing1');

                          // Step 4: Abre janela 2 (formulario)
                          timerId = setTimeout(() => {
                            if (!active) return;
                            setAnimState('window2');

                            // Step 5: Aparece os campos um a um
                            timerId = setTimeout(() => {
                              if (!active) return;
                              setAnimState('fields');

                              let currentField = 0;
                              const showNextField = () => {
                                if (!active) return;
                                if (currentField < 6) {
                                  currentField++;
                                  setVisibleFields(currentField);
                                  fieldsTimerId = setTimeout(showNextField, 400);
                                } else {
                                  // Espera e fecha janela 2
                                  timerId = setTimeout(() => {
                                  if (!active) return;
                                  setAnimState('closing2');

                                  // Step 6: Mostra checkmark verde no centro
                                  timerId = setTimeout(() => {
                                    if (!active) return;
                                    setAnimState('checkmark');

                                    // Step 7: Mostra frase central forte
                                    timerId = setTimeout(() => {
                                      if (!active) return;
                                      setAnimState('phrase');

                                      // Step 8: Reinicia loop
                                      timerId = setTimeout(() => {
                                        if (active) {
                                          runLoop();
                                        }
                                      }, 3500);

                                    }, 2000); // Duracao do checkmark

                                  }, 600); // Transicao de fechar janela 2

                                }, 1800); // Espera após todos os campos aparecerem
                              }
                            };
                            showNextField();

                          }, 800); // Transicao de abrir janela 2

                        }, 600); // Transicao de fechar janela 1

                      }, 400); // Tempo do click ativo

                    }, 400); // Espera com botão clicado

                  }, 800); // Espera antes de simular o clique

                }, 600); // Espera após terminar de digitar para mostrar o botão
              }
            };
            
            typeNextChar();

          }, 850); // Espera após mostrar o input para começar a digitar

        }, 850); // Espera após abrir a janela 1 para mostrar o input

      }, 1000); // Tempo do fundo limpo
    };

    runLoop();

    return () => {
      active = false;
      clearTimeout(timerId);
      clearTimeout(typingTimerId);
      clearTimeout(fieldsTimerId);
    };
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
      await sendDemoEmail({
        ...formData,
        tipo: 'Formulários Inteligentes'
      });
      setIsSuccess(true);
    } catch (err) {
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="formulario-success">
        <div className="container">
          <div className="formulario-success-content">
            <div className="formulario-success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Solicitação Enviada com Sucesso!</h1>
            <p>
              Obrigado pelo seu interesse em nossa solução de Formulários Inteligentes. 
              Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração.
            </p>
            <div className="formulario-success-info">
              <div className="formulario-info-item">
                <Clock size={20} />
                <span>Resposta em 24h</span>
              </div>
              <div className="formulario-info-item">
                <Users size={20} />
                <span>Demonstração personalizada</span>
              </div>
              <div className="formulario-info-item">
                <UserCheck size={20} />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Textos para simular digitação no Step 1
  const typingText = "financeiro iniciando com...";

  return (
    <div className="formulario-page">
      
      {/* Hero Section (Zeev-style) */}
      <section className="zeev-hero">
        <div className="zeev-hero-container">
          
          <div className={`hero-bg-diagram ${
            animState !== 'checkmark' && animState !== 'phrase' ? 'opaque' : ''
          }`}>
            <img src={heroDiagramBg} alt="Diagrama de fluxo de admissão" className="hero-bg-image-file" />
          </div>
          
          {/* Header Texts */}
          <div className="zeev-hero-header">
            <span className="zeev-pretitle">O SISTEMA NA SUA MÃO. <span className="highlight-title-text">DO SEU JEITO.</span></span>
          </div>

          {/* Animated Diagram Area */}
          <div className="zeev-diagram-viewport form-animation-viewport">
            
            {/* Window 1: Pergunta e Digitação */}
            <div className={`form-anim-window window-1 ${
              animState === 'window1' || animState === 'typing' ? 'active' : ''
            } ${animState === 'closing1' ? 'closing' : ''}`}>
              <div className="window-header">
                <div className="window-dot red"></div>
                <div className="window-dot yellow"></div>
                <div className="window-dot green"></div>
              </div>
              <div className="window-content window-content-w1">
                <h3 className="window-question">Qual formulário você deseja criar?</h3>
                
                <div className={`window-input-container ${showInput ? 'visible' : ''}`}>
                  <div className="avatar-wrapper">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80" 
                      alt="User profile" 
                      className="real-avatar-img"
                    />
                  </div>
                  <div className="window-input-row">
                    <div className="input-box">
                      <span className="input-placeholder">
                        {typedText}
                        <span className="typing-cursor"></span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`generate-btn-wrapper ${showGenerateBtn ? 'visible' : ''}`}>
                  <button className={`anim-generate-btn ${isBtnClicked ? 'clicked' : ''}`}>
                    Gerar Formulário
                  </button>
                </div>
              </div>
            </div>

            {/* Window 2: Criação do Formulário Passo a Passo */}
            <div className={`form-anim-window window-2 ${
              animState === 'window2' || animState === 'fields' ? 'active' : ''
            } ${animState === 'closing2' ? 'closing' : ''}`}>
              <div className="window-header">
                <div className="window-dot red"></div>
                <div className="window-dot yellow"></div>
                <div className="window-dot green"></div>
                <span className="window-title-text">Criador de Formulários</span>
              </div>
              <div className="window-content form-generated-content">
                <div className="form-generator-badge">
                  <Sparkles size={12} className="spark-icon" />
                  <span>IA Dirhect criando...</span>
                </div>
                
                <div className="generated-fields-list">
                  <div className={`generated-field-item ${visibleFields >= 1 ? 'visible' : ''}`}>
                    <label>Nome do banco</label>
                    <div className="field-mock-input">Digite o nome do banco...</div>
                  </div>
                  
                  <div className={`generated-field-item ${visibleFields >= 2 ? 'visible' : ''}`}>
                    <label>Tipo de conta</label>
                    <div className="field-mock-radio-group">
                      <div className="field-mock-radio active">
                        <div className="radio-dot"></div>
                        <span>Conta Corrente</span>
                      </div>
                      <div className="field-mock-radio">
                        <div className="radio-dot"></div>
                        <span>Conta Poupança</span>
                      </div>
                    </div>
                  </div>

                  <div className="field-row-grid">
                    <div className={`generated-field-item ${visibleFields >= 3 ? 'visible' : ''}`}>
                      <label>Agência</label>
                      <div className="field-mock-input">0001</div>
                    </div>
                    <div className={`generated-field-item ${visibleFields >= 4 ? 'visible' : ''}`}>
                      <label>Conta</label>
                      <div className="field-mock-input">12345</div>
                    </div>
                    <div className={`generated-field-item ${visibleFields >= 5 ? 'visible' : ''}`}>
                      <label>Dígito</label>
                      <div className="field-mock-input">6</div>
                    </div>
                  </div>

                  <div className={`generated-field-item ${visibleFields >= 6 ? 'visible' : ''}`}>
                    <label>CPF ou CNPJ do titular</label>
                    <div className="field-mock-input">000.000.000-00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkmark de Sucesso */}
            <div className={`form-anim-checkmark ${animState === 'checkmark' ? 'active' : ''}`}>
              <svg className="custom-animated-check" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <circle className="check-circle" cx="30" cy="30" r="27" fill="none" />
                <path className="check-tick" fill="none" d="M16 30 L26 40 L44 18" />
              </svg>
            </div>

            {/* Frase Central Forte */}
            <div className={`form-anim-phrase ${animState === 'phrase' ? 'active' : ''}`}>
              <h2>
                Crie formulários personalizados <span className="highlight-text">em segundos</span>
              </h2>
            </div>

          </div>

          {/* Centered CTA */}
          <div className="zeev-hero-cta">
            <button 
              onClick={() => document.getElementById('formulario-form-section').scrollIntoView({ behavior: 'smooth' })}
              className="zeev-cta-btn"
            >
              Solicitar demonstração
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* Benefícios */}
      <section className="formulario-beneficios">
        <div className="container">
          <h2>Por que usar os Formulários Dirhect?</h2>
          <p className="formulario-subtitle">
            Aumente a eficiência operacional coletando dados estruturados diretamente no portal ou celular do colaborador.
          </p>
          <div className="formulario-beneficios-grid">
            <div className="formulario-beneficio-item">
              <div className="formulario-beneficio-icon">
                <Sliders size={32} />
              </div>
              <h3>Campos Customizados</h3>
              <p>
                Crie formulários sob medida para qualquer processo: pesquisas internas, atualizações cadastrais, 
                solicitações de benefícios e muito mais.
              </p>
            </div>
            <div className="formulario-beneficio-item">
              <div className="formulario-beneficio-icon">
                <Layers size={32} />
              </div>
              <h3>Lógica Condicional</h3>
              <p>
                Exiba ou oculte campos e perguntas com base nas respostas anteriores do colaborador, 
                tornando o preenchimento mais rápido e intuitivo.
              </p>
            </div>
            <div className="formulario-beneficio-item">
              <div className="formulario-beneficio-icon">
                <PenTool size={32} />
              </div>
              <h3>Assinatura Eletrônica</h3>
              <p>
                Colete assinaturas digitais válidas e seguras diretamente nos formulários, 
                agilizando aprovações e termos de aceite.
              </p>
            </div>
            <div className="formulario-beneficio-item">
              <div className="formulario-beneficio-icon">
                <Copy size={32} />
              </div>
              <h3>Upload de Documentos</h3>
              <p>
                Permita que os colaboradores tirem fotos ou anexem arquivos em PDF e imagem 
                diretamente pelo campo do formulário.
              </p>
            </div>
            <div className="formulario-beneficio-item">
              <div className="formulario-beneficio-icon">
                <Shield size={32} />
              </div>
              <h3>Conformidade e LGPD</h3>
              <p>
                Todos os dados coletados contam com trilha de auditoria completa, termos de consentimento claros e 
                criptografia robusta para garantir a privacidade.
              </p>
            </div>
            <div className="formulario-beneficio-item">
              <div className="formulario-beneficio-icon">
                <Zap size={32} />
              </div>
              <h3>Integração com Workflows</h3>
              <p>
                Os formulários preenchidos ativam fluxos de aprovação automáticos no módulo de BPMS, 
                notificando os gestores e atualizando o sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="formulario-como-funciona">
        <div className="container">
          <h2>Como funciona</h2>
          <p className="formulario-subtitle">
            Simplifique a coleta de dados na sua empresa em 4 passos simples
          </p>
          <div className="formulario-steps-grid">
            <div className="formulario-step-item">
              <div className="formulario-step-number">1</div>
              <div className="formulario-step-icon">
                <Settings size={32} />
              </div>
              <h3>Crie o Formulário</h3>
              <p>
                Escolha um modelo pronto ou monte um formulário do zero usando campos de texto, data, 
                seleção múltipla, anexo de arquivos e assinaturas.
              </p>
            </div>
            <div className="formulario-step-item">
              <div className="formulario-step-number">2</div>
              <div className="formulario-step-icon">
                <Smartphone size={32} />
              </div>
              <h3>Envie para os Colaboradores</h3>
              <p>
                Disponibilize o link no portal do colaborador ou envie por e-mail e WhatsApp. 
                Totalmente responsivo e amigável para celulares.
              </p>
            </div>
            <div className="formulario-step-item">
              <div className="formulario-step-number">3</div>
              <div className="formulario-step-icon">
                <Search size={32} />
              </div>
              <h3>Validação e Aprovação</h3>
              <p>
                O RH recebe as respostas estruturadas para validar os dados e analisar os anexos de forma 
                centralizada.
              </p>
            </div>
            <div className="formulario-step-item">
              <div className="formulario-step-number">4</div>
              <div className="formulario-step-icon">
                <Zap size={32} />
              </div>
              <h3>Automação de Dados</h3>
              <p>
                Os dados validados alimentam automaticamente o perfil do colaborador e podem ser integrados 
                diretamente com sua folha de pagamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Adicionais */}
      <section className="formulario-recursos">
        <div className="container">
          <h2>Recursos e Funcionalidades</h2>
          <div className="formulario-recursos-grid">
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <FileText size={24} />
              </div>
              <h4>Templates Prontos</h4>
              <p>Modelos pré-configurados de RH</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <PenTool size={24} />
              </div>
              <h4>Assinatura de Documentos</h4>
              <p>Termos de aceite e contratos</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <Copy size={24} />
              </div>
              <h4>Anexos Múltiplos</h4>
              <p>Fotos de documentos e comprovantes</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <Sliders size={24} />
              </div>
              <h4>Validação de Dados</h4>
              <p>Evite preenchimentos errados</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <Clock size={24} />
              </div>
              <h4>Lembretes Automáticos</h4>
              <p>Cobrança de preenchimento</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <Smartphone size={24} />
              </div>
              <h4>100% Responsivo</h4>
              <p>Preenchimento perfeito em smartphones</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <Shield size={24} />
              </div>
              <h4>Segurança LGPD</h4>
              <p>Consentimento de uso de dados</p>
            </div>
            <div className="formulario-recurso-item">
              <div className="formulario-recurso-icon">
                <Zap size={24} />
              </div>
              <h4>Integração via API</h4>
              <p>Conexão com folha de pagamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="formulario-cta">
        <div className="container">
          <div className="formulario-cta-content">
            <h2>Modernize a coleta de informações em sua empresa</h2>
            <p>
              Substitua de vez os processos manuais por fluxos dinâmicos e seguros de formulários.
            </p>
            <button 
              onClick={() => document.getElementById('formulario-form-section').scrollIntoView({ behavior: 'smooth' })}
              className="formulario-cta-btn"
            >
              <Rocket size={20} />
              Solicitar Demonstração
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="formulario-form-wrapper-section" id="formulario-form-section">
        <div className="container">
          <div className="formulario-form-content">
            <div className="formulario-form-header">
              <h2>Fale com um Especialista</h2>
              <p>
                Preencha o formulário abaixo para conhecer na prática o módulo de Formulários Inteligentes do Dirhect.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="formulario-form">
              {error && <div className="formulario-error-message">{error}</div>}
              <div className="formulario-form-grid">
                <div className="formulario-form-group">
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
                <div className="formulario-form-group">
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
                <div className="formulario-form-group">
                  <PhoneInput
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="formulario-form-group">
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
                <div className="formulario-form-group">
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
                <div className="formulario-form-group formulario-form-group-full">
                  <label htmlFor="mensagem">Mensagem (Opcional)</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    placeholder="Conte-nos sobre seus desafios atuais com formulários..."
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="formulario-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="formulario-submit-spinner"></div>
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

export default Formulario;
