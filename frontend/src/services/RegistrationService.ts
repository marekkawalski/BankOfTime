import axios, { AxiosError, AxiosResponse } from "axios";
import { UserToRegister } from "../components/models/User";
import { API_URL } from "../config/config";

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
