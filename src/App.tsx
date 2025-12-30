import { useDevMessage } from './hooks/useDevMessage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheShift from './components/TheShift';
import About from './components/About';
import Expertise from './components/Expertise';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Show development process message in console
  useDevMessage();

  return (
    <div className="min-h-screen" lang="en">
      <Navbar />
      <main role="main" aria-label="Main content">
        <Hero />
        <TheShift />
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
