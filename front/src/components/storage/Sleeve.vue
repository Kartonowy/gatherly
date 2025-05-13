<script setup lang="ts">
import Label from './Label.vue';
import ContextButton from './ContextButton.vue';

import { useDraggable, useElementHover, type Position } from '@vueuse/core';
import {type Ref, ref, type ShallowRef, useTemplateRef, watch} from 'vue';
import type { SleeveT } from '../../types/sleeve';
import ContextWindow from "./ContextWindow.vue";


const props = defineProps<{
    item: SleeveT
}>();
const sleeve = props.item;

const el = useTemplateRef<HTMLElement>('el')

// We aren't storing position in sleeveState, because we want to persist it
// between sessions and devices. But hover state is only relevant if app is open,
// so we don't have to store it anywhere. We aren't tracking when and why someone is hovered over,
// But we need the info for logic

const isHovered = useElementHover(el)



const { x, y, style} = useDraggable(el, {
  preventDefault: true,
  initialValue: { x: sleeve.position.x, y: sleeve.position.y},
  onMove: () => {
    sleeveState.value.context.active = false;
  },
  onEnd: (position: Position, _event: PointerEvent) => {
    sleeve.position.x = position.x;
    sleeve.position.y = position.y;
  },
})

const sleeveState = ref({
  context: {
    active: false,
    position: {
      x: x,
      y: y
    },
  }
})

const toggle = (e: MouseEvent) => {
  sleeveState.value.context.active = !sleeveState.value.context.active;
  sleeveState.value.context.position = {
    x: e.clientX,
    y: e.clientY
  }
}

watch(isHovered, () => {
  sleeveState.value.context.active = false;
})

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
        <ContextButton :toggle="toggle"/>
        <ContextWindow :context="sleeveState.context" :item="item"/>
    </div>
</template>

<style scoped>

</style>
