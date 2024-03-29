import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { itemFilterState } from "../../atoms/atoms";
import Item from "../item/item";
import ItemSkeleton from "../skeleton/item_skeleton";
import Sort from "../sort/sort";
import styles from "./items.module.css";

const Items = ({ items, likeItem, isLoading }) => {
  const [filter, setFilter] = useRecoilState(itemFilterState);

  useEffect(() => {
    if (filter !== "All" && !items.length) {
      setFilter("All");
    }
  }, [items]);

  if (isLoading) {
    return (
      <ul className={styles.container}>
        {new Array(6).fill(1).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
      </ul>
    );
  } else {
    if (items.length && items[0]["name"]) {
      return (
        <ul className={styles.container}>
          <Sort>
            {items.map((item) => (
              <Item key={item._id} item={item} likeItem={likeItem} />
            ))}
          </Sort>
        </ul>
      );
    } else {
      return (
        <div className={styles.empty}>
          <h4>Empty!</h4>
        </div>
      );
    }
  }
};

export default Items;
