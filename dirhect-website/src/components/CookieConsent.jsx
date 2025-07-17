import { useState, useEffect } from 'react'
import { X, Cookie, Shield } from 'lucide-react'
import './CookieConsent.css'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      // Mostrar o aviso após 2 segundos para não atrapalhar a navegação inicial
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowConsent(false)
  }

  const handleClose = () => {
    setShowConsent(false)
  }

  if (!showConsent) return null

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
            className="cookie-btn cookie-btn-decline" 
            onClick={handleDecline}
          >
            Recusar
          </button>
          <button 
            className="cookie-btn cookie-btn-accept" 
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