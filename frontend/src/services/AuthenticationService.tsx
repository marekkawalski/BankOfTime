import axios from 'axios';

import { API_URL } from '../config/config';
import { APP_USER, APP_USER_NAME_SESSION_ATTRIBUTE_NAME, AUTHENTICATION_TOKEN } from '../constants/constants';
import { IAuthenticationService } from './types';

class AuthenticationService implements IAuthenticationService {
  async executeBasicAuthenticationService(email: string, password: string) {
    try {
      const resp = await axios.get(`${API_URL}/login/${email}`, {
        headers: {
          authorization: this.createBasicAuthToken(email, password),
        },
      });
      sessionStorage.setItem(APP_USER, JSON.stringify(resp.data));
      return resp;
    } catch (e: any) {
      console.log(e);
      throw new Error("Login failed");
    }
  }

  createBasicAuthToken(email: string, password: string): string {
    const token = "Basic " + window.btoa(email + ":" + password);
    sessionStorage.setItem(AUTHENTICATION_TOKEN, token);
    return token;
  }
  registerSuccessfulLogin(email: string, password: string) {
    sessionStorage.setItem(APP_USER_NAME_SESSION_ATTRIBUTE_NAME, email);
    this.setupAxiosInterceptors(this.createBasicAuthToken(email, password));
  }
  isAppUserLoggedIn() {
    let user = sessionStorage.getItem(APP_USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  setupAxiosInterceptors(token: string | null) {
    axios.interceptors.request.use((config) => {
      if (this.isAppUserLoggedIn() && token != null) {
        if (config.headers !== undefined) {
          config.headers.authorization = token;
        }
      }
      return config;
    });
  }
  logout() {
    sessionStorage.removeItem(APP_USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(AUTHENTICATION_TOKEN);
  }
  logoutAndNavigateToLogin() {
    sessionStorage.removeItem(APP_USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
}
export default new AuthenticationService();
