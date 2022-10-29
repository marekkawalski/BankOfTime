import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../config/config";
import { IAppUserToRegister } from "../models/AppUser";

class RegistrationService {
  async register(user: IAppUserToRegister) {
    try {
      return await axios.post(`${API_URL}/registration`, user);
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
}
export default new RegistrationService();
