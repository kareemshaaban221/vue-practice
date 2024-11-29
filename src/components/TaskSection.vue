<script setup>
import { defineProps, reactive, ref } from 'vue';
import TaskTitle from './TaskTitle.vue';
import TaskParagraph from './TaskParagraph.vue';
import { RouterLink } from 'vue-router';
import TaskService from '@/services/TaskService';

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

console.log(props.tasks);

let tasks = ref(props.tasks);
let task = reactive(props.task);

/**
 * Marks a task as done.
 *
 * This function takes a task and marks it as done by setting its
 * 'is_done' property to true. It then sorts the tasks array so that
 * done tasks are at the bottom of the list.
 *
 * @param {Object} task - The task to mark as done.
 */
const markAsDone = (task) => {
  task.is_done = true;
  tasks.value.sort((a, b) => a.is_done - b.is_done);
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
  console.log("deleting task");
  await TaskService.deleteTask(taskId).then(() => {
    const index = tasks.value.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
  });
};
</script>

<template>
  <div :class="['p-3', 'border', 'w-100', task.is_done ? 'bg-success' : '']">
    <div class="row justify-content-between">
      <div class="col-8">
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
        <RouterLink class="btn btn-info" :to="`/${task.id}`">
          Show Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
