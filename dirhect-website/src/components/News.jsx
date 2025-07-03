import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { wordpressService } from '../services/wordpressService'
import './News.css'

const News = () => {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // O wordpressService.getPosts() automaticamente exclui a categoria roadmap
        const posts = await wordpressService.getPosts({
          per_page: 3,
          status: 'publish',
          orderby: 'date',
          order: 'desc'
        })
        setNewsItems(posts)
      } catch (error) {
        console.error('Erro ao buscar posts para News:', error)
        // Em caso de erro, usa posts do fallback
        const fallbackPosts = wordpressService.getFallbackPosts()
        setNewsItems(fallbackPosts.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const stripHtml = (html) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const getCategoryName = (categories) => {
    if (Array.isArray(categories) && categories.length > 0) {
      return categories[0]
    }
    return 'Geral'
  }

  if (loading) {
    return (
      <section className="news section">
        <div className="container">
          <div className="news-header">
            <div className="news-header-content">
              <h2>Fique por dentro das <span className="gradient-text">novidades</span></h2>
              <p>Últimas atualizações, dicas e insights sobre gestão de RH</p>
            </div>
            <Link to="/blog" className="news-cta">
              Ir para o blog
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="news-grid">
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Carregando posts...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="news section">
      <div className="container">
        <div className="news-header">
          <div className="news-header-content">
            <h2>Fique por dentro das <span className="gradient-text">novidades</span></h2>
            <p>Últimas atualizações, dicas e insights sobre gestão de RH</p>
          </div>
          <Link to="/blog" className="news-cta">
            Ir para o blog
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-image">
                <img 
                  src={item.featured_media} 
                  alt={stripHtml(item.title.rendered)}
                  onError={(e) => {
                    e.target.src = '/images/blog/news.webp'
                  }}
                />
                <div className="news-category">{getCategoryName(item.categories)}</div>
              </div>
              
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">
                    <Calendar size={14} />
                    {formatDate(item.date)}
                  </span>
                  <span className="news-read-time">
                    <Clock size={14} />
                    {item.readTime}
                  </span>
                </div>
                
                <h3>{stripHtml(item.title.rendered)}</h3>
                <p>{stripHtml(item.excerpt.rendered)}</p>
                
                <Link to={`/blog/${item.slug || item.id}`} className="news-link">
                  Ler mais
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News 