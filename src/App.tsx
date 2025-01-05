import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TechStack from './components/TechStack'
import Timeline from './components/Timeline'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <TechStack />
        <Timeline />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
