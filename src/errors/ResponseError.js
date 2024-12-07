/**
 * @file
 * @module ResponseError
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 */

import Response from "@/http/Response";

class ResponseError extends Error {

  /**
   * @type {Response}
   */
  response = new Response(null);

  constructor(response) {
    super("Response Error");
    this.response = response;
  }

}

export default ResponseError;
