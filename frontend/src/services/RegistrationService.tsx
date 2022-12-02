import { API_URL } from '@/config/config';
import { IAppUserToRegister } from '@/models/AppUser';
import axios, { AxiosError } from 'axios';

import { IRegistrationService } from './types';

class RegistrationService implements IRegistrationService {
  async register(user: IAppUserToRegister) {
    try {
      return await axios.post(`${API_URL}/registration`, user);
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
}
export default new RegistrationService();
