<script setup lang="ts">


import {ref} from "vue";

let logintab = ref(true);

</script>

<template>
  <div class="switch" style="display: inline">
    <div @click="logintab=true" class="form-switch selected">Log In</div>
    <div @click="logintab=false" class="form-switch">Sign Up</div>
  </div>
  <!-- https://formkit.com/essentials/styling -->
  <div class="forms-container" v-if="logintab">
    <FormKit type="form" >
      <FormKit type="text" name="name" id="name" label="Username or e-mail" />
      <FormKit type="password" name="password" id="password" label="Password" />
      <FormKit type="checkbox" name="remember" id="remember" label="Remember me" />
    </FormKit>
  </div>
  <div class="forms-container" v-else >
    <FormKit type="form" >
      <FormKit type="text" name="username" id="username" label="Username" />
      <FormKit type="email" name="email" id="email" label="E-mail address" />
      <FormKit type="password" name="password" id="password" label="Password" />
      <FormKit type="password" name="password" id="password" label="Repeat Password" />
    </FormKit>
  </div>
</template>

<style scoped>

</style>