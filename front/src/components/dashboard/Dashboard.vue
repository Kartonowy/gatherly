<script setup lang="ts">
import sort from '../../scripts/sort';
import {sleeves} from '../../utils/dummy';
import {useGlobalState} from '../../scripts/state';
import { DialogKind } from '../../types/enums';
import {getBoards} from "../../scripts/api.ts";

const { addItem, showDialog, setDialog } = useGlobalState()
type TileBindable = [
    name: string | number,
    bind: () => void
];

const tiles: TileBindable[] = [
    ["add", () => {
      setDialog(DialogKind.Sleeve, null);
      showDialog(true);
    }],
    ["sort", sort],
    ["filter", () => {}],
    ["User", () => {
      setDialog(DialogKind.Auth, null);
      showDialog(true);
    }],
    ["board", () => {
      setDialog(DialogKind.Board, null);
      showDialog(true);
    }],
    ["???", () => {
        for (let s of sleeves) {
            addItem(s)
        } // for development purposes TODO: Delete
    }],
    ["settings", () => {
      setDialog(DialogKind.Settings, null);
      showDialog(true);
    }]
];

</script>

<template>
    <div class="container-dashboard">
        <div @click="tile[1]" class="tile" v-for="tile in tiles">
            {{ tile[0] }}
        </div>
    </div>

</template>

<style scoped>
</style>
