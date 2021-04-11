import axios from "axios";
import { loginState } from "../atoms/atoms";

axios.defaults.baseURL = "https://my-materials-manager.herokuapp.com";

/* Register */
export default class AuthService {
  register = async (userInfo) => {
    try {
      const response = await axios.post(`/api/account/signup`, userInfo);

      return response;
    } catch (err) {
      return err.response || err;
    }
  };

  /* Login */
  login = async (userInfo) => {
    try {
      const response = await axios.post(`/api/account/login`, userInfo);

      return response;
    } catch (err) {
      return err.response || err;
    }
  };

  /* Logout */
  logout = () => {
    localStorage.clear();
  };
}
