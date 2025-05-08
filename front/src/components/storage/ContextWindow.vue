<script setup lang="ts">
import {DialogKind, SleeveT} from '../../utils/types.ts';
import {useGlobalState} from '../../scripts/state.ts';


const props = defineProps<{
    item: SleeveT,
    isContextActive: boolean,
}>();
const sleeve = props.item

const positionD = {
    left: 'calc(250px - 1.4rem)',
    top: 'calc(60px - 1.65rem)' 
}

type TileBindable = [
    name: string | number,
    bind?: () => void
];

const { removeItem, showDialog, setDialog } = useGlobalState()

const tiles: TileBindable[] = [
    ["open", () => {
        window.open(sleeve?.url.toString(), '_blank')
    }],
    ["edit", () => {
        setDialog(DialogKind.SleeveEdit, sleeve)
        showDialog(true)
    }],
    ["tag"],
    ["categories"],
    ["highlight"],
    ["delete", () => {
        // todo: add exists test
        removeItem(sleeve.sleevekey!)
    }]
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
