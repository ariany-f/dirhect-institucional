import { useState, useEffect } from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { wordpressService } from '../services/wordpressService'
import './Blog.css'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Buscar posts do WordPress
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedPosts = await wordpressService.getPosts({
          per_page: 12,
          status: 'publish',
          orderby: 'date',
          order: 'desc'
        })
        setPosts(fetchedPosts)
      } catch (err) {
        console.error('Erro ao carregar posts:', err)
        setError('Erro ao carregar posts do blog')
        // Use fallback posts em caso de erro
        const fallbackPosts = wordpressService.getFallbackPosts()
        setPosts(fallbackPosts)
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

  return (
    <div className="blog-page">
      <Header />
      
      <main className="blog-main">
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-content text-center">
              <h1>Blog <span className="gradient-text">Dirhect</span></h1>
              <p>Insights, tendências e novidades sobre gestão de RH e tecnologia</p>
            </div>
          </div>
        </section>

        <section className="blog-content section">
          <div className="container">
            {loading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Carregando posts...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                <p><small>Exibindo conteúdo em cache</small></p>
              </div>
            ) : null}
            
            {!loading && posts.length > 0 && (
              <div className="posts-grid">
                {posts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="post-card card"
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="post-image">
                      <img 
                        src={post.featured_media} 
                        alt={stripHtml(post.title.rendered)}
                        onError={(e) => {
                          e.target.src = '/images/blog/news.webp'
                        }}
                      />
                      <div className="post-category-badge">
                        {getCategoryName(post.categories)}
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <div className="post-meta">
                        <div className="meta-item">
                          <Calendar size={16} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="meta-item">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="meta-item">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <h2 className="post-title">
                        {stripHtml(post.title.rendered)}
                      </h2>
                      
                      <p className="post-excerpt">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      
                      <Link 
                        to={`/blog/${post.slug || post.id}`} 
                        className="read-more"
                      >
                        Ler mais
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div className="no-posts">
                <p>Nenhum post encontrado.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Blog 