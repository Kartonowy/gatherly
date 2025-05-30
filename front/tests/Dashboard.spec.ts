import { mount } from '@vue/test-utils'
import Dashboard from '../src/components/dashboard/Dashboard.vue' // adjust path
import { beforeEach, expect, it, vi } from 'vitest'
import * as stateModule from '../src/scripts/state'
import * as sortModule from '../src/scripts/sort'
import { DialogKind } from '../src/types/enums'
import { describe } from 'node:test'

describe('Dashboard.vue', () => {
  const showDialog = vi.fn()
  const setDialog = vi.fn()
  const addItem = vi.fn()
  const sortMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock the composable
    vi.spyOn(stateModule, 'useGlobalState').mockReturnValue({
      addItem,
      showDialog,
      setDialog,
    } as any)

    // Mock the sort function
    vi.spyOn(sortModule, 'default').mockImplementation(sortMock)
  })

  it('renders all tiles', () => {
    const wrapper = mount(Dashboard)
    const tiles = wrapper.findAll('.tile')
    expect(tiles).toHaveLength(5)
    const labels = tiles.map(t => t.text())
    expect(labels).toEqual(['add', 'sort', 'User', 'board', 'settings'])
  })

  it('calls correct functions on tile clicks', async () => {
    const wrapper = mount(Dashboard)
    const tiles = wrapper.findAll('.tile')

    // Click "add"
    await tiles[0].trigger('click')
    expect(setDialog).toHaveBeenCalledWith(DialogKind.Sleeve, null)
    expect(showDialog).toHaveBeenCalledWith(true)

    // Click "sort"
    await tiles[1].trigger('click')
    expect(sortMock).toHaveBeenCalled()

    // Click "User"
    await tiles[2].trigger('click')
    expect(setDialog).toHaveBeenCalledWith(DialogKind.Auth, null)

    // Click "board"
    await tiles[3].trigger('click')
    expect(setDialog).toHaveBeenCalledWith(DialogKind.Board, null)

    // Click "settings"
    await tiles[4].trigger('click')
    expect(setDialog).toHaveBeenCalledWith(DialogKind.Settings, null)
  })
})

