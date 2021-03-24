import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/atoms";
import success from "../../../assets/success.png";
import LinkButton from "../../../components/button/link_button";
import styles from "./complete.module.css";
import Introductions from "../../../components/introductions/introductions";
import intro1 from "../../../assets/intro1.png";
import intro2 from "../../../assets/intro2.png";
import intro3 from "../../../assets/intro3.png";
import CircleButton from "../../../components/button/circle_button";

const Complete = (props) => {
  const userInfo = useRecoilValue(userState); // user로 변경할 것
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Create your own materials board.",
      description: "Add with add button.",
      image: intro2,
      isVisible: true,
    },
    {
      id: 2,
      title: "Find a material in your board.",
      description: "Search by keyword.",
      image: intro3,
      isVisible: false,
    },
    {
      id: 3,
      title: "Collect your favorite materials.",
      description: "Add with bookmark button.",
      image: intro1,
      isVisible: false,
    },
  ]);

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
        <img src={success} className={styles.icon} alt="success icon" />
        <h2 className={styles.greeting}>Welcome, username !</h2>
        <Link to="/account/login">
          <LinkButton name="Login & Get Started" />
        </Link>
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
