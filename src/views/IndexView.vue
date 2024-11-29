<script setup>
import HeadingOne from '@/components/partials/HeadingOne.vue';
import TasksPage from '@/components/TasksPage.vue';
import configs from "@/../config/api.json";
// import data from '@/tasks.json';
import { reactive } from 'vue';

let state = reactive({
  tasks: [],
  isLoading: true,
});
// const tasks = await getTasks();

// async function getTasks() {
//   const response = await fetch(configs.api.url);
//   const data = await response.json();
//   return data;
// }

// TODO: this should be in the task container component
// i keep this to practice passing data from one component to another
const getTasksState = async () => {
  try {
    const response = await fetch(configs.api.url + '/tasks');
    state.tasks = await response.json();
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
    <HeadingOne content="To-Do App" />
  </header>

  <main>
    <TasksPage :tasksState='getTasksState()' />
  </main>

</template>
