import React from "react";
import { Circle } from "react-feather";

const CircleButton = ({ clickHandler }) => {
  const onButtonClick = (e) => {
    clickHandler(e);
  };
  return (
    <li>
      <button type="button" onClick={onButtonClick}>
        <Circle />
      </button>
    </li>
  );
};
export default CircleButton;
