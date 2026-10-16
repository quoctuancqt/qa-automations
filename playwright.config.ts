import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Tag convention (see CLAUDE.md):
 *   @US-<id>      traceability to the Azure DevOps user story
 *   @P1..@P3      risk-based priority
 *   @smoke | @regression
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './reports/artifacts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://playwright.dev',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'api', testMatch: /.*\.api\.spec\.ts/ },
    {
      name: 'chromium',
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
