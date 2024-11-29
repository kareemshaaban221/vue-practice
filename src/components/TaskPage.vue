<script setup>
import TaskSection from "./TaskSection.vue";
import { ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const props = defineProps({
  tasksState: {
    type: Object,
    required: true,
  },
});

let task = ref({});
let tasks = ref([]);
let isLoading = ref(true);

props.tasksState.then((res) => {
  tasks.value = res.tasks;
  task.value = res.task;
  isLoading.value = res.isLoading;
});
</script>

<template>
  <div class="container d-flex flex-column align-items-center">
    <div v-if="! isLoading">
      <TaskSection :task="task" :tasks="tasks" />
    </div>
    <div v-else>
      <PulseLoader></PulseLoader>
    </div>
  </div>
</template>
