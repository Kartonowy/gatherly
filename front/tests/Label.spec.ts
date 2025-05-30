import { mount } from '@vue/test-utils';
import Label from '../src/components/storage/Label.vue';
import { vi, describe, it, expect } from 'vitest'

describe('Label.vue', () => {
  it('renders textRaw prop', () => {
    const wrapper = mount(Label, {
      props: {
        textRaw: 'Test Label'
      } as any
    });
    expect(wrapper.text()).toContain('Test Label');
  });

  it('renders tags', () => {
    const wrapper = mount(Label);
    const tags = wrapper.findAllComponents({ name: 'Tag' });
    expect(tags).toHaveLength(3); // Assuming the default tags array has 3 tags
  });
});
