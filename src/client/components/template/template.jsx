import React, { useCallback, useState } from "react";
import Header from "../header/header";
import Navbar from "../navBar/navbar";
import styles from "./template.module.css";

const Template = ({ Aside, Contents, title, logoutHandler }) => {
  const [menu, setMenu] = useState(false);

  const menuOpenHandler = useCallback((isOpen) => {
    setMenu(isOpen);
  }, []);

  return (
    <div className={styles.container}>
      <Header onOpenHandler={menuOpenHandler} />
      <Navbar
        isOpen={menu}
        onOpenHandler={menuOpenHandler}
        logoutHandler={logoutHandler}
      />
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
