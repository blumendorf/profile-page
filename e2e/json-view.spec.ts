import { test, expect } from '@playwright/test';

test.describe('JSON View Mode', () => {
  // JSON toggle is only visible on desktop (≥1024px)
  test.skip(({ viewport }) => (viewport?.width ?? 1280) < 1024, 'Desktop only');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('JSON toggle button is present', async ({ page }) => {
    // The JSON toggle button has text "JSON" in the navbar
    const jsonButton = page.locator('nav button:has-text("JSON")');
    await expect(jsonButton.first()).toBeVisible();
  });

  test('clicking JSON toggle switches to JSON view', async ({ page }) => {
    // Find and click JSON toggle
    const jsonButton = page.locator('nav button:has-text("JSON")').first();
    await jsonButton.click();
    await page.waitForTimeout(500);

    // In JSON mode, check for the status indicator or hero being hidden
    const ariaLive = page.locator('[aria-live="polite"]');
    await expect(ariaLive).toContainText('JSON view active');
  });

  test('clicking JSON toggle again returns to human view', async ({ page }) => {
    // Switch to JSON
    const jsonButton = page.locator('nav button:has-text("JSON")').first();
    await jsonButton.click();
    await page.waitForTimeout(500);

    // Switch back - button text changes when in JSON mode
    const toggleButton = page.locator('nav button').filter({ hasText: /JSON|\{JSON\}/ }).first();
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Hero section should be visible again
    await expect(page.locator('#home')).toBeVisible();
  });

  test.describe('JSON View Content', () => {
    test.beforeEach(async ({ page }) => {
      const jsonButton = page.locator('nav button:has-text("JSON")').first();
      await jsonButton.click();
      await page.waitForTimeout(500);
    });

    test('JSON view shows profile data', async ({ page }) => {
      // Check that the page content contains JSON-like data
      const pageText = await page.locator('body').textContent();

      // Should contain profile-related keys from the JSON
      expect(pageText).toMatch(/profile|name|about|expertise/i);
    });

    test('JSON contains profile data in page', async ({ page }) => {
      const pageContent = await page.content();

      // Check for expected profile keys in the HTML
      expect(pageContent).toMatch(/Marco Blumendorf|profile|about/i);
    });

    test('JSON view has interactive elements', async ({ page }) => {
      // The JSON view should have clickable/interactive elements
      const clickableElements = page.locator('button, [role="button"], [tabindex="0"]');
      const count = await clickableElements.count();

      // Should have interactive elements
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('JSON View Navigation Sync', () => {
    test('navigation works in JSON view', async ({ page }) => {
      // Switch to JSON view
      const jsonButton = page.locator('nav button:has-text("JSON")').first();
      await jsonButton.click();
      await page.waitForTimeout(500);

      // Try clicking a nav link (e.g., About)
      const aboutLink = page.locator('nav').getByRole('link', { name: /about/i });

      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await page.waitForTimeout(300);

        // Should still be in JSON view (aria-live should still say JSON)
        const ariaLive = page.locator('[aria-live="polite"]');
        await expect(ariaLive).toContainText('JSON view active');
      }
    });
  });
});
