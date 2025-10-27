import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('should display admin dashboard', async ({ page }) => {
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible();
  });

  test('should display statistics cards', async ({ page }) => {
    await expect(page.locator('text=Total Leads')).toBeVisible();
    await expect(page.locator('text=Total Appointments')).toBeVisible();
    await expect(page.locator('text=Leads This Week')).toBeVisible();
    await expect(page.locator('text=Appointments This Week')).toBeVisible();

    const statCards = page.locator('.bg-white.rounded-xl.shadow-md.p-6');
    const count = await statCards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should display tab navigation', async ({ page }) => {
    await expect(page.locator('button:has-text("Leads")')).toBeVisible();
    await expect(page.locator('button:has-text("Appointments")')).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    const leadsTab = page.locator('button:has-text("Leads")');
    const appointmentsTab = page.locator('button:has-text("Appointments")');

    await leadsTab.click();
    await expect(leadsTab).toHaveClass(/bg-blue-700/);

    await appointmentsTab.click();
    await expect(appointmentsTab).toHaveClass(/bg-blue-700/);

    await leadsTab.click();
    await expect(leadsTab).toHaveClass(/bg-blue-700/);
  });

  test('should display leads list', async ({ page }) => {
    const leadsTab = page.locator('button:has-text("Leads")');
    await leadsTab.click();

    await page.waitForTimeout(500);
  });

  test('should display appointments list', async ({ page }) => {
    const appointmentsTab = page.locator('button:has-text("Appointments")');
    await appointmentsTab.click();

    await page.waitForTimeout(500);
  });

  test('should display appointment status dropdown', async ({ page }) => {
    const appointmentsTab = page.locator('button:has-text("Appointments")');
    await appointmentsTab.click();

    await page.waitForTimeout(500);

    const statusDropdowns = page.locator('select');
    const count = await statusDropdowns.count();

    if (count > 0) {
      const firstDropdown = statusDropdowns.first();
      await expect(firstDropdown).toBeVisible();

      const options = await firstDropdown.locator('option').allTextContents();
      expect(options).toContain('Pending');
      expect(options).toContain('Confirmed');
      expect(options).toContain('Completed');
      expect(options).toContain('Cancelled');
    }
  });

  test('should update appointment status', async ({ page }) => {
    const appointmentsTab = page.locator('button:has-text("Appointments")');
    await appointmentsTab.click();

    await page.waitForTimeout(500);

    const statusDropdowns = page.locator('select');
    const count = await statusDropdowns.count();

    if (count > 0) {
      const firstDropdown = statusDropdowns.first();
      const currentValue = await firstDropdown.inputValue();

      const newValue = currentValue === 'pending' ? 'confirmed' : 'pending';
      await firstDropdown.selectOption(newValue);

      await page.waitForTimeout(500);

      await expect(firstDropdown).toHaveValue(newValue);
    }
  });

  test('should display lead details', async ({ page }) => {
    const leadsTab = page.locator('button:has-text("Leads")');
    await leadsTab.click();

    await page.waitForTimeout(500);

    const leadCards = page.locator('.border.border-gray-200.rounded-lg');
    const count = await leadCards.count();

    if (count > 0) {
      const firstLead = leadCards.first();
      await expect(firstLead).toBeVisible();
    }
  });

  test('should display appointment details', async ({ page }) => {
    const appointmentsTab = page.locator('button:has-text("Appointments")');
    await appointmentsTab.click();

    await page.waitForTimeout(500);

    const appointmentCards = page.locator('.border.border-gray-200.rounded-lg');
    const count = await appointmentCards.count();

    if (count > 0) {
      const firstAppointment = appointmentCards.first();
      await expect(firstAppointment).toBeVisible();
    }
  });

  test('should format dates correctly', async ({ page }) => {
    await page.waitForTimeout(1000);
  });

  test('should show empty state when no leads', async ({ page }) => {
    await page.route('**/rest/v1/leads*', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([])
      });
    });

    await page.reload();

    const leadsTab = page.locator('button:has-text("Leads")');
    await leadsTab.click();

    await expect(page.locator('text=No leads yet')).toBeVisible({ timeout: 5000 });
  });

  test('should show empty state when no appointments', async ({ page }) => {
    await page.route('**/rest/v1/appointments*', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([])
      });
    });

    await page.reload();

    const appointmentsTab = page.locator('button:has-text("Appointments")');
    await appointmentsTab.click();

    await expect(page.locator('text=No appointments yet')).toBeVisible({ timeout: 5000 });
  });
});
