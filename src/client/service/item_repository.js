import axios from "axios";
import { setTokenToHeader } from "../lib/token.js";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.REACT_APP_DEV_URI;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_PROD_URI;
}

export default class ItemRepository {
  /* Get Items List */
  initialItems = async (userId, onUpdate) => {
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.get(`/api/board/${userId}`);

      let initialItems = response.data.items || [];
      if (initialItems.length) {
        initialItems = initialItems.map((item) => ({
          ...item,
          date: this.#convertDateToNum(item.date.created),
        }));
      }

      onUpdate(initialItems);

      return () => {
        window.removeEventListener("storage", onUpdate);
      };
    } catch (err) {
      return err.response || err;
    }
  };

  #convertDateToNum = (date) => {
    return date.replace(/[\.\:\-A-Z]/gi, "") * 1;
  };

  /* Save Item */
  saveItem = async (contents) => {
    const token = localStorage.getItem("token");
    setTokenToHeader(token);

    try {
      const response = await axios.post(`/api/board/item`, { contents });

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
      const response = await axios.patch(`/api/board/item/${id}`, { contents });

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
      const response = await axios.delete(`/api/board/item/${id}`);

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
      const response = await axios.post(`/api/board/item/${id}/like`);

      return response;
    } catch (err) {
      return err.response || err;
    }
  };
}
