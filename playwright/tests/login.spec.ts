import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/login');
  });

  test('should have all required elements', async ({ page }) => {
    // Check for email input
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Check for password input
    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Check for remember me checkbox
    const rememberMeCheckbox = page.getByLabel('Remember me');
    await expect(rememberMeCheckbox).toBeVisible();
    await expect(rememberMeCheckbox).toHaveAttribute('type', 'checkbox');

    // Check for forgot password link
    const forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    await expect(forgotPasswordLink).toBeVisible();
    await expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');

    // Check for login button
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
  });

  test('should redirect to recipes page after successful login', async ({ page }) => {
    // Fill in the login form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByLabel('Remember me').check();

    // Click the login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for navigation and check URL
    await page.waitForURL('**/recipes');
    await expect(page).toHaveURL('/recipes');
  });
}); 