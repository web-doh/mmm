import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: { _id: "", username: "", isAuthenticated: false },
});

export const itemsState = atom({
  key: "itemState",
  default: [
    {
      name: "",
      type: "",
      size: "",
      price: "",
      manufacture: "",
      seller: "",
      contact: "",
      project: "",
      remarks: "",
      file: ["", "", ""],
      isMarked: false,
    },
  ],
});
