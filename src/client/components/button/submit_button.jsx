import React, { memo } from "react";
import styles from "./submit_button.module.css";

const SubmitButton = memo(({ text, color, isSubmitting }) => (
  <button
    type="submit"
    className={`${styles.button} ${color && styles[color]}`}
    disabled={isSubmitting}
  >
    {isSubmitting ? <div className={styles.loading}></div> : text}
  </button>
));

export default SubmitButton;
