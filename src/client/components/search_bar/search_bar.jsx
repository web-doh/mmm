import React from "react";
import { Search, X } from "react-feather";
import { useRecoilValue } from "recoil";
import { itemsState } from "../../atoms/atoms";
import styles from "./search_bar.module.css";

const SearchBar = ({
  query,
  isSubmit,
  handleChange,
  handleSubmit,
  initQuery,
}) => {
  const items = useRecoilValue(itemsState);

  const onInputChange = (e) => {
    handleChange(e.target.value, items);
  };

  return (
    <>
      {!isSubmit ? (
        <form className={styles.bar} onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            className={styles.input}
            maxLength="20"
            placeholder="Search by keyword ..."
            autoComplete="off"
            onChange={onInputChange}
          />
          <button type="submit" className={styles.button}>
            <Search />
          </button>
        </form>
      ) : (
        <div className={styles.bar} onClick={initQuery}>
          <input
            name="query"
            type="text"
            className={styles.input}
            defaultValue={query}
            readOnly
          ></input>
          <button type="button" className={styles.button}>
            <X />
          </button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
