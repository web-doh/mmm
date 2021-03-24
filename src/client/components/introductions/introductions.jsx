import React, { useEffect, useState } from "react";
import Introduction from "../introduction/introduction";

const Introductions = ({ contents }) => {
  return (
    <ul>
      {contents.map((item) => (
        <Introduction key={item.id} contents={item} />
      ))}
    </ul>
  );
};

export default Introductions;
