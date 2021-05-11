import axios from "axios";
import { loginState } from "../atoms/atoms";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.REACT_APP_DEV_URI;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_PROD_URI;
}
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

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
