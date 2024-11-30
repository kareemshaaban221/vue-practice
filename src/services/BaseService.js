import configs from "@/../config/api.json";
import { useToast } from 'vue-toastification';

class BaseService {

  baseUrl = configs.api.url.trim('/');

  constructor() {
    console.log("about to make a request");
  }

  async fetch(url, options = null) {
    let args = [url];
    if (options) args.push(options);
    return await fetch(...args)
      .then(this.thenHandle)
      .catch(this.errorHandle);
  }

  thenHandle(response) {
    if (!response.ok) {
      let error = new Error(response.text());
      error.response = response;
      throw error;
    }
    return response;
  }

  errorHandle(error) {
    console.log(error);
    if (error.response.status == 404) {
      useToast().error("Task Not Found!");
    }
  }

}

export default BaseService;
