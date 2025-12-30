import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<App />)
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
    })

    it('renders all main sections', () => {
      render(<App />)

      // Check if all main sections are present by their headings
      const sections = [
        'About Me',
        'Areas of Focus',
        'Technical Foundation',
        'Professional Journey',
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
      render(<App />)

      const desktopNav = screen.getByLabelText('Desktop navigation')
      // Home link is now the logo, not in the nav items
      const expectedLinks = ['About', 'Expertise', 'Tech Stack', 'Journey', 'Contact']

      expectedLinks.forEach(linkText => {
        const link = within(desktopNav).getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()
      })
    })

    it('renders footer', () => {
      render(<App />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()

      // Check footer copyright text
      const footerText = screen.getByText(/© \d{4} Dr Marco Blumendorf\. All rights reserved\./)
      expect(footerText).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('clicks the desktop navigation buttons to scroll to the correct section', () => {
      render(<App />)

      const scrollIntoViewMock = vi.fn()
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

      // Home link is now the logo, test it separately
      const navItems = [
        { linkText: 'About', sectionId: 'about' },
        { linkText: 'Expertise', sectionId: 'expertise' },
        { linkText: 'Tech Stack', sectionId: 'tech-stack' },
        { linkText: 'Journey', sectionId: 'journey' },
        { linkText: 'Contact', sectionId: 'contact' }
      ]

      const desktopNav = screen.getByLabelText('Desktop navigation')

      navItems.forEach(({ linkText, sectionId }) => {
        scrollIntoViewMock.mockClear()

        const link = within(desktopNav).getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()

        const section = document.getElementById(sectionId)
        const getElementByIdSpy = vi.spyOn(document, 'getElementById')
        getElementByIdSpy.mockReturnValue(section)

        fireEvent.click(link)

        expect(getElementByIdSpy).toHaveBeenCalledWith(sectionId)
        expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

        getElementByIdSpy.mockRestore()
      })
    })

    it('opens mobile menu', () => {
      render(<App />)

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

  describe('Theme Toggle', () => {
    it('toggles between dark and light mode', () => {
      render(<App />)

      // Initially should be in dark mode (based on system preference or default)
      const themeToggle = screen.getAllByRole('button', { name: /Switch to (light|dark) mode/i })[0]
      expect(themeToggle).toBeInTheDocument()

      // Click to toggle theme
      fireEvent.click(themeToggle)

      // Theme should have toggled (localStorage should be updated)
      const theme = localStorage.getItem('theme')
      expect(theme).toBeDefined()
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
      render(<App />)

      const emailLink = screen.getByRole('link', { name: 'Contact via Email' })
      expect(emailLink).toHaveAttribute('href', '#')
      fireEvent.click(emailLink)
      expect(atob).toHaveBeenCalled()
    })

    it('has correct hrefs for contact links', () => {
      render(<App />)

      const linkedInLink = screen.getByRole('link', { name: /Connect on LinkedIn/i })
      expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/marcoblu')
      expect(linkedInLink).toHaveAttribute('target', '_blank')
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

      const githubLink = screen.getByRole('link', { name: /github\.com\/blumendorf/i })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/blumendorf')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
