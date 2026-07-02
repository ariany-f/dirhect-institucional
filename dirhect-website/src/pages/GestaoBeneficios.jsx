import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, ArrowLeft, Heart } from 'lucide-react';
import './GestaoBeneficios.css';
import Footer from '../components/Footer';

const GestaoBeneficios = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gestao-beneficios-page gestao-beneficios-construction">
      <main className="construction-main">
        <div className="construction-container">
          <div className="construction-card">
            
            <div className="construction-icon-wrapper">
              <div className="construction-icon-pulse"></div>
              <Hammer className="construction-icon" size={48} />
            </div>

            <div className="construction-badge">
              <Heart size={14} className="heart-icon" />
              <span>Gestão de Benefícios</span>
            </div>

            <h1 className="construction-title">
              Página em <span className="highlight-text">Construção</span>
            </h1>

            <p className="construction-description">
              Estamos desenvolvendo uma solução completa, inteligente e integrada para gerenciar vale-refeição, planos de saúde e benefícios flexíveis em um único lugar. Em breve, novidades incríveis para simplificar o seu RH!
            </p>

            <div className="construction-action">
              <Link to="/" className="btn-back-home">
                <ArrowLeft size={18} />
                Voltar para a Página Inicial
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GestaoBeneficios;