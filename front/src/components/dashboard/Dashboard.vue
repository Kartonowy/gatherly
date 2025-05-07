<script setup lang="ts">
import sort from '../../scripts/sort';
import {sleeves} from '../../utils/dummy';
import {DialogKind} from '../../utils/types';
import {useGlobalState} from '../../scripts/state';

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
