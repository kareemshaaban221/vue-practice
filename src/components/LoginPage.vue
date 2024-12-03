<script setup>
import FormContainer from "./FormContainer.vue";
import Auth from "@/models/Auth";
import { reactive } from "vue";
import AuthService from "@/services/AuthService";
import http from "@/../config/http";

const form = reactive(new Auth);
const errors = reactive(new Auth);

const login = async () => {
  errors.email = errors.password = '';
  const response = await AuthService.login(form);

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
        <button class="btn btn-outline-light" type="submit">Login</button>
      </div>
    </div>
  </form>
</FormContainer>

</template>
