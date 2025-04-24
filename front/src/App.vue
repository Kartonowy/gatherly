<script setup lang="ts">
// import Navbar from './components/Navbar.vue';
import Dashboard from './components/dashboard/Dashboard.vue';



</script>

<template>
    <!-- <Navbar/> -->
    <main>
        <RouterView/>
    </main>
    <Dashboard />
</template>

<style scoped>
main {
    width: 95%;
}
</style>
