<script setup lang="ts">

import {useGlobalState} from "../../scripts/state.ts";
import EditContextDialog from "./EditContextDialog.vue";
import AddContextDialog from "./AddContextDialog.vue";
import SettingsDialog from "./SettingsDialog.vue";
import { DialogKind } from "../../types/enums.ts";
import AuthDialog from "./AuthDialog.vue";
import BoardDialog from "./BoardDialog.vue";

const { state, showDialog } = useGlobalState()

</script>

<template>
  <div class="dialog-container">
    <div class="dialog-header">
      <button @click="showDialog(false)">x</button>
    </div>
    <div class="dialog-content">
      <EditContextDialog v-if="state.dialog.kind == DialogKind.SleeveEdit" />
      <AddContextDialog v-else-if="state.dialog.kind == DialogKind.SleeveAdd" />
      <AuthDialog v-else-if="state.dialog.kind == DialogKind.Auth" />
      <BoardDialog v-else-if="state.dialog.kind == DialogKind.Board" />
      <SettingsDialog v-else-if="state.dialog.kind == DialogKind.Settings" />
    </div>
  </div>
</template>

<style scoped>
</style>