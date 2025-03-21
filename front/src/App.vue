<script setup lang="ts">
import Navbar from './components/Navbar.vue';


</script>

<template>
    <Navbar/>
    <main>
        <RouterView/>
    </main>
</template>

<style scoped>
main {
    min-width: 80vw;
    min-height: 80vh;
}
</style>
