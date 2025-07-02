import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevenir scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup ao desmontar
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleAnchorClick = (anchor) => {
    // Fechar menu mobile
    setIsMobileMenuOpen(false)
    
    // Se já estamos na home, rola para a seção
    if (location.pathname === '/') {
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // Se não estamos na home, navega para home com âncora
    else {
      window.location.href = `/${anchor}`
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img width={140} src="/images/logo_dirhect_rgb_16317_horizontal.png" alt="Dirhect Logo" />
        </Link>
        
        <nav className={`nav ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          {/* Logo no menu mobile */}
          <div className="mobile-menu-logo">
            <img width={160} src="/images/logo_dirhect_rgb_16317_horizontal.png" alt="Dirhect Logo" />
          </div>
          
          <ul className="nav-links">
            <li>
              <a 
                href="/#inicio" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#inicio')
                }}
              >
                Início
              </a>
            </li>
            <li>
              <a 
                href="/#solucoes" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#solucoes')
                }}
              >
                Soluções
              </a>
            </li>
            <li>
              <a 
                href="/#sobre" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#sobre')
                }}
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="/#contato" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#contato')
                }}
              >
                Contato
              </a>
            </li>
          </ul>
          
          <Link 
            to="/demo" 
            className="cta-button"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Demonstração
          </Link>
        </nav>
        
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header 