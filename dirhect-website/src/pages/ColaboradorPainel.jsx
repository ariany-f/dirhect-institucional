import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import { LogOut, User } from 'lucide-react'
import './ColaboradorPainel.css'

const ColaboradorPainel = () => {
  const navigate = useNavigate()
  const user = wordpressService.getCollaboratorUser()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!wordpressService.isCollaboratorAuthenticated()) {
      navigate('/area-colaborador', { replace: true })
    }
  }, [navigate])

  const handleLogout = () => {
    wordpressService.collaboratorLogout()
    navigate('/area-colaborador', { replace: true })
  }

  if (!user) {
    return null
  }

  return (
    <div className="colab-painel-page">
      <Header />
      <main className="colab-painel-main">
        <div className="colab-painel-card">
          <div className="colab-painel-user">
            <User size={36} strokeWidth={1.5} className="colab-painel-avatar" />
            <div>
              <h1>Olá, {user.name}</h1>
              <p className="colab-painel-email">{user.email}</p>
            </div>
          </div>
          <p className="colab-painel-text">
            Você está autenticado na área do colaborador. Em breve você poderá acessar aqui as ferramentas e formulários
            disponíveis para o seu perfil.
          </p>
          <div className="colab-painel-actions">
            <button type="button" className="colab-painel-logout" onClick={handleLogout}>
              <LogOut size={18} />
              Sair
            </button>
            <Link to="/" className="colab-painel-home">
              Ir ao site
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ColaboradorPainel
