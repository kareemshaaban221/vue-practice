<script setup>
import TaskSection from './TaskSection.vue';
import { ref } from 'vue';
import bootstrapMin from 'bootstrap/dist/js/bootstrap.min';

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  limit: Number
});

const limit = ref(props.limit ?? 0);
const tasks = ref(props.tasks);

console.log(tasks.value);


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

  <TaskSection v-for="task in tasks.splice(0, limit.value || tasks.length)" :key="task.id" :task="task" :tasks="tasks" />
</template>
