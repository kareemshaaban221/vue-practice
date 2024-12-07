/**
 * @file
 * @module Response
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 */

class Response {

  response = null;

  /**
   * Constructs a new Response object.
   *
   * @param {Response} response - The response object to be wrapped.
   */
  constructor(response) {
    this.response = response;
  }

  /**
   * Gets the response as a JSON object.
   *
   * @returns {Promise<Object>} - The response as a JSON object.
   */
  getJson() {
    return this.response.json();
  }

  /**
   * Gets the response as a plain text.
   *
   * @returns {Promise<string>} - The response as a plain text.
   */
  getText() {
    return this.response.text();
  }

  /**
   * Gets the status of the response.
   *
   * @returns {number} - The status of the response.
   */
  getStatus() {
    return this.response.status;
  }

  /**
   * Checks if the response status is within the range of 200 to 299.
   *
   * @returns {boolean} - True if the response is "ok", false otherwise.
   */
  isOk() {
    return this.response.ok;
  }

}

/**
 * @return {Response}
 */
export default Response;
