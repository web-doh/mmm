import React, { memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { requestRegister } from "../../../actions/account.action";
import Modal from "../../../components/modal/modal";
import Popup from "../../../components/popup/popup";
import SignupForm from "../../../components/signup_form/signupForm";
import styles from "./signup.module.css";

const Signup = (props) => {
  const history = useHistory();
  const [error, setError] = useState("");

  const popupContents = {
    title: "Duplicate Id",
    info: error,
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: () => setError("") },
    ],
  };

  const clickHandler = () => {
    setError("");
  };

  const handleRegister = async (userInfo) => {
    const response = await requestRegister(userInfo);
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
      <Modal title="Sign up" Content={Content} />
      {error && <Popup contents={popupContents} />}
    </section>
  );
};

export default Signup;
