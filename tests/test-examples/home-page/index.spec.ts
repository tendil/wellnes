import { test, expect, Page, Locator } from '@playwright/test';
import { SectionHeader } from './types';

test.describe('Home page - layout', () => {
  // Runs some repeating code for each test in a group before its launch
  test.beforeEach(async ({ page }) => await page.goto('/'));

  test('Check page structure', async ({ page }) => {
    // Storing an element to a variable
    const header = page.locator('header h1');
    // Checking content of the header
    await expect(header).toContainText('Discover & Book Your Favorite Wellness Services');

    // Checking that each section has a visible title
    for (const headerText of [
      SectionHeader.Activities,
      SectionHeader.Offers,
      SectionHeader.Locations,
      SectionHeader.Cities,
    ]) {
      await expect(page.getByRole('heading', { name: headerText, level: 2 })).toBeVisible();
    }
  });

  test('Check Top Activities slider', async ({ page, browserName }) => {
    // Allows test to be skipped
    test.skip();

    const slider = page.locator('div.slick-slider.slick-initialized');
    await expect(slider).not.toBeEmpty();

    // Storing a screenshot of the slider for a chromium browser. It will be here as a reference for a while
    if (browserName === 'chromium') {
      await slider.screenshot({ path: './tests/test-examples/home-page/chromium-slider.png', timeout: 10000 });
    }
  });

  test('Check Intro Offers and Locations', async ({ page }) => {
    const offers = page.locator('article[itemprop="offers"]');
    await expect(offers).toHaveCount(6);

    const locations = page.locator('article[itemprop="location"]');
    await expect(locations).toHaveCount(6);
  });

  // This test won't execute and will be ignored. It will be here as a reference for a while
  test('Page screenshot', async ({ page }) => {
    // Allows test to be skipped
    test.skip();

    const images = page
      .locator('article[itemprop="offers"] > div > img')
      .or(page.locator('article[itemprop="location"] > div > div > img'));

    // Waiting when images will be on the page
    await expect(images).toHaveCount(12, { timeout: 10000 });

    // Screenshot comparison. First run will show an error and create initial screenshots
    await expect(page).toHaveScreenshot('home-page.png', { fullPage: true, timeout: 30000, maxDiffPixelRatio: 0.1 });
  });
});

// Example of sharing Page context between all tests.
// All tests will always run together and in order. I'm not sure that this is a good practice.
test.describe.serial('Home page - search', () => {
  let page: Page;
  let input: Locator;

  // Creation of a page context once before all tests
  test.beforeAll(async ({ browser }) => (page = await browser.newPage()));

  // We have a different layout on mobile.
  // This approach allows us to avoid test fail for android and ios project
  test.beforeEach(({ isMobile }) => {
    if (isMobile) {
      test.skip();
    }
  });

  // Manual clean up after all tests will finish execution
  test.afterAll(async () => await page.close());

  test('Open home page', async () => {
    // Opening of the home page
    await page.goto('/');
  });

  test('Search location input autofill with default city', async () => {
    // Getting input and storing it for a future reuse in the test below
    input = page.getByRole('textbox', { name: 'City' });

    // Getting the input value manually and checking it against a specified one.
    // This approach produces some randoms fails (but not in ui mode).
    // const inputValue = await input.inputValue();
    // expect(inputValue).toMatch('New York, NY, USA');

    // Checking value with this approach will automatically wait for a specified value
    await expect(input).toHaveValue('New York, NY, USA');
  });

  test('Search location dropdown open', async () => {
    // Opening of a dropdown menu
    await input.focus();

    // Checking if suggestion items were added into dropdown
    await expect(page.getByRole('menuitem')).toBeVisible();
  });

  test('Search location input and dropdown change', async () => {
    // Changing input value
    await input.fill('Toronto');

    // Checking if suggestion items were changed
    await expect(page.getByRole('menuitem').getByText(/Toronto/)).toHaveCount(5);
  });
});
