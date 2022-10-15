import axios, { AxiosResponse } from "axios";
import { UserToRegister } from "../components/models/User";
import { API_URL } from "../config/config";

class RegistrationService {
  async register(user: UserToRegister) {
    try {
      const resp: AxiosResponse = await axios.post(
        `${API_URL}/registration`,
        user
      );
      console.log(resp.data);
      return resp;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
export default new RegistrationService();
