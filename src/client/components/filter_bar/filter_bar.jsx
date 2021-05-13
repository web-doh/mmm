import React from "react";
import SortOptions from "../sort-options/sort-options";
import TabBar from "../tab_bar/tab_bar";

const FilterBar = ({ items, isLoading }) => (
  <>
    <TabBar items={items} isLoading={isLoading} />
    <SortOptions />
  </>
);

export default FilterBar;
