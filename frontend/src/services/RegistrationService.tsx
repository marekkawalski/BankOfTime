import { API_URL } from '@/config/config';
import { IAppUserToRegister } from '@/models/AppUser';
import axios, { AxiosError } from 'axios';

import { IRegistrationService } from './types';

class RegistrationService implements IRegistrationService {
  async register(user: IAppUserToRegister, profilePhoto: any, coverPhoto: any) {
    try {
      return await axios.post(`${API_URL}/registration`, {
        request: user,
        profilePhoto,
        coverPhoto,
      });
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
}
export default new RegistrationService();
