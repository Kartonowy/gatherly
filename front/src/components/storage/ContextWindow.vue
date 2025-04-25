<script setup lang="ts">
import { SleeveT, type Position } from '../../utils/types';
import { useGlobalState } from '../../scripts/state.ts';
import { getUserSleeveInfo } from '../../scripts/getUserItem.ts';


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

const { getItem } = useGlobalState()

const tiles: TileBindable[] = [
    ["open", () => {
        let ouritem = getItem(props.sleeve_key!)
        window.open(ouritem?.url, '_blank')
    }],
    ["edit", () => {
        let ouritem = getItem(props.sleeve_key!)
        let info = getUserSleeveInfo()
        console.log(ouritem)
        ouritem?.changeItem(info.label, info.url)
    }],
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
