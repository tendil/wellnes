import { test, expect } from '@playwright/test';

test.describe("H1 tags on all Explorer's pages", () => {
  const testData = [
    { testNane: '1. H1 tag for Home page', url: '/' },
    { testNane: '2. H1 tag for List your Business page', url: '/explore/list-your-business/' },
    { testNane: '3. H1 tag for SiteMap page', url: '/explore/sitemap/' },
    { testNane: '4. H1 tag for Home-Tabs: Location', url: '/explore/search/new_york-ny-us/?model=Location' },
    { testNane: '5. H1 tag for Home-Tabs: Class', url: '/explore/search/new_york-ny-us/?model=Course' },
    { testNane: '6. H1 tag for Home-Tabs: Offer', url: '/explore/search/new_york-ny-us/?model=Offer' },
    {
      testNane: '7. H1 tag for Top-Choice location: Book Now',
      url: '/bootcamp/newyork/autoheaven/schedule/?id_mode=12',
    },
    { testNane: '8. H1 tag for Top-Choice location: About', url: '/bootcamp/newyork/autoheaven/about/?id_mode=12' },
    { testNane: '9. H1 tag for Top-Choice location: Offers', url: '/bootcamp/newyork/autoheaven/offers/?id_mode=12' },
    { testNane: '10. H1 tag for Top-Choice location: Review', url: 'bootcamp/newyork/autoheaven/review/?id_mode=12' },
    { testNane: '11. H1 tag for Top-Choice location: Staff', url: '/bootcamp/newyork/autoheaven/staff/?id_mode=12' },
  ];

  for (const testExample of testData) {
    test(testExample.testNane, async ({ page }) => {
      await page.goto(testExample.url);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    });
  }
});
