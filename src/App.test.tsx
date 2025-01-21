import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import App from './App'

// Mock the tracking initialization
vi.mock('./utils/initializeTracking', () => ({
  initializeTracking: vi.fn()
}))

// Add this mock at the top with other mocks
vi.mock('./components/ParticleBackground', () => ({
  default: () => null
}))

describe('App', () => {
  beforeEach(() => {
    // Reset any mocks and localStorage before each test
    vi.clearAllMocks()
    localStorage.clear()

    // reset the window.location
    window.location.hash = ''
  })
  describe('redering', () => {
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
        'Expertise',
        'Tech Stack Favorites',
        'Professional Journey',
        'Get in Touch'
      ]

      sections.forEach(section => {
        const sectionElement = screen.getByRole('heading', { name: section })
        expect(sectionElement).toBeInTheDocument()
      })
    })

    it('renders navigation links correctly', () => {
      render(<App />)

      // Check if all navigation links are present
      const navLinks = screen.getAllByRole('link', { name: /^(Home|About|Expertise|Tech Stack|Timeline|Contact)$/ })
      const expectedLinks = ['Home', 'About', 'Expertise', 'Tech Stack', 'Timeline', 'Contact']

      expectedLinks.forEach(linkText => {
        const link = navLinks.find(l => l.textContent === linkText)
        expect(link).toBeInTheDocument()
      })
    })

    it('renders footer and cookie banner', () => {
      render(<App />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      // check the footer details
      const footerDetails = screen.getByText('© 2025 Dr Marco Blumendorf. All rights reserved.')
      expect(footerDetails).toBeInTheDocument()
      // privacy policy link
      const privacyPolicyLink = screen.getByRole('link', { name: 'Privacy Policy' })
      expect(privacyPolicyLink).toBeInTheDocument()
      // impressum link
      const impressumLink = screen.getByRole('link', { name: 'Impressum' })
      expect(impressumLink).toBeVisible()

      // Check if the cookie banner is present
      const cookieBanner = screen.getByRole('dialog', { name: 'Cookie banner' })
      expect(cookieBanner).toBeVisible()
      // check cookie banner details
      const cookieBannerText = screen.getByText('We respect your privacy and are committed to transparency. We use cookies to enhance your experience and analyze site traffic.')
      expect(cookieBannerText).toBeVisible()
      // check cookie banner buttons
      const cookieBannerButton = screen.getByRole('button', { name: 'Accept All' })
      expect(cookieBannerButton).toBeVisible()
      const cookieBannerButtonDecline = screen.getByRole('button', { name: 'Decline All' })
      expect(cookieBannerButtonDecline).toBeVisible()

      expect(cookieBanner).toBeInTheDocument()
    })
  })
  describe('Cookie Banner', () => {
    it('accepts all cookies', () => {
      render(<App />)
      const cookieBanner = screen.getByRole('dialog', { name: 'Cookie banner' })
      expect(cookieBanner).toBeVisible()

      // click the accept all button
      const cookieBannerButton = screen.getByRole('button', { name: 'Accept All' })
      fireEvent.click(cookieBannerButton)

      // check if the cookie banner is not visible
      expect(cookieBanner).not.toBeVisible()

      // check if the consent was stored in localStorage
      expect(localStorage.getItem('cookieConsent')).toBe('true')
    })

    it('rejects all cookies', () => {
      render(<App />)
      const cookieBanner = screen.getByRole('dialog', { name: 'Cookie banner' })
      expect(cookieBanner).toBeVisible()

      // click the decline all button
      const cookieBannerButton = screen.getByRole('button', { name: 'Decline All' })
      fireEvent.click(cookieBannerButton)

      // check if the cookie banner is not visible
      expect(cookieBanner).not.toBeVisible()

      // check if the consent was stored in localStorage
      expect(localStorage.getItem('cookieConsent')).toBe('false')
    })

  })

  describe('Navigation', () => {
    it('clicks the desktop navigation buttons to scroll to the correct section', () => {
      render(<App />)

      // Mock scrollIntoView
      const scrollIntoViewMock = vi.fn()
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

      // Define all navigation items with their link text and corresponding section heading
      const navItems = [
        { linkText: 'Home', sectionId: 'home' },
        { linkText: 'About', sectionHeading: 'About Me', sectionId: 'about' },
        { linkText: 'Expertise', sectionHeading: 'Expertise', sectionId: 'expertise' },
        { linkText: 'Tech Stack', sectionHeading: 'Tech Stack Favorites', sectionId: 'tech-stack' },
        { linkText: 'Timeline', sectionHeading: 'Professional Journey', sectionId: 'timeline' },
        { linkText: 'Contact', sectionHeading: 'Get in Touch', sectionId: 'contact' }
      ]

      // Test desktop navigation links
      const desktopNav = screen.getByLabelText('Desktop navigation')
      navItems.forEach(({ linkText, sectionHeading, sectionId }) => {
        // Reset mock counts
        scrollIntoViewMock.mockClear()

        // Get the link from desktop navigation
        const link = within(desktopNav).getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()

        // Get the section if it has a heading
        let section
        if (sectionHeading) {
          section = screen.getByRole('heading', { name: sectionHeading }).closest('section')
        } else {
          section = document.getElementById(sectionId)
        }
        expect(section).toHaveAttribute('id', sectionId)

        // Mock getElementById for this section
        const getElementByIdSpy = vi.spyOn(document, 'getElementById')
        getElementByIdSpy.mockReturnValue(section)

        // Click the link
        fireEvent.click(link)

        // Verify the correct section was targeted
        expect(getElementByIdSpy).toHaveBeenCalledWith(sectionId)
        expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

        // Clean up spy for next iteration
        getElementByIdSpy.mockRestore()
      })
    })

    it('clicks the mobile navigation buttons to scroll to the correct section', () => {
      render(<App />)

      // Mock scrollIntoView
      const scrollIntoViewMock = vi.fn()
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

      // Define all navigation items with their link text and corresponding section heading
      const navItems = [
        { linkText: 'Home', sectionId: 'home' },
        { linkText: 'About', sectionHeading: 'About Me', sectionId: 'about' },
        { linkText: 'Expertise', sectionHeading: 'Expertise', sectionId: 'expertise' },
        { linkText: 'Tech Stack', sectionHeading: 'Tech Stack Favorites', sectionId: 'tech-stack' },
        { linkText: 'Timeline', sectionHeading: 'Professional Journey', sectionId: 'timeline' },
        { linkText: 'Contact', sectionHeading: 'Get in Touch', sectionId: 'contact' }
      ]

      // Open mobile menu
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' })
      fireEvent.click(mobileMenuButton)

      // Test mobile navigation links
      const mobileNav = screen.getByLabelText('Mobile navigation')
      navItems.forEach(({ linkText, sectionHeading, sectionId }) => {
        // Reset mock counts
        scrollIntoViewMock.mockClear()

        // Get the link from mobile navigation
        const link = within(mobileNav).getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()

        // Get the section if it has a heading
        let section
        if (sectionHeading) {
          section = screen.getByRole('heading', { name: sectionHeading }).closest('section')
        } else {
          section = document.getElementById(sectionId)
        }
        expect(section).toHaveAttribute('id', sectionId)

        // Mock getElementById for this section
        const getElementByIdSpy = vi.spyOn(document, 'getElementById')
        getElementByIdSpy.mockReturnValue(section)

        // Click the link
        fireEvent.click(link)

        // Verify the correct section was targeted
        expect(getElementByIdSpy).toHaveBeenCalledWith(sectionId)
        expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

        // Verify mobile menu is closed after clicking
        expect(mobileNav.classList.contains('hidden')).toBe(true)

        // Clean up spy for next iteration
        getElementByIdSpy.mockRestore()
      })
    })

    it('opens the impressum', () => {
      render(<App />)

      const impressumLink = screen.getByRole('link', { name: 'Impressum' })
      fireEvent.click(impressumLink)

      // Instead of checking pathname, check the hash
      expect(window.location.hash).toBe('#/impressum')
    })

    it('opens the privacy policy', () => {
      render(<App />)

      const privacyPolicyLink = screen.getByRole('link', { name: 'Privacy Policy' })
      fireEvent.click(privacyPolicyLink)

      // Instead of checking pathname, check the hash
      expect(window.location.hash).toBe('#/privacy-policy')
    })
  })

  describe('Contact Buttons', () => {
    beforeEach(() => {
      // Mock atob function
      vi.spyOn(window, 'atob')

      // Add this: Mock window.location
      const originalLocation = window.location
      window.location = { ...originalLocation, href: '' }
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    it('opens email link', () => {
      render(<App />)

      const emailLink = screen.getByRole('link', { name: 'Contact via Email' })
      expect(emailLink).toHaveAttribute('href', '#')
      fireEvent.click(emailLink)
      // expect atob to be called with the encoded email
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

