import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

test('TASK-P0-002: theme selection, keyboard focus and accessibility in both modes', async ({
  page, extensionId,
}, testInfo) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  const selector = page.getByRole('combobox', { name: 'Giao diện', exact: true });
  await expect(selector).toHaveValue('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.keyboard.press('Tab');
  await expect(selector).toBeFocused();
  expect(await selector.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');

  for (const mode of ['light', 'dark']) {
    await selector.selectOption(mode);
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(scan.violations, `${mode} accessibility`).toEqual([]);
    const screenshot = testInfo.outputPath(`theme-${mode}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    await testInfo.attach(`theme-${mode}`, { path: screenshot, contentType: 'image/png' });
  }

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await selector.selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.setViewportSize({ width: 360, height: 640 });
  expect(await page.locator('body').evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(360);
  expect(await selector.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');

  await selector.selectOption('light');
  await page.reload();
  await expect(selector).toHaveValue('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
