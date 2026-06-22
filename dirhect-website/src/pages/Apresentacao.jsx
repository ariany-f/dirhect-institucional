import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FileText, Download, ExternalLink } from 'lucide-react'
import './Apresentacao.css'

const Apresentacao = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="apresentacao-page">
      <Header />
      <main className="apresentacao-main">
        <div className="apresentacao-container">
          <div className="apresentacao-header">
            <div className="apresentacao-title-group">
              <FileText className="apresentacao-icon" size={28} />
              <div>
                <h1 className="apresentacao-title">Apresentação Dirhect</h1>
                <p className="apresentacao-subtitle">Soluções Corporativas para Empresas</p>
              </div>
            </div>
            <div className="apresentacao-actions">
              <a 
                href="/apresentacao-dirhect-empresas.pdf" 
                download="Apresentação Dirhect - Empresas.pdf"
                className="apresentacao-btn apresentacao-btn--primary"
              >
                <Download size={16} />
                Baixar PDF
              </a>
              <a 
                href="/apresentacao-dirhect-empresas.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="apresentacao-btn apresentacao-btn--secondary"
              >
                <ExternalLink size={16} />
                Abrir em nova guia
              </a>
            </div>
          </div>
          
          <div className="apresentacao-viewer-container">
            <object 
              data="/apresentacao-dirhect-empresas.pdf" 
              type="application/pdf" 
              width="100%" 
              height="100%"
              className="apresentacao-object-viewer"
            >
              <div className="apresentacao-fallback">
                <FileText size={48} className="fallback-icon" />
                <h3>Não foi possível carregar o visualizador</h3>
                <p>
                  O seu navegador não possui suporte nativo para visualizar PDFs diretamente ou está bloqueado.
                </p>
                <a 
                  href="/apresentacao-dirhect-empresas.pdf" 
                  download="Apresentação Dirhect - Empresas.pdf"
                  className="apresentacao-btn apresentacao-btn--primary"
                >
                  <Download size={18} />
                  Baixar e Visualizar Apresentação
                </a>
              </div>
            </object>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Apresentacao
