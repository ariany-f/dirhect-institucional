import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import { LogIn, UserPlus, AlertCircle } from 'lucide-react'
import './ColaboradorLogin.css'

const ColaboradorLogin = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (wordpressService.isCollaboratorAuthenticated()) {
      navigate('/area-colaborador/painel', { replace: true })
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const email = fd.get('email')?.toString().trim()
    const password = fd.get('password')?.toString() || ''
    setError(null)
    setLoading(true)
    try {
      await wordpressService.collaboratorLogin(email, password)
      navigate('/area-colaborador/painel', { replace: true })
    } catch (err) {
      setError(err.message || 'Não foi possível entrar')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const name = fd.get('name')?.toString().trim()
    const email = fd.get('email')?.toString().trim()
    const password = fd.get('password')?.toString() || ''
    setError(null)
    setLoading(true)
    try {
      await wordpressService.collaboratorRegister({
        name,
        email,
        password,
      })
      await wordpressService.collaboratorLogin(email, password)
      navigate('/area-colaborador/painel', { replace: true })
    } catch (err) {
      setError(err.message || 'Não foi possível cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="colab-login-page">
      <Header />
      <main className="colab-login-main">
        <div className="colab-login-card">
          <div className="colab-login-badge">
            {mode === 'login' ? (
              <LogIn size={28} strokeWidth={1.75} aria-hidden />
            ) : (
              <UserPlus size={28} strokeWidth={1.75} aria-hidden />
            )}
          </div>
          <h1 className="colab-login-title">Área do colaborador</h1>
          <p className="colab-login-subtitle">Faça login ou crie sua conta para acessar o ambiente exclusivo.</p>

          <div className="colab-login-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={mode === 'login' ? 'active' : ''}
              onClick={() => {
                setMode('login')
                setError(null)
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              className={mode === 'register' ? 'active' : ''}
              onClick={() => {
                setMode('register')
                setError(null)
              }}
            >
              Cadastrar
            </button>
          </div>

          {error && (
            <div className="colab-login-error" role="alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {mode === 'login' && (
            <>
              <form className="colab-login-form" onSubmit={handleLogin}>
                <div className="colab-login-field">
                  <label htmlFor="colab-email">E-mail</label>
                  <input
                    id="colab-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="colab-login-field">
                  <label htmlFor="colab-password">Senha</label>
                  <input
                    id="colab-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <button type="submit" className="colab-login-submit" disabled={loading}>
                  {loading ? 'Entrando…' : 'Entrar'}
                </button>
              </form>
              <p className="colab-login-switch">
                Não tem conta?{' '}
                <button
                  type="button"
                  className="colab-login-link-btn"
                  onClick={() => {
                    setMode('register')
                    setError(null)
                  }}
                >
                  Cadastre-se
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <form className="colab-login-form" onSubmit={handleRegister}>
                <div className="colab-login-field">
                  <label htmlFor="colab-reg-name">Nome completo</label>
                  <input id="colab-reg-name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="colab-login-field">
                  <label htmlFor="colab-reg-email">E-mail</label>
                  <input
                    id="colab-reg-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="colab-login-field">
                  <label htmlFor="colab-reg-password">Senha (mín. 8 caracteres)</label>
                  <input
                    id="colab-reg-password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <button type="submit" className="colab-login-submit" disabled={loading}>
                  {loading ? 'Criando conta…' : 'Criar conta e entrar'}
                </button>
              </form>
              <p className="colab-login-switch">
                Já tem conta?{' '}
                <button
                  type="button"
                  className="colab-login-link-btn"
                  onClick={() => {
                    setMode('login')
                    setError(null)
                  }}
                >
                  Fazer login
                </button>
              </p>
            </>
          )}

          <p className="colab-login-back">
            <Link to="/">← Voltar ao site</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ColaboradorLogin
