import { test, expect } from '@playwright/test';

test.describe('Register Page - UI Tests', () => {
  const API_URL = 'https://se109-backend-ryrr.onrender.com/api/v1/auth/register';

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  // ============= Form Visibility Tests =============
  test('should display register form with all required elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByText('Become a member of the Lumina Realty ecosystem.')).toBeVisible();
    
    // Form fields
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Phone Number')).toBeVisible();
    await expect(page.getByLabel('Secure Password')).toBeVisible();

    // Submit button and sign in link
    await expect(page.getByRole('button', { name: 'Sign Up Now' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  });

  // ============= Input Interaction Tests =============
  test('should accept and display full name input', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    await fullNameInput.fill('John Doe');
    await expect(fullNameInput).toHaveValue('John Doe');
  });

  test('should accept and display username input', async ({ page }) => {
    const usernameInput = page.getByLabel('Username');
    await usernameInput.fill('johndoe_123');
    await expect(usernameInput).toHaveValue('johndoe_123');
  });

  test('should accept and display email input', async ({ page }) => {
    const emailInput = page.getByLabel('Email Address');
    await emailInput.fill('john@example.com');
    await expect(emailInput).toHaveValue('john@example.com');
  });

  test('should accept and display phone number input', async ({ page }) => {
    const phoneInput = page.getByLabel('Phone Number');
    await phoneInput.fill('0987654321');
    await expect(phoneInput).toHaveValue('0987654321');
  });

  test('should accept password input and hide it by default', async ({ page }) => {
    const passwordInput = page.getByLabel('Secure Password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await passwordInput.fill('SecurePass123');
    await expect(passwordInput).toHaveValue('SecurePass123');
  });

  test('should clear all input fields', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const phoneInput = page.getByLabel('Phone Number');
    const passwordInput = page.getByLabel('Secure Password');

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await phoneInput.fill('0987654321');
    await passwordInput.fill('password123');

    await fullNameInput.clear();
    await usernameInput.clear();
    await emailInput.clear();
    await phoneInput.clear();
    await passwordInput.clear();

    await expect(fullNameInput).toHaveValue('');
    await expect(usernameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(phoneInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
  });

  // ============= Password Visibility Toggle Tests =============
  test('should toggle password visibility when SHOW button is clicked', async ({ page }) => {
    const passwordInput = page.getByLabel('Secure Password');
    const toggleButton = page.getByRole('button', { name: 'Show password' });

    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    await toggleButton.click();
    
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('should toggle password visibility back to hidden', async ({ page }) => {
    const passwordInput = page.getByLabel('Secure Password');
    const showButton = page.getByRole('button', { name: 'Show password' });

    await showButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    const hideButton = page.getByRole('button', { name: 'Hide password' });
    await hideButton.click();
    
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should display correct button text on toggle', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Show password' });

    await expect(toggleButton).toContainText('SHOW');
    
    await toggleButton.click();
    
    const hideButton = page.getByRole('button', { name: 'Hide password' });
    await expect(hideButton).toContainText('HIDE');
  });

  // ============= Loading State UI Tests =============
  test('should disable form inputs and button during submission', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const phoneInput = page.getByLabel('Phone Number');
    const passwordInput = page.getByLabel('Secure Password');
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await phoneInput.fill('0987654321');
    await passwordInput.fill('password123');

    // Delay API response to observe disabled state
    await page.route(API_URL, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.abort();
    });

    await submitButton.click();

    await expect(fullNameInput).toBeDisabled();
    await expect(usernameInput).toBeDisabled();
    await expect(emailInput).toBeDisabled();
    await expect(phoneInput).toBeDisabled();
    await expect(passwordInput).toBeDisabled();
    await expect(submitButton).toBeDisabled();
  });

  test('should display loading text on button during submission', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const phoneInput = page.getByLabel('Phone Number');
    const passwordInput = page.getByLabel('Secure Password');
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await phoneInput.fill('0987654321');
    await passwordInput.fill('password123');

    await page.route(API_URL, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      await route.abort();
    });

    await submitButton.click();
    await expect(submitButton).toContainText('Creating Account...');
  });

  test('should display loading spinner message during registration', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const passwordInput = page.getByLabel('Secure Password');
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await passwordInput.fill('password123');

    await page.route(API_URL, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      await route.abort();
    });

    await submitButton.click();
    await expect(page.getByText('Creating your Lumina account...')).toBeVisible();
  });

  // ============= Error Message UI Tests =============
  test('should display error message when registration fails', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Username already exists' }),
      });
    });

    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const passwordInput = page.getByLabel('Secure Password');
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await passwordInput.fill('password123');
    await submitButton.click();

    const errorAlert = page.getByRole('alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Registration failed');
  });

  test('should display error on network failure', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.abort('failed');
    });

    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const passwordInput = page.getByLabel('Secure Password');
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await passwordInput.fill('password123');
    await submitButton.click();

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 });
  });

  // ============= Success Message UI Tests =============
  test('should display success message on successful registration', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ data: { message: 'User created successfully' } }),
      });
    });

    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const passwordInput = page.getByLabel('Secure Password');
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });

    await fullNameInput.fill('John Doe');
    await usernameInput.fill('johndoe');
    await emailInput.fill('john@example.com');
    await passwordInput.fill('password123');
    await submitButton.click();

    const successAlert = page.getByRole('alert');
    await expect(successAlert).toBeVisible({ timeout: 5000 });
    await expect(successAlert).toContainText('Account created successfully');
  });

  // ============= Navigation UI Tests =============
  test('should display sign in link with correct href', async ({ page }) => {
    const signInLink = page.getByRole('link', { name: 'Sign In' });
    await expect(signInLink).toBeVisible();
    await expect(signInLink).toHaveAttribute('href', '/login');
  });

  test('should navigate to login page when Sign In link is clicked', async ({ page }) => {
    const signInLink = page.getByRole('link', { name: 'Sign In' });
    await signInLink.click();
    await expect(page).toHaveURL(new RegExp('/login'));
  });

  // ============= Button State UI Tests =============
  test('should show default button state when not loading', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Sign Up Now' });
    await expect(submitButton).toContainText('Sign Up Now');
    await expect(submitButton).not.toBeDisabled();
  });

  test('should maintain input values when scrolling', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const phoneInput = page.getByLabel('Phone Number');
    const passwordInput = page.getByLabel('Secure Password');

    const testFullName = 'John Doe';
    const testUsername = 'johndoe';
    const testEmail = 'john@example.com';
    const testPhone = '0987654321';
    const testPassword = 'password123';

    await fullNameInput.fill(testFullName);
    await usernameInput.fill(testUsername);
    await emailInput.fill(testEmail);
    await phoneInput.fill(testPhone);
    await passwordInput.fill(testPassword);

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(100);
    await page.evaluate(() => window.scrollBy(0, -500));

    await expect(fullNameInput).toHaveValue(testFullName);
    await expect(usernameInput).toHaveValue(testUsername);
    await expect(emailInput).toHaveValue(testEmail);
    await expect(phoneInput).toHaveValue(testPhone);
    await expect(passwordInput).toHaveValue(testPassword);
  });

  // ============= Accessibility Tests =============
  test('should have accessible form with proper labels', async ({ page }) => {
    const fullNameInput = page.getByLabel('Full Name');
    const usernameInput = page.getByLabel('Username');
    const emailInput = page.getByLabel('Email Address');
    const phoneInput = page.getByLabel('Phone Number');
    const passwordInput = page.getByLabel('Secure Password');

    await expect(fullNameInput).toBeVisible();
    await expect(usernameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('should have accessible toggle button for password visibility', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Show password' });
    await expect(toggleButton).toBeVisible();
  });
});

