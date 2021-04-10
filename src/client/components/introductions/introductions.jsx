import React, { memo } from "react";
import Introduction from "../introduction/introduction";

const Introductions = memo(({ contents }) => {
  return (
    <ul>
      {contents.map((item) => (
        <Introduction key={item.id} contents={item} />
      ))}
    </ul>
  );
});

export default Introductions;
