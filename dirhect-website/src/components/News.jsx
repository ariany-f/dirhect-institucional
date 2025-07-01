import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import './News.css'

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Nova funcionalidade: Admissão Digital Inteligente",
      description: "Agora você pode automatizar todo o processo de admissão com nossa nova ferramenta de IA que valida documentos automaticamente.",
      date: "15 de Janeiro, 2025",
      readTime: "3 min",
      category: "Produto",
      image: "/images/blog/news.webp"
    },
    {
      id: 2,
      title: "Como reduzir 90% dos erros em processos de RH",
      description: "Descubra as estratégias que empresas líderes estão usando para minimizar erros operacionais e aumentar a eficiência.",
      date: "12 de Janeiro, 2025",
      readTime: "5 min",
      category: "Dicas",
      image: "/images/blog/news-2.webp"
    },
    {
      id: 3,
      title: "Integração com sistemas ERP: Guia completo",
      description: "Tudo que você precisa saber sobre como integrar a Dirhect com seu sistema ERP atual de forma simples e rápida.",
      date: "10 de Janeiro, 2025",
      readTime: "7 min",
      category: "Tutorial",
      image: "/images/blog/news-3.webp"
    }
  ]

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
                <img src={item.image} alt={item.title} />
                <div className="news-category">{item.category}</div>
              </div>
              
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                  <span className="news-read-time">
                    <Clock size={14} />
                    {item.readTime}
                  </span>
                </div>
                
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                
                <Link to={`/blog/${item.id}`} className="news-link">
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