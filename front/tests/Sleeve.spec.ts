import { mount } from '@vue/test-utils';
import Sleeve from '../src/components/storage/Sleeve.vue';
import { vi, describe, it, expect } from 'vitest'

describe('Sleeve.vue', () => {
  it('renders Label component', () => {
    const wrapper = mount(Sleeve, {
      props: {
        item: {
          label: 'Test Label',
          position: { x: 0, y: 0 },
          url: 'https://example.com'
        } as any
      }
    });
    const label = wrapper.findComponent({ name: 'Label' });
    expect(label.exists()).toBe(true);
  });

  it('handles dragging', async () => {
    const wrapper = mount(Sleeve, {
      props: {
        item: {
          label: 'Test Label',
          position: { x: 0, y: 0 },
          url: 'https://example.com'
        } as any
      }
    });
    const container = wrapper.find('.sleeve-container');
    await container.trigger('mousedown');
    await container.trigger('mousemove', { clientX: 100, clientY: 100 });
    await container.trigger('mouseup');
    // Draggable behavior should update styles
    expect(container.attributes('style')).toContain('transform');
  });
});
