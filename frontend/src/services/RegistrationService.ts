import axios from "axios";
import { UserToRegister } from "../components/models/User";
import { API_URL } from "../config/config";

class RegistrationService {
  async register(user: UserToRegister) {
    try {
      const resp = await axios.post(`${API_URL}/registration`, user);
      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  }
}
export default new RegistrationService();
