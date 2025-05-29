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
      setDialog(DialogKind.SleeveAdd, null);
      showDialog(true);
    }],
    ["sort", sort],
    ["filter", () => {}],
    ["User", () => {
      setDialog(DialogKind.Auth, null);
      showDialog(true);
    }],
    ["boards", () => {
        getBoards()
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
