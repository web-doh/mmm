import { atom, selector } from "recoil";

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

export const itemFilterState = atom({
  key: "itemFilterState",
  default: "All",
});

export const filteredItemsState = selector({
  key: "filteredItemsState",
  get: ({ get }) => {
    const filter = get(itemFilterState);
    const list = get(itemsState);

    if (filter !== "All") {
      return list.filter((item) => item.type.includes(filter));
    }

    return list;
  },
});

export const likedItemsState = selector({
  key: "likedItemsState",
  get: ({ get }) => {
    const list = get(itemsState);

    return list.filter((item) => item.isLiked);
  },
});

export const filteredLikedState = selector({
  key: "filteredLikedState",
  get: ({ get }) => {
    const filter = get(itemFilterState);
    const list = get(likedItemsState);

    if (filter !== "All") {
      return list.filter((item) => item.type.includes(filter));
    }

    return list;
  },
});
