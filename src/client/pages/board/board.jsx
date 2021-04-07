import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { itemsState } from "../../atoms/atoms";
import { Plus } from "react-feather";
import Header from "../../components/header/header";
import Items from "../../components/items/items";
import TabBar from "../../components/tab_bar/tab_bar";
import Template from "../../components/template/template";
import styles from "./board.module.css";

const Board = ({ likeItem, isLoading }) => {
  const location = useLocation();
  const history = useHistory();
  const [items, setItems] = useRecoilState(itemsState);

  const onClickHandler = () => {
    history.push({
      pathname: "/board/item",
      state: { background: location, modal: "maker" },
    });
  };

  const contents = useCallback(
    () => <Items likeItem={likeItem} isLoading={isLoading} />,
    [isLoading]
  );

  const tabBar = useCallback(() => {
    return (
      <aside className={styles.tabBar}>
        <TabBar />
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
  }, []);

  return (
    <>
      <Template title="Board" Contents={contents} Aside={tabBar} />
    </>
  );
};

export default Board;
