import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import CopyButton from '../../src/components/CopyButton.vue';

describe('TASK-P0-002: explicit clipboard action', () => {
  it('does not write on mount or text change; writes only after a click and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const wrapper = mount(CopyButton, { props: { text: 'ban đầu' } });
    await wrapper.setProps({ text: 'kết quả' });
    expect(writeText).not.toHaveBeenCalled();
    await wrapper.get('button').trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledExactlyOnceWith('kết quả');
    expect(wrapper.get('[role="status"]').text()).toBe('Đã sao chép.');
    await wrapper.setProps({ text: '' });
    expect(wrapper.get('[role="status"]').text()).toBe('');
    expect(wrapper.get('button').element.disabled).toBe(true);
  });

  it.each(['denied', 'unavailable'])('shows an actionable %s error without exposing native error contents', async (reason) => {
    vi.stubGlobal('navigator', reason === 'unavailable' ? {} : {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('sensitive native details')) },
    });
    const wrapper = mount(CopyButton, { props: { text: 'kết quả' } });
    await wrapper.get('button').trigger('click');
    await flushPromises();
    expect(wrapper.get('[role="status"]').text()).toContain('sao chép thủ công');
    expect(wrapper.text()).not.toContain('sensitive native details');
    expect(wrapper.get('button').element.disabled).toBe(false);
  });

  it('blocks repeated clicks while pending and discards feedback for stale text', async () => {
    let finish!: () => void;
    const writeText = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const wrapper = mount(CopyButton, { props: { text: 'cũ' } });
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('button').attributes('aria-busy')).toBe('true');
    await wrapper.get('button').trigger('click');
    await wrapper.setProps({ text: 'mới' });
    finish();
    await flushPromises();
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(wrapper.get('[role="status"]').text()).toBe('');
  });
});
