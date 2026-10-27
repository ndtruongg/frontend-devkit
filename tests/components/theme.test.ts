import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import App from '../../entrypoints/popup/App.vue';

describe('TASK-P0-002: theme document lifecycle', () => {
  it('follows OS changes, honors the selector and removes its listener on unmount', async () => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const add = vi.spyOn(media, 'addEventListener');
    const remove = vi.spyOn(media, 'removeEventListener');
    vi.spyOn(window, 'matchMedia').mockReturnValue(media);
    const wrapper = mount(App, { global: { plugins: [createPinia()] }, attachTo: document.body });
    const select = wrapper.get('select');
    const change = add.mock.calls[0]![1] as EventListener;
    Object.defineProperty(media, 'matches', { configurable: true, value: true });
    change(new Event('change'));
    await nextTick();
    expect(document.documentElement.dataset.theme).toBe('dark');
    await select.setValue('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    change(new Event('change'));
    await nextTick();
    expect(document.documentElement.dataset.theme).toBe('light');
    await select.setValue('system');
    expect(document.documentElement.dataset.theme).toBe('dark');
    wrapper.unmount();
    expect(remove).toHaveBeenCalledWith('change', change);
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
