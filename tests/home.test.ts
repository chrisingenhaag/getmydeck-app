import { expect, test } from '@playwright/test';

const data = {
	officialInfo: {
		reservationsStartedAt: '2021-07-16T17:00:00Z'
	},
	personalInfo: {
		reservedAt: '2021-07-23T06:40:37Z',
		region: 'EU',
		version: '512',
		durationReservedAfterStart: 'PT157H40M37S',
		durationReservedAfterStartHumanReadable: '06 days, 13 hours, 40 minutes and 37 seconds',
		elapsedTimePercentage: 48.7,
		prettyText:
			"It looks like you have a EU 512GB reservation.\nYou reserved your deck 06 days, 13 hours, 40 minutes and 37 seconds after pre-orders opened.\n03 days, 04 hours, 47 minutes and 21 seconds worth of pre-orders have been processed (not real time), and you have 03 days, 08 hours, 53 minutes and 16 seconds of pre-orders to go until it is your turn.\nYou're 48.7 % of the way there!",
		htmlText:
			"<ul>\n  <li>It looks like you have a EU 512GB reservation</li>\n  <li>You reserved your deck 06 days, 13 hours, 40 minutes and 37 seconds after pre-orders opened</li>\n  <li>03 days, 04 hours, 47 minutes and 21 seconds worth of pre-orders have been processed</li>\n  <li>You have 03 days, 08 hours, 53 minutes and 16 seconds worth of pre-orders to go until it is your turn (not real time)</li>\n  <li>You're 48.7 % of the way there!</li>\n</ul>",
		latestOrderSeconds: 1626731241,
		latestOrder: '2021-07-19T21:47:21Z',
		lastDataUpdate: '2022-06-13T17:34:46Z',
		lastBatchDate: '2022-06-13',
		historicData: [
			{
				date: '2022-06-13',
				elapsedTimePercentage: 48.7,
				increasedPercentage: 4.6
			},
			{
				date: '2022-06-09',
				elapsedTimePercentage: 44.09,
				increasedPercentage: 5.76
			},
			{
				date: '2022-06-06',
				elapsedTimePercentage: 38.33,
				increasedPercentage: 7.72
			},
			{
				date: '2022-06-02',
				elapsedTimePercentage: 30.6,
				increasedPercentage: 3.74
			},
			{
				date: '2022-05-30',
				elapsedTimePercentage: 26.86,
				increasedPercentage: 6.16
			},
			{
				date: '2022-05-26',
				elapsedTimePercentage: 20.7,
				increasedPercentage: 4.21
			},
			{
				date: '2022-05-23',
				elapsedTimePercentage: 16.48,
				increasedPercentage: 2.42
			},
			{
				date: '2022-05-19',
				elapsedTimePercentage: 14.05,
				increasedPercentage: 2.08
			},
			{
				date: '2022-05-16',
				elapsedTimePercentage: 11.97,
				increasedPercentage: 1.52
			},
			{
				date: '2022-05-12',
				elapsedTimePercentage: 10.45,
				increasedPercentage: 1.19
			},
			{
				date: '2022-05-09',
				elapsedTimePercentage: 9.25,
				increasedPercentage: 2.61
			},
			{
				date: '2022-05-05',
				elapsedTimePercentage: 6.64,
				increasedPercentage: 3.09
			},
			{
				date: '2022-05-02',
				elapsedTimePercentage: 3.54,
				increasedPercentage: 0.76
			},
			{
				date: '2022-04-28',
				elapsedTimePercentage: 2.78,
				increasedPercentage: 0.5
			},
			{
				date: '2022-04-25',
				elapsedTimePercentage: 2.27,
				increasedPercentage: 0.34
			},
			{
				date: '2022-04-21',
				elapsedTimePercentage: 1.93,
				increasedPercentage: 0.25
			},
			{
				date: '2022-04-18',
				elapsedTimePercentage: 1.68,
				increasedPercentage: 0.27
			},
			{
				date: '2022-04-14',
				elapsedTimePercentage: 1.41,
				increasedPercentage: 0.39
			},
			{
				date: '2022-04-11',
				elapsedTimePercentage: 1.01,
				increasedPercentage: 0.2
			},
			{
				date: '2022-04-07',
				elapsedTimePercentage: 0.8,
				increasedPercentage: 0.8
			}
		]
	}
};

test('index page has expected h1', async ({ page }) => {
	await page.route('/api/**', (route) =>
		route.fulfill({
			status: 200,
			body: JSON.stringify(data)
		})
	);

	await page.goto('/');
	expect(await page.textContent('h1')).toBe('How long to get my Steam Deck?');
});
