import React, { memo, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./save_button.module.css";
import { Download } from "react-feather";

const modifySVG = () => {
  const parent = document.querySelector(`#modal`);
  const svg = parent.querySelectorAll("svg");

  svg.forEach((item) => {
    item.setAttribute("width", item.getBoundingClientRect().width);
    item.setAttribute("height", item.getBoundingClientRect().height);
    item.style.width = null;
    item.style.height = null;
  });
};

const SaveButton = memo(({ name, tagId, imgs }) => {
  useEffect(() => modifySVG(), []);

  const saveToPdf = () => {
    const screenshot = document.querySelector(`#${tagId}`);
    const size = screenshot.getBoundingClientRect();

    html2canvas(screenshot, {
      letterRendering: 1,
      useCORS: true,
      height: size.height + 40,
      width: size.width + 40,
      x: size.x - 20,
      y: window.scrollY + size.y - 20,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const el = document.createElement("a");
      el.href = imgData;
      el.download = `${name}.png`;
      el.click();
    });
  };

  return (
    <button className={styles.button} onClick={saveToPdf}>
      <Download />
    </button>
  );
});

export default SaveButton;
