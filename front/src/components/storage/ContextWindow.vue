<script setup lang="ts">
import type { Position } from '../../utils/types';
import { useGlobalState } from '../../scripts/state.ts';


const props = defineProps<{
    position: Position,
    isContextActive: boolean,
    sleeve_key: PropertyKey | null | undefined
    // handler: () => boolean,
}>();

const positionD = {
    left: 'calc(250px - 1.4rem)',
    top: 'calc(60px - 1.65rem)' 
}

type TileBindable = [
    name: string | number,
    bind: () => void
];

const {items} = useGlobalState()

const tiles: TileBindable[] = [
    ["open", () => {
        let ouritem = items.find((e) => e.sleevekey == props.sleeve_key)
        window.open(ouritem?.url, '_blank')
    }],
    ["edit", () => {}],
    ["tag", () => {}],
    ["categories", () => {}],
    ["highlight", () => {}],
    ["delete", () => {}]
];

</script>

<template>
    <div :class="{ active: isContextActive }" class="container" :style="positionD" >
        <div class="context-menu">
            <div class="tile" v-for="tile in tiles">
                <div @click="tile[1]">{{ tile[0] }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        position: absolute;
    }

    :not(.active).container {
        display: none;
    }

    .context-menu {
        outline: 2px red solid;
    }

    .tile:hover {
        background: red;
    }
</style>
