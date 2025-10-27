import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('h2:has-text("Contact Us")')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('textarea[name="message"]:invalid')).toBeVisible();
  });

  test('should fill form fields', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const phoneInput = page.locator('input[name="phone"]');
    const messageInput = page.locator('textarea[name="message"]');

    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await phoneInput.fill('707-555-1234');
    await messageInput.fill('I am interested in your hot tubs.');

    await expect(nameInput).toHaveValue('Test User');
    await expect(emailInput).toHaveValue('test@example.com');
    await expect(phoneInput).toHaveValue('707-555-1234');
    await expect(messageInput).toHaveValue('I am interested in your hot tubs.');
  });

  test('should submit form successfully', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="phone"]').fill('707-555-1234');
    await page.locator('textarea[name="message"]').fill('Test message');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(submitButton).toBeDisabled();
    await expect(page.locator('text=Sending...')).toBeVisible({ timeout: 2000 });

    await expect(page.locator('text=Message sent')).toBeVisible({ timeout: 10000 });
  });

  test('should clear form after successful submission', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('Test message');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=Message sent')).toBeVisible({ timeout: 10000 });

    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="phone"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('invalid-email');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should display error on submission failure', async ({ page }) => {
    await page.route('**/functions/v1/submitLead', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('Test message');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=Error')).toBeVisible({ timeout: 10000 });
  });
});
