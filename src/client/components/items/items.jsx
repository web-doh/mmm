import React from "react";
import { useRecoilValue } from "recoil";
import { itemsState, optionState } from "../../atoms/atoms";
import Item from "../item/item";
import Skeleton from "../skeleton/skeleton";
import styles from "./items.module.css";

const Items = ({ likeItem, isLoading }) => {
  const items = useRecoilValue(itemsState);
  const option = useRecoilValue(optionState);
  const filtered = items.filter((item) => {
    if (option["filter"] === "All") {
      return item;
    } else {
      if (item.type.includes(option["filter"])) return item;
    }
  });

  return (
    <>
      {filtered.length ? (
        <ul className={styles.container}>
          {isLoading
            ? new Array(6).fill(1).map((_, i) => <Skeleton key={i} />)
            : filtered.map((item) => (
                <Item key={item._id} item={item} likeItem={likeItem} />
              ))}{" "}
        </ul>
      ) : (
        <div className={styles.empty}>
          <h4>Empty!</h4>
        </div>
      )}
    </>
  );
};

export default Items;
