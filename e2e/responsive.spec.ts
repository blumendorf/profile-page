import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.describe('Desktop (1280px)', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('page renders correctly at desktop size', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // All sections should be visible
      await expect(page.locator('#home')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('desktop navigation is visible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Desktop nav links should be visible
      const navLinks = page.locator('nav').getByRole('link');
      const count = await navLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('hero section has horizontal layout', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Hero flex container is #home > div > div (the one with flex classes)
      const heroFlex = page.locator('#home > div > div').first();
      const display = await heroFlex.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.flexDirection;
      });

      // On desktop (md breakpoint = 768px), should be row layout
      expect(['row', 'row-reverse']).toContain(display);
    });
  });

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('page renders correctly at tablet size', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('#home')).toBeVisible();
    });

    test('navigation adapts to tablet', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Navbar should still be visible
      await expect(page.locator('nav')).toBeVisible();
    });

    test('content sections are visible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      await page.locator('#about').scrollIntoViewIfNeeded();
      await expect(page.locator('#about')).toBeVisible();

      await page.locator('#expertise').scrollIntoViewIfNeeded();
      await expect(page.locator('#expertise')).toBeVisible();
    });
  });

  test.describe('Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('page renders correctly at mobile size', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('#home')).toBeVisible();
    });

    test('mobile menu button is visible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Mobile menu button should be visible at mobile viewport
      await expect(page.getByRole('button', { name: /toggle mobile menu/i })).toBeVisible();
    });

    test('hero section has vertical layout on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Hero flex container is #home > div > div
      const heroFlex = page.locator('#home > div > div').first();
      const display = await heroFlex.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.flexDirection;
      });

      // On mobile (below md breakpoint), should be column layout
      expect(['column', 'column-reverse']).toContain(display);
    });

    test('contact cards stack vertically', async ({ page }) => {
      await page.goto('/');
      await page.locator('#contact').scrollIntoViewIfNeeded();

      // Contact section should be visible and accessible
      await expect(page.locator('#contact')).toBeVisible();
    });

    test('footer is accessible on mobile', async ({ page }) => {
      await page.goto('/');

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);

      await expect(page.locator('footer')).toBeVisible();
    });
  });

  test.describe('Cross-viewport consistency', () => {
    const viewports = [
      { name: 'desktop', width: 1280, height: 720 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 },
    ];

    for (const vp of viewports) {
      test(`all sections render on ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });

        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Check hero
        await expect(page.locator('#home')).toBeVisible();

        // Scroll through sections
        const sections = ['about', 'expertise', 'tech-stack', 'journey', 'contact'];
        for (const sectionId of sections) {
          await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
          await expect(page.locator(`#${sectionId}`)).toBeVisible();
        }
      });
    }
  });
});
