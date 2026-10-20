import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import ParceriaFooter from '../../components/parceria/ParceriaFooter'
import PartnerContactForm from '../../components/parceria/PartnerContactForm'
import { getPartnerBySlug } from '../../data/partnersData'
import { MapPin, Globe, ExternalLink, ArrowLeft, ShieldAlert } from 'lucide-react'
import './ParceiroProfile.css'

export default function ParceiroProfile({ forcedSlug }) {
  const { slug: paramSlug } = useParams()
  const slug = forcedSlug || paramSlug || 'ativary'
  const [partner, setPartner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLogoError(false)
    setLoading(true)

    const found = getPartnerBySlug(slug)
    setPartner(found || null)
    setLoading(false)
  }, [slug])

  // Fallback para monograma de logo
  const getInitials = (name) => {
    if (!name) return 'DH'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  // 404 Personalizada no estilo dark Dirhect se parceiro não existir
  if (!loading && !partner) {
    return (
      <div className="parceiro-profile-page">
        <SEO
          title="Parceiro não encontrado | Dirhect"
          description="A página da empresa parceira solicitada não foi encontrada no Portal de Parceiros Dirhect."
        />

        <div className="parceiro-not-found-container">
          <div className="parceiro-not-found-card">
            <div className="parceiro-not-found-icon-wrap">
              <ShieldAlert size={48} className="parceiro-not-found-icon" />
            </div>
            <span className="parceiro-not-found-badge">Erro 404</span>
            <h1 className="parceiro-not-found-title">Parceiro não encontrado</h1>
            <p className="parceiro-not-found-desc">
              Não localizamos nenhuma empresa parceira ativa associada ao endereço <strong>/parceria/{slug}</strong>.
            </p>
            <Link to="/parceria" className="parceiro-not-found-btn">
              <ArrowLeft size={18} />
              <span>Voltar ao Diretório de Parceiros</span>
            </Link>
          </div>
        </div>

        <ParceriaFooter />
      </div>
    )
  }

  if (loading || !partner) {
    return (
      <div className="parceiro-profile-page">
        <div className="parceiro-profile-loading">
          <div className="parceiro-profile-spinner" />
          <p>Carregando informações do parceiro...</p>
        </div>
        <ParceriaFooter />
      </div>
    )
  }

  const locationFull = [partner.city, partner.state, partner.country].filter(Boolean).join(', ')
  const cleanWebsiteLabel = partner.website ? partner.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : ''

  // Formata a descrição completa em múltiplos parágrafos
  const descriptionParagraphs = (partner.fullDescription || partner.shortDescription || '')
    .split('\n\n')
    .filter((p) => p.trim() !== '')

  return (
    <div className="parceiro-profile-page">
      <SEO
        title={`${partner.name} | Parceiro Autorizado Dirhect`}
        description={partner.shortDescription}
        canonical={`https://dirhect.com.br/parceria/${partner.slug}`}
      />

      {/* Topo Visual de Destaque como plano de fundo */}
      <div className="parceiro-hero-backdrop">
        <div className="parceiro-hero-glow" aria-hidden="true" />
        <div className="parceiro-hero-dots" aria-hidden="true" />
        <div className="parceiro-backdrop-nav">
          <Link to="/parceria" className="parceiro-back-link">
            <ArrowLeft size={16} />
            <span>Todos os parceiros</span>
          </Link>
        </div>
      </div>

      {/* Container Principal com Layout de Duas Colunas (67% / 33%) Sobreposto */}
      <main className="parceiro-profile-main">
        <div className="parceiro-profile-container">
          {/* Coluna Esquerda: Informações da Empresa (~67%) */}
          <div className="parceiro-left-column">
            {/* Card Principal da Empresa */}
            <article className="parceiro-main-card">
              <div className="parceiro-main-card-header">
                {/* Logotipo quadrado 170x170 */}
                <div className="parceiro-main-logo-box">
                  {!logoError && partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`Logotipo oficial ${partner.name}`}
                      className="parceiro-main-logo-img"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="parceiro-main-logo-fallback">
                      {getInitials(partner.name)}
                    </div>
                  )}
                </div>

                {/* Informações Principais */}
                <div className="parceiro-main-info">
                  <h1 className="parceiro-main-name">{partner.name}</h1>
                  <p className="parceiro-main-short-desc">{partner.shortDescription}</p>

                  <div className="parceiro-main-meta-row">
                    {locationFull && (
                      <div className="parceiro-meta-item">
                        <MapPin size={16} className="parceiro-meta-icon" aria-hidden="true" />
                        <span>{locationFull}</span>
                      </div>
                    )}

                    {partner.website && (
                      <div className="parceiro-meta-item parceiro-meta-item--link">
                        <Globe size={16} className="parceiro-meta-icon parceiro-meta-icon--orange" aria-hidden="true" />
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="parceiro-website-link"
                          title={`Visitar site oficial de ${partner.name}`}
                        >
                          <span>{cleanWebsiteLabel}</span>
                          <ExternalLink size={13} className="parceiro-external-icon" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Divisória Horizontal Fina */}
              <div className="parceiro-main-divider" />

              {/* Seção Áreas de Atuação */}
              <div className="parceiro-areas-section">
                <span className="parceiro-areas-title">ÁREAS DE ATUAÇÃO</span>
                <div className="parceiro-tags-wrapper">
                  {/* Etiquetas Laranja: Áreas Principais */}
                  {(partner.primaryAreas || []).map((area) => (
                    <span key={area} className="parceiro-tag parceiro-tag--primary">
                      {area}
                    </span>
                  ))}

                  {/* Etiquetas Grafite/Azul-acinzentado: Áreas Secundárias */}
                  {(partner.secondaryAreas || []).map((area) => (
                    <span key={area} className="parceiro-tag parceiro-tag--secondary">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Seção Sobre a Empresa (Card Independente abaixo do Card Principal) */}
            <section className="parceiro-about-section">
              <h2 className="parceiro-about-title">Sobre a Empresa</h2>
              <div className="parceiro-about-card">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="parceiro-about-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* Coluna Direita: Formulário de Contato Sticky (~33%) */}
          <aside className="parceiro-right-column">
            <PartnerContactForm partner={partner} />
          </aside>
        </div>
      </main>

      {/* Rodapé independente */}
      <ParceriaFooter />
    </div>
  )
}
