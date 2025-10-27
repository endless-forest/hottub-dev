import { test, expect } from '@playwright/test';

test.describe('Navigation and SEO', () => {
  test('should display navigation bar on all pages', async ({ page }) => {
    const pages = ['/', '/models', '/booking', '/about', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('text=Santa Rosa Spas')).toBeVisible();
    }
  });

  test('should navigate through main menu', async ({ page }) => {
    await page.goto('/');

    await page.locator('a:has-text("Models")').click();
    await expect(page).toHaveURL('/models');

    await page.locator('a:has-text("Book Visit")').click();
    await expect(page).toHaveURL('/booking');

    await page.locator('a:has-text("About")').click();
    await expect(page).toHaveURL('/about');

    await page.locator('a:has-text("Contact")').click();
    await expect(page).toHaveURL('/contact');

    await page.locator('a:has-text("Santa Rosa Spas")').click();
    await expect(page).toHaveURL('/');
  });

  test('should display footer on all pages', async ({ page }) => {
    const pages = ['/', '/models', '/booking', '/about', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('should have proper page titles', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Santa Rosa Spas/);

    await page.goto('/models');
    await expect(page).toHaveTitle(/Santa Rosa Spas/);

    await page.goto('/contact');
    await expect(page).toHaveTitle(/Santa Rosa Spas/);
  });

  test('should have meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /.+/);
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/');

    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toBeAttached();

    const content = await structuredData.textContent();
    expect(content).toBeTruthy();

    const jsonData = JSON.parse(content || '{}');
    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('LocalBusiness');
  });

  test('should display hero section on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Transform Your Backyard')).toBeVisible();
  });

  test('should display CTA buttons on homepage', async ({ page }) => {
    await page.goto('/');

    const viewModelsButton = page.locator('a:has-text("View Our Models")');
    await expect(viewModelsButton).toBeVisible();

    await viewModelsButton.click();
    await expect(page).toHaveURL('/models');
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();

    await page.goto('/models');
    await expect(page.locator('text=Our Hot Tub Models')).toBeVisible();

    await page.goto('/contact');
    await expect(page.locator('h2:has-text("Contact Us")')).toBeVisible();
  });

  test('should load all pages without errors', async ({ page }) => {
    const pages = ['/', '/models', '/booking', '/about', '/contact', '/admin'];

    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
    }
  });
});
