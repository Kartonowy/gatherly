<script setup lang="ts">

import { FormKit } from "@formkit/vue"
import { ref } from "vue";

defineProps<{ name: string }>();

const submitted = ref(false)
const submittedHandler = async () => {

    //todo ajax request to check if login successfull and replace
    await new Promise((r) => {setTimeout(r, 1000)})
    submitted.value = true
}


</script>

<template>
  <h1>{{ name }}</h1>

    <FormKit
        type="form"
        submit-label="log in"
        @submit="submittedHandler"
        :actions="false"
        #default="{ value }"
    >
        <FormKit
            type="email" 
            name="email"
            label="Your email address"
            validation="required|email"
            help="What email do you use?"
        />
        <FormKit
            type="password"
            name="password"
            label="Your password"
            validation="required"
            placeholder="Your password"
            help="What is your password?"
        />

        <FormKit
            type="submit"
            label="Log In"
        />

        <pre wrap>{{ value }}</pre>

    </FormKit>
    <div v-if="submitted">
        <h2>Submission successfull!</h2>
    </div>

</template>

<style scoped>
    form {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
    }
</style>
