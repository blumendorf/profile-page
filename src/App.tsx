import { useState } from 'react';
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
import JsonView from './components/ui/JsonView';

function App() {
  // Show development process message in console
  useDevMessage();
  const [isLLMMode, setIsLLMMode] = useState(false);

  return (
    <div className="min-h-screen relative" lang="en">
      {!isLLMMode && <NetworkBackground />}
      <Navbar isLLMMode={isLLMMode} onToggleLLMMode={() => setIsLLMMode(!isLLMMode)} />

      {isLLMMode ? (
        <JsonView />
      ) : (
        <main role="main" aria-label="Main content" className="relative z-10">
          <Hero />
          <About />
          <Expertise />
          <TechStack />
          <Timeline />
          <Contact />
        </main>
      )}

      {!isLLMMode && <Footer />}
    </div>
  );
}

export default App;
