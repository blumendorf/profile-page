import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Core Rendering', () => {
    test('page loads without errors', async ({ page }) => {
      await expect(page).toHaveTitle(/Marco Blumendorf|blumendorf/i);
    });

    test('dark mode is applied by default', async ({ page }) => {
      const isDark = await page.locator('html').evaluate((el) => el.classList.contains('dark'));
      expect(isDark).toBe(true);
    });

    test('network background canvas initializes', async ({ page }) => {
      await expect(page.locator('canvas')).toBeVisible();
    });
  });

  test.describe('Hero Section', () => {
    test('profile image renders', async ({ page }) => {
      await expect(page.locator('#home img')).toBeVisible();
    });

    test('name heading displays correctly', async ({ page }) => {
      const heading = page.locator('#home h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/Marco Blumendorf/i);
    });

    test('job title is visible', async ({ page }) => {
      await expect(page.locator('#home').getByText(/product|engineer/i).first()).toBeVisible();
    });

    test('learn more button is visible and clickable', async ({ page }) => {
      const button = page.getByRole('button', { name: /learn more/i });
      await expect(button).toBeVisible();
      await button.click();
      await expect(page.locator('#about')).toBeInViewport({ ratio: 0.3 });
    });
  });

  test.describe('About Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#about').scrollIntoViewIfNeeded();
    });

    test('section heading renders', async ({ page }) => {
      await expect(page.locator('#about h2')).toBeVisible();
    });

    test('paragraphs are present', async ({ page }) => {
      const count = await page.locator('#about p').count();
      expect(count).toBeGreaterThan(0);
    });

    test('quote block displays', async ({ page }) => {
      await expect(page.locator('#about blockquote')).toBeVisible();
    });

    test('pillar cards render', async ({ page }) => {
      const cards = page.locator('#about').locator('[class*="card"], [class*="pillar"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('Expertise Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#expertise').scrollIntoViewIfNeeded();
    });

    test('section heading renders', async ({ page }) => {
      await expect(page.locator('#expertise h2')).toBeVisible();
    });

    test('expertise cards render', async ({ page }) => {
      const cards = page.locator('#expertise').locator('[class*="card"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('Tech Stack Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#tech-stack').scrollIntoViewIfNeeded();
    });

    test('section heading renders', async ({ page }) => {
      await expect(page.locator('#tech-stack h2')).toBeVisible();
    });

    test('tech categories are present', async ({ page }) => {
      const categories = page.locator('#tech-stack').locator('h3, [class*="category"]');
      const count = await categories.count();
      expect(count).toBeGreaterThan(0);
    });

    test('tech badges render', async ({ page }) => {
      const badges = page.locator('#tech-stack').locator('[class*="badge"], span[class*="rounded"]');
      const count = await badges.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Journey Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#journey').scrollIntoViewIfNeeded();
    });

    test('section heading renders', async ({ page }) => {
      await expect(page.locator('#journey h2')).toBeVisible();
    });

    test('timeline entries are present', async ({ page }) => {
      const entries = page.locator('#journey').locator('[class*="timeline"], [class*="entry"], article');
      const count = await entries.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Lab Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#lab').scrollIntoViewIfNeeded();
    });

    test('explore lab button is visible', async ({ page }) => {
      const labButton = page.locator('#lab').getByRole('link', { name: /lab/i });
      await expect(labButton).toBeVisible();
    });

    test('explore lab button links to /lab', async ({ page }) => {
      const labButton = page.locator('#lab').getByRole('link', { name: /lab/i });
      await expect(labButton).toHaveAttribute('href', /\/lab/);
    });
  });

  test.describe('Contact Section', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded();
    });

    test('section heading renders', async ({ page }) => {
      await expect(page.locator('#contact h2')).toBeVisible();
    });

    test('email contact card is visible', async ({ page }) => {
      await expect(page.locator('#contact').getByRole('link', { name: /email/i })).toBeVisible();
    });

    test('LinkedIn link is visible', async ({ page }) => {
      await expect(page.locator('#contact').getByRole('link', { name: /linkedin/i })).toBeVisible();
    });

    test('GitHub link is visible', async ({ page }) => {
      await expect(page.locator('#contact').getByRole('link', { name: /github/i })).toBeVisible();
    });

    test('social links open in new tab', async ({ page }) => {
      const linkedin = page.locator('#contact').getByRole('link', { name: /linkedin/i });
      const github = page.locator('#contact').getByRole('link', { name: /github/i });
      await expect(linkedin).toHaveAttribute('target', '_blank');
      await expect(github).toHaveAttribute('target', '_blank');
    });
  });

  test.describe('Footer', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    test('copyright with current year displays', async ({ page }) => {
      const currentYear = new Date().getFullYear().toString();
      await expect(page.locator('footer').getByText(/©/)).toContainText(currentYear);
    });

    test('lab link is present', async ({ page }) => {
      const labLink = page.locator('footer').getByRole('link', { name: /lab/i });
      await expect(labLink).toBeVisible();
      await expect(labLink).toHaveAttribute('href', /\/lab/);
    });

    test('impressum link is present', async ({ page }) => {
      const impressumLink = page.locator('footer').getByRole('link', { name: /impressum/i });
      await expect(impressumLink).toBeVisible();
      await expect(impressumLink).toHaveAttribute('href', /\/impressum/);
    });
  });
});
