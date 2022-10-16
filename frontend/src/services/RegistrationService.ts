import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../config/config";
import { UserToRegister } from "../models/User";

class RegistrationService {
  async register(user: UserToRegister) {
    try {
      const resp: AxiosResponse = await axios.post(
        `${API_URL}/registration`,
        user
      );
      return resp;
    } catch (err: any) {
      throw new AxiosError(err);
    }
  }
}
export default new RegistrationService();
