import { test, expect } from '@playwright/test';

test('home page should have login and register links', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:3000/');

  // Check for the login link
  const loginLink = page.getByRole('link', { name: 'Login' });
  await expect(loginLink).toBeVisible();
  await expect(loginLink).toHaveAttribute('href', '/login');

  // Check for the register link
  const registerLink = page.getByRole('link', { name: 'Register' });
  await expect(registerLink).toBeVisible();
  await expect(registerLink).toHaveAttribute('href', '/register');
}); 