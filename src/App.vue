<script setup>
import HeadingOne from './components/partials/HeadingOne.vue';
import TasksContainer from './components/TasksContainer.vue';
import data from './tasks.json';

const tasks = data;
</script>

<template>

  <header>
    <HeadingOne content="To-Do App" />
  </header>

  <main>
    <TasksContainer :tasks='tasks' />
  </main>

</template>
