import React, { useCallback } from "react";
import styles from "./star_button.module.css";
import { Star } from "react-feather";
import { useRecoilState } from "recoil";
import { itemsState } from "../../atoms/atoms";

const StarButton = ({ id, isLiked, likeItem }) => {
  const [items, setItems] = useRecoilState(itemsState);

  const toggleLiked = useCallback((e) => {
    e.preventDefault();
    likeItem(id);
  }, []);

  return (
    <button
      type="submit"
      onClick={toggleLiked}
      className={`${styles.star} ${isLiked && styles.liked}`}
    >
      <Star />
    </button>
  );
};

export default StarButton;
