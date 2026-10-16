import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Tag convention (see CLAUDE.md):
 *   @QA-<n>       traceability to the Jira story
 *   @TC-QA-<n>-<nn> test case id
 *   @P1..@P3      risk-based priority
 *   @smoke | @regression
 */
const BASE_URL = process.env.BASE_URL || 'https://demo.playwright.dev/todomvc';
const API_BASE_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

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
    ...(process.env.CI ? [['github'] as ['github']] : []),
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: { baseURL: API_BASE_URL },
    },
    {
      name: 'chromium',
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: BASE_URL },
    },
  ],
});
