import { mount } from '@vue/test-utils';
import Tag from '../src/components/storage/Tag.vue';
import { describe, it, expect } from 'vitest';

describe('Tag.vue', () => {
  it('renders with correct background color', () => {
    const wrapper = mount(Tag, {
      props: {
        tags: { bgColor: '#ff0000' }
      }
    });
    const div = wrapper.find('div');
    expect(div.attributes('style')).toContain('background-color: #ff0000');
  });

  it('renders without tags prop', () => {
    const wrapper = mount(Tag);
    const div = wrapper.find('div');
    expect(div.attributes('style')).toContain('background-color: undefined');
  });
});
