import { test, expect } from '@playwright/test';

test('Register, login, submit investment idea, and logout; admin accept & reject', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';

  // Generate a random email for this run
  const randomId = Math.floor(Math.random() * 1000000);
  const testEmail = `testuser${randomId}@example.com`;

  // --- USER FLOW ---
  await page.goto(`${baseUrl}/register`);
  await page.getByPlaceholder('Email').fill(testEmail);
  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForTimeout(5000);
  await expect(page).toHaveURL(/login/);

  await page.getByPlaceholder('Email').fill(testEmail);   // <--- use random email
  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(/opportunities/i, { timeout: 10000 });

  await page.getByRole('link', { name: 'Suggest' }).click();
  await page.waitForURL(/suggest/i, { timeout: 10000 });

  await page.getByPlaceholder('Idea title').fill('My Playwright E2E Stock Idea');
  await page.getByPlaceholder('Explain why this investment matters...').fill('Automated test idea submission for Playwright demo.');

  await page.getByRole('combobox').nth(0).click();
  await page.getByRole('option', { name: 'Stock' }).click();
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Medium' }).click();
  await page.getByPlaceholder('Suggested sector (e.g. Technology)').fill('Technology');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/(login|register|home|\/)$/i);

  // --- ADMIN FLOW ---
  await page.goto(`${baseUrl}/login`);
  await page.getByPlaceholder('Email').fill('admin@gmail.com');
  await page.getByPlaceholder('Password').fill('Admin@123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'Accept' }).first().click();
  await page.waitForURL(/admin\/accepted/i, { timeout: 10000 });
  await expect(page.getByText('Opportunity Submissions')).toBeVisible();

  await page.waitForTimeout(5000);

  // --- ADMIN REJECT FLOW ---
  await page.goto(`${baseUrl}/admin`);
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Reject' }).first().click();
  await page.waitForSelector('input[data-slot="input"]', { timeout: 10000 });
  await page.locator('input[data-slot="input"]').first().fill('This is a Playwright test rejection reason.');
  await page.locator('textarea[data-slot="textarea"]').first().fill('This is a Playwright test lesson learned.');
  await page.getByRole('button', { name: 'Submit' }).click();
});
