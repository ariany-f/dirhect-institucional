import { Link } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'
import './ParceriaHeader.css'

export default function ParceriaHeader({ currentPartner = null }) {
  return (
    <header className="parceria-header">
      <div className="parceria-header-container">
        <div className="parceria-header-left">
          <Link to="/" className="parceria-header-logo-link" title="Ir para o site Dirhect">
            <img
              src="/images/dirhect_color.svg"
              alt="Dirhect"
              className="parceria-header-logo-img"
              width="140"
              height="38"
            />
          </Link>
          <span className="parceria-header-divider" aria-hidden="true" />
          <Link to="/parceria" className="parceria-header-badge" title="Diretório de Parceiros">
            <Users size={14} className="parceria-header-badge-icon" />
            <span>Portal de Parceiros</span>
          </Link>
        </div>

        <div className="parceria-header-right">
          {currentPartner ? (
            <Link to="/parceria" className="parceria-header-back-link">
              <ArrowLeft size={16} />
              <span>Todos os parceiros</span>
            </Link>
          ) : (
            <Link to="/" className="parceria-header-back-link">
              <ArrowLeft size={16} />
              <span>Voltar ao site Dirhect</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
