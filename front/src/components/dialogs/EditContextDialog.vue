<script setup lang="ts">
import {useGlobalState} from "../../scripts/state.ts";
import {ref} from "vue";
import Tag from "../storage/Tag.vue";

const { getDialogContext } = useGlobalState()

const label = ref(getDialogContext()?.label!)
const url = ref(getDialogContext()?.url!)
const tagName = ref("");
const tagColor = ref("");

</script>

<template>
    <form>
      <label for="label">
        label:
        <input type="text" name="label" id="label" v-model="label">
      </label>

      <label for="url">
        url:
        <input type="url" name="url" id="url" v-model="url">
      </label>

      <label for="tagName">
        Tag:
        <input type="text" id="tagName" v-model="tagName">
        <input type="color" id="tagColor" v-model="tagColor" value="#5a5dbc">
      </label>
      <input @click.prevent="getDialogContext()?.changeItem(label, url)" type="button" value="Update" id="submit">
    </form>
</template>

<style scoped lang="scss">
  #submit {
    width: 25%;
  }

  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    label[for="tagName"]{
      width:18vw;
      height:3vh;
      flex-direction: row;
      display: flex;
      justify-content:space-evenly;
      align-items: center;
      padding: 1em;

      #tagName{
        width:14vw;
        height:3vh;
      }

      input[type="color"]{
        width:4vw;
        height:3vh;
        box-shadow: none;
        border:none;
      }
    }
  }
</style>