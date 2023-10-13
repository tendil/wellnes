import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from '../playwright.config';

test('List your business button opens form', async ({ page, isMobile }) => {
  await page.goto('/');

  const expectedUrl = `${FRONTEND_URL}/explore/list-your-business/`;
  const linkElements = page.locator('header').getByRole('link');

  if (isMobile) {
    await linkElements.first().click();
  } else {
    await linkElements.last().click();
  }

  await expect(page).toHaveURL(expectedUrl);
});
