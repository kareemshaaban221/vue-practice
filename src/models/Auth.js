/**
 * @file
 * @module Auth
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 *
 * Class for auth user
 */

class Auth {

  email = "";
  password = "";

  constructor(auth = null) {
    if (auth) {
      Object.assign(this, auth);
    }
  }

}

/**
 * @return the class itself
 */
export default Auth;
