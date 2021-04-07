import React from "react";
import { ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import styles from "./link_button.module.css";

const LinkButton = ({ name, to }) => (
  <Link to={to}>
    <button className={styles.button}>
      {name}
      {!to.includes("board") ? <ChevronRight margin-left={16} /> : ""}
    </button>
  </Link>
);

export default LinkButton;
