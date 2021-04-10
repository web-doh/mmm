import React, { memo } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import styles from "./link_button.module.css";

const LinkButton = memo(({ name, to, from }) => (
  <Link to={to}>
    {from === "notFound" ? (
      <button className={styles.button}>
        <ChevronLeft margin-left={16} /> {name}
      </button>
    ) : (
      <button className={styles.button}>
        {name} <ChevronRight margin-left={16} />
      </button>
    )}
  </Link>
));

export default LinkButton;
