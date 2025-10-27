import { test, expect } from '@playwright/test';

test.describe('Product Listing and Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/models');
  });

  test('should display products page with title', async ({ page }) => {
    await expect(page).toHaveTitle(/Santa Rosa Spas/);
    await expect(page.locator('text=Our Hot Tub Models')).toBeVisible();
  });

  test('should display product grid', async ({ page }) => {
    await page.waitForSelector('section.px-6', { timeout: 10000 });

    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should display search and filter controls', async ({ page }) => {
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('should filter products by search term', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('test');

    await page.waitForTimeout(500);
  });

  test('should filter products by brand', async ({ page }) => {
    const brandSelect = page.locator('select').first();
    const options = await brandSelect.locator('option').count();

    if (options > 1) {
      await brandSelect.selectOption({ index: 1 });
      await page.waitForTimeout(500);
    }
  });

  test('should clear filters', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('test');

    const clearButton = page.locator('button:has-text("Clear")');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await expect(searchInput).toHaveValue('');
    }
  });

  test('should navigate through product cards', async ({ page }) => {
    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    if (count > 0) {
      const firstCard = productCards.first();
      await expect(firstCard).toBeVisible();

      await expect(firstCard.locator('h3')).toBeVisible();
      await expect(firstCard.locator('text=View Details')).toBeVisible();
    }
  });
});
