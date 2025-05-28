import { createGlobalState } from '@vueuse/core'

import { reactive } from 'vue'
import type { SleeveT } from '../types/sleeve'
import { DialogKind, Themes } from '../types/enums'

export const useGlobalState = createGlobalState(
    () => {
        let state: { 
            items: SleeveT[],
            dialog: {
                active: boolean,
                kind: DialogKind,
                context: SleeveT | null
            },
            theme:Themes
        } = reactive({
            items: [],
            dialog: {
                active: false,
                kind: DialogKind.None,
                context: null
            },
            theme: Themes.Default
        })


        let getItem = (sleevekey?: PropertyKey) => {
            return state.items.find((e) => e.sleevekey == sleevekey)
        }

        let addItem = (item: SleeveT) => {
            state.items.push(item)
        }

        let removeItem = (_sleevekey: PropertyKey) => {
            state.items = state.items.filter((e) => {
                return e.sleevekey != _sleevekey
            })
        }

        let showDialog = (_show: boolean) => {
            state.dialog.active = _show;
        }

        let setDialog = (_dialog: DialogKind, _context: SleeveT | null) => {
            state.dialog.kind = _dialog;
            state.dialog.context = _context;
        }

        let getDialogContext = () => {
            return state.dialog.context
        }

        const getTheme = () => state.theme

        const setTheme = (newTheme: Themes) => {
            state.theme = newTheme

            const head = document.head
            const existingLink = document.getElementById('theme-link') as HTMLLinkElement

            if (existingLink) {
                head.removeChild(existingLink)
            }

            if (state.theme === Themes.None) return

            const link = document.createElement('link')
            link.id = 'theme-link'
            link.rel = 'stylesheet'
            link.href = `../css/${state.theme === Themes.Midnight ? 'style-midnight.css' : 'style.css'}`

            head.appendChild(link);
        }

        return { state, getItem, addItem, removeItem, showDialog, setDialog, getDialogContext, getTheme, setTheme }
    }
)

