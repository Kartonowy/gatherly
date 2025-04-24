import { createGlobalState } from '@vueuse/core'

import { reactive, type Reactive } from 'vue'
import { sleeves } from '../utils/dummy'
import type { SleeveT } from '../utils/types'

export const useGlobalState = createGlobalState(
  () => {
    const itemsref = sleeves
    let items: Reactive<SleeveT[]> = reactive([]);

    return { itemsref, items }
  }
)
