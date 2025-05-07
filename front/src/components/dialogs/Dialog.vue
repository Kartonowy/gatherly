<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import EditContextDialog from "./EditContextDialog.vue";
import AddContextDialog from "./AddContextDialog.vue";
import PlaceholderContextDialog from "./PlaceholderContextDialog.vue";
import SettingsDialog from "./SettingsDialog.vue";
import { DialogKind } from "../../types/enums.ts";

const { state, showDialog } = useGlobalState()

</script>

<template>
  <div class="dialog-container">
    <div class="dialog-header">
      <button @click="showDialog(false)">close</button>
    </div>
    <div class="dialog-content">
      <EditContextDialog v-if="state.dialog.kind == DialogKind.SleeveEdit" />
      <AddContextDialog v-else-if="state.dialog.kind == DialogKind.SleeveAdd" />
      <PlaceholderContextDialog v-else-if="state.dialog.kind == DialogKind.Placeholder" />
      <SettingsDialog v-else-if="state.dialog.kind == DialogKind.Settings" />
    </div>
  </div>
</template>

<style scoped>
  .dialog-container {
    width:20%;
    height:100%;
    position: absolute;
    left: 80%;
    outline: 1px blue solid;
  }

  .dialog-header {
    width: 100%;
    height: 10%;
  }

  .dialog-content {
    width: 100%;
    height: 80%;
  }
</style>
