import configs from "@/../config/api.json";

class TaskService {

  baseUrl = configs.api.url.trim('/');

  constructor() {
    console.log("about to make a request");
  }

  async getTasks() {
    let promise = await fetch(this.baseUrl + '/tasks');
    return await promise.json();
  }

  async getTask(taskId) {
    let promise = await fetch(this.baseUrl + '/tasks/' + taskId);
    return await promise.json();
  }

  async createTask(task) {
    let promise = await fetch(this.baseUrl + '/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    return await promise.json();
  }

  async deleteTask(taskId) {
    let promise = await fetch(this.baseUrl + '/tasks/' + taskId, {
      method: 'DELETE'
    });
    return await promise.json();
  }

}

export default new TaskService();
