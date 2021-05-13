import React from "react";
import { useRecoilValue } from "recoil";
import { sortOptionState } from "../../atoms/atoms";
import styles from "./sort-option.module.css";

const SortOption = ({ method, name, selectOption }) => {
  const option = useRecoilValue(sortOptionState);
  const onClickHandler = () => {
    selectOption(method);
  };

  return (
    <li className={styles.container}>
      <button
        className={`${styles.name} ${option === method && styles.selected}`}
        id={method}
        onClick={onClickHandler}
      >
        {name}
      </button>
    </li>
  );
};

export default SortOption;
