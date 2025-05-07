<script setup lang="ts">
import Label from './Label.vue';
import ContextButton from './ContextButton.vue';

import { useDraggable, useElementHover, type Position } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import type { SleeveT } from '../../utils/types';


const props = defineProps<{
    item: SleeveT
}>();
const sleeve = props.item;

const el = useTemplateRef<HTMLElement>('el')
const { x, y, style} = useDraggable(el, {
    preventDefault: true,
    initialValue: { x: sleeve.position.x, y: sleeve.position.y},
    onEnd: (position: Position, _event: PointerEvent) => {
        sleeve.position.x = position.x;
        sleeve.position.y = position.y;
    }, 
})
const isHovered = useElementHover(el);

sleeve.changePos = (newx: number, newy: number) => {
    x.value = newx
    y.value = newy
}


</script>
<template>
    <div class="sleeve-container" ref="el" :style="style" style="position: fixed;">
        <div class="content-container">
            <Label :text-raw="sleeve.label" />
            <a @click.prevent :style="!isHovered ? 'display: none' : '' " :href="sleeve.url.toString()">{{ sleeve.url.toString() }}</a>
        </div>
        <ContextButton :item="item"/>
    </div>
</template>

<style scoped>
    .sleeve-container {
        display: flex;
        flex-flow: row wrap;
        border:slategrey 1px solid;
        width: 250px;
        height: 60px;
        border-radius: 25px;
        padding: 0.5vmin;
        align-items: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .content-container {
        width: 80%;
        height: 100%;
    }


    a {
        all: unset;
        color: midnightblue;
        font-size: 1.5vmin;
        max-width: 50px;
        width: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

</style>
