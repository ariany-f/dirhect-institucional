import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { wordpressService } from '../services/wordpressService'
import './BlogPost.css'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Buscar post específico do WordPress
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let fetchedPost = null
        
        // Tentar buscar por ID numérico primeiro
        // O wordpressService.getPost() automaticamente verifica e exclui posts da categoria roadmap
        if (!isNaN(id)) {
          try {
            fetchedPost = await wordpressService.getPost(id)
          } catch (err) {
            console.log('Post não encontrado por ID, tentando por slug...')
          }
        }
        
        // Se não encontrou por ID ou se o ID não é numérico, buscar por slug
        // O wordpressService.getPosts() automaticamente exclui a categoria roadmap
        if (!fetchedPost) {
          const posts = await wordpressService.getPosts({ per_page: 100 })
          fetchedPost = posts.find(p => p.slug === id || p.id === parseInt(id))
        }
        
        if (fetchedPost) {
          setPost(fetchedPost)
          
          // Buscar posts relacionados (mesma categoria)
          // O wordpressService.getRelatedPosts() automaticamente exclui a categoria roadmap
          if (fetchedPost.categoryIds && fetchedPost.categoryIds.length > 0) {
            try {
              const related = await wordpressService.getRelatedPosts(
                fetchedPost.id,
                fetchedPost.categoryIds,
                3
              )
              setRelatedPosts(related)
            } catch (err) {
              console.log('Erro ao buscar posts relacionados:', err)
            }
          }
        } else {
          // Se não encontrou no WordPress, usar dados estáticos como fallback
          const fallbackPosts = wordpressService.getFallbackPosts()
          const fallbackPost = fallbackPosts.find(p => p.id === parseInt(id) || p.slug === id)
          
          if (fallbackPost) {
            setPost(fallbackPost)
            setRelatedPosts(fallbackPosts.filter(p => p.id !== fallbackPost.id).slice(0, 3))
          } else {
            setError('Post não encontrado')
          }
        }
      } catch (err) {
        console.error('Erro ao carregar post:', err)
        setError('Erro ao carregar o post')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const shareOnSocial = (platform) => {
    const url = window.location.href
    const title = post?.title?.rendered || 'Dirhect Blog'
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
    
    window.open(urls[platform], '_blank', 'width=600,height=400')
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
      <div className="blog-post-page">
        <Header />
        <main className="blog-post-main">
          <div className="container">
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Carregando post...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <Header />
        <main className="blog-post-main">
          <div className="container">
            <div className="error-message">
              <h1>Post não encontrado</h1>
              <p>{error || 'O post que você está procurando não existe.'}</p>
              <Link to="/blog" className="btn btn-primary">
                <ArrowLeft size={20} />
                Voltar ao Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <Header />
      
      <main className="blog-post-main">
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div className="container">
            <nav className="breadcrumb-nav">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/blog">Blog</Link>
              <span>/</span>
              <span>{stripHtml(post.title.rendered)}</span>
            </nav>
          </div>
        </section>

        {/* Post Header */}
        <section className="post-header">
          <div className="container">
            <div className="post-header-content">
              <div className="post-category">
                <span className="category-badge">{getCategoryName(post.categories)}</span>
              </div>
              
              <h1 className="post-title">{stripHtml(post.title.rendered)}</h1>
              
              <div className="post-meta">
                <div className="meta-group">
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
                
                <div className="social-share">
                  <span>Compartilhar:</span>
                  <button onClick={() => shareOnSocial('facebook')} className="social-btn facebook">
                    <Facebook size={16} />
                  </button>
                  <button onClick={() => shareOnSocial('twitter')} className="social-btn twitter">
                    <Twitter size={16} />
                  </button>
                  <button onClick={() => shareOnSocial('linkedin')} className="social-btn linkedin">
                    <Linkedin size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_media && (
          <section className="post-featured-image">
            <div className="container">
              <img 
                src={post.featured_media} 
                alt={stripHtml(post.title.rendered)}
                onError={(e) => {
                  e.target.src = '/images/blog/news.webp'
                }}
              />
            </div>
          </section>
        )}

        {/* Post Content */}
        <section className="post-content-section">
          <div className="container">
            <div className="post-layout">
              <article className="post-content">
                <div 
                  className="content-html"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content?.rendered || post.content || ''
                  }}
                />
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="post-tags">
                    <Tag size={16} />
                    <span>Tags:</span>
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                
                {/* Share buttons */}
                <div className="post-share">
                  <h4>Gostou do conteúdo?</h4>
                  <p>Compartilhe com seus colegas!</p>
                  <div className="share-buttons">
                    <button onClick={() => shareOnSocial('facebook')} className="share-btn facebook">
                      <Facebook size={20} />
                      Facebook
                    </button>
                    <button onClick={() => shareOnSocial('twitter')} className="share-btn twitter">
                      <Twitter size={20} />
                      Twitter
                    </button>
                    <button onClick={() => shareOnSocial('linkedin')} className="share-btn linkedin">
                      <Linkedin size={20} />
                      LinkedIn
                    </button>
                  </div>
                </div>
              </article>
              
              {/* Sidebar */}
              <aside className="post-sidebar">
                <div className="sidebar-content">
                  <div className="author-card">
                    <h4>Sobre o autor</h4>
                    <div className="author-info">
                      <div className="author-avatar">
                        <User size={32} />
                      </div>
                      <div className="author-details">
                        <h5>{post.author}</h5>
                        <p>Especialista em transformação digital de RH</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="cta-card">
                    <h4>Quer automatizar seu RH?</h4>
                    <p>Converse com nossos especialistas e descubra como a Dirhect pode transformar seus processos.</p>
                    <Link to="/contato" className="btn btn-primary">
                      Falar com especialista
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="related-posts">
            <div className="container">
              <h3>Posts relacionados</h3>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="related-post-card">
                    <div className="related-post-image">
                      <img 
                        src={relatedPost.featured_media} 
                        alt={stripHtml(relatedPost.title.rendered)}
                        onError={(e) => {
                          e.target.src = '/images/blog/news.webp'
                        }}
                      />
                    </div>
                    <div className="related-post-content">
                      <span className="related-post-category">
                        {getCategoryName(relatedPost.categories)}
                      </span>
                      <h4>{stripHtml(relatedPost.title.rendered)}</h4>
                      <p>{stripHtml(relatedPost.excerpt.rendered)}</p>
                      <Link to={`/blog/${relatedPost.slug || relatedPost.id}`} className="read-more">
                        Ler mais
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="post-navigation">
          <div className="container">
            <Link to="/blog" className="btn btn-outline">
              <ArrowLeft size={20} />
              Voltar ao Blog
            </Link>
          </div>
        </section>
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default BlogPost 