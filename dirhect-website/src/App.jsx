import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Demo from './pages/Demo'
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

const GRADIENT = 'linear-gradient(to left, #0c004c, #5d0b62)';

function App() {
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
              <AppFeatures />
              <News />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
