import { useState, useEffect } from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Blog.css'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Posts estáticos baseados no News.jsx
  const blogPosts = [
    {
      id: 1,
      title: { rendered: 'Nova funcionalidade: Admissão Digital Inteligente' },
      excerpt: { rendered: 'Agora você pode automatizar todo o processo de admissão com nossa nova ferramenta de IA que valida documentos automaticamente.' },
      date: '2025-01-15T10:00:00',
      author: 'Equipe Dirhect',
      featured_media: '/images/blog/news.webp',
      category: 'Produto',
      readTime: '3 min'
    },
    {
      id: 2,
      title: { rendered: 'Como reduzir 90% dos erros em processos de RH' },
      excerpt: { rendered: 'Descubra as estratégias que empresas líderes estão usando para minimizar erros operacionais e aumentar a eficiência.' },
      date: '2025-01-12T14:30:00',
      author: 'Ana Costa',
      featured_media: '/images/blog/news-2.webp',
      category: 'Dicas',
      readTime: '5 min'
    },
    {
      id: 3,
      title: { rendered: 'Integração com sistemas ERP: Guia completo' },
      excerpt: { rendered: 'Tudo que você precisa saber sobre como integrar a Dirhect com seu sistema ERP atual de forma simples e rápida.' },
      date: '2025-01-10T09:15:00',
      author: 'Carlos Ferreira',
      featured_media: '/images/blog/news-3.webp',
      category: 'Tutorial',
      readTime: '7 min'
    },
    {
      id: 4,
      title: { rendered: 'O Futuro do RH: Tendências para 2025' },
      excerpt: { rendered: 'Explore as principais tendências que moldarão o mercado de recursos humanos nos próximos anos e como se preparar.' },
      date: '2025-01-08T16:20:00',
      author: 'Equipe Dirhect',
      featured_media: '/images/blog/news.webp',
      category: 'Tendências',
      readTime: '6 min'
    },
    {
      id: 5,
      title: { rendered: 'Segurança de Dados em RH: Melhores Práticas' },
      excerpt: { rendered: 'Como proteger informações sensíveis dos colaboradores e estar em conformidade com a LGPD.' },
      date: '2025-01-05T11:45:00',
      author: 'Ana Costa',
      featured_media: '/images/blog/news-2.webp',
      category: 'Segurança',
      readTime: '4 min'
    },
    {
      id: 6,
      title: { rendered: 'Automatização de Processos: ROI em RH' },
      excerpt: { rendered: 'Calcule o retorno sobre investimento da automação de processos de RH na sua empresa.' },
      date: '2025-01-03T08:30:00',
      author: 'Carlos Ferreira',
      featured_media: '/images/blog/news-3.webp',
      category: 'Estratégia',
      readTime: '8 min'
    }
  ]

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setPosts(blogPosts)
      setLoading(false)
    }, 1000)
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

  return (
    <div>
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
            ) : (
              <div className="posts-grid">
                {posts.map((post) => (
                  <article key={post.id} className="post-card card">
                    <div className="post-image">
                      <img src={post.featured_media} alt={stripHtml(post.title.rendered)} />
                      <div className="post-category-badge">{post.category}</div>
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
                      
                      <Link to={`/blog/${post.id}`} className="read-more">
                        Ler mais
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Blog 