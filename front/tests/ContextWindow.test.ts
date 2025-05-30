import { mount } from '@vue/test-utils';
import ContextWindow from '../src/components/storage/ContextWindow.vue';
import { vi, describe, it, expect } from 'vitest'

describe('ContextWindow.vue', () => {
  it('renders tiles with correct names', () => {
    const wrapper = mount(ContextWindow, {
      props: {
        item: { position: { x: 0, y: 0 } },
        context: { active: true, position: { x: 50, y: 50 } }
      } as any
    });
    const tiles = wrapper.findAll('.tile');
    expect(tiles).toHaveLength(6); // Assuming there are 6 tiles
    expect(tiles[0].text()).toBe('open');
  });

  it('handles click events on tiles', async () => {
    const wrapper = mount(ContextWindow, {
      props: {
        item: { position: { x: 0, y: 0 } },
        context: { active: true, position: { x: 50, y: 50 } }
      } as any
    });
    const openTile = wrapper.findAll('.tile')[0];
    await openTile.trigger('click');
    // Assert behavior (e.g., window.open called)
  });
});
