<script setup lang="ts">
// import Navbar from './components/Navbar.vue';
import Dashboard from './components/dashboard/Dashboard.vue';
import Dialog from "./components/dialogs/Dialog.vue";
import {useGlobalState} from "./scripts/state.ts";

const { state } = useGlobalState()


</script>

<template>
    <!-- <Navbar/> -->
    <main>
        <RouterView/>
    </main>
    <Dashboard />
  <Dialog v-if="state.dialog.active" />
</template>

<style scoped>
</style>
