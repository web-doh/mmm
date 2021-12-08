import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./complete.module.css";
import success from "../../../assets/success.png";
import intro1 from "../../../assets/intro1.png";
import intro2 from "../../../assets/intro2.png";
import intro3 from "../../../assets/intro3.png";
import successWebp from "../../../assets/success.webp";
import intro1Webp from "../../../assets/intro1.webp";
import intro2Webp from "../../../assets/intro2.webp";
import intro3Webp from "../../../assets/intro3.webp";

import CircleButton from "../../../components/button/circle_button";
import LinkButton from "../../../components/button/link_button";
import Introductions from "../../../components/introductions/introductions";
import ImgWithFallback from "../../../components/img_with_fallback/img_with_fallback";

const Complete = () => {
  const history = useHistory();
  const username = useLocation().state ? useLocation().state.username : "";
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Create your own materials board.",
      description: "Add with add button.",
      image: intro2,
      imageWebp: intro2Webp,
      isVisible: true,
    },
    {
      id: 2,
      title: "Find a material in your board.",
      description: "Search by keyword.",
      image: intro3,
      imageWebp: intro3Webp,
      isVisible: false,
    },
    {
      id: 3,
      title: "Collect your favorite materials.",
      description: "Add with bookmark button.",
      image: intro1,
      imageWebp: intro1Webp,
      isVisible: false,
    },
  ]);

  useEffect(() => {
    if (!username) {
      history.push("/");
    }
  }, [username]);

  const clickHandler = (idx) => {
    setContents((contents) =>
      contents.map((content, i) => {
        if (i === idx) {
          return { ...content, isVisible: true };
        } else {
          return { ...content, isVisible: false };
        }
      })
    );
  };

  return (
    <div className={styles.containers}>
      <section className={`${styles.container} ${styles.left}`}>
        <h1 className={styles.name}>MMM</h1>
        <ImgWithFallback
          src={successWebp}
          fallback={success}
          className={styles.icon}
          alt="success icon"
        />
        <h2 className={styles.greeting}>Welcome, {username}!</h2>
        <LinkButton name="Login & Get Started" to="/account/login" />
      </section>
      <section className={`${styles.container} ${styles.right}`}>
        <section className={styles.contents}>
          <h2 className={styles.title}>Introductions</h2>
          <Introductions contents={contents} />
          <ul className={styles.buttons}>
            {contents.map((content, idx) => (
              <CircleButton
                key={content.id}
                idx={idx}
                isClicked={content.isVisible}
                clickHandler={clickHandler}
              />
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Complete;
