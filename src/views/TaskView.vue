<script setup>
import HeadingOne from '@/components/partials/HeadingOne.vue';
import TaskPage from '@/components/TaskPage.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import TaskService from '@/services/TaskService';
import AuthMiddleware from '@/middlewares/AuthMiddleware.vue';
import NavBar from '@/components/NavBar.vue';

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
    state.task = await TaskService.getTask(taskId).then((res) => res.data);
    state.isLoading = false;
    console.log(state.task);
    return state;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <AuthMiddleware>
    <header>
      <HeadingOne content="Task Details" />
      <NavBar></NavBar>
    </header>

    <main>
      <TaskPage :tasksState='getTasksState()' />
    </main>
  </AuthMiddleware>
</template>
