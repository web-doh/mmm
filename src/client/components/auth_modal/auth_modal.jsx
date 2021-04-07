import React from "react";
import CancelButton from "../button/cancel_button";
import styles from "./auth_modal.module.css";

const AuthModal = ({ Content, title, isPopup }) => (
  <section className={styles.container}>
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <CancelButton isPopup={isPopup} />
    </header>
    <Content />
  </section>
);
export default AuthModal;
