import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Desktop Navigation', () => {
    test.skip(({ viewport }) => (viewport?.width ?? 1280) < 1024, 'Desktop only');

    test('navbar is visible', async ({ page }) => {
      await expect(page.locator('nav')).toBeVisible();
    });

    test('logo becomes visible on scroll', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);
      await expect(page.locator('nav a[href="#home"]')).toBeVisible();
    });

    test('navigation links are present', async ({ page }) => {
      const linkCount = await page.locator('nav').getByRole('link').count();
      expect(linkCount).toBeGreaterThan(0);
    });

    test('JSON toggle button is visible', async ({ page }) => {
      await expect(page.locator('nav button:has-text("JSON")').first()).toBeVisible();
    });

    test.describe('Navigation scrolling', () => {
      const sections = [
        { name: 'About', id: 'about' },
        { name: 'Expertise', id: 'expertise' },
        { name: 'Tech Stack', id: 'tech-stack' },
        { name: 'Journey', id: 'journey' },
        { name: 'Contact', id: 'contact' },
      ];

      for (const section of sections) {
        test(`clicking ${section.name} scrolls to section`, async ({ page }) => {
          const navLink = page.locator('nav').getByRole('link', { name: new RegExp(section.name, 'i') });
          await navLink.click();
          await page.waitForTimeout(500);
          await expect(page.locator(`#${section.id}`)).toBeInViewport({ ratio: 0.3 });
        });
      }
    });

    test('navbar background changes on scroll', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);

      const hasScrolledStyles = await page.locator('nav').evaluate((el) => {
        const style = window.getComputedStyle(el);
        return (
          style.backdropFilter !== 'none' ||
          style.boxShadow !== 'none' ||
          el.classList.toString().includes('backdrop-blur') ||
          el.classList.toString().includes('shadow')
        );
      });

      expect(hasScrolledStyles).toBe(true);
    });

    test('active section is highlighted on scroll', async ({ page }) => {
      await page.locator('#about').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const aboutLink = page.locator('nav').getByRole('link', { name: /about/i });
      const hasActiveClass = await aboutLink.evaluate((el) => {
        const className = el.className;
        const style = window.getComputedStyle(el);
        return (
          className.includes('active') ||
          className.includes('accent') ||
          style.color !== 'rgb(255, 255, 255)'
        );
      });

      expect(hasActiveClass).toBe(true);
    });
  });

  test.describe('Mobile Navigation', () => {
    test.skip(({ viewport }) => (viewport?.width ?? 1280) >= 1024, 'Mobile only');

    test('mobile menu button is visible', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /toggle mobile menu/i });
      await expect(menuButton).toBeVisible();
    });

    test('mobile menu opens and closes', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /toggle mobile menu/i });
      await menuButton.click();
      await page.waitForTimeout(300);

      const mobileLinks = page.locator('nav').getByRole('link');
      expect(await mobileLinks.count()).toBeGreaterThan(0);

      await menuButton.click();
      await page.waitForTimeout(300);
    });

    test('mobile navigation links scroll to sections', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: /toggle mobile menu/i });
      await menuButton.click();
      await page.waitForTimeout(300);

      await page.locator('nav').getByRole('link', { name: /about/i }).click();
      await page.waitForTimeout(500);

      await expect(page.locator('#about')).toBeInViewport({ ratio: 0.3 });
    });
  });

  test.describe('Home Navigation', () => {
    test('clicking logo scrolls to top', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(300);

      await page.locator('nav a[href="#home"]').click();
      await page.waitForTimeout(500);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    });
  });
});
