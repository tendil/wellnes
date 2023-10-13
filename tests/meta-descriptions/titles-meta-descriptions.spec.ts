import { test } from '@playwright/test';
import { Main } from '../../classes/Main';

test.describe('Wellnessliving Explorer Test', () => {
  let main: Main;

  test.beforeEach(async ({ page }) => {
    main = new Main(page);
    await page.goto('/');
  });

  test.afterAll(async () => {
  });

  test('Checking that page has correct redirect', async () => {
    await main.getTitle()
    await main.checkTitle('Wellnessliving - Fitness, Health & Beauty Services Near You')
    await main.metaDescription('Business Management Software by WellnessLiving: take your gym, fitness studio, spa or salon to the next level! Book and attract new clients instantly. See why over 10 million users love WellnessLiving. Get your free demo today!')
    await main.clickOnMassage()
    await main.checkTitle('Find Massage Spas & Therapists in Your Area at Wellnessliving')
    await main.metaDescription('Top local Massage Spas & Therapists in your area. Reviews, Deals, Schedules, brought to you by Wellnessliving.')
    await main.clickOnLogoBtn()
    await main.clickOnCity()
    await main.checkTitle('Fitness, Health & Beauty Services Near You in Toronto, ON')
    await main.metaDescription('Top fitness, health & beauty services in Toronto, ON. Reviews, Deals, Schedules, brought to you by Wellnessliving.')
  })
});
