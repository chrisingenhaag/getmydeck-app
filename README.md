# GetMyDeck-App

![Build](https://github.com/chrisingenhaag/getmydeck-app/actions/workflows/npm-build.yml/badge.svg?branch=main)

SvelteKit based web frontend for [getmydeck.ingenhaag.dev](https://getmydeck.ingenhaag.dev)

In 2022 getmydeck was a tool for the [reddit community](https://www.reddit.com/search/?q=getmydeck&type=link&sort=new) around the release of the Valve Steam Deck. Based on crowdfunded data from
the community users were able to get information about Valves shipment progress. During that time Valve sent out emails
twice a week and notified some of the customers that they are now able to proceed to order. This data was shared by the reddit users and scraped
by getmydeck. Everyone else hammered F5 in their browser twice a week to see how much progress Valve did, sample result below.

![getmydeck sample result](https://github.com/chrisingenhaag/getmydeck-app/blob/main/doc/sample-result.png?raw=true)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
