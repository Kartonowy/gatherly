<script setup lang="ts">
import {ref} from 'vue';
import { Themes } from '../../types/enums';
import {enumFields} from "../../utils/utils.ts";


const theme = ref(Themes.None)


</script>

<template>
    <div class="theme-select">
        <label for="theme-select">
            <select v-model="theme" name="theme-select">
              <option selected disabled :value="Themes.None" >Select theme</option>
              <option v-for="theme of enumFields(Themes).filter((e) => { return e != 'None' })" :value="theme">{{ theme }}</option>
            </select>
        </label>
        <button>Apply</button> <!-- TODO: Decide whether reload automatically or after press -->
    </div>
</template>

<style scoped>
</style>
