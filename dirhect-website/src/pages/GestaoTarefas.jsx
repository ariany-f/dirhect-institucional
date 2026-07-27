import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  ChevronRight, 
  Users, 
  Zap, 
  Database, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Sliders, 
  Settings, 
  CheckCircle2, 
  Check, 
  Filter, 
  Layers, 
  Repeat, 
  MessageSquare, 
  Paperclip, 
  Calendar, 
  Building2, 
  Briefcase, 
  UserCheck, 
  Workflow, 
  BellRing, 
  AlertCircle,
  HelpCircle,
  BarChart2,
  Share2,
  XCircle,
  Activity,
  ChevronDown,
  UserX,
  Folder,
  EyeOff,
  RefreshCw,
  Mail
} from 'lucide-react';
import './GestaoTarefas.css';
import Footer from '../components/Footer';

const GestaoTarefas = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [activeArea, setActiveArea] = useState(0);
  const [activeRule, setActiveRule] = useState(0);
  const [activeTabColab, setActiveTabColab] = useState('comentarios');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tasks dataset for Hero and Table View
  const allTasksData = [
    { id: 1, title: 'Conferir documentação do colaborador', process: 'Admissão Digital', category: 'admissao', resp: 'RH Operations', dept: 'Recursos Humanos', creation: '20/07/2026', deadline: '21/07/2026', priority: 'Alta', status: 'A fazer', statusClass: 'status-a-fazer', requestor: 'Sistema (Auto)', update: 'Há 10 min' },
    { id: 2, title: 'Aprovar solicitação de benefício', process: 'Gestão de Benefícios', category: 'beneficios', resp: 'Mariana Silva', dept: 'Gestão de Pessoas', creation: '19/07/2026', deadline: '22/07/2026', priority: 'Média', status: 'Aguardando aprovação', statusClass: 'status-aguardando', requestor: 'Carlos Eduardo', update: 'Há 1 hora' },
    { id: 3, title: 'Atualizar informações cadastrais', process: 'Movimentação Cadastral', category: 'dp', resp: 'Roberto Alves', dept: 'DP', creation: '18/07/2026', deadline: '23/07/2026', priority: 'Normal', status: 'Em andamento', statusClass: 'status-em-andamento', requestor: 'Portal Colaborador', update: 'Há 3 horas' },
    { id: 4, title: 'Validar movimentação de cargo', process: 'Alteração Contratual', category: 'operacoes', resp: 'Fernanda Lima', dept: 'Operações RH', creation: '17/07/2026', deadline: '19/07/2026', priority: 'Baixa', status: 'Concluída', statusClass: 'status-concluida', requestor: 'Gestor Direto', update: 'Ontem às 16:30' },
    { id: 5, title: 'Enviar dados para o sistema de folha', process: 'Fechamento de Folha', category: 'dp', resp: 'DP Squad', dept: 'Departamento Pessoal', creation: '15/07/2026', deadline: '18/07/2026', priority: 'Urgente', status: 'Em atraso', statusClass: 'status-em-atraso', requestor: 'Regra de Fechamento', update: 'Há 2 dias' }
  ];

  const filteredTasks = activeFilter === 'todos' 
    ? allTasksData 
    : allTasksData.filter(t => t.category === activeFilter);

  // Automation Rules Examples
  const automationRules = [
    {
      trigger: 'Mudança de Status de Admissão → Documentação Enviada',
      action: 'Validar Documentos e Assinatura do Contrato',
      assignee: 'Analista do Departamento Pessoal (Grupo DP)',
      desc: 'Criar uma tarefa automaticamente quando um novo colaborador envia a documentação de admissão.'
    },
    {
      trigger: 'Preenchimento de Formulário de Férias',
      action: 'Solicitar Aprovação do Gestor Direto',
      assignee: 'Gestor da Área',
      desc: 'Enviar notificação e tarefa de aprovação assim que o colaborador registra o período desejado.'
    },
    {
      trigger: 'Prazo de Vencimento de Exame Periódico (15 dias)',
      action: 'Agendar Exame Médico Ocupacional (ASO)',
      assignee: 'Equipe de Saúde e Segurança (SST)',
      desc: 'Alertar preventivamente a equipe antes da expiração do prazo legal.'
    },
    {
      trigger: 'Solicitação de Inclusão de Dependente em Plano de Saúde',
      action: 'Conferir Certidão e Enviar à Operadora',
      assignee: 'Especialista de Benefícios',
      desc: 'Gerar pendência de conferência de elegibilidade e cadastro na operadora.'
    }
  ];

  // Areas data for Section 12 (Tabbed Layout)
  const areasData = [
    {
      id: 0,
      title: 'Recursos Humanos',
      icon: <Users size={22} />,
      desc: 'Centralize a esteira de admissões, envio e validação de documentos, requerimentos de férias, movimentações de equipe e processos de desligamento.',
      tasks: ['Triagem de documentos de novos contratados', 'Agendamento de onboarding', 'Pesquisas de clima e acompanhamento de experiência']
    },
    {
      id: 1,
      title: 'Departamento Pessoal',
      icon: <FileText size={22} />,
      desc: 'Ganta precisão em conferências mensais, lançamentos de variáveis, aprovação de horas extras, fechamento de folha e transmissão de obrigações.',
      tasks: ['Conferência de relógio ponto', 'Exportação de rubricas de benefícios para a folha', 'Validação de atestados médicos']
    },
    {
      id: 2,
      title: 'Gestores & Liderança',
      icon: <UserCheck size={22} />,
      desc: 'Aprovação ágil de solicitações da equipe, acompanhamento de pendências do time e validação descentralizada de movimentações sem gargalos.',
      tasks: ['Aprovação de solicitações de férias', 'Validação de alteração de cargo/salário', 'Avaliação de período de experiência']
    },
    {
      id: 3,
      title: 'Administrativo',
      icon: <Briefcase size={22} />,
      desc: 'Organização de contratos corporativos, gestão de cadastros, controle de renovações de licenças, pagamentos operacionais e solicitações internas.',
      tasks: ['Renovação de contratos com fornecedores', 'Controle de assinaturas digitais', 'Solicitações de reembolsos corporativos']
    },
    {
      id: 4,
      title: 'Facilities e Serviços Gerais',
      icon: <Building2 size={22} />,
      desc: 'Acompanhamento de rotinas diárias e periódicas de limpeza, manutenção predial, inspeções de segurança, ordens de serviço e chamados prediais.',
      tasks: ['Inspeção mensal de extintores e segurança', 'Manutenção preventiva de ar-condicionado', 'Gestão de crachás e controle de acesso']
    },
    {
      id: 5,
      title: 'Financeiro',
      icon: <TrendingUp size={22} />,
      desc: 'Conferências de faturas de fornecedores e operadoras, aprovações de pagamentos, conciliação de benefícios e acompanhamento de prazos de vencimento.',
      tasks: ['Conciliação da fatura do plano de saúde', 'Aprovação de notas fiscais de terceiros', 'Envio de comprovantes de pagamento']
    }
  ];

  return (
    <div className="gestao-tarefas-page">
      {/* 1. HERO SECTION */}
      <section className="tarefas-hero">
        <div className="tarefas-hero-media" aria-hidden="true">
          <img
            className="tarefas-hero-image"
            src="/images/gestao-tarefas-hero.jpg"
            alt=""
            width={1200}
            height={800}
            decoding="async"
          />
          <div className="tarefas-hero-media-fade" />
        </div>

        <div className="container">
          <div className="tarefas-hero-grid">
            <div className="tarefas-hero-text">
              <div className="tarefas-mockup-badge">
                <Sparkles size={16} className="badge-icon" />
                <span className="badge-text">GESTÃO DE TAREFAS</span>
              </div>
              
              <h1>
                Transforme processos em tarefas <br />
                <span className="tarefas-highlight">claras, organizadas e acompanháveis</span>
              </h1>
              
              <p className="tarefas-hero-subtitle">
                Crie atividades, defina responsáveis e acompanhe cada etapa da operação em um único lugar. Com o Dirhect, sua equipe sabe exatamente o que fazer, quando fazer e o que precisa de atenção.
              </p>
              
              <div className="tarefas-hero-actions">
                <button onClick={() => scrollToSection('tarefas-visao-geral')} className="tarefas-mockup-btn-primary">
                  <span>Conheça a Gestão de Tarefas</span>
                  <span className="btn-circle-arrow">
                    <ArrowRight size={16} />
                  </span>
                </button>
              </div>

              <div className="tarefas-hero-microquote">
                <CheckCircle2 size={16} className="microquote-icon" />
                <span>Mais organização para a operação. Mais controle para os gestores.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Stripe */}
      <div className="tarefas-transition-stripe">
        <div className="stripe-track">
          <span className="stripe-item">Atribuição Inteligente</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Automação de Processos</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Rastreabilidade Total</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Gestão de Prazos</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Tarefas Recorrentes</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Histórico Unificado</span> <span className="star-divider">✦</span>
          <span className="stripe-item">Filtros Avançados</span>
        </div>
      </div>

      {/* 2. SEÇÃO DE PROBLEMA */}
      <section className="tarefas-problema">
        <div className="container">
          <div className="problema-layout-wrapper">
            {/* Left Column: Title, Subtitle, Woman with Floating Scattered App Badges */}
            <div className="problema-left-column">
              <div className="problema-header-text">
                <h2>
                  Quando as tarefas ficam espalhadas, <br />
                  a operação perde o controle
                </h2>
                <p>Atividades distribuídas por e-mail, planilhas, mensagens e sistemas diferentes dificultam o acompanhamento e aumentam o risco de atrasos, esquecimentos e retrabalho.</p>
              </div>

              {/* Woman Illustration with Floating Elements */}
              <div className="problema-woman-illustration">
                <div className="woman-bg-glow"></div>
                <img 
                  src="/images/frustrated_woman_user.png" 
                  alt="Colaboradora analisando tarefas espalhadas" 
                  className="problema-woman-img" 
                />

                {/* Floating app badges & scattered notification cards */}
                <div className="floating-app-badge app-excel" title="Planilhas de Controle">
                  <span className="excel-symbol">X</span>
                </div>
                <div className="floating-app-badge app-mail" title="Solicitações por E-mail">
                  <Mail size={16} />
                </div>
                <div className="floating-app-badge app-chat" title="Mensagens Descentralizadas">
                  <MessageSquare size={16} />
                </div>

                <div className="floating-scattered-card card-top">
                  <div className="card-line long"></div>
                  <div className="card-line short"></div>
                </div>

                <div className="floating-scattered-card card-middle">
                  <div className="card-line long"></div>
                </div>

                <div className="floating-scattered-card card-bottom">
                  <div className="card-line medium"></div>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Problem Columns in Row + Bottom Banner */}
            <div className="problema-right-column">
              <div className="problema-five-columns-grid">
                {/* Item 1 */}
                <div className="problema-col-item">
                  <div className="problem-glowing-icon">
                    <UserX size={26} />
                  </div>
                  <h3>Falta de responsáveis definidos</h3>
                  <p>As atividades são solicitadas, mas ninguém sabe claramente quem deve executá-las.</p>
                </div>

                {/* Item 2 */}
                <div className="problema-col-item">
                  <div className="problem-glowing-icon">
                    <Clock size={26} />
                  </div>
                  <h3>Prazos perdidos</h3>
                  <p>Sem acompanhamento centralizado, tarefas importantes podem ser esquecidas ou concluídas fora do prazo.</p>
                </div>

                {/* Item 3 */}
                <div className="problema-col-item">
                  <div className="problem-glowing-icon">
                    <Folder size={26} />
                  </div>
                  <h3>Informações espalhadas</h3>
                  <p>E-mails, planilhas e mensagens tornam difícil localizar orientações, documentos e históricos.</p>
                </div>

                {/* Item 4 */}
                <div className="problema-col-item">
                  <div className="problem-glowing-icon">
                    <EyeOff size={26} />
                  </div>
                  <h3>Pouca visibilidade</h3>
                  <p>Os gestores não conseguem identificar rapidamente o que está parado ou precisa de atenção.</p>
                </div>

                {/* Item 5 */}
                <div className="problema-col-item">
                  <div className="problem-glowing-icon">
                    <RefreshCw size={26} />
                  </div>
                  <h3>Retrabalho entre equipes</h3>
                  <p>A falta de organização faz com que informações sejam solicitadas e preenchidas mais de uma vez.</p>
                </div>
              </div>

              {/* Bottom Resolution Banner */}
              <div className="problema-resolution-banner">
                <p>Com o <strong>Dirhect</strong>, cada atividade passa a fazer parte de um fluxo organizado e rastreável.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISÃO GERAL DA SOLUÇÃO */}
      <section className="tarefas-solucao-geral" id="tarefas-visao-geral">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">VISÃO GERAL DA SOLUÇÃO</span>
            <h2>Todas as tarefas da operação em um único ambiente</h2>
            <p>Os gestores conseguem visualizar toda a operação, enquanto cada colaborador acompanha apenas as atividades relacionadas à sua rotina.</p>
          </div>

          {/* Filterable Visual Dashboard Representation */}
          <div className="tarefas-dashboard-mockup">
            <div className="dashboard-top-bar">
              <div className="dashboard-title-group">
                <CheckSquare size={20} className="dash-icon" />
                <h3>Painel Geral de Tarefas</h3>
              </div>
              <div className="dashboard-filters-chips">
                <span className="filter-label"><Filter size={14} /> Filtrar por:</span>
                <span 
                  className={`chip ${activeFilter === 'todos' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('todos')}
                >
                  Todos
                </span>
                <span 
                  className={`chip ${activeFilter === 'admissao' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('admissao')}
                >
                  Admissão
                </span>
                <span 
                  className={`chip ${activeFilter === 'beneficios' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('beneficios')}
                >
                  Benefícios
                </span>
                <span 
                  className={`chip ${activeFilter === 'dp' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('dp')}
                >
                  DP / Folha
                </span>
                <span 
                  className={`chip ${activeFilter === 'operacoes' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('operacoes')}
                >
                  Operações
                </span>
              </div>
            </div>

            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Nome da Tarefa</th>
                    <th>Processo Relacionado</th>
                    <th>Responsável</th>
                    <th>Área / Depto</th>
                    <th>Criação</th>
                    <th>Prazo</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Solicitante</th>
                    <th>Atualização</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map(task => (
                    <tr key={task.id}>
                      <td className="task-name-cell">{task.title}</td>
                      <td>{task.process}</td>
                      <td><span className="user-badge">{task.resp}</span></td>
                      <td>{task.dept}</td>
                      <td>{task.creation}</td>
                      <td>{task.deadline}</td>
                      <td>
                        <span className={`prio-tag prio-${task.priority.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td><span className={`status-tag ${task.statusClass}`}>{task.status}</span></td>
                      <td>{task.requestor}</td>
                      <td>{task.update}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </section>

      {/* 4. COMO FUNCIONA (FLUXO) */}
      <section className="tarefas-como-funciona" id="tarefas-funcionalidades">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">COMO FUNCIONA</span>
            <h2>Da solicitação à conclusão, tudo fica registrado</h2>
            <p>Um fluxo contínuo onde a conclusão de uma tarefa aciona automaticamente o próximo passo da operação.</p>
          </div>

          <div className="tarefas-flow-grid">
            <div className="flow-card">
              <div className="flow-card-number">01</div>
              <div className="flow-card-icon"><FileText size={24} /></div>
              <h3>Criação</h3>
              <p>A tarefa pode ser criada manualmente ou gerada automaticamente a partir de um processo realizado no Dirhect.</p>
              <div className="flow-card-arrow"><ChevronRight size={20} /></div>
            </div>

            <div className="flow-card">
              <div className="flow-card-number">02</div>
              <div className="flow-card-icon"><Users size={24} /></div>
              <h3>Distribuição</h3>
              <p>A atividade é direcionada para uma pessoa, equipe, área ou perfil responsável.</p>
              <div className="flow-card-arrow"><ChevronRight size={20} /></div>
            </div>

            <div className="flow-card">
              <div className="flow-card-number">03</div>
              <div className="flow-card-icon"><BellRing size={24} /></div>
              <h3>Notificação</h3>
              <p>O responsável recebe a tarefa com as informações, orientações e prazo para execução.</p>
              <div className="flow-card-arrow"><ChevronRight size={20} /></div>
            </div>

            <div className="flow-card">
              <div className="flow-card-number">04</div>
              <div className="flow-card-icon"><Sliders size={24} /></div>
              <h3>Execução</h3>
              <p>A atividade é realizada dentro do fluxo, com possibilidade de anexar documentos, registrar informações e adicionar observações.</p>
              <div className="flow-card-arrow"><ChevronRight size={20} /></div>
            </div>

            <div className="flow-card">
              <div className="flow-card-number">05</div>
              <div className="flow-card-icon"><ShieldCheck size={24} /></div>
              <h3>Validação</h3>
              <p>Quando necessário, a tarefa pode ser encaminhada para análise ou aprovação de outro responsável.</p>
              <div className="flow-card-arrow"><ChevronRight size={20} /></div>
            </div>

            <div className="flow-card highlight-step">
              <div className="flow-card-number">06</div>
              <div className="flow-card-icon"><CheckCircle2 size={24} /></div>
              <h3>Conclusão</h3>
              <p>A atividade é finalizada e permanece registrada no histórico do processo, podendo disparar a próxima etapa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TAREFAS INTEGRADAS AOS PROCESSOS */}
      <section className="tarefas-integradas-processos">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">INTEGRAÇÃO DE PROCESSOS</span>
            <h2>Muito mais do que uma lista de tarefas</h2>
            <p>No Dirhect, as atividades podem ser criadas automaticamente conforme os processos avançam. Assim, cada etapa gera a tarefa certa para a pessoa responsável, no momento adequado.</p>
          </div>

          <div className="processos-examples-grid">
            {[
              'Admissão de colaboradores',
              'Gestão de benefícios',
              'Movimentações cadastrais',
              'Férias e afastamentos',
              'Desligamentos',
              'Aprovações internas',
              'Solicitações dos colaboradores',
              'Conferência de documentos',
              'Integrações com outros sistemas',
              'Processos administrativos'
            ].map((ex, idx) => (
              <div key={idx} className="processo-chip-item">
                <CheckCircle2 size={16} className="chip-icon" />
                <span>{ex}</span>
              </div>
            ))}
          </div>

          <div className="processos-highlight-callout">
            <p>O processo avança, as tarefas são distribuídas e cada responsável recebe exatamente o que precisa executar.</p>
          </div>

          {/* Process Distribution Diagram */}
          <div className="processos-diagram-container">
            <div className="diagram-center-node">
              <Workflow size={32} />
              <span>Processo Central Dirhect</span>
            </div>

            <div className="diagram-branches">
              <div className="branch-node">
                <div className="branch-icon"><Users size={20} /></div>
                <h4>RH Operations</h4>
                <p>Tarefas de Documentação & Triagem</p>
              </div>

              <div className="branch-node">
                <div className="branch-icon"><FileText size={20} /></div>
                <h4>Dept. Pessoal</h4>
                <p>Tarefas de Folha & Contratos</p>
              </div>

              <div className="branch-node">
                <div className="branch-icon"><UserCheck size={20} /></div>
                <h4>Gestor Direto</h4>
                <p>Aprovações & Acompanhamento</p>
              </div>

              <div className="branch-node">
                <div className="branch-icon"><UserCheck size={20} /></div>
                <h4>Colaborador</h4>
                <p>Envio de Dados & Assinatura</p>
              </div>

              <div className="branch-node">
                <div className="branch-icon"><Building2 size={20} /></div>
                <h4>Fornecedores</h4>
                <p>Solicitação de Planos & Serviços</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUTOMAÇÃO DE TAREFAS */}
      <section className="tarefas-automacao">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">AUTOMAÇÃO</span>
            <h2>Tarefas criadas automaticamente no momento certo</h2>
            <p>Configure regras para que novas atividades sejam geradas conforme eventos, prazos ou mudanças de status ocorram dentro dos processos.</p>
          </div>

          <div className="automacao-split">
            {/* Left Rules Selector */}
            <div className="automacao-rules-list">
              {automationRules.map((rule, idx) => (
                <div 
                  key={idx} 
                  className={`automacao-rule-item ${activeRule === idx ? 'active' : ''}`}
                  onClick={() => setActiveRule(idx)}
                >
                  <div className="rule-bullet"><Zap size={14} /></div>
                  <div className="rule-text-block">
                    <span className="rule-title-text">{rule.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Visual Representation: Rule Builder */}
            <div className="automacao-visual-builder">
              <div className="builder-card">
                <div className="builder-header">
                  <Zap size={20} className="builder-icon" />
                  <span>Simulador de Automação de Tarefa</span>
                </div>
                
                <div className="builder-steps">
                  <div className="builder-step">
                    <span className="step-label">QUANDO ISSO ACONTECER</span>
                    <div className="step-box trigger">
                      <span>{automationRules[activeRule].trigger}</span>
                    </div>
                  </div>

                  <div className="builder-connector-arrow">↓</div>

                  <div className="builder-step">
                    <span className="step-label">CRIAR ESTA TAREFA</span>
                    <div className="step-box action">
                      <span>{automationRules[activeRule].action}</span>
                    </div>
                  </div>

                  <div className="builder-connector-arrow">↓</div>

                  <div className="builder-step">
                    <span className="step-label">ATRIBUIR A ESTE RESPONSÁVEL</span>
                    <div className="step-box assignee">
                      <span>{automationRules[activeRule].assignee}</span>
                    </div>
                  </div>
                </div>

                <div className="builder-badge">
                  <CheckCircle2 size={16} /> Regra Ativa & Disparo Automático
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 8. PRIORIDADES E PRAZOS */}
      <section className="tarefas-prioridades">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">PRIORIDADES E PRAZOS</span>
            <h2>Saiba o que precisa de atenção primeiro</h2>
            <p>Organize as atividades por prazo, prioridade e impacto na operação, permitindo que a equipe concentre seus esforços nas demandas mais importantes.</p>
          </div>

          {/* Indicators Showcase Row */}
          <div className="prioridades-status-bar">
            <span className="prio-pill prio-alta"><AlertTriangle size={14} /> Alta prioridade</span>
            <span className="prio-pill prio-proximo"><Clock size={14} /> Prazo próximo</span>
            <span className="prio-pill prio-andamento"><Sliders size={14} /> Em andamento</span>
            <span className="prio-pill prio-retorno"><HelpCircle size={14} /> Aguardando retorno</span>
            <span className="prio-pill prio-atraso"><XCircle size={14} /> Em atraso</span>
            <span className="prio-pill prio-concluida"><CheckCircle2 size={14} /> Concluída</span>
          </div>

          {/* 3 Core Benefits Cards */}
          <div className="prioridades-benefits-grid">
            <div className="prio-benefit-card">
              <div className="prio-benefit-icon"><AlertTriangle size={24} /></div>
              <h3>Prioridades claras</h3>
              <p>A equipe identifica rapidamente quais atividades precisam ser executadas primeiro.</p>
            </div>

            <div className="prio-benefit-card">
              <div className="prio-benefit-icon"><Clock size={24} /></div>
              <h3>Controle de prazos</h3>
              <p>Os responsáveis acompanham as datas de entrega e recebem alertas sobre pendências.</p>
            </div>

            <div className="prio-benefit-card">
              <div className="prio-benefit-icon"><BarChart2 size={24} /></div>
              <h3>Visão das tarefas atrasadas</h3>
              <p>Os gestores identificam atividades paradas antes que prejudiquem o restante do processo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GESTÃO DA EQUIPE */}
      <section className="tarefas-gestao-equipe">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">VISIBILIDADE GERENCIAL</span>
            <h2>Acompanhe a operação sem microgerenciar as pessoas</h2>
            <p>Tenha visibilidade sobre as tarefas da equipe, os prazos e os pontos de atenção sem precisar solicitar atualizações constantemente.</p>
          </div>

          {/* Conceptual Panel Layout */}
          <div className="equipe-panel-conceptual">
            <div className="panel-header">
              <BarChart2 size={20} className="panel-icon" />
              <span>Visão Executiva do Painel de Operações (Painel Conceitual)</span>
            </div>

            <div className="panel-grid">
              <div className="panel-widget">
                <h4>Tarefas por responsável</h4>
                <p className="widget-desc">Visão consolidada da carga de trabalho por membro da equipe</p>
                <div className="widget-bar-simulated">
                  <div className="bar-fill" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="panel-widget">
                <h4>Tarefas por departamento</h4>
                <p className="widget-desc">Distribuição de demandas por setor operacional</p>
                <div className="widget-bar-simulated">
                  <div className="bar-fill" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="panel-widget">
                <h4>Quantidade em andamento</h4>
                <p className="widget-desc">Acompanhamento em tempo real das filas ativas</p>
                <div className="widget-status-badge status-andamento">Operação Ativa</div>
              </div>

              <div className="panel-widget">
                <h4>Atividades concluídas</h4>
                <p className="widget-desc">Histórico completo de entregas do período</p>
                <div className="widget-status-badge status-concluido">Entregas Validadas</div>
              </div>

              <div className="panel-widget">
                <h4>Demandas atrasadas</h4>
                <p className="widget-desc">Alertas visuais imediatos de pendências fora do prazo</p>
                <div className="widget-status-badge status-atraso">Prazos em Monitoramento</div>
              </div>

              <div className="panel-widget">
                <h4>Tempo médio de conclusão</h4>
                <p className="widget-desc">Análise contínua do ciclo de entrega por tipo de processo</p>
                <div className="widget-status-badge status-tempo">Métricas de SLAs</div>
              </div>

              <div className="panel-widget">
                <h4>Volume por período</h4>
                <p className="widget-desc">Comparativos temporais de volume de requisições</p>
                <div className="widget-status-badge status-volume">Histórico Disponível</div>
              </div>

              <div className="panel-widget">
                <h4>Gargalos no processo</h4>
                <p className="widget-desc">Identificação automática de etapas com acúmulo de tarefas</p>
                <div className="widget-status-badge status-gargalo">Pontos de Atenção</div>
              </div>
            </div>
          </div>

          <div className="gestao-equipe-footer-text">
            <p>Com uma visão centralizada, os gestores conseguem redistribuir demandas, identificar gargalos e apoiar as equipes nos pontos que realmente precisam de atenção.</p>
          </div>
        </div>
      </section>

      {/* 10. COLABORAÇÃO E HISTÓRICO */}
      <section className="tarefas-colaboracao">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">COLABORAÇÃO E AUDITORIA</span>
            <h2>Todas as informações ficam dentro da tarefa</h2>
            <p>Centralize orientações, comentários, documentos e atualizações para que todos os envolvidos tenham acesso ao contexto necessário.</p>
          </div>

          {/* Interactive Task Details Card Showcase */}
          <div className="colaboracao-interactive-showcase">
            <div className="colab-task-card">
              <div className="colab-task-header">
                <div className="colab-task-title-area">
                  <CheckSquare size={18} className="colab-title-icon" />
                  <h4>Tarefa #4028 — Conferir Documentação de Admissão</h4>
                </div>
                <span className="colab-badge-status">Em andamento</span>
              </div>

              {/* Colab Tabs Navigation */}
              <div className="colab-tabs-bar">
                <button 
                  className={`colab-tab-btn ${activeTabColab === 'comentarios' ? 'active' : ''}`}
                  onClick={() => setActiveTabColab('comentarios')}
                >
                  <MessageSquare size={14} /> Comentários & Notações
                </button>
                <button 
                  className={`colab-tab-btn ${activeTabColab === 'anexos' ? 'active' : ''}`}
                  onClick={() => setActiveTabColab('anexos')}
                >
                  <Paperclip size={14} /> Anexos e Documentos (2)
                </button>
                <button 
                  className={`colab-tab-btn ${activeTabColab === 'historico' ? 'active' : ''}`}
                  onClick={() => setActiveTabColab('historico')}
                >
                  <Clock size={14} /> Histórico de Alterações
                </button>
              </div>

              {/* Colab Tab Content Area */}
              <div className="colab-tab-body">
                {activeTabColab === 'comentarios' && (
                  <div className="colab-comments-list">
                    <div className="comment-item">
                      <div className="comment-avatar">RH</div>
                      <div className="comment-content">
                        <span className="comment-user">Analista de Admissão — <strong>Mariana Silva</strong> <span className="comment-time">às 10:15</span></span>
                        <p>Documento de identidade validado. Faltando comprovante de residência atualizado (últimos 90 dias).</p>
                      </div>
                    </div>
                    <div className="comment-item">
                      <div className="comment-avatar user-colab">DP</div>
                      <div className="comment-content">
                        <span className="comment-user">Departamento Pessoal — <strong>Roberto Alves</strong> <span className="comment-time">às 11:30</span></span>
                        <p>Comprovante reenviado pelo colaborador e aprovado no sistema. Tarefa pronta para conclusão.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabColab === 'anexos' && (
                  <div className="colab-attachments-list">
                    <div className="attachment-file-item">
                      <Paperclip size={16} className="att-icon" />
                      <span>RG_E_CPF_COLABORADOR.pdf</span>
                      <span className="file-size">2.4 MB</span>
                    </div>
                    <div className="attachment-file-item">
                      <Paperclip size={16} className="att-icon" />
                      <span>COMPROVANTE_RESIDENCIA.pdf</span>
                      <span className="file-size">1.1 MB</span>
                    </div>
                  </div>
                )}

                {activeTabColab === 'historico' && (
                  <div className="colab-history-timeline">
                    <div className="history-step-item">
                      <Clock size={14} className="hist-icon" />
                      <span>20/07/2026 09:00 — Tarefa criada automaticamente pelo Processo de Admissão</span>
                    </div>
                    <div className="history-step-item">
                      <Clock size={14} className="hist-icon" />
                      <span>20/07/2026 10:15 — Status alterado para "Aguardando Ajuste" por Mariana Silva</span>
                    </div>
                    <div className="history-step-item">
                      <Clock size={14} className="hist-icon" />
                      <span>20/07/2026 11:30 — Documento anexado e Status alterado para "Em andamento"</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="colaboracao-resources-grid">
            {[
              { title: 'Comentários e observações', desc: 'Troca de mensagens contextualizada dentro da própria atividade.', icon: <MessageSquare size={20} /> },
              { title: 'Anexos e documentos', desc: 'Upload de arquivos necessários para a validação do processo.', icon: <Paperclip size={20} /> },
              { title: 'Histórico de alterações', desc: 'Registro detalhado de cada alteração de status, campo ou prioridade.', icon: <Clock size={20} /> },
              { title: 'Registro de responsáveis', desc: 'Rastreabilidade total de quem atribuiu e quem assumiu a demanda.', icon: <UserCheck size={20} /> },
              { title: 'Data e horário das ações', desc: 'Timestamps precisos para auditoria e conformidade com compliance.', icon: <Calendar size={20} /> },
              { title: 'Solicitações de ajustes', desc: 'Devoluções orientadas caso falte alguma informação no fluxo.', icon: <HelpCircle size={20} /> },
              { title: 'Aprovações e devoluções', desc: 'Fluxo estruturado para aceite ou recusa fundamentada.', icon: <ShieldCheck size={20} /> },
              { title: 'Registro da conclusão', desc: 'Formalização do encerramento com evidências armazenadas.', icon: <CheckCircle2 size={20} /> }
            ].map((item, idx) => (
              <div key={idx} className="colaboracao-card-item">
                <div className="colaboracao-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="colaboracao-highlight-callout">
            <p>Menos mensagens espalhadas e mais contexto disponível para toda a equipe.</p>
          </div>
        </div>
      </section>

      {/* 11. TAREFAS RECORRENTES */}
      <section className="tarefas-recorrentes">
        <div className="container">
          <div className="recorrentes-section-layout">
            
            {/* Left Column: Copy and Widget mockup */}
            <div className="recorrentes-copy-side">
              <div className="section-header align-left">
                <span className="section-tag">ROTINAS RECORRENTES</span>
                <h2>Organize também as atividades que se repetem</h2>
                <p>Crie tarefas recorrentes para rotinas diárias, semanais, mensais ou anuais, garantindo que atividades importantes não sejam esquecidas.</p>
              </div>

              {/* Recurrence Config Widget Mockup */}
              <div className="recurrence-widget-mockup">
                <div className="widget-header">
                  <Repeat size={16} className="widget-icon-orange" />
                  <span>Configurar Recorrência</span>
                </div>
                <div className="widget-form-row">
                  <div className="form-group">
                    <label>Frequência</label>
                    <div className="select-mock">Mensal</div>
                  </div>
                  <div className="form-group">
                    <label>Repetir a cada</label>
                    <div className="select-mock">1 mês</div>
                  </div>
                  <div className="form-group">
                    <label>Dia do disparo</label>
                    <div className="select-mock">Dia 05</div>
                  </div>
                </div>
                <div className="widget-footer">
                  <div className="active-recurrence-badge">
                    <Clock size={12} /> Próximo disparo: 05/08 às 08:00
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Cards list of recurrent routines */}
            <div className="recorrentes-cards-side">
              <div className="recorrentes-cards-container">
                {[
                  { title: 'Conferências mensais', type: 'Mensal', day: 'Dia 30', icon: <FileText size={18} />, colorClass: 'badge-mensal' },
                  { title: 'Fechamentos periódicos', type: 'Trimestral', day: 'Dia 10', icon: <TrendingUp size={18} />, colorClass: 'badge-trimestral' },
                  { title: 'Atualizações cadastrais', type: 'Semanal', day: 'Toda Seg', icon: <Users size={18} />, colorClass: 'badge-semanal' },
                  { title: 'Verificação de documentos', type: 'Diário', day: 'Todo dia', icon: <ShieldCheck size={18} />, colorClass: 'badge-diario' },
                  { title: 'Processos de folha', type: 'Mensal', day: 'Dia 25', icon: <Briefcase size={18} />, colorClass: 'badge-mensal' },
                  { title: 'Revisões de benefícios', type: 'Anual', day: 'Jan', icon: <Activity size={18} />, colorClass: 'badge-anual' },
                  { title: 'Manutenções e inspeções', type: 'Semanal', day: 'Toda Sex', icon: <Settings size={18} />, colorClass: 'badge-semanal' },
                  { title: 'Relatórios e controles internos', type: 'Mensal', day: 'Dia 05', icon: <FileText size={18} />, colorClass: 'badge-mensal' }
                ].map((item, idx) => (
                  <div key={idx} className="recorrente-card-item">
                    <div className="card-item-left">
                      <div className="item-icon-wrapper">{item.icon}</div>
                      <div className="item-text-info">
                        <h4>{item.title}</h4>
                        <span>Próximo: {item.day}</span>
                      </div>
                    </div>
                    <span className={`recurrence-badge ${item.colorClass}`}>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. TAREFAS PARA DIFERENTES ÁREAS (Tabbed Component) */}
      <section className="tarefas-areas">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">ÁREAS OPERACIONAIS</span>
            <h2>Uma gestão de tarefas que acompanha toda a operação</h2>
            <p>Selecione a área para explorar os exemplos de tarefas organizadas pela plataforma:</p>
          </div>

          {/* Interactive Area Tabs */}
          <div className="areas-tab-navigation">
            {areasData.map(area => (
              <button
                key={area.id}
                className={`area-tab-btn ${activeArea === area.id ? 'active' : ''}`}
                onClick={() => setActiveArea(area.id)}
              >
                {area.icon}
                <span>{area.title}</span>
              </button>
            ))}
          </div>

          {/* Active Area Card Details */}
          <div className="area-active-detail-card">
            <div className="area-detail-header">
              <div className="area-detail-icon">
                {areasData[activeArea].icon}
              </div>
              <div className="area-detail-title-block">
                <h3>{areasData[activeArea].title}</h3>
                <p>{areasData[activeArea].desc}</p>
              </div>
            </div>

            <div className="area-tasks-examples-list">
              <h4>Exemplos de Tarefas Mapeadas no Dirhect:</h4>
              <div className="area-tasks-grid">
                {areasData[activeArea].tasks.map((taskEx, idx) => (
                  <div key={idx} className="area-task-pill">
                    <CheckCircle2 size={16} className="task-pill-icon" />
                    <span>{taskEx}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 14. BENEFÍCIOS */}
      <section className="tarefas-beneficios-chaves">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">VANTAGENS COMPETITIVAS</span>
            <h2>Mais produtividade sem perder o controle</h2>
          </div>

          <div className="beneficios-chaves-grid">
            {[
              { title: 'Centralização', desc: 'Todas as tarefas, informações e atualizações ficam organizadas em um único lugar.' },
              { title: 'Responsabilidades claras', desc: 'Cada atividade possui um responsável, um prazo e um status definido.' },
              { title: 'Menos atrasos', desc: 'As equipes acompanham suas pendências e identificam o que precisa de atenção.' },
              { title: 'Mais rastreabilidade', desc: 'Todas as alterações e movimentações permanecem registradas.' },
              { title: 'Processos padronizados', desc: 'As atividades seguem regras e etapas consistentes em toda a empresa.' },
              { title: 'Menos trabalho manual', desc: 'Tarefas podem ser criadas e distribuídas automaticamente conforme o processo avança.' },
              { title: 'Mais visibilidade', desc: 'Os gestores acompanham a operação sem depender de planilhas ou atualizações manuais.' },
              { title: 'Melhor colaboração', desc: 'Todas as informações necessárias permanecem dentro do contexto da atividade.' }
            ].map((b, idx) => (
              <div key={idx} className="beneficio-chave-card">
                <div className="chave-check-bullet">
                  <Check size={14} />
                </div>
                <div className="chave-card-content">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. COMPARAÇÃO (ANTES vs COM O DIRHECT) */}
      <section className="tarefas-comparacao">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">TRANSFORMAÇÃO</span>
            <h2>O que muda com a Gestão de Tarefas do Dirhect</h2>
          </div>

          <div className="comparacao-split-grid">
            {/* Column Antes */}
            <div className="comparacao-col col-antes">
              <div className="col-header">
                <XCircle size={24} className="col-icon" />
                <h3>Antes do Dirhect</h3>
              </div>
              <ul className="comparacao-list">
                <li><XCircle size={16} className="list-icon-neg" /> Tarefas enviadas por e-mail ou mensagem</li>
                <li><XCircle size={16} className="list-icon-neg" /> Controles separados em planilhas</li>
                <li><XCircle size={16} className="list-icon-neg" /> Responsabilidades pouco claras</li>
                <li><XCircle size={16} className="list-icon-neg" /> Dificuldade para acompanhar prazos</li>
                <li><XCircle size={16} className="list-icon-neg" /> Informações espalhadas</li>
                <li><XCircle size={16} className="list-icon-neg" /> Atividades esquecidas</li>
                <li><XCircle size={16} className="list-icon-neg" /> Pouca visibilidade sobre a operação</li>
                <li><XCircle size={16} className="list-icon-neg" /> Dependência de cobranças manuais</li>
              </ul>
            </div>

            {/* Column Com o Dirhect */}
            <div className="comparacao-col col-dirhect">
              <div className="col-header">
                <CheckCircle2 size={24} className="col-icon" />
                <h3>Com o Dirhect</h3>
              </div>
              <ul className="comparacao-list">
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Atividades centralizadas</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Responsáveis e prazos definidos</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Tarefas integradas aos processos</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Acompanhamento em tempo real</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Histórico completo das ações</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Alertas sobre pendências</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Visão centralizada da equipe</li>
                <li><CheckCircle2 size={16} className="list-icon-pos" /> Distribuição automática das atividades</li>
              </ul>
            </div>
          </div>

          <div className="comparacao-highlight-banner">
            <p>Sua equipe deixa de procurar o que precisa fazer e passa a executar cada atividade no momento certo.</p>
          </div>
        </div>
      </section>

      {/* 16. CTA FINAL */}
      <section className="tarefas-cta-final">
        <div className="container">
          <div className="tarefas-cta-content">
            <div className="tarefas-cta-text">
              <h2>Organize as tarefas e mantenha toda a operação em movimento</h2>
            </div>
            
            <div className="tarefas-cta-actions">
              <Link to="/demo" className="tarefas-mockup-btn-primary final-cta-btn">
                <span>Fale com um especialista</span>
                <span className="btn-circle-arrow">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GestaoTarefas;