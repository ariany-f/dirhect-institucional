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
              <a href="https://www.linkedin.com/company/dirhect" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn da Dirhect">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/dirhect" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram da Dirhect">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Soluções</h4>
            <ul className="footer-links">
              <li><Link to="/portal-rh">Portal de RH</Link></li>
              <li><Link to="/gestao-tarefas">Gestão de Tarefas</Link></li>
              <li><Link to="/gestao-beneficios">Gestão de Benefícios</Link></li>
              <li><Link to="/admissao-digital">Admissão Digital</Link></li>
              <li><Link to="/integracoes">Integrações e ecossistema</Link></li>
              <li><Link to="/apresentacao">Apresentação</Link></li>
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
                <a href="mailto:contato@dirhect.com.br" style={{ color: 'inherit', textDecoration: 'none' }}>contato@dirhect.com.br</a>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <a href="tel:+5511968989211" style={{ color: 'inherit', textDecoration: 'none' }}>(11) 96898-9211</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Dirhect. Todos os direitos reservados.</p>
            <div className="footer-legal">
              <Link to="/admin" rel="nofollow">Área Privada</Link>
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