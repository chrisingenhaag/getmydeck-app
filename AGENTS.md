# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

GetMyDeck is a SvelteKit web frontend for [getmydeck.ingenhaag.dev](https://getmydeck.ingenhaag.dev) — a tool that tracked Steam Deck pre-order shipment progress based on crowdfunded community data. Users enter their reservation details to see estimated delivery timelines.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (Vite, HMR)
npm run build        # Production build
npm run preview      # Preview production build

npm run test:unit    # Run Vitest unit tests
npm run test:integration  # Run Playwright E2E tests (builds app first)
npm test             # Alias for test:integration

npm run lint         # Prettier check + ESLint
npm run format       # Auto-format with Prettier
npm run check        # svelte-check (type checking)
```

**Run a single test:**
```bash
npx playwright test tests/home.test.ts        # Single integration test file
npx playwright test -g "pattern"              # Tests matching name pattern
npx vitest run src/lib/SomeFile.test.ts       # Single unit test file
```

## Architecture

**Stack:** SvelteKit 2 + Svelte 5, TypeScript, Tailwind CSS 4 + DaisyUI 5, Chart.js, adapter-node

**Routing (`src/routes/`):**
- `/` — Home page with reservation input form
- `/s/[region]/[version]/[timestamp]/` — Result pages with shareable URLs; region/version/timestamp are validated by param matchers in `src/params/`
- `/statistics/` — All-time statistics page
- `/changelog/`, `/explanations/` — Info pages
- `/api/v2/regions/[region]/` — Server-side API endpoints returning shipment data

**Library (`src/lib/`):**
- Svelte components (Chart, Results, Statistics, etc.)
- `DeckTypes.ts` / `DeckSummaryTypes.ts` — Core TypeScript type definitions
- `Constants.ts` — App-wide constants

**Testing:**
- Playwright integration tests in `tests/` — these build and serve the app on port 4173 via `npm run preview`
- Vitest unit tests co-located in `src/lib/`

**CI/CD:**
- `npm-build.yml` — Runs tests on PRs
- `semantic-release.yml` — On merge to main, publishes releases to GitHub and builds Docker image to `ghcr.io`

## Code Style

Prettier config: tabs, single quotes, 100-char line width. Run `npm run format` to auto-fix.
