import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import './Header.css'

const Header = () => {
  const location = useLocation()

  const handleAnchorClick = (anchor) => {
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

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img width={140} src="/images/logo_dirhect_rgb_16317_horizontal.png" alt="Dirhect Logo" />
        </Link>
        
        <nav className="nav">
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
            <li><Link to="/roadmap">Roadmap</Link></li>
            <li><Link to="/blog">Blog</Link></li>
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
          
          <Link to="/demo" className="cta-button">
            Demonstração
          </Link>
        </nav>
        
        <button className="mobile-menu-button">
          <Menu size={24} />
        </button>
      </div>
    </header>
  )
}

export default Header 