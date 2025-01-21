import React from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import PrivacyPolicy from './components/PrivacyPolicy'
import Impressum from './components/Impressum'
import { useDevMessage } from './hooks/useDevMessage'
import { initializeGoogleAnalytics } from './utils/analytics'

// Add type for section configuration
type SectionConfig = {
  id: string;
  Component: React.ComponentType;
};

function MainContent() {
  const location = useLocation();

  // Handle scroll when hash changes
  React.useEffect(() => {
    // Get the hash without the '#' symbol
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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

function MainLayout() {
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

function App() {
  // Initialize Google Analytics with your measurement ID
  initializeGoogleAnalytics('G-MG5LDT8GT6');

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </HashRouter>
  )
}

export default App
