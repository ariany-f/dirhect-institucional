import { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Calendar,
  Tag,
  Map,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
  Target,
  Clock,
  Star,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import './CriarRoadmap.css'

const CriarRoadmap = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState(null)
  const [features, setFeatures] = useState([''])
  const [fontSize, setFontSize] = useState(14) // Tamanho da fonte em pixels

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    status: 'planned',
    priority: 'medium',
    quarter: '',
    category: '',
    estimatedDate: '',
    launchedDate: '',
    features: []
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    if (!wordpressService.isAuthenticated()) {
      navigate('/admin')
      return
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addFeature = () => {
    setFeatures(prev => [...prev, ''])
  }

  const removeFeature = (index) => {
    setFeatures(prev => prev.filter((_, i) => i !== index))
  }

  const updateFeature = (index, value) => {
    setFeatures(prev => prev.map((feature, i) => i === index ? value : feature))
  }

  // Funções para controlar o tamanho da fonte
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24)) // Máximo 24px
  }

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 10)) // Mínimo 10px
  }

  const resetFontSize = () => {
    setFontSize(14) // Voltar ao tamanho padrão
  }

  const handleSave = async (status = 'planned') => {
    try {
      setSaving(true)
      const token = wordpressService.getCurrentToken()

      // Filtrar funcionalidades vazias
      const validFeatures = features.filter(f => f.trim() !== '')

      const itemData = {
        ...formData,
        status: status,
        features: validFeatures
      }

      const result = await wordpressService.saveRoadmapItem(token, itemData)
      
      showNotification(
        `Item do roadmap ${status === 'completed' ? 'marcado como concluído' : 'salvo'} com sucesso!`, 
        'success'
      )
      
      // Redirecionar para o admin após salvar
      setTimeout(() => {
        navigate('/admin')
      }, 2000)

    } catch (error) {
      console.error('Erro ao salvar item do roadmap:', error)
      showNotification(error.message || 'Erro ao salvar item do roadmap', 'error')
    } finally {
      setSaving(false)
    }
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const getQuarterOptions = () => {
    const currentYear = new Date().getFullYear()
    const quarters = []
    
    for (let year = currentYear - 1; year <= currentYear + 2; year++) {
      quarters.push(`Q1 ${year}`)
      quarters.push(`Q2 ${year}`)
      quarters.push(`Q3 ${year}`)
      quarters.push(`Q4 ${year}`)
    }
    
    return quarters
  }

  return (
    <div className="criar-roadmap-page">
      <Header />
      <main className="criar-roadmap-main">
        <div className="criar-roadmap-container">
          {/* Header */}
          <div className="roadmap-header">
            <button onClick={() => navigate('/admin')} className="back-btn">
              <ArrowLeft size={20} />
              Voltar ao Admin
            </button>
            <h1>Criar Nova Funcionalidade</h1>
          </div>

          {/* Formulário */}
          <div className="roadmap-form">
            {/* Título */}
            <div className="form-group">
              <label htmlFor="title">Título da Funcionalidade *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título da funcionalidade"
                className="title-input"
              />
            </div>

            {/* Descrição */}
            <div className="form-group">
              <label htmlFor="description">Descrição *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Digite uma descrição da funcionalidade"
                rows={4}
                className="description-input"
              />
            </div>

            {/* Conteúdo Detalhado */}
            <div className="form-group">
              <label htmlFor="content">Conteúdo Detalhado</label>
              
              {/* Controles de Fonte */}
              <div className="font-controls">
                <div className="font-controls-left">
                  <span className="font-size-label">Tamanho da fonte:</span>
                  <span className="font-size-value">{fontSize}px</span>
                </div>
                <div className="font-controls-right">
                  <button
                    type="button"
                    onClick={decreaseFontSize}
                    className="font-control-btn"
                    title="Diminuir fonte"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={resetFontSize}
                    className="font-control-btn"
                    title="Tamanho padrão"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={increaseFontSize}
                    className="font-control-btn"
                    title="Aumentar fonte"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>
              
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Digite detalhes técnicos, benefícios, etc..."
                rows={8}
                className="content-input"
                style={{ fontSize: `${fontSize}px` }}
              />
              <small className="help-text">
                Informações técnicas, benefícios para o usuário, requisitos, etc.
              </small>
            </div>

            {/* Status e Prioridade */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="status-select"
                >
                  <option value="planned">Planejado</option>
                  <option value="in-progress">Em Desenvolvimento</option>
                  <option value="completed">Concluído</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Prioridade</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="priority-select"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            {/* Trimestre e Categoria */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quarter">Trimestre</label>
                <select
                  id="quarter"
                  value={formData.quarter}
                  onChange={(e) => handleInputChange('quarter', e.target.value)}
                  className="quarter-select"
                >
                  <option value="">Selecione um trimestre</option>
                  {getQuarterOptions().map(quarter => (
                    <option key={quarter} value={quarter}>{quarter}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Ex: IA, Analytics, Integração"
                  className="category-input"
                />
              </div>
            </div>

            {/* Datas */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="estimatedDate">Data Estimada</label>
                <input
                  type="date"
                  id="estimatedDate"
                  value={formData.estimatedDate}
                  onChange={(e) => handleInputChange('estimatedDate', e.target.value)}
                  className="date-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="launchedDate">Data de Lançamento</label>
                <input
                  type="date"
                  id="launchedDate"
                  value={formData.launchedDate}
                  onChange={(e) => handleInputChange('launchedDate', e.target.value)}
                  className="date-input"
                />
              </div>
            </div>

            {/* Funcionalidades */}
            <div className="form-group">
              <label>Funcionalidades Principais</label>
              <div className="features-list">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Funcionalidade ${index + 1}`}
                      className="feature-input"
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="remove-feature-btn"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="add-feature-btn"
                >
                  <Plus size={16} />
                  Adicionar Funcionalidade
                </button>
              </div>
            </div>

            {/* Ações */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => handleSave('planned')}
                disabled={saving || !formData.title || !formData.description}
                className="save-btn"
              >
                <Save size={16} />
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              
              <button
                type="button"
                onClick={() => handleSave('in-progress')}
                disabled={saving || !formData.title || !formData.description}
                className="progress-btn"
              >
                <Clock size={16} />
                {saving ? 'Salvando...' : 'Marcar em Desenvolvimento'}
              </button>

              <button
                type="button"
                onClick={() => handleSave('completed')}
                disabled={saving || !formData.title || !formData.description}
                className="complete-btn"
              >
                <Star size={16} />
                {saving ? 'Salvando...' : 'Marcar como Concluído'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Notificação */}
      {notification && (
        <div className={`roadmap-notification roadmap-notification--${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'error' && <AlertCircle size={20} />}
              {notification.type === 'info' && <AlertCircle size={20} />}
            </div>
            <span>{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CriarRoadmap 