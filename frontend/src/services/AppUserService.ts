import axios, { AxiosError } from "axios";
import { API_URL } from "../config/config";
import { AUTHENTICATION_TOKEN, APP_USER } from "../constants/constants";
import { IAppUser } from "../models/AppUser";

class AppUserService {
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
