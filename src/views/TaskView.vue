<script setup>
import HeadingOne from '@/components/partials/HeadingOne.vue';
import TaskPage from '@/components/TaskPage.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import TaskService from '@/services/TaskService';

let state = reactive({
  task: {},
  tasks: [],
  isLoading: true,
});

const taskId = useRoute().params.id;

// TODO: this should be in the task container component
// i keep this to practice passing data from one component to another
const getTasksState = async () => {
  try {
    state.tasks = await TaskService.getTasks();
    state.task = state.tasks.filter((task) => task.id == taskId)[0];
    state.isLoading = false;
    console.log(state.tasks);
    return state;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>

  <header>
    <HeadingOne content="Task Details" />
  </header>

  <main>
    <TaskPage :tasksState='getTasksState()' />
  </main>

</template>
