import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { optionState } from "../../atoms/atoms";
import styles from "./tab.module.css";

const Tab = ({ idx, name }) => {
  const [option, setOption] = useRecoilState(optionState);

  const clickTabHandler = () => {
    setOption((option) => ({ ...option, filter: name }));
  };

  return (
    <li
      style={
        option["filter"] === name
          ? { zIndex: "20" }
          : { zIndex: `${idx * -1 + 15}` }
      }
      className={`${styles.container} ${
        option["filter"] === name && styles.selected
      }`}
    >
      <button type="button" onClick={clickTabHandler} className={styles.button}>
        {name}
      </button>
    </li>
  );
};

export default Tab;
