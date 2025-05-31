<script setup lang="ts">
import type {Ref} from "vue";
import type {TagT} from "../../types/types.ts";
import Tag from "./Tag.vue";

const props = defineProps<{
  textRaw: Ref<string>
}>()

const tags: TagT[] = [
  {
    color: "#692137"
  },
  {
    color: "#b4dd1e"
  },
  {
    color: "#299321"
  },
]

</script>

<template>
  <div class="label">
    <p>{{ textRaw }}</p>
    <div class="tags">
      <Tag  v-for="tag in tags" :color="tag.color"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.label {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    width: 60%;
  }
  .tags {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
  }
}

</style>
