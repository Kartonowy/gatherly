<script setup lang="ts">

import { ref } from 'vue';
import ContextWindow from './ContextWindow.vue';
import type {SleeveT} from "../../types/sleeve.ts";

defineProps<{
  item: SleeveT
}>();

const buttonContext = ref({
      active: false,
      position: {
        x: 0,
        y: 0,
      }
    }
);

function onCtxClick(e: MouseEvent) {
  buttonContext.value.active = !buttonContext.value.active;
  buttonContext.value.position = {
    x: e.clientX,
    y: e.clientY,
  }
  console.log(buttonContext.value.position);
}

</script>

<template>
    <button @click="(e) => onCtxClick(e)">+</button>
    <ContextWindow :button-context="buttonContext" :item="item"/>
</template>

<style scoped>
    button {
        width: 20%;
        height: 100%;
        border-radius: 25px;
    }
</style>
