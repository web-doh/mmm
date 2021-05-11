import React, { memo } from "react";
import { Plus } from "react-feather";
import styles from "./add-button.module.css";

const AddButton = memo(({ onClickHandler }) => (
  <button type="button" className={styles.button} onClick={onClickHandler}>
    <Plus />
    <p className={styles.content}>Add Materials</p>
  </button>
));

export default AddButton;
