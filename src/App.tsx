import { useState } from 'react';
import { useDevMessage, PersonaProvider } from '@/features/shared';
import {
  Navbar,
  Hero,
  About,
  Expertise,
  TechStack,
  Timeline,
  Lab,
  Contact,
  Footer,
} from '@/features/home';
import { NetworkBackground, JsonView } from '@/components/ui';

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
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:bg-accent focus:text-page focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>

        {/* ARIA live region for screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {isJsonMode ? 'JSON view active' : 'Human view active'}
        </div>

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
          <main id="main-content" role="main" aria-label="Main content" className="relative z-10">
            <Hero />
            <About />
            <Expertise />
            <TechStack />
            <Timeline />
            <Lab />
            <Contact />
          </main>
        )}

        {!isJsonMode && <Footer />}
      </div>
    </PersonaProvider>
  );
}

export default App;
