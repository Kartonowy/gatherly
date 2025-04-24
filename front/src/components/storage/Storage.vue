<script setup lang="ts">
import Sleeve from './Sleeve.vue';
import { sleeves } from '../../utils/dummy';


</script>

<template>

    <div class="sleeve-storage" v-for="(item, index) in sleeves.sleeves">
        <Sleeve :key="index" :label="item.label" :url="item.url" :position="item.position"/>
    </div>

</template>

<style scoped>
</style>
