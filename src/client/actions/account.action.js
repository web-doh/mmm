import axios from "axios";
import { loginState } from "../atoms/atoms";
import history from "../lib/history";

/* Register */
export const requestRegister = async (userInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_PROD_URI}/account/signup`,
      userInfo
    );

    return response;
  } catch (err) {
    return err.response || err;
  }
};

/* Login */
export const requestLogin = async (userInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_PROD_URI}/account/login`,
      userInfo
    );

    const {
      user: { _id, userId, username, itemList },
      token,
    } = response.data;

    localStorage.setItem("token", token);

    return response;
  } catch (err) {
    return err.response || err;
  }
};

/* Logout */
export const logout = () => {
  localStorage.removeItem("token");
  // history.push("/");
};
