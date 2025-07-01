import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './BlogPost.css'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Dados dos posts (mesmos do News.jsx)
  const blogPosts = [
    {
      id: 1,
      title: "Nova funcionalidade: Admissão Digital Inteligente",
      description: "Agora você pode automatizar todo o processo de admissão com nossa nova ferramenta de IA que valida documentos automaticamente.",
      content: `
        <p>A admissão digital representa uma revolução na forma como as empresas recebem novos colaboradores. Com nossa nova funcionalidade de Admissão Digital Inteligente, eliminamos a papelada e burocracias desnecessárias.</p>
        
        <h3>Como funciona a Admissão Digital Inteligente</h3>
        <p>Nossa solução utiliza inteligência artificial para validar documentos automaticamente, verificando autenticidade e extraindo informações relevantes em segundos.</p>
        
        <h4>Principais benefícios:</h4>
        <ul>
          <li><strong>Redução de 90% no tempo de admissão</strong> - O que antes levava dias, agora leva horas</li>
          <li><strong>Zero erros de digitação</strong> - Extração automática de dados dos documentos</li>
          <li><strong>Experiência aprimorada</strong> - Colaboradores podem completar todo o processo remotamente</li>
          <li><strong>Conformidade garantida</strong> - Verificação automática de todos os documentos obrigatórios</li>
        </ul>
        
        <h3>Tecnologia de ponta</h3>
        <p>Utilizamos OCR avançado e algoritmos de machine learning para garantir precisão na leitura de documentos, mesmo com qualidade variável de digitalização.</p>
        
        <blockquote>
          "Com a Admissão Digital da Dirhect, conseguimos reduzir o tempo de onboarding de 3 dias para apenas 2 horas. A experiência tanto para o RH quanto para os novos colaboradores melhorou drasticamente."
          <cite>- Maria Silva, Gerente de RH, TechCorp</cite>
        </blockquote>
        
        <h3>Próximos passos</h3>
        <p>Esta funcionalidade já está disponível para todos os clientes Dirhect. Entre em contato com nossa equipe para ativar em sua conta e começar a transformar seus processos de admissão.</p>
      `,
      date: "15 de Janeiro, 2025",
      readTime: "3 min",
      category: "Produto",
      image: "/images/blog/news.webp",
      author: "Equipe Dirhect",
      tags: ["Admissão Digital", "IA", "Automação", "RH"]
    },
    {
      id: 2,
      title: "Como reduzir 90% dos erros em processos de RH",
      description: "Descubra as estratégias que empresas líderes estão usando para minimizar erros operacionais e aumentar a eficiência.",
      content: `
        <p>Erros em processos de RH podem custar caro para as empresas, tanto financeiramente quanto em termos de produtividade e satisfação dos colaboradores. Neste artigo, exploramos estratégias comprovadas para minimizar esses erros.</p>
        
        <h3>Os principais tipos de erros em RH</h3>
        <p>Antes de resolver um problema, é preciso entendê-lo. Os erros mais comuns em departamentos de RH incluem:</p>
        
        <ul>
          <li>Erros de digitação em dados pessoais</li>
          <li>Falhas na verificação de documentos</li>
          <li>Inconsistências em processos de elegibilidade</li>
          <li>Problemas de comunicação entre sistemas</li>
          <li>Perda de documentos físicos</li>
        </ul>
        
        <h3>Estratégias para redução de erros</h3>
        
        <h4>1. Automação de processos</h4>
        <p>A automação elimina o fator humano em tarefas repetitivas, reduzindo drasticamente a chance de erros. Sistemas automatizados podem:</p>
        <ul>
          <li>Validar dados em tempo real</li>
          <li>Sincronizar informações entre diferentes sistemas</li>
          <li>Aplicar regras de negócio consistentemente</li>
        </ul>
        
        <h4>2. Validação em tempo real</h4>
        <p>Implementar verificações automáticas durante a entrada de dados previne que erros se propaguem pelo sistema.</p>
        
        <h4>3. Integração de sistemas</h4>
        <p>Conectar diferentes sistemas elimina a necessidade de reentrada manual de dados, uma das principais fontes de erro.</p>
        
        <blockquote>
          "Após implementarmos a solução da Dirhect, nossos erros operacionais caíram de 15% para menos de 1%. A diferença é notável não só nos números, mas na confiança da equipe."
          <cite>- João Santos, Diretor de RH, InnovaCorp</cite>
        </blockquote>
        
        <h3>Resultados mensuráveis</h3>
        <p>Empresas que implementaram essas estratégias relatam:</p>
        <ul>
          <li>Redução média de 90% em erros operacionais</li>
          <li>Aumento de 70% na produtividade do RH</li>
          <li>Melhoria de 85% na satisfação dos colaboradores</li>
        </ul>
        
        <p>A transformação digital do RH não é mais opcional - é uma necessidade para empresas que querem se manter competitivas.</p>
      `,
      date: "12 de Janeiro, 2025",
      readTime: "5 min",
      category: "Dicas",
      image: "/images/blog/news-2.webp",
      author: "Ana Costa",
      tags: ["Eficiência", "Automação", "Qualidade", "Processos"]
    },
    {
      id: 3,
      title: "Integração com sistemas ERP: Guia completo",
      description: "Tudo que você precisa saber sobre como integrar a Dirhect com seu sistema ERP atual de forma simples e rápida.",
      content: `
        <p>A integração entre sistemas de RH e ERP é fundamental para empresas que buscam eficiência operacional e visão unificada dos dados corporativos. Este guia apresenta tudo que você precisa saber sobre o processo.</p>
        
        <h3>Por que integrar RH com ERP?</h3>
        <p>A integração traz benefícios significativos para a gestão empresarial:</p>
        
        <ul>
          <li><strong>Dados unificados:</strong> Elimina silos de informação</li>
          <li><strong>Redução de retrabalho:</strong> Dados inseridos uma vez, utilizados em todos os sistemas</li>
          <li><strong>Maior precisão:</strong> Reduz erros de sincronização manual</li>
          <li><strong>Relatórios consolidados:</strong> Visão completa da empresa</li>
        </ul>
        
        <h3>Principais desafios da integração</h3>
        <p>Embora os benefícios sejam claros, existem desafios comuns que devem ser considerados:</p>
        
        <h4>1. Compatibilidade de dados</h4>
        <p>Diferentes sistemas podem usar formatos e estruturas distintas para os mesmos dados. É crucial mapear e padronizar essas informações.</p>
        
        <h4>2. Segurança</h4>
        <p>A integração deve manter os mais altos padrões de segurança, especialmente ao lidar com dados sensíveis de colaboradores.</p>
        
        <h4>3. Sincronização em tempo real</h4>
        <p>Garantir que mudanças em um sistema sejam refletidas imediatamente no outro é tecnicamente complexo, mas essencial.</p>
        
        <h3>Como a Dirhect facilita a integração</h3>
        
        <h4>APIs robustas</h4>
        <p>Nossa plataforma oferece APIs RESTful bem documentadas que facilitam a integração com qualquer sistema ERP moderno.</p>
        
        <h4>Conectores pré-construídos</h4>
        <p>Temos conectores prontos para os principais ERPs do mercado:</p>
        <ul>
          <li>SAP</li>
          <li>Oracle</li>
          <li>Microsoft Dynamics</li>
          <li>TOTVS</li>
          <li>Sankhya</li>
        </ul>
        
        <h4>Suporte especializado</h4>
        <p>Nossa equipe técnica acompanha todo o processo de integração, garantindo implementação sem problemas.</p>
        
        <blockquote>
          "A integração com nosso ERP foi surpreendentemente simples. Em menos de uma semana, todos os nossos sistemas estavam conversando perfeitamente."
          <cite>- Roberto Lima, CTO, LogisticaPro</cite>
        </blockquote>
        
        <h3>Passo a passo da implementação</h3>
        
        <h4>Fase 1: Análise e planejamento (1-2 semanas)</h4>
        <ul>
          <li>Mapeamento de dados existentes</li>
          <li>Definição de regras de sincronização</li>
          <li>Planejamento de cronograma</li>
        </ul>
        
        <h4>Fase 2: Configuração técnica (2-3 semanas)</h4>
        <ul>
          <li>Setup dos conectores</li>
          <li>Configuração de APIs</li>
          <li>Testes de conectividade</li>
        </ul>
        
        <h4>Fase 3: Testes e validação (1 semana)</h4>
        <ul>
          <li>Testes de sincronização</li>
          <li>Validação de dados</li>
          <li>Ajustes finais</li>
        </ul>
        
        <h4>Fase 4: Go-live e suporte (ongoing)</h4>
        <ul>
          <li>Ativação em produção</li>
          <li>Monitoramento inicial</li>
          <li>Suporte contínuo</li>
        </ul>
        
        <h3>Melhores práticas</h3>
        <p>Para garantir o sucesso da integração, recomendamos:</p>
        
        <ul>
          <li>Envolver todas as partes interessadas desde o início</li>
          <li>Realizar backup completo dos dados antes da integração</li>
          <li>Implementar em ambiente de teste primeiro</li>
          <li>Treinar a equipe nos novos processos</li>
          <li>Estabelecer rotinas de monitoramento</li>
        </ul>
        
        <p>Com planejamento adequado e as ferramentas certas, a integração entre RH e ERP pode ser implementada de forma suave e trazer benefícios imediatos para sua organização.</p>
      `,
      date: "10 de Janeiro, 2025",
      readTime: "7 min",
      category: "Tutorial",
      image: "/images/blog/news-3.webp",
      author: "Carlos Ferreira",
      tags: ["ERP", "Integração", "API", "Tecnologia"]
    }
  ]

  useEffect(() => {
    const currentPost = blogPosts.find(p => p.id === parseInt(id))
    setPost(currentPost)
    
    // Posts relacionados (excluindo o atual)
    const related = blogPosts.filter(p => p.id !== parseInt(id)).slice(0, 2)
    setRelatedPosts(related)
    
    setLoading(false)
    
    // Scroll to top when post changes
    window.scrollTo(0, 0)
  }, [id])

  const formatDate = (dateString) => {
    return dateString
  }

  const shareOnSocial = (platform) => {
    const url = window.location.href
    const title = post?.title
    
    let shareUrl = ''
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="blog-post-loading">
          <div className="container">
            <div className="loading-spinner"></div>
            <p>Carregando post...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div>
        <Header />
        <div className="blog-post-not-found">
          <div className="container">
            <h1>Post não encontrado</h1>
            <p>O post que você está procurando não existe ou foi removido.</p>
            <Link to="/blog" className="btn-primary">
              <ArrowLeft size={20} />
              Voltar para o Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      
      <main className="blog-post-main">
        <article className="blog-post">
          <div className="container">
            <div className="blog-post-header">
              <Link to="/blog" className="back-link">
                <ArrowLeft size={20} />
                Voltar para o Blog
              </Link>
              <br />
              
              <div className="post-category">
                <Tag size={16} />
                {post.category}
              </div>
              
              <h1 className="post-title">{post.title}</h1>
              
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
              
              <div className="post-share">
                <span>Compartilhar:</span>
                <div className="share-buttons">
                  <button onClick={() => shareOnSocial('facebook')} className="share-btn facebook">
                    <Facebook size={18} />
                  </button>
                  <button onClick={() => shareOnSocial('twitter')} className="share-btn twitter">
                    <Twitter size={18} />
                  </button>
                  <button onClick={() => shareOnSocial('linkedin')} className="share-btn linkedin">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>
            
            <div className="post-content">
              <div 
                className="content-html"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="post-bottom-section">
                <Link to="/blog" className="back-link-bottom">
                  <ArrowLeft size={20} />
                  Voltar para o Blog
                </Link>
                
                <div className="post-tags">
                  <h4>Tags:</h4>
                  <div className="tags-list">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="post-share-bottom">
                <h4>Gostou do conteúdo? Compartilhe:</h4>
                <div className="share-buttons">
                  <button onClick={() => shareOnSocial('facebook')} className="share-btn facebook">
                    <Facebook size={18} />
                    Facebook
                  </button>
                  <button onClick={() => shareOnSocial('twitter')} className="share-btn twitter">
                    <Twitter size={18} />
                    Twitter
                  </button>
                  <button onClick={() => shareOnSocial('linkedin')} className="share-btn linkedin">
                    <Linkedin size={18} />
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        {relatedPosts.length > 0 && (
          <section className="related-posts">
            <div className="container">
              <h3>Posts Relacionados</h3>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="related-post-card">
                    <div className="related-post-image">
                      <img src={relatedPost.image} alt={relatedPost.title} />
                      <div className="related-post-category">{relatedPost.category}</div>
                    </div>
                    
                    <div className="related-post-content">
                      <div className="related-post-meta">
                        <span className="related-post-date">
                          <Calendar size={14} />
                          {relatedPost.date}
                        </span>
                        <span className="related-post-read-time">
                          <Clock size={14} />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      
                      <h4>{relatedPost.title}</h4>
                      <p>{relatedPost.description}</p>
                      
                      <Link to={`/blog/${relatedPost.id}`} className="related-post-link">
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
      </main>
      
      <Footer />
    </div>
  )
}

export default BlogPost 