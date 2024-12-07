/**
 * @file
 * @module Auth
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 *
 * Class for auth user
 */

import Model from "./Model";

class Auth extends Model {

  name = "";
  email = "";
  password = "";
  password_confirmation = "";

  constructor(auth = null) {
    super();
    if (auth) {
      Object.assign(this, auth);
    }
  }

}

/**
 * @return the class itself
 */
export default Auth;
