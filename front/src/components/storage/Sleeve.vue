<script setup lang="ts">
import { useGlobalState } from '../../scripts/state';
import Label from './Label.vue';
import ContextButton from './ContextButton.vue';

import { useDraggable, useElementHover, type Position } from '@vueuse/core';
import { getCurrentInstance, useTemplateRef } from 'vue';
import { SleeveT } from '../../utils/types';


const props = defineProps<{
    label: string,
    url: string,
    position: Position,
}>();

let { items } = useGlobalState();

const key = getCurrentInstance()?.vnode.key;


const el = useTemplateRef<HTMLElement>('el')

const { x, y, style} = useDraggable(el, {
    preventDefault: true,
    initialValue: { x: props.position.x, y: props.position.y},
    onEnd: (position: Position, event: PointerEvent) => {
        let ouritem = items.find((e) => e.sleevekey == key)
        if (ouritem) {
            ouritem.position.x = position.x;
            ouritem.position.y = position.y;
        }
    }, 
})

const changePos = (newx: number, newy: number) => {
    x.value = newx
    y.value = newy
}

const isHovered = useElementHover(el);

let sleeve: SleeveT = new SleeveT(props.label, props.url, changePos, key!)

items.push(sleeve);

</script>
<template>
    <div class="sleeve-container" ref="el" :style="style" style="position: fixed;">
        <div class="content-container">
            <Label :text-raw="sleeve.label" />
            <a @click.prevent="" onmousedown="return false" :style="!isHovered ? 'display: none' : '' " :href="sleeve.url">{{ sleeve.url }}</a>
        </div>
        <ContextButton :position="position" :sleeve_key="sleeve.sleevekey"/>
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
        -khtml-user-select: none;
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
