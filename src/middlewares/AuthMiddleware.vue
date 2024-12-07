<script setup>
import router from "@/router";
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  if (! localStorage.getItem('token')) {
    router.push({ name: 'auth.login' });
  }
})
</script>

<template>
  <slot></slot>
</template>
