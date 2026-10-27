import { vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';

/** Reset spies as well as fake storage, tabs and event listeners between cases. */
export function resetTestBrowser(): void {
  vi.restoreAllMocks();
  fakeBrowser.reset();
  vi.stubGlobal('chrome', fakeBrowser);
  vi.stubGlobal('browser', fakeBrowser);
}

export { fakeBrowser };
