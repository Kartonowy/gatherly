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
        submit-label="register"
        @submit="submittedHandler"
        :actions="false"
        #default="{ value }"
    >
        <FormKit
            type="email" 
            name="email"
            label="Your email address"
            validation="required|email"
            help="What email do you want to use?"
        />
        <FormKit
            type="text" 
            name="email"
            label="Your username"
            validation="required"
            help="What username do you want use?"
        />
        <FormKit
            type="password"
            name="password"
            label="Your password"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
                matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
            help="What is your password?"
        />

        <FormKit
            type="submit"
            label="Register"
        />

        <pre wrap>{{ value }}</pre>

    </FormKit>
    <div v-if="submitted">
        <h2>Submission successfull!</h2>
    </div>
  <form
        id="login_form"
        action=""
        method="post"
    >
        <input type="text" placeholder="email">
        <input type="password" placeholder="password">
        <input type="password" placeholder="repeat password">
        <input type="submit" value="Submit">
  </form>

</template>

<style scoped>
    form {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
    }
</style>
