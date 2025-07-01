import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img width={140} src="/images/logo_dirhect_rgb_16317_horizontal.png" alt="Dirhect Logo" />
        </Link>
        
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#solucoes">Soluções</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
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