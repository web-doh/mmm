import React from "react";
import styles from "./submit_button.module.css";

const SubmitButton = ({ text, color, isSubmitting }) => (
  <button
    type="submit"
    className={`${styles.button} ${color && styles[color]}`}
    disabled={isSubmitting}
  >
    {text}
  </button>
);

export default SubmitButton;
