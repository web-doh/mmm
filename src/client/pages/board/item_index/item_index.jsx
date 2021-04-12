import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { itemsState } from "../../../atoms/atoms";
import Modal from "../../../components/modal/modal";
import ItemDetail from "../../../components/item_detail/item_detail";
import ItemMaker from "../../../components/item_maker/item_maker";
import ItemEditor from "../../../components/item_editor/item_editor";

const ItemIndex = ({ FileInput, itemRepository, likeItem }) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [items, setItems] = useRecoilState(itemsState);
  const [modal, setModal] = useState(location.state.modal);
  const [isPopup, setIsPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selected = items.find((el) => el["_id"] === id);

  const createItem = useCallback(
    async (item) => {
      setIsSubmitting(true);
      const response = await itemRepository.saveItem(item);
      setIsSubmitting(false);
      if (response.data.status === "success") {
        const newItem = response.data.items;
        setItems((items) => [...items, newItem]);

        history.push({
          pathname: "/board",
        });
      } else {
        /*  
      ERROR CODES:
            0: SERVER ERROR
      */
        alert("There is a problem with the server. Please try again later.");
      }
    },

    [itemRepository]
  );

  const editItem = useCallback(
    async (update) => {
      setIsSubmitting(true);
      const response = await itemRepository.editItem(update);
      setIsSubmitting(false);
      if (response.data.status === "success") {
        setItems((items) => {
          const updated = items.map((item) =>
            item._id === update._id ? update : item
          );

          return updated;
        });

        history.goBack();
      } else {
        /*  
      ERROR CODES:
            0: SERVER ERROR
            1: INVALID ID
            2: NO RESOURCE
      */

        const errorMessage =
          "There is a problem with the server. Please try again later.";

        alert(errorMessage);
      }
    },
    [itemRepository]
  );

  const removeItem = useCallback(
    async (id) => {
      const response = await itemRepository.deleteItem(id);
      if (response.data.status === "success") {
        setItems((items) => {
          const updated = [...items].filter((update) => update._id !== id);

          return updated;
        });

        history.push({
          pathname: "/board",
        });
      } else {
        /*  
      ERROR CODES:
            0: SERVER ERROR
            1: INVALID ID
            2: NO RESOURCE
      */

        const errorMessage =
          "There is a problem with the server. Please try again later.";

        alert(errorMessage);
      }
    },
    [itemRepository]
  );

  const changeModal = (modalState) => {
    setModal(modalState);
  };

  const checkModalState = () => {
    switch (modal) {
      case "maker":
        return () => (
          <ItemMaker
            isSubmitting={isSubmitting}
            isPopup={isPopup}
            FileInput={FileInput}
            addItem={createItem}
          />
        );
      case "editor":
        return () => (
          <ItemEditor
            isSubmitting={isSubmitting}
            isPopup={isPopup}
            FileInput={FileInput}
            item={selected}
            editItem={editItem}
          />
        );
      case "detail":
        return () => (
          <ItemDetail
            item={selected}
            onChangeModal={changeModal}
            deleteItem={removeItem}
            likeItem={likeItem}
          />
        );
      default:
        history.push("/board");
        break;
    }
  };

  const checkIsPopup = () => {
    switch (modal) {
      case "maker":
        setIsPopup(true);
        break;
      case "editor":
        setIsPopup(true);
        break;
      case "detail":
        setIsPopup(false);
        break;
      default:
        setIsPopup(false);
        break;
    }
  };

  let content = checkModalState();
  useEffect(() => {
    checkIsPopup();
    content = checkModalState();
  }, [modal]);

  return (
    <>
      <Modal Content={content} isPopup={isPopup} />
    </>
  );
};

export default ItemIndex;
