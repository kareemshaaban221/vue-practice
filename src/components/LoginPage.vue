<script setup>
import FormContainer from "./FormContainer.vue";
import Auth from "@/models/Auth";
import User from "@/models/User";
import { reactive, ref } from "vue";
import AuthService from "@/services/AuthService";
import http from "@/../config/http";
import router from "@/router";
import { useToast } from "vue-toastification";

const form = reactive(new Auth);
const errors = reactive(new Auth);

let isLoading = ref(false);

const login = async () => {

  errors.email = errors.password = '';
  isLoading.value = true;

  const response = await AuthService.login(form).then((response) => {
    isLoading.value = false;
    return response;
  });

  if (response.code === http.status.UNPROCESSABLE_ENTITY) {
    if (Object.prototype.hasOwnProperty.call(response.errors, 'email')) {
      errors.email = response.errors.email[0] ?? '';
    }
  }

  if (response.code === http.status.UNAUTHORIZED) {
    if (Object.prototype.hasOwnProperty.call(response.errors, 'message')) {
      errors.email = response.errors.message ?? '';
    }
  }

  if (response.code === http.status.OK) {
    localStorage.setItem('token', response.data.auth.token);
    localStorage.setItem('user', new User(response.data.user).serialize());
    router.push({ name: 'tasks.index' });
    useToast().success('Login successful!');
  }

}
</script>

<template>

<FormContainer>
  <form @submit.prevent="login">
    <div class="d-flex flex-column gap-2 mb-3">
      <div class="group-input">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control bg-transparent text-light" id="email" v-model="form.email">
        <small class="text-danger" v-if="errors.email">* {{errors.email}}</small>
      </div>
      <div class="group-input">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control bg-transparent text-light" id="password" v-model="form.password">
        <small class="text-danger" v-if="errors.password">* {{errors.password}}</small>
      </div>
      <div class="group-input">
        <button class="btn btn-outline-light" v-if="! isLoading" type="submit">Login</button>
        <button class="btn btn-outline-light" disabled v-else>processing...</button>
      </div>
    </div>
  </form>
</FormContainer>

</template>
