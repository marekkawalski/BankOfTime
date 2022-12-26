import { API_URL } from '@/config/config';
import { CategoryToCreate } from '@/models/Category';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ICategoryService } from './types';

class CategoryService implements ICategoryService {
  async getAllCategories(): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/categories`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async addCategory(
    category: CategoryToCreate
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.post(`${API_URL}/categories`, category);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
}

export default new CategoryService();
