import { useState, useEffect } from 'react'
import { 
  Users, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  FileCheck, 
  Settings,
  Database,
  Activity,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react'
import './Solutions.css'

const Solutions = () => {
  const [activePillar, setActivePillar] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const mainPillars = [
    {
      icon: <FileCheck size={32} />,
      title: "Admissão Digital",
      description: "Facilite o processo de contratação, documentação e escolha de benefícios, com fluxos integrados ao portal.",
      benefits: [
        "Elimina a papelada - todo o processo feito de forma 100% digital",
        "Redução do tempo - documentos validados e armazenados automaticamente",
        "Checklist inteligente - garante que nenhum documento seja esquecido",
        "Experiência do candidato - Facilidade no envio das informações",
        "Segurança jurídica e LGPD - coleta e armazenamento seguros dos dados"
      ],
      image: "/images/pilares/admissao-digital.jpg"
    },
    {
      icon: <Users size={32} />,
      title: "Portal de RH",
      description: "Reúna em um só lugar todas as informações, tarefas e interações com os clientes. Reduza o vai-e-vem de e-mails, aumente a qualidade do atendimento e tenha total controle da operação.",
      benefits: [
        "Autonomia para o colaborador - acesso a holerites, dados cadastrais e requisições",
        "Interação centralizada com o cliente - único canal para comunicação",
        "Solicitações como admissões, alterações cadastrais, desligamentos e outros",
        "Atualização cadastral online - sem papéis, sem retrabalho",
        "Menos chamados ao RH - menos e-mails e atendimentos manuais"
      ],
      image: "/images/pilares/portal-rh.jpg"
    },
    {
      icon: <Activity size={32} />,
      title: "Gestão de Tarefas",
      description: "Distribua, acompanhe e entregue com mais agilidade. Priorize o que realmente importa e tenha visão clara do andamento de cada demanda.",
      benefits: [
        "Visão centralizada de tarefas - controle de prazos e responsáveis",
        "Processos recorrentes - tarefas de admissão, férias, rescisão e outras rotinas",
        "Checklists personalizados para diferentes tipos de processos",
        "Delegação eficiente - RH, cliente e fornecedor sabem o que fazer e quando",
        "Alertas e lembretes - evita atrasos e esquecimentos"
      ],
      image: "/images/pilares/gestao-tarefas.png"
    },
    {
      icon: <Database size={32} />,
      title: "Integração",
      description: "Este módulo conecta o Dirhect aos sistemas já utilizados pela empresa (como ERP ou folha de pagamento), garantindo que os dados pessoais dos colaboradores estejam sempre sincronizados e atualizados.",
      benefits: [
        "Conectividade com sistemas - evita retrabalho no cadastro de pessoas",
        "Integração nativa - para não iniciar projetos do zero",
        "Dados padronizados e atualizados - minimiza inconsistências",
        "Atualização com sistemas de RH e operadoras",
        "Controle de acesso e rastreabilidade - conforme a LGPD"
      ],
      image: "/images/pilares/integracao.png"
    },
    {
      icon: <Shield size={32} />,
      title: "Gestão de Benefícios",
      description: "Nosso sistema de administração de benefícios foi desenvolvido para transformar a forma como empresas gerenciam seus benefícios, com mais agilidade, controle e menos esforço.",
      benefits: [
        "Automação de processos - que elimina tarefas manuais e reduz erros",
        "Agilidade e precisão - na concessão e gestão dos benefícios",
        "Autonomia e transparência - para RH e colaboradores",
        "Integração inteligente - com sistemas de RH e operadoras, via API ou arquivos",
        "Soluções pensadas para facilitar sua operação e valorizar sua equipe"
      ],
      image: "/images/pilares/gestao-beneficios.jpg"
    }
  ]

  const benefits = [
    {
      icon: <Clock size={24} />,
      title: "Economia de Tempo",
      value: "40h/mês",
      description: "economizadas em processos manuais"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Eficiência",
      value: "98%",
      description: "de processos automatizados"
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Redução de Erros",
      value: "90%",
      description: "menos erros manuais"
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % mainPillars.length)
    }, 5000) // 5 segundos

    return () => clearInterval(interval)
  }, [isPlaying, mainPillars.length])

  const nextPillar = () => {
    setActivePillar((prev) => (prev + 1) % mainPillars.length)
  }

  const prevPillar = () => {
    setActivePillar((prev) => (prev - 1 + mainPillars.length) % mainPillars.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="solucoes" className="solutions section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Principais <span className="gradient-text">pilares da solução</span></h2>
        </div>

        {/* Seção estilo Nubank - Carrossel de pilares */}
        <div className="pillars-showcase">
          <div className="pillars-content">
            <div className="pillar-text">
              <div className="pillar-info">
                <div className="pillar-icon-wrapper">
                  {mainPillars[activePillar].icon}
                </div>
                <h3>{mainPillars[activePillar].title}</h3>
                <p className="pillar-description">
                  {mainPillars[activePillar].description}
                </p>
                
                <div className="pillar-benefits">
                  <h4>Com ele, sua empresa ganha:</h4>
                  <ul>
                    {mainPillars[activePillar].benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Wrapper dos controles para posição fixa */}
              <div className="carousel-controls-wrapper">
                {/* Controles do carrossel */}
                <div className="carousel-controls">
                  <button 
                    className="control-btn" 
                    onClick={prevPillar}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    className="control-btn play-pause" 
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button 
                    className="control-btn" 
                    onClick={nextPillar}
                    aria-label="Próximo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Indicadores */}
                <div className="carousel-indicators">
                  {mainPillars.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === activePillar ? 'active' : ''}`}
                      onClick={() => setActivePillar(index)}
                      aria-label={`Ir para pilar ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pillar-visual">
              <div className="pillar-image-container">
                <img 
                  src={mainPillars[activePillar].image} 
                  alt={mainPillars[activePillar].title}
                  className="pillar-image"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="pillar-number">0{activePillar + 1}</span>
                    <span className="pillar-total">/ 0{mainPillars.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="results-section">
          <h3 className="text-center">Resultados Comprovados</h3>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <div className="benefit-content">
                  <span className="benefit-value">{benefit.value}</span>
                  <span className="benefit-title">{benefit.title}</span>
                  <span className="benefit-description">{benefit.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solutions 