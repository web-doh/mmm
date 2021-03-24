import React from "react";
import CancelButton from "../button/cancel_button";
import styles from "./modal.module.css";

const Modal = ({ title, Content }) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <CancelButton />
      </header>
      <Content />
    </section>
  );
};

export default Modal;
