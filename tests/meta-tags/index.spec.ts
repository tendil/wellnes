import { test, expect } from '@playwright/test';

test.describe('Checking the presence of META tags', () => {
  const metaSelectorTitle = 'meta[property="og:title"]';
  const metaSelectorUrl = 'meta[property="og:url"]';
  const metaSelectorDescription = 'meta[property="og:description"]';

  test('Check META tags on the home page', async ({ page }) => {
    // Opening of the home page
    await page.goto('/');

    // get the meta property
    const metaElementTitle = page.locator(metaSelectorTitle);
    //expect metaElement exist
    expect(metaElementTitle).not.toBeNull();

    //check if meta url exist
    const metaElementUrl = page.locator(metaSelectorUrl);
    expect(metaElementUrl).not.toBeNull();

    //check if meta description exist
    const metaElementDescription = page.locator(metaSelectorDescription);
    expect(metaElementDescription).not.toBeNull();
  });
});
