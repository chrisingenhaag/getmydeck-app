import { expect, test } from '@playwright/test';

const data = {
    "officialInfo" : {
      "reservationsStartedAt" : "2021-07-16T17:00:00Z",
      "lastDataUpdate" : "2022-06-13T17:34:46Z",
      "lastDataUpdateDate" : "2022-06-13",
      "lastShipments" : {
        "EU" : {
          "64" : "2021-07-20T22:23:22Z",
          "256" : "2021-07-20T08:20:22Z",
          "512" : "2021-07-19T21:47:21Z"
        },
        "UK" : {
          "64" : "2021-07-19T12:26:56Z",
          "256" : "2021-07-16T18:59:38Z",
          "512" : "2021-07-16T17:32:01Z"
        },
        "US" : {
          "64" : "2021-07-16T22:42:13Z",
          "256" : "2021-07-16T21:32:00Z",
          "512" : "2021-07-16T17:56:32Z"
        }
      }
    },
    "personalInfo" : {
      "reservedAt" : "2021-07-23T06:40:37Z",
      "region" : "EU",
      "version" : "512",
      "durationReservedAfterStart" : "PT157H40M37S",
      "durationReservedAfterStartHumanReadable" : "06 days, 13 hours, 40 minutes and 37 seconds",
      "elapsedTimePercentage" : 48.7,
      "prettyText" : "It looks like you have a EU 512GB reservation.\nYou reserved your deck 06 days, 13 hours, 40 minutes and 37 seconds after pre-orders opened.\n03 days, 04 hours, 47 minutes and 21 seconds of orders have been processed, and you have 03 days, 08 hours, 53 minutes and 16 seconds of orders to go until it is your turn.\nYou're 48.7 % of the way there!",
      "htmlText" : "<ul>\n  <li>It looks like you have a EU 512GB reservation</li>\n  <li>You reserved your deck 06 days, 13 hours, 40 minutes and 37 seconds after pre-orders opened</li>\n  <li>03 days, 04 hours, 47 minutes and 21 seconds of orders have been processed</li>\n  <li>You have 03 days, 08 hours, 53 minutes and 16 seconds of orders to go until it is your turn</li>\n  <li>You're 48.7 % of the way there!</li>\n</ul>",
      "latestOrderSeconds" : 1626731241,
      "latestOrder" : "2021-07-19T21:47:21Z",
      "historicData" : [ {
        "date" : "2022-06-13",
        "elapsedTimePercentage" : 48.7
      }, {
        "date" : "2022-06-09",
        "elapsedTimePercentage" : 44.09
      }, {
        "date" : "2022-06-06",
        "elapsedTimePercentage" : 38.33
      }, {
        "date" : "2022-06-02",
        "elapsedTimePercentage" : 30.6
      }, {
        "date" : "2022-05-30",
        "elapsedTimePercentage" : 26.86
      }, {
        "date" : "2022-05-26",
        "elapsedTimePercentage" : 20.7
      }, {
        "date" : "2022-05-23",
        "elapsedTimePercentage" : 16.48
      }, {
        "date" : "2022-05-19",
        "elapsedTimePercentage" : 14.05
      }, {
        "date" : "2022-05-16",
        "elapsedTimePercentage" : 11.97
      }, {
        "date" : "2022-05-12",
        "elapsedTimePercentage" : 10.45
      }, {
        "date" : "2022-05-09",
        "elapsedTimePercentage" : 9.25
      }, {
        "date" : "2022-05-05",
        "elapsedTimePercentage" : 6.64
      }, {
        "date" : "2022-05-02",
        "elapsedTimePercentage" : 3.54
      }, {
        "date" : "2022-04-28",
        "elapsedTimePercentage" : 2.78
      }, {
        "date" : "2022-04-25",
        "elapsedTimePercentage" : 2.27
      }, {
        "date" : "2022-04-21",
        "elapsedTimePercentage" : 1.93
      }, {
        "date" : "2022-04-18",
        "elapsedTimePercentage" : 1.68
      }, {
        "date" : "2022-04-14",
        "elapsedTimePercentage" : 1.41
      }, {
        "date" : "2022-04-11",
        "elapsedTimePercentage" : 1.01
      }, {
        "date" : "2022-04-07",
        "elapsedTimePercentage" : 0.8
      }]
    }
  };


test('index page has expected h1', async ({ page }) => {
	await page.route('/api/**', route => route.fulfill({
		status: 200,
		body: JSON.stringify(data),
	}));

	await page.goto('/');
	expect(await page.textContent('h1')).toBe('How long to get my Steam Deck?');

  
  await page.selectOption('select#version', { label: '512GB' });
  await page.selectOption('select#region', { label: 'EU' });
  
  await page.fill('#reserationTime', '1627022437');

  await page.click('button');

  await expect(page).toHaveURL('/s/EU/512/1627022437');
	await expect(page).toHaveTitle(/GetMyDeck - Results/);
	await expect(page.locator('h3').first()).toHaveText('Results:');
	await expect(page.locator('h4').first()).toHaveText('Past percentages');
	await expect(page.locator('li').first()).toHaveText('It looks like you have a EU 512GB reservation');


});
