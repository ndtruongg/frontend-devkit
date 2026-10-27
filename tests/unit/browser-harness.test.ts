import { describe, expect, it, vi } from 'vitest';
import { browser } from 'wxt/browser';
import { fakeBrowser, resetTestBrowser } from '../support/browser';

describe('TASK-P0-006: isolated Chrome test harness', () => {
  it('shares the WXT browser mock with Chrome globals', () => {
    expect(Reflect.get(globalThis, 'chrome')).toBe(fakeBrowser);
    expect(browser.runtime.getURL('/popup.html')).toBe(
      `chrome-extension://${fakeBrowser.runtime.id}/popup.html`,
    );
  });

  it('removes storage, tabs, listeners and spies when resetting a test', async () => {
    const initialTabs = await browser.tabs.query({});
    const onRemoved = vi.fn();
    fakeBrowser.tabs.onRemoved.addListener(onRemoved);
    await browser.storage.local.set({ theme: 'dark' });
    await browser.storage.session.set({ capture: true });
    await browser.tabs.create({ url: 'https://example.test/' });
    vi.spyOn(browser.permissions, 'request').mockImplementation(async () => false);

    resetTestBrowser();

    expect(await browser.storage.local.get(null)).toEqual({});
    expect(await browser.storage.session.get(null)).toEqual({});
    expect(await browser.tabs.query({})).toEqual(initialTabs);
    await fakeBrowser.tabs.onRemoved.trigger(1, { windowId: 1, isWindowClosing: false });
    expect(onRemoved).not.toHaveBeenCalled();
    expect(vi.isMockFunction(browser.permissions.request)).toBe(false);
  });

  it('supports explicit permission denial without silently granting browser capabilities', async () => {
    const request = vi.spyOn(browser.permissions, 'request').mockImplementation(async () => false);
    expect(await browser.permissions.request({ origins: ['https://example.test/*'] })).toBe(false);
    expect(request).toHaveBeenCalledWith({ origins: ['https://example.test/*'] });
  });
});
