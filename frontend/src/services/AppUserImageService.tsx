import { API_URL } from '@/config/config';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { IAppUserImageService } from './types';

class AppUserImageService implements IAppUserImageService {
  async getAppUserImage(appUserId: number): Promise<AxiosResponse> {
    try {
      return await axios.get(`${API_URL}/clients/id/${appUserId}/photo`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
}
export default new AppUserImageService();
