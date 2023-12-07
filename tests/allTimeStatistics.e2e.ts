import { expect, test } from '@playwright/test';

test('all time statistics page has expected h1', async ({ page }) => {
  await page.goto('/statistics');
  expect(await page.textContent('h1')).toBe('How long to get my Steam Deck?');

  await expect(page.locator('h3').first()).toHaveText('All queue statistics');
});
