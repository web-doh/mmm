import React from "react";
import styles from "./search_result.module.css";
import StarButton from "../button/star_button";
import { useHistory, useLocation } from "react-router";

const SearchResult = ({ item, query, likeItem }) => {
  const history = useHistory();
  const location = useLocation();
  const { _id, name, isLiked } = item;

  const info = [
    "type",
    "size",
    "price",
    "manufacture",
    "seller",
    "contact",
    "email",
    "project",
    "remarks",
  ];

  const highlightKeyword = (sentence) => {
    const parts = sentence.split(new RegExp(`(${query})`, "gi"));
    const highlight = parts
      .map((part) =>
        part.toLowerCase() === query.toLowerCase()
          ? `<span>${part}</span>`
          : part
      )
      .join("");

    return highlight;
  };

  const displayResult = () => {
    const description = Object.entries(item)
      .filter(([k, v]) => info.includes(k) && v !== "")
      .map(([k, v]) => [info.indexOf(k), v])
      .sort((a, b) => a[0] - b[0])
      .map(([i, v]) => v);

    const html = description
      .map((value) => {
        const highlight = highlightKeyword(value);
        return highlight;
      })
      .join(" / ");

    return { __html: html };
  };

  const displayName = () => {
    const description = item.name;
    const html = highlightKeyword(description);

    return { __html: html };
  };

  const onClickHandler = () => {
    history.push({
      pathname: `/board/item/${_id}`,
      state: { background: location, modal: "detail" },
    });
  };

  const preventEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <li className={styles.container} onClick={onClickHandler}>
      <div className={styles.star} onClick={preventEvent}>
        <StarButton id={_id} isLiked={isLiked} likeItem={likeItem} />
      </div>
      <div className={styles.summary}>
        <h4
          dangerouslySetInnerHTML={displayName()}
          className={styles.name}
        ></h4>
        <p
          dangerouslySetInnerHTML={displayResult()}
          className={styles.description}
        ></p>
      </div>
    </li>
  );
};

export default SearchResult;
