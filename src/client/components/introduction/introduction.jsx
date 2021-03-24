import React, { useState } from "react";
import styles from "./introduction.module.css";

const Introduction = ({
  contents: { id, title, description, image, isVisible },
}) => {
  return (
    <li className={isVisible ? undefined : styles.invisible}>
      <header className={styles.header}>
        <h3 className={styles.number}>{id}</h3>
        <div className={styles.text}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </header>
      <img src={image} className={styles.image} alt="introductions image" />
    </li>
  );
};

export default Introduction;
