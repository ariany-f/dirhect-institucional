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
import './App.css'
import Hero from './components/Hero'
import WhyChoose from './components/WhyChoose'
import Solutions from './components/Solutions'
import About from './components/About'
import AppFeatures from './components/AppFeatures'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import SecuritySection from './components/SecuritySection'
import Integrations from './components/Integrations'
import FloatingButtons from './components/FloatingButtons'

const GRADIENT = 'linear-gradient(to left, #0c004c, #5d0b62)';

function App() {
  // Lida com navegação por âncora quando a página carrega
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

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WhyChoose />
              <Solutions />
              <About />
              <Integrations />
              <AppFeatures />
              <SecuritySection />
              <News />
              <Contact />
              <FloatingButtons />
              <Footer />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/docs" element={<TechnicalDocumentation />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
