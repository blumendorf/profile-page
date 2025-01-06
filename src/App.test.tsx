import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App'
import './test/setup'

// Mock the tracking initialization
vi.mock('./utils/initializeTracking', () => ({
  initializeTracking: vi.fn()
}))

describe('App', () => {
  beforeEach(() => {
    // Reset any mocks and localStorage before each test
    vi.clearAllMocks()
    localStorage.clear()
  })

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

    // Check if all navigation buttons are present
    const navButtons = screen.getAllByRole('button')
    const expectedButtons = ['Home', 'About', 'Expertise', 'Tech Stack', 'Timeline', 'Contact']

    expectedButtons.forEach(buttonText => {
      const button = navButtons.find(btn => btn.textContent === buttonText)
      expect(button).toBeInTheDocument()
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
    const cookieBannerButtonCustomize = screen.getByRole('button', { name: 'Customize' })
    expect(cookieBannerButtonCustomize).toBeVisible()

    expect(cookieBanner).toBeInTheDocument()
  })

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
    expect(localStorage.getItem('analyticsConsent')).toBe('true')
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
    expect(localStorage.getItem('cookieConsent')).toBe('true')
    expect(localStorage.getItem('analyticsConsent')).toBe('false')
  })

  it('customizes cookies - disabled analytics', () => {
    render(<App />)
    const cookieBanner = screen.getByRole('dialog', { name: 'Cookie banner' })
    expect(cookieBanner).toBeVisible()

    // click the customize button
    const cookieBannerButton = screen.getByRole('button', { name: 'Customize' })
    fireEvent.click(cookieBannerButton)

    // check if customize details are visible
    const cookieBannerDetails = screen.getByText('Essential Cookies')
    expect(cookieBannerDetails).toBeVisible()
    // check if analytics cookies are visible
    const cookieBannerDetailsAnalytics = screen.getByText('Analytics Cookies')
    expect(cookieBannerDetailsAnalytics).toBeVisible()

    // check if essential cookies checkbox is checked and disabled
    const essentialCheckbox = screen.getByRole('checkbox', { name: /Essential Cookies/ })
    expect(essentialCheckbox).toBeChecked()
    expect(essentialCheckbox).toBeDisabled()

    // check if analytics cookies are unchecked by default
    const analyticsCheckbox = screen.getByRole('checkbox', { name: /Analytics Cookies/ })
    expect(analyticsCheckbox).not.toBeChecked()
    expect(analyticsCheckbox).toBeEnabled()

    // click Save Preferences
    const cookieBannerButtonSave = screen.getByRole('button', { name: 'Save Preferences' })
    fireEvent.click(cookieBannerButtonSave)

    // check if the cookie banner is not visible
    expect(cookieBanner).not.toBeVisible()

    // check if the consent was stored in localStorage
    expect(localStorage.getItem('cookieConsent')).toBe('true')
    expect(localStorage.getItem('analyticsConsent')).toBe('false')
  })
  it('customizes cookies - disabled analytics', () => {
    render(<App />)
    const cookieBanner = screen.getByRole('dialog', { name: 'Cookie banner' })
    expect(cookieBanner).toBeVisible()

    // click the customize button
    const cookieBannerButton = screen.getByRole('button', { name: 'Customize' })
    fireEvent.click(cookieBannerButton)

    // check analytics checkbox
    const analyticsCheckbox = screen.getByRole('checkbox', { name: /Analytics Cookies/ })
    fireEvent.click(analyticsCheckbox)
    expect(analyticsCheckbox).toBeChecked()

    // click Save Preferences
    const cookieBannerButtonSave = screen.getByRole('button', { name: 'Save Preferences' })
    fireEvent.click(cookieBannerButtonSave)

    // check if the cookie banner is not visible
    expect(cookieBanner).not.toBeVisible()

    // check if the consent was stored in localStorage
    expect(localStorage.getItem('cookieConsent')).toBe('true')
    expect(localStorage.getItem('analyticsConsent')).toBe('true')
  })

  it('clicks the cta buttons to scroll to contact section', () => {
    render(<App />)

    // Get the contact section element
    const contactSection = screen.getByRole('heading', { name: 'Get in Touch' }).closest('section')
    expect(contactSection).toHaveAttribute('id', 'contact')

    // Mock getElementById to return our contact section
    const getElementByIdSpy = vi.spyOn(document, 'getElementById')
    getElementByIdSpy.mockReturnValue(contactSection)

    // Mock scrollIntoView
    const scrollIntoViewMock = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    // Click the hero CTA button
    const heroCtaButton = screen.getByRole('button', {
      name: 'Let\'s Work Together'
    })
    fireEvent.click(heroCtaButton)
    expect(getElementByIdSpy).toHaveBeenCalledWith('contact')
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

    // Click the expertise CTA button
    const expertiseCtaButton = screen.getByRole('button', {
      name: 'Need Help With Your Project?'
    })
    fireEvent.click(expertiseCtaButton)
    expect(getElementByIdSpy).toHaveBeenCalledWith('contact')
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

    // Verify getElementById was called with 'contact'
    expect(getElementByIdSpy).toHaveBeenCalledTimes(2)

    // Clean up
    getElementByIdSpy.mockRestore()
  })

  it('clicks the desktop navigation buttons to scroll to the correct section', () => {
    render(<App />)

    // Mock scrollIntoView
    const scrollIntoViewMock = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    // Define all navigation items with their button text and corresponding section heading
    const navItems = [
      { buttonText: 'Home', sectionId: 'home' },
      { buttonText: 'About', sectionHeading: 'About Me', sectionId: 'about' },
      { buttonText: 'Expertise', sectionHeading: 'Expertise', sectionId: 'expertise' },
      { buttonText: 'Tech Stack', sectionHeading: 'Tech Stack Favorites', sectionId: 'tech-stack' },
      { buttonText: 'Timeline', sectionHeading: 'Professional Journey', sectionId: 'timeline' },
      { buttonText: 'Contact', sectionHeading: 'Get in Touch', sectionId: 'contact' }
    ]

    // Test desktop navigation buttons
    const desktopNav = screen.getByLabelText('Desktop navigation')
    navItems.forEach(({ buttonText, sectionHeading, sectionId }) => {
      // Reset mock counts
      scrollIntoViewMock.mockClear()

      // Get the button from desktop navigation
      const button = within(desktopNav).getByRole('button', { name: buttonText })
      expect(button).toBeInTheDocument()

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

      // Click the button
      fireEvent.click(button)

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

    // Define all navigation items with their button text and corresponding section heading
    const navItems = [
      { buttonText: 'Home', sectionId: 'home' },
      { buttonText: 'About', sectionHeading: 'About Me', sectionId: 'about' },
      { buttonText: 'Expertise', sectionHeading: 'Expertise', sectionId: 'expertise' },
      { buttonText: 'Tech Stack', sectionHeading: 'Tech Stack Favorites', sectionId: 'tech-stack' },
      { buttonText: 'Timeline', sectionHeading: 'Professional Journey', sectionId: 'timeline' },
      { buttonText: 'Contact', sectionHeading: 'Get in Touch', sectionId: 'contact' }
    ]

    // Open mobile menu
    const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' })
    fireEvent.click(mobileMenuButton)

    // Test mobile navigation buttons
    const mobileNav = screen.getByLabelText('Mobile navigation')
    navItems.forEach(({ buttonText, sectionHeading, sectionId }) => {
      // Reset mock counts
      scrollIntoViewMock.mockClear()

      // Get the button from mobile navigation
      const button = within(mobileNav).getByRole('button', { name: buttonText })
      expect(button).toBeInTheDocument()

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

      // Click the button
      fireEvent.click(button)

      // Verify the correct section was targeted
      expect(getElementByIdSpy).toHaveBeenCalledWith(sectionId)
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

      // Verify mobile menu is closed after clicking
      expect(mobileNav.classList.contains('hidden')).toBe(true)

      // Clean up spy for next iteration
      getElementByIdSpy.mockRestore()
    })
  })
})
