import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState, filteredItemsState } from "../../atoms/atoms";

import Items from "../../components/items/items";
import Template from "../../components/template/template";
import styles from "./board.module.css";
import AddButton from "../../components/button/add_button";
import FilterBar from "../../components/filter_bar/filter_bar";

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

  const filterBar = useCallback(() => {
    return (
      <aside className={styles.filterBar}>
        <AddButton onClickHandler={onClickHandler} />
        <FilterBar items={items} isLoading={isLoading} />
      </aside>
    );
  }, [FilterBar, items]);

  return (
    <>
      <Template
        title="Board"
        Contents={contents}
        Aside={filterBar}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Board;
