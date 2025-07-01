import { useState, useEffect } from 'react'
import { Users, Shield, Zap, BarChart3, FileCheck, Clock } from 'lucide-react'
import './ProductShowcase.css'

const ProductShowcase = () => {
  const [activeCard, setActiveCard] = useState(0)

  const products = [
    {
      id: 'ats',
      title: 'O melhor ATS para seu perfil',
      subtitle: 'Sistema completo de gestão de candidatos com IA integrada.',
      description: 'Conheça o ATS Dirhect',
      icon: <Users size={32} />,
      color: 'from-blue-500 to-purple-600',
      features: [
        'Triagem inteligente de currículos',
        'Pipeline visual de candidatos',
        'Relatórios avançados de recrutamento'
      ]
    },
    {
      id: 'automation',
      title: 'Automação que funciona',
      subtitle: 'Automatize 98% dos seus processos de elegibilidade.',
      description: 'Conheça a Automação Dirhect',
      icon: <Zap size={32} />,
      color: 'from-purple-500 to-pink-600',
      features: [
        'Verificação automática de critérios',
        'Redução de 90% em erros manuais',
        'Integração com sistemas existentes'
      ]
    },
    {
      id: 'digital',
      title: 'Admissão 100% digital',
      subtitle: 'Processo de admissão sem papel, rápido e seguro.',
      description: 'Conheça a Admissão Digital',
      icon: <FileCheck size={32} />,
      color: 'from-green-500 to-teal-600',
      features: [
        'Assinatura eletrônica válida',
        'Onboarding automatizado',
        'Redução de 70% no tempo'
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % products.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [products.length])

  return (
    <section className="product-showcase section">
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-text">
            <h2 className="showcase-title">
              {products[activeCard].title}
            </h2>
            <p className="showcase-subtitle">
              {products[activeCard].subtitle}
            </p>
            <button className="btn-primary showcase-cta">
              {products[activeCard].description}
            </button>
            
            <div className="product-features">
              {products[activeCard].features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-dot"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase-visual">
            <div className="cards-container">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`product-card ${index === activeCard ? 'active' : ''} ${index < activeCard ? 'prev' : ''} ${index > activeCard ? 'next' : ''}`}
                  style={{
                    '--card-index': index,
                    '--active-index': activeCard
                  }}
                >
                  <div className={`card-gradient ${product.color}`}>
                    <div className="card-icon">
                      {product.icon}
                    </div>
                    <div className="card-content">
                      <h3>{product.title}</h3>
                      <p>{product.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="showcase-indicators">
          {products.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeCard ? 'active' : ''}`}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase 