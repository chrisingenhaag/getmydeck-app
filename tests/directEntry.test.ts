import { expect, test } from '@playwright/test';

test('goto result page with permalink', async ({ page }) => {
	await page.goto('/s/EU/512/1627022437');

	expect(await page.textContent('h1')).toBe('How long to get my Steam Deck?');

	await expect(page.locator('h3').first()).toHaveText('All queue statistics');
});
