import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TechStack from './components/TechStack'
import Timeline from './components/Timeline'
import Section from './components/Section'
import CookieBanner from './components/CookieBanner'
import { useDevMessage } from './hooks/useDevMessage'
import { initializeTracking } from './utils/initializeTracking'

// Add type for section configuration
type SectionConfig = {
  id: string;
  Component: React.ComponentType;
};

function MainContent() {
  // Define sections with explicit IDs
  const mainSections: SectionConfig[] = [
    { id: 'home', Component: Hero },
    { id: 'about', Component: About },
    { id: 'expertise', Component: Expertise },
    { id: 'tech-stack', Component: TechStack },
    { id: 'timeline', Component: Timeline },
    { id: 'contact', Component: Contact },
  ];

  return (
    <main className="pt-16" role="main" aria-label="Main content">
      {mainSections.map(({ id, Component }, index) => (
        <Section
          key={id}
          id={id}
          index={index}
          totalSections={mainSections.length}
        >
          <Component />
        </Section>
      ))}
    </main>
  );
}

function App() {
  // Initialize tracking
  React.useEffect(() => {
    initializeTracking();
  }, []);

  // Show development process message
  useDevMessage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" lang="en">
      <Navbar />
      <MainContent />
      <Footer />
      <CookieBanner />
    </div>
  )
}

export default App
