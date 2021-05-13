import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { sortOptionState } from "../../atoms/atoms";

const Sort = ({ children }) => {
  const option = useRecoilValue(sortOptionState);
  const [by, direction] = option.split("-");

  if (!by) return children;
  else {
    return React.Children.toArray(children).sort((a, b) => {
      if (direction === "reverse") {
        return b.props.item[by] - a.props.item[by];
      } else {
        return a.props.item[by] - b.props.item[by];
      }
    });
  }
};

export default Sort;
