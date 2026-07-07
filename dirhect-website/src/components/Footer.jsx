import { Mail, Phone, Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/dirhect_color_invert.svg" alt="Dirhect" className="logo-image" />
              <p>Revolucionando a gestão de RH com tecnologia inteligente e automação avançada.</p>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Soluções</h4>
            <ul className="footer-links">
              <li><a href="#solucoes">Portal de RH</a></li>
              <li><a href="#solucoes">Gestão de Tarefas</a></li>
              <li><a href="#solucoes">Gestão de Benefícios</a></li>
              <li><a href="#solucoes">Admissão Digital</a></li>
              <li><Link to="/ecossistema">Integrações e ecossistema</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Empresa</h4>
            <ul className="footer-links">
              <li><Link to="/">Sobre Nós</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/parceiro">Programa de parceiros</Link></li>
              <li><a href="#contato">Contato</a></li>
              <li><Link to="/docs">Documentação</Link></li>
              <li><Link to="/roadmap">Roadmap</Link></li>
              <li><Link to="/conhecimento">Banco de Conhecimento</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>contato@dirhect.com.br</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>(11) 96898-9211</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Dirhect. Todos os direitos reservados.</p>
            <div className="footer-legal">
              <Link to="/admin">Área Privada</Link>
              <Link to="/politica-privacidade">Política de Privacidade</Link>
              <Link to="/termos-uso">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 