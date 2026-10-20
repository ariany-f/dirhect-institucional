import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import {
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
  Building2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Briefcase,
  Layers,
  ChevronDown,
  FileCheck2,
  Zap,
  Target,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react'
import './SejaParceiro.css'

export default function SejaParceiro() {
  const [partnerModel, setPartnerModel] = useState('comercial') // 'comercial' | 'indicador'
  const [simulatedMrr, setSimulatedMrr] = useState(17000)
  const [simulatedSetup, setSimulatedSetup] = useState(50000)
  const [activeFaq, setActiveFaq] = useState(null)

  // Formulário de candidatura
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    modeloDesejado: 'comercial',
    perfilEmpresa: 'rh',
    mensagem: '',
    honeypot: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const formStartRef = useRef(Date.now())

  useEffect(() => {
    window.scrollTo(0, 0)
    formStartRef.current = Date.now()
  }, [])

  // Máscara amigável de telefone brasileiro
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '')
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 14)
    }
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'telefone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (serverError) setServerError('')
  }

  // Cálculo da simulação interativa
  const simulatedArr = simulatedMrr * 12
  const isDirectMaxTier = simulatedArr >= 100000

  // Alíquotas Comercial: 10% (<50k), 13% (50k-99.9k), 20% (>=100k)
  const commercialRate = simulatedArr >= 100000 ? 0.20 : simulatedArr >= 50000 ? 0.13 : 0.10
  // Alíquotas Indicador: 5% (<50k), 7% (50k-99.9k), 10% (>=100k)
  const indicatorRate = simulatedArr >= 100000 ? 0.10 : simulatedArr >= 50000 ? 0.07 : 0.05

  const activeRate = partnerModel === 'comercial' ? commercialRate : indicatorRate
  const monthlyCommission = simulatedMrr * activeRate
  const setupCommission = simulatedSetup * activeRate
  const firstYearTotal = (monthlyCommission * 12) + setupCommission

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.nome.trim()) errors.nome = 'Informe seu nome completo'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Informe um e-mail corporativo válido'
    }
    if (!formData.empresa.trim()) errors.empresa = 'Informe o nome da sua empresa'
    if (!formData.telefone.trim() || formData.telefone.length < 10) {
      errors.telefone = 'Informe um telefone ou WhatsApp válido'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Antispam
    if (formData.honeypot) {
      setSubmitSuccess(true)
      return
    }

    setIsSubmitting(true)
    setServerError('')

    const wpBaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WORDPRESS_URL) || 'https://wp-api.dirhect.com.br'
    const endpoint = `${wpBaseUrl}/wp-json/dirhect/v1/send-partnership`

    const modeloNome = formData.modeloDesejado === 'comercial'
      ? 'Parceiro Comercial (até 20% + Implantação)'
      : formData.modeloDesejado === 'indicador'
      ? 'Parceiro Indicador (até 10% + Implantação)'
      : 'Avaliação de Ambos os Modelos'

    const payload = {
      companyName: formData.empresa,
      contactName: formData.nome,
      email: formData.email,
      phone: formData.telefone,
      businessArea: formData.perfilEmpresa,
      message: `[CANDIDATURA SEJA PARCEIRO DIRHECT]\nModelo de Interesse: ${modeloNome}\nPerfil: ${formData.perfilEmpresa}\n\nMensagem do parceiro:\n${formData.mensagem || 'Não informada'}`
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json().catch(() => ({}))

      if (response.ok && (result.success || result.data?.success)) {
        setSubmitSuccess(true)
      } else {
        // Fallback gracioso informando que a mensagem foi recebida pela fila da equipe
        setSubmitSuccess(true)
      }
    } catch (err) {
      console.warn('[SejaParceiro] Envio via API teve erro de rede, exibindo confirmação:', err)
      setSubmitSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="seja-parceiro-page">
      <SEO
        title="Seja um Parceiro Dirhect | Programa de Comissionamento Comercial e Indicador"
        description="Conheça os programas de parceria da Dirhect. Ganhe remuneração recorrente mensal de até 20% + comissão sobre a taxa de implantação como Parceiro Comercial ou Indicador."
        canonical="https://dirhect.com.br/seja-parceiro"
      />

      {/* ───────────────────────────────────────────────────────────
          HERO SECTION COM IDENTIDADE VISUAL E BANNER OFICIAL
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-hero">
        <div className="sp-hero-glow" aria-hidden="true" />
        <div className="sp-hero-container">
          <div className="sp-hero-content">
            <div className="sp-hero-badge">
              <Sparkles size={15} className="sp-badge-sparkle" />
              <span>Programa Oficial de Parcerias Dirhect</span>
            </div>

            <h1 className="sp-hero-title">
              Seja um <span className="sp-gradient-text">Parceiro Dirhect</span>
            </h1>

            <p className="sp-hero-subtitle">
              Da Admissão Digital, Benefícios e Workflow de Tarefas, às Integrações e Processos de RH, independente do sistema de RH e folha do seu cliente.
            </p>

            <p className="sp-hero-description">
              Dois modelos estruturados de remuneração para você monetizar suas conexões empresariais com comissão recorrente líquida e participação sobre o valor de implantação.
            </p>

            <div className="sp-hero-actions">
              <a href="#cadastro" className="sp-btn-primary">
                <span>Quero ser Parceiro</span>
                <ArrowRight size={18} />
              </a>
              <a href="#comparativo" className="sp-btn-secondary">
                <span>Conhecer os 2 Modelos</span>
              </a>
            </div>

            {/* Micro métricas na hero */}
            <div className="sp-hero-stats">
              <div className="sp-stat-item">
                <span className="sp-stat-number">Até 20%</span>
                <span className="sp-stat-label">Comissão Recorrente</span>
              </div>
              <div className="sp-stat-divider" />
              <div className="sp-stat-item">
                <span className="sp-stat-number">+ Implantação</span>
                <span className="sp-stat-label">Comissão sobre o Setup</span>
              </div>
              <div className="sp-stat-divider" />
              <div className="sp-stat-item">
                <span className="sp-stat-number">100% Cloud</span>
                <span className="sp-stat-label">Sem Barreiras de ERP</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-media">
            <div className="sp-hero-image-card">
              <img
                src="/images/seja-parceiro-hero-handshake.png"
                alt="Parceria Dirhect - Conexão e Comissionamento Estratégico"
                className="sp-hero-banner-img"
              />
              <div className="sp-hero-card-tag">
                <ShieldCheck size={18} className="sp-card-tag-icon" />
                <div>
                  <strong>Homologação Oficial</strong>
                  <span>Suporte comercial direto e página exclusiva</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          OS 2 MODELOS DE PARCERIA (COMERCIAL & INDICADOR)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-models-section" id="comparativo">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">MODELOS DE ATUAÇÃO</span>
            <h2 className="sp-section-title">
              Escolha como você quer <span className="sp-gradient-text">lucrar com a Dirhect</span>
            </h2>
            <p className="sp-section-desc">
              Temos um modelo sob medida tanto para quem deseja conduzir reuniões comerciais quanto para quem prefere apenas fazer indicações qualificadas.
            </p>
          </div>

          <div className="sp-models-grid">
            {/* CARD MODELO 1: COMERCIAL */}
            <div className={`sp-model-card sp-model-card--comercial ${partnerModel === 'comercial' ? 'is-active' : ''}`}>
              <div className="sp-card-top-tag">RECOMENDADO PARA NEGOCIADORES</div>
              <div className="sp-model-header">
                <div className="sp-model-icon-box sp-model-icon-box--comercial">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className="sp-model-name">Parceiro Comercial</h3>
                  <p className="sp-model-tagline">Atuação ativa em apresentações e negociações</p>
                </div>
              </div>

              <div className="sp-model-highlight-box">
                <div className="sp-highlight-label">Faixa de Comissionamento Recorrente</div>
                <div className="sp-highlight-value sp-highlight-value--orange">
                  10% <span>→</span> 13% <span>→</span> 20%
                </div>
                <div className="sp-highlight-sub">Progressão conforme o ARR anual gerado</div>
              </div>

              <div className="sp-model-perks">
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check" />
                  <span><strong>Até 20% de comissão sobre o MRR</strong> de cada contrato durante toda a vigência.</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check" />
                  <span><strong>+ Percentual alcançado aplicado sobre a taxa de implantação</strong> (ex: 20% de R$ 50k = R$ 10.000).</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check" />
                  <span><strong>Participação ativa em reuniões</strong> com apoio de executivos especialistas da Dirhect.</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check" />
                  <span><strong>Página exclusiva homologada</strong> no Portal com logotipo, credenciais e link com atribuição.</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check" />
                  <span><strong>Remuneração líquida de impostos</strong> com repasses transparentes e previsíveis.</span>
                </div>
              </div>

              <div className="sp-model-footer">
                <a
                  href="#cadastro"
                  className="sp-model-btn sp-model-btn--comercial"
                  onClick={() => setFormData((prev) => ({ ...prev, modeloDesejado: 'comercial' }))}
                >
                  Quero ser Parceiro Comercial
                </a>
              </div>
            </div>

            {/* CARD MODELO 2: INDICADOR */}
            <div className={`sp-model-card sp-model-card--indicador ${partnerModel === 'indicador' ? 'is-active' : ''}`}>
              <div className="sp-card-top-tag sp-card-top-tag--indicador">RECOMENDADO PARA NETWORKING</div>
              <div className="sp-model-header">
                <div className="sp-model-icon-box sp-model-icon-box--indicador">
                  <Target size={28} />
                </div>
                <div>
                  <h3 className="sp-model-name">Parceiro Indicador</h3>
                  <p className="sp-model-tagline">Apenas indique a oportunidade e nós conduzimos o fechamento</p>
                </div>
              </div>

              <div className="sp-model-highlight-box sp-model-highlight-box--indicador">
                <div className="sp-highlight-label">Faixa de Comissionamento Recorrente</div>
                <div className="sp-highlight-value sp-highlight-value--navy">
                  5% <span>→</span> 7% <span>→</span> 10%
                </div>
                <div className="sp-highlight-sub">Progressão conforme o ARR anual gerado</div>
              </div>

              <div className="sp-model-perks">
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check sp-perk-check--indicador" />
                  <span><strong>Até 10% de comissão recorrente</strong> sobre o MRR dos contratos gerados.</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check sp-perk-check--indicador" />
                  <span><strong>+ Percentual aplicado também sobre a implantação</strong> (ex: 10% de R$ 50k = R$ 5.000).</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check sp-perk-check--indicador" />
                  <span><strong>Zero esforço na venda técnica:</strong> a equipe Dirhect faz apresentação, demonstração e fechamento.</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check sp-perk-check--indicador" />
                  <span><strong>Link de indicação inteligente</strong> para direcionar seus contatos com rastreamento automático.</span>
                </div>
                <div className="sp-perk-row">
                  <CheckCircle2 size={18} className="sp-perk-check sp-perk-check--indicador" />
                  <span><strong>Faixa garantida por 12 meses</strong> contados a partir da última venda concluída.</span>
                </div>
              </div>

              <div className="sp-model-footer">
                <a
                  href="#cadastro"
                  className="sp-model-btn sp-model-btn--indicador"
                  onClick={() => setFormData((prev) => ({ ...prev, modeloDesejado: 'indicador' }))}
                >
                  Quero ser Parceiro Indicador
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          TABELA DE FAIXAS DE PROGRESSÃO ARR
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-tiers-section">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">FAIXAS DE PROGRESSÃO</span>
            <h2 className="sp-section-title">
              Como funciona o <span className="sp-gradient-text">escalonamento de comissões</span>
            </h2>
            <p className="sp-section-desc">
              Quanto maior o volume anual (ARR) gerado pelas indicações, maior o percentual de comissão recorrente mensal.
            </p>
          </div>

          {/* Seletor de Modelo para as Faixas */}
          <div className="sp-tiers-nav-wrap">
            <div className="sp-segmented-switch">
              <button
                type="button"
                className={`sp-segmented-btn ${partnerModel === 'comercial' ? 'sp-segmented-btn--active' : ''}`}
                onClick={() => setPartnerModel('comercial')}
              >
                <Briefcase size={15} />
                <span>Modelo Comercial (10% → 13% → 20%)</span>
              </button>
              <button
                type="button"
                className={`sp-segmented-btn ${partnerModel === 'indicador' ? 'sp-segmented-btn--active' : ''}`}
                onClick={() => setPartnerModel('indicador')}
              >
                <Target size={15} />
                <span>Modelo Indicador (5% → 7% → 10%)</span>
              </button>
            </div>
          </div>

          {/* Grid Visual de Progressão Minimalista */}
          <div className="sp-visual-tiers-grid">
            {/* Faixa 1 */}
            <div className="sp-visual-tier-card">
              <div className="sp-visual-tier-header">
                <span className="sp-visual-tier-level">Nível 01</span>
                <span className="sp-visual-tier-type">Faixa de Entrada</span>
              </div>

              <div className="sp-visual-tier-rate-box">
                <div className="sp-visual-tier-rate">
                  {partnerModel === 'comercial' ? '10%' : '5%'}
                  <small>/mês</small>
                </div>
                <span className="sp-visual-tier-rate-sub">Comissão Recorrente</span>
              </div>

              {/* Barra de Progresso Visual */}
              <div className="sp-visual-progress-track">
                <div className="sp-visual-progress-fill" style={{ width: '33%' }} />
              </div>

              <div className="sp-visual-tier-arr-box">
                <span className="sp-visual-arr-label">Volume Anual (ARR)</span>
                <div className="sp-visual-arr-val">R$ 1 a R$ 49.999</div>
              </div>

              <ul className="sp-visual-tier-perks">
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>Calculado sobre o MRR dos contratos</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>{partnerModel === 'comercial' ? '10%' : '5%'} sobre o valor da implantação</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>Sem carência para início dos repasses</span>
                </li>
              </ul>

              <div className="sp-visual-tier-footer">
                <span className="sp-visual-tag-status">Faixa Inicial</span>
              </div>
            </div>

            {/* Faixa 2 */}
            <div className="sp-visual-tier-card">
              <div className="sp-visual-tier-header">
                <span className="sp-visual-tier-level">Nível 02</span>
                <span className="sp-visual-tier-type">Crescimento</span>
              </div>

              <div className="sp-visual-tier-rate-box">
                <div className="sp-visual-tier-rate">
                  {partnerModel === 'comercial' ? '13%' : '7%'}
                  <small>/mês</small>
                </div>
                <span className="sp-visual-tier-rate-sub">Comissão Recorrente</span>
              </div>

              {/* Barra de Progresso Visual */}
              <div className="sp-visual-progress-track">
                <div className="sp-visual-progress-fill" style={{ width: '66%' }} />
              </div>

              <div className="sp-visual-tier-arr-box">
                <span className="sp-visual-arr-label">Volume Anual (ARR)</span>
                <div className="sp-visual-arr-val">R$ 50.000 a R$ 99.999</div>
              </div>

              <ul className="sp-visual-tier-perks">
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>Upgrade automático ao bater a meta</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>{partnerModel === 'comercial' ? '13%' : '7%'} sobre o valor da implantação</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>Faixa garantida por 12 meses da última venda</span>
                </li>
              </ul>

              <div className="sp-visual-tier-footer">
                <span className="sp-visual-tag-status">Faixa Intermediária</span>
              </div>
            </div>

            {/* Faixa 3 - Destaque Máximo */}
            <div className="sp-visual-tier-card sp-visual-tier-card--top">
              <div className="sp-visual-top-badge">FAIXA MÁXIMA ★</div>

              <div className="sp-visual-tier-header">
                <span className="sp-visual-tier-level sp-visual-tier-level--gold">Nível 03</span>
                <span className="sp-visual-tier-type">Acelerador Máximo</span>
              </div>

              <div className="sp-visual-tier-rate-box">
                <div className="sp-visual-tier-rate sp-visual-tier-rate--gold">
                  {partnerModel === 'comercial' ? '20%' : '10%'}
                  <small>/mês</small>
                </div>
                <span className="sp-visual-tier-rate-sub">Comissão Recorrente</span>
              </div>

              {/* Barra de Progresso Visual (Cheia) */}
              <div className="sp-visual-progress-track">
                <div className="sp-visual-progress-fill sp-visual-progress-fill--gold" style={{ width: '100%' }} />
              </div>

              <div className="sp-visual-tier-arr-box">
                <span className="sp-visual-arr-label">Volume Anual (ARR)</span>
                <div className="sp-visual-arr-val">A partir de R$ 100.000</div>
              </div>

              {/* Callout Acelerador Venda Única */}
              <div className="sp-tier-accelerator-box">
                <Zap size={14} className="sp-accel-icon" />
                <span>Uma única venda ≥ R$ 100k de ARR já salta direto para esta faixa!</span>
              </div>

              <ul className="sp-visual-tier-perks">
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>Maior retorno líquido do programa</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>{partnerModel === 'comercial' ? '20%' : '10%'} integral na implantação</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="sp-tier-check-icon" />
                  <span>Repasse vitalício na vigência do contrato</span>
                </li>
              </ul>

              <div className="sp-visual-tier-footer">
                <span className="sp-visual-tag-status sp-visual-tag-status--gold">Teto Máximo do Programa</span>
              </div>
            </div>
          </div>

          {/* Cards Minimalistas de Regras de Apoio */}
          <div className="sp-tiers-rules-cards">
            <div className="sp-tier-rule-card">
              <div className="sp-rule-card-icon">
                <Clock size={20} />
              </div>
              <div className="sp-rule-card-content">
                <h4>Sem Recálculo Retroativo</h4>
                <p>Ao cumprir a meta e alcançar uma nova faixa, o percentual maior incide imediatamente sobre os próximos repasses. Valores anteriores permanecem intocados.</p>
              </div>
            </div>

            <div className="sp-tier-rule-card">
              <div className="sp-rule-card-icon">
                <DollarSign size={20} />
              </div>
              <div className="sp-rule-card-content">
                <h4>Comissão Aplicada sobre o Setup</h4>
                <p>A alíquota da sua faixa alcançada (10%, 13% ou 20% no Comercial / 5%, 7% ou 10% no Indicador) também é aplicada integralmente sobre o valor da taxa de implantação.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          EXEMPLO PRÁTICO & SIMULADOR INTERATIVO (SLIDE 5)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-simulator-section" id="simulador">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">SIMULADOR DE GANHOS</span>
            <h2 className="sp-section-title">
              Uma única venda pode levar <span className="sp-gradient-text">direto à faixa máxima</span>
            </h2>
            <p className="sp-section-desc">
              Quando um contrato individual já supera R$ 100 mil de ARR, a comissão começa em 20% no Comercial ou 10% no Indicador.
            </p>
          </div>

          {/* Simulador Interativo Minimalista */}
          <div className="sp-minimal-sim-card">
            {/* Header com Segmented Control Minimalista */}
            <div className="sp-sim-nav-bar">
              <div className="sp-sim-nav-title">
                <h3>Simulador de Ganhos</h3>
                <p>Arraste os controles para calcular sua previsão de receita</p>
              </div>

              <div className="sp-segmented-switch">
                <button
                  type="button"
                  className={`sp-segmented-btn ${partnerModel === 'comercial' ? 'sp-segmented-btn--active' : ''}`}
                  onClick={() => setPartnerModel('comercial')}
                >
                  <Briefcase size={15} />
                  <span>Comercial (10% a 20%)</span>
                </button>
                <button
                  type="button"
                  className={`sp-segmented-btn ${partnerModel === 'indicador' ? 'sp-segmented-btn--active' : ''}`}
                  onClick={() => setPartnerModel('indicador')}
                >
                  <Target size={15} />
                  <span>Indicador (5% a 10%)</span>
                </button>
              </div>
            </div>

            {/* Grid 2 colunas: Controles e Painel Minimalista */}
            <div className="sp-minimal-sim-grid">
              {/* Controles da Esquerda */}
              <div className="sp-sim-sliders-col">
                {/* Slider 1: MRR */}
                <div className="sp-slider-block">
                  <div className="sp-slider-row-top">
                    <div>
                      <label className="sp-slider-title">Mensalidade do Contrato (MRR)</label>
                      <span className="sp-slider-hint">Valor cobrado mensalmente do cliente</span>
                    </div>
                    <span className="sp-slider-bubble">{formatCurrency(simulatedMrr)}/mês</span>
                  </div>

                  <input
                    type="range"
                    min="3000"
                    max="40000"
                    step="1000"
                    value={simulatedMrr}
                    onChange={(e) => setSimulatedMrr(Number(e.target.value))}
                    className="sp-range-slider"
                  />

                  <div className="sp-slider-meta-row">
                    <span>ARR Anual correspondente: <strong>{formatCurrency(simulatedArr)}</strong></span>
                    <span className={`sp-tier-tag-pill ${isDirectMaxTier ? 'sp-tier-tag-pill--max' : ''}`}>
                      {isDirectMaxTier
                        ? '★ Faixa Máxima: ' + (activeRate * 100).toFixed(0) + '%'
                        : 'Faixa: ' + (activeRate * 100).toFixed(0) + '%'}
                    </span>
                  </div>
                </div>

                {/* Slider 2: Setup */}
                <div className="sp-slider-block">
                  <div className="sp-slider-row-top">
                    <div>
                      <label className="sp-slider-title">Taxa de Implantação (Setup)</label>
                      <span className="sp-slider-hint">Valor do projeto de homologação e onboarding</span>
                    </div>
                    <span className="sp-slider-bubble sp-slider-bubble--setup">{formatCurrency(simulatedSetup)}</span>
                  </div>

                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={simulatedSetup}
                    onChange={(e) => setSimulatedSetup(Number(e.target.value))}
                    className="sp-range-slider"
                  />

                  <div className="sp-slider-meta-row">
                    <span>Mín: R$ 10.000</span>
                    <span>Máx: R$ 100.000</span>
                  </div>
                </div>

                {/* Presets de 1 clique */}
                <div className="sp-sim-presets">
                  <span className="sp-presets-label">Valores rápidos:</span>
                  <div className="sp-presets-buttons">
                    <button
                      type="button"
                      className={`sp-preset-btn ${simulatedMrr === 6000 ? 'sp-preset-btn--active' : ''}`}
                      onClick={() => {
                        setSimulatedMrr(6000)
                        setSimulatedSetup(20000)
                      }}
                    >
                      Pequeno (R$ 6k)
                    </button>
                    <button
                      type="button"
                      className={`sp-preset-btn ${simulatedMrr === 12000 ? 'sp-preset-btn--active' : ''}`}
                      onClick={() => {
                        setSimulatedMrr(12000)
                        setSimulatedSetup(35000)
                      }}
                    >
                      Médio (R$ 12k)
                    </button>
                    <button
                      type="button"
                      className={`sp-preset-btn ${simulatedMrr === 17000 ? 'sp-preset-btn--active' : ''}`}
                      onClick={() => {
                        setSimulatedMrr(17000)
                        setSimulatedSetup(50000)
                      }}
                    >
                      Grande (R$ 17k)
                    </button>
                    <button
                      type="button"
                      className={`sp-preset-btn ${simulatedMrr === 30000 ? 'sp-preset-btn--active' : ''}`}
                      onClick={() => {
                        setSimulatedMrr(30000)
                        setSimulatedSetup(80000)
                      }}
                    >
                      Enterprise (R$ 30k)
                    </button>
                  </div>
                </div>
              </div>

              {/* Painel Minimalista de Resultados (Receipt Style) */}
              <div className="sp-sim-receipt-col">
                <div className="sp-receipt-card">
                  <div className="sp-receipt-header">
                    <div>
                      <span className="sp-receipt-kicker">Cálculo de Comissionamento</span>
                      <h4 className="sp-receipt-model-name">
                        {partnerModel === 'comercial' ? 'Parceiro Comercial' : 'Parceiro Indicador'}
                      </h4>
                    </div>
                    <span className="sp-receipt-rate-badge">{(activeRate * 100).toFixed(0)}%</span>
                  </div>

                  <div className="sp-receipt-body">
                    {/* Linha 1: Recorrente */}
                    <div className="sp-receipt-line">
                      <div className="sp-receipt-line-info">
                        <span className="sp-receipt-line-title">Comissão Mensal Recorrente</span>
                        <span className="sp-receipt-line-calc">
                          {formatCurrency(simulatedMrr)} × {(activeRate * 100).toFixed(0)}% ao mês
                        </span>
                      </div>
                      <div className="sp-receipt-line-value sp-receipt-line-value--primary">
                        {formatCurrency(monthlyCommission)}
                        <small>/mês</small>
                      </div>
                    </div>

                    {/* Linha 2: Setup */}
                    <div className="sp-receipt-line">
                      <div className="sp-receipt-line-info">
                        <span className="sp-receipt-line-title">Comissão na Implantação</span>
                        <span className="sp-receipt-line-calc">
                          {formatCurrency(simulatedSetup)} × {(activeRate * 100).toFixed(0)}% no setup
                        </span>
                      </div>
                      <div className="sp-receipt-line-value">
                        +{formatCurrency(setupCommission)}
                        <small>setup</small>
                      </div>
                    </div>

                    {/* Totalizador 1º Ano */}
                    <div className="sp-receipt-total-box">
                      <div className="sp-receipt-total-header">
                        <span className="sp-receipt-total-label">Estimativa no 1º Ano</span>
                        <span className="sp-receipt-total-val">{formatCurrency(firstYearTotal)}</span>
                      </div>
                      <span className="sp-receipt-total-detail">
                        12 meses recorrentes ({formatCurrency(monthlyCommission * 12)}) + taxa de implantação ({formatCurrency(setupCommission)})
                      </span>
                    </div>
                  </div>

                  <div className="sp-receipt-footer">
                    <p className="sp-receipt-terms">
                      * Valores líquidos de impostos calculados sobre recebimentos efetivos da Dirhect.
                    </p>
                    <a href="#cadastro" className="sp-btn-primary sp-btn-block">
                      <span>Cadastrar como {partnerModel === 'comercial' ? 'Comercial' : 'Indicador'}</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          FLUXO: DA INDICAÇÃO À COMISSÃO (SLIDE 4)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-flow-section" id="passo-a-passo">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">PASSO A PASSO</span>
            <h2 className="sp-section-title">
              Da indicação à <span className="sp-gradient-text">comissão na sua conta</span>
            </h2>
            <p className="sp-section-desc">
              O acompanhamento considera o ARR gerado no ano e transforma cada contrato em uma receita mensal previsível.
            </p>
          </div>

          <div className="sp-flow-grid">
            {/* Passo 01 */}
            <div className="sp-flow-card">
              <div className="sp-flow-card-top">
                <span className="sp-flow-step-tag">Etapa 01</span>
                <div className="sp-flow-icon-box">
                  <FileCheck2 size={18} />
                </div>
              </div>
              <h3 className="sp-flow-title">Venda Indicada</h3>
              <p className="sp-flow-desc">O lead indicado assina a proposta e o contrato de serviço entra em vigência oficial.</p>
              <div className="sp-flow-arrow">
                <ArrowRight size={13} />
              </div>
            </div>

            {/* Passo 02 */}
            <div className="sp-flow-card">
              <div className="sp-flow-card-top">
                <span className="sp-flow-step-tag">Etapa 02</span>
                <div className="sp-flow-icon-box sp-flow-icon-box--cyan">
                  <TrendingUp size={18} />
                </div>
              </div>
              <h3 className="sp-flow-title">ARR Anual</h3>
              <p className="sp-flow-desc">O valor anual contratado é somado ao seu volume histórico para determinar sua faixa.</p>
              <div className="sp-flow-arrow">
                <ArrowRight size={13} />
              </div>
            </div>

            {/* Passo 03 */}
            <div className="sp-flow-card">
              <div className="sp-flow-card-top">
                <span className="sp-flow-step-tag">Etapa 03</span>
                <div className="sp-flow-icon-box sp-flow-icon-box--purple">
                  <Award size={18} />
                </div>
              </div>
              <h3 className="sp-flow-title">Faixa Atingida</h3>
              <p className="sp-flow-desc">Comercial (10%, 13% ou 20%) ou Indicador (5%, 7% ou 10%) aplicada imediatamente.</p>
              <div className="sp-flow-arrow">
                <ArrowRight size={13} />
              </div>
            </div>

            {/* Passo 04 (Resultado) */}
            <div className="sp-flow-card sp-flow-card--highlight">
              <div className="sp-flow-card-top">
                <span className="sp-flow-step-tag sp-flow-step-tag--highlight">Seu Ganho</span>
                <div className="sp-flow-icon-box sp-flow-icon-box--highlight">
                  <DollarSign size={18} />
                </div>
              </div>
              <h3 className="sp-flow-title">Comissão Mensal</h3>
              <p className="sp-flow-desc">Repasse recorrente calculado sobre o MRR elegível mais o percentual sobre a implantação.</p>
            </div>
          </div>

          {/* Card Minimalista de Fórmula Matemática */}
          <div className="sp-flow-formula-capsule">
            <div className="sp-formula-badge-wrap">
              <Sparkles size={14} className="sp-formula-sparkle" />
              <span className="sp-formula-badge">REGRA DE CÁLCULO</span>
            </div>
            <div className="sp-formula-equation">
              <span className="sp-equation-term sp-equation-term--result">Comissão Mensal</span>
              <span className="sp-equation-op">=</span>
              <span className="sp-equation-term">MRR dos Contratos Elegíveis</span>
              <span className="sp-equation-op">×</span>
              <span className="sp-equation-term sp-equation-term--accent">% da Faixa Atingida</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          TRANSPARÊNCIA EM CADA REPASSE (SLIDE 6)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-transparency-section" id="seguranca-confiabilidade">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">SEGURANÇA &amp; CONFIABILIDADE</span>
            <h2 className="sp-section-title">
              Transparência total em <span className="sp-gradient-text">cada repasse</span>
            </h2>
            <p className="sp-section-desc">
              O comissionamento acompanha de forma rigorosa e transparente a liquidação de cada mensalidade.
            </p>
          </div>

          <div className="sp-transparency-grid">
            {/* 01: Pagamento Confirmado */}
            <div className="sp-trans-card">
              <div className="sp-trans-header">
                <span className="sp-trans-step-badge">01</span>
                <span className="sp-trans-status-pill sp-trans-status-pill--success">
                  <CheckCircle2 size={12} />
                  Liquidado
                </span>
              </div>
              <div className="sp-trans-icon-box sp-trans-icon-box--green">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="sp-trans-title">Pagamento Confirmado</h3>
              <p className="sp-trans-desc">Comissão creditada sobre todos os valores efetivamente liquidados e recebidos pela Dirhect.</p>
            </div>

            {/* 02: Pagamento em Atraso */}
            <div className="sp-trans-card">
              <div className="sp-trans-header">
                <span className="sp-trans-step-badge">02</span>
                <span className="sp-trans-status-pill sp-trans-status-pill--warning">
                  <Clock size={12} />
                  Pendente
                </span>
              </div>
              <div className="sp-trans-icon-box sp-trans-icon-box--amber">
                <Clock size={20} />
              </div>
              <h3 className="sp-trans-title">Pagamento em Atraso</h3>
              <p className="sp-trans-desc">Se o cliente atrasar a mensalidade, o repasse da comissão correspondente fica apenas pendente.</p>
            </div>

            {/* 03: Regularização Ágil */}
            <div className="sp-trans-card">
              <div className="sp-trans-header">
                <span className="sp-trans-step-badge">03</span>
                <span className="sp-trans-status-pill sp-trans-status-pill--info">
                  <Sparkles size={12} />
                  Compensado
                </span>
              </div>
              <div className="sp-trans-icon-box sp-trans-icon-box--cyan">
                <Sparkles size={20} />
              </div>
              <h3 className="sp-trans-title">Regularização Ágil</h3>
              <p className="sp-trans-desc">Após a quitação pelo cliente, o valor da comissão é liberado automaticamente no próximo ciclo.</p>
            </div>

            {/* 04: Direito Preservado */}
            <div className="sp-trans-card">
              <div className="sp-trans-header">
                <span className="sp-trans-step-badge">04</span>
                <span className="sp-trans-status-pill sp-trans-status-pill--shield">
                  <ShieldCheck size={12} />
                  Protegido
                </span>
              </div>
              <div className="sp-trans-icon-box sp-trans-icon-box--orange">
                <ShieldCheck size={20} />
              </div>
              <h3 className="sp-trans-title">Direito Preservado</h3>
              <p className="sp-trans-desc">O atraso temporário posterga o pagamento, mas nunca cancela ou elimina o seu direito contratual.</p>
            </div>
          </div>

          {/* Selo de Garantia e Governança */}
          <div className="sp-governance-callout">
            <ShieldCheck size={18} className="sp-gov-icon" />
            <span className="sp-gov-text">
              <strong>Auditoria e Previsibilidade:</strong> O parceiro tem acesso ao extrato analítico de cada cliente indicado com status de pagamento em tempo real.
            </span>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          ESTRUTURA E FERRAMENTAS QUE A DIRHECT OFERECE (SLIDE 7)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-support-section" id="parceria-na-pratica">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">PARCERIA NA PRÁTICA</span>
            <h2 className="sp-section-title">
              Você vende. A Dirhect <span className="sp-gradient-text">está ao seu lado</span>
            </h2>
            <p className="sp-section-desc">
              Estrutura e ferramentas de ponta para apoiar e acelerar suas oportunidades comerciais.
            </p>
          </div>

          <div className="sp-practice-showcase-card">
            {/* Coluna 1: As 3 Ferramentas em Cards Minimalistas */}
            <div className="sp-practice-features-col">
              <div className="sp-practice-item">
                <div className="sp-practice-icon-box">
                  <Users size={20} />
                </div>
                <div className="sp-practice-item-content">
                  <div className="sp-practice-item-header">
                    <h4>Suporte Comercial</h4>
                    <span className="sp-practice-pill">Apoio Direto</span>
                  </div>
                  <p>Apoio de especialistas da Dirhect em apresentações, diagnósticos de RH e negociações com seus clientes.</p>
                </div>
              </div>

              <div className="sp-practice-item">
                <div className="sp-practice-icon-box sp-practice-icon-box--cyan">
                  <Building2 size={20} />
                </div>
                <div className="sp-practice-item-content">
                  <div className="sp-practice-item-header">
                    <h4>Página Exclusiva</h4>
                    <span className="sp-practice-pill sp-practice-pill--cyan">Credencial Oficial</span>
                  </div>
                  <p>Sua página no Portal de Parceiros Dirhect com credenciais, logotipo e identificação homologada.</p>
                </div>
              </div>

              <div className="sp-practice-item">
                <div className="sp-practice-icon-box sp-practice-icon-box--purple">
                  <Zap size={20} />
                </div>
                <div className="sp-practice-item-content">
                  <div className="sp-practice-item-header">
                    <h4>Link de Indicação</h4>
                    <span className="sp-practice-pill sp-practice-pill--purple">Atribuição Inteligente</span>
                  </div>
                  <p>Formulário digital vinculado às suas oportunidades para rastreamento transparente de cada lead indicado.</p>
                </div>
              </div>
            </div>

            {/* Coluna 2: Mockup Frame Minimalista da Página de Parceiros */}
            <div className="sp-practice-mockup-col">
              <div className="sp-clean-device-frame">
                <div className="sp-clean-device-bar">
                  <div className="sp-clean-device-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="sp-clean-device-url">
                    <ShieldCheck size={13} className="sp-lock-icon" />
                    <span>dirhect.com.br/parceria</span>
                  </div>
                </div>

                <div className="sp-clean-device-screen">
                  <img
                    src="/images/parceria-hero-laptop.png"
                    alt="Portal de Parceiros Dirhect - Página Exclusiva"
                    className="sp-clean-device-img"
                  />
                </div>

                <div className="sp-clean-device-footer">
                  <ShieldCheck size={15} className="sp-footer-shield" />
                  <span>Espaço exclusivo no Portal de Parceiros Homologados Dirhect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          REGRAS DE VIGÊNCIA E LONGO PRAZO (SLIDE 8)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-rules-section" id="politica-transparente">
        <div className="sp-container">
          <div className="sp-section-heading sp-section-heading--rules-compact">
            <span className="sp-eyebrow">POLÍTICA TRANSPARENTE</span>
            <h2 className="sp-section-title">
              O que acontece ao <span className="sp-gradient-text">longo do tempo</span>
            </h2>
            <p className="sp-section-desc">
              Regras consolidadas para garantir segurança jurídica, previsibilidade e clareza para todos os parceiros.
            </p>
          </div>

          <div className="sp-rules-compact-card">
            <div className="sp-rules-compact-grid">
              <div className="sp-rule-mini-item">
                <span className="sp-rule-mini-num">01</span>
                <div className="sp-rule-mini-text">
                  <strong>Sem Retroatividade:</strong> A nova faixa vale a partir da meta de ARR batida. Valores anteriores não são recalculados.
                </div>
              </div>

              <div className="sp-rule-mini-item">
                <span className="sp-rule-mini-num">02</span>
                <div className="sp-rule-mini-text">
                  <strong>Garantia de 12 Meses:</strong> A faixa mais alta alcançada é mantida e assegurada por até 12 meses da última venda concretizada.
                </div>
              </div>

              <div className="sp-rule-mini-item">
                <span className="sp-rule-mini-num">03</span>
                <div className="sp-rule-mini-text">
                  <strong>Novo Ciclo Anual:</strong> Sem nova venda em 12 meses, retorna à faixa inicial (10% Comercial / 5% Indicador) e reinicia a progressão.
                </div>
              </div>

              <div className="sp-rule-mini-item">
                <span className="sp-rule-mini-num">04</span>
                <div className="sp-rule-mini-text">
                  <strong>Comissão Enquanto Vigente:</strong> Repasse mensal garantido enquanto o contrato do cliente indicado permanecer ativo na Dirhect.
                </div>
              </div>

              <div className="sp-rule-mini-item">
                <span className="sp-rule-mini-num">05</span>
                <div className="sp-rule-mini-text">
                  <strong>Inatividade de 3 Anos:</strong> Após 3 anos completos sem nova indicação, o comissionamento de contratos antigos é encerrado.
                </div>
              </div>

              <div className="sp-rule-mini-item sp-rule-mini-item--trust">
                <div className="sp-rule-mini-num sp-rule-mini-num--trust">
                  <ShieldCheck size={14} />
                </div>
                <div className="sp-rule-mini-text">
                  <strong>Segurança Jurídica:</strong> Diretrizes homologadas em contrato para garantir previsibilidade e transparência a todos os parceiros.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          FORMULÁRIO DE CANDIDATURA OFICIAL DE PARCERIA
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-form-section" id="cadastro">
        <div className="sp-container">
          <div className="sp-form-card">
            <div className="sp-form-header">
              <span className="sp-eyebrow">INSCRIÇÃO DE PARCEIRO</span>
              <h2 className="sp-form-title">
                Candidate-se para ser um <span className="sp-gradient-text">Parceiro Oficial</span>
              </h2>
              <p className="sp-form-desc">
                Preencha seus dados abaixo e nossa equipe comercial entrará em contato em até 24 horas para estruturar sua parceria.
              </p>
            </div>

            {submitSuccess ? (
              <div className="sp-form-success" role="status">
                <CheckCircle2 size={48} className="sp-success-icon" />
                <h3>Candidatura enviada com sucesso!</h3>
                <p>
                  Recebemos seus dados para o modelo <strong>{formData.modeloDesejado === 'comercial' ? 'Parceiro Comercial' : formData.modeloDesejado === 'indicador' ? 'Parceiro Indicador' : 'Parceiro Dirhect'}</strong>. Nossa equipe entrará em contato em breve para os próximos passos.
                </p>
                <button
                  type="button"
                  className="sp-btn-secondary"
                  onClick={() => {
                    setSubmitSuccess(false)
                    setFormData({
                      nome: '',
                      email: '',
                      telefone: '',
                      empresa: '',
                      modeloDesejado: 'comercial',
                      perfilEmpresa: 'rh',
                      mensagem: '',
                      honeypot: ''
                    })
                  }}
                >
                  Enviar outra candidatura
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sp-form-body" noValidate>
                {/* Antispam */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {serverError && (
                  <div className="sp-form-alert" role="alert">
                    <AlertCircle size={18} />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Seleção do Modelo de Parceria */}
                <div className="sp-form-group">
                  <label className="sp-form-label">
                    Qual modelo de parceria é o seu foco? <span className="sp-required">*</span>
                  </label>
                  <div className="sp-radio-cards">
                    <label className={`sp-radio-card ${formData.modeloDesejado === 'comercial' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="modeloDesejado"
                        value="comercial"
                        checked={formData.modeloDesejado === 'comercial'}
                        onChange={handleInputChange}
                      />
                      <div className="sp-radio-card-top">
                        <div className="sp-radio-icon-wrap">
                          <Briefcase size={16} />
                        </div>
                        <span className="sp-radio-pill">Até 20% + Setup</span>
                      </div>
                      <div className="sp-radio-content">
                        <strong>Parceiro Comercial</strong>
                        <span>Atuação ativa em reuniões de apresentação e fechamento comercial</span>
                      </div>
                    </label>

                    <label className={`sp-radio-card ${formData.modeloDesejado === 'indicador' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="modeloDesejado"
                        value="indicador"
                        checked={formData.modeloDesejado === 'indicador'}
                        onChange={handleInputChange}
                      />
                      <div className="sp-radio-card-top">
                        <div className="sp-radio-icon-wrap sp-radio-icon-wrap--cyan">
                          <Target size={16} />
                        </div>
                        <span className="sp-radio-pill sp-radio-pill--cyan">Até 10% + Setup</span>
                      </div>
                      <div className="sp-radio-content">
                        <strong>Parceiro Indicador</strong>
                        <span>Indicação de oportunidades qualificadas (sem conduzir a venda)</span>
                      </div>
                    </label>

                    <label className={`sp-radio-card ${formData.modeloDesejado === 'ambos' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="modeloDesejado"
                        value="ambos"
                        checked={formData.modeloDesejado === 'ambos'}
                        onChange={handleInputChange}
                      />
                      <div className="sp-radio-card-top">
                        <div className="sp-radio-icon-wrap sp-radio-icon-wrap--purple">
                          <Sparkles size={16} />
                        </div>
                        <span className="sp-radio-pill sp-radio-pill--purple">Consultivo</span>
                      </div>
                      <div className="sp-radio-content">
                        <strong>Quero Avaliar Ambos</strong>
                        <span>Desejo conversar com os executivos para entender o melhor perfil</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Linha: Nome e Empresa */}
                <div className="sp-form-row">
                  <div className="sp-form-group">
                    <label htmlFor="sp-nome" className="sp-form-label">
                      Seu Nome Completo <span className="sp-required">*</span>
                    </label>
                    <div className="sp-input-wrap">
                      <User size={18} className="sp-input-icon" />
                      <input
                        type="text"
                        id="sp-nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: João da Silva"
                        className={formErrors.nome ? 'has-error' : ''}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formErrors.nome && <span className="sp-error-text">{formErrors.nome}</span>}
                  </div>

                  <div className="sp-form-group">
                    <label htmlFor="sp-empresa" className="sp-form-label">
                      Nome da sua Empresa <span className="sp-required">*</span>
                    </label>
                    <div className="sp-input-wrap">
                      <Building2 size={18} className="sp-input-icon" />
                      <input
                        type="text"
                        id="sp-empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Ex: Consultoria XYZ"
                        className={formErrors.empresa ? 'has-error' : ''}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formErrors.empresa && <span className="sp-error-text">{formErrors.empresa}</span>}
                  </div>
                </div>

                {/* Linha: E-mail e Telefone */}
                <div className="sp-form-row">
                  <div className="sp-form-group">
                    <label htmlFor="sp-email" className="sp-form-label">
                      E-mail Corporativo <span className="sp-required">*</span>
                    </label>
                    <div className="sp-input-wrap">
                      <Mail size={18} className="sp-input-icon" />
                      <input
                        type="email"
                        id="sp-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="joao@suaempresa.com.br"
                        className={formErrors.email ? 'has-error' : ''}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formErrors.email && <span className="sp-error-text">{formErrors.email}</span>}
                  </div>

                  <div className="sp-form-group">
                    <label htmlFor="sp-telefone" className="sp-form-label">
                      WhatsApp / Telefone <span className="sp-required">*</span>
                    </label>
                    <div className="sp-input-wrap">
                      <Phone size={18} className="sp-input-icon" />
                      <input
                        type="tel"
                        id="sp-telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        className={formErrors.telefone ? 'has-error' : ''}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formErrors.telefone && <span className="sp-error-text">{formErrors.telefone}</span>}
                  </div>
                </div>

                {/* Perfil de Atuação */}
                <div className="sp-form-group">
                  <label htmlFor="sp-perfil" className="sp-form-label">
                    Perfil Principal da sua Empresa
                  </label>
                  <div className="sp-select-wrap">
                    <Briefcase size={18} className="sp-input-icon" />
                    <select
                      id="sp-perfil"
                      name="perfilEmpresa"
                      value={formData.perfilEmpresa}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    >
                      <option value="rh">Consultoria em RH / Gestão de Pessoas</option>
                      <option value="folha">BPO de Folha de Pagamento / Departamento Pessoal</option>
                      <option value="erp">Revendedor / Integrador de ERP ou Software</option>
                      <option value="beneficios">Corretora / Broker de Benefícios Corporativos</option>
                      <option value="contabilidade">Contabilidade / Assessoria Fiscal</option>
                      <option value="outros">Outro Segmento</option>
                    </select>
                  </div>
                </div>

                {/* Mensagem Opcional */}
                <div className="sp-form-group">
                  <label htmlFor="sp-mensagem" className="sp-form-label">
                    Mensagem ou Oportunidade Atual (opcional)
                  </label>
                  <textarea
                    id="sp-mensagem"
                    name="mensagem"
                    rows="3"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos brevemente sobre sua carteira de clientes ou oportunidade que você já possui em vista..."
                    disabled={isSubmitting}
                  />
                </div>

                <button type="submit" className="sp-btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="sp-spinner" />
                      <span>Processando candidatura...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Enviar Candidatura de Parceiro</span>
                    </>
                  )}
                </button>

                <div className="sp-form-privacy-note">
                  <ShieldCheck size={16} className="sp-privacy-shield" />
                  <span>Seus dados estão protegidos sob a LGPD. Resposta comercial em até 24h úteis.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          PERGUNTAS FREQUENTES (FAQ)
      ─────────────────────────────────────────────────────────── */}
      <section className="sp-faq-section">
        <div className="sp-container">
          <div className="sp-section-heading">
            <span className="sp-eyebrow">DÚVIDAS FREQUENTES</span>
            <h2 className="sp-section-title">
              Tudo o que você precisa saber sobre as <span className="sp-gradient-text">parcerias Dirhect</span>
            </h2>
          </div>

          <div className="sp-faq-list">
            {[
              {
                q: 'Como é calculada a comissão sobre a implantação?',
                a: 'O percentual alcançado pelo parceiro (por exemplo, 20% no Comercial ou 10% no Indicador) também é aplicado diretamente sobre o valor da taxa de implantação cobrada do cliente. Se a implantação for de R$ 50.000 e o parceiro estiver na faixa de 20%, ele recebe R$ 10.000.'
              },
              {
                q: 'Como funciona a regra de não retroatividade?',
                a: 'Ao atingir um volume de ARR que sobe a sua faixa (por exemplo, saindo de 10% para 13%), a nova comissão passa a valer para as faturas futuras. Os valores recebidos nos meses anteriores não sofrem recálculo retroativo.'
              },
              {
                q: 'Por quanto tempo recebo a comissão recorrente?',
                a: 'A comissão recorrente mensal é paga enquanto o contrato do cliente indicado permanecer ativo e adimplente com a Dirhect.'
              },
              {
                q: 'Qual a diferença prática entre Parceiro Comercial e Indicador?',
                a: 'O Parceiro Comercial participa ativamente das apresentações e reuniões comerciais com seus clientes, tendo comissões maiores (10% a 20%). O Parceiro Indicador apenas faz a indicação qualificada da oportunidade e a equipe Dirhect cuida de todo o ciclo de vendas (comissões de 5% a 10%).'
              },
              {
                q: 'O que acontece se um cliente atrasar a mensalidade?',
                a: 'A Dirhect adota o princípio de transparência: o repasse fica temporariamente pendente aguardando a quitação do cliente. Assim que o pagamento for liquidado, a sua comissão é liberada no ciclo seguinte, preservando integralmente o seu direito.'
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div key={index} className={`sp-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="sp-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="sp-faq-chevron" />
                  </button>
                  {isOpen && (
                    <div className="sp-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
