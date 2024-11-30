<script setup>
import Task from "@/models/Task";
import router from "@/router";
import TaskService from "@/services/TaskService";
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";
import { reactive } from "vue";
import { useToast } from "vue-toastification";

const form = reactive(new Task());

const toast = useToast();

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
  TaskService.storeTask(form).then(() => {
    console.log("task added");
    // todo: how to reload the page?
    // router.go(0); // ? this reloads the page which not good
    router.push({ name: "tasks.index" });
    toast.success("Task added!");
  });
  resetAddTaskModal();
  closeAddTaskModal();
};

/**
 * Close the add task modal.
 * @return {void}
 */
const closeAddTaskModal = () => {
  const addTaskModal = document.getElementById("addTaskModal");
  const modal = bootstrapMin.Modal.getInstance(addTaskModal);
  modal.hide();
};

/**
 * Resets the add task modal input fields to empty strings.
 * This function targets the 'title' and 'description' elements
 * within the modal and clears their values.
 */
const resetAddTaskModal = () => {
  form.title = "";
  form.description = "";
};
</script>

<template>
  <div class="modal fade text-dark text-start" id="addTaskModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="addTask">
          <div class="modal-body">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="form.title" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="form.description"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
