<script setup lang="ts">
import Label from './Label.vue';
import OptionsButton from './OptionsButton.vue';

import { useDraggable } from '@vueuse/core';
import { useTemplateRef } from 'vue';

let url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

type Sleeve = {
    label: string,
    url: string,
}


const el = useTemplateRef<HTMLElement>('el')

const { x, y, style} = useDraggable(el, {
    initialValue: { x: 40, y: 40}
})

</script>
<template>
    <div class="sleeve-container" ref="el" :style="style" style="position: fixed;">
        <div>
            <Label text-raw="Item 1" />
            <a :href="url">{{ url }}</a>
        </div>
        <OptionsButton />
    </div>
</template>

<style scoped>
    .sleeve-container {
        display: flex;
        flex-flow: row wrap;
        border:slategrey 1px solid;
        max-width: fit-content;
        border-radius: 25px;
        padding: 0.5vmin;
    }

    a {
        all: unset;
        color: midnightblue;
        font-size: 1.5vmin;
    }
</style>
