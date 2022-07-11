import { expect, test } from '@playwright/test';

const data = {
  "officialInfo": {
    "lastDataUpdate": "2022-06-13T17:34:46Z",
    "lastDataUpdateDate": "2022-06-13",
    "lastShipments": {
      "EU": {
        "256": "2021-07-20T08:20:22Z",
        "512": "2021-07-19T21:47:21Z",
        "64": "2021-07-20T22:23:22Z"
      },
      "UK": {
        "256": "2021-07-16T18:59:38Z",
        "512": "2021-07-16T17:32:01Z",
        "64": "2021-07-19T12:26:56Z"
      },
      "US": {
        "256": "2021-07-16T21:32:00Z",
        "512": "2021-07-16T17:56:32Z",
        "64": "2021-07-16T22:42:13Z"
      }
    },
    "reservationsStartedAt": "2021-07-16T17:00:00Z"
  },
  "personalInfo": {
    "durationReservedAfterStart": "PT102H7M17S",
    "durationReservedAfterStartHumanReadable": "04 days, 06 hours, 07 minutes and 17 seconds",
    "elapsedTimePercentage": 75.19,
    "historicData": [
      {
        "date": "2022-06-13",
        "elapsedTimePercentage": 75.19
      },
      {
        "date": "2022-06-09",
        "elapsedTimePercentage": 68.08
      },
      {
        "date": "2022-06-06",
        "elapsedTimePercentage": 59.19
      },
      {
        "date": "2022-06-02",
        "elapsedTimePercentage": 47.25
      },
      {
        "date": "2022-05-30",
        "elapsedTimePercentage": 41.47
      },
      {
        "date": "2022-05-26",
        "elapsedTimePercentage": 31.96
      },
      {
        "date": "2022-05-23",
        "elapsedTimePercentage": 25.45
      },
      {
        "date": "2022-05-19",
        "elapsedTimePercentage": 21.7
      },
      {
        "date": "2022-05-16",
        "elapsedTimePercentage": 18.48
      },
      {
        "date": "2022-05-12",
        "elapsedTimePercentage": 16.14
      },
      {
        "date": "2022-05-09",
        "elapsedTimePercentage": 14.28
      },
      {
        "date": "2022-05-05",
        "elapsedTimePercentage": 10.26
      },
      {
        "date": "2022-05-02",
        "elapsedTimePercentage": 5.47
      },
      {
        "date": "2022-04-28",
        "elapsedTimePercentage": 4.3
      },
      {
        "date": "2022-04-25",
        "elapsedTimePercentage": 3.52
      },
      {
        "date": "2022-04-21",
        "elapsedTimePercentage": 2.99
      },
      {
        "date": "2022-04-18",
        "elapsedTimePercentage": 2.59
      },
      {
        "date": "2022-04-14",
        "elapsedTimePercentage": 2.18
      },
      {
        "date": "2022-04-11",
        "elapsedTimePercentage": 1.56
      },
      {
        "date": "2022-04-07",
        "elapsedTimePercentage": 1.24
      }
    ],
    "htmlText": "<ul>\n  <li>It looks like you have a EU 512GB reservation</li>\n  <li>You reserved your deck 04 days, 06 hours, 07 minutes and 17 seconds after pre-orders opened</li>\n  <li>03 days, 04 hours, 47 minutes and 21 seconds worth of pre-orders have been processed</li>\n  <li>You have 01 days, 01 hours, 19 minutes and 56 seconds worth of pre-orders to go until it is your turn (not real time)</li>\n  <li>You're 75.19 % of the way there!</li>\n</ul>",
    "latestOrder": "2021-07-19T21:47:21Z",
    "latestOrderSeconds": 1626731241,
    "prettyText": "It looks like you have a EU 512GB reservation.\nYou reserved your deck 04 days, 06 hours, 07 minutes and 17 seconds after pre-orders opened.\n03 days, 04 hours, 47 minutes and 21 seconds worth of pre-orders have been processed (not real time), and you have 01 days, 01 hours, 19 minutes and 56 seconds of pre-orders to go until it is your turn.\nYou're 75.19 % of the way there!",
    "region": "EU",
    "reservedAt": "2021-07-20T23:07:17Z",
    "version": "512"
  }
};

test('goto result page with permalink', async ({ page }) => {
  await page.route('/api/**', (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(data)
    })
  );

  await page.goto('/s/EU/512/1627022437');

  await expect(page).toHaveTitle(/GetMyDeck - Results/);
  await expect(page.locator('h3').first()).toHaveText('Results:');
  await expect(page.locator('h4').first()).toHaveText('Past percentages');
  await expect(page.locator('ul > li').first()).toHaveText(
    'It looks like you have a EU 512GB reservation'
  );
});
