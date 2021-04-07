import React, { useEffect } from "react";
import styles from "./item.module.css";
import defaultImg from "../../assets/default.png";
import { Box, CreditCard } from "react-feather";
import StarButton from "../button/star_button";
import { useRecoilState } from "recoil";
import { itemModalState, selectedState } from "../../atoms/atoms";
import { useHistory, useLocation } from "react-router";

const Item = ({ item, likeItem }) => {
  const history = useHistory();
  const location = useLocation();
  const { _id, name, type, size, price, file, isLiked } = item;

  const onClickHandler = () => {
    history.push({
      pathname: `/board/item/${_id}`,
      state: { background: location, modal: "detail" },
    });
  };

  const preventEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <li className={styles.container} onClick={onClickHandler}>
      <div className={styles.img}>
        {file[0].url ? (
          <img src={file[0].url} alt={`${name} image`} />
        ) : (
          <img src={defaultImg} alt="default image" />
        )}
      </div>
      <div className={styles.star} onClick={preventEvent}>
        <StarButton id={_id} isLiked={isLiked} likeItem={likeItem} />
      </div>
      <div className={styles.summary}>
        <h4 className={styles.name}>{name}</h4>
        <ul>
          <li className={styles.description}>
            <Box />
            <span>{size}</span>
          </li>
          <li className={styles.description}>
            <CreditCard />
            <span>{price}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default Item;
