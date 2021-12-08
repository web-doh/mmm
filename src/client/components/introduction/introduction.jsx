import React from "react";
import styles from "./introduction.module.css";
import ImgWithFallback from "../img_with_fallback/img_with_fallback";

const Introduction = ({
  contents: { id, title, description, image, imageWebp, isVisible },
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
      <ImgWithFallback
        src={imageWebp}
        fallback={image}
        className={styles.image}
        alt="introductions image"
      />
    </li>
  );
};

export default Introduction;
