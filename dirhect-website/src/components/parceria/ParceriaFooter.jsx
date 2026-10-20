import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import './ParceriaFooter.css'

export default function ParceriaFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="parceria-footer">
      <div className="parceria-footer-container">
        <div className="parceria-footer-top">
          <div className="parceria-footer-brand">
            <img
              src="/images/dirhect_color.svg"
              alt="Dirhect"
              className="parceria-footer-logo"
              width="130"
              height="34"
            />
            <p className="parceria-footer-desc">
              Portal Oficial de Parceiros Comerciais e Homologados Dirhect. Soluções inteligentes de automação e integração para Recursos Humanos.
            </p>
          </div>

          <div className="parceria-footer-badges">
            <div className="parceria-footer-security">
              <ShieldCheck size={18} className="parceria-footer-shield-icon" />
              <span>Ambiente Seguro & Conforme LGPD</span>
            </div>
          </div>
        </div>

        <div className="parceria-footer-bottom">
          <div className="parceria-footer-copy">
            © {currentYear} Dirhect Tecnologia. Todos os direitos reservados.
          </div>
          <div className="parceria-footer-links">
            <Link to="/politica-privacidade">Política de Privacidade</Link>
            <span className="parceria-footer-dot">•</span>
            <Link to="/termos-uso">Termos de Uso</Link>
            <span className="parceria-footer-dot">•</span>
            <Link to="/parceria">Diretório de Parceiros</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
