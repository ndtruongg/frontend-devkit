import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { WxtVitest } from 'wxt/testing/vitest-plugin';

export default defineConfig({
  plugins: [
    vue(),
    // WXT only needs server metadata in tests. Avoid probing/opening a port.
    WxtVitest({ dev: { server: { port: 3000, strictPort: true } } }),
  ],
  test: {
    setupFiles: ['./tests/setup/browser.ts'],
    clearMocks: true,
    restoreMocks: true,
    testTimeout: 10_000,
    hookTimeout: 60_000,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.test.ts', 'src/**/__tests__/**/*.test.ts'],
          exclude: ['**/*.component.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'component',
          environment: 'happy-dom',
          include: ['tests/components/**/*.test.ts', 'src/**/__tests__/**/*.component.test.ts'],
          setupFiles: ['./tests/setup/dom.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'node',
          include: ['tests/integration/**/*.test.ts'],
        },
      },
    ],
  },
});
