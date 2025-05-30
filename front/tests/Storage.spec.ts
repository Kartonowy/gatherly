import { mount } from '@vue/test-utils';
import Storage from '../src/components/storage/Storage.vue';
import { useGlobalState } from '../src/scripts/state';
import { vi, describe, it, expect } from 'vitest';


vi.mock('@/scripts/state', () => ({
  useGlobalState: vi.fn(() => ({
    state: {
      board: [
        { sleevekey: '1', position: { x: 0, y: 0 } },
        { sleevekey: '2', position: { x: 100, y: 100 } }
      ]
    }
  }))
}));

describe('Storage.vue', () => {
  it('renders Sleeve components based on state.board', () => {
    const wrapper = mount(Storage);
    const sleeves = wrapper.findAllComponents({ name: 'Sleeve' });
    expect(sleeves).toHaveLength(2);
  });
});
