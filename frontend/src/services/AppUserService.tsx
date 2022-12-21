import { API_URL } from '@/config/config';
import { APP_USER } from '@/constants/constants';
import { IAppUser } from '@/models/AppUser';
import axios, { AxiosError } from 'axios';

import { IAppUserService } from './types';

class AppUserService implements IAppUserService {
  async getAppUserByEmail(email: string) {
    try {
      return await axios.get(`${API_URL}/clients/${email}`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserById(id: number) {
    try {
      return await axios.get(`${API_URL}/clients/id/${id}`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  getAppUser(): IAppUser {
    return JSON.parse(`${sessionStorage.getItem(APP_USER)}`);
  }
}

export default new AppUserService();
