<script setup>
import { defineProps, reactive, ref } from 'vue';
import TaskTitle from './TaskTitle.vue';
import TaskParagraph from './TaskParagraph.vue';
import { RouterLink } from 'vue-router';
import TaskService from '@/services/TaskService';
import router from '@/router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  }
});

const toast = useToast();

console.log(props.tasks);

let tasks = ref(props.tasks);
let task = reactive(props.task);

let isLoading = ref(false);

/**
 * Marks a task as done.
 *
 * This function takes a task and marks it as done by setting its
 * 'is_done' property to true. It then sorts the tasks array so that
 * done tasks are at the bottom of the list.
 *
 * @param {Object} task - The task to mark as done.
 */
const markAsDone = async (task) => {
  isLoading.value = true;
  task.is_done = true;
  await TaskService.updateTask(task).then(() => {
    isLoading.value = false;
    tasks.value.sort((a, b) => a.is_done - b.is_done);
    toast.success("Task marked as done!");
  }).catch(() => {
    task.is_done = false;
    isLoading.value = false;
  });
};

/**
 * Deletes a task from the list of tasks.
 *
 * This function takes a task ID and removes the task with that ID from
 * the list of tasks.
 *
 * @param {Number} taskId The ID of the task to delete.
 * @return {void}
 */
const deleteTask = async (taskId) => {
  isLoading.value = true;
  console.log("deleting task");
  await TaskService.deleteTask(taskId)
  .then(() => {
    isLoading.value = false;
    const index = tasks.value.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
    router.push({ name: "tasks.index" });
    toast.success("Task deleted!");
  }).catch(() => {
    isLoading.value = false;
  });
};

const getTaskPath = (taskId) => {
  return router.resolve({ name: "tasks.show", params: { id: taskId } });
}
</script>

<template>
  <div :class="['p-3', 'border', 'w-100', task.is_done ? 'bg-success' : '']">
    <div class="row justify-content-between" v-if="! isLoading">
      <div class="col-8">
        {{ task.id }}.
        <TaskTitle :content="task.title" />
        <TaskParagraph>
          {{ task.description }}
        </TaskParagraph>
      </div>
      <div class="col-4 text-end row justify-content-end gap-2">
        <button
          :class="['btn', 'btn-success', 'col', task.is_done ? 'disabled' : '']"
          @click="markAsDone(task)"
        >
          Mark as done
        </button>
        <button
          class="btn btn-danger col"
          @click="deleteTask(task.id)"
        >
          Delete
        </button>
        <RouterLink class="btn btn-info" :to="getTaskPath(task.id)">
          Show Details
        </RouterLink>
      </div>
    </div>
    <div class="text-center" v-else>
      <PulseLoader></PulseLoader>
    </div>
  </div>
</template>
