import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Terminal, 
  Settings, 
  Activity 
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './SolucoesTeste.css'

const SolucoesTeste = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const mockSolutions = [
    {
      id: 'integration',
      title: 'Sandbox de Integrações',
      desc: 'Simule o envio e recepção de dados via API REST com seus sistemas de ERP e Folha de Pagamento.',
      icon: <Terminal size={24} />,
      status: 'Disponível',
      color: '#ffaa00'
    },
    {
      id: 'workflows',
      title: 'Simulação de Workflow',
      desc: 'Valide as regras de transição de status, aprovações automáticas e disparos de e-mails em tempo de execução.',
      icon: <Cpu size={24} />,
      status: 'Disponível',
      color: '#3b82f6'
    },
    {
      id: 'security',
      title: 'Ambiente de Segurança',
      desc: 'Valide permissões de usuários, escopo de tokens JWT e encriptação de dados sensíveis sob a LGPD.',
      icon: <ShieldCheck size={24} />,
      status: 'Pronto',
      color: '#10b981'
    },
    {
      id: 'variables',
      title: 'Importador de Arquivos',
      desc: 'Faça upload de arquivos CNAB, XML e planilhas de teste para simular o fechamento de folha de pagamento.',
      icon: <Database size={24} />,
      status: 'Em Teste',
      color: '#8b5cf6'
    },
    {
      id: 'settings',
      title: 'Configurações de Fluxo',
      desc: 'Ajuste variáveis globais de simulação, latência de resposta das APIs e limites operacionais.',
      icon: <Settings size={24} />,
      status: 'Configurável',
      color: '#64748b'
    },
    {
      id: 'monitoring',
      title: 'Métricas de Performance',
      desc: 'Acompanhe em tempo real o tempo de processamento de cada microsserviço e consumo de banda.',
      icon: <Activity size={24} />,
      status: 'Ativo',
      color: '#ef4444'
    }
  ]

  return (
    <div className="solucoes-teste-page">
      <Header />
      <main className="solucoes-teste-main">
        <div className="solucoes-teste-container">
          
          {/* Header Section */}
          <div className="solucoes-teste-hero">
            <div className="solucoes-teste-hero-content">
              <span className="badge-teste">Ambiente de Testes</span>
              <h1 className="solucoes-teste-title">
                Soluções de <span className="highlight">Teste</span> Dirhect
              </h1>
              <p className="solucoes-teste-subtitle">
                Explore ferramentas de simulação, valide fluxos de trabalho e teste integrações de recursos humanos em tempo real.
              </p>
              <div className="solucoes-teste-hero-actions">
                <Link to="/" className="btn-teste btn-teste--primary">
                  <ArrowLeft size={16} />
                  Voltar ao Início
                </Link>
              </div>
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="solucoes-teste-grid">
            {mockSolutions.map((sol) => (
              <div key={sol.id} className="solucao-teste-card" style={{ '--card-accent-color': sol.color }}>
                <div className="card-header-teste">
                  <div className="icon-wrapper-teste" style={{ backgroundColor: `${sol.color}15`, color: sol.color }}>
                    {sol.icon}
                  </div>
                  <span className="card-status-teste" style={{ color: sol.color, backgroundColor: `${sol.color}10` }}>
                    {sol.status}
                  </span>
                </div>
                <h3 className="card-title-teste">{sol.title}</h3>
                <p className="card-desc-teste">{sol.desc}</p>
                <div className="card-footer-teste">
                  <button className="card-btn-teste" onClick={() => alert(`Simulação do módulo "${sol.title}" inicializada com sucesso.`)}>
                    Iniciar Teste
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SolucoesTeste
