import { useEffect } from 'react'
import Header from '../components/Header'
import HomeBpmFold from '../components/HomeBpmFold'
import Footer from '../components/Footer'

const BPMS = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bpms-page" style={{ paddingTop: '80px' }}>
      <Header />
      <HomeBpmFold isStandalone={true} />
      <Footer />
    </div>
  )
}

export default BPMS
