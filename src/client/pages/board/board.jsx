import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState, filteredItemsState } from "../../atoms/atoms";
import Header from "../../components/header/header";
import Items from "../../components/items/items";
import TabBar from "../../components/tab_bar/tab_bar";
import Template from "../../components/template/template";
import styles from "./board.module.css";
import AddButton from "../../components/button/add_button";

const Board = ({ likeItem, isLoading, logoutHandler }) => {
  const location = useLocation();
  const history = useHistory();
  const [items, setItems] = useRecoilState(itemsState);
  const filtered = useRecoilValue(filteredItemsState);

  const onClickHandler = () => {
    history.push({
      pathname: "/board/item",
      state: { background: location, modal: "maker" },
    });
  };

  const contents = () => (
    <Items items={filtered} likeItem={likeItem} isLoading={isLoading} />
  );

  const tabBar = useCallback(() => {
    return (
      <aside className={styles.tabBar}>
        <AddButton onClickHandler={onClickHandler} />
        <TabBar items={items} isLoading={isLoading} />
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
