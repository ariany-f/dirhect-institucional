import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          {/* 404 Animation */}
          <div className="error-animation">
            <div className="error-number">
              <span className="four">4</span>
              <div className="zero-container">
                <div className="zero">
                  <div className="zero-face">
                    <div className="zero-eyes">
                      <div className="eye left-eye"></div>
                      <div className="eye right-eye"></div>
                    </div>
                    <div className="zero-mouth"></div>
                  </div>
                </div>
              </div>
              <span className="four">4</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="error-message">
            <h1 className="error-title">Oops! Página não encontrada</h1>
            <p className="error-description">
              A página que você está procurando não existe ou foi movida para outro local.
              Que tal voltar para a página inicial?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={20} />
              Voltar ao Início
            </Link>
            <button onClick={() => window.history.back()} className="btn btn-secondary">
              <ArrowLeft size={20} />
              Página Anterior
            </button>
          </div>

          {/* Suggestions */}
          <div className="error-suggestions">
            <h3>Talvez você esteja procurando por:</h3>
            <div className="suggestions-grid">
              <Link to="/#solucoes" className="suggestion-card">
                <Search size={24} />
                <span>Nossas Soluções</span>
              </Link>
              <Link to="/#sobre" className="suggestion-card">
                <RefreshCw size={24} />
                <span>Sobre a Dirhect</span>
              </Link>
              <Link to="/blog" className="suggestion-card">
                <Search size={24} />
                <span>Blog</span>
              </Link>
              <Link to="/#contato" className="suggestion-card">
                <RefreshCw size={24} />
                <span>Contato</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound 