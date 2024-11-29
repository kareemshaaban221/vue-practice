<script setup>
import HeadingOne from './components/partials/HeadingOne.vue';
import TasksPage from './components/TasksPage.vue';
import configs from "../config/api.json";
// import data from './tasks.json';

const tasks = await getTasks();

async function getTasks() {
  const response = await fetch(configs.api.url);
  const data = await response.json();
  return data;
}
</script>

<template>

  <header>
    <HeadingOne content="To-Do App" />
  </header>

  <main>
    <TasksPage :tasks='tasks' />
  </main>

</template>
