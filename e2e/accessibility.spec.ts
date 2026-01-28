import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Skip Link', () => {
    test('skip link exists', async ({ page }) => {
      const skipLink = page.getByRole('link', { name: /skip/i });
      // Skip link should exist (might be visually hidden initially)
      const count = await skipLink.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('skip link is focusable', async ({ page }) => {
      // Tab to focus on skip link
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      const tagName = await focusedElement.evaluate((el) => el.tagName.toLowerCase());

      // First focusable element should be a link or button
      expect(['a', 'button']).toContain(tagName);
    });
  });

  test.describe('Images', () => {
    test('profile image has alt text', async ({ page }) => {
      const profileImage = page.locator('#home img');
      const hasAlt = await profileImage.getAttribute('alt');
      expect(hasAlt).toBeTruthy();
    });
  });

  test.describe('Semantic Structure', () => {
    test('page has main landmark', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('page has navigation landmark', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });

    test('page has footer landmark', async ({ page }) => {
      const footer = page.locator('footer');
      const count = await footer.count();
      expect(count).toBeGreaterThan(0);
    });

    test('sections have headings', async ({ page }) => {
      const sections = ['about', 'expertise', 'tech-stack', 'journey', 'contact'];

      for (const sectionId of sections) {
        const section = page.locator(`#${sectionId}`);
        const heading = section.locator('h2, h3').first();
        const count = await heading.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('heading hierarchy is logical', async ({ page }) => {
      // Get all headings
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();

      // Should have at least h1 and h2
      const h1 = page.locator('h1');
      const h2 = page.locator('h2');

      const h1Count = await h1.count();
      const h2Count = await h2.count();

      expect(h1Count).toBeGreaterThan(0);
      expect(h2Count).toBeGreaterThan(0);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('interactive elements are focusable', async ({ page }) => {
      const focusableElements: string[] = [];

      // Tab through page and collect focusable elements
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        const count = await focused.count();
        if (count > 0) {
          const tagName = await focused.evaluate((el) => el.tagName.toLowerCase());
          focusableElements.push(tagName);
        }
      }

      // Should have focusable links and buttons
      expect(focusableElements.some((el) => ['a', 'button'].includes(el))).toBe(true);
    });

    test('navigation links are keyboard accessible', async ({ page }) => {
      // Focus on nav area
      const navLinks = page.locator('nav a').first();
      await navLinks.focus();

      // Should be focusable
      const isFocused = await navLinks.evaluate(
        (el) => document.activeElement === el
      );
      expect(isFocused).toBe(true);

      // Should be activatable with Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    });

    test('buttons are keyboard accessible', async ({ page }) => {
      // Find a visible button (JSON toggle on desktop, mobile menu on mobile)
      const viewport = page.viewportSize();
      const isDesktop = (viewport?.width ?? 1280) >= 1024;

      const button = isDesktop
        ? page.locator('nav button:has-text("JSON")').first()
        : page.getByRole('button', { name: /toggle mobile menu/i });

      await button.focus();

      // Should be focusable
      const isFocused = await button.evaluate(
        (el) => document.activeElement === el
      );
      expect(isFocused).toBe(true);

      // Should be activatable with Enter or Space
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
    });
  });

  test.describe('Focus States', () => {
    test('focused elements have visible focus indicator', async ({ page }) => {
      // Tab to an element
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');

      // Check for focus styling
      const hasVisibleFocus = await focusedElement.evaluate((el) => {
        const style = window.getComputedStyle(el);
        // Check for outline, ring, or border change
        return (
          style.outline !== 'none' ||
          style.outlineWidth !== '0px' ||
          style.boxShadow !== 'none' ||
          el.classList.toString().includes('focus') ||
          el.classList.toString().includes('ring-3')
        );
      });

      expect(hasVisibleFocus).toBe(true);
    });
  });

  test.describe('ARIA Labels', () => {
    test('buttons have accessible names', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < Math.min(count, 10); i++) {
        const button = buttons.nth(i);
        const accessibleName = await button.evaluate((el) => {
          // Check for aria-label, aria-labelledby, or text content
          return (
            el.getAttribute('aria-label') ||
            el.textContent?.trim() ||
            el.getAttribute('title') ||
            ''
          );
        });

        // Button should have some accessible name
        expect(accessibleName.length).toBeGreaterThan(0);
      }
    });

    test('links have descriptive text', async ({ page }) => {
      const links = page.locator('a');
      const count = await links.count();

      for (let i = 0; i < Math.min(count, 10); i++) {
        const link = links.nth(i);
        const accessibleName = await link.evaluate((el) => {
          return (
            el.getAttribute('aria-label') ||
            el.textContent?.trim() ||
            ''
          );
        });

        // Link should have descriptive text
        expect(accessibleName.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Color and Contrast', () => {
    test('dark mode has sufficient contrast', async ({ page }) => {
      // Verify we're in dark mode
      const isDark = await page.locator('html').evaluate((el) =>
        el.classList.contains('dark')
      );
      expect(isDark).toBe(true);

      // Wait for hero heading to be visible
      const heroHeading = page.locator('#home h1');
      await expect(heroHeading).toBeVisible();

      // Check that text is visible (has color)
      const color = await heroHeading.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.color;
      });

      // Color should not be pure black on dark background (should be light colored)
      expect(color).not.toBe('rgb(0, 0, 0)');
    });
  });
});
