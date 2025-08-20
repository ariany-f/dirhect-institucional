import { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Calendar,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { wordpressService } from '../services/wordpressService'
import './CriarPost.css'

const CriarPost = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [fontSize, setFontSize] = useState(14) // Tamanho da fonte em pixels

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    categories: [],
    tags: '',
    featured_image: null
  })

  useEffect(() => {
    checkAuth()
    loadCategories()
  }, [])

  const checkAuth = async () => {
    if (!wordpressService.isAuthenticated()) {
      navigate('/admin')
      return
    }
  }

  const loadCategories = async () => {
    try {
      const cats = await wordpressService.getCategories()
      setCategories(cats)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setFormData(prev => ({ ...prev, featured_image: null }))
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

      // Preparar dados do post
      const postData = {
        ...formData,
        status: status
      }

      // Se há imagem selecionada, fazer upload primeiro
      if (selectedImage) {
        const formDataImage = new FormData()
        formDataImage.append('file', selectedImage)
        
        const uploadResponse = await fetch(`${wordpressService.WORDPRESS_API_URL}/media`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataImage
        })

        if (uploadResponse.ok) {
          const mediaData = await uploadResponse.json()
          postData.featured_media = mediaData.id
        }
      }

      const result = await wordpressService.savePost(token, postData)
      
      showNotification(
        `Post ${status === 'publish' ? 'publicado' : 'salvo como rascunho'} com sucesso!`, 
        'success'
      )
      
      // Redirecionar para o admin após salvar
      setTimeout(() => {
        navigate('/admin')
      }, 2000)

    } catch (error) {
      console.error('Erro ao salvar post:', error)
      showNotification(error.message || 'Erro ao salvar post', 'error')
    } finally {
      setSaving(false)
    }
  }

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const formatTextToHtml = (text) => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `<p>${line}</p>`)
      .join('')
  }

  return (
    <div className="criar-post-page">
      <Header />
      <main className="criar-post-main">
        <div className="criar-post-container">
          {/* Header */}
          <div className="post-header">
            <button onClick={() => navigate('/admin')} className="back-btn">
              <ArrowLeft size={20} />
              Voltar ao Admin
            </button>
            <h1>Criar Nova Postagem</h1>
          </div>

          {/* Formulário */}
          <div className="post-form">
            {/* Título */}
            <div className="form-group">
              <label htmlFor="title">Título da Postagem *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título da postagem"
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
                placeholder="Digite um resumo da postagem (opcional)"
                rows={3}
                className="excerpt-input"
              />
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
                placeholder="Digite o conteúdo da postagem..."
                rows={15}
                className="content-input"
                style={{ fontSize: `${fontSize}px` }}
              />
              <small className="help-text">
                Dica: Use quebras de linha para separar parágrafos. O texto será formatado automaticamente.
              </small>
            </div>

            {/* Categorias */}
            <div className="form-group">
              <label>Categorias</label>
              <div className="categories-grid">
                {categories.map(cat => (
                  <label key={cat.id} className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(cat.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('categories', [...formData.categories, cat.id])
                        } else {
                          handleInputChange('categories', formData.categories.filter(id => id !== cat.id))
                        }
                      }}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="tag1, tag2, tag3"
                className="tags-input"
              />
              <small className="help-text">
                Separe as tags por vírgula
              </small>
            </div>

            {/* Imagem Destacada */}
            <div className="form-group">
              <label>Imagem Destacada</label>
              <div className="image-upload">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" onClick={removeImage} className="remove-image">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="upload-area">
                    <input
                      type="file"
                      id="featured-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <label htmlFor="featured-image" className="upload-label">
                      <Upload size={24} />
                      <span>Clique para selecionar uma imagem</span>
                    </label>
                  </div>
                )}
              </div>
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
        <div className={`post-notification post-notification--${notification.type}`}>
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

export default CriarPost 