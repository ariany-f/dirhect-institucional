import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Hero from '../components/Hero'
import HomeAboutFold from '../components/HomeAboutFold'
import HomeConnectorFold from '../components/HomeConnectorFold'
import HomeRhChallengesFold from '../components/HomeRhChallengesFold'
import HomeSolutionFold from '../components/HomeSolutionFold'
import HomeSolutionModulesFold from '../components/HomeSolutionModulesFold'
import HomeResultsFold from '../components/HomeResultsFold'
import HomePlatformFold from '../components/HomePlatformFold'
import ProductShowcase from '../components/ProductShowcase'
import AppFeatures from '../components/AppFeatures'
import Solutions from '../components/Solutions'
import SecuritySection from '../components/SecuritySection'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <HomeAboutFold />
      <HomeConnectorFold />
      <HomeRhChallengesFold />
      <HomeSolutionFold />
      <HomeSolutionModulesFold />
      <HomePlatformFold />
      <HomeResultsFold />
      <ProductShowcase />
      <AppFeatures />
      <Solutions />
      <SecuritySection />
      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Home 