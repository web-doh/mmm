import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "../../../components/login_form/loginForm";
import AuthModal from "../../../components/auth_modal/auth_modal";
import Popup from "../../../components/popup/popup";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useHistory();
  const [error, setError] = useState("");

  const clickHandler = () => {
    setError("");
  };

  const popupContents = {
    title: "Login Error!",
    info: error,
    buttons: [{ id: "cancel", name: "Cancel", clickHandler }],
  };

  const handleLogin = async (userInfo) => {
    const response = await authService.login(userInfo);

    if (response.data.status === "success") {
      const { _id, username, token } = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("_id", _id);
      localStorage.setItem("username", username);

      history.push("/board");
    } else {
      /*  
      ERROR CODES:
            1: NO MATCHING USERID
            2: WRONG PASSWORD
      */

      const errorMessage = "Email address or password do not match.";

      setError(errorMessage);
    }
  };

  const Content = useCallback(() => {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <div className={styles.option}>
          <p>Don't have an account?</p>
          <Link to="/account/signup">
            <p className={styles.link}>Sign up</p>
          </Link>
        </div>
      </>
    );
  });

  return (
    <section className={styles.container}>
      <div className={styles.modal}>
        <AuthModal title="Login" Content={Content} />
      </div>

      {error && <Popup contents={popupContents} />}
    </section>
  );
};

export default Login;
