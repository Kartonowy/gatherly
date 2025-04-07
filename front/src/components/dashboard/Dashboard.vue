<script setup lang="ts">

    type TileBindable = [
        name: string | number,
        bind: () => void
    ];

    const tiles: TileBindable[] = [
        ["add", () => {}],
        ["sort", () => {}],
        ["filter", () => {}],
        [4, () => {}],
        [5, () => {}],
        ["???", () => {}]
    ];

</script>

<template>
    <div class="container-dashboard">
        <div class="tile" v-for="tile in tiles">
            {{ tile }}
        </div>
    </div>

</template>

<style scoped>
.container-dashboard {
    width: 5%;
    outline: 1px red solid;
    display: flex;
    flex-flow: column nowrap;
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
