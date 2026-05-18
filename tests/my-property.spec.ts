import { test, expect } from '@playwright/test';

test.describe('My Properties Page - UI Tests', () => {
  const API_URL = 'https://se109-backend-ryrr.onrender.com/api/v1/properties/me';

  test.beforeEach(async ({ page, context }) => {
    // Mock localStorage to simulate authenticated user
    await context.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-api-token-123456');
    });
    
    await page.goto('/my-properties');
  });

  // ============= Page Header Tests =============
  test('should display page header with title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'My Properties' })).toBeVisible();
    await expect(page.getByText('Manage your real estate listings')).toBeVisible();
  });

  test('should display search box with correct aria-label', async ({ page }) => {
    const searchInput = page.getByLabel('Search my properties by title or address');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Search properties...');
  });

  test('should display search button with aria-label', async ({ page }) => {
    const searchBtn = page.getByRole('button', { name: 'Search properties' });
    await expect(searchBtn).toBeVisible();
  });

  test('should display add property button with aria-label', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add a new property' });
    await expect(addBtn).toBeVisible();
  });

  // ============= Loading State Tests =============
  test('should display loading state with spinner', async ({ page }) => {
    // Delay API response to see loading state
    await page.route(API_URL, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await route.continue();
    });

    await page.goto('/my-properties');

    await page.waitForLoadState('networkidle');

  });

  // ============= Empty State Tests =============
  test('should display empty state when no properties exist', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: []
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'No Properties Found' })).toBeVisible();
    await expect(page.getByText('You haven\'t listed any properties yet.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add your first property' })).toBeVisible();
  });

  test('should navigate to new property form from empty state', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: []
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const addBtn = page.getByRole('button', { name: 'Add your first property' });
    await addBtn.click();

    await expect(page).toHaveURL(/\/my-properties\/new/);
  });

  // ============= Properties Grid Tests =============
  test('should display properties grid with multiple properties', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('.property-card');
    await expect(cards).toHaveCount(2);
  });

  test('should display property information correctly', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const card = page.locator('.property-card').first();
    await expect(card.getByText('Modern Apartment Downtown')).toBeVisible();
    await expect(card.getByText('450,000')).toBeVisible();
    await expect(card.getByText('123 Main St, City')).toBeVisible();
    await expect(card.getByText('2',{exact: true})).toBeVisible(); // bedrooms
    await expect(card.getByText('1',{exact: true})).toBeVisible(); // bathrooms
    await expect(card.getByText('1200 sqm',{exact: true})).toBeVisible(); // land area
  });

  test('should display status badge on property card', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const badge = page.locator('.status-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('AVAILABLE');
  });

  // ============= Property Card Action Tests =============
  test('should display edit button with correct aria-label', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const editBtn = page.getByRole('button', { name: 'Edit Modern Apartment Downtown' });
    await expect(editBtn).toBeVisible();
  });

  test('should navigate to edit page when edit button is clicked', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const editBtn = page.getByRole('button', { name: 'Edit Modern Apartment Downtown' });
    await editBtn.click();

    await expect(page).toHaveURL(/\/my-properties\/1\/edit/);
  });

  test('should display delete button with correct aria-label', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const deleteBtn = page.getByRole('button', { name: 'Delete Modern Apartment Downtown' });
    await expect(deleteBtn).toBeVisible();
  });

  test('should show confirmation dialog when delete is clicked', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    // Set up dialog handler - cancel the delete
    page.once('dialog', dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('Are you sure you want to delete this property?');
      dialog.dismiss();
    });

    const deleteBtn = page.getByRole('button', { name: 'Delete Modern Apartment Downtown' });
    await deleteBtn.click();
  });

  // ============= Search Functionality Tests =============
  test('should accept search input', async ({ page }) => {
    const mockProperties = [
      {
        id: 1,
        title: 'Modern Apartment Downtown',
        price: 450000,
        type: 'apartment',
        lineAddress: '123 Main St, City',
        landArea: 1200,
        bedrooms: 2,
        bathrooms: 1,
        status: 'AVAILABLE'
      }
    ];

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: mockProperties
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByLabel('Search my properties by title or address');
    await searchInput.fill('Modern');
    await expect(searchInput).toHaveValue('Modern');
  });

  test('should filter properties by title on search', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByLabel('Search my properties by title or address');
    const searchBtn = page.getByRole('button', { name: 'Search properties' });

    await searchInput.fill('Modern');
    await searchBtn.click();

    // Should show only Modern Apartment
    const cards = page.locator('.property-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Modern Apartment Downtown');
  });

  test('should filter properties by address on search', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByLabel('Search my properties by title or address');
    const searchBtn = page.getByRole('button', { name: 'Search properties' });

    await searchInput.fill('Main St');
    await searchBtn.click();

    const cards = page.locator('.property-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('123 Main St, City');
  });

  test('should show no results when search has no matches', async ({ page }) => {
    const mockProperties = [
      {
        id: 1,
        title: 'Modern Apartment Downtown',
        price: 450000,
        type: 'apartment',
        lineAddress: '123 Main St, City',
        landArea: 1200,
        bedrooms: 2,
        bathrooms: 1,
        status: 'AVAILABLE'
      }
    ];

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: mockProperties
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByLabel('Search my properties by title or address');
    const searchBtn = page.getByRole('button', { name: 'Search properties' });

    await searchInput.fill('nonexistent');
    await searchBtn.click();

    const cards = page.locator('.property-card');
    await expect(cards).toHaveCount(0);
  });

  test('should clear search when input is cleared', async ({ page }) => {
    await page.route('**/api/v1/properties/me*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: [
              {
                id: 1,
                title: 'Modern Apartment Downtown',
                price: 450000,
                type: 'apartment',
                lineAddress: '123 Main St, City',
                landArea: 1200,
                bedrooms: 2,
                bathrooms: 1,
                status: 'AVAILABLE'
              },
              {
                id: 2,
                title: 'Vintage House Uptown',
                price: 350000,
                type: 'house',
                lineAddress: '456 Oak Ave, City',
                landArea: 2000,
                bedrooms: 3,
                bathrooms: 2,
                status: 'AVAILABLE'
              }
            ]
          }
        })
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByLabel('Search my properties by title or address');
    const searchBtn = page.getByRole('button', { name: 'Search properties' });

    await searchInput.fill('Modern');
    await searchBtn.click();

    let cards = page.locator('.property-card');
    await expect(cards).toHaveCount(1);

    await searchInput.clear();
    await searchBtn.click();

    cards = page.locator('.property-card');
    await expect(cards).toHaveCount(2);
  });

  // ============= Error Handling Tests =============
  test('should display error message when API fails', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.abort('failed');
    });

    await page.goto('/my-properties');

    const errorAlert = page.getByRole('alert');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });
    await expect(errorAlert).toContainText('Failed to load your properties');
  });

  test('should display error on 500 status', async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('/my-properties');

    const errorAlert = page.getByRole('alert');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });
  });

  // ============= Navigation Tests =============
  test('should navigate to add property page from header button', async ({ page }) => {
    const mockProperties = [
      {
        id: 1,
        title: 'Modern Apartment Downtown',
        price: 450000,
        type: 'apartment',
        lineAddress: '123 Main St, City',
        landArea: 1200,
        bedrooms: 2,
        bathrooms: 1,
        status: 'AVAILABLE'
      }
    ];

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: mockProperties
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const addBtn = page.getByRole('button', { name: 'Add a new property' });
    await addBtn.click();

    await expect(page).toHaveURL(/\/my-properties\/new/);
  });

  // ============= Responsive Tests =============
  test('should display all elements on mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const mockProperties = [
      {
        id: 1,
        title: 'Modern Apartment Downtown',
        price: 450000,
        type: 'apartment',
        lineAddress: '123 Main St, City',
        landArea: 1200,
        bedrooms: 2,
        bathrooms: 1,
        status: 'AVAILABLE'
      }
    ];

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: mockProperties
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'My Properties' })).toBeVisible();
    await expect(page.getByLabel('Search my properties by title or address')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add a new property' })).toBeVisible();
  });

  // ============= Accessibility Tests =============
  test('should have proper heading hierarchy', async ({ page }) => {
    const mockProperties = [
      {
        id: 1,
        title: 'Modern Apartment Downtown',
        price: 450000,
        type: 'apartment',
        lineAddress: '123 Main St, City',
        landArea: 1200,
        bedrooms: 2,
        bathrooms: 1,
        status: 'AVAILABLE'
      }
    ];

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: mockProperties
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const h1 = page.getByRole('heading', { level: 1, name: 'My Properties' });
    await expect(h1).toBeVisible();
  });

  test('should have keyboard accessible buttons', async ({ page }) => {
    const mockProperties = [
      {
        id: 1,
        title: 'Modern Apartment Downtown',
        price: 450000,
        type: 'apartment',
        lineAddress: '123 Main St, City',
        landArea: 1200,
        bedrooms: 2,
        bathrooms: 1,
        status: 'AVAILABLE'
      }
    ];

    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            content: mockProperties
          }
        }),
      });
    });

    await page.goto('/my-properties');
    await page.waitForLoadState('networkidle');

    const addBtn = page.getByRole('button', { name: 'Add a new property' });
    await addBtn.focus();
    await expect(addBtn).toBeFocused();
  });
});

