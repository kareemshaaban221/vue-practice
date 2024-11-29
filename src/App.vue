<script setup>
import HeadingOne from './components/partials/HeadingOne.vue';
import TasksPage from './components/TasksPage.vue';
import data from './tasks.json';

const tasks = data;
</script>

<template>

  <header>
    <HeadingOne content="To-Do App" />
  </header>

  <main>
    <TasksPage :tasks='tasks' />
  </main>

</template>
