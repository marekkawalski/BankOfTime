import { API_URL } from '@/config/config';
import { APP_USER } from '@/constants/constants';
import { IAppUser } from '@/models/AppUser';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { IAppUserToUpdate } from '../models/AppUser';
import { AppUserRequestParams } from '../pages/Admin/ManageUsers/types';
import { IAppUserService } from './types';

class AppUserService implements IAppUserService {
  async getAppUserByEmail(email: string): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/clients/${email}`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserById(id: number): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/clients/id/${id}`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async getAppUserAccountBalance(id: number): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(`${API_URL}/clients/${id}/balance`);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  async getAllUsers(
    appUserRequestParams: AppUserRequestParams
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.get(
        `${API_URL}/clients?${this.getUrlString(appUserRequestParams)}`
      );
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async updateAppUser(
    appUser: IAppUserToUpdate
  ): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.put(`${API_URL}/clients/updateClient`, appUser);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async enableAppUser(email: string): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.put(`${API_URL}/clients/enableClient/${email}`, null);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }

  async disableAppUser(email: string): Promise<AxiosResponse<any, any>> {
    try {
      return await axios.put(`${API_URL}/clients/disableClient/${email}`, null);
    } catch (error: any) {
      throw new AxiosError(error);
    }
  }
  getAppUser(): IAppUser {
    return JSON.parse(`${sessionStorage.getItem(APP_USER)}`);
  }

  private getUrlString(appUserRequestParams: AppUserRequestParams): string {
    return "".concat(
      appUserRequestParams?.pageNumUrl ?? "",
      appUserRequestParams?.pageSizeUrl ?? "",
      appUserRequestParams?.sortFieldUrl ?? ""
    );
  }
}

export default new AppUserService();
