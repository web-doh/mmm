import React from "react";
import { X } from "react-feather";
import styles from "./cancel_button.module.css";

const CancelButton = (props) => {
  const onCancel = () => {
    history.go(-1);
  };

  return (
    <button type="button" className={styles.xIcon} onClick={onCancel}>
      <X />
    </button>
  );
};

export default CancelButton;
