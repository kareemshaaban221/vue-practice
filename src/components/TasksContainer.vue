<script setup>
import TaskSection from './TaskSection.vue';
import TaskParagraph from './TaskParagraph.vue';
import { ref } from 'vue';

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

const tasks = ref(props.tasks);

const markAsDone = (task) => {
  task.is_done = true;
  tasks.value.sort((a, b) => a.is_done - b.is_done);
};

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
}

const addTask = () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  tasks.value.push({
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
  const modal = bootstrap.Modal.getInstance(addTaskModal);
  modal.hide();
}

const resetAddTaskModal = () => {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

</script>

<template>
  <div class="text-center">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModal">Add Task</button>
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
          <h4>{{ task.title }}</h4>
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
