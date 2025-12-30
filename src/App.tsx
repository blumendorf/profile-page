import { useDevMessage } from './hooks/useDevMessage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NetworkBackground from './components/ui/NetworkBackground';

function App() {
  // Show development process message in console
  useDevMessage();

  return (
    <div className="min-h-screen relative" lang="en">
      <NetworkBackground />
      <Navbar />
      <main role="main" aria-label="Main content" className="relative z-10">
        <Hero />
        <About />
        <Expertise />
        <TechStack />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
