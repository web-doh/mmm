import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState, resultsState } from "../../atoms/atoms";
import SearchBar from "../../components/search_bar/search_bar";
import SearchResults from "../../components/search_results/search_results";
import Template from "../../components/template/template";

const Search = ({ likeItem, logoutHandler }) => {
  const [result, setResult] = useRecoilState(resultsState);
  const items = useRecoilValue(itemsState);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (query, items) => {
    const searchResults = items.filter((item) => {
      const regex = new RegExp(query, "gi");

      const values = Object.values(item).find((v) => {
        return typeof v === "string" && v.match(regex);
      });

      return values;
    });

    setResult(searchResults);
    setQuery(query);
  };

  useEffect(() => {
    handleChange(query, items);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  const clearResult = () => {
    setResult([{ name: "" }]);
  };

  const initQuery = () => {
    setQuery("");
    clearResult();
    setIsSubmit(false);
  };

  useEffect(() => {
    clearResult();
  }, []);

  const aside = useCallback(
    () => (
      <SearchBar
        query={query}
        isSubmit={isSubmit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        initQuery={initQuery}
      />
    ),
    [isSubmit]
  );

  const contents = useCallback(
    () => (
      <SearchResults query={query} likeItem={likeItem} isLoading={isLoading} />
    ),
    [query]
  );
  return (
    <>
      <Template
        title="Search"
        Aside={aside}
        Contents={contents}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Search;
