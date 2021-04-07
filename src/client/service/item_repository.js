import axios from "axios";
import { setTokenToHeader } from "../lib";

export default class ItemRepository {
  /* Get Items List */
  initialItems = async (userId, onUpdate) => {
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PROD_URI}/api/board/${userId}`
      );

      const initialItems = response.data.items || [];
      onUpdate(initialItems);

      return () => {
        window.removeEventListener("storage", onUpdate);
      };
    } catch (err) {
      return err.response || err;
    }
  };

  /* Save Item */
  saveItem = async (contents) => {
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PROD_URI}/api/board/item`,
        { contents }
      );

      return response;
    } catch (err) {
      return err.response || err;
    }
  };

  /* Edit Item */
  editItem = async (contents) => {
    const id = contents._id;
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_PROD_URI}/api/board/item/${id}`,
        { contents }
      );

      return response;
    } catch (err) {
      return err.response || err;
    }
  };

  /* Delete Item */
  deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PROD_URI}/api/board/item/${id}`
      );

      return response;
    } catch (err) {
      return err.response || err;
    }
  };

  /* Toggle Like of Item */
  likeItem = async (id) => {
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PROD_URI}/api/board/item/${id}/like`
      );

      return response;
    } catch (err) {
      return err.response || err;
    }
  };
}
