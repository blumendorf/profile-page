import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import TechStack from './components/TechStack'
import Timeline from './components/Timeline'
import Section from './components/Section'

function App() {
  // Add console message about the development process
  React.useEffect(() => {
    const styles = [
      'color: #3B82F6',
      'font-size: 14px',
      'font-weight: bold',
      'padding: 8px',
    ].join(';');

    console.info('%c👋 Hello fellow developer!', styles);
    console.info(`
🤖 This profile page was created through a fully AI-assisted development process.
Not a single line of code was written by hand.

Primary Development Tools:
------------------------
• Cursor IDE with Claude-3.5-Sonnet
  - Core development process
  - Code generation and implementation
  - Real-time modifications and improvements
  - Technical problem-solving and debugging
  - Structure and architecture decisions

• ChatGPT
  - Content generation and refinement
  - Text content creation
  - Content review and optimization
  - Copy editing and tone consistency

Workflow:
--------
1. Initial React app and GitHub workflow created with Cursor IDE
2. Initial concepts and requirements created with ChatGPT
3. Claude was instructed to include Tailwind CSS and Lucide icons
4. Claude implemented the content into code
5. Iterative improvements through continuous AI collaboration
6. Final review and testing

This project demonstrates the potential of human-AI collaboration in web development.

Source code: https://github.com/blumendorf/profile-page
    `);
  }, []);

  // Define main content components in order
  const mainSections = [
    Hero,
    About,
    TechStack,
    Timeline,
    Services,
    Contact,
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-16">
        {mainSections.map((Component, index) => (
          <Section
            key={Component.name}
            id={Component.name.toLowerCase()}
            index={index}
            totalSections={mainSections.length}
          >
            <Component />
          </Section>
        ))}
      </main>
      <Footer />
    </div>
  )
}

export default App
