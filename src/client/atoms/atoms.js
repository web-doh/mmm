import { atom } from "recoil";

export const itemsState = atom({
  key: "itemsState",
  default: [
    {
      _id: "",
      name: "",
      type: "",
      size: "",
      price: "",
      manufacture: "",
      seller: "",
      contact: "",
      email: "",
      project: "",
      remarks: "",
      file: [{ url: "" }, { url: "" }, { url: "" }],
      isLiked: false,
    },
  ],
});

export const resultsState = atom({
  key: "resultsState",
  default: [
    {
      _id: "",
      name: "",
      type: "",
      size: "",
      price: "",
      manufacture: "",
      seller: "",
      contact: "",
      email: "",
      project: "",
      remarks: "",
      file: [{ url: "" }, { url: "" }, { url: "" }],
      isLiked: false,
    },
  ],
});

export const optionState = atom({
  key: "optionState",
  default: { filter: "All", sorting: "Sort by alphabet" },
});
