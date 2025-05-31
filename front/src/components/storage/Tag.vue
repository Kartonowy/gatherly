<script setup lang="ts">

const props = defineProps<{
  color: string
}>()

</script>

<template>
  <div style="height: 10px; width: 10px; border-radius: 50%" :style="'background-color:' + color "></div>
</template>

<style scoped>

</style>