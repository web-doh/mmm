import { model, Schema, Types } from "mongoose";

const Item = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
  },

  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "-",
  },
  price: {
    type: String,
    default: "-",
  },
  manufacture: {
    type: String,
    default: "-",
  },
  seller: {
    type: String,
    default: "-",
  },
  contact: {
    type: String,
    default: "-",
  },
  email: {
    type: String,
    default: "-",
  },
  project: {
    type: String,
    default: "-",
  },
  remarks: {
    type: String,
    default: "-",
  },
  file: [
    {
      url: { type: String, default: "" },
    },
  ],
  isLiked: {
    type: Boolean,
    default: false,
  },
  date: {
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now },
  },
});

export default model("item", Item);
