import React from "react";
import Tab from "../tab/tab";
import styles from "./tab_bar.module.css";

const TabBar = ({ items }) => {
  const tabs =
    items[0] &&
    items[0]["type"] &&
    Array.from(
      new Set(items.map((item) => item["type"].match(/\((.*?)\)/i)[1]))
    );

  return (
    <ul className={styles.container}>
      <Tab name="All" />
      {tabs && tabs.map((tab, i) => <Tab key={tab} idx={i} name={tab} />)}
    </ul>
  );
};

export default TabBar;
