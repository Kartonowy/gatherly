<script setup lang="ts">

import { ref } from 'vue';
import ContextWindow from './ContextWindow.vue';
import type { Position, SleeveT } from '../../utils/types';

const props = defineProps<{
    item: SleeveT
}>();

const isContextActive = ref(false);

</script>

<template>
    <button @click="() => {isContextActive = !isContextActive}">+</button>
    <ContextWindow :is-context-active="isContextActive" :item="item"/>
</template>

<style scoped>
    button {
        width: 20%;
        height: 100%;
        border-radius: 25px;
    }
</style>
