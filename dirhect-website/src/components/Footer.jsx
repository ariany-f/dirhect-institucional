import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img width={50} src="/images/logo.png" alt="Dirhect" className="logo-image" />
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
              <li><a href="#solucoes">Automação de Elegibilidade</a></li>
              <li><a href="#solucoes">ATS Completo</a></li>
              <li><a href="#solucoes">Admissão Digital</a></li>
              <li><a href="#solucoes">Gestão de Benefícios</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Empresa</h4>
            <ul className="footer-links">
              <li><Link to="/">Sobre Nós</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="#contato">Contato</a></li>
              <li><a href="#">Carreiras</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>contato@dirhect.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>(11) 9999-9999</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; 2024 Dirhect. Todos os direitos reservados.</p>
            <div className="footer-legal">
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 