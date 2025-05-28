<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

type loginForm = {
  name: string,
  password: string,
  remember: boolean,
}

type registerForm = {
  username: string,
  email: string
  password: string,
}


let logintab = ref(true);

const submitted = ref(false);

const loginHandler = async (x: loginForm) => {
  const placeholder = await axios.post("http://127.0.0.1:3000/api/log-in", x, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  console.log(placeholder);
  submitted.value = true;
}

const registerHandler = async (x: registerForm) => {
  console.log(x)
  const placeholder = await axios.post("http://127.0.0.1:3000/api/sign-up", x, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  console.log(placeholder.data);
  submitted.value = true;
}

</script>

<template>
  <div class="switch" style="display: inline">
    <div @click="logintab=true" class="form-switch selected">Log In</div>
    <div @click="logintab=false" class="form-switch">Sign Up</div>
  </div>
  <!-- https://formkit.com/essentials/styling -->
  <div class="forms-container" v-if="logintab">
    <FormKit type="form" @submit="loginHandler" submit-label="Log In" :actions="false">
      <FormKit type="text"
               name="name"
               id="name"
               label="Username or e-mail"
      />

      <FormKit type="password"
               name="password"
               id="password"
               label="Password"
      />

      <FormKit type="checkbox"
               name="remember"
               id="remember"
               label="Remember me"
      />
      <FormKit type="submit"
               label="Log In"
      />
    </FormKit>
  </div>
  <div class="forms-container" v-else>
    <FormKit type="form" @submit="registerHandler" submit-label="Log In" :actions="false">

      <FormKit type="text"
               name="name"
               id="username"
               label="Username"
               validation="required"
      />

      <FormKit type="email"
               name="email"
               id="email"
               label="E-mail address"
               validation="required"
      />

      <FormKit type="password"
               name="password"
               id="password"
               label="Password"
               validation="required|length:8|matches:/[0-9]/"
               validation-visibility="live"
               :validation-messages="{ matches: 'Passwords must include a number.' }"
      />

      <FormKit type="password"
               name="password_confirm"
               id="password_confirm"
               label="Repeat Password"
               validation="required|confirm"
               validation-visibility="live"
      />
      <FormKit type="submit"
               label="Sign up"
      />
    </FormKit>
  </div>
</template>

<style scoped>

</style>