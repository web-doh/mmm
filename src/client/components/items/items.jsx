import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { optionState } from "../../atoms/atoms";
import Item from "../item/item";
import ItemMaker from "../item_maker/item_maker";
import Skeleton from "../skeleton/skeleton";
import styles from "./items.module.css";

const Items = ({ items, likeItem, isLoading }) => {
  const [option, setOption] = useRecoilState(optionState);

  useEffect(() => {
    if (option["filter"] !== "All" && !items.length) {
      setOption({ filter: "All", sorting: "Sort by alphabet" });
    }
  }, [items]);

  return (
    <>
      {items.length ? (
        <ul className={styles.container}>
          {isLoading
            ? new Array(6).fill(1).map((_, i) => <Skeleton key={i} />)
            : items.map((item) => (
                <Item key={item._id} item={item} likeItem={likeItem} />
              ))}{" "}
        </ul>
      ) : option["filter"] === "All" ? (
        <div className={styles.empty}>
          <h4>Empty!</h4>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Items;
