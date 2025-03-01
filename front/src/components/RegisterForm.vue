<script setup lang="ts">

defineProps<{ name: string }>();

</script>

<template>
  <h1>{{ name }}</h1>

  <form>
        <input type="text" placeholder="name">
        <input type="text" placeholder="email">
        <input type="password" placeholder="password">
        <input type="password" placeholder="repeat password">
        <input type="submit" value="Submit">
  </form>

</template>

<style scoped>
    form {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
    }
</style>
