<script setup>
import { defineProps } from 'vue';

defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h1 class="text-center py-2">{{ content }}</h1>
</template>
