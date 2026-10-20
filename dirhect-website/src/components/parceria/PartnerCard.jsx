import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ChevronRight, CheckCircle2 } from 'lucide-react'
import './PartnerCard.css'

export default function PartnerCard({ partner }) {
  const [logoError, setLogoError] = useState(false)

  if (!partner) return null

  // Fallback monograma com iniciais caso o logo não carregue
  const getInitials = (name) => {
    if (!name) return 'DH'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const locationText = [partner.city, partner.state].filter(Boolean).join(', ')

  return (
    <Link
      to={`/parceria/${partner.slug}`}
      className="parceria-card"
      aria-label={`Ver perfil da empresa parceira ${partner.name}`}
    >
      <div className="parceria-card-header">
        <div className="parceria-card-logo-box">
          {!logoError && partner.logo ? (
            <img
              src={partner.logo}
              alt={`Logotipo ${partner.name}`}
              className="parceria-card-logo-img"
              loading="lazy"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="parceria-card-logo-fallback" aria-hidden="true">
              {getInitials(partner.name)}
            </div>
          )}
        </div>

        <div className="parceria-card-identity">
          <h3 className="parceria-card-name" title={partner.name}>
            {partner.name}
          </h3>
          {locationText && (
            <div className="parceria-card-location">
              <MapPin size={13} className="parceria-card-pin-icon" />
              <span>{locationText}</span>
            </div>
          )}
        </div>
      </div>

      <div className="parceria-card-body">
        <p className="parceria-card-description">
          {partner.shortDescription}
        </p>
      </div>

      <div className="parceria-card-footer">
        <span className="parceria-card-badge">
          <CheckCircle2 size={12} className="parceria-card-badge-check" />
          Parceiro Dirhect
        </span>

        <span className="parceria-card-cta" aria-hidden="true">
          <ChevronRight size={16} className="parceria-card-cta-icon" />
        </span>
      </div>
    </Link>
  )
}
