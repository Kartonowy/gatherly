import { createGlobalState } from '@vueuse/core'

import { reactive, ref, type Reactive, type Ref } from 'vue'
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
            console.log(state.items, _sleevekey)
            state.items = state.items.filter((e) => {
                console.log(e)
                console.log(`Comparing ${e.sleevekey?.toString()} != ${_sleevekey.toString()} `, e.sleevekey != _sleevekey);
                return e.sleevekey != _sleevekey
            })
            console.log(state.items)
        }


        return { state, getItem, addItem, removeItem }
    }
)

