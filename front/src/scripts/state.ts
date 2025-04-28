import { createGlobalState } from '@vueuse/core'

import { reactive } from 'vue'
import type { SleeveT } from '../utils/types'

export const useGlobalState = createGlobalState(
    () => {
        let state: { items: SleeveT[] } = reactive({
            items: []
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


        return { state, getItem, addItem, removeItem }
    }
)

