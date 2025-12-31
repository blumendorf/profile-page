import { useState } from 'react';
import { useDevMessage } from './hooks/useDevMessage';
import { PersonaProvider } from './contexts/PersonaContext';
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
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [focusedJsonSection, setFocusedJsonSection] = useState<string | null>(null);

  const handleToggleJsonMode = () => {
    setIsJsonMode(!isJsonMode);
    setFocusedJsonSection(null); // Reset focus when toggling
  };

  return (
    <PersonaProvider>
      <div className="min-h-screen relative" lang="en">
        {!isJsonMode && <NetworkBackground />}
        <Navbar
          isJsonMode={isJsonMode}
          onToggleJsonMode={handleToggleJsonMode}
          onNavigateInJsonMode={setFocusedJsonSection}
          focusedJsonSection={focusedJsonSection}
        />

        {isJsonMode ? (
          <JsonView focusedSection={focusedJsonSection} />
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

        {!isJsonMode && <Footer />}
      </div>
    </PersonaProvider>
  );
}

export default App;
