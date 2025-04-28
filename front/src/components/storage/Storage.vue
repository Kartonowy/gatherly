<script setup lang="ts">
import Sleeve from './Sleeve.vue';
import { useGlobalState } from '../../scripts/state';

const { state } = useGlobalState()


</script>

<template>

    <div class="sleeve-storage" v-for="item in state.items">
        <Sleeve :key="item.sleevekey!" :item="item" />
    </div>

</template>

<style scoped>
</style>
