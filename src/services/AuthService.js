import BaseService from "./BaseService";
import ApiHelper from "@/helpers/ApiHelper";

class AuthService extends BaseService {

  errorMessages = {
    404: "Not Found!",
    422: "Invalid Credentials!"
  };

  constructor() {
    super();
  }

  async login(auth) {
    const response = await this.fetch(ApiHelper.url('auth/login'), {
      method: 'POST',
      body: JSON.stringify(auth)
    });
    return await response.getJson();
  }

  async logout() {
    this.addAuthenticationHeader = true;
    return await this.fetch(ApiHelper.url('auth/logout'), {
      method: 'POST'
    });
  }

}

export default new AuthService();
