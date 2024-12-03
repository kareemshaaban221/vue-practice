<script setup>

const props = defineProps({
  title: {
    type: String,
    required: false, // or undefined
  },
});

</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="card col-10 bg-transparent text-light border-light">
      <div class="card-body">
        <div class="card-title">
          <h2>{{ title }}</h2>
        </div>
      </div>
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
