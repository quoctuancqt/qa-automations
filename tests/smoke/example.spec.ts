import { test, expect } from '@playwright/test';

// Sample spec showing the naming + tag convention. Replace with real tests.
// Title format: "<TC-id> <behaviour>"; tags trace back to features/US-0000-example.feature.
test.describe('Home page', { tag: ['@US-0000', '@smoke'] }, () => {
  test('TC-0000-01 shows the main heading', { tag: '@P1' }, async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
