/**
 * @file
 * @module User
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 *
 * Class for user
 */

import Model from "./Model";

class User extends Model {

  id = null;
  name = "";
  email = "";

  constructor(user = null) {
    super();
    if (user) {
      Object.assign(this, user);
    }
  }

}

/**
 * @return the class itself
 */
export default User;
