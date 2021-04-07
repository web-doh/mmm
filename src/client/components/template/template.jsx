import React from "react";
import Header from "../header/header";
import styles from "./template.module.css";

const Template = ({ title, Contents, Aside }) => {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.body}>
        <header>
          <h1>{title}</h1>
          <Aside />
        </header>
        <Contents />
      </section>
    </div>
  );
};

export default Template;
