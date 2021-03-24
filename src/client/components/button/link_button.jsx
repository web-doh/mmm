import React from "react";
import { ChevronRight } from "react-feather";
import styles from "./link_button.module.css";

const LinkButton = ({ type, name }) => (
  <button className={styles.button}>
    {name} <ChevronRight margin-left={16} />
  </button>
);

export default LinkButton;
