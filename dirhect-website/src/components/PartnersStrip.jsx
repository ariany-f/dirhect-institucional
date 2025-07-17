import { useNavigate } from 'react-router-dom'
import './PartnersStrip.css'

const PartnersStrip = () => {
  const navigate = useNavigate()

  const partners = [
    { name: 'SAP', logo: '/images/logos/sap-logo-white.png' },
    { name: 'TOTVS', logo: '/images/logos/totvs-logo-white.png' },
    { name: 'Closecare', logo: '/images/logos/closecare-logo-white.png' },
    { name: 'LG Sistemas', logo: '/images/logos/lgsistemas-logo-white.png' },
    { name: 'Gupy', logo: '/images/logos/gupy-logo-white.png' },
    { name: 'Nexti RH Inteligente', logo: '/images/logos/nexti-logo-white.png' }
  ]

  // Duplicar os parceiros para criar o efeito infinito
  const duplicatedPartners = [...partners, ...partners]

  const handleClick = () => {
    navigate('/parceiros')
  }

  return (
    <section className="partners-strip" onClick={handleClick}>
      <div className="partners-strip-container">
        <div className="partners-strip-content">
          {duplicatedPartners.map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="partner-logo-item">
              <img 
                src={partner.logo} 
                alt={`${partner.name} Logo`}
                className="partners-strip-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersStrip 