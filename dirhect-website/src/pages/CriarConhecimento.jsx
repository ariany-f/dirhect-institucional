import { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  BookOpen,
  Tag,
  Star,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
  Search,
  TrendingUp,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import './CriarConhecimento.css'

const CriarConhecimento = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState(null)
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [fontSize, setFontSize] = useState(14) // Tamanho da fonte em pixels

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    featured: false,
    views: 0
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

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
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

  const handleSave = async (status = 'draft') => {
    try {
      setSaving(true)
      const token = wordpressService.getCurrentToken()

      const articleData = {
        ...formData,
        tags: tags,
        status: status
      }

      const result = await wordpressService.saveKnowledgeArticle(token, articleData)
      
      showNotification(
        `Artigo ${status === 'publish' ? 'publicado' : 'salvo como rascunho'} com sucesso!`, 
        'success'
      )
      
      // Redirecionar para o admin após salvar
      setTimeout(() => {
        navigate('/admin')
      }, 2000)

    } catch (error) {
      console.error('Erro ao salvar artigo:', error)
      showNotification(error.message || 'Erro ao salvar artigo', 'error')
    } finally {
      setSaving(false)
    }
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const getCategoryOptions = () => {
    return [
      'Tutorial',
      'Guia',
      'FAQ',
      'Dicas',
      'Melhores Práticas',
      'Troubleshooting',
      'Integração',
      'API',
      'Configuração',
      'Segurança',
      'Performance',
      'Outros'
    ]
  }

  return (
    <div className="criar-conhecimento-page">
      <Header />
      <main className="criar-conhecimento-main">
        <div className="criar-conhecimento-container">
          {/* Header */}
          <div className="conhecimento-header">
            <button onClick={() => navigate('/admin')} className="back-btn">
              <ArrowLeft size={20} />
              Voltar ao Admin
            </button>
            <h1>Criar Novo Artigo</h1>
          </div>

          {/* Formulário */}
          <div className="conhecimento-form">
            {/* Título */}
            <div className="form-group">
              <label htmlFor="title">Título do Artigo *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título do artigo"
                className="title-input"
              />
            </div>

            {/* Resumo */}
            <div className="form-group">
              <label htmlFor="excerpt">Resumo</label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Digite um resumo do artigo (opcional)"
                rows={3}
                className="excerpt-input"
              />
              <small className="help-text">
                Breve descrição que aparecerá na listagem de artigos
              </small>
            </div>

            {/* Conteúdo */}
            <div className="form-group">
              <label htmlFor="content">Conteúdo *</label>
              
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
                placeholder="Digite o conteúdo do artigo..."
                rows={15}
                className="content-input"
                style={{ fontSize: `${fontSize}px` }}
              />
              <small className="help-text">
                Dica: Use quebras de linha para separar parágrafos. O texto será formatado automaticamente.
              </small>
            </div>

            {/* Categoria e Destaque */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="category-select"
                >
                  <option value="">Selecione uma categoria</option>
                  {getCategoryOptions().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="featured-checkbox"
                  />
                  <span>Artigo em Destaque</span>
                  <Star size={16} className="star-icon" />
                </label>
                <small className="help-text">
                  Artigos em destaque aparecem primeiro na listagem
                </small>
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>Tags</label>
              <div className="tags-container">
                <div className="tags-input-group">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite uma tag e pressione Enter"
                    className="tag-input"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="add-tag-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {tags.length > 0 && (
                  <div className="tags-list">
                    {tags.map((tag, index) => (
                      <span key={index} className="tag-item">
                        <Tag size={12} />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="remove-tag-btn"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <small className="help-text">
                Tags ajudam na busca e categorização do artigo
              </small>
            </div>

            {/* Visualizações */}
            <div className="form-group">
              <label htmlFor="views">Visualizações Iniciais</label>
              <input
                type="number"
                id="views"
                value={formData.views}
                onChange={(e) => handleInputChange('views', parseInt(e.target.value) || 0)}
                min="0"
                className="views-input"
              />
              <small className="help-text">
                Número inicial de visualizações (opcional)
              </small>
            </div>

            {/* Ações */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => handleSave('draft')}
                disabled={saving || !formData.title || !formData.content}
                className="save-draft-btn"
              >
                <Save size={16} />
                {saving ? 'Salvando...' : 'Salvar como Rascunho'}
              </button>
              
              <button
                type="button"
                onClick={() => handleSave('publish')}
                disabled={saving || !formData.title || !formData.content}
                className="publish-btn"
              >
                <Eye size={16} />
                {saving ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Notificação */}
      {notification && (
        <div className={`conhecimento-notification conhecimento-notification--${notification.type}`}>
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

export default CriarConhecimento 