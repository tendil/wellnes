import { expect, Locator, test } from '@playwright/test';
import { fillAndCheckInput } from '../utils';

test.describe('Top Choice', () => {
  let searchInputField: Locator;

  test.beforeEach(async ({ page, isMobile }) => {
    await page.goto('/');
    searchInputField = page.getByRole('textbox', { name: 'City' });
    if (isMobile) {
      await page.getByRole('textbox', { name: 'Search for a wellness experience' }).click();
      // Wait is increased because geolocation is not stable.
      await expect(searchInputField).not.toHaveValue('New York, NY, USA', { timeout: 10000 });
    } else {
      // Wait is increased because geolocation is not stable.
      await expect(searchInputField).toHaveValue('New York, NY, USA', { timeout: 10000 });
      await expect(searchInputField).not.toHaveValue('New York, NY, USA', { timeout: 10000 });
    }
  });

  const tabs = ['Locations', 'Offers'];
  for (const tab of tabs) {
    test(`topChoiceBanner${tab}`, async ({ page }) => {
      // Set new location.
      await fillAndCheckInput(searchInputField, 'Toronto, ON, Canada');

      // Select a suggestion variant from dropdown.
      await page
        .getByRole('menuitem', { name: 'City' })
        .getByRole('listitem')
        .filter({ hasText: /^Toronto, ON, Canada$/ })
        .click({ timeout: 5000 });

      // CLick on the Search button.
      await page.getByRole('button', { name: 'search' }).click();

      // Open offers tab
      if (tab === 'Offers') {
        await page.getByRole('link', { name: 'Offers' }).click({ timeout: 5000 });
        // Wait page is loaded.
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Intro Offers in Toronto, ON, Canada');
      }

      // Get location/offer and banner locator.
      const element = page.getByRole('article').locator('section').first();
      const banner = element.locator('div.absolute');

      // Get position of the first location/offer and banner.
      const firstLocationBox = await element.boundingBox();
      const firstBannerBox = await banner.boundingBox();

      // Verify banner in the top left corner of the location tile with a little shift.
      expect(firstLocationBox.x > firstBannerBox.x && firstLocationBox.y < firstBannerBox.y).toBeTruthy();
      expect(firstLocationBox.x - firstBannerBox.x === 8).toBeTruthy();
      expect(firstBannerBox.y - firstLocationBox.y === 16).toBeTruthy();

      // Verify banner text.
      await expect(banner).toHaveText('Top Choice');
    });
  }
});
