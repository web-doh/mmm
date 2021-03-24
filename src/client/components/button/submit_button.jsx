import React from "react";
import styles from "./submit_button.module.css";

const SubmitButton = ({ text, isSubmitting }) => (
  <button type="submit" className={styles.button} disabled={isSubmitting}>
    {text}
  </button>
);

export default SubmitButton;
