import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Building2, Users, Mail, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import './Demo.css'

const Demo = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeContato: '',
    email: '',
    telefone: '',
    cargo: '',
    numeroFuncionarios: '',
    segmento: '',
    cnpj: '',
    necessidades: [],
    mensagem: '',
    aceiteTermos: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Função para aplicar máscara de CNPJ
  const formatCNPJ = (value) => {
    // Remove tudo que não é número
    const cleanValue = value.replace(/\D/g, '')
    
    // Aplica a máscara: XX.XXX.XXX/XXXX-XX
    if (cleanValue.length <= 2) {
      return cleanValue
    } else if (cleanValue.length <= 5) {
      return cleanValue.replace(/(\d{2})(\d{0,3})/, '$1.$2')
    } else if (cleanValue.length <= 8) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3')
    } else if (cleanValue.length <= 12) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4')
    } else {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5')
    }
  }

  // Capturar CNPJ da URL quando o componente carregar
  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0)

    // Capturar CNPJ da URL
    const urlParams = new URLSearchParams(window.location.search)
    const cnpjFromUrl = urlParams.get('cnpj')
    
    if (cnpjFromUrl) {
      // Formatar o CNPJ e preencher o campo
      const formattedCNPJ = formatCNPJ(cnpjFromUrl)
      setFormData(prev => ({
        ...prev,
        cnpj: formattedCNPJ
      }))
    }
  }, [])

  const necessidadesOptions = [
    'Admissão Digital',
    'Gestão de Benefícios e Elegibilidade',
    'Relatórios e Analytics',
    'Integração com Sistemas Existentes'
  ]

  const segmentosOptions = [
    'Tecnologia',
    'Varejo',
    'Indústria',
    'Serviços',
    'Saúde',
    'Educação',
    'Financeiro',
    'Outros'
  ]

  const funcionariosOptions = [
    '1-10 funcionários',
    '11-50 funcionários',
    '51-200 funcionários',
    '201-500 funcionários',
    '501-1000 funcionários',
    'Mais de 1000 funcionários'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    // Aplicar formatação especial para CNPJ
    if (name === 'cnpj') {
      const formattedValue = formatCNPJ(value)
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleNecessidadeChange = (necessidade) => {
    setFormData(prev => ({
      ...prev,
      necessidades: prev.necessidades.includes(necessidade)
        ? prev.necessidades.filter(n => n !== necessidade)
        : [...prev.necessidades, necessidade]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
    }, 2000)
  }

  if (submitSuccess) {
    return (
      <div>
        <Header />
        <div className="demo-success">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">
                <CheckCircle2 size={80} />
              </div>
              <h1>Solicitação Enviada com Sucesso!</h1>
              <p>
                Obrigado pelo seu interesse na Dirhect. Nossa equipe entrará em contato 
                em até 24 horas para agendar sua demonstração personalizada.
              </p>
              <div className="success-info">
                <div className="info-item">
                  <Calendar size={20} />
                  <span>Demonstração em até 24h</span>
                </div>
                <div className="info-item">
                  <Users size={20} />
                  <span>Consultoria especializada</span>
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
    )
  }

  return (
    <div>
      <Header />
      <section className="demo-hero">
        <div className="container">
          <div className="demo-header">
            <h1>Solicite uma <span className="gradient-text">Demonstração</span></h1>
            <p>
              Veja como a Dirhect pode revolucionar a gestão de RH da sua empresa. 
              Agende uma demonstração personalizada e gratuita.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-form-section">
        <div className="container">
          <div className="demo-content">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="demo-form">
                <div className="form-section">
                  <h3>Informações da Empresa</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome da Empresa *</label>
                      <div className="input-wrapper">
                        <Building2 size={20} />
                        <input
                          type="text"
                          name="nomeEmpresa"
                          value={formData.nomeEmpresa}
                          onChange={handleInputChange}
                          placeholder="Digite o nome da sua empresa"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>CNPJ *</label>
                      <div className="input-wrapper">
                        <Building2 size={20} />
                        <input
                          type="text"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                          placeholder="XX.XXX.XXX/XXXX-XX"
                          maxLength="18"
                          inputMode="numeric"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Segmento *</label>
                      <div className="input-wrapper">
                        <MapPin size={20} />
                        <select
                          name="segmento"
                          value={formData.segmento}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione o segmento</option>
                          {segmentosOptions.map(segmento => (
                            <option key={segmento} value={segmento}>{segmento}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group form-group-full">
                      <label>Número de Funcionários *</label>
                      <div className="input-wrapper">
                        <Users size={20} />
                        <select
                          name="numeroFuncionarios"
                          value={formData.numeroFuncionarios}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione a quantidade</option>
                          {funcionariosOptions.map(opcao => (
                            <option key={opcao} value={opcao}>{opcao}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Dados do Contato</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome Completo *</label>
                      <div className="input-wrapper">
                        <Users size={20} />
                        <input
                          type="text"
                          name="nomeContato"
                          value={formData.nomeContato}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cargo/Função *</label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                        placeholder="Ex: Gerente de RH"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>E-mail Corporativo *</label>
                      <div className="input-wrapper">
                        <Mail size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu.email@empresa.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Telefone *</label>
                      <div className="input-wrapper">
                        <Phone size={20} />
                        <input
                          type="tel"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          placeholder="(11) 99999-9999"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Necessidades e Interesse</h3>
                  <div className="form-group">
                    <label>Soluções de Interesse (selecione todas que se aplicam)</label>
                    <div className="checkbox-grid">
                      {necessidadesOptions.map(necessidade => (
                        <label key={necessidade} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={formData.necessidades.includes(necessidade)}
                            onChange={() => handleNecessidadeChange(necessidade)}
                          />
                          <span className="checkmark"></span>
                          {necessidade}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mensagem Adicional</label>
                    <textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      placeholder="Conte-nos mais sobre suas necessidades e desafios atuais..."
                      rows="4"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="checkbox-item terms-checkbox">
                    <input
                      type="checkbox"
                      name="aceiteTermos"
                      checked={formData.aceiteTermos}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    <div className="terms-text">
                      Aceito os termos e condições: *
                      <div className="terms-links">
                        <a href="/termos-uso" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
                        <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
                      </div>
                    </div>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Demonstração'}
                </button>
              </form>
            </div>

            <div className="demo-benefits">
              <h3>O que você terá na demonstração:</h3>
              <div className="benefits-list">
                <div className="demo-benefit-item">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Análise Personalizada</h4>
                    <p>Avaliação específica das necessidades da sua empresa</p>
                  </div>
                </div>
                <div className="demo-benefit-item">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Demo Ao Vivo</h4>
                    <p>Apresentação completa das funcionalidades da plataforma</p>
                  </div>
                </div>
                <div className="demo-benefit-item">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Proposta Customizada</h4>
                    <p>Plano sob medida para o seu negócio</p>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h4>Ou entre em contato diretamente:</h4>
                <div className="contact-methods">
                  <div className="contact-method">
                    <Phone size={20} />
                    <span>(11) 9999-9999</span>
                  </div>
                  <div className="contact-method">
                    <Mail size={20} />
                    <span>demo@dirhect.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Demo 