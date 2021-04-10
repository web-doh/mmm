import React, { memo, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./save_button.module.css";
import { Download } from "react-feather";

const getRelativeSize = (childId, parent) => {
  const child = document
    .querySelector(`#img${childId}`)
    .getBoundingClientRect();

  const width = Math.floor(child.width * 0.2645833); // px to mm
  const height = Math.floor(child.height * 0.2645833);
  const y = Math.floor((child.y - parent.y) * 0.2645833);
  const x = Math.floor((child.x - parent.x) * 0.2645833);

  return { x, y, width, height };
};

const SaveButton = memo(({ name, tagId, imgs }) => {
  const saveToPdf = () => {
    const screenshot = document.querySelector(`#${tagId}`);
    const size = screenshot.getBoundingClientRect();

    html2canvas(screenshot).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10);
      for (let i = 0; i < 3; i += 1) {
        if (!imgs[i]["url"]) continue;
        const imgSize = getRelativeSize(i, size);
        const { x, y, width, height } = imgSize;

        pdf.addImage(
          imgs[i]["url"],
          "PNG",
          x + 11,
          y + 10.2,
          width * 0.99,
          height * 0.99
        );
      }

      pdf.save(`${name}.pdf`);
    });
  };

  return (
    <button className={styles.button} onClick={saveToPdf}>
      <Download />
    </button>
  );
});

export default SaveButton;
