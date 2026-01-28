import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Wrapper to provide router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> })
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      renderWithRouter(<App />)
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
    })

    it('renders all main sections', () => {
      renderWithRouter(<App />)

      // Check if all main sections are present by their headings
      const sections = [
        'About Me',
        'Areas of Focus',
        'Technical Foundation',
        'Professional Journey',
        'The Lab',
        'Get in Touch'
      ]

      sections.forEach(section => {
        const sectionElement = screen.getByRole('heading', { name: section })
        expect(sectionElement).toBeInTheDocument()
      })

      // Verify the About section has content (pillar card headings are h4, not h3)
      const aboutSection = document.getElementById('about')
      expect(aboutSection).toBeInTheDocument()
    })

    it('renders navigation links correctly', () => {
      renderWithRouter(<App />)

      const desktopNav = screen.getByLabelText('Desktop navigation')
      // Home link is now the logo, not in the nav items
      const expectedLinks = ['About', 'Expertise', 'Tech Stack', 'Journey', 'Lab', 'Contact']

      expectedLinks.forEach(linkText => {
        const link = within(desktopNav).getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()
      })
    })

    it('renders footer', () => {
      renderWithRouter(<App />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()

      // Check footer copyright text
      const footerText = screen.getByText(/© \d{4} Dr Marco Blumendorf\. All rights reserved\./)
      expect(footerText).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('clicks the desktop navigation buttons to scroll to the correct section', () => {
      renderWithRouter(<App />)

      const scrollToMock = vi.fn()
      window.scrollTo = scrollToMock

      // Home link is now the logo, test it separately
      const navItems = [
        { linkText: 'About', sectionId: 'about' },
        { linkText: 'Expertise', sectionId: 'expertise' },
        { linkText: 'Tech Stack', sectionId: 'tech-stack' },
        { linkText: 'Journey', sectionId: 'journey' },
        { linkText: 'Lab', sectionId: 'lab' },
        { linkText: 'Contact', sectionId: 'contact' }
      ]

      const desktopNav = screen.getByLabelText('Desktop navigation')

      navItems.forEach(({ linkText, sectionId }) => {
        scrollToMock.mockClear()

        const link = within(desktopNav).getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()

        const getElementByIdSpy = vi.spyOn(document, 'getElementById')

        fireEvent.click(link)

        expect(getElementByIdSpy).toHaveBeenCalledWith(sectionId)
        // scrollTo is called if element exists (smooth scroll behavior)
        expect(scrollToMock).toHaveBeenCalled()

        getElementByIdSpy.mockRestore()
      })
    })

    it('opens mobile menu', () => {
      renderWithRouter(<App />)

      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' })

      // Open menu
      fireEvent.click(mobileMenuButton)

      const mobileNav = screen.getByLabelText('Mobile navigation')
      expect(mobileNav).toBeInTheDocument()

      // Verify links are present
      const homeLink = within(mobileNav).getByRole('link', { name: 'Home' })
      expect(homeLink).toBeInTheDocument()
    })
  })

  describe('Contact Buttons', () => {
    beforeEach(() => {
      vi.spyOn(window, 'atob')
      const originalLocation = window.location
      Object.defineProperty(window, 'location', {
        value: { ...originalLocation, href: '' },
        writable: true
      })
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    it('opens email link', () => {
      renderWithRouter(<App />)

      const emailLink = screen.getByRole('link', { name: 'Contact via Email' })
      expect(emailLink).toHaveAttribute('href', '#')
      fireEvent.click(emailLink)
      expect(atob).toHaveBeenCalled()
    })

    it('has correct hrefs for contact links', () => {
      renderWithRouter(<App />)

      const linkedInLink = screen.getByRole('link', { name: /LinkedIn profile/i })
      expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/marcoblu')
      expect(linkedInLink).toHaveAttribute('target', '_blank')
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

      const githubLink = screen.getByRole('link', { name: /GitHub profile/i })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/blumendorf')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('DOM Snapshots', () => {
    it('hero section structure', () => {
      renderWithRouter(<App />)
      const hero = document.getElementById('home')
      expect(hero!.innerHTML).toMatchSnapshot()
    })

    it('about section structure', () => {
      renderWithRouter(<App />)
      const about = document.getElementById('about')
      expect(about!.innerHTML).toMatchSnapshot()
    })

    it('expertise section structure', () => {
      renderWithRouter(<App />)
      const expertise = document.getElementById('expertise')
      expect(expertise!.innerHTML).toMatchSnapshot()
    })

    it('tech-stack section structure', () => {
      renderWithRouter(<App />)
      const techStack = document.getElementById('tech-stack')
      expect(techStack!.innerHTML).toMatchSnapshot()
    })

    it('contact section structure', () => {
      renderWithRouter(<App />)
      const contact = document.getElementById('contact')
      expect(contact!.innerHTML).toMatchSnapshot()
    })

    it('navigation structure', () => {
      renderWithRouter(<App />)
      const nav = document.querySelector('nav')
      expect(nav!.innerHTML).toMatchSnapshot()
    })

    it('footer structure', () => {
      renderWithRouter(<App />)
      const footer = document.querySelector('footer')
      expect(footer!.innerHTML).toMatchSnapshot()
    })

    it('heading hierarchy', () => {
      renderWithRouter(<App />)
      const headings: string[] = []
      document.querySelectorAll('h1, h2, h3').forEach((h) => {
        const level = h.tagName.toLowerCase()
        const text = h.textContent?.trim() || ''
        if (text) {
          headings.push(`${level}: ${text}`)
        }
      })
      expect(headings.join('\n')).toMatchSnapshot()
    })
  })
})
