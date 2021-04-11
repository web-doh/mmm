import React, { useCallback, useRef, useState } from "react";
import UpButton from "../button/up_button";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
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
          {title && <h1>{title}</h1>}
          {Aside && <Aside />}
        </header>
        <Contents />
        <UpButton />
      </section>
    </div>
  );
};

export default Template;
