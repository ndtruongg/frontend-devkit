import { resolve } from 'node:path';
import { expect, test as base, type BrowserContext } from '@playwright/test';

const extensionPath = resolve(import.meta.dirname, '../../.output/chrome-mv3');

export const test = base.extend<{ extensionId: string }>({
  context: async ({ playwright }, use, testInfo) => {
    // An empty profile path asks Playwright for a disposable profile per test.
    const context: BrowserContext = await playwright.chromium.launchPersistentContext('', {
      channel: 'chromium',
      headless: testInfo.project.use.headless ?? true,
      viewport: testInfo.project.use.viewport ?? { width: 380, height: 440 },
      ignoreDefaultArgs: ['--disable-extensions'],
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
    try {
      await use(context);
    } finally {
      await context.close();
    }
  },
  extensionId: async ({ context }, use) => {
    // Bootstrap has no service worker yet. Discover the real ID from Chrome's
    // extension manager rather than adding a worker or changing the manifest.
    const manager = await context.newPage();
    let id: string;
    try {
      await manager.goto('chrome://extensions/');
      const extension = manager.locator('extensions-item').filter({
        has: manager.getByRole('heading', { name: 'Frontend DevKit', exact: true }),
      });
      await expect(extension).toHaveCount(1);
      await extension.getByRole('button', { name: 'Details', exact: true }).click();
      await expect(manager).toHaveURL(/chrome:\/\/extensions\/\?id=[a-p]{32}$/);
      id = new URL(manager.url()).searchParams.get('id')!;
    } finally {
      await manager.close();
    }
    await use(id);
  },
});

export { expect };
