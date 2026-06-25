import { useState, useEffect } from 'react'
import {
  Sliders,
  UserCheck,
  ShieldAlert,
  Network,
  ClipboardCheck
} from 'lucide-react'
import './HomeBpmFold.css'

// Helper function to render custom SVG icons for task cards
const renderSvgIcon = (type, color) => {
  switch (type) {
    case 'user':
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="4" r="2" stroke={color} strokeWidth="1.2" />
          <path d="M2 9.5C2 7.8 3.8 6.8 6 6.8C8.2 6.8 10 7.8 10 9.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )
    case 'document':
    case 'file':
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="2.5" y="2" width="7" height="8" rx="1" stroke={color} strokeWidth="1.2" />
          <line x1="4.5" y1="4.5" x2="7.5" y2="4.5" stroke={color} strokeWidth="1.2" />
          <line x1="4.5" y1="7" x2="6.5" y2="7" stroke={color} strokeWidth="1.2" />
        </svg>
      )
    case 'calendar':
    case 'clock':
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="2.5" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.2" />
          <line x1="4.5" y1="1.5" x2="4.5" y2="3.5" stroke={color} strokeWidth="1.2" />
          <line x1="7.5" y1="1.5" x2="7.5" y2="3.5" stroke={color} strokeWidth="1.2" />
          <line x1="4.5" y1="6" x2="7.5" y2="6" stroke={color} strokeWidth="1.2" />
        </svg>
      )
    case 'mail':
    case 'envelope':
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="2" y="3" width="8" height="6" rx="1" stroke={color} strokeWidth="1.2" />
          <path d="M2 4.2L6 6.5L10 4.2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'check':
    default:
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

// BpmTaskCard component to render individual workflow steps
const BpmTaskCard = ({ x, y, width = 110, height = 60, textLines, type = 'grey', iconType, animDelay, animDuration }) => {
  let fill = '#f8fafc'
  let strokeDefault = '#e2e8f0'
  let strokeActive = '#cbd5e1'
  let textColor = '#1e293b'
  let iconColor = '#64748b'

  if (type === 'blue') {
    fill = '#eff6ff'
    strokeDefault = '#a5bee8'
    strokeActive = '#3b82f6'
    textColor = '#1d4ed8'
    iconColor = '#3b82f6'
  } else if (type === 'orange') {
    fill = '#fff7ed'
    strokeDefault = '#e8c5a5'
    strokeActive = '#ff8c00'
    textColor = '#e67e00'
    iconColor = '#ff8c00'
  } else if (type === 'green') {
    fill = '#f0fdf4'
    strokeDefault = '#a5e8c2'
    strokeActive = '#22c55e'
    textColor = '#15803d'
    iconColor = '#22c55e'
  }

  const cardStyle = {
    '--card-stroke-default': strokeDefault,
    '--card-stroke-active': strokeActive,
    transformOrigin: `${width / 2}px ${height / 2}px`,
    ...(animDelay ? {
      animationName: 'card-pulse',
      animationDelay: animDelay,
      animationDuration: animDuration || '7s',
      animationIterationCount: 'infinite',
    } : {})
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g className="bpm-card-group" style={cardStyle}>
        <rect 
          x="0" 
          y="0" 
          width={width} 
          height={height} 
          rx="8" 
          fill={fill} 
          stroke="var(--card-stroke-default)" 
          strokeWidth="1.5" 
          className="bpm-svg-card"
        />
        
        {/* Icon rendering in top left */}
        <g transform="translate(8, 8)">
          {renderSvgIcon(iconType || type, iconColor)}
        </g>

        {/* Title Text lines */}
        {textLines.map((line, idx) => {
          const totalLinesHeight = textLines.length * 10.5
          const startY = (height / 2) + 4 - (totalLinesHeight / 2) + 6
          return (
            <text 
              key={idx}
              x={width / 2} 
              y={startY + (idx * 10.5)} 
              fill={textColor} 
              fontSize="8" 
              fontWeight="700" 
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
            >
              {line}
            </text>
          )
        })}
      </g>
    </g>
  )
}

// BpmTaskCard component specifically for the Adiantamento flow to enable coordinate-based collision detection
const BpmTaskCardAdiantamento = ({ x, y, width = 110, height = 60, textLines, type = 'grey', iconType }) => {
  let fill = '#f8fafc'
  let strokeDefault = '#e2e8f0'
  let strokeActive = '#cbd5e1'
  let textColor = '#1e293b'
  let iconColor = '#64748b'

  if (type === 'blue') {
    fill = '#eff6ff'
    strokeDefault = '#a5bee8'
    strokeActive = '#3b82f6'
    textColor = '#1d4ed8'
    iconColor = '#3b82f6'
  } else if (type === 'orange') {
    fill = '#fff7ed'
    strokeDefault = '#e8c5a5'
    strokeActive = '#ff8c00'
    textColor = '#e67e00'
    iconColor = '#ff8c00'
  } else if (type === 'green') {
    fill = '#f0fdf4'
    strokeDefault = '#a5e8c2'
    strokeActive = '#22c55e'
    textColor = '#15803d'
    iconColor = '#22c55e'
  }

  const cardStyle = {
    '--card-stroke-default': strokeDefault,
    '--card-stroke-active': strokeActive,
    transformOrigin: `${width / 2}px ${height / 2}px`,
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g 
        className="bpm-card-group bpms-adiantamento-flow-card" 
        style={cardStyle}
        data-x={x}
        data-y={y}
        data-width={width}
        data-height={height}
      >
        <rect 
          x="0" 
          y="0" 
          width={width} 
          height={height} 
          rx="8" 
          fill={fill} 
          stroke="var(--card-stroke-default)" 
          strokeWidth="1.5" 
          className="bpm-svg-card"
        />
        
        {/* Icon rendering in top left */}
        <g transform="translate(8, 8)">
          {renderSvgIcon(iconType || type, iconColor)}
        </g>

        {/* Title Text lines */}
        {textLines.map((line, idx) => {
          const totalLinesHeight = textLines.length * 10.5
          const startY = (height / 2) + 4 - (totalLinesHeight / 2) + 6
          return (
            <text 
              key={idx}
              x={width / 2} 
              y={startY + (idx * 10.5)} 
              fill={textColor} 
              fontSize="8" 
              fontWeight="700" 
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
            >
              {line}
            </text>
          )
        })}
      </g>
    </g>
  )
}

