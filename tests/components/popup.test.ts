import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';
import { browser } from 'wxt/browser';
import App from '../../entrypoints/popup/App.vue';

describe('TASK-P0-006: popup SFC test environment', () => {
  it('mounts the production Vue component without privileged API calls', () => {
    const readStorage = vi.spyOn(browser.storage.local, 'get');
    const requestPermission = vi.spyOn(browser.permissions, 'request');
    const wrapper = mount(App, { attachTo: document.body, global: { plugins: [createPinia()] } });
    const main = wrapper.get('main');
    const headingId = main.attributes('aria-labelledby');

    expect(headingId).toBeTruthy();
    expect(wrapper.get(`#${headingId}`).text()).toBe('Frontend DevKit');
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('status-title');
    expect(wrapper.text()).toContain('Bản khởi tạo chưa có công cụ.');
    expect(readStorage).not.toHaveBeenCalled();
    expect(requestPermission).not.toHaveBeenCalled();
  });
});
