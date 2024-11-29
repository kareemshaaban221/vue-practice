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
  <h4>{{ content }}</h4>
</template>
