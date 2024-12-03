/**
 * BaseService.js
 *
 * Base class for all services in the application.
 * Provides default values for the base URL of the API and a toast notification
 * service.
 *
 * @file
 * @module BaseService
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 */

import configs from "@/../config/api";
import { useToast } from 'vue-toastification';

class BaseService {

  /**
   * @type {string}
   */
  baseUrl = configs.api.url.trim('/');

  /**
   * @type {Object.<number, string>}
   */
  errorMessages = {
    404: "Not Found!",
  };

  unknownMessage = "Something went wrong!";

  /**
   * BaseService constructor
   * Initializes a new instance of the BaseService class.
   */
  constructor() {
    console.log("about to make a request");
  }

  /**
   * Performs a fetch request to the provided URL, with optional options
   * If the request is not successful (status code not between 200 and 299),
   * throws an error with the response text as the error message
   *
   * @param {string} url - the URL to make the request to
   * @param {Object} [options] - the options to pass to the fetch request
   * @return {Promise} - a promise resolving to the response object if the request was successful
   */
  async fetch(url, options = null) {
    let args = [url];
    if (options) args.push(this.adjustRequestHeaders(options));
    return await fetch(...args)
      .then(this.thenHandle.bind(this))
      .catch(this.errorHandle.bind(this));
  }

  /**
   * Adjusts the request headers to specify that JSON data should be sent
   * and received.
   *
   * @param {Object} options - the options to pass to the fetch request
   * @return {Object} - the options with the adjusted headers
   */
  adjustRequestHeaders(options) {
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
    options.headers['Accept'] = 'application/json';
    return options;
  }

  /**
   * @description
   * If the response is not "ok" (status code not between 200 and 299),
   * throws an error with the response text as the error message
   * @param {Response} response - the response object
   * @return {Promise} - a promise resolving to the response object if the request was successful
   * @throws {Error} - if the response is not "ok"
   */
  thenHandle(response) {
    // > Note: don't read the stream twice
    // > Read the stream only one time or js will throw an error
    if (!response.ok) {
      // Here I was trying to read the stream twice using response.text();
      // that's wrong: we should read the stream only one time from the service using
      // response.json().
      let error = new Error(/*response.text()*/);
      error.response = response;
      throw error;
    }
    return response;
  }

  /**
   * Handles errors by logging them and displaying a toast notification if the error status
   * code exists in the predefined error messages.
   *
   * @param {Error} error - The error object, expected to contain a response with a status code.
   */
  errorHandle(error) {
    const status = error.response.status;
    if (Object.prototype.hasOwnProperty.call(this.errorMessages, status)) {
      useToast().error(this.errorMessages[status]);
    } else {
      useToast().error(this.unknownMessage);
    }
    // That's correct if I read the stream on the thenHandler
    // Now thenHandler just return the response with the error and i handle the toast here
    // and return the response again to the caller service to read the stream
    // OLD:> error.response.json = () => { return error.response.data; };
    return error.response;
  }

}

export default BaseService;
