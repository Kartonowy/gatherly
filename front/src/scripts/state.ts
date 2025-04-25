import { createGlobalState } from '@vueuse/core'

import { reactive, type Reactive } from 'vue'
import { sleeves } from '../utils/dummy'
import type { SleeveT } from '../utils/types'

export const useGlobalState = createGlobalState(
    () => {
        const itemsref = sleeves
        let items: SleeveT[] = reactive([]);


        let getItem = (sleevekey?: PropertyKey) => {
            return items.find((e) => e.sleevekey == sleevekey)
        }


        return { itemsref, items, getItem }
    }
)
