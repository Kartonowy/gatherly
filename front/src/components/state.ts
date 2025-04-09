import { createGlobalState } from '@vueuse/core'

import { shallowRef, ref, type Ref, computed, reactive, type Reactive } from 'vue'
import { sleeves } from '../utils/dummy'
import type { SleeveT } from '../utils/types'

export const useGlobalState = createGlobalState(
  () => {
    const itemsref = sleeves
    let items: Reactive<SleeveT[]> = reactive([]);

// const plusOne = computed({
//   get: () => count.value + 1,
//   set: (val) => {
//     count.value = val - 1
//   }
// })
    return { itemsref, items }
  }
)
