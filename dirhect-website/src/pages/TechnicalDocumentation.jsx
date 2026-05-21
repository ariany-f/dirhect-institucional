import { useState } from 'react'
import { ArrowLeft, Download, Code, Database, Shield, CheckCircle, Copy, ExternalLink, Book, Terminal, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import './TechnicalDocumentation.css'

const TechnicalDocumentation = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const integrations = [
    {
      id: 'sap',
      name: 'SAP HCM',
      description: 'Integração completa com módulos SAP HCM',
      endpoints: [
        { method: 'GET', path: '/api/sap/employees', description: 'Lista funcionários' },
        { method: 'POST', path: '/api/sap/sync', description: 'Sincronização manual' },
        { method: 'GET', path: '/api/sap/structure', description: 'Estrutura organizacional' }
      ]
    },
    {
      id: 'totvs',
      name: 'TOTVS RM',
      description: 'Conexão direta com TOTVS RM',
      endpoints: [
        { method: 'GET', path: '/api/totvs/employees', description: 'Lista funcionários' },
        { method: 'POST', path: '/api/totvs/benefits', description: 'Sincronizar benefícios' },
        { method: 'GET', path: '/api/totvs/timesheet', description: 'Dados de ponto' }
      ]
    }
  ]

  const codeExamples = {
    authentication: `// Autenticação via API Key
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json',
  'X-API-Version': '1.0'
}

// Exemplo de requisição
fetch('https://api.dirhect.com/v1/sap/employees', {
  method: 'GET',
  headers: headers
})
.then(response => response.json())
.then(data => console.log(data))`,

    sapSync: `// Sincronização com SAP HCM
const syncSAPData = async () => {
  try {
    const response = await fetch('/api/sap/sync', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modules: ['PA', 'OM', 'PY'], // Personnel, Org Management, Payroll
        dateRange: {
          from: '2024-01-01',
          to: '2024-12-31'
        }
      })
    })
    
    const result = await response.json()
    console.log('Sincronização concluída:', result)
  } catch (error) {
    console.error('Erro na sincronização:', error)
  }
}`,

    totvsIntegration: `// Integração com TOTVS RM
const getTOTVSEmployees = async () => {
  const response = await fetch('/api/totvs/employees', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'X-Company-Code': 'YOUR_COMPANY_CODE'
    }
  })
  
  return await response.json()
}

// Sincronizar benefícios
const syncBenefits = async (employeeId) => {
  return await fetch('/api/totvs/benefits', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      employeeId: employeeId,
      syncType: 'full' // ou 'incremental'
    })
  })
}`
  }

  return (
    <>
      <Header />
      <div className="technical-docs">
        {/* Hero Section */}
        <section className="docs-hero">
          <div className="docs-container">
            <Link to="/" className="back-button">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Site</span>
            </Link>
            
            <div className="docs-hero-content">
              <div className="docs-badge">
                <Book className="w-4 h-4" />
                <span>Documentação Técnica</span>
              </div>
              <h1 className="docs-title">
                Integração <span className="gradient-text">Dirhect API</span>
              </h1>
              <p className="docs-subtitle">
                Documentação completa para integração com SAP, TOTVS RM e outros sistemas empresariais
              </p>
              
              <div className="docs-stats">
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Integrações</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Endpoints</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="docs-navigation">
          <div className="docs-container">
            <div className="docs-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <Database className="w-4 h-4" />
                <span>Visão Geral</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'authentication' ? 'active' : ''}`}
                onClick={() => setActiveTab('authentication')}
              >
                <Shield className="w-4 h-4" />
                <span>Autenticação</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'endpoints' ? 'active' : ''}`}
                onClick={() => setActiveTab('endpoints')}
              >
                <Terminal className="w-4 h-4" />
                <span>Endpoints</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'examples' ? 'active' : ''}`}
                onClick={() => setActiveTab('examples')}
              >
                <Code className="w-4 h-4" />
                <span>Exemplos</span>
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="docs-content">
          <div className="docs-container">
            {activeTab === 'overview' && (
              <div className="content-section">
                <h2>Visão Geral das Integrações</h2>
                <p>A API Dirhect oferece integrações robustas e seguras com os principais ERPs do mercado.</p>
                
                <div className="integration-cards">
                  {integrations.map(integration => (
                    <div key={integration.id} className="integration-doc-card">
                      <h3>{integration.name}</h3>
                      <p>{integration.description}</p>
                      <div className="endpoints-preview">
                        <h4>Endpoints disponíveis:</h4>
                        <ul>
                          {integration.endpoints.map((endpoint, idx) => (
                            <li key={idx}>
                              <span className={`method ${endpoint.method.toLowerCase()}`}>
                                {endpoint.method}
                              </span>
                              <code>{endpoint.path}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="requirements-section">
                  <h3>Requisitos Técnicos</h3>
                  <div className="requirements-grid">
                    <div className="requirement-item">
                      <CheckCircle className="w-5 h-5" />
                      <span>HTTPS obrigatório para todas as requisições</span>
                    </div>
                    <div className="requirement-item">
                      <CheckCircle className="w-5 h-5" />
                      <span>API Key válida fornecida pela equipe Dirhect</span>
                    </div>
                    <div className="requirement-item">
                      <CheckCircle className="w-5 h-5" />
                      <span>Rate limiting: 1000 requisições/hora</span>
                    </div>
                    <div className="requirement-item">
                      <CheckCircle className="w-5 h-5" />
                      <span>Formato JSON para request/response</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'authentication' && (
              <div className="content-section">
                <h2>Autenticação</h2>
                <p>Todas as requisições para a API Dirhect requerem autenticação via API Key.</p>
                
                <div className="code-block">
                  <div className="code-header">
                    <span>Exemplo de Autenticação</span>
                    <button 
                      className="copy-button"
                      onClick={() => copyToClipboard(codeExamples.authentication, 'auth')}
                    >
                      {copiedCode === 'auth' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre><code>{codeExamples.authentication}</code></pre>
                </div>

                <div className="auth-info">
                  <h3>Obtendo sua API Key</h3>
                  <ol>
                    <li>Entre em contato com nossa equipe comercial</li>
                    <li>Forneça as informações da sua empresa</li>
                    <li>Aguarde a configuração do ambiente</li>
                    <li>Receba suas credenciais por email seguro</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'endpoints' && (
              <div className="content-section">
                <h2>Endpoints da API</h2>
                
                {integrations.map(integration => (
                  <div key={integration.id} className="endpoints-section">
                    <h3>{integration.name}</h3>
                    <div className="endpoints-list">
                      {integration.endpoints.map((endpoint, idx) => (
                        <div key={idx} className="endpoint-item">
                          <div className="endpoint-header">
                            <span className={`method ${endpoint.method.toLowerCase()}`}>
                              {endpoint.method}
                            </span>
                            <code className="endpoint-path">{endpoint.path}</code>
                          </div>
                          <p className="endpoint-description">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="content-section">
                <h2>Exemplos de Código</h2>
                
                <div className="example-section">
                  <h3>Sincronização com SAP</h3>
                  <div className="code-block">
                    <div className="code-header">
                      <span>JavaScript</span>
                      <button 
                        className="copy-button"
                        onClick={() => copyToClipboard(codeExamples.sapSync, 'sap')}
                      >
                        {copiedCode === 'sap' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre><code>{codeExamples.sapSync}</code></pre>
                  </div>
                </div>

                <div className="example-section">
                  <h3>Integração com TOTVS RM</h3>
                  <div className="code-block">
                    <div className="code-header">
                      <span>JavaScript</span>
                      <button 
                        className="copy-button"
                        onClick={() => copyToClipboard(codeExamples.totvsIntegration, 'totvs')}
                      >
                        {copiedCode === 'totvs' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre><code>{codeExamples.totvsIntegration}</code></pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="docs-cta">
          <div className="docs-container">
            <div className="cta-content">
              <Zap className="w-12 h-12" />
              <h3>Precisa de Ajuda?</h3>
              <p>Nossa equipe técnica está pronta para auxiliar na implementação</p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  <span>Contatar Suporte</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="cta-secondary">
                  <Download className="w-4 h-4" />
                  <span>Download SDK</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default TechnicalDocumentation 