import React from "react";

const ImgWithFallback = ({ src, fallback, type = "image/webp", ...opts }) => (
  <picture>
    <source srcSet={src} type={type} />
    <img src={fallback} {...opts} />
  </picture>
);

export default ImgWithFallback;
