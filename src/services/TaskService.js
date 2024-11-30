/**
 * @file
 * @module TaskService
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 *
 * Service for tasks, extends BaseService
 * Provides methods for fetching data from the JSON server
 */

import BaseService from "./BaseService";

class TaskService extends BaseService {

  /**
   * @type {Object.<number, string>}
   */
  errorMessages = {
    404: "Task Not Found!",
  };

  /**
   * Fetches all tasks from the API
   *
   * @return {Promise<Object[]>} - a promise resolving to an array of tasks
   */
  async getTasks() {
    let promise = await this.fetch(this.baseUrl + '/tasks');
    return await promise.json();
  }

  /**
   * Fetches a task from the API by its ID
   *
   * @param {number} taskId - the ID of the task to fetch
   * @return {Promise<Object>} - a promise resolving to the task if found, or rejecting with an error otherwise
   */
  async getTask(taskId) {
    let promise = await this.fetch(this.baseUrl + '/tasks/' + taskId);
    return await promise.json();
  }

  /**
   * Stores a task in the API
   *
   * @param {Object} task - the task to store
   * @return {Promise<Object>} - a promise resolving to the created task
   */
  async storeTask(task) {
    let promise = await this.fetch(this.baseUrl + '/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await promise.json();
  }

  /**
   * Deletes a task from the API by its ID
   *
   * @param {number} taskId - the ID of the task to delete
   * @return {Promise<Object>} - a promise resolving to the deleted task, or rejecting with an error if the task was not found
   */
  async deleteTask(taskId) {
    let promise = await this.fetch(this.baseUrl + '/tasks/' + taskId, {
      method: 'DELETE'
    });
    return await promise.json();
  }

  /**
   * Updates a task in the API
   *
   * @param {Object} task - the task to update
   * @return {Promise<Object>} - a promise resolving to the updated task
   */
  async updateTask(task) {
    let promise = await this.fetch(this.baseUrl + '/tasks/' + task.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await promise.json();
  }

}

/**
 * @return an object
 * @see Task model for example of return the class itself
 */
export default new TaskService();
