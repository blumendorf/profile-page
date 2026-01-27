import { test, expect, Page } from '@playwright/test';

/**
 * Visual regression tests for the homepage
 * Uses Playwright's screenshot comparison to catch unintended visual changes
 *
 * Note: Run `pnpm test:e2e --update-snapshots` to update baseline images
 *
 * These tests run ONLY on Chromium for stability - Firefox and WebKit have
 * non-deterministic font rendering that causes flaky tests.
 */

// Skip visual regression tests on non-Chromium browsers
test.skip(({ browserName }) => browserName !== 'chromium', 'Visual tests only run on Chromium');

/**
 * Screenshot comparison options with tolerances for stable tests.
 * - maxDiffPixelRatio: Allow up to 5% of pixels to differ (antialiasing/subpixel variance)
 * - threshold: Per-pixel color tolerance (0-1), 0.3 ignores subtle rendering shifts
 */
const screenshotOptions = {
  maxDiffPixelRatio: 0.05,
  threshold: 0.3,
};

/**
 * Hide fixed-position elements (navbar) for section-level screenshots.
 * Fixed elements render at viewport position, causing them to overlay
 * section content when taking element screenshots after scrolling.
 */
async function hideFixedElements(page: Page) {
  await page.addStyleTag({
    content: `
      nav[class*="fixed"] { visibility: hidden !important; }
    `,
  });
}

/**
 * Wait for layout to stabilize after scrolling.
 * Gives the browser time to settle scroll position, trigger any
 * intersection observers, and complete any scroll-triggered reflows.
 */
async function waitForLayoutStability(page: Page) {
  await page.waitForTimeout(250);
}

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Hide the animated canvas background for stable screenshots
    await page.addStyleTag({
      content: `
        canvas { visibility: hidden !important; }
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });

    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');

    // Ensure fonts are fully rendered (not just downloaded)
    await page.evaluate(() => document.fonts.ready);
  });

  test.describe('Full Page Screenshots', () => {
    test('desktop full page', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await expect(page).toHaveScreenshot('homepage-desktop-full.png', {
        fullPage: true,
        ...screenshotOptions,
      });
    });

    test('tablet full page', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page).toHaveScreenshot('homepage-tablet-full.png', {
        fullPage: true,
        ...screenshotOptions,
      });
    });

    test('mobile full page', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page).toHaveScreenshot('homepage-mobile-full.png', {
        fullPage: true,
        ...screenshotOptions,
      });
    });
  });

  test.describe('Hero Section', () => {
    test('desktop hero', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      const hero = page.locator('#home');
      await expect(hero).toHaveScreenshot('hero-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile hero', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const hero = page.locator('#home');
      await expect(hero).toHaveScreenshot('hero-mobile.png', {
        ...screenshotOptions,
      });
    });
  });

  test.describe('About Section', () => {
    test('desktop about', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const about = page.locator('#about');
      await about.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(about).toHaveScreenshot('about-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile about', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const about = page.locator('#about');
      await about.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(about).toHaveScreenshot('about-mobile.png', {
        ...screenshotOptions,
      });
    });
  });

  test.describe('Expertise Section', () => {
    test('desktop expertise', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const expertise = page.locator('#expertise');
      await expertise.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(expertise).toHaveScreenshot('expertise-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile expertise', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const expertise = page.locator('#expertise');
      await expertise.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(expertise).toHaveScreenshot('expertise-mobile.png', {
        ...screenshotOptions,
      });
    });
  });

  test.describe('Tech Stack Section', () => {
    test('desktop tech stack', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const techStack = page.locator('#tech-stack');
      await techStack.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(techStack).toHaveScreenshot('tech-stack-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile tech stack', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const techStack = page.locator('#tech-stack');
      await techStack.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(techStack).toHaveScreenshot('tech-stack-mobile.png', {
        ...screenshotOptions,
      });
    });
  });

  test.describe('Contact Section', () => {
    test('desktop contact', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const contact = page.locator('#contact');
      await contact.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(contact).toHaveScreenshot('contact-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile contact', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const contact = page.locator('#contact');
      await contact.scrollIntoViewIfNeeded();
      await waitForLayoutStability(page);
      await expect(contact).toHaveScreenshot('contact-mobile.png', {
        ...screenshotOptions,
      });
    });
  });

  test.describe('Navigation', () => {
    test('desktop navigation bar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      const nav = page.locator('nav');
      await expect(nav).toHaveScreenshot('nav-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile navigation closed', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const nav = page.locator('nav');
      await expect(nav).toHaveScreenshot('nav-mobile-closed.png', {
        ...screenshotOptions,
      });
    });

    test('mobile navigation open', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.getByRole('button', { name: /toggle mobile menu/i }).click();
      // Wait for menu animation
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot('nav-mobile-open.png', {
        ...screenshotOptions,
      });
    });
  });

  test.describe('Footer', () => {
    test('desktop footer', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await waitForLayoutStability(page);
      const footer = page.locator('footer');
      await expect(footer).toHaveScreenshot('footer-desktop.png', {
        ...screenshotOptions,
      });
    });

    test('mobile footer', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await waitForLayoutStability(page);
      const footer = page.locator('footer');
      await expect(footer).toHaveScreenshot('footer-mobile.png', {
        ...screenshotOptions,
      });
    });
  });
});
