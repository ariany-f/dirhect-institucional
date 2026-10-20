import { useState, useMemo, useEffect } from 'react'
import SEO from '../../components/SEO'
import ParceriaHeader from '../../components/parceria/ParceriaHeader'
import ParceriaFooter from '../../components/parceria/ParceriaFooter'
import PartnerCard from '../../components/parceria/PartnerCard'
import { getActivePartners } from '../../data/partnersData'
import './ParceriaDirectory.css'

export default function ParceriaDirectory() {
  const [isLoading, setIsLoading] = useState(true)

  // Micro-carregamento suave inicial para transição limpa
  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 280)
    return () => clearTimeout(timer)
  }, [])

  const partners = useMemo(() => getActivePartners(), [])

  return (
    <div className="parceria-page-wrapper">
      <SEO
        title="Portal de Parceiros Dirhect | Empresas Autorizadas e Soluções Integradas"
        description="Conheça as empresas parceiras autorizadas da Dirhect. Conecte sua empresa a soluções completas em admissão digital, benefícios, workflows e integrações com sistemas de RH."
        canonical="https://dirhect.com.br/parceria"
      />

      {/* Header independente do portal (sem menu institucional) */}
      <ParceriaHeader />

      {/* Seção Superior — Hero com texto à esquerda e imagem de destaque alinhada à direita com 0 de margem */}
      <section className="parceria-hero">
        <div className="parceria-hero-glow" aria-hidden="true" />

        <div className="parceria-hero-container">
          <div className="parceria-hero-content">
            <h1 className="parceria-hero-title">
              Conheça nossos <span className="parceria-hero-title-highlight">parceiros</span>
            </h1>

            <p className="parceria-hero-subtitle">
              Empresas parceiras que conectam você às soluções da Dirhect.
            </p>

            <p className="parceria-hero-auxiliary">
              Encontre um parceiro e conheça como podemos transformar a gestão de RH da sua empresa.
            </p>
          </div>

          <div className="parceria-hero-image-wrap">
            <img
              src="/images/parceria-hero-laptop.png"
              alt="Plataforma Dirhect para Gestão de RH e Parceiros"
              className="parceria-hero-image"
            />
          </div>
        </div>
      </section>

      {/* Seção Principal — Grade de Empresas */}
      <main className="parceria-main">
        <div className="parceria-main-container">
          {/* Cabeçalho da seção de parceiros */}
          <div className="parceria-section-header">
            <div>
              <h2 className="parceria-section-title">Parceiros Homologados</h2>
              <p className="parceria-section-desc">
                Empresas oficiais capacitadas para conectar e implantar a tecnologia Dirhect
              </p>
            </div>
            {!isLoading && (
              <span className="parceria-section-badge">
                <strong>{partners.length}</strong> {partners.length === 1 ? 'parceiro autorizado' : 'parceiros autorizados'}
              </span>
            )}
          </div>

          {/* Grade de Cards das Empresas */}
          {isLoading ? (
            <div className="parceria-grid" aria-busy="true">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="parceria-skeleton-card">
                  <div className="parceria-skeleton-header">
                    <div className="parceria-skeleton-logo" />
                    <div className="parceria-skeleton-meta">
                      <div className="parceria-skeleton-line parceria-skeleton-line--title" />
                      <div className="parceria-skeleton-line parceria-skeleton-line--sub" />
                    </div>
                  </div>
                  <div className="parceria-skeleton-body">
                    <div className="parceria-skeleton-line" />
                    <div className="parceria-skeleton-line" />
                    <div className="parceria-skeleton-line parceria-skeleton-line--short" />
                  </div>
                  <div className="parceria-skeleton-footer">
                    <div className="parceria-skeleton-badge" />
                  </div>
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className="parceria-grid">
              {partners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : null}
        </div>
      </main>

      {/* Rodapé independente */}
      <ParceriaFooter />
    </div>
  )
}
