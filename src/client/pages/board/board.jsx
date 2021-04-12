import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { itemsState, optionState } from "../../atoms/atoms";
import { Plus } from "react-feather";
import Header from "../../components/header/header";
import Items from "../../components/items/items";
import TabBar from "../../components/tab_bar/tab_bar";
import Template from "../../components/template/template";
import styles from "./board.module.css";

const Board = ({ likeItem, isLoading, logoutHandler }) => {
  const location = useLocation();
  const history = useHistory();
  const [items, setItems] = useRecoilState(itemsState);
  const [option, setOption] = useRecoilState(optionState);
  const filtered = items.filter((item) => {
    if (option["filter"] === "All") {
      return item;
    } else {
      if (item.type.includes(option["filter"])) return item;
    }
  });

  useEffect(() => {
    setOption({ filter: "All", sorting: "Sort by alphabet" });
  }, []);

  const onClickHandler = () => {
    history.push({
      pathname: "/board/item",
      state: { background: location, modal: "maker" },
    });
  };

  const contents = useCallback(
    () => <Items items={filtered} likeItem={likeItem} isLoading={isLoading} />,
    [isLoading, filtered]
  );

  const tabBar = useCallback(() => {
    return (
      <aside className={styles.tabBar}>
        <TabBar items={items} isLoading={isLoading} />
        <button
          type="button"
          className={styles.button}
          onClick={onClickHandler}
        >
          <Plus />
          <p className={styles.content}>Add Materials</p>
        </button>
      </aside>
    );
  }, [TabBar, items]);

  return (
    <>
      <Template
        title="Board"
        Contents={contents}
        Aside={tabBar}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Board;
