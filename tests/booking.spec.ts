import { test, expect } from '@playwright/test';

test.describe('Appointment Booking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/booking');
  });

  test('should display booking form', async ({ page }) => {
    await expect(page.locator('h1:has-text("Book a Showroom Visit")')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="date"]')).toBeVisible();
    await expect(page.locator('select[name="time"]')).toBeVisible();
    await expect(page.locator('input[name="model_interest"]')).toBeVisible();
    await expect(page.locator('textarea[name="notes"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="date"]:invalid')).toBeVisible();
    await expect(page.locator('select[name="time"]:invalid')).toBeVisible();
  });

  test('should fill booking form', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="phone"]').fill('707-555-1234');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.locator('input[name="date"]').fill(dateString);

    await page.locator('select[name="time"]').selectOption('10:00 AM');
    await page.locator('input[name="model_interest"]').fill('Serenity 4000');
    await page.locator('textarea[name="notes"]').fill('Looking forward to visiting');

    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('select[name="time"]')).toHaveValue('10:00 AM');
  });

  test('should display time slot options', async ({ page }) => {
    const timeSelect = page.locator('select[name="time"]');
    const options = await timeSelect.locator('option').count();

    expect(options).toBeGreaterThan(1);

    const firstOption = await timeSelect.locator('option').first().textContent();
    expect(firstOption).toBeTruthy();
  });

  test('should submit booking successfully', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.locator('input[name="date"]').fill(dateString);

    await page.locator('select[name="time"]').selectOption('10:00 AM');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(submitButton).toBeDisabled();
    await expect(page.locator('text=Booking...')).toBeVisible({ timeout: 2000 });

    await expect(page.locator('text=Appointment booked')).toBeVisible({ timeout: 10000 });
  });

  test('should clear form after successful booking', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.locator('input[name="date"]').fill(dateString);

    await page.locator('select[name="time"]').selectOption('10:00 AM');
    await page.locator('input[name="model_interest"]').fill('Test Model');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=Appointment booked')).toBeVisible({ timeout: 10000 });

    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="model_interest"]')).toHaveValue('');
  });

  test('should prevent booking dates in the past', async ({ page }) => {
    const dateInput = page.locator('input[name="date"]');
    const minDate = await dateInput.getAttribute('min');

    expect(minDate).toBeTruthy();

    const today = new Date().toISOString().split('T')[0];
    expect(minDate).toBe(today);
  });

  test('should display what to expect section', async ({ page }) => {
    await expect(page.locator('text=What to Expect')).toBeVisible();
    await expect(page.locator('text=Tour our showroom')).toBeVisible();
  });

  test('should display error on booking failure', async ({ page }) => {
    await page.route('**/functions/v1/submitAppointment', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await page.locator('input[name="date"]').fill(dateString);

    await page.locator('select[name="time"]').selectOption('10:00 AM');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('text=Error')).toBeVisible({ timeout: 10000 });
  });
});
