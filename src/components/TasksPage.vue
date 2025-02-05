<script setup>
import TaskSection from './TaskSection.vue';
import TaskParagraph from './TaskParagraph.vue';
import TaskTitle from './TaskTitle.vue';
import { ref } from 'vue';
import bootstrapMin from 'bootstrap/dist/js/bootstrap.min';

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

const tasks = ref(props.tasks);

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
const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
}

/**
 * Adds a task to the list of tasks.
 *
 * This function takes the current value from the 'title' and 'description'
 * input fields and creates a new task object with it. The new task is then
 * added to the list of tasks and the modal is closed and reset.
 *
 * @return {void}
 */
const addTask = () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  tasks.value.unshift({
    id: tasks.value.length + 1,
    title: title,
    description: description,
    is_done: false
  });
  closeAddTaskModal();
  resetAddTaskModal();
}

/**
 * Close the add task modal.
 * @return {void}
 */
const closeAddTaskModal = () => {
  const addTaskModal = document.getElementById('addTaskModal');
  const modal = bootstrapMin.Modal.getInstance(addTaskModal);
  modal.hide();
}

/**
 * Resets the add task modal input fields to empty strings.
 * This function targets the 'title' and 'description' elements
 * within the modal and clears their values.
 */
const resetAddTaskModal = () => {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

</script>

<template>
  <div class="text-center">
    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addTaskModal">Add Task</button>
    <div class="modal fade text-dark text-start" id="addTaskModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="addTask">
            <div class="modal-body">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" id="title">
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" rows="3"></textarea>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="container d-flex flex-column align-items-center" v-for="task in tasks" :key="task.id">
    <TaskSection :is_done="task.is_done">
      <div class="row justify-content-between">
        <div class="col-8">
          <TaskTitle :content="task.title" />
          <TaskParagraph>
            {{ task.description }}
          </TaskParagraph>
        </div>
        <div class="col-4 text-end row justify-content-end gap-2">
          <button class="btn btn-success col" :class="{ 'disabled': task.is_done }" @click="markAsDone(task)">Mark as done</button>
          <button class="btn btn-danger col" @click="deleteTask(task.id)">Delete</button>
        </div>
      </div>
    </TaskSection>
  </div>
</template>
