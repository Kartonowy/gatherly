<script setup lang="ts">
import { ref } from 'vue';
import Sleeve from './Sleeve.vue';
import { sleeves } from '../../utils/dummy';

const items = ref(sleeves)

</script>

<template>

    <div v-for="item in items">
        <Sleeve :label="item.label" :url="item.url" :position="item.position"/>
    </div>

</template>

<style scoped>
</style>
