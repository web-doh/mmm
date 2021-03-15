import React, { useEffect, useState } from "react";
import IntroCard from "../intro_card/intro_card";
import styles from "./intro_cards.module.css";
import intro1 from "../../assets/intro1.png";
import intro2 from "../../assets/intro2.png";
import intro3 from "../../assets/intro3.png";

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
