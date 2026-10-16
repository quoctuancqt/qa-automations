import { test, expect, type Page } from '@playwright/test';

// Automates features/QA-1-manage-todos.feature against the public TodoMVC demo.

async function addTodo(page: Page, title: string) {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill(title);
  await input.press('Enter');
}

const item = (page: Page, title: string) => page.getByTestId('todo-item').filter({ hasText: title });

test.describe('Manage todo items', { tag: '@QA-1' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('TC-QA-1-01 adds a todo item', { tag: ['@TC-QA-1-01', '@P1', '@smoke'] }, async ({ page }) => {
    await addTodo(page, 'Buy milk');
    await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk']);
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
  });

  for (const title of ['', '   ']) {
    test(`TC-QA-1-02 does not add a blank title (${JSON.stringify(title)})`, { tag: ['@TC-QA-1-02', '@P2', '@regression'] }, async ({ page }) => {
      await addTodo(page, title);
      await expect(page.getByTestId('todo-item')).toHaveCount(0);
    });
  }

  test('TC-QA-1-03 completing and reopening updates the counter', { tag: ['@TC-QA-1-03', '@P1', '@regression'] }, async ({ page }) => {
    await addTodo(page, 'Buy milk');
    await addTodo(page, 'Walk the dog');
    const toggle = item(page, 'Buy milk').getByRole('checkbox', { name: 'Toggle Todo' });

    await toggle.check();
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');

    await toggle.uncheck();
    await expect(page.getByTestId('todo-count')).toHaveText('2 items left');
  });

  const filters = [
    { filter: 'All', visible: ['Buy milk', 'Walk the dog'] },
    { filter: 'Active', visible: ['Walk the dog'] },
    { filter: 'Completed', visible: ['Buy milk'] },
  ];
  for (const { filter, visible } of filters) {
    test(`TC-QA-1-04 "${filter}" filter shows only matching items`, { tag: ['@TC-QA-1-04', '@P2', '@regression'] }, async ({ page }) => {
      await addTodo(page, 'Buy milk');
      await addTodo(page, 'Walk the dog');
      await item(page, 'Buy milk').getByRole('checkbox', { name: 'Toggle Todo' }).check();

      await page.getByRole('link', { name: filter }).click();
      await expect(page.getByTestId('todo-title')).toHaveText(visible);
    });
  }
});
