import { useState, useRef, useEffect } from 'react'
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  User,
  Building,
  Calendar,
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react'
import Button from './Button'
import Input from './Input'
import PhoneInput from './PhoneInput'
import './CTA.css'

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)

  const benefits = [
    'Demonstração gratuita personalizada',
    'Consultoria especializada em RH',
    'Implementação sem custo adicional',
    'Suporte técnico 24/7'
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const isFormValid = formData.name && formData.email && formData.company

  if (isSubmitted) {
    return (
      <section className="cta-section cta-section--success">
        <div className="cta-container">
          <div className="cta-success">
            <div className="cta-success-icon">
              <CheckCircle size={64} />
            </div>
            <h2 className="cta-success-title">Obrigado pelo seu interesse!</h2>
            <p className="cta-success-message">
              Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração personalizada.
            </p>
            <div className="cta-success-benefits">
              <div className="success-benefit">
                <Calendar size={20} />
                <span>Demonstração agendada em até 24h</span>
              </div>
              <div className="success-benefit">
                <User size={20} />
                <span>Consultor especializado dedicado</span>
              </div>
              <div className="success-benefit">
                <Zap size={20} />
                <span>Proposta personalizada inclusa</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className={`cta-section ${isVisible ? 'cta-section--visible' : ''}`}>
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-header">
            <div className="cta-badge">
              <Sparkles size={16} />
              <span>Transforme seu RH hoje</span>
            </div>
            
            <h2 className="cta-title">
              Pronto para <span className="gradient-text">revolucionar</span> 
              <br />seu departamento de RH?
            </h2>
            
            <p className="cta-subtitle">
              Agende uma demonstração gratuita e veja como nossa plataforma pode 
              automatizar 90% dos seus processos em apenas 30 dias.
            </p>

            <div className="cta-benefits">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="cta-benefit"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <CheckCircle size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-form-container">
            <div className="cta-form-card">
              <div className="cta-form-header">
                <h3>Agende sua demonstração</h3>
                <p>Preencha os dados e nossa equipe entrará em contato</p>
              </div>

              <form className="cta-form" onSubmit={handleSubmit}>
                <div className="cta-form-grid">
                  <Input
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    icon={<User size={20} />}
                    required
                  />
                  
                  <Input
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<Mail size={20} />}
                    required
                  />
                  
                  <Input
                    name="company"
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={handleInputChange}
                    icon={<Building size={20} />}
                    required
                  />
                  
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    icon={<Phone size={20} />}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid}
                  loading={isSubmitting}
                  className="cta-submit-button"
                  icon={<ArrowRight size={20} />}
                >
                  {isSubmitting ? 'Enviando...' : 'Agendar demonstração gratuita'}
                </Button>

                <p className="cta-form-disclaimer">
                  Ao enviar, você concorda com nossos termos de uso e política de privacidade. 
                  Seus dados estão seguros conosco.
                </p>
              </form>
            </div>

            <div className="cta-decorative-elements">
              <div className="floating-shape floating-shape--1"></div>
              <div className="floating-shape floating-shape--2"></div>
              <div className="floating-shape floating-shape--3"></div>
            </div>
          </div>
        </div>

        <div className="cta-background-pattern"></div>
      </div>
    </section>
  )
}

export default CTA 