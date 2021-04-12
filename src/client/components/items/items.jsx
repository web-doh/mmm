import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { optionState } from "../../atoms/atoms";
import Item from "../item/item";
import ItemMaker from "../item_maker/item_maker";
import ItemSkeleton from "../skeleton/item_skeleton";
import styles from "./items.module.css";

const Items = ({ items, likeItem, isLoading }) => {
  const [option, setOption] = useRecoilState(optionState);

  useEffect(() => {
    if (option["filter"] !== "All" && !items.length) {
      setOption({ filter: "All", sorting: "Sort by alphabet" });
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
          {items.map((item) => (
            <Item key={item._id} item={item} likeItem={likeItem} />
          ))}
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
