import { afterEach, beforeEach, vi } from 'vitest';
import { fakeBrowser, resetTestBrowser } from '../support/browser';

beforeEach(resetTestBrowser);

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  fakeBrowser.reset();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
