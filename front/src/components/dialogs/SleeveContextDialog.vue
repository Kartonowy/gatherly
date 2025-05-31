<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useGlobalState } from "../../scripts/state.ts";
import { SleeveT } from "../../types/sleeve.ts";
import { insertSleeve, updateSleeve } from "../../scripts/api.ts";

const { addItem, getDialogContext, showDialog } = useGlobalState();

let label = ref("");
let url = ref("");
let summary = ref("");
let loaded = ref(false);

let context = getDialogContext();

onMounted(async () => {
  if (context == null) {
    console.log("context is null");
    const newSleeve = new SleeveT(label.value, url.value);
    newSleeve.summary = summary;
    await insertSleeve(newSleeve);
    addItem(newSleeve);
    console.log("Added item");
    loaded.value = true;
    context = newSleeve
  } else {
    console.log("context is not null");
    label = context.label;
    url = context.url;
    summary = context.summary;
    loaded.value = true;
  }
});

async function onSubmit() {
    context!.url = url
    context!.label = label
    context!.summary = summary
    await updateSleeve(context!);
    nextTick()
}

console.log("chuj");
</script>

<template>
  <form v-if="loaded">
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
