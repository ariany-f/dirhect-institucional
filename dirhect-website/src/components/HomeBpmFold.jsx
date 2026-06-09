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

const HomeBpmFold = ({ isStandalone = false }) => {
  return (
    <section className={`home-bpm-fold ${isStandalone ? 'home-bpm-fold--standalone' : ''}`} aria-labelledby="home-bpm-title">
      <div className={`home-bpm-container home-fold-container ${isStandalone ? 'home-bpm-container--standalone' : ''}`}>
        
        {isStandalone && (
          <h2 id="home-bpm-title" className="home-bpm-title home-bpm-title--centered">
            Transforme processos complexos <br className="home-bpm-title-br" /> em <span className="home-bpm-accent">fluxos automatizados</span>.
          </h2>
        )}

        {/* Card Principal */}
        <div className={`home-bpm-card ${isStandalone ? 'home-bpm-card--standalone' : ''}`}>
          
          {/* Lado Esquerdo - Copy e Grid de Funcionalidades */}
          {!isStandalone && (
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

          {/* Lado Direito - Mapeador BPMN Completo com as 4 Raias */}
          <div className="home-bpm-visual-section">
            
            {/* Bloco do Diagrama */}
            <div className="home-bpm-diagram-container">
              <div className="home-bpm-diagram-header">
                <div className="home-bpm-diagram-dot red"></div>
                <div className="home-bpm-diagram-dot yellow"></div>
                <div className="home-bpm-diagram-dot green"></div>
                <span className="home-bpm-diagram-title">Fluxo BPMN Admissional de Ponta a Ponta</span>
              </div>
              
              <div className="home-bpm-diagram-scroll-wrap">
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
          Crie regras, aprovações, validações e etapas personalizadas para que cada processo siga exatamente o fluxo definido pela sua empresa.
        </p>

      </div>
    </section>
  )
}

export default HomeBpmFold
