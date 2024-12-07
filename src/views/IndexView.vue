<script setup>
import HeadingOne from '@/components/partials/HeadingOne.vue';
import TasksPage from '@/components/TasksPage.vue';
import { reactive } from 'vue';
import TaskService from '@/services/TaskService';
import AuthMiddleware from '@/middlewares/AuthMiddleware.vue';

let state = reactive({
  tasks: [],
  isLoading: true,
});

// TODO: this should be in the task container component
// i keep this to practice passing data from one component to another
const getTasksState = async () => {
  try {
    state.tasks = await TaskService.getTasks().then((res) => res.data);
    state.isLoading = false;
    console.log(state.tasks);
    return state;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <AuthMiddleware>
    <header>
      <HeadingOne content="To-Do App" />
    </header>

    <main>
      <TasksPage :tasksState='getTasksState()' />
    </main>
  </AuthMiddleware>
</template>
