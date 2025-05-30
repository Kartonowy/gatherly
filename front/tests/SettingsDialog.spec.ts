import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as stateModule from '../src/scripts/state'
import { Themes, Languages } from '../src/types/enums'
import SettingsDialog from '../src/components/dialogs/SettingsDialog.vue'

describe('SettingsDialog.vue', () => {
  const setTheme = vi.fn()
  const getTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(stateModule, 'useGlobalState').mockReturnValue({
      state: {
        theme: Themes.None
      },
      setTheme,
      getTheme,
    } as any)
  })

  it('renders all theme options except "None"', () => {
    const wrapper = mount(SettingsDialog)
    const options = wrapper.findAll('select[name="theme-select"] option')
    const optionValues = options.map(o => o.text())

    expect(optionValues).toContain('Default')
    expect(optionValues).toContain('Midnight')
    expect(optionValues).not.toContain('None')
  })

  it('applies selected theme when "Apply" is clicked', async () => {
    const wrapper = mount(SettingsDialog)

    const select = wrapper.find('select[name="theme-select"]')
    await select.setValue(Themes.Default)

    const applyButton = wrapper.findAll('button')[0]
    await applyButton.trigger('click')

    expect(setTheme).toHaveBeenCalledWith(Themes.Default)
  })

  it('does not apply theme when current theme is "None"', async () => {
    const wrapper = mount(SettingsDialog)
    const applyButton = wrapper.findAll('button')[0]
    await applyButton.trigger('click')

    expect(setTheme).not.toHaveBeenCalled()
  })

  it('updates locale when selection changes', async () => {
    const wrapper = mount(SettingsDialog)

    const localeSelect = wrapper.find('select[name="locale-select"]')
    await localeSelect.setValue(Languages.Polish)

    expect((wrapper.vm as any).locale).toBe(Languages.Polish)
  })
})

