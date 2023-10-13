import { expect, Locator, test } from '@playwright/test';

test.describe('Home page - search', () => {
  let searchInputField: Locator;
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }
    await page.goto('/');
    searchInputField = page.locator('input[aria-label="City"]');
    await expect(searchInputField).toHaveValue('New York, NY, USA');
  });

  test('defaultLocation', async () => {
    const defaultLocation = await searchInputField.inputValue();
    expect(defaultLocation).toBe('New York, NY, USA');
  });

  test('currentLocation', async () => {
    const defaultLocation = await searchInputField.inputValue();
    await expect(searchInputField).not.toHaveValue('New York, NY, USA');
    const currentLocation = await searchInputField.inputValue();
    expect(defaultLocation != currentLocation).toBeTruthy();
  });

  test('locationVariants', async ({ page }) => {
    await expect(searchInputField).not.toHaveValue('New York, NY, USA');
    await searchInputField.clear();
    await searchInputField.fill('Toronto, ON, Canada');
    const locationVariants = page.locator('section[role="menuitem"] li[tabindex="0"]');
    await expect(locationVariants.first()).toContainText('Toronto, ON, Canada');
    await expect(locationVariants.last()).toContainText('Old Toronto, Toronto, ON, Canada');
    await expect(locationVariants).toHaveCount(2);
  });

  test('searchLocationResult', async ({ page }) => {
    await expect(searchInputField).not.toHaveValue('New York, NY, USA');
    await searchInputField.clear();
    await searchInputField.fill('Toronto, ON, Canada');
    await expect(searchInputField).toHaveValue('Toronto, ON, Canada');
    await page.locator('section[role="menuitem"] li[tabindex="0"]').first().click();
    await page.locator('button[type="submit"]').click();
    const header = page.locator('header h1');
    await expect(header).toHaveText('Locations in Toronto, ON, Canada');
    await page.locator('a[href*="model=Course"]').click();
    await expect(header).toHaveText('Classes in Toronto, ON, Canada');
    await page.locator('a[href*="model=Offer"]').click();
    await expect(header).toHaveText('Intro Offers in Toronto, ON, Canada');
  });
});
