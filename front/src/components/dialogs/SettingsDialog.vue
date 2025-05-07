<script setup lang="ts">
import { ref } from 'vue';
import { Themes } from '../../types/enums';


const theme = ref(Themes.Debug)

</script>

<template>
    <div class="theme-select">
        <label for="theme-select">
            <select v-model="theme" name="theme-select">
                <option :value="Themes.Debug">debug</option>
                <option :value="Themes.Pinkish">pinkish</option>
                <option :value="Themes.Placeholder">placeholder</option> 
            </select>
        </label>
        <button>Apply</button> <!-- TODO: Decide whether reload automatically or after press -->
    </div>
</template>

<style scoped>
</style>
