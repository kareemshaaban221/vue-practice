<script setup>
import router from '@/router';
import AuthService from '@/services/AuthService';
import { useToast } from 'vue-toastification';


const logout = async () => {
  await AuthService.logout().then(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push({ name: 'auth.login' });
    useToast().success('Logout successful!');
  });
}
</script>

<template>
  <nav>
    <button @click="logout" class="btn btn-danger">Logout</button>
  </nav>
</template>
