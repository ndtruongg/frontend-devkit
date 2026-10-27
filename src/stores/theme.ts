import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export type ThemePreference = 'system' | 'light' | 'dark';

export const useThemeStore = defineStore('theme', () => {
  const preference = ref<ThemePreference>('system');
  const systemDark = ref(false);
  const resolved = computed(() => preference.value === 'system'
    ? (systemDark.value ? 'dark' : 'light')
    : preference.value);

  function setPreference(value: unknown): boolean {
    if (value !== 'system' && value !== 'light' && value !== 'dark') return false;
    preference.value = value;
    return true;
  }

  function setSystemDark(value: boolean): void { systemDark.value = value; }
  return { preference, resolved, setPreference, setSystemDark };
});
