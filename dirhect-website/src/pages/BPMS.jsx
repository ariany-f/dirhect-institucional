import { useEffect } from 'react'
import Header from '../components/Header'
import HomeBpmFold from '../components/HomeBpmFold'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const BPMS = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const bpmsSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Dirhect BPMS - Automação de Processos de RH',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web, Cloud',
    'description': 'Plataforma para desenho, modelagem e execução de processos automatizados e workflows de Recursos Humanos integrada a ERPs.',
    'url': 'https://dirhect.com.br/bpms',
    'provider': {
      '@type': 'Organization',
      'name': 'Dirhect',
      'url': 'https://dirhect.com.br'
    }
  }

  return (
    <div className="bpms-page" style={{ paddingTop: '80px' }}>
      <SEO
        title="Automação de Processos de RH e BPMS | Dirhect"
        description="Desenhe, automatize e monitore fluxos e processos de Recursos Humanos com a flexibilidade do BPMS Dirhect integrado aos seus sistemas."
        canonical="https://dirhect.com.br/bpms"
        schema={bpmsSchema}
      />
      <Header />
      <HomeBpmFold isStandalone={true} />
      <Footer />
    </div>
  )
}

export default BPMS
