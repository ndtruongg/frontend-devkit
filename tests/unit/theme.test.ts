import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useThemeStore } from '../../src/stores/theme';

beforeEach(() => setActivePinia(createPinia()));

describe('TASK-P0-002: theme state', () => {
  it('follows system changes unless the user explicitly selects a theme', () => {
    const theme = useThemeStore();
    expect(theme.preference).toBe('system');
    theme.setSystemDark(true);
    expect(theme.resolved).toBe('dark');
    theme.setPreference('light');
    expect(theme.resolved).toBe('light');
    theme.setSystemDark(false);
    theme.setSystemDark(true);
    expect(theme.resolved).toBe('light');
    theme.setPreference('system');
    expect(theme.resolved).toBe('dark');
  });

  it('rejects unknown preference input without changing existing state', () => {
    const theme = useThemeStore();
    theme.setPreference('dark');
    for (const value of ['auto', '', null, {}, '<script>']) {
      expect(theme.setPreference(value)).toBe(false);
      expect(theme.preference).toBe('dark');
    }
  });
});
