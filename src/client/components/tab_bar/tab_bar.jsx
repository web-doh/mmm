import React from "react";
import { useRecoilValue } from "recoil";
import { itemsState } from "../../atoms/atoms";
import Tab from "../tab/tab";
import styles from "./tab_bar.module.css";

const TabBar = (props) => {
  const items = useRecoilValue(itemsState);
  const tabs =
    items[0] &&
    items[0]["type"] &&
    Array.from(
      new Set(items.map((item) => item["type"].match(/\((.*?)\)/i)[1]))
    );

  return (
    <ul className={styles.container}>
      <Tab name="All" />
      {tabs && tabs.map((tab) => <Tab key={tab} name={tab} />)}
    </ul>
  );
};

export default TabBar;
