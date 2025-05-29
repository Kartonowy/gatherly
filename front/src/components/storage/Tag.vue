<script setup lang="ts">
import { defineProps } from 'vue';
import type {TagT} from '../../types/types.ts';

const props = defineProps<{
    tags?: TagT
}>()

</script>
<template>
    <div :style="'background-color: ' + tags?.bgColor" style="width:10px; height: 10px; border-radius: 50%;"></div>
</template>