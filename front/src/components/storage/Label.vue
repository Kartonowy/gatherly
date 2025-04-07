<script setup lang="ts">
const props = defineProps(['textRaw'])

console.log(props.textRaw)

</script>

<template>

    <p>{{ props.textRaw }}</p>
</template>

<style scoped>
</style>
