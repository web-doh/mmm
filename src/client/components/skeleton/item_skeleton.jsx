import React, { memo } from "react";
import { Box, CreditCard } from "react-feather";
import styles from "./item_skeleton.module.css";

const ItemSkeleton = memo(() => (
  <li className={styles.container}>
    <div className={`${styles.item} ${styles.img}`}></div>
    <div className={`${styles.item} ${styles.star}`}></div>
    <div className={styles.summary}>
      <h4 className={`${styles.item} ${styles.name}`}></h4>
      <div>
        <div className={`${styles.item} ${styles.description}`}></div>
        <div className={`${styles.item} ${styles.description}`}></div>
      </div>
    </div>
  </li>
));

export default ItemSkeleton;
