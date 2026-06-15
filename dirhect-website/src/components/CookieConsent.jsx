import { useState, useEffect } from 'react'
import { X, Cookie, Shield } from 'lucide-react'
import './CookieConsent.css'

const CookieConsent = () => {
  return null // Deactivated to prevent overlaying the BPMS page content and captures
  
  const [showConsent, setShowConsent] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)
  const [userChoice, setUserChoice] = useState(null)

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('cookieConsent')
    if (consent) {
      setHasConsented(true)
      setUserChoice(consent)
    } else {
      // Mostrar o aviso após 2 segundos para não atrapalhar a navegação inicial
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setHasConsented(true)
    setUserChoice('accepted')
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setHasConsented(true)
    setUserChoice('declined')
    setShowConsent(false)
  }

  const handleClose = () => {
    setShowConsent(false)
  }

  const handleReopen = () => {
    setShowConsent(true)
  }

  // Se não tem consentimento e não está mostrando o aviso, não renderiza nada
  if (!hasConsented && !showConsent) return null

  // Se tem consentimento, mostra apenas o ícone de cookies
  if (hasConsented && !showConsent) {
    return (
      <button 
        className="cookie-icon-btn" 
        onClick={handleReopen}
        aria-label="Gerenciar preferências de cookies"
      >
        <Cookie size={20} />
      </button>
    )
  }

  // Se está mostrando o aviso de consentimento
  return (
    <div className="cookie-consent">
      <div className="cookie-consent-content">
        <div className="cookie-consent-icon">
          <Cookie size={20} />
        </div>
        
        <div className="cookie-consent-text">
          <p>
            Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. 
            Ao continuar navegando, você concorda com nossa{' '}
            <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>.
          </p>
        </div>

        <div className="cookie-consent-actions">
          <button 
            className={`cookie-btn cookie-btn-decline ${userChoice === 'declined' ? 'selected' : ''}`}
            onClick={handleDecline}
          >
            Recusar
          </button>
          <button 
            className={`cookie-btn cookie-btn-accept ${userChoice === 'accepted' ? 'selected' : ''}`}
            onClick={handleAccept}
          >
            Aceitar
          </button>
        </div>

        <button 
          className="cookie-close-btn" 
          onClick={handleClose}
          aria-label="Fechar aviso de cookies"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default CookieConsent 