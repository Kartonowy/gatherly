<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import EditContextDialog from "./EditContextDialog.vue";
import {DialogKind} from "../../utils/types.ts";
import AddContextDialog from "./AddContextDialog.vue";
import PlaceholderContextDialog from "./PlaceholderContextDialog.vue";

const { state, showDialog } = useGlobalState()

</script>

<template>
  <div class="dialog-container">
    <div class="dialog-header">
      <button @click="showDialog(false)">x</button>
    </div>
    <div class="dialog-content">
      <EditContextDialog v-if="state.dialog.kind == DialogKind.SleeveEdit" />
      <AddContextDialog v-if="state.dialog.kind == DialogKind.SleeveAdd" />
      <PlaceholderContextDialog v-if="state.dialog.kind == DialogKind.Placeholder" />
    </div>
  </div>
</template>

<style scoped>
</style>