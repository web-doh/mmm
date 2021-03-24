import React from "react";
import { Circle } from "react-feather";
import styles from "./circle_button.module.css";

const CircleButton = ({ idx, isClicked, clickHandler }) => {
  const onButtonClick = () => {
    clickHandler(idx);
  };
  return (
    <li>
      <button
        type="button"
        className={
          isClicked ? `${styles.clicked} ${styles.button}` : styles.button
        }
        onClick={onButtonClick}
      >
        <Circle />
      </button>
    </li>
  );
};
export default CircleButton;
