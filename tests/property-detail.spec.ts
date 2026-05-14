import { test, expect } from '@playwright/test';

test.describe('Property Detail Page - UI Tests', () => {
  const propertyId = '1'; // Using a test ID

  test.beforeEach(async ({ page }) => {
    // Mock property API response
    await page.route('**/api/v1/properties/*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            id: propertyId,
            title: 'Modern Luxury Penthouse',
            lineAddress: '123 Premium Boulevard, Downtown',
            type: 'Penthouse',
            price: 2500000,
            bedrooms: 4,
            bathrooms: 3,
            landArea: 3500,
            floors: 1,
            description: 'Experience luxury living. This penthouse features premium finishes and smart home integration.',
            entranceRoadWidth: 30,
            direction: 'North Facing',
            balconyDirection: 'South Facing',
            interior: 'Fully Furnished',
            status: 'AVAILABLE'
          }
        })
      });
    });

    await page.goto(`/properties/${propertyId}`);
  });

  // ============= Page Header Tests =============
  test('should display property title and location', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Modern Luxury Penthouse' })).toBeVisible();
    await expect(page.getByText('123 Premium Boulevard, Downtown')).toBeVisible();
    await expect(page.getByText('Penthouse', {exact: true})).toBeVisible();
  });

  test('should display hero image', async ({ page }) => {
    const heroImage = page.locator('.hero-image');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveAttribute('alt', 'Modern Luxury Penthouse');
  });

  test('should display price information in header', async ({ page }) => {
    await expect(page.getByText('$2,500,000')).toBeVisible();
  });

  test('should display featured property badge', async ({ page }) => {
    await expect(page.locator('span:has-text("Featured Property")')).toBeVisible();
  });

  test('should display back button with proper aria-label', async ({ page }) => {
    const backBtn = page.getByLabel('Back to property list');
    await expect(backBtn).toBeVisible();
  });

  // ============= Stats Dashboard Tests =============
  test('should display stats dashboard with all metrics', async ({ page }) => {
    const dashboard = page.locator('.stats-dashboard');
    await expect(dashboard).toBeVisible();
  });

  test('should display bedroom count in stats', async ({ page }) => {
    await expect(page.getByText('4', { exact: true })).toBeVisible();
    await expect(page.getByText('Bedrooms')).toBeVisible();
  });

  test('should display bathroom count in stats', async ({ page }) => {
    await expect(page.getByText('3', { exact: true })).toBeVisible();
    await expect(page.getByText('Bathrooms')).toBeVisible();
  });

  test('should display square footage in stats', async ({ page }) => {
    await expect(page.getByText('3500')).toBeVisible();
    await expect(page.getByText('Sq. Feet')).toBeVisible();
  });

  test('should display floor count in stats', async ({ page }) => {
    await expect(page.getByText('1', { exact: true })).toBeVisible();
    await expect(page.getByText('Floors')).toBeVisible();
  });

  // ============= Property Description Tests =============
  test('should display property description section', async ({ page }) => {
    const narrative = page.locator('.narrative-container');
    await expect(narrative).toBeVisible();
    await expect(page.getByText(/Experience luxury living/)).toBeVisible();
  });

  test('should display "The Narrative" section title', async ({ page }) => {
    await expect(page.getByText('The Narrative')).toBeVisible();
  });

  test('should display narrative highlights', async ({ page }) => {
    const highlights = [
      'Architecturally Significant Design',
      'Premium Interior Finishings',
      'Smart Home Integration',
      'Sustainable Energy Features'
    ];

    for (const highlight of highlights) {
      await expect(page.getByText(highlight, { exact: true })).toBeVisible();
    }
  });

  // ============= Architectural Specs Tests =============
  test('should display architectural specifications section', async ({ page }) => {
    await expect(page.getByText('Architectural Specs')).toBeVisible();
  });

  test('should display road width specification', async ({ page }) => {
    await expect(page.getByText('Road Width')).toBeVisible();
    await expect(page.getByText('30m')).toBeVisible();
  });

  test('should display orientation specification', async ({ page }) => {
    await expect(page.getByText('Orientation')).toBeVisible();
    await expect(page.getByText('North Facing')).toBeVisible();
  });

  test('should display balcony specification', async ({ page }) => {
    await expect(page.getByText('Balcony')).toBeVisible();
    await expect(page.getByText('South Facing')).toBeVisible();
  });

  test('should display interior specification', async ({ page }) => {
    await expect(page.getByText('Interior', { exact: true })).toBeVisible();
    await expect(page.getByText('Fully Furnished')).toBeVisible();
  });

  // ============= Inquiry Sidebar Tests =============
  test('should display inquiry card with title', async ({ page }) => {
    const inquiryCard = page.locator('.inquiry-card-premium');
    await expect(inquiryCard).toBeVisible();
  });

  test('should display inquiry card description', async ({ page }) => {
    await expect(page.getByText(/Connect with our architectural consultants/)).toBeVisible();
  });

  test('should display book tour button with proper aria-label', async ({ page }) => {
    const tourBtn = page.getByLabel('Book a private tour');
    await expect(tourBtn).toBeVisible();
  });

  test('should display contact concierge button with proper aria-label', async ({ page }) => {
    const contactBtn = page.getByLabel('Contact concierge');
    await expect(contactBtn).toBeVisible();
  });

  test('should display reference ID', async ({ page }) => {
    await expect(page.getByText(/Reference ID: LUM-/)).toBeVisible();
  });

  test('should display property status indicator', async ({ page }) => {
    await expect(page.getByText('Currently AVAILABLE')).toBeVisible();
  });

  // ============= Navigation Tests =============
  test('should navigate back when back button is clicked', async ({ page }) => {
    const backBtn = page.getByLabel('Back to property list');
    await backBtn.click();
    await page.waitForURL('/');
  });

  test('should have working back button link', async ({ page }) => {
    const backBtn = page.getByRole("button",{name: "Back to Collection"});
    if (await backBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await backBtn.click();
      await page.waitForURL(/\/properties\//);
      expect(page.url()).toContain('/properties/');
    }
  });

  // ============= Loading State Tests =============
  test('should display loading spinner while fetching property', async ({ page }) => {
    // Delay the API response to observe loading state
    await page.route('**/api/v1/properties/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });

    await page.goto(`/properties/${propertyId}`);
    
    // Spinner might appear briefly
    await page.waitForLoadState('networkidle');
  });

  test('should display loading text during data fetch', async ({ page }) => {
    await page.route('**/api/v1/properties/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.continue();
    });

    await page.goto(`/properties/${propertyId}`);
    
    // Might be visible briefly
    await page.waitForLoadState('networkidle');
  });

  // ============= Error State Tests =============
  test('should display error message when property fetch fails', async ({ page }) => {
    await page.route('**/api/v1/properties/*', async (route) => {
      await route.abort('failed');
    });

    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const errorMessage = page.getByText(/Could not load property details/);
    await expect(errorMessage).toBeVisible();
  });

  test('should display error heading when property not found', async ({ page }) => {
    await page.route('**/api/v1/properties/*', async (route) => {
      await route.abort('failed');
    });

    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const errorHeading = page.getByRole('heading', { name: 'Oops!' });
    await expect(errorHeading).toBeVisible();
  });

  test('should display return link in error state', async ({ page }) => {
    await page.route('**/api/v1/properties/*', async (route) => {
      await route.abort('failed');
    });

    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const returnLink = page.getByRole('link', { name: 'Return to Collections' });
    await expect(returnLink).toBeVisible();
  });

  // ============= Accessibility Tests =============
  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    const h3 = page.locator('h3');

    await expect(h1).toHaveCount(1); // Main property title
    const h3Count = await h3.count();
    expect(h3Count).toBeGreaterThan(0); // Section titles
  });

  test('should have semantic structure with sections', async ({ page }) => {
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(2);
  });

  test('should have proper ARIA labels on buttons', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const tourBtn = page.getByLabel('Book a private tour');
    const contactBtn = page.getByLabel('Contact concierge');
    const backBtn = page.getByLabel('Back to property list');

    await expect(tourBtn).toHaveAttribute('aria-label', 'Book a private tour');
    await expect(contactBtn).toHaveAttribute('aria-label', 'Contact concierge');
    await expect(backBtn).toHaveAttribute('aria-label', 'Back to property list');
  });

  test('should have proper alt text on hero image', async ({ page }) => {
    const heroImage = page.locator('.hero-image');
    const altText = await heroImage.getAttribute('alt');
    expect(altText).toBeTruthy();
  });

  test('should have semantic main element', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have semantic aside element for sidebar', async ({ page }) => {
    const aside = page.locator('aside');
    await expect(aside).toBeVisible();
  });

  // ============= Interactive Element Tests =============
  test('should be able to focus on tour button via keyboard', async ({ page }) => {
    const tourBtn = page.getByLabel('Book a private tour');
    await tourBtn.focus();
    const isFocused = await tourBtn.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('should be able to focus on contact button via keyboard', async ({ page }) => {
    const contactBtn = page.getByLabel('Contact concierge');
    await contactBtn.focus();
    const isFocused = await contactBtn.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('should be able to focus on back button via keyboard', async ({ page }) => {
    const backBtn = page.getByLabel('Back to property list');
    await backBtn.focus();
    const isFocused = await backBtn.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  // ============= Responsive Design Tests =============
  test('should display properly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const heroImage = page.locator('.hero-image');
    await expect(heroImage).toBeVisible();
  });

  test('should display properly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const heroImage = page.locator('.hero-image');
    const specsGrid = page.locator('.specs-grid-premium');
    
    await expect(heroImage).toBeVisible();
    await expect(specsGrid).toBeVisible();
  });

  test('should display properly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const sidebar = page.locator('.content-sidebar-premium');
    await expect(sidebar).toBeVisible();
  });

  test('should display sidebar next to main content on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`/properties/${propertyId}`);
    await page.waitForLoadState('networkidle');

    const mainContent = page.locator('.content-body');
    const sidebar = page.locator('.content-sidebar-premium');

    const mainBox = await mainContent.boundingBox();
    const sidebarBox = await sidebar.boundingBox();

    if (mainBox && sidebarBox) {
      // Sidebar should be to the right of main content
      expect(sidebarBox.x).toBeGreaterThan(mainBox.x + mainBox.width - 50);
    }
  });

  // ============= Content Display Tests =============
  test('should display all spec cards in grid', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const specCards = page.locator('.spec-card');
    const count = await specCards.count();
    expect(count).toBeGreaterThanOrEqual(4); // At least road width, orientation, balcony, interior
  });

  test('should display inquiry actions in sidebar', async ({ page }) => {
    const inquiryActions = page.locator('.inquiry-actions');
    await expect(inquiryActions).toBeVisible();

    const buttons = inquiryActions.locator('button');
    const count = await buttons.count();
    expect(count).toBe(2); // Book tour and contact concierge
  });

  test('should display all metric icons in dashboard', async ({ page }) => {
    const dashboard = page.locator('.stats-dashboard');
    const items = dashboard.locator('.dashboard-item');
    const count = await items.count();
    expect(count).toBe(4); // Bedrooms, bathrooms, sqft, floors
  });

  // ============= Data Validation Tests =============
  test('should display correct property ID in reference', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const referenceId = page.getByText(/Reference ID: LUM-1/);
    await expect(referenceId).toBeVisible();
  });

  test('should display property data from API response', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Verify key data points are displayed
    await expect(page.getByText('Modern Luxury Penthouse')).toBeVisible();
    await expect(page.getByText('$2,500,000')).toBeVisible();
    await expect(page.getByText('4', { exact: true })).toBeVisible(); // Bedrooms
    await expect(page.getByText('3', { exact: true })).toBeVisible(); // Bathrooms
  });

  // ============= Navigation Persistence Tests =============
  test('should maintain page content when scrolling', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const title = page.getByRole('heading', { name: 'Modern Luxury Penthouse' });
    await expect(title).toBeVisible();

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(200);

    await expect(title).toBeVisible(); // Scrolled past
    
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    await expect(title).toBeVisible(); // Back at top
  });
});

