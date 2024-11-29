<script setup>
import { defineProps } from 'vue';

defineProps({
  is_done: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div :class="['p-3', 'border', 'rounded', 'w-100', is_done ? 'bg-success' : '']">
    <slot></slot>
  </div>
</template>
