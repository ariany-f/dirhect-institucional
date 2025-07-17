import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import AppFeatures from '../components/AppFeatures'
import Solutions from '../components/Solutions'
import SecuritySection from '../components/SecuritySection'
import PartnersStrip from '../components/PartnersStrip'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ProductShowcase />
      <AppFeatures />
      <Solutions />
      <SecuritySection />
      <PartnersStrip />
      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Home 