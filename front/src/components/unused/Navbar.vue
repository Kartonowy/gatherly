<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signin">Sign In</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
    </nav>
</template>

<style scoped>
    nav {
        width: 100vw;
        display: flex;
        justify-content: space-evenly;

}
</style>
