<script setup lang="ts">
import type {Ref} from 'vue';
import Tag from './Tag.vue';

const props = defineProps<{
    textRaw?:Ref<string>
}>()

const tags = [
    {
        bgColor: '#d582ae',
        name: 'xd'
    },
    {
        bgColor: '#5a5dbc',
        name: 'xd2'
    },
    {
        bgColor: '#c4391d',
        name: 'xd3'
    }
]

</script>

<template>
        <p>{{ props.textRaw }}
            <div class="tags">
                <Tag v-for="tag in tags" :tags="tag"/>
            </div>
        </p>
</template>

<style scoped lang="scss">
    p{
        height: 2vh;
        width:10vw;
        display: flex;
        flex-direction: row;
        padding-left: 5px;
        justify-content: space-between;
        align-items: center;

        .tags{
            width:4vw;
            height: 2vh;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 2px;
            margin-right: 15px;
        }
    }
</style>
