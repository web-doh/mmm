import React from "react";
import { ChevronRight } from "react-feather";
import styles from "./link_button.module.css";

const LinkButton = ({ type, name, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {name} <ChevronRight margin-left={16} />
  </button>
);

export default LinkButton;
