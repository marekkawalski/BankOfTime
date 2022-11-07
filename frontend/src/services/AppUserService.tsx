import axios, { AxiosError } from 'axios';

import { API_URL } from '../config/config';
import { APP_USER, AUTHENTICATION_TOKEN } from '../constants/constants';
import { IAppUser } from '../models/AppUser';
import { IAppUserService } from './types';

class AppUserService implements IAppUserService {
  async getAppUserByEmail(email: string) {
    try {
      return await axios.get(`${API_URL}/clients/${email}`, {
        headers: {
          authorization: sessionStorage.getItem(AUTHENTICATION_TOKEN) ?? "",
        },
      });
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  getAppUser(): IAppUser {
    return JSON.parse(`${sessionStorage.getItem(APP_USER)}`);
  }
}

export default new AppUserService();
