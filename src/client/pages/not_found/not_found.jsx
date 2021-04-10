import React, { memo } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../../components/button/link_button";
import logo from "../../assets/mini_logo.png";
import styles from "./not_found.module.css";

const NotFound = memo(() => {
  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <header>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>
        </header>
        <div className={styles.contents}>
          <h2>Sorry, page not found ;(</h2>
          <LinkButton name="Go back home" to="/home" from="notFound" />
        </div>
      </section>
    </div>
  );
});

export default NotFound;
