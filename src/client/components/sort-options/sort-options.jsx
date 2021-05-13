import React, { useState } from "react";
import { ChevronDown } from "react-feather";
import { useRecoilState } from "recoil";
import { sortOptionState } from "../../atoms/atoms";
import SortOption from "../sort-option/sort-option";
import styles from "./sort-options.module.css";

const SortOptions = () => {
  const [option, setOption] = useRecoilState(sortOptionState);
  const [isOpen, setIsOpen] = useState(false);
  const options = {
    "date-reverse": "Date : New to Old",
    "date-sort": "Date : Old to New",
    // "price-reverse": "Price : Low to High",
    // "price-sort": "Price : High to Low",
  };

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.current}>
        <span
          className={`${styles.current__name} ${isOpen && styles.selected}`}
        >
          {options[option]}
        </span>
        <button
          className={`${styles.button} ${isOpen && styles.button__flip}`}
          onClick={onClickHandler}
        >
          <ChevronDown />
        </button>
      </div>
      <ul className={`${styles.options} ${isOpen && styles.open}`}>
        {Object.keys(options).map((option) => (
          <SortOption
            key={option}
            method={option}
            name={options[option]}
            selectOption={selectOption}
          />
        ))}
      </ul>
    </div>
  );
};

export default SortOptions;
