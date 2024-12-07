/**
 * @file
 * @module Task
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 *
 * Class for tasks
 */

import Model from "./Model";

class Task extends Model {

  title = "";
  description = "";
  is_done = false;

  constructor(task = null) {
    super();
    if (task) {
      Object.assign(this, task);
    }
  }

}

/**
 * @return the class itself
 * @see TaskService class for example of return an object
 */
export default Task;
