<script setup lang="ts">
import sort from '../../scripts/sort';
import { sleeves } from '../../utils/dummy';

    type TileBindable = [
        name: string | number,
        bind: () => void
    ];

    const tiles: TileBindable[] = [
    ["add", () => { 
        sleeves.addSleeve({
        label: prompt("label")!,
        url: prompt("url")!,
        position: { x: 0, y: 0},

    })
    }],
        ["sort", sort],
        ["filter", () => {}],
        ["categories", () => {}],
        ["profile", () => {}],
        ["???", () => {}]
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
