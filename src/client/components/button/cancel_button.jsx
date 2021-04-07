import React, { useState } from "react";
import { useHistory } from "react-router";
import { X } from "react-feather";
import styles from "./cancel_button.module.css";
import Popup from "../popup/popup";

const CancelButton = ({ isPopup }) => {
  const history = useHistory();
  const [confirm, setConfirm] = useState(false);

  const onClose = () => {
    history.goBack();
  };
  const onCancel = () => {
    setConfirm(false);
  };
  const clickHandler = () => {
    isPopup ? setConfirm(true) : onClose();
  };

  const confirmPopup = {
    title: "Are you sure",
    info: "When you go back, what you are writing will not be saved.",
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: onCancel },
      { id: "confirm", name: "Confirm", clickHandler: onClose },
    ],
  };

  return (
    <>
      <button type="button" className={styles.xIcon} onClick={clickHandler}>
        <X />
      </button>
      {confirm && <Popup contents={confirmPopup} />}
    </>
  );
};

export default CancelButton;
