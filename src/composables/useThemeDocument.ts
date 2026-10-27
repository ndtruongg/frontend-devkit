import { onMounted, onUnmounted, watch } from 'vue';
import { useThemeStore } from '../stores/theme';

/** Call once at the root of each app. Persistence belongs to the storage adapter. */
export function useThemeDocument(): void {
  const theme = useThemeStore();
  let cleanup = () => {};
  onMounted(() => {
    const root = document.documentElement;
    const previous = root.getAttribute('data-theme');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystem = () => theme.setSystemDark(media.matches);
    updateSystem();
    media.addEventListener('change', updateSystem);
    const stop = watch(() => theme.resolved, (value) => {
      root.setAttribute('data-theme', value);
    }, { immediate: true });
    cleanup = () => {
      stop();
      media.removeEventListener('change', updateSystem);
      if (previous === null) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', previous);
    };
  });
  onUnmounted(() => cleanup());
}
