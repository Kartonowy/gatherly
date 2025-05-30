import { mount } from '@vue/test-utils';
import ContextButton from '../src/components/storage/ContextButton.vue';
import { vi, describe, it, expect } from 'vitest'

describe('ContextButton.vue', () => {
  it('emits toggle event on click', async () => {
    const toggleMock = vi.fn();
    const wrapper = mount(ContextButton, {
      props: {
        toggle: toggleMock
      }
    });
    await wrapper.find('button').trigger('click');
    expect(toggleMock).toHaveBeenCalled();
  });
});
