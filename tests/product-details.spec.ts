import { test, expect } from '@playwright/test';

test.describe('Product Detail Pages', () => {
  test('should navigate to product detail from models page', async ({ page }) => {
    await page.goto('/models');
    await page.waitForSelector('a[href^="/models/"]', { timeout: 10000 });

    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    if (count > 0) {
      const firstProduct = productCards.first();
      const productName = await firstProduct.locator('h3').textContent();
      await firstProduct.click();

      await expect(page).toHaveURL(/\/models\/[a-f0-9-]+/);

      if (productName) {
        await expect(page.locator('h1')).toContainText(productName);
      }
    }
  });

  test('should display product detail elements', async ({ page }) => {
    await page.goto('/models');
    await page.waitForSelector('a[href^="/models/"]', { timeout: 10000 });

    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    if (count > 0) {
      await productCards.first().click();
      await page.waitForURL(/\/models\/[a-f0-9-]+/);

      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('img')).toBeVisible();

      const requestQuoteButton = page.locator('text=Request a Quote');
      await expect(requestQuoteButton).toBeVisible();

      const backLink = page.locator('text=Back to Models');
      await expect(backLink).toBeVisible();
    }
  });

  test('should navigate back to models page', async ({ page }) => {
    await page.goto('/models');
    await page.waitForSelector('a[href^="/models/"]', { timeout: 10000 });

    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    if (count > 0) {
      await productCards.first().click();
      await page.waitForURL(/\/models\/[a-f0-9-]+/);

      const backLink = page.locator('text=Back to Models');
      await backLink.click();

      await expect(page).toHaveURL('/models');
    }
  });

  test('should navigate to contact page with pre-filled model', async ({ page }) => {
    await page.goto('/models');
    await page.waitForSelector('a[href^="/models/"]', { timeout: 10000 });

    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    if (count > 0) {
      await productCards.first().click();
      await page.waitForURL(/\/models\/[a-f0-9-]+/);

      const productName = await page.locator('h1').textContent();
      const requestQuoteButton = page.locator('a:has-text("Request a Quote")');
      await requestQuoteButton.click();

      await expect(page).toHaveURL(/\/contact/);

      if (productName) {
        const messageField = page.locator('textarea[name="message"]');
        await expect(messageField).toContainText(productName);
      }
    }
  });

  test('should display contact options', async ({ page }) => {
    await page.goto('/models');
    await page.waitForSelector('a[href^="/models/"]', { timeout: 10000 });

    const productCards = page.locator('a[href^="/models/"]');
    const count = await productCards.count();

    if (count > 0) {
      await productCards.first().click();
      await page.waitForURL(/\/models\/[a-f0-9-]+/);

      await expect(page.locator('a:has-text("Call Us")')).toBeVisible();
      await expect(page.locator('a:has-text("Email")')).toBeVisible();
    }
  });
});
