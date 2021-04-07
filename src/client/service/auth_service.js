import axios from "axios";
import { loginState } from "../atoms/atoms";

/* Register */
export default class AuthService {
  register = async (userInfo) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PROD_URI}/api/account/signup`,
        userInfo
      );

      return response;
    } catch (err) {
      return err.response || err;
    }
  };

  /* Login */
  login = async (userInfo) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PROD_URI}/api/account/login`,
        userInfo
      );

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
