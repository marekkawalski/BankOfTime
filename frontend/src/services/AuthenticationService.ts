import axios, { AxiosError, AxiosResponse } from "axios";
import {
  API_URL,
  AUTHENTICATION_TOKEN as USER_AUTHENTICATION_TOKEN,
  USER_NAME_SESSION_ATTRIBUTE_NAME,
  USER_ROLE,
} from "../config/config";

class AuthenticationService {
  async executeBasicAuthenticationService(username: string, password: string) {
    try {
      const resp = await axios.get(`${API_URL}/login/${username}`, {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      });
      sessionStorage.setItem(USER_ROLE, resp.data);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw new Error("Login failed");
    }
  }

  createBasicAuthToken(username: string, password: string): string {
    const token = "Basic " + window.btoa(username + ":" + password);
    sessionStorage.setItem(USER_AUTHENTICATION_TOKEN, token);
    return token;
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

  setupAxiosInterceptors(token: string | null) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn() && token != null) {
        if (config.headers !== undefined) {
          config.headers.authorization = token;
        }
      }
      return config;
    });
  }
  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(USER_AUTHENTICATION_TOKEN);
  }
  logoutAndNavigateToLogin() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
  getUserRole() {
    return sessionStorage.getItem(USER_ROLE);
  }
}
export default new AuthenticationService();
