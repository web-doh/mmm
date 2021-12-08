import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { likedItemsState, filteredLikedState } from "../../atoms/atoms";
import { Plus } from "react-feather";
import TabBar from "../../components/tab_bar/tab_bar";
import Template from "../../components/template/template";
import Items from "../../components/items/items";

const Favorites = ({ likeItem, isLoading, logoutHandler }) => {
  const allItems = useRecoilValue(likedItemsState);
  const filtered = useRecoilValue(filteredLikedState);

  const contents = useCallback(
    () => <Items items={filtered} likeItem={likeItem} isLoading={isLoading} />,
    [isLoading, filtered]
  );

  const tabBar = useCallback(() => {
    return (
      <aside>
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
