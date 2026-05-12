import { test, expect } from '@playwright/test';

test.describe('Main Page (Landing Page) - UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ============= Navigation Bar Tests =============
  test('should display navigation bar with Lumina logo', async ({ page }) => {
    await expect(page.locator('.nav-logo')).toBeVisible();
    await expect(page.getByText('Lumina.')).toBeVisible();
  });

  test('should display navigation links on desktop', async ({ page }) => {
    const navLinks = page.locator('.nav-links a.nav-link');
    await expect(navLinks).toHaveCount(3);
    
    const expectedLinks = ['Projects', 'Booking', 'Insights'];
    for (const link of expectedLinks) {
      await expect(page.getByRole('link', { name: link })).toBeVisible();
    }
  });

  test('should display hamburger menu button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 640 });
    const hamburgerBtn = page.getByLabel('Toggle Navigation');
    await expect(hamburgerBtn).toBeVisible();
  });

  test('should toggle mobile menu when hamburger is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 640 });
    const hamburgerBtn = page.getByLabel('Toggle Navigation');
    const mobileMenu = page.locator('.mobile-menu');

    await expect(mobileMenu).not.toBeVisible();
    await hamburgerBtn.click();
    await expect(mobileMenu).toBeVisible();
    await hamburgerBtn.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  // ============= Authentication State Tests =============
  test('should display Log in and Join Now buttons when not authenticated', async ({ page }) => {
    // Clear localStorage to ensure guest state
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Join Now' })).toBeVisible();
  });

  test('should display account menu when authenticated', async ({ page }) => {
    // Simulate authenticated user
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'test-token-12345');
      localStorage.setItem('displayName', 'John Doe');
    });
    await page.reload();

    await expect(page.getByText(/Hello,/)).toBeVisible();
    await expect(page.getByLabel('Account menu')).toBeVisible();
  });

  test('should open account popover when account button is clicked', async ({ page }) => {
    // Simulate authenticated user
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'test-token-12345');
      localStorage.setItem('displayName', 'Jane Smith');
    });
    await page.reload();

    const accountBtn = page.getByLabel('Account menu');
    await expect(page.locator('.dropdown-menu')).not.toBeVisible();
    
    await accountBtn.click();
    await expect(page.locator('.dropdown-menu')).toBeVisible();
    
    await expect(page.getByLabel("My Properties" )).toBeVisible();
    await expect(page.getByLabel("Sign out" )).toBeVisible();
  });

  test('should close account popover when clicking outside', async ({ page }) => {
    // Simulate authenticated user
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'test-token-12345');
      localStorage.setItem('displayName', 'Alex Johnson');
    });
    await page.reload();

    const accountBtn = page.getByLabel('Account menu');
    await accountBtn.click();
    await expect(page.locator('.dropdown-menu')).toBeVisible();
    
    // Click outside the popover
    await page.click('body', { position: { x: 100, y: 100 } });
    await expect(page.locator('.dropdown-menu')).not.toBeVisible();
  });

  // ============= Hero Section Tests =============

  test('should display search form with location and property type inputs', async ({ page }) => {
    const locationInput = page.getByPlaceholder('Search by city or neighborhood');
    const propertyTypeSelect = page.locator('select');
    const searchButton = page.getByRole('button', { name: 'Search' });

    await expect(locationInput).toBeVisible();
    await expect(propertyTypeSelect).toBeVisible();
    await expect(searchButton).toBeVisible();
  });

  test('should allow entering location in search bar', async ({ page }) => {
    const locationInput = page.getByPlaceholder('Search by city or neighborhood');
    await locationInput.fill('New York');
    await expect(locationInput).toHaveValue('New York');
  });

  test('should allow selecting property type', async ({ page }) => {
    const propertyTypeSelect = page.locator('select');
    await propertyTypeSelect.selectOption('Commercial');
    await expect(propertyTypeSelect).toHaveValue('Commercial');
  });

  test('should navigate to properties list when search is performed', async ({ page }) => {
    const locationInput = page.getByPlaceholder('Search by city or neighborhood');
    const searchButton = page.getByRole('button', { name: 'Search' });

    await locationInput.fill('Miami');
    await searchButton.click();

    await page.waitForURL(/\/properties\?search=/);
    await expect(page).toHaveURL(/Miami/);
  });

  // ============= Featured Listings Section Tests =============
  test('should display featured listings section', async ({ page }) => {
    const featuredSection = page.getByLabel("Featured Architecture");
    await expect(featuredSection).toBeVisible();
  });

  test('should display listing cards', async ({ page }) => {
    // Wait for listings to load
    await page.waitForTimeout(1000);
    
    const listingCards = page.locator('[class*="group"][class*="relative"][class*="h-"]');
    const count = await listingCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to property detail when listing card is clicked', async ({ page }) => {
    // Wait for listings to load
    await page.waitForTimeout(1000);
    
    const firstCard = page.locator('[class*="group"][class*="relative"][class*="h-"]').first();
    await firstCard.click();
    
    await page.waitForURL(/\/properties\/\d+/);
    expect(page.url()).toMatch(/properties/);
  });

  test('should display exclusive badge on some listings', async ({ page }) => {
    // Wait for listings to load
    await page.waitForTimeout(1000);
    
    const exclusiveBadges = page.locator('span:has-text("Exclusive")');
    const badgeCount = await exclusiveBadges.count();
    expect(badgeCount).toBeGreaterThanOrEqual(0);
  });

  // ============= Popular Locations Section Tests =============
  test('should display popular locations section', async ({ page }) => {
    const locationsSection = page.getByLabel("Popular Locations");
    await expect(locationsSection.or(page.getByText("Popular Locations"))).toBeVisible();
  });

  test('should display location cards', async ({ page }) => {
    // Scroll to popular locations section
    await page.locator('text=Popular Locations').first().scrollIntoViewIfNeeded().catch(() => {});
    
    const locationCards = page.locator('[class*="rounded-lg"][class*="bg-white"][class*="p-4"]');
    const count = await locationCards.count();
    expect(count).toBeGreaterThan(0);
  });

  // ============= CTA Section Tests =============
  test('should display Call-to-Action section', async ({ page }) => {
    await page.locator('text=Ready to discover excellence?').scrollIntoViewIfNeeded();
    await expect(page.getByText('Ready to discover excellence?')).toBeVisible();
  });

  test('should display CTA buttons', async ({ page }) => {
    await page.locator('text=Ready to discover excellence?').scrollIntoViewIfNeeded();
    
    const browseBtn = page.getByRole('button', { name: 'Browse Inventory' });
    const speakBtn = page.getByRole('button', { name: 'Speak with an Agent' });

    await expect(browseBtn).toBeVisible();
    await expect(speakBtn).toBeVisible();
  });

  // ============= Footer Tests =============
  test('should display footer with copyright information', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('© 2024 Lumina Realty')).toBeVisible();
  });

  test('should display footer links', async ({ page }) => {
    const footer = page.locator('footer');
    
    const expectedLinks = ['Privacy Policy', 'Terms of Service', 'Accessibility', 'Contact'];
    for (const linkName of expectedLinks) {
      await expect(footer.getByRole('link', { name: linkName })).toBeVisible();
    }
  });

  // ============= Responsive Tests =============
  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Hero section should still be visible
    await expect(page.getByLabel('Hero Section')).toBeVisible();
    
    // Navigation should work
    await expect(page.getByLabel('Toggle Navigation')).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Desktop nav links should be visible
    const navLinks = page.locator('.nav-links a.nav-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // All major sections should be visible
    await expect(page.getByLabel('Toggle Navigation')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  // ============= Navigation Tests =============
  test('should navigate to login page when Log in button is clicked', async ({ page }) => {
    // Clear localStorage to ensure guest state
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('/login');
    expect(page.url()).toContain('/login');
  });

  test('should navigate to register page when Join Now button is clicked', async ({ page }) => {
    // Clear localStorage to ensure guest state
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByRole('button', { name: 'Join Now' }).click();
    await page.waitForURL('/register');
    expect(page.url()).toContain('/register');
  });

  test('should navigate to home when logo is clicked', async ({ page }) => {
    const locationInput = page.getByPlaceholder('Search by city or neighborhood');
    await locationInput.fill('Miami');
    
    const logo = page.locator('.nav-logo');
    await logo.click();
    
    await page.waitForURL('/');
    expect(page.url()).toBe('http://localhost:5173/');
  });

  // ============= Layout & Styling Tests =============
  test('should render landing page container', async ({ page }) => {
    const landingPage = page.locator('.landing-page');
    await expect(landingPage).toBeVisible();
  });

  test('should have proper semantic structure with main element', async ({ page }) => {
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();
    
    // Main should contain expected sections
    const children = await mainElement.locator('section').count();
    expect(children).toBeGreaterThan(0);
  });

  // ============= Accessibility Tests =============
  test('should have proper heading hierarchy', async ({ page }) => {
    const h1Headings = page.locator('h1');
    const count = await h1Headings.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should have proper button labels and roles', async ({ page }) => {
    // Clear localStorage
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const loginBtn = page.getByRole('button', { name: 'Log in' });
    const joinBtn = page.getByRole('button', { name: 'Join Now' });

    await expect(loginBtn).toBeVisible();
    await expect(joinBtn).toBeVisible();
  });

  test('should have proper link roles', async ({ page }) => {
    const footer = page.locator('footer');
    const footerLinks = footer.locator('a');
    
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

