import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { itemsState, optionState } from "../../atoms/atoms";
import { Plus } from "react-feather";
import TabBar from "../../components/tab_bar/tab_bar";
import Template from "../../components/template/template";
import Items from "../../components/items/items";

const Favorites = ({ likeItem, isLoading, logoutHandler }) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [option, setOption] = useRecoilState(optionState);
  const allItems = items.filter((item) => item.isLiked);
  const filtered = allItems.filter((item) => {
    if (option["filter"] === "All") {
      return item;
    } else {
      if (item.type.includes(option["filter"])) return item;
    }
  });

  useEffect(() => {
    setOption({ filter: "All", sorting: "Sort by alphabet" });
  }, []);

  const contents = useCallback(
    () => <Items items={filtered} likeItem={likeItem} isLoading={isLoading} />,
    [isLoading, filtered]
  );

  const tabBar = useCallback(() => {
    return (
      <aside className={styles.tabBar}>
        <TabBar items={allItems} />
      </aside>
    );
  }, [TabBar, allItems]);

  return (
    <>
      <Template
        title="Favorites"
        Contents={contents}
        Aside={tabBar}
        logoutHandler={logoutHandler}
      />
    </>
  );
};

export default Favorites;
