<script setup lang="ts">
import sort from '../../scripts/sort';
import {sleeves} from '../../utils/dummy';
import {useGlobalState} from '../../scripts/state';
import { DialogKind } from '../../types/enums';

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
    ["categories", () => {}],
    ["dialog", () => {
      setDialog(DialogKind.SleeveEdit, null);
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
.container-dashboard {
    width: 5%;
    height: 100vh;
    outline: 1px red solid;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}
.tile {
    outline: 1px blue solid;
    width: 5vw;
    height: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
