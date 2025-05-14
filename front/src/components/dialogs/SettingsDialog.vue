<script setup lang="ts">
import {ref} from 'vue';
import {Languages, Themes} from '../../types/enums';
import {enumFields} from "../../utils/utils.ts";


const theme = ref(Themes.None)
const locale = ref(Languages.English)

// Since Themes and Languages are pretty static, we could just write
// html and not load it dynamically
// to discuss
// might want to add option of allowing users to create their own color palette or theme

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
  <div class="locale-select">
    <label for="locale-select">
      <select v-model="locale" name="locale-select">
        <option selected :value="Languages.English">English</option>
        <option :value="Languages.Polish">Polish</option>
      </select>
    </label>
    <button>Apply</button> <!-- TODO: Decide whether reload automatically or after press -->
  </div>
</template>

<style scoped>
</style>
