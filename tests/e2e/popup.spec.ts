import { expect, test } from './fixtures';

test('TASK-P0-006: unpacked popup renders offline without errors or outgoing requests', async ({
  page, context, extensionId,
}) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('request', (request) => {
    if (/^https?:/.test(request.url())) externalRequests.push(request.url());
  });

  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(page.getByRole('heading', { name: 'Frontend DevKit', exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Đang xây dựng nền tảng' })).toBeVisible();

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Frontend DevKit', exact: true })).toBeVisible();
  await page.emulateMedia({ colorScheme: 'light' });
  const lightBackground = await page.locator('html').evaluate((html) => getComputedStyle(html).backgroundColor);
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(await page.locator('html').evaluate((html) => getComputedStyle(html).backgroundColor)).not.toBe(lightBackground);
  expect(await page.locator('body').evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(380);
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
});
