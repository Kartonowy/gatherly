<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import {ref} from "vue";
import {SleeveT} from "../../types/sleeve.ts";

const { addItem, getDialogContext, showDialog } = useGlobalState()

const label = ref(getDialogContext()?.label??"");
const url = ref(getDialogContext()?.url??"")

function onSubmit() {
  addItem(new SleeveT(label.value, url.value));
  showDialog(false)
}

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
    <input @click.prevent="onSubmit" type="button" value="Add" id="submit">
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