import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./modal.module.css";
import Popup from "../popup/popup";

const Modal = ({ isPopup, Content }) => {
  const history = useHistory();
  const [confirm, setConfirm] = useState(false);

  const onClose = useCallback(() => {
    history.goBack();
  }, []);
  const onCancel = useCallback(() => {
    setConfirm(false);
  }, []);
  const clickHandler = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        isPopup ? setConfirm(true) : onClose();
      }
    },
    [isPopup]
  );

  const confirmPopup = {
    title: "Are you sure",
    info: "When you go back, what you are writing will not be saved.",
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: onCancel },
      { id: "confirm", name: "Confirm", clickHandler: onClose },
    ],
  };

  useEffect(() => {
    document.body.style.cssText = "overflow:hidden";

    return () => {
      document.body.style.cssText = `overflow: auto`;
    };
  }, []);

  return (
    <div className={styles.background} onClick={clickHandler}>
      <section className={styles.container}>
        <Content />
        {confirm && <Popup contents={confirmPopup} />}
      </section>
    </div>
  );
};
export default Modal;
