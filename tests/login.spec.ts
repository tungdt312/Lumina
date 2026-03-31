import { test, expect } from '@playwright/test';

test.describe('Login Page - UI Tests', () => {
  const API_URL = 'https://se109-backend-ryrr.onrender.com/api/v1/auth/login';

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  // ============= Form Visibility Tests =============
  test('should display login form with all required elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(page.getByText('Please sign in to your Lumina account.')).toBeVisible();
    await expect(page.getByLabel('Email or Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
  });

  test('should display Lumina branding on left panel', async ({ page }) => {
    await expect(page.getByText('Lumina Realty')).toBeVisible();
    await expect(page.getByText('Discover the future of high-fidelity living.')).toBeVisible();
  });

  // ============= Input Interaction Tests =============
  test('should accept and display email input', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Enter your email or username');
    await emailInput.fill('testuser@example.com');
    await expect(emailInput).toHaveValue('testuser@example.com');
  });

  test('should accept and display username input', async ({ page }) => {
    const identifierInput = page.getByPlaceholder('Enter your email or username');
    await identifierInput.fill('testusername');
    await expect(identifierInput).toHaveValue('testusername');
  });

  test('should accept password input', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('••••••••••••');
    await passwordInput.fill('securePassword123');
    await expect(passwordInput).toHaveValue('securePassword123');
  });

  test('should clear input fields', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Enter your email or username');
    const passwordInput = page.getByPlaceholder('••••••••••••');

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');
    await emailInput.clear();
    await passwordInput.clear();

    await expect(emailInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
  });

  // ============= Loading State UI Tests =============
  test('should disable form inputs and button during submission', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Enter your email or username');
    const passwordInput = page.getByPlaceholder('••••••••••••');
    const submitButton = page.getByRole('button', { name: 'Log In' });

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');

    // Delay API response to observe disabled state
    await page.route(API_URL, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.abort();
    });

    await submitButton.click();

    await expect(emailInput).toBeDisabled();
    await expect(passwordInput).toBeDisabled();
    await expect(submitButton).toBeDisabled();
  });

  test('should display loading text on button during submission', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Enter your email or username');
    const passwordInput = page.getByPlaceholder('••••••••••••');
    const submitButton = page.getByRole('button', { name: 'Log In' });

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');

    await page.route(API_URL, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      await route.abort();
    });

    await submitButton.click();
    await expect(submitButton).toContainText('Signing In...');
  });

  // ============= Error Message UI Tests =============
  test('should display error message when login fails', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' }),
      });
    });

    const emailInput = page.getByPlaceholder('Enter your email or username');
    const passwordInput = page.getByPlaceholder('••••••••••••');
    const submitButton = page.getByRole('button', { name: 'Log In' });

    await emailInput.fill('user@example.com');
    await passwordInput.fill('wrongpassword');
    await submitButton.click();

    const errorAlert = page.getByRole('alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Authentication failed');
  });

  test('should display error message on network failure', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.abort('failed');
    });

    const emailInput = page.getByPlaceholder('Enter your email or username');
    const passwordInput = page.getByPlaceholder('••••••••••••');
    const submitButton = page.getByRole('button', { name: 'Log In' });

    await emailInput.fill('user@example.com');
    await passwordInput.fill('password123');
    await submitButton.click();

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 });
  });

  // ============= Navigation UI Tests =============
  test('should display register link with correct href', async ({ page }) => {
    const registerLink = page.getByRole('link', { name: 'Create Account' });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute('href', '/register');
  });

  test('should navigate to register page when link is clicked', async ({ page }) => {
    const registerLink = page.getByRole('link', { name: 'Create Account' });
    await registerLink.click();
    await expect(page).toHaveURL(new RegExp('/register'));
  });

  // ============= Button State UI Tests =============
  test('should show default button state when not loading', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Log In' });
    await expect(submitButton).toContainText('Log In');
    await expect(submitButton).not.toBeDisabled();
  });

  test('should maintain input values when scrolling', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Enter your email or username');
    const passwordInput = page.getByPlaceholder('••••••••••••');

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(100);
    await page.evaluate(() => window.scrollBy(0, -500));

    await expect(emailInput).toHaveValue('test@example.com');
    await expect(passwordInput).toHaveValue('password123');
  });
});

