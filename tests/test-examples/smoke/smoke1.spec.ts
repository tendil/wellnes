import { test, expect } from '@playwright/test';

// Granting a geolocation permission and setting coordinates for all tests inside this file
test.use({
  // Odesa coordinates
  geolocation: { longitude: 30.7117875, latitude: 46.459972 },
  permissions: ['geolocation'],
});

test('Search location input - use current location', async ({ page, isMobile }) => {
  // We have a different layout on mobile.
  // This approach allows us to avoid test fail for android and ios project
  if (isMobile) {
    test.skip();
  }

  await page.goto('/');

  // Opening a search dropdown
  const input = page.getByRole('textbox', { name: 'City' });
  await expect(input).toHaveValue('New York, NY, USA');
  await input.focus();
  await expect(page.getByRole('menuitem')).toBeVisible();

  // Clicking on the button to set current location
  await page.getByRole('button', { name: 'Use current location' }).click();

  // Checking if input value has changed
  await expect(input).toHaveValue(/Odesa/);

  // Clicking on search and wait until search page will be opened
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForURL((url) => {
    return url.pathname.includes('/search');
  });

  // Checking if Location tab is active
  await expect(page.getByRole('link', { name: 'Location' })).toHaveClass(/bg-wl-violet/);

  // Checking search page header
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Locations in Odesa/);

  // Checking that there are no results on the page
  await expect(page.getByRole('heading', { level: 3, name: "We couldn't find any matching results" })).toBeVisible();
});

test.describe('Search location - mobile', () => {
  // Mississauga coordinates
  test.use({ geolocation: { longitude: -79.4943477, latitude: 43.5773265 } });

  test('Open search current location with results', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/');

    // Opening a mobile search
    await page.getByRole('textbox', { name: 'Search for a wellness experience' }).click();
    await expect(page.getByRole('form')).toHaveClass(/fixed/);

    // Opening a search dropdown
    const input = page.getByRole('textbox', { name: 'City' });
    await expect(input).toHaveValue('New York, NY, USA');
    await input.click();
    await expect(page.getByRole('menuitem', { name: 'City' })).toBeVisible();

    // Clicking on the button to set current location
    await page.getByRole('button', { name: 'Use current location' }).click();

    // Checking if input value has changed
    await expect(input).toHaveValue(/Mississauga/);

    // Clicking on search and wait until search page will be opened
    await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForURL((url) => {
      return url.pathname.includes('/search');
    });

    // Checking if Location tab is active
    await expect(page.getByRole('link', { name: 'Location' })).toHaveClass(/bg-wl-violet/);

    // Checking search page header
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Locations in Mississauga/);

    // Checking that there are some results on the page
    await expect(page.getByRole('article')).toHaveCount(4);
  });
});
