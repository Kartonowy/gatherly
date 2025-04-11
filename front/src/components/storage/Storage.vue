<script setup lang="ts">
import Sleeve from './Sleeve.vue';
import { useGlobalState } from '../state';
import { ref } from 'vue';
import { sleeves } from '../../utils/dummy';


</script>

<template>

    <div v-for="(item, index) in sleeves">
        <Sleeve :key="index" :label="item.label" :url="item.url" :position="item.position"/>
    </div>

</template>

<style scoped>
</style>
