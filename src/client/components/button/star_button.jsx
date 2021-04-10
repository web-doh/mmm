import React, { memo } from "react";
import styles from "./star_button.module.css";
import { Star } from "react-feather";

const StarButton = memo(({ id, isLiked, likeItem }) => {
  const toggleLiked = (e) => {
    e.preventDefault();
    likeItem(id);
  };

  return (
    <button
      type="submit"
      onClick={toggleLiked}
      className={`${styles.star} ${isLiked && styles.liked}`}
    >
      <Star />
    </button>
  );
});

export default StarButton;
