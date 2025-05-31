<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import {ref} from "vue";
import {SleeveT} from "../../types/sleeve.ts";
import {insertSleeve, updateSleeve} from "../../scripts/api.ts";

const { addItem, getDialogContext, showDialog } = useGlobalState()

let label = ref("");
let url = ref("")
let summary = ref("");


const context = getDialogContext()

if (context == null) {
    const context = new SleeveT(label.value, url.value)
    context.summary = summary
    await insertSleeve(context)
    addItem(context);
} else {
    label = context.label;
    url = context.url;
    summary = context.summary;
}

async function onSubmit() {
  await updateSleeve(context!)
}
console.log("chuj")

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
    <label for="summary">
      summary:
      <textarea name="summary" id="summary" cols="30" rows="10" v-model="summary" />
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