import React, { useState, useEffect } from 'react'
import { ChevronUp, MessageCircle, X, Send } from 'lucide-react'
import './FloatingButtons.css'

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showSupportForm, setShowSupportForm] = useState(false)
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSupportSubmit = (e) => {
    e.preventDefault()
    // Simula envio do formulário
    console.log('Formulário de suporte enviado:', supportForm)
    setSupportForm({ name: '', email: '', subject: '', message: '' })
    setShowSupportForm(false)
    alert('Sua mensagem foi enviada! Nossa equipe entrará em contato em breve.')
  }

  const handleInputChange = (e) => {
    setSupportForm({
      ...supportForm,
      [e.target.name]: e.target.value
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    // Controla visibilidade do botão "voltar ao topo"
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Botões Flutuantes */}
      {showBackToTop && (
        <button className="back-to-top-btn" onClick={scrollToTop}>
          <ChevronUp size={20} />
        </button>
      )}

      <button 
        className="support-float-btn"
        onClick={() => setShowSupportForm(true)}
      >
        <MessageCircle size={20} />
      </button>

      {/* Modal de Suporte */}
      {showSupportForm && (
        <div className="support-modal-overlay" onClick={() => setShowSupportForm(false)}>
          <div className="support-modal" onClick={(e) => e.stopPropagation()}>
            <div className="support-modal-header">
              <h3>Falar com Suporte</h3>
              <button 
                className="support-modal-close"
                onClick={() => setShowSupportForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form className="support-form" onSubmit={handleSupportSubmit}>
              <div className="support-form-group">
                <label htmlFor="name">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={supportForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="support-form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={supportForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="support-form-group">
                <label htmlFor="subject">Assunto *</label>
                <select
                  id="subject"
                  name="subject"
                  value={supportForm.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida sobre funcionalidade</option>
                  <option value="problema">Problema técnico</option>
                  <option value="sugestao">Sugestão de melhoria</option>
                  <option value="comercial">Questão comercial</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="support-form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={supportForm.message}
                  onChange={handleInputChange}
                  placeholder="Descreva sua dúvida ou problema..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="support-submit-btn">
                <Send size={16} />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingButtons 