import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { itemFilterState } from "../../atoms/atoms";
import styles from "./tab.module.css";

const Tab = ({ idx, name }) => {
  const [filter, setFilter] = useRecoilState(itemFilterState);

  const clickTabHandler = () => {
    setFilter(name);
  };

  useEffect(() => {
    setFilter("All");
  }, []);

  return (
    <li
      style={
        filter === name ? { zIndex: "20" } : { zIndex: `${idx * -1 + 15}` }
      }
      className={`${styles.container} ${filter === name && styles.selected}`}
    >
      <button type="button" onClick={clickTabHandler} className={styles.button}>
        {name}
      </button>
    </li>
  );
};

export default Tab;
