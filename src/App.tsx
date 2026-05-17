import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BusinessServices from './components/BusinessServices'
import InfluencerServices from './components/InfluencerServices'
import Packages from './components/Packages'
import FutureIdeas from './components/FutureIdeas'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <BusinessServices />
      <InfluencerServices />
      <Packages />
      <FutureIdeas />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
