import React, { useState } from "react";
import { ChevronRight } from "react-feather";
import styles from "./intro_card.module.css";

const IntroCard = ({ contents: { description, color, image } }) => {
  return (
    <li
      className={
        description
          ? `${styles.item} ${styles.content}`
          : `${styles.item} ${styles.noContent}`
      }
    >
      <div className={styles.flipper}>
        {description ? (
          <div className={`${styles.front} ${styles[color]}`}>
            <h4>{description}</h4>
          </div>
        ) : (
          <div className={`${styles.blank} ${styles[color]}`}></div>
        )}
        {image ? (
          <div
            className={styles.back}
            style={{ background: `center/cover no-repeat url(${image})` }}
          ></div>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default IntroCard;
