import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { resultsState } from "../../atoms/atoms";
import SearchResult from "../search_result/search_result";
import styles from "./search_results.module.css";

const SearchResults = ({ query, likeItem }) => {
  const results = useRecoilValue(resultsState);

  {
    if (!query) {
      return "";
    } else {
      if (results.length) {
        return (
          <ul className={styles.container}>
            {results.map((item) => (
              <SearchResult
                key={item._id}
                item={item}
                query={query}
                likeItem={likeItem}
              />
            ))}
          </ul>
        );
      }
      return (
        <div className={styles.empty}>
          <h4>No results were found.</h4>
        </div>
      );
    }
  }
};

export default SearchResults;
