<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import {SleeveT} from "../../types/sleeve.ts";
import {getBoard, getBoards} from "../../scripts/api.ts";
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const boards: any = ref(null)
const loading = ref(false);
const error = ref(null);
const selected = ref(null)

const { setBoard } = useGlobalState();


watch(selected, async (newVal: any, _oldVal) => {
      if (newVal) {
        const sleeves = await getBoard(newVal.id)

        setBoard(sleeves.data.map((e: any) => {
                  const s  = new SleeveT(e.name, e.url)
                  s.addHook(() => {
                    s.changePos!(e.position_x, e.position_y)
                  })
                  return s
                },
            ), newVal
        )
      }
    }
)

async function fetchBoards() {
  error.value = boards.value = null
  loading.value = true

  try {
    boards.value = (await getBoards()).data;
    selected.value = boards.value[0]
  } catch (err: any) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchBoards()
})

</script>

<template>
  <div class="board-select">
    <div v-if="loading">Loading...</div>
    <select v-if="boards" name="boards" v-model="selected">
      <option v-for="board in boards" :value="board" :key="board.id">{{ board.name }}</option>
    </select>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<style scoped>

</style>