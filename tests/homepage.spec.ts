import { expect, test } from '@playwright/test';

test('homepage has magazine masthead and no horizontal overflow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Unfinished Archive/i })).toBeVisible();
  await expect(page.getByText('An unfinished archive of AI')).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('language toggle switches visible section headings', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '中文' }).click();

  await expect(page.getByRole('heading', { name: '精选档案' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '声音笔记' })).toBeVisible();
});
