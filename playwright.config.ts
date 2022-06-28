import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 3000
  },
  testDir: './tests',
  testMatch: /.*\.e2e\.ts/
};

export default config;
