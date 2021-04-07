import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import logo from "../../assets/logo.png";
import LinkButton from "../../components/button/link_button";
import IntroCards from "../../components/intro_cards/intro_cards";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/atoms";

const Home = (props) => {
  const [loginUser, setLoginUser] = useRecoilState(userState);

  return (
    <div className={styles.containers}>
      <section className={`${styles.container} ${styles.left}`}>
        <img src={logo} className={styles.logo} alt="mmm logo" />
        <h3 className={styles.title}>
          <b>M</b>y <b>M</b>aterials <b>M</b>anager
        </h3>
        <div className={styles.button}>
          {/**link to board - protected router : redirect */}
          <LinkButton name="Get Started" to="/account/login" />
        </div>
      </section>
      <section className={`${styles.container} ${styles.right}`}>
        <IntroCards />
      </section>
    </div>
  );
};

export default Home;
