import React, { memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthModal from "../../../components/auth_modal/auth_modal";
import Popup from "../../../components/popup/popup";
import SignupForm from "../../../components/signup_form/signupForm";
import styles from "./signup.module.css";

const Signup = ({ authService }) => {
  const history = useHistory();
  const [error, setError] = useState("");

  const clickHandler = () => {
    setError("");
  };

  const popupContents = {
    title: "Signup Error!",
    info: error,
    buttons: [{ id: "cancel", name: "Cancel", clickHandler }],
  };

  const handleRegister = async (userInfo) => {
    const response = await authService.register(userInfo);
    if (response.data.status === "success") {
      history.push({
        pathname: "/account/complete",
        state: { username: userInfo.username },
      });
    } else {
      /*  
      ERROR CODES:
            1: DUPLICATE USERID
      */
      setError("This email has already been signed up.");
    }
  };

  const Content = memo(() => {
    return <SignupForm onRegister={handleRegister} />;
  });

  return (
    <section className={styles.container}>
      <div className={styles.modal}>
        <AuthModal title="Sign up" Content={Content} isPopup={true} />
      </div>
      {error && <Popup contents={popupContents} />}
    </section>
  );
};

export default Signup;
