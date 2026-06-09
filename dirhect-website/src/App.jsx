import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Roadmap from './pages/Roadmap'
import Demo from './pages/Demo'
import TechnicalDocumentation from './pages/TechnicalDocumentation'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import TermosUso from './pages/TermosUso'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import CriarPost from './pages/CriarPost'
import CriarRoadmap from './pages/CriarRoadmap'
import CriarConhecimento from './pages/CriarConhecimento'
import Conhecimento from './pages/Conhecimento'
import ConhecimentoDetalhe from './pages/ConhecimentoDetalhe'
import IndiqueGanhe from './pages/IndiqueGanhe'
import AdmissaoDigital from './pages/AdmissaoDigital'
import GestaoBeneficios from './pages/GestaoBeneficios'
import GestaoTarefas from './pages/GestaoTarefas'
import PortalRH from './pages/PortalRH'
import './App.css'
import Hero from './components/Hero'
import HomeAboutFold from './components/HomeAboutFold'
import HomeConnectorFold from './components/HomeConnectorFold'
import HomeRhChallengesFold from './components/HomeRhChallengesFold'
import HomeSolutionFold from './components/HomeSolutionFold'
import HomeSolutionModulesFold from './components/HomeSolutionModulesFold'
import HomeResultsFold from './components/HomeResultsFold'
import HomePlatformFold from './components/HomePlatformFold'
import AppFeatures from './components/AppFeatures'
import HomeBpmFold from './components/HomeBpmFold'
import HomeAppFeaturesCardsFold from './components/HomeAppFeaturesCardsFold'
import Footer from './components/Footer'
import Header from './components/Header'
import Integrations from './components/Integrations'
import Parceiros from './pages/Parceiros'
import CookieConsent from './components/CookieConsent'
import ColaboradorLogin from './pages/ColaboradorLogin'
import ColaboradorPainel from './pages/ColaboradorPainel'
import ParceiroSubdominio from './pages/ParceiroSubdominio'

function App() {
  const hostname = window.location.hostname.toLowerCase()
  const isPartnerSubdomain =
    hostname === 'parceiro.localhost' ||
    hostname === 'parceiro.127.0.0.1' ||
    hostname.startsWith('parceiro.')

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width > 1440) {
        document.body.style.zoom = width / 1440
      } else {
        document.body.style.zoom = 1
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.zoom = 1
    }
  }, [])

  if (isPartnerSubdomain) {
    return (
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="*" element={<ParceiroSubdominio />} />
          </Routes>
        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <HomeAboutFold />
              <HomeConnectorFold />
              <HomeRhChallengesFold />
              <HomeSolutionFold />
              <HomeSolutionModulesFold />
              <HomePlatformFold />
              <HomeResultsFold />
              <AppFeatures />
              <HomeBpmFold />
              <HomeAppFeaturesCardsFold />
              <Integrations />
              <Footer />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/conhecimento" element={<Conhecimento />} />
          <Route path="/conhecimento/:id" element={<ConhecimentoDetalhe />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/indique-ganhe" element={<IndiqueGanhe />} />
          <Route path="/admissao-digital" element={<AdmissaoDigital />} />
          <Route path="/gestao-beneficios" element={<GestaoBeneficios />} />
          <Route path="/gestao-tarefas" element={<GestaoTarefas />} />
          <Route path="/portal-rh" element={<PortalRH />} />
          <Route path="/docs" element={<TechnicalDocumentation />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/parceiro" element={<ParceiroSubdominio />} />
          <Route path="/area-colaborador" element={<ColaboradorLogin />} />
          <Route path="/area-colaborador/painel" element={<ColaboradorPainel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/criar-post" element={<CriarPost />} />
          <Route path="/admin/criar-roadmap" element={<CriarRoadmap />} />
          <Route path="/admin/criar-conhecimento" element={<CriarConhecimento />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </div>
    </Router>
  )
}

export default App
