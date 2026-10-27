import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import UiButton from '../../src/components/UiButton.vue';
import UiTextField from '../../src/components/UiTextField.vue';
import UiStatus from '../../src/components/UiStatus.vue';

describe('TASK-P0-002: accessible UI primitives', () => {
  it('uses a native non-submit button and blocks actions when disabled or loading', async () => {
    const click = vi.fn();
    const wrapper = mount(UiButton, { slots: { default: 'Chạy' }, attrs: { onClick: click } });
    expect(wrapper.attributes('type')).toBe('button');
    await wrapper.trigger('click');
    expect(click).toHaveBeenCalledTimes(1);
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    await wrapper.setProps({ disabled: false, loading: true });
    await wrapper.trigger('click');
    expect(click).toHaveBeenCalledTimes(1);
    expect(wrapper.attributes('aria-busy')).toBe('true');
    expect(wrapper.get('.ui-spinner').attributes('aria-hidden')).toBe('true');
  });

  it('connects field label, hint and validation error and emits text input', async () => {
    const wrapper = mount(UiTextField, {
      props: { label: 'Dữ liệu', modelValue: '', hint: 'Nhập văn bản', error: 'Không hợp lệ', required: true },
      attrs: { autocomplete: 'off' },
    });
    const input = wrapper.get('input');
    const id = input.attributes('id');
    expect(wrapper.get('label').attributes('for')).toBe(id);
    expect(input.attributes('aria-describedby')).toBe(`${id}-hint ${id}-error`);
    expect(wrapper.get('[role="alert"]').text()).toBe('Không hợp lệ');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('autocomplete')).toBe('off');
    expect(input.element.required).toBe(true);
    await input.setValue('Tiếng Việt');
    expect(wrapper.emitted('update:modelValue')).toEqual([['Tiếng Việt']]);
    await wrapper.setProps({ error: '', hint: '' });
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(input.attributes('aria-describedby')).toBeUndefined();
    await wrapper.setProps({ disabled: true });
    expect(input.element.disabled).toBe(true);
  });

  it('assigns unique field IDs and renders untrusted error text inertly', () => {
    const wrapper = mount({
      components: { UiTextField },
      template: '<div><UiTextField label="Một" model-value="" /><UiTextField label="Hai" model-value="" error="&lt;img src=x onerror=alert(1)&gt;" /></div>',
    });
    const ids = wrapper.findAll('input').map((input) => input.attributes('id'));
    expect(new Set(ids).size).toBe(2);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.get('[role="alert"]').text()).toContain('<img');
  });

  it.each([
    ['empty', 'region'], ['loading', 'status'], ['error', 'alert'], ['success', 'status'],
  ] as const)('announces the %s state with the correct semantics', (kind, role) => {
    const wrapper = mount(UiStatus, { props: { kind, title: 'Trạng thái', description: 'Thông tin' } });
    expect(wrapper.attributes('role')).toBe(role);
    expect(wrapper.attributes('aria-labelledby')).toBe(wrapper.get('h2').attributes('id'));
    expect(wrapper.attributes('aria-busy')).toBe(kind === 'loading' ? 'true' : undefined);
    if (kind !== 'empty') expect(wrapper.get('h2').text()).not.toBe('Trạng thái');
  });
});
