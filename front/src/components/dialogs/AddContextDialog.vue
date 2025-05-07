<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import {ref} from "vue";
import {SleeveT} from "../../utils/types.ts";

const { addItem } = useGlobalState()

const label = ref("")
const url = ref("")

</script>

<template>
  <form>
    <label for="label">
      label:
      <input type="text" name="label" id="label" v-model="label">
    </label>

    <label for="url">
      url:
      <input type="url" name="url" id="url" v-model="url">
    </label>
    <input @click.prevent="addItem(new SleeveT(label, url, Math.round(Math.random() * 1000)))" type="button" value="Update" id="submit">
  </form>
</template>

<style scoped>

#submit {
  width: 25%;
}

form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>