// BpmTaskCard component specifically for the Variaveis flow to enable coordinate-based collision detection
const BpmTaskCardVariaveis = ({ x, y, width = 110, height = 60, textLines, type = 'grey', iconType }) => {
  let fill = '#f8fafc'
  let strokeDefault = '#e2e8f0'
  let strokeActive = '#cbd5e1'
  let textColor = '#1e293b'
  let iconColor = '#64748b'

  if (type === 'blue') {
    fill = '#eff6ff'
    strokeDefault = '#a5bee8'
    strokeActive = '#3b82f6'
    textColor = '#1d4ed8'
    iconColor = '#3b82f6'
  } else if (type === 'orange') {
    fill = '#fff7ed'
    strokeDefault = '#e8c5a5'
    strokeActive = '#ff8c00'
    textColor = '#e67e00'
    iconColor = '#ff8c00'
  } else if (type === 'green') {
    fill = '#f0fdf4'
    strokeDefault = '#a5e8c2'
    strokeActive = '#22c55e'
    textColor = '#15803d'
    iconColor = '#22c55e'
  }

  const cardStyle = {
    '--card-stroke-default': strokeDefault,
    '--card-stroke-active': strokeActive,
    transformOrigin: `${width / 2}px ${height / 2}px`,
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g 
        className="bpm-card-group bpms-variaveis-flow-card" 
        style={cardStyle}
        data-x={x}
        data-y={y}
        data-width={width}
        data-height={height}
      >
        <rect 
          x="0" 
          y="0" 
          width={width} 
          height={height} 
          rx="8" 
          fill={fill} 
          stroke="var(--card-stroke-default)" 
          strokeWidth="1.5" 
          className="bpm-svg-card"
        />
        
        {/* Icon rendering in top left */}
        <g transform="translate(8, 8)">
          {renderSvgIcon(iconType || type, iconColor)}
        </g>

        {/* Title Text lines */}
        {textLines.map((line, idx) => {
          const totalLinesHeight = textLines.length * 10.5
          const startY = (height / 2) + 4 - (totalLinesHeight / 2) + 6
          return (
            <text 
              key={idx}
              x={width / 2} 
              y={startY + (idx * 10.5)} 
              fill={textColor} 
              fontSize="8" 
              fontWeight="700" 
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
            >
              {line}
            </text>
          )
        })}
      </g>
    </g>
  )
}

// Componente para carregar e renderizar diagramas SVG externos dinamicamente
const BpmSvgLoader = ({ src }) => {
  const [svgMarkup, setSvgMarkup] = useState('')

  useEffect(() => {
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const svgStart = text.indexOf('<svg')
        if (svgStart !== -1) {
          let svgString = text.substring(svgStart)
          
          // Adiciona a classe home-bpm-svg no elemento <svg> se não existir
          if (svgString.startsWith('<svg') && !svgString.includes('class="home-bpm-svg"')) {
            svgString = svgString.replace('<svg', '<svg class="home-bpm-svg"')
          }
          setSvgMarkup(svgString)
        } else {
          setSvgMarkup(text)
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar o diagrama:', err)
        setSvgMarkup('<div class="bpm-flow-error">Erro ao carregar o diagrama SVG.</div>')
      })
  }, [src])

  if (!svgMarkup) {
    return (
      <div className="bpm-flow-loading" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--bpm-muted)' }}>
        <p>Carregando diagrama...</p>
      </div>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: svgMarkup }} style={{ display: 'contents' }} />
}

