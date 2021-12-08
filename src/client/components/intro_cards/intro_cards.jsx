import React from "react";

import WebpIsSupported from "../../lib/browser";
import styles from "./intro_cards.module.css";
import intro1 from "../../assets/intro1.png";
import intro2 from "../../assets/intro2.png";
import intro3 from "../../assets/intro3.png";
import intro1Webp from "../../assets/intro1.webp";
import intro2Webp from "../../assets/intro2.webp";
import intro3Webp from "../../assets/intro3.webp";
import IntroCard from "../intro_card/intro_card";

const IntroCards = () => {
  const items = [
    {
      id: 1,
      description: "Collect your favorite materials",
      color: "yellow",
      image: intro1,
    },
    {
      id: 2,
      description: "Manage your materials easily",
      color: "pink",
      image: intro2,
    },
    {
      id: 3,
      description: "Search your materials easily",
      color: "purple",
      image: intro3,
    },
  ];

  useEffect(() => {
    WebpIsSupported((isSupportWebP) => {
      if (!isSupportWebP) {
        items.forEach((item) => (item.image = window[`intro${id}Webp`]));
      }
    });
  }, []);

  return (
    <ul className={styles.list}>
      <IntroCard contents={{ color: "orange" }} />

      {items.map((item) => (
        <IntroCard key={item.id} contents={item} />
      ))}

      <IntroCard contents={{ color: "green" }} />
    </ul>
  );
};

export default IntroCards;
