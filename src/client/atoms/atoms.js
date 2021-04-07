import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: { _id: "", username: "", isAuthenticated: false },
});

export const itemsState = atom({
  key: "itemState",
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
