<script setup>
import TaskSection from "./TaskSection.vue";
import TaskAddModal from "./TaskAddModal.vue";
import { ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const props = defineProps({
  tasksState: {
    type: Object,
    required: true,
  },
});

let tasks = ref([]);
let isLoading = ref(true);

props.tasksState.then((res) => {
  tasks.value = res.tasks;
  isLoading.value = res.isLoading;
});
</script>

<template>
  <div class="text-center">
    <button
      class="btn btn-primary mb-3"
      data-bs-toggle="modal"
      data-bs-target="#addTaskModal"
    >
      Add Task
    </button>
    <TaskAddModal />
  </div>
  <div class="container d-flex flex-column align-items-center">
    <div v-if="! isLoading">
      <div v-for="task in tasks" :key="task.id">
        <TaskSection :task="task" :tasks="tasks" />
      </div>
    </div>
    <div v-else>
      <PulseLoader></PulseLoader>
    </div>
  </div>
</template>
