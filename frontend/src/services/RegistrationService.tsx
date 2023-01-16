import { API_URL } from '@/config/config';
import axios, { AxiosError } from 'axios';

import { IRegistrationService } from './types';

class RegistrationService implements IRegistrationService {
  async register(formData: any) {
    try {
      return await axios.post(`${API_URL}/registration`, formData);
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
}
export default new RegistrationService();
