import { test, expect } from '@playwright/test';

// Automates features/QA-2-posts-api.feature against the public JSONPlaceholder API.

test.describe('Posts API', { tag: '@QA-2' }, () => {
  test('TC-QA-2-01 gets an existing post', { tag: ['@TC-QA-2-01', '@P1', '@smoke'] }, async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('TC-QA-2-02 returns 404 for an unknown post', { tag: ['@TC-QA-2-02', '@P2', '@regression'] }, async ({ request }) => {
    const res = await request.get('/posts/999999');
    expect(res.status()).toBe(404);
  });

  test('TC-QA-2-03 filters posts by user', { tag: ['@TC-QA-2-03', '@P2', '@regression'] }, async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 1 } });
    expect(res.ok()).toBeTruthy();
    const posts: Array<{ userId: number }> = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.userId === 1)).toBe(true);
  });

  test('TC-QA-2-04 creates a post', { tag: ['@TC-QA-2-04', '@P1', '@regression'] }, async ({ request }) => {
    const payload = { title: 'Hello', body: 'World', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    expect(await res.json()).toEqual({ ...payload, id: expect.any(Number) });
  });
});
