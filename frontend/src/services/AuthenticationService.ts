import axios from "axios";

const API_URL = "http://localhost:8080";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
class AuthenticationService {
  executeBasicAuthenticationService(username: string, password: string) {
    console.log(username + password);
    return axios.get(`${API_URL}/login`, {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  createBasicAuthToken(username: string, password: string): string {
    return "Basic " + window.btoa(username + ":" + password);
  }
  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  setupAxiosInterceptors(token: string) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        if (config.headers !== undefined) {
          config.headers.authorization = token;
        }
      }
      return config;
    });
  }
  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
}
export default new AuthenticationService();
