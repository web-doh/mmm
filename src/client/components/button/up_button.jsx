import React, { memo, useEffect, useState } from "react";
import { ArrowUp } from "react-feather";
import styles from "./up_button.module.css";

const UpButton = memo((props) => {
  const [isShow, setIsShow] = useState(false);
  const checkScrollTop = (e) => {
    if (!isShow && window.scrollY > 400) {
      setIsShow(true);
    } else if (isShow && window.scrollY <= 400) {
      setIsShow(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    return window.addEventListener("scroll", checkScrollTop);
  }, [window.scrollY]);

  return (
    <button
      className={`${styles.button} ${isShow && styles.show}`}
      onClick={scrollTop}
    >
      <ArrowUp />
    </button>
  );
});

export default UpButton;
