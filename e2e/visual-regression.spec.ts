import { test, expect, Page } from '@playwright/test';

/**
 * Visual regression tests for the homepage
 * Uses Playwright's screenshot comparison to catch unintended visual changes
 *
 * Note: Run `pnpm test:e2e --update-snapshots` to update baseline images
 */

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
  });

  test.describe('Full Page Screenshots', () => {
    test('desktop full page', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await expect(page).toHaveScreenshot('homepage-desktop-full.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('tablet full page', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page).toHaveScreenshot('homepage-tablet-full.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile full page', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page).toHaveScreenshot('homepage-mobile-full.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Hero Section', () => {
    test('desktop hero', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      const hero = page.locator('#home');
      await expect(hero).toHaveScreenshot('hero-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile hero', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const hero = page.locator('#home');
      await expect(hero).toHaveScreenshot('hero-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('About Section', () => {
    test('desktop about', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const about = page.locator('#about');
      await about.scrollIntoViewIfNeeded();
      await expect(about).toHaveScreenshot('about-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile about', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const about = page.locator('#about');
      await about.scrollIntoViewIfNeeded();
      await expect(about).toHaveScreenshot('about-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Expertise Section', () => {
    test('desktop expertise', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const expertise = page.locator('#expertise');
      await expertise.scrollIntoViewIfNeeded();
      await expect(expertise).toHaveScreenshot('expertise-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile expertise', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const expertise = page.locator('#expertise');
      await expertise.scrollIntoViewIfNeeded();
      await expect(expertise).toHaveScreenshot('expertise-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Tech Stack Section', () => {
    test('desktop tech stack', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const techStack = page.locator('#tech-stack');
      await techStack.scrollIntoViewIfNeeded();
      await expect(techStack).toHaveScreenshot('tech-stack-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile tech stack', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const techStack = page.locator('#tech-stack');
      await techStack.scrollIntoViewIfNeeded();
      await expect(techStack).toHaveScreenshot('tech-stack-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Contact Section', () => {
    test('desktop contact', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      const contact = page.locator('#contact');
      await contact.scrollIntoViewIfNeeded();
      await expect(contact).toHaveScreenshot('contact-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile contact', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      const contact = page.locator('#contact');
      await contact.scrollIntoViewIfNeeded();
      await expect(contact).toHaveScreenshot('contact-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Navigation', () => {
    test('desktop navigation bar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      const nav = page.locator('nav');
      await expect(nav).toHaveScreenshot('nav-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile navigation closed', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const nav = page.locator('nav');
      await expect(nav).toHaveScreenshot('nav-mobile-closed.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile navigation open', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.getByRole('button', { name: /toggle mobile menu/i }).click();
      // Wait for menu animation
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot('nav-mobile-open.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Footer', () => {
    test('desktop footer', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await hideFixedElements(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.locator('footer');
      await expect(footer).toHaveScreenshot('footer-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile footer', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await hideFixedElements(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.locator('footer');
      await expect(footer).toHaveScreenshot('footer-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });
});
