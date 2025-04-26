<script setup lang="ts">
import Sleeve from './Sleeve.vue';
import { useGlobalState } from '../../scripts/state';
import { useTemplateRef } from 'vue';

const { state } = useGlobalState()

const itemsRef = useTemplateRef("items")

</script>

<template>

    <div class="sleeve-storage" v-for="item in state.items" ref="items">
        <Sleeve :key="item.sleevekey!" :item="item" />
    </div>

</template>

<style scoped>
</style>