const HomeBpmFold = ({ isStandalone = false }) => {
  const [currentFlow, setCurrentFlow] = useState('admissao')

  const flowTabs = [
    { id: 'admissao', title: 'Admissão', description: 'Admissional de Ponta a Ponta' },
    { id: 'adiantamento', title: 'Adiantamento', description: 'Adiantamento Quinzenal' },
    { id: 'variaveis', title: 'Variáveis', description: 'Importação de Variáveis' },
    { id: 'ferias', title: 'Férias', description: 'Solicitação e Aprovação de Férias' },
    { id: 'desligamento', title: 'Desligamento', description: 'Desligamento de Colaborador' }
  ]

  useEffect(() => {
    if (currentFlow !== 'adiantamento') return

    let active = true
    let animationFrameId

    const checkCollisions = () => {
      if (!active) return

      const svgEl = document.querySelector('.home-bpm-svg--adiantamento')
      if (!svgEl) {
        animationFrameId = requestAnimationFrame(checkCollisions)
        return
      }

      const svgRect = svgEl.getBoundingClientRect()
      if (svgRect.width === 0 || svgRect.height === 0) {
        animationFrameId = requestAnimationFrame(checkCollisions)
        return
      }

      const scaleX = 1747 / svgRect.width
      const scaleY = 617 / svgRect.height

      // Query all moving dots in the adiantamento flow
      const dots = svgEl.querySelectorAll(
        '.bpm-moving-dot--adiantamento, .bpm-moving-dot-parallel--adiantamento, .bpm-moving-loop-gateway1--adiantamento, .bpm-moving-loop-gateway2--adiantamento'
      )

      // Query all cards in the adiantamento flow
      const cards = svgEl.querySelectorAll('.bpms-adiantamento-flow-card')

      // Precompute dot coordinates in viewBox space
      const dotCoords = []
      dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect()
        if (rect.width > 0) {
          const cx = (rect.left + rect.width / 2 - svgRect.left) * scaleX
          const cy = (rect.top + rect.height / 2 - svgRect.top) * scaleY
          dotCoords.push({ cx, cy })
        }
      })

      // Update class for each card
      cards.forEach((card) => {
        const x = parseFloat(card.getAttribute('data-x'))
        const y = parseFloat(card.getAttribute('data-y'))
        const w = parseFloat(card.getAttribute('data-width'))
        const h = parseFloat(card.getAttribute('data-height'))

        let hasDot = false
        for (let i = 0; i < dotCoords.length; i++) {
          const { cx, cy } = dotCoords[i]
          if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
            hasDot = true
            break
          }
        }

        if (hasDot) {
          if (!card.classList.contains('bpm-card-group--active')) {
            card.classList.add('bpm-card-group--active')
          }
        } else {
          if (card.classList.contains('bpm-card-group--active')) {
            card.classList.remove('bpm-card-group--active')
          }
        }
      })

      animationFrameId = requestAnimationFrame(checkCollisions)
    }

    // Delay initialization slightly to let DOM render
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(checkCollisions)
    }, 100)

    return () => {
      active = false
      cancelAnimationFrame(animationFrameId)
      clearTimeout(timeoutId)
    }
  }, [currentFlow])

  useEffect(() => {
    if (currentFlow !== 'variaveis') return

    let active = true
    let animationFrameId

    const checkCollisions = () => {
      if (!active) return

      const svgEl = document.querySelector('.home-bpm-svg--variaveis')
      if (!svgEl) {
        animationFrameId = requestAnimationFrame(checkCollisions)
        return
      }

      const svgRect = svgEl.getBoundingClientRect()
      if (svgRect.width === 0 || svgRect.height === 0) {
        animationFrameId = requestAnimationFrame(checkCollisions)
        return
      }

      const scaleX = 927 / svgRect.width
      const scaleY = 350 / svgRect.height

      // Query all moving dots in the variables flow
      const dots = svgEl.querySelectorAll(
        '.bpm-moving-dot--variaveis, .bpm-moving-loop-gateway-upload--variaveis, .bpm-moving-loop-gateway-aprovacao--variaveis'
      )

      // Query all cards in the variables flow
      const cards = svgEl.querySelectorAll('.bpms-variaveis-flow-card')

      // Precompute dot coordinates in viewBox space
      const dotCoords = []
      dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect()
        if (rect.width > 0) {
          const cx = (rect.left + rect.width / 2 - svgRect.left) * scaleX + 118
          const cy = (rect.top + rect.height / 2 - svgRect.top) * scaleY - 85
          dotCoords.push({ cx, cy })
        }
      })

      // Update class for each card
      cards.forEach((card) => {
        const x = parseFloat(card.getAttribute('data-x'))
        const y = parseFloat(card.getAttribute('data-y'))
        const w = parseFloat(card.getAttribute('data-width'))
        const h = parseFloat(card.getAttribute('data-height'))

        let hasDot = false
        for (let i = 0; i < dotCoords.length; i++) {
          const { cx, cy } = dotCoords[i]
          if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
            hasDot = true
            break
          }
        }

        if (hasDot) {
          if (!card.classList.contains('bpm-card-group--active')) {
            card.classList.add('bpm-card-group--active')
          }
        } else {
          if (card.classList.contains('bpm-card-group--active')) {
            card.classList.remove('bpm-card-group--active')
          }
        }
      })

      animationFrameId = requestAnimationFrame(checkCollisions)
    }

    // Delay initialization slightly to let DOM render
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(checkCollisions)
    }, 100)

    return () => {
      active = false
      cancelAnimationFrame(animationFrameId)
      clearTimeout(timeoutId)
    }
  }, [currentFlow])

  const flowFilenames = {
    admissao: 'fluxo_admissao_dirhect',
    adiantamento: 'fluxo_adiantamento_dirhect',
    variaveis: 'fluxo_variaveis_dirhect',
    ferias: 'fluxo_ferias_dirhect',
    desligamento: 'fluxo_desligamento_dirhect'
  }

  const handleDownloadSvg = () => {
    if (currentFlow === 'ferias' || currentFlow === 'desligamento') {
      alert('O diagrama deste fluxo estará disponível em breve para download.')
      return
    }

    // Grab the full SVG element from the DOM (the entire diagram, not just the visible portion)
    const svgEl = document.querySelector('.home-bpm-svg')
    if (!svgEl) return

    // Clone so we can clean up animation attributes without affecting the live element
    const clone = svgEl.cloneNode(true)

    // Add XML namespace required for standalone SVG files
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')

    // Serialize and create downloadable blob
    const serializer = new XMLSerializer()
    const svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + serializer.serializeToString(clone)
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const filename = flowFilenames[currentFlow] || 'fluxo_bpms_dirhect'

    // Trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section className={`home-bpm-fold ${isStandalone ? 'home-bpm-fold--standalone' : ''}`} aria-labelledby="home-bpm-title">
      <div className={`home-bpm-container home-fold-container ${isStandalone ? 'home-bpm-container--standalone' : ''}`}>
        
        {isStandalone && (
          <div className="home-bpm-header-standalone">
            <h2 id="home-bpm-title" className="home-bpm-title home-bpm-title--centered">
              Transforme processos complexos de <span className="home-bpm-accent">RH</span> <br className="home-bpm-title-br" /> em <span className="home-bpm-accent">fluxos automatizados</span>.
            </h2>
            <p className="home-bpm-subtitle-bottom home-bpm-subtitle-standalone">
              Crie regras, aprovações, validações e etapas personalizadas para que cada processo siga exatamente o fluxo definido pela sua empresa.
            </p>
          </div>
        )}

        {isStandalone && (
          <h3 className="sidebar-title" style={{ maxWidth: '310px' }}>
            Alguns exemplos
          </h3>
        )}

        {/* Card Principal */}
        <div className={`home-bpm-card ${isStandalone ? 'home-bpm-card--standalone' : ''}`}>
          
          {/* Lado Esquerdo - Copy e Grid de Funcionalidades OU Flow Selector Sidebar */}
          {isStandalone ? (
            <div className="home-bpm-copy-section home-bpm-sidebar">
              <div className="home-bpm-flow-selector-vertical">
                {flowTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`bpm-flow-tab-vertical ${currentFlow === tab.id ? 'active' : ''}`}
                    onClick={() => setCurrentFlow(tab.id)}
                  >
                    <span className="tab-indicator-bullet"></span>
                    <div className="tab-text-wrap">
                      <span className="tab-title">{tab.title}</span>
                      <span className="tab-desc">{tab.description}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="home-bpm-download-container-sidebar">
                <a 
                  href="/images/bpms_animation.gif" 
                  download={`${flowFilenames[currentFlow] || 'fluxo_bpms_dirhect'}.gif`} 
                  className="home-bpm-download-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Baixar Animação (.GIF)
                </a>
                <button
                  onClick={handleDownloadSvg}
                  className="home-bpm-download-btn home-bpm-download-btn--svg"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Baixar Diagrama (.SVG)
                </button>
              </div>
            </div>
          ) : (
            <div className="home-bpm-copy-section">
              <h2 id="home-bpm-title" className="home-bpm-title">
                Transforme processos complexos <br className="home-bpm-title-br" /> em <span className="home-bpm-accent">fluxos automatizados</span>.
              </h2>

              {/* Linha do tempo de Funcionalidades */}
              <div className="home-bpm-features-timeline">
                <div className="home-bpm-timeline-item">
                  <div className="home-bpm-timeline-indicator">
                    <div className="home-bpm-timeline-dot">
                      <Sliders size={13} />
                    </div>
                    <div className="home-bpm-timeline-line"></div>
                  </div>
                  <span className="home-bpm-timeline-label">Fluxos personalizados</span>
                </div>
                
                <div className="home-bpm-timeline-item">
                  <div className="home-bpm-timeline-indicator">
                    <div className="home-bpm-timeline-dot">
                      <UserCheck size={13} />
                    </div>
                    <div className="home-bpm-timeline-line"></div>
                  </div>
                  <span className="home-bpm-timeline-label">Aprovações automáticas</span>
                </div>

                <div className="home-bpm-timeline-item">
                  <div className="home-bpm-timeline-indicator">
                    <div className="home-bpm-timeline-dot">
                      <ShieldAlert size={13} />
                    </div>
                    <div className="home-bpm-timeline-line"></div>
                  </div>
                  <span className="home-bpm-timeline-label">Regras de negócio</span>
                </div>

                <div className="home-bpm-timeline-item">
                  <div className="home-bpm-timeline-indicator">
                    <div className="home-bpm-timeline-dot">
                      <Network size={13} />
                    </div>
                    <div className="home-bpm-timeline-line"></div>
                  </div>
                  <span className="home-bpm-timeline-label">Integrações entre sistemas</span>
                </div>

                <div className="home-bpm-timeline-item">
                  <div className="home-bpm-timeline-indicator">
                    <div className="home-bpm-timeline-dot">
                      <ClipboardCheck size={13} />
                    </div>
                    <div className="home-bpm-timeline-line"></div>
                  </div>
                  <span className="home-bpm-timeline-label">Rastreabilidade completa</span>
                </div>
              </div>
            </div>
          )}

          {/* Lado Direito - Mapeador BPMS Completo com as 4 Raias */}
          <div className="home-bpm-visual-section">
            
            {/* Bloco do Diagrama */}
            <div className="home-bpm-diagram-container">
              <div className="home-bpm-diagram-header">
                <div className="home-bpm-diagram-dot red"></div>
                <div className="home-bpm-diagram-dot yellow"></div>
                <div className="home-bpm-diagram-dot green"></div>
                <span className="home-bpm-diagram-title">
                  {flowTabs.find(t => t.id === currentFlow)?.description}
                </span>
              </div>
              
              <div className="home-bpm-diagram-scroll-wrap">
                {currentFlow === 'admissao' ? (
                  <svg className="home-bpm-svg" viewBox="0 0 3220 390" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Definições de Marcadores (Setas) */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#000000" />
                    </marker>
                    <marker id="arrow-dashed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#000000" />
                    </marker>
                    
                    {/* Glow filter para as bolinhas animadas */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* ==================== ESTRUTURA DE RAIAS (SWIMLANES) ==================== */}
                  {/* Coluna 1: Processo Admissão (Dirhect) */}
                  <rect x="0" y="0" width="30" height="390" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="16" y="195" fill="#475569" fontSize="9" fontWeight="800" textAnchor="middle" transform="rotate(-90 16 195)">Processo Admissão (Dirhect)</text>

                  {/* Coluna 2: Nomes das Raias */}
                  <rect x="30" y="0" width="50" height="390" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="30" y1="70" x2="80" y2="70" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="30" y1="200" x2="80" y2="200" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="30" y1="310" x2="80" y2="310" stroke="#cbd5e1" strokeWidth="1" />

                  <text x="55" y="35" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 55 35)">Loja</text>
                  <text x="55" y="135" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 55 135)">RH</text>
                  <text x="55" y="255" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 55 255)">Candidato</text>
                  <text x="55" y="350" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 55 350)">Clínica</text>

                  {/* Fundo e contorno dos Lanes */}
                  <rect x="80" y="0" width="3140" height="70" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <rect x="80" y="70" width="3140" height="130" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <rect x="80" y="200" width="3140" height="110" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                  <rect x="80" y="310" width="3140" height="80" fill="none" stroke="#cbd5e1" strokeWidth="1" />

                  {/* ==================== CONECTORES (LINHAS E SETAS) ==================== */}
                  {/* Dashed line from Loja text to Start event */}
                  <path d="M 115 45 L 115 120" stroke="#000000" strokeWidth="1.2" strokeDasharray="4 4" />
                  
                  {/* Start -> RH: Agendar */}
                  <line x1="129" y1="135" x2="150" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  {/* RH: Agendar -> Clínica: Informar Data Exame */}
                  <path d="M 205 165 L 205 350 L 215 350" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  {/* Clínica: Informar Data Exame -> RH: Preencher dados */}
                  <path d="M 325 350 L 335 350 L 335 135 L 350 135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* RH: Preencher dados -> Verificar se tem e-mail */}
                  <line x1="470" y1="135" x2="500" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  {/* Verificar se tem e-mail -> Gateway 1 */}
                  <line x1="610" y1="135" x2="640" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  {/* Gateway 1 -> Gerar Template de E-mail */}
                  <line x1="670" y1="135" x2="700" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  {/* Gateway 1 (Sem E-mail) -> Loop para Complementação */}
                  <path d="M 655 120 L 655 85 L 2145 85 L 2145 105" stroke="#000000" strokeWidth="1.2" markerEnd="url(#arrow)" />
                  
                  {/* Gerar Template -> Enviar E-mail */}
                  <line x1="810" y1="135" x2="840" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  
                  {/* Enviar E-mail -> Fazer Exame (Candidato) */}
                  <path d="M 965 135 L 980 135 L 980 255 L 1000 255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Fazer Exame (Candidato) -> Emitir Laudo (Clínica) */}
                  <path d="M 1055 285 L 1055 350 L 1090 350" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Emitir Laudo (Clínica) -> Anexar Exame (Candidato) */}
                  <path d="M 1200 350 L 1215 350 L 1215 255 L 1230 255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Candidato sequential lines */}
                  <line x1="1350" y1="255" x2="1380" y2="255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="1490" y1="255" x2="1520" y2="255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="1630" y1="255" x2="1660" y2="255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="1775" y1="255" x2="1800" y2="255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="1910" y1="255" x2="1940" y2="255" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Confirmar e Enviar (Candidato) -> Complementação (RH) */}
                  <path d="M 2060 255 L 2075 255 L 2075 135 L 2090 135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* RH sequential lines */}
                  <line x1="2200" y1="135" x2="2230" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="2345" y1="135" x2="2370" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="2480" y1="135" x2="2510" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="2630" y1="135" x2="2660" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <line x1="2770" y1="135" x2="2800" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Gateway 2 -> Admissão Cancelada (Loja) */}
                  <path d="M 2815 120 L 2815 35 L 2960 35" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Gateway 2 -> Sistema: Integrar com RM */}
                  <line x1="2830" y1="135" x2="2880" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* Gateway 2 -> Loop back to Validar e Complementar */}
                  <path d="M 2815 150 L 2815 285 L 2570 285 L 2570 165" stroke="#000000" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-dashed)" />

                  {/* Sistema: Integrar com RM -> RH: Enviar eSocial */}
                  <line x1="2995" y1="135" x2="3020" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* RH: Enviar eSocial -> End Event */}
                  <line x1="3130" y1="135" x2="3146" y2="135" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />

                  {/* ==================== ANIMAÇÕES DO FLUXO (PULSOS DE ENERGIA - DESENHADOS POR TRÁS DOS CARDS) ==================== */}
                  {/* Pulso 1 do fluxo principal (cor azul, começa em 0s) */}
                  <circle r="4.5" fill="#3b82f6" filter="url(#glow)" className="bpm-moving-dot bpm-dot-1" />

                  {/* Pulso 2 do fluxo principal (cor verde, começa em 7s) */}
                  <circle r="4.5" fill="#22c55e" filter="url(#glow)" className="bpm-moving-dot bpm-dot-2" />

                  {/* Pulso 3 do fluxo principal (cor azul, começa em 14s) */}
                  <circle r="4.5" fill="#3b82f6" filter="url(#glow)" className="bpm-moving-dot bpm-dot-3" />

                  {/* Pulso 4 do fluxo principal (cor verde, começa em 21s) */}
                  <circle r="4.5" fill="#22c55e" filter="url(#glow)" className="bpm-moving-dot bpm-dot-4" />

                  {/* Pulso do loop sem e-mail (cor amarela, dura 8s) */}
                  <circle r="3.5" fill="#f59e0b" filter="url(#glow)" className="bpm-moving-loop-yellow" />

                  {/* Pulso do loop de correção/validação (cor vermelha, dura 8s) */}
                  <circle r="3.5" fill="#ef4444" filter="url(#glow)" className="bpm-moving-loop-red" />

                  {/* ==================== NODES E CARD GRUPS (DESENHADOS POR CIMA DAS ANIMAÇÕES) ==================== */}
                  {/* Text em Loja: Criar e aprovar a vaga... */}
                  <g transform="translate(85, 12)">
                    <text x="30" y="15" fill="#475569" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Criar e aprovar a Vaga e o(s)</text>
                    <text x="30" y="25" fill="#475569" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Candidato(s)</text>
                    {/* User silhouette icon */}
                    <path d="M12 18C12 15.8 13.8 14.8 16 14.8C18.2 14.8 20 15.8 20 18" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="16" cy="11.5" r="2" stroke="#475569" strokeWidth="1.2" />
                  </g>

                  {/* Start Event Circle in RH */}
                  <circle cx="115" cy="135" r="14" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2.5" />
                  
                  {/* Task 1: RH: Agendar Exame Admissional */}
                  <BpmTaskCard 
                    x={150} y={105} width={110} height={60} 
                    textLines={["RH: Agendar", "Exame", "Admissional"]} 
                    type="grey" iconType="calendar" 
                    animDelay="0.15s"
                  />

                  {/* Task 2: Informar Data Exame */}
                  <BpmTaskCard 
                    x={215} y={320} width={110} height={60} 
                    textLines={["Informar Data", "Exame"]} 
                    type="blue" iconType="calendar" 
                    animDelay="2.15s"
                  />

                  {/* Task 3: RH: Preencher dados de exame e Enviar para Candidata */}
                  <BpmTaskCard 
                    x={350} y={105} width={120} height={60} 
                    textLines={["RH: Preencher", "dados de exame", "e Enviar para", "Candidata"]} 
                    type="grey" iconType="user" 
                    animDelay="4.70s"
                  />

                  {/* Task 4: Verificar se tem e-mail */}
                  <BpmTaskCard 
                    x={500} y={105} width={110} height={60} 
                    textLines={["Verificar se", "tem e-mail"]} 
                    type="orange" iconType="check" 
                    animDelay="5.74s"
                  />

                  {/* Gateway 1 (diamond with X) */}
                  <g transform="translate(640, 120)">
                    <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                    <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                  </g>
                  <text x="655" y="165" fill="#d97706" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Inter', sans-serif">Enviar E-mail</text>
                  <text x="655" y="174" fill="#d97706" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Inter', sans-serif">Candidato</text>

                  {/* Task 5: Gerar Template de E-mail */}
                  <BpmTaskCard 
                    x={700} y={105} width={110} height={60} 
                    textLines={["Gerar Template", "de E-mail"]} 
                    type="green" iconType="document" 
                    animDelay="0.17s"
                  />

                  {/* Task 6: Enviar E-mail para Candidata Complementar */}
                  <BpmTaskCard 
                    x={840} y={105} width={125} height={60} 
                    textLines={["Enviar E-mail", "para Candidata", "Complementar"]} 
                    type="green" iconType="mail" 
                    animDelay="1.23s"
                  />

                  {/* Task 7: Fazer Exame Admissional (Candidato) */}
                  <BpmTaskCard 
                    x={1000} y={225} width={110} height={60} 
                    textLines={["Fazer Exame", "Admissional"]} 
                    type="blue" iconType="user" 
                    animDelay="3.18s"
                  />

                  {/* Task 8: Emitir Laudo (Clínica) */}
                  <BpmTaskCard 
                    x={1090} y={320} width={110} height={60} 
                    textLines={["Emitir Laudo"]} 
                    type="blue" iconType="document" 
                    animDelay="4.51s"
                  />

                  {/* Task 9: Candidato: Anexar Exame Admissional */}
                  <BpmTaskCard 
                    x={1230} y={225} width={120} height={60} 
                    textLines={["Candidato:", "Anexar Exame", "Admissional"]} 
                    type="grey" iconType="document" 
                    animDelay="6.23s"
                  />

                  {/* Task 10: Candidato: Preencher Benefício */}
                  <BpmTaskCard 
                    x={1380} y={225} width={110} height={60} 
                    textLines={["Candidato:", "Preencher", "Benefício"]} 
                    type="grey" iconType="user" 
                    animDelay="0.27s"
                  />

                  {/* Task 11: Candidato: Escolher Uniforme */}
                  <BpmTaskCard 
                    x={1520} y={225} width={110} height={60} 
                    textLines={["Candidato:", "Escolher", "Uniforme"]} 
                    type="grey" iconType="user" 
                    animDelay="1.28s"
                  />

                  {/* Task 12: Candidato: Selecionar Linha de Transporte */}
                  <BpmTaskCard 
                    x={1660} y={225} width={115} height={60} 
                    textLines={["Candidato:", "Selecionar", "Linha de", "Transporte"]} 
                    type="grey" iconType="user" 
                    animDelay="2.30s"
                  />

                  {/* Task 13: Candidato: LGPD */}
                  <BpmTaskCard 
                    x={1800} y={225} width={110} height={60} 
                    textLines={["Candidato:", "LGPD"]} 
                    type="grey" iconType="user" 
                    animDelay="3.28s"
                  />

                  {/* Task 14: Candidato: Confirmar Preenchimento e Enviar */}
                  <BpmTaskCard 
                    x={1940} y={225} width={120} height={60} 
                    textLines={["Candidato:", "Confirmar", "Preenchimento", "e Enviar"]} 
                    type="grey" iconType="check" 
                    animDelay="4.32s"
                  />

                  {/* Task 15: Complementação */}
                  <BpmTaskCard 
                    x={2090} y={105} width={110} height={60} 
                    textLines={["Complementação"]} 
                    type="grey" iconType="check" 
                    animDelay="6.22s"
                  />

                  {/* Task 16: RH: Anexar Kit Admissional */}
                  <BpmTaskCard 
                    x={2230} y={105} width={115} height={60} 
                    textLines={["RH: Anexar Kit", "Admissional"]} 
                    type="orange" iconType="document" 
                    animDelay="0.24s"
                  />

                  {/* Task 17: RH: Solicitar Crachá */}
                  <BpmTaskCard 
                    x={2370} y={105} width={110} height={60} 
                    textLines={["RH: Solicitar", "Crachá"]} 
                    type="orange" iconType="user" 
                    animDelay="1.23s"
                  />

                  {/* Task 18: RH: Validar e Complementar Informações */}
                  <BpmTaskCard 
                    x={2510} y={105} width={120} height={60} 
                    textLines={["RH: Validar e", "Complementar", "Informações"]} 
                    type="orange" iconType="document" 
                    animDelay="2.27s"
                  />

                  {/* Task 19: RH: Aprovar para Integração */}
                  <BpmTaskCard 
                    x={2660} y={105} width={110} height={60} 
                    textLines={["RH: Aprovar", "para Integração"]} 
                    type="orange" iconType="check" 
                    animDelay="3.31s"
                  />

                  {/* Gateway 2 (diamond with X) */}
                  <g transform="translate(2800, 120)">
                    <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                  </g>

                  {/* Admissão Cancelada (End Event in Loja lane) */}
                  <g>
                    <circle cx="2975" cy="35" r="14" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                    <circle cx="2975" cy="35" r="11" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                    <circle cx="2975" cy="35" r="7" fill="#1e293b" />
                    <text x="2975" y="58" fill="#1e293b" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Inter', sans-serif">Admissão Cancelada</text>
                  </g>

                  {/* Task 20: Sistema: Integrar com RM */}
                  <BpmTaskCard 
                    x={2880} y={105} width={115} height={60} 
                    textLines={["Sistema:", "Integrar com", "RM"]} 
                    type="green" iconType="check" 
                    animDelay="4.91s"
                  />

                  {/* Task 21: RH: Enviar eSocial */}
                  <BpmTaskCard 
                    x={3020} y={105} width={110} height={60} 
                    textLines={["RH: Enviar", "eSocial"]} 
                    type="grey" iconType="document" 
                    animDelay="5.89s"
                  />

                   {/* End Event Circle in RH */}
                  <circle cx="3160" cy="135" r="14" fill="none" stroke="#16a34a" strokeWidth="3" />
                  <circle cx="3160" cy="135" r="8" fill="#16a34a" />
                </svg>
                ) : currentFlow === 'adiantamento' ? (
                  <svg className="home-bpm-svg home-bpm-svg--adiantamento" viewBox="0 0 1747 617" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <marker id="arrow-adiantamento" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                      </marker>
                      <filter id="glow-adiantamento" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Structure of Swimlanes */}
                    <rect x="0" y="0" width="30" height="617" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
                    <text x="16" y="308.5" fill="#475569" fontSize="9" fontWeight="800" textAnchor="middle" transform="rotate(-90 16 308.5)">Processo Adiantamento (Dirhect)</text>

                    <rect x="30" y="0" width="50" height="617" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="30" y1="339.5" x2="80" y2="339.5" stroke="#cbd5e1" strokeWidth="1" />

                    <text x="55" y="169.75" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 55 169.75)">Operação (BPO)</text>
                    <text x="55" y="474.5" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 55 474.5)">Cliente (RH)</text>

                    <rect x="80" y="0" width="1667" height="339.5" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <rect x="80" y="339.5" width="1667" height="277.5" fill="none" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Connectors / Paths */}
                    {/* Start -> 1. RH Envio */}
                    <path d="M 99.5 219.5 H 176.5 a 5 5 0 0 1 5 5 V 469.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* 1. RH Envio -> BPO Confere */}
                    <path d="M 236.5 499.5 H 326.5 a 5 5 0 0 0 5 -5 V 289.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Confere -> Gateway 1 */}
                    <path d="M 381.5 259.5 H 456.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 1 (top) -> BPO Calcular */}
                    <path d="M 471.5 244.5 V 199.5 a 5 5 0 0 0 -5 -5 H 296.5 a 5 5 0 0 1 -5 -5 V 112.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 1 (bottom) -> RH Envio loop */}
                    <path d="M 471.5 274.5 V 544.5 a 5 5 0 0 1 -5 5 H 186.5 a 5 5 0 0 1 -5 -5 V 529.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Calcular -> BPO Conferir */}
                    <path d="M 346.5 82.5 H 386.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Conferir -> BPO Gerar Folha */}
                    <path d="M 496.5 82.5 H 556.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Gerar Folha -> BPO Enviar */}
                    <path d="M 666.5 82.5 H 696.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Enviar -> RH Aprovar */}
                    <path d="M 751.5 112.5 V 469.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* RH Aprovar -> Gateway 2 */}
                    <path d="M 696.5 499.5 H 666.5 a 5 5 0 0 1 -5 -5 V 294.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 2 (top) -> BPO Calcular loop */}
                    <path d="M 661.5 244.5 V 174.5 a 5 5 0 0 0 -5 -5 H 336.5 a 5 5 0 0 1 -5 -5 V 112.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 2 (right) -> BPO Bloquear */}
                    <path d="M 686.5 269.5 H 884.5 a 5 5 0 0 0 5 -5 V 112.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Bloquear -> BPO Gerar CNAB */}
                    <path d="M 944.5 82.5 H 974.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Gerar CNAB -> Gateway 3 */}
                    <path d="M 1084.5 82.5 H 1134.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 3 (right) -> BPO Enviar CNAB */}
                    <path d="M 1184.5 82.5 H 1214.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 3 (bottom) -> RH Enviar CNAB */}
                    <path d="M 1159.5 107.5 V 448.5 a 5 5 0 0 0 5 5 H 1214.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Enviar CNAB -> BPO Disponibiliza */}
                    <path d="M 1324.5 82.5 H 1356.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* RH Enviar CNAB -> Gateway 4 */}
                    <path d="M 1324.5 453.5 H 1544.5 a 5 5 0 0 0 5 -5 V 107.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* BPO Disponibiliza -> Gateway 4 */}
                    <path d="M 1466.5 82.5 H 1524.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />
                    {/* Gateway 4 -> End Event */}
                    <path d="M 1574.5 82.5 H 1641.5" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-adiantamento)" />

                    {/* Animation energy pulses (moving dots) */}
                    <circle r="4.5" fill="#3b82f6" filter="url(#glow-adiantamento)" className="bpm-moving-dot--adiantamento bpm-dot-adiantamento-1" />
                    <circle r="4.5" fill="#22c55e" filter="url(#glow-adiantamento)" className="bpm-moving-dot--adiantamento bpm-dot-adiantamento-3" />

                    <circle r="4" fill="#3b82f6" filter="url(#glow-adiantamento)" className="bpm-moving-dot-parallel--adiantamento bpm-dot-parallel-adiantamento-1" />


                    <circle r="3.5" fill="#ef4444" filter="url(#glow-adiantamento)" className="bpm-moving-loop-gateway1--adiantamento" />
                    <circle r="3.5" fill="#f59e0b" filter="url(#glow-adiantamento)" className="bpm-moving-loop-gateway2--adiantamento" />

                    {/* Gateway Diamonds */}
                    {/* Gateway 1 */}
                    <g transform="translate(456.5, 244.5)">
                      <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                      <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    {/* Gateway 2 */}
                    <g transform="translate(646.5, 254.5)">
                      <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                      <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    {/* Gateway 3 */}
                    <g transform="translate(1144.5, 67.5)">
                      <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    {/* Gateway 4 */}
                    <g transform="translate(1534.5, 67.5)">
                      <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                    </g>

                    {/* Gateway Text Labels */}
                    <text x="495" y="235" fill="#16a34a" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Aprovado</text>
                    <text x="420" y="320" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Reprovado</text>
                    <text x="715" y="260" fill="#16a34a" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Aprovado</text>
                    <text x="590" y="185" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Reprovado</text>

                    {/* Start Event */}
                    <circle cx="81.5" cy="219.5" r="14" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2.5" />

                    {/* End Event */}
                    <circle cx="1659.5" cy="82.5" r="14" fill="none" stroke="#16a34a" strokeWidth="3" />
                    <circle cx="1659.5" cy="82.5" r="8" fill="#16a34a" />

                    {/* Bpm Task Cards */}
                    <g className="bpms-adiantamento-flow">
                      <BpmTaskCardAdiantamento 
                        x={126.5} y={469.5} width={110} height={60} 
                        textLines={["1. RH: Envio", "de dados", "(alterações", "contratuais)"]} 
                        type="orange" iconType="document" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={276.5} y={229.5} width={110} height={60} 
                        textLines={["BPO: Confere", "dados e realiza", "os inputs"]} 
                        type="grey" iconType="check" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={236.5} y={52.5} width={110} height={60} 
                        textLines={["1. BPO: Calcular", "adiantamento"]} 
                        type="grey" iconType="check" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={386.5} y={52.5} width={110} height={60} 
                        textLines={["2. BPO: Conferir", "cálculos"]} 
                        type="grey" iconType="document" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={556.5} y={52.5} width={110} height={60} 
                        textLines={["3. BPO: Gerar", "folha analítica"]} 
                        type="grey" iconType="document" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={696.5} y={52.5} width={110} height={60} 
                        textLines={["4. BPO: Enviar", "ao cliente"]} 
                        type="grey" iconType="mail" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={696.5} y={469.5} width={110} height={60} 
                        textLines={["5. RH: Aprovar", "cálculos"]} 
                        type="orange" iconType="check" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={834.5} y={52.5} width={110} height={60} 
                        textLines={["10. BPO: Bloquear", "recálculo"]} 
                        type="grey" iconType="check" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={974.5} y={52.5} width={110} height={60} 
                        textLines={["7. BPO: Gerar", "CNAB"]} 
                        type="green" iconType="document" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={1214.5} y={52.5} width={110} height={60} 
                        textLines={["8. BPO: Enviar", "CNAB para cliente"]} 
                        type="grey" iconType="mail" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={1214.5} y={423.5} width={110} height={60} 
                        textLines={["9. RH: Enviar", "CNAB para o banco"]} 
                        type="orange" iconType="mail" 
                      />
                      <BpmTaskCardAdiantamento 
                        x={1356.5} y={52.5} width={110} height={60} 
                        textLines={["11. BPO:", "Disponibiliza", "Holerite"]} 
                        type="green" iconType="document" 
                      />
                    </g>
                  </svg>
                ) : currentFlow === 'variaveis' ? (
                  <svg className="home-bpm-svg home-bpm-svg--variaveis" viewBox="118 -85 927 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <marker id="arrow-variaveis" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                      </marker>
                      <filter id="glow-variaveis" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Estrutura de Swimlanes */}
                    <rect x="123" y="-80" width="30" height="340" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
                    <text x="138" y="90" fill="#475569" fontSize="9" fontWeight="800" textAnchor="middle" transform="rotate(-90 138 90)">Processo Variáveis (Dirhect)</text>

                    <rect x="153" y="-80" width="30" height="340" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="153" y1="120" x2="183" y2="120" stroke="#cbd5e1" strokeWidth="1" />
                    <text x="168" y="20" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 168 20)">Cliente</text>
                    <text x="168" y="190" fill="#475569" fontSize="9" fontWeight="700" textAnchor="middle" transform="rotate(-90 168 190)">Operação (BPO)</text>

                    <rect x="183" y="-80" width="857" height="200" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <rect x="183" y="120" width="857" height="140" fill="none" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Conectores e Linhas */}
                    {/* Start -> Verificar Upload */}
                    <line x1="264" y1="60" x2="325" y2="60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Verificar Upload -> Gateway Upload */}
                    <line x1="435" y1="60" x2="485" y2="60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Gateway Upload -> Anexar Arquivo */}
                    <line x1="535" y1="60" x2="585" y2="60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Gateway Upload -> Validar Envio (Sim/Upload Ok) */}
                    <line x1="510" y1="85" x2="510" y2="150" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Loop Anexar Arquivo -> Verificar Upload */}
                    <path d="M 640 30 V -40 H 380 V 30" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-variaveis)" />
                    {/* Validar Envio -> Gateway Aprovação */}
                    <line x1="565" y1="180" x2="615" y2="180" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Gateway Aprovação -> Confirmar Importação (Sim/True) */}
                    <line x1="665" y1="180" x2="695" y2="180" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Gateway Aprovação -> Anexar Arquivo (Não/False) */}
                    <line x1="640" y1="155" x2="640" y2="90" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Confirmar Importação -> Status */}
                    <line x1="805" y1="180" x2="825" y2="180" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />
                    {/* Status -> EndEvent */}
                    <line x1="935" y1="180" x2="976" y2="180" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-variaveis)" />

                    {/* Labels de Fluxo */}
                    <text x="520" y="110" fill="#475569" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Upload Ok</text>
                    <text x="680" y="172" fill="#16a34a" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Sim</text>
                    <text x="648" y="125" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="'Inter', sans-serif">Não</text>

                    {/* Pulsos de energia (Moving Dots) */}
                    <circle r="4.5" fill="#3b82f6" filter="url(#glow-variaveis)" className="bpm-moving-dot--variaveis bpm-dot-variaveis-1" />
                    <circle r="4.5" fill="#22c55e" filter="url(#glow-variaveis)" className="bpm-moving-dot--variaveis bpm-dot-variaveis-2" />

                    <circle r="3.5" fill="#f59e0b" filter="url(#glow-variaveis)" className="bpm-moving-loop-gateway-upload--variaveis" />
                    <circle r="3.5" fill="#ef4444" filter="url(#glow-variaveis)" className="bpm-moving-loop-gateway-aprovacao--variaveis" />

                    {/* Evento Inicial */}
                    <circle cx="250" cy="60" r="14" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2.5" />

                    {/* Evento Final */}
                    <circle cx="990" cy="180" r="14" fill="none" stroke="#16a34a" strokeWidth="3" />
                    <circle cx="990" cy="180" r="8" fill="#16a34a" />

                    {/* Gateway Upload */}
                    <g transform="translate(495, 45)">
                      <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    
                    {/* Gateway Aprovação */}
                    <g transform="translate(625, 165)">
                      <rect x="0" y="0" width="30" height="30" rx="3" transform="rotate(45 15 15)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M 8.5 8.5 L 21.5 21.5 M 21.5 8.5 L 8.5 21.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    <text x="640" y="212" fill="#475569" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Inter', sans-serif">Informações</text>
                    <text x="640" y="221" fill="#475569" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="'Inter', sans-serif">Estão Corretas?</text>

                    {/* Cartões de Tarefa */}
                    <BpmTaskCardVariaveis 
                      x={325} y={30} width={110} height={60} 
                      textLines={["Upload", "Executado?"]} 
                      type="orange" iconType="check" 
                    />
                    <BpmTaskCardVariaveis 
                      x={585} y={30} width={110} height={60} 
                      textLines={["Anexar Arquivo", "de Variáveis"]} 
                      type="orange" iconType="document" 
                    />
                    <BpmTaskCardVariaveis 
                      x={455} y={150} width={110} height={60} 
                      textLines={["Validar", "Informações"]} 
                      type="grey" iconType="check" 
                    />
                    <BpmTaskCardVariaveis 
                      x={695} y={150} width={110} height={60} 
                      textLines={["Confirmar", "Importação", "manual"]} 
                      type="grey" iconType="user" 
                    />
                    <BpmTaskCardVariaveis 
                      x={825} y={150} width={110} height={60} 
                      textLines={["Atualizar Status"]} 
                      type="green" iconType="check" 
                    />
                  </svg>
                ) : currentFlow === 'ferias' ? (
                  <div className="bpm-flow-placeholder" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--bpm-muted)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--bpm-navy)' }}>Fluxo de Férias</h3>
                    <p>Aguardando o envio do diagrama/SVG do fluxo de Férias pelo usuário.</p>
                  </div>
                ) : (
                  <div className="bpm-flow-placeholder" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--bpm-muted)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--bpm-navy)' }}>Fluxo de Desligamento</h3>
                    <p>Aguardando o envio do diagrama/SVG do fluxo de Desligamento pelo usuário.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Painel Inferior de Destaques / Benefícios em Formato Pill */}
            <div className="home-bpm-pills" role="group" aria-label="Benefícios do processo">
              <span className="home-bpm-pill-ic" aria-hidden>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>Mais agilidade</span>
              <span className="home-bpm-dot-pill" aria-hidden>•</span>
              <span>Menos retrabalho</span>
              <span className="home-bpm-dot-pill" aria-hidden>•</span>
              <span>Visão completa do processo</span>
              <span className="home-bpm-dot-pill" aria-hidden>•</span>
              <span>Conformidade garantida</span>
            </div>

          </div>

        </div>

        {/* Subtítulo centralizado em baixo de tudo */}
        <p className="home-bpm-subtitle-bottom">
          Com o <strong>Dirhect</strong> você tem todas as informações em um só lugar, independente do seu sistema de RH e DP
        </p>

      </div>
    </section>
  )
}

export default HomeBpmFold
