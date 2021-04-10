import React, { useCallback, useState } from "react";
import { Send, Image } from "react-feather";
import { useParams, useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsState } from "../../atoms/atoms";
import NotFound from "../../pages/not_found/not_found";
import CancelButton from "../button/cancel_button";
import LinkButton from "../button/link_button";
import SaveButton from "../button/save_button";
import StarButton from "../button/star_button";
import SubmitButton from "../button/submit_button";
import Popup from "../popup/popup";
import styles from "./item_detail.module.css";

const ItemDetail = ({ item, onChangeModal, deleteItem, likeItem }) => {
  const history = useHistory();
  const [isPopup, setIsPopup] = useState(false);

  if (!item) {
    history.push("/not-found");
    return <NotFound />;
  }

  const {
    _id,
    name,
    type,
    size,
    price,
    manufacture,
    seller,
    contact,
    email,
    project,
    remarks,
    file,
    isLiked,
  } = item;

  const description = [
    "type",
    "size",
    "price",
    " manufacture",
    "seller",
    "contact",
    "project",
  ];

  const onClickHandler = () => {
    onChangeModal("editor");
  };

  const onPopupHandler = () => {
    setIsPopup(true);
  };
  const onDelete = () => {
    deleteItem(_id);
  };
  const onCancel = () => {
    setIsPopup(false);
  };

  const confirmPopup = {
    title: "Are you sure",
    info: "Once you delete this you are not alllowed to restore.",
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: onCancel },
      { id: "Delete", name: "Delete", clickHandler: onDelete },
    ],
  };

  return (
    <section className={styles.container} id="modal">
      <header className={styles.header}>
        <div className={styles.name}>
          <h4>{name}</h4>
          <div className={styles.icons}>
            {/* <button className={styles.send}>
              <Send />
            </button> */}
            <SaveButton name={name} tagId="modal" imgs={file} />
            <div className={styles.star}>
              <StarButton id={_id} isLiked={isLiked} likeItem={likeItem} />
            </div>
          </div>
        </div>
        <CancelButton />
      </header>
      <section className={styles.contents}>
        <section className={`${styles.container} ${styles.images}`}>
          <div
            className={`${styles.image} ${styles.mainImage} ${
              file[0].url && styles.noBack
            }`}
          >
            {file[0].url ? (
              <img id="img0" src={file[0].url} alt="material image1" />
            ) : (
              <Image />
            )}
          </div>
          <div
            className={`${styles.image} ${styles.subImage} ${
              file[1].url && styles.noBack
            }`}
          >
            {file[1].url ? (
              <img id="img1" src={file[1].url} alt="material image2" />
            ) : (
              <Image />
            )}
          </div>
          <div
            className={`${styles.image} ${styles.subImage} ${
              file[2].url && styles.noBack
            }`}
          >
            {file[2].url ? (
              <img id="img2" src={file[2].url} alt="material image3" />
            ) : (
              <Image />
            )}
          </div>
        </section>
        <section className={`${styles.container} ${styles.right}`}>
          <ul className={styles.list}>
            {description.map((key) => (
              <li key={key} className={styles.listItem}>
                <p className={styles.title}>{key}</p>
                <p className={styles.description}>{item[key]}</p>
              </li>
            ))}
            <li className={styles.listItem}>
              <p className={styles.title}>remarks</p>
              <textarea
                className={`${styles.description} ${styles.remarks}`}
                readOnly
                disabled
                value={item["remarks"]}
              ></textarea>
            </li>
          </ul>
          <div className={styles.buttons}>
            <button
              type="submit"
              onClick={onPopupHandler}
              className={`${styles.button} ${styles.button1}`}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClickHandler}
              className={`${styles.button} ${styles.button2}`}
            >
              Edit
            </button>
          </div>
        </section>
      </section>
      {isPopup && <Popup contents={confirmPopup} />}
    </section>
  );
};

export default ItemDetail;
