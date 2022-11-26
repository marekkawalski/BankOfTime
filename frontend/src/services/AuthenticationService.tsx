import axios from 'axios';

import { API_URL } from '../config/config';
import { APP_USER, AUTHENTICATION_TOKEN } from '../constants/constants';
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

  isAppUserLoggedIn() {
    return sessionStorage.getItem(APP_USER) ? true : false;
  }

  logout() {
    sessionStorage.clear();
  }
}
export default new AuthenticationService();
