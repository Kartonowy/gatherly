<script setup lang="ts">

import { ref } from 'vue';
import ContextWindow from './ContextWindow.vue';
import type { Position } from '../../utils/types';

const props = defineProps<{
    position: Position,
    sleeve_key: PropertyKey | null | undefined
}>();

const isContextActive = ref(false);
const position = ref({
    x: 0,
    y: 0
})

</script>

<template>
    <button @click="() => {isContextActive = !isContextActive}">+</button>
    <ContextWindow :is-context-active="isContextActive" :position="position" :sleeve_key="sleeve_key"/>
</template>

<style scoped>
    button {
        width: 20%;
        height: 100%;
        border-radius: 25px;
    }
</style>
