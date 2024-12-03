import configs from "@/../config/api";

class ApiHelper {
  static baseUrl = configs.api.url;
  static version = configs.api.version;
  static prefix = configs.api.prefix;

  /**
   * Returns a full API URL for a given path.
   *
   * @param {string} path - The path for which to generate the URL.
   * @returns {string} The full API URL for the given path.
   */
  static url(path) {
    return `${this.baseUrl}/${this.prefix}/${this.version}/${path}`;
  }
}

export default ApiHelper;
