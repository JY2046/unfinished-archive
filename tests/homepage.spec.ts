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

test('hero copy does not overlap nearby elements on wide displays', async ({ page }) => {
  await page.setViewportSize({ width: 1516, height: 632 });
  await page.goto('/');

  const heroCollision = await page.evaluate(() => {
    const copy = document.querySelector('.cover__copy');
    const targets = [
      document.querySelector('.cover h1'),
      document.querySelector('.cover__issue'),
      document.querySelector('.cover__stamp'),
    ].filter((target): target is Element => target !== null);

    if (!copy || targets.length !== 3 || window.getComputedStyle(copy).display === 'none') {
      return false;
    }

    const copyRect = copy.getBoundingClientRect();

    return targets.some((target) => {
      const targetRect = target.getBoundingClientRect();

      return !(
        targetRect.right <= copyRect.left ||
        targetRect.left >= copyRect.right ||
        targetRect.bottom <= copyRect.top ||
        targetRect.top >= copyRect.bottom
      );
    });
  });

  expect(heroCollision).toBe(false);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
  ).toBe(false);
});

test('language toggle switches visible section headings', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '中文' }).click();

  await expect(page.getByRole('heading', { name: '精选档案' })).toBeVisible();
  await expect(page.locator('#audio').getByRole('heading', { name: '声音笔记' })).toBeVisible();
});
