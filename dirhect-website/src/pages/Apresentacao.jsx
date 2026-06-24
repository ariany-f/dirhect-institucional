import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FileText, Download, ExternalLink } from 'lucide-react'
import './Apresentacao.css'

const Apresentacao = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
            {isMobile ? (
              <div className="apresentacao-mobile-fallback">
                <div className="pdf-preview-card">
                  <div className="pdf-preview-icon-wrapper">
                    <FileText size={48} className="pdf-preview-icon" />
                  </div>
                  <div className="pdf-preview-info">
                    <h3>Visualização em Dispositivos Móveis</h3>
                    <p>
                      Para uma melhor experiência de leitura no celular, abra a apresentação em tela cheia ou faça o download do arquivo.
                    </p>
                  </div>
                  <div className="pdf-preview-actions">
                    <a 
                      href="/apresentacao-dirhect-empresas.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="apresentacao-btn apresentacao-btn--primary w-full"
                    >
                      <ExternalLink size={18} />
                      Visualizar Apresentação
                    </a>
                    <a 
                      href="/apresentacao-dirhect-empresas.pdf" 
                      download="Apresentação Dirhect - Empresas.pdf"
                      className="apresentacao-btn apresentacao-btn--secondary w-full"
                    >
                      <Download size={18} />
                      Baixar PDF
                    </a>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Apresentacao
