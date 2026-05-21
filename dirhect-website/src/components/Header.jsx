import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { wordpressService } from '../services/wordpressService'
import './Header.css?v=home-align-20260521'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [collaboratorAuth, setCollaboratorAuth] = useState(false)
  const [collaboratorUser, setCollaboratorUser] = useState(null)

  // Verificar autenticação ao carregar e periodicamente
  useEffect(() => {
    let isChecking = false // Flag para evitar verificações simultâneas
    
    const checkAuth = async () => {
      // Evitar verificações simultâneas
      if (isChecking) return
      isChecking = true
      
      try {
        const authenticated = wordpressService.isAuthenticated()
        
        if (authenticated) {
          // Verificar se o token ainda é válido fazendo uma chamada de teste
          const token = wordpressService.getCurrentToken()
          if (token) {
            // TEMPORARIAMENTE DESABILITADO - verificação automática do token
            // try {
            //   await wordpressService.verifyAdminToken(token)
            //   setIsAuthenticated(true)
            //   setUser(wordpressService.getCurrentUser())
            // } catch (error) {
            //   console.log('Token inválido, fazendo logout')
            //   wordpressService.adminLogout()
            //   setIsAuthenticated(false)
            //   setUser(null)
            // }
            
            // Por enquanto, apenas definir como autenticado se o token existe
            setIsAuthenticated(true)
            setUser(wordpressService.getCurrentUser())
          } else {
            setIsAuthenticated(false)
            setUser(null)
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        // Não fazer logout automático em caso de erro de rede
        // Apenas manter o estado atual
      } finally {
        isChecking = false
      }
    }

    const syncCollaborator = () => {
      const ok = wordpressService.isCollaboratorAuthenticated()
      setCollaboratorAuth(ok)
      setCollaboratorUser(ok ? wordpressService.getCollaboratorUser() : null)
    }
    
    // Verificar imediatamente
    checkAuth()
    syncCollaborator()
    
    // Verificar a cada 5 minutos (300 segundos) em vez de 30 segundos
    const interval = setInterval(() => {
      checkAuth()
      syncCollaborator()
    }, 300000)
    
    // Verificar mudanças no localStorage
    const handleStorageChange = (e) => {
      if (
        e.key === 'adminToken' ||
        e.key === 'adminUser' ||
        e.key === 'adminTokenExpiry' ||
        e.key === 'collaboratorToken' ||
        e.key === 'collaboratorUser' ||
        e.key === 'collaboratorTokenExpiry'
      ) {
        checkAuth()
        syncCollaborator()
      }
    }
    
    // Verificar quando a janela ganha foco (usuário volta à aba) - apenas se não estiver autenticado
    const handleFocus = () => {
      if (!isAuthenticated) {
        checkAuth()
      }
    }
    
    // Escutar evento customizado de mudança de autenticação
    const handleAuthStateChange = (e) => {
      setIsAuthenticated(e.detail.isAuthenticated)
      setUser(e.detail.user)
    }

    const handleCollaboratorAuthChange = (e) => {
      setCollaboratorAuth(!!e.detail?.isAuthenticated)
      setCollaboratorUser(e.detail?.user || null)
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('authStateChanged', handleAuthStateChange)
    window.addEventListener('collaboratorAuthChanged', handleCollaboratorAuthChange)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('authStateChanged', handleAuthStateChange)
      window.removeEventListener('collaboratorAuthChanged', handleCollaboratorAuthChange)
    }
  }, [isAuthenticated]) // Adicionar isAuthenticated como dependência

  // Prevenir scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup ao desmontar
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleAnchorClick = (anchor) => {
    // Fechar menu mobile
    setIsMobileMenuOpen(false)
    
    // Se já estamos na home, rola para a seção
    if (location.pathname === '/') {
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // Se não estamos na home, navega para home com âncora
    else {
      window.location.href = `/${anchor}`
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    wordpressService.adminLogout()
    setIsAuthenticated(false)
    setUser(null)
    setIsMobileMenuOpen(false)
    // Redirecionar para a página inicial
    window.location.href = '/'
  }

  const handleCollaboratorLogout = () => {
    wordpressService.collaboratorLogout()
    setCollaboratorAuth(false)
    setCollaboratorUser(null)
    setIsMobileMenuOpen(false)
    window.location.href = '/'
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img width={140} src="/images/dirhect_color.svg" alt="Dirhect Logo" />
        </Link>
        
        <nav className={`nav ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          <div className="mobile-menu-header">
            <img width={160} src="/images/dirhect_color.svg" alt="Dirhect Logo" className="mobile-menu-logo" />
            <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
          </div>
          
          <ul className="nav-links">
            <li>
              <a 
                href="/#inicio" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#inicio')
                }}
              >
                Início
              </a>
            </li>
            <li className="nav-item-with-dropdown">
              <a 
                href="/#solucoes" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#solucoes')
                }}
              >
                Soluções
                <ChevronDown size={16} className="dropdown-chevron" />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/admissao-digital" onClick={() => setIsMobileMenuOpen(false)}>
                    Admissão Digital
                  </Link>
                </li>
                <li>
                  <Link to="/gestao-beneficios" onClick={() => setIsMobileMenuOpen(false)}>
                    Gestão de Benefícios
                  </Link>
                </li>
                <li>
                  <Link to="/gestao-tarefas" onClick={() => setIsMobileMenuOpen(false)}>
                    Gestão de Tarefas
                  </Link>
                </li>
                <li>
                  <Link to="/portal-rh" onClick={() => setIsMobileMenuOpen(false)}>
                    Portal RH
                  </Link>
                </li>
                <li>
                  <Link to="/parceiros" onClick={() => setIsMobileMenuOpen(false)}>
                    Integrações e ecossistema
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/parceiro" onClick={() => setIsMobileMenuOpen(false)}>
                Parceiros
              </Link>
            </li>
            <li>
              <Link to="/conhecimento" onClick={() => setIsMobileMenuOpen(false)}>
                Conhecimento
              </Link>
            </li>
            <li>
              <Link to="/area-colaborador" onClick={() => setIsMobileMenuOpen(false)}>
                Área do colaborador
              </Link>
            </li>
            <li>
              <a 
                href="/#contato" 
                onClick={(e) => {
                  e.preventDefault()
                  handleAnchorClick('#contato')
                }}
              >
                Contato
              </a>
            </li>
          </ul>
          
          {/* Área do usuário logado (admin) */}
          {isAuthenticated && user && (
            <div className="user-area">
              <div className="user-info">
                <User size={16} />
                <span className="user-name">{user.name}</span>
              </div>
              <button 
                className="logout-btn"
                onClick={handleLogout}
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          {!isAuthenticated && collaboratorAuth && collaboratorUser && (
            <div className="user-area">
              <Link
                to="/area-colaborador/painel"
                className="user-info"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} />
                <span className="user-name">{collaboratorUser.name}</span>
              </Link>
              <button
                type="button"
                className="logout-btn"
                onClick={handleCollaboratorLogout}
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
          
          {/* Botão de demonstração apenas para usuários não logados */}
          {!isAuthenticated && !collaboratorAuth && (
            <Link 
              to="/demo" 
              className="cta-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demonstração
            </Link>
          )}
        </nav>
        
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header 