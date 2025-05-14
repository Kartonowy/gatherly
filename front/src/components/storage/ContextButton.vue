<script setup lang="ts">


const props = defineProps<{
  toggle: (e: MouseEvent) => void;
}>();

</script>

<template>
    <button @click="(e) => props.toggle(e)">+</button>
</template>

<style scoped>
    button {
        width: 20%;
        height: 100%;
        border-radius: 25px;
    }
</style>
