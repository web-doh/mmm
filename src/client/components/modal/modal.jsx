import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import CancelButton from "../button/cancel_button";
import Popup from "../popup/popup";
import styles from "./modal.module.css";

const Modal = ({ isPopup, Content }) => {
  const history = useHistory();
  const [confirm, setConfirm] = useState(false);

  const onClose = useCallback(() => {
    history.goBack();
  }, []);
  const onCancel = useCallback(() => {
    setConfirm(false);
  }, []);
  const clickHandler = useCallback(() => {
    isPopup ? setConfirm(true) : onClose();
  }, [isPopup]);

  const confirmPopup = {
    title: "Are you sure",
    info: "When you go back, what you are writing will not be saved.",
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: onCancel },
      { id: "confirm", name: "Confirm", clickHandler: onClose },
    ],
  };

  const preventEvent = useCallback((e) => e.stopPropagation(), []);

  useEffect(() => {
    document.body.style.cssText = "overflow:hidden";

    return () => {
      document.body.style.cssText = `overflow: auto`;
    };
  }, []);

  return (
    <div className={styles.background} onClick={clickHandler}>
      <section className={styles.container} onClick={preventEvent}>
        <Content />
        {confirm && <Popup contents={confirmPopup} />}
      </section>
    </div>
  );
};
export default Modal;
