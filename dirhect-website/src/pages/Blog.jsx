import { useState, useEffect, useCallback } from 'react'
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
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)

  const postsPerPage = 9

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Buscar posts do WordPress
  const fetchPosts = useCallback(async (page = 1, append = false) => {
    try {
      if (page === 1) {
        setLoading(true)
        setError(null)
      } else {
        setLoadingMore(true)
      }

      const response = await fetch(`${wordpressService.WORDPRESS_API_URL || 'https://dirhect-institucional.thunderbold.com.br/wp-json/wp/v2'}/posts?per_page=${postsPerPage}&page=${page}&_embed=true`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const fetchedPosts = await response.json()
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
      const total = parseInt(response.headers.get('X-WP-Total') || '0')

      // Transformar os dados para o formato esperado
      const transformedPosts = fetchedPosts.map(post => ({
        id: post.id,
        title: { rendered: post.title.rendered },
        excerpt: { rendered: post.excerpt.rendered },
        content: { rendered: post.content.rendered },
        date: post.date,
        modified: post.modified,
        author: wordpressService.getAuthorName(post),
        featured_media: wordpressService.getFeaturedImage(post),
        categories: wordpressService.getCategories(post),
        categoryIds: wordpressService.getCategoryIds(post),
        tags: wordpressService.getTags(post),
        slug: post.slug,
        link: post.link,
        readTime: wordpressService.calculateReadTime(post.content.rendered)
      }))

      if (append) {
        setPosts(prevPosts => [...prevPosts, ...transformedPosts])
      } else {
        setPosts(transformedPosts)
      }

      setTotalPosts(total)
      setHasMore(page < totalPages)
      setCurrentPage(page)

    } catch (err) {
      console.error('Erro ao carregar posts:', err)
      if (page === 1) {
        setError('Erro ao carregar posts do blog')
        // Use fallback posts em caso de erro na primeira página
        const fallbackPosts = wordpressService.getFallbackPosts()
        setPosts(fallbackPosts)
        setTotalPosts(fallbackPosts.length)
        setHasMore(false)
      }
    } finally {
      if (page === 1) {
        setLoading(false)
      } else {
        setLoadingMore(false)
      }
    }
  }, [postsPerPage])

  // Carregar posts iniciais
  useEffect(() => {
    fetchPosts(1, false)
  }, [fetchPosts])

  // Função para detectar scroll com múltiplas verificações
  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    // Calcular a posição atual como porcentagem
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

    // Verificar se os últimos posts estão visíveis
    const postsGrid = document.querySelector('.posts-grid')
    let lastPostVisible = false
    
    if (postsGrid) {
      const postCards = postsGrid.querySelectorAll('.post-card')
      if (postCards.length > 0) {
        const lastCard = postCards[Math.max(0, postCards.length - 3)] // Terceiro último card
        const rect = lastCard.getBoundingClientRect()
        lastPostVisible = rect.top < clientHeight + 200 // 200px de margem
      }
    }

    // Múltiplos pontos de gatilho para garantir carregamento suave
    const triggers = [
      scrollTop + clientHeight >= scrollHeight - 600, // 600px antes do final
      scrollPercentage >= 60, // 60% da página
      scrollTop + clientHeight >= scrollHeight * 0.7, // 70% da altura total
      lastPostVisible // Terceiro último post visível
    ]

    // Se qualquer condição for verdadeira, carregar mais posts
    if (triggers.some(trigger => trigger)) {
      fetchPosts(currentPage + 1, true)
    }
  }, [loadingMore, hasMore, currentPage, fetchPosts])

  // Throttle da função de scroll para melhor performance
  const throttledHandleScroll = useCallback(() => {
    let timeoutId = null
    
    return () => {
      if (timeoutId) return
      
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null
      }, 100) // 100ms de throttle
    }
  }, [handleScroll])

  // Adicionar listener de scroll com throttle
  useEffect(() => {
    const scrollHandler = throttledHandleScroll()
    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [throttledHandleScroll])

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
            {totalPosts > 0 && (
              <div className="blog-stats-header">
                <p className="posts-counter">
                  Exibindo {posts.length} de {totalPosts} posts
                </p>
              </div>
            )}

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
              <>
                <div className="posts-grid">
                  {posts.map((post, index) => (
                    <article 
                      key={`${post.id}-${index}`}
                      className="post-card card"
                      style={{ '--delay': `${(index % postsPerPage) * 0.1}s` }}
                    >
                      <div className="post-image">
                        <img 
                          src={post.featured_media} 
                          alt={stripHtml(post.title.rendered)}
                          loading="lazy"
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
                        
                        <h2 className="blog-post-title">
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

                {/* Loading indicator para mais posts */}
                {loadingMore && (
                  <div className="loading-more">
                    <div className="loading-spinner"></div>
                    <p>Carregando mais posts...</p>
                  </div>
                )}

                {/* Indicador de fim dos posts */}
                {!hasMore && posts.length > 0 && (
                  <div className="end-of-posts">
                    <p>✨ Você visualizou todos os posts disponíveis!</p>
                    <p><small>Continue acompanhando nosso blog para mais conteúdo</small></p>
                  </div>
                )}
              </>
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