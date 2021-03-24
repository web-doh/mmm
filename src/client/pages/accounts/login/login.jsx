import React, { memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { requestLogin } from "../../../actions/account.action";
import { userState } from "../../../atoms/atoms";
import LoginForm from "../../../components/login_form/loginForm";
import Modal from "../../../components/modal/modal";
import Popup from "../../../components/popup/popup";
import styles from "./login.module.css";

const Login = (props) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loginUser, setLoginUser] = useRecoilState(userState);

  const popupContents = {
    title: "Login Error!",
    info: error,
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: () => setError("") },
    ],
  };

  const clickHandler = () => {
    setError("");
  };

  const handleLogin = async (userInfo) => {
    const response = await requestLogin(userInfo);

    if (response.data.status === "success") {
      const { _id, username } = response.data.user;

      history.push("/"); //board로 수정할것
      setLoginUser({ _id, username, isAuthenticated: true });
    } else {
      const errorCode = response.data.code - 1;

      /*  
      ERROR CODES:
            1: NO MATCHING USERID
            2: WRONG PASSWORD
      */

      let errorMessage = [
        `It is not a registered email. Please check your email address.`,
        `The password is incorrect. Please try again.`,
      ];

      setError(errorMessage[errorCode]);
    }
  };

  const Content = memo(() => {
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
      <Modal title="Login" Content={Content} />
      {error && <Popup contents={popupContents} />}
    </section>
  );
};

export default Login;
