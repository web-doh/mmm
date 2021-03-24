import React from "react";
import styles from "./popup.module.css";

const Popup = ({ contents: { title, info, buttons, clickHandler } }) => {
  return (
    <section className={styles.container}>
      <div className={styles.window}>
        <p className={styles.title}>{title}</p>
        <span className={styles.info}>{info}</span>
        <div className={styles.buttons}>
          {buttons.map((button) => (
            <button
              type="button"
              key={button.id}
              className={styles.button}
              onClick={button.clickHandler}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popup;
