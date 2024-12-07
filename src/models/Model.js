/**
 * @file
 * @module Model
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 *
 * Class for model
 */

class Model {

  /**
   * @note we cannot assign data to 'this' object here
   * because the defaults in the child class will override
   * this object.
   */

  serialize() {
    return JSON.stringify(this);
  }

  static unserialize(data) {
    return new this(JSON.parse(data));
  }

}

/**
 * @return the class itself
 */
export default Model;